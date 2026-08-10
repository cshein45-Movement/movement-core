# Vercel Web Analytics Setup

This document describes the Vercel Web Analytics configuration for the Movement Core project.

## Installation Date
**August 3, 2026**

## Package Version
- `@vercel/analytics`: ^1.1.1

## Documentation Source
All installation steps follow the official Vercel Web Analytics documentation:
https://vercel.com/docs/analytics/quickstart

## What Was Installed

### 1. Dependencies Added
- **@vercel/analytics@^1.1.1** - Official Vercel Web Analytics package
- **fastify@^4.25.0** - Web framework for the backend API
- Development dependencies for TypeScript, ESLint, and build tooling

### 2. Configuration Files Created
- `package.json` - Project configuration and dependencies
- `tsconfig.json` - TypeScript compiler configuration
- `.eslintrc.json` - ESLint configuration for code quality
- `.gitignore` - Git ignore patterns for build artifacts and dependencies
- `vercel.json` - Vercel deployment configuration

### 3. Source Files
The following files were already present and properly implement Vercel Analytics:
- `src/analytics.ts` - Analytics utility functions
- `src/index.ts` - Fastify server with analytics integration
- `examples/fastify-integration.ts` - Example implementation with error tracking
- `docs/GETTING_STARTED_ANALYTICS.md` - Updated with latest installation instructions

## How Analytics Works in Movement Core

### Backend Integration
Movement Core is a **Fastify backend application**, not a frontend framework. Therefore, analytics integration works differently than traditional Next.js or React applications:

1. **Automatic Tracking**: When deployed to Vercel, the platform automatically:
   - Injects analytics tracking infrastructure
   - Creates routes at `/_vercel/insights/*`
   - Collects data from client requests
   - Provides data in the Vercel Dashboard

2. **Server-Side Utilities**: The `src/analytics.ts` module provides utility functions for:
   - Tracking page views (API endpoint hits)
   - Logging custom events
   - Monitoring request metrics

3. **Request Middleware**: The Fastify application uses hooks to track incoming requests:
   ```typescript
   fastify.addHook("onRequest", async (request, _reply) => {
     trackPageView({
       pathname: request.url,
       referrer: request.headers.referer || undefined,
     });
   });
   ```

## Deployment Steps

### 1. Enable Analytics in Vercel Dashboard
1. Go to your Vercel dashboard
2. Select your project
3. Click the **Analytics** tab
4. Click **Enable**

### 2. Deploy to Vercel
```bash
vercel deploy
```

Or connect your Git repository for automatic deployments.

### 3. Verify Analytics
After deployment, check your browser's Network tab for requests to:
- `/_vercel/insights/view`

## Usage

### Initialize Analytics
```typescript
import { initializeAnalytics } from "./analytics.js";
initializeAnalytics();
```

### Track Page Views
```typescript
import { trackPageView } from "./analytics.js";
trackPageView({
  pathname: "/api/governance",
  referrer: "https://example.com"
});
```

### Track Custom Events
```typescript
import { trackCustomEvent } from "./analytics.js";
trackCustomEvent("proposal-submitted", {
  proposalId: "prop-123",
  votingPeriod: 7
});
```

## Development vs Production

- **Development**: Analytics functions log to console for debugging
- **Production**: Analytics are sent to Vercel's infrastructure

## Build & Test Results

✅ **Build**: Successful (TypeScript compilation)
✅ **Lint**: Passed (ESLint with TypeScript rules)
✅ **Tests**: Passed (no test failures)

## Lock Files

The `package-lock.json` file has been created and tracks the exact versions of all dependencies, ensuring consistent installations across environments.

## Next Steps

1. Deploy the application to Vercel
2. Enable Web Analytics in the Vercel Dashboard
3. Monitor analytics data after users interact with the API
4. Configure custom events for specific business metrics (Pro/Enterprise plans)

## Additional Resources

- [Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [Getting Started Guide](./docs/GETTING_STARTED_ANALYTICS.md)
- [Analytics Privacy Policy](https://vercel.com/docs/analytics/privacy-policy)
- [Analytics Limits and Pricing](https://vercel.com/docs/analytics/limits-and-pricing)
