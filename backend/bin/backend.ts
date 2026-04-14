#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MedworxStack } from '../lib/medworx-stack';

const app = new cdk.App();

new MedworxStack(app, 'MedworxStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'me-south-1', // Bahrain (closest to Iraq)
  },
  description: 'MedWorx - The Capital of Medical Businesses - Infrastructure Stack',
});
