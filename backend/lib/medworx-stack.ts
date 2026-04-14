import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as docdb from 'aws-cdk-lib/aws-docdb';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export class MedworxStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ==========================================
    // VPC
    // ==========================================
    const vpc = new ec2.Vpc(this, 'MedworxVpc', {
      maxAzs: 2,
      natGateways: 1,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'Public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'Private',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          cidrMask: 24,
          name: 'Isolated',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    // ==========================================
    // SECURITY GROUPS
    // ==========================================
    const docdbSg = new ec2.SecurityGroup(this, 'DocDBSecurityGroup', {
      vpc,
      description: 'Security group for DocumentDB cluster',
      allowAllOutbound: true,
    });

    const appSg = new ec2.SecurityGroup(this, 'AppSecurityGroup', {
      vpc,
      description: 'Security group for application servers',
      allowAllOutbound: true,
    });

    // Allow app to connect to DocumentDB
    docdbSg.addIngressRule(appSg, ec2.Port.tcp(27017), 'Allow MongoDB connections from app');

    // ==========================================
    // DOCUMENTDB (MongoDB-Compatible)
    // ==========================================
    const dbSecret = new secretsmanager.Secret(this, 'DocDBSecret', {
      secretName: 'medworx/docdb-credentials',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: 'medworxadmin' }),
        generateStringKey: 'password',
        excludePunctuation: true,
        passwordLength: 32,
      },
    });

    const docdbSubnetGroup = new docdb.CfnDBSubnetGroup(this, 'DocDBSubnetGroup', {
      dbSubnetGroupDescription: 'Subnet group for MedWorx DocumentDB',
      subnetIds: vpc.selectSubnets({ subnetType: ec2.SubnetType.PRIVATE_ISOLATED }).subnetIds,
    });

    const docdbCluster = new docdb.CfnDBCluster(this, 'DocDBCluster', {
      masterUsername: 'medworxadmin',
      masterUserPassword: dbSecret.secretValueFromJson('password').unsafeUnwrap(),
      dbSubnetGroupName: docdbSubnetGroup.ref,
      vpcSecurityGroupIds: [docdbSg.securityGroupId],
      storageEncrypted: true,
      engineVersion: '5.0.0',
      deletionProtection: false, // Set to true in production
      dbClusterIdentifier: 'medworx-docdb',
    });

    // DocumentDB Instance
    const docdbInstance = new docdb.CfnDBInstance(this, 'DocDBInstance', {
      dbClusterIdentifier: docdbCluster.ref,
      dbInstanceClass: 'db.t3.medium',
      dbInstanceIdentifier: 'medworx-docdb-instance-1',
    });

    docdbInstance.addDependency(docdbCluster);

    // ==========================================
    // S3 BUCKET (Uploads)
    // ==========================================
    const uploadsBucket = new s3.Bucket(this, 'UploadsBucket', {
      bucketName: `medworx-uploads-${this.account}`,
      versioned: false,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.PUT, s3.HttpMethods.POST],
          allowedOrigins: ['*'], // Restrict to your domain in production
          allowedHeaders: ['*'],
          maxAge: 3600,
        },
      ],
      lifecycleRules: [
        {
          // Move infrequently accessed files to cheaper storage after 90 days
          transitions: [
            {
              storageClass: s3.StorageClass.INFREQUENT_ACCESS,
              transitionAfter: cdk.Duration.days(90),
            },
          ],
        },
      ],
    });

    // ==========================================
    // CLOUDFRONT CDN
    // ==========================================
    const oai = new cloudfront.OriginAccessIdentity(this, 'OAI', {
      comment: 'MedWorx uploads OAI',
    });

    uploadsBucket.grantRead(oai);

    const cdn = new cloudfront.Distribution(this, 'CDN', {
      defaultBehavior: {
        origin: new origins.S3Origin(uploadsBucket, {
          originAccessIdentity: oai,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
      },
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      comment: 'MedWorx uploads CDN',
    });

    // ==========================================
    // IAM - Upload User (for Next.js server to upload files)
    // ==========================================
    const uploadUser = new iam.User(this, 'UploadUser', {
      userName: 'medworx-upload-user',
    });

    const uploadAccessKey = new iam.AccessKey(this, 'UploadAccessKey', {
      user: uploadUser,
    });

    uploadsBucket.grantReadWrite(uploadUser);

    // ==========================================
    // OUTPUTS
    // ==========================================
    new cdk.CfnOutput(this, 'VpcId', {
      value: vpc.vpcId,
      description: 'VPC ID',
    });

    new cdk.CfnOutput(this, 'DocDBEndpoint', {
      value: docdbCluster.attrEndpoint,
      description: 'DocumentDB Cluster Endpoint',
    });

    new cdk.CfnOutput(this, 'DocDBPort', {
      value: docdbCluster.attrPort,
      description: 'DocumentDB Port',
    });

    new cdk.CfnOutput(this, 'DocDBSecretArn', {
      value: dbSecret.secretArn,
      description: 'DocumentDB Secret ARN',
    });

    new cdk.CfnOutput(this, 'UploadsBucketName', {
      value: uploadsBucket.bucketName,
      description: 'S3 Uploads Bucket Name',
    });

    new cdk.CfnOutput(this, 'CDNDomainName', {
      value: cdn.distributionDomainName,
      description: 'CloudFront CDN Domain Name',
    });

    new cdk.CfnOutput(this, 'UploadAccessKeyId', {
      value: uploadAccessKey.accessKeyId,
      description: 'Upload User Access Key ID',
    });

    new cdk.CfnOutput(this, 'UploadSecretAccessKey', {
      value: uploadAccessKey.secretAccessKey.unsafeUnwrap(),
      description: 'Upload User Secret Access Key (SENSITIVE)',
    });

    // ==========================================
    // TAGS
    // ==========================================
    cdk.Tags.of(this).add('Project', 'MedWorx');
    cdk.Tags.of(this).add('Environment', 'production');
    cdk.Tags.of(this).add('ManagedBy', 'CDK');
  }
}
