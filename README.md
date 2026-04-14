# MedWorx - The Capital of Medical Businesses

Full-stack web application for MedWorx, Baghdad's premier medical business center.

## Tech Stack

### Frontend (Next.js 14)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js with credentials provider
- **Database**: MongoDB/DocumentDB via Mongoose
- **Calendar**: react-big-calendar
- **i18n**: Custom bilingual (English/Arabic) with RTL support

### Backend (AWS CDK)
- **IaC**: AWS CDK v2 (TypeScript)
- **Database**: Amazon DocumentDB (MongoDB-compatible)
- **Storage**: S3 + CloudFront CDN
- **Network**: VPC with public, private, and isolated subnets
- **Secrets**: AWS Secrets Manager

## Project Structure

```
medworx-project/
├── frontend/                  # Next.js application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              # Public homepage
│   │   │   ├── blog/                 # Blog listing & detail
│   │   │   ├── booking/              # Public room booking
│   │   │   ├── admin/                # Admin panel
│   │   │   │   ├── page.tsx          # Dashboard
│   │   │   │   ├── login/            # Admin login
│   │   │   │   ├── sliders/          # Slider management
│   │   │   │   ├── blogs/            # Blog management
│   │   │   │   ├── calendar/         # Meeting room calendar
│   │   │   │   └── messages/         # Contact messages
│   │   │   └── api/                  # API routes
│   │   │       ├── auth/             # NextAuth
│   │   │       ├── sliders/          # CRUD
│   │   │       ├── blogs/            # CRUD
│   │   │       ├── rooms/            # Meeting rooms
│   │   │       ├── bookings/         # Booking CRUD
│   │   │       └── contact/          # Contact messages
│   │   ├── components/
│   │   │   ├── public/               # Public site components
│   │   │   ├── admin/                # Admin components
│   │   │   └── providers/            # Context providers
│   │   ├── lib/                      # Utilities, DB, auth config
│   │   └── types/                    # TypeScript types
│   └── package.json
├── backend/                   # AWS CDK infrastructure
│   ├── bin/backend.ts
│   ├── lib/medworx-stack.ts
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas) OR AWS DocumentDB
- AWS CLI configured (for CDK deployment)

### 1. Frontend Setup

```bash
cd frontend
cp .env.example .env.local    # Edit with your values
npm install
npm run dev                    # Starts on http://localhost:3000
```

### 2. Seed the Database

```bash
npx ts-node src/lib/seed.ts
```

This creates:
- Admin user: `admin@medworx.iq` / `changeme123`
- 4 sample meeting rooms

### 3. Deploy Backend (AWS CDK)

```bash
cd backend
npm install
npx cdk bootstrap             # First time only
npx cdk deploy
```

## Admin Panel

Access the admin panel at `/admin/login`:
- **Email**: admin@medworx.iq
- **Password**: changeme123

### Features:
- **Dashboard**: Overview stats (sliders, blogs, bookings, messages)
- **Sliders**: Create, edit, reorder, and toggle homepage sliders
- **Blogs**: Write bilingual blog posts with cover images and tags
- **Calendar**: View/manage meeting room bookings with approval workflow
- **Messages**: Read and manage contact form submissions

## Public Features
- Bilingual website (English/Arabic) with RTL support
- Dynamic hero sliders
- Blog with individual post pages
- Meeting room booking with time conflict detection
- Contact form
- Responsive design (mobile, tablet, desktop)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_URL` | App URL (http://localhost:3000) |
| `NEXTAUTH_SECRET` | Random secret for JWT signing |
| `ADMIN_EMAIL` | Default admin email |
| `ADMIN_PASSWORD` | Default admin password |
| `AWS_REGION` | AWS region (me-south-1) |
| `AWS_S3_BUCKET` | S3 bucket name for uploads |
| `AWS_ACCESS_KEY_ID` | S3 upload user access key |
| `AWS_SECRET_ACCESS_KEY` | S3 upload user secret key |

## License

Private - MedWorx™ 2026. All rights reserved.
