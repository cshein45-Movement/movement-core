# Vercel Web Analytics Setup

This document describes the Vercel Web Analytics integration for Movement Core.

## Overview

Movement Core now includes official Vercel Web Analytics integration using the `@vercel/analytics` package (v1.3.1).

## What Was Configured

### 1. Package Installation
- Added `@vercel/analytics@^1.3.1` to dependencies
- Added Fastify and TypeScript build tooling
- Created `package.json` with proper Node.js/ESM configuration

### 2. TypeScript Configuration
- Created `tsconfig.json` with modern ESM module resolution
- Configured for ES2022 target with bundler module resolution
- Enabled strict type checking

### 3. Analytics Module (`src/analytics.ts`)
- Updated with comprehensive documentation
- Integrated official Vercel Web Analytics patterns
- Server-side tracking utilities for API endpoints
- Production/development environment detection
- Custom event tracking support

### 4. Deployment Configuration
- Created `vercel.json` for proper Vercel deployment
- Configured routes and build settings for Fastify
- Prepared for serverless deployment

### 5. Documentation
- Updated `docs/GETTING_STARTED_ANALYTICS.md` with official setup instructions
- Added examples and usage patterns
- Included troubleshooting information

## How It Works

### Automatic Tracking (When Deployed to Vercel)

When deployed to Vercel with Web Analytics enabled:

1. **Analytics routes** are automatically created at `/_vercel/insights/*`
2. **API requests** are automatically tracked
3. **Performance metrics** (response time, status codes) are collected
4. **Dashboard data** appears in Vercel Dashboard > Analytics tab

### Server-Side Utilities

The `src/analytics.ts` module provides utilities for logging and monitoring:

```typescript
import { initializeAnalytics, trackPageView, trackCustomEvent } from './analytics.js';

// Initialize at startup
initializeAnalytics();

// Track endpoint access
trackPageView({ pathname: '/api/governance' });

// Track custom events
trackCustomEvent('proposal-submitted', { proposalId: 'prop-123' });
```

## Deployment Steps

### 1. Enable Web Analytics in Vercel Dashboard

1. Go to your Vercel Dashboard
2. Select your project
3. Click the **Analytics** tab
4. Click **Enable** to activate Web Analytics

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Project

```bash
npm run build
```

### 4. Deploy to Vercel

```bash
vercel deploy
```

Or connect your Git repository for automatic deployments.

### 5. Verify Analytics

After deployment:
- Visit your API endpoints
- Check browser Network tab for requests to `/_vercel/insights/view`
- View analytics data in Vercel Dashboard > Analytics

## Development

### Local Development

```bash
npm run dev
```

In development mode, analytics events are logged to the console.

### Production Build

```bash
npm run build
npm start
```

## Additional Resources

- [Vercel Web Analytics Documentation](https://vercel.com/docs/analytics)
- [Vercel Analytics Quickstart](https://vercel.com/docs/analytics/quickstart)
- [Fastify on Vercel](https://vercel.com/docs/frameworks/backend/fastify)
- [Getting Started Guide](./docs/GETTING_STARTED_ANALYTICS.md)

## Notes

- Custom events require a Vercel Pro or Enterprise plan
- Analytics data is automatically collected for all API requests
- The `@vercel/analytics` package is primarily for frontend frameworks; backend APIs are tracked automatically by Vercel's platform
- Server-side utilities in `src/analytics.ts` are for logging and monitoring purposes
