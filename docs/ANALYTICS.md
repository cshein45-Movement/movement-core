# Vercel Web Analytics Integration

This document describes how Vercel Web Analytics is integrated into the Movement Core project and how to use it for tracking user interactions and custom events.

## Overview

The Movement Core project is integrated with [Vercel Web Analytics](https://vercel.com/analytics) to track user interactions and performance metrics. This integration helps us understand how users interact with the application and identify performance bottlenecks.

## Prerequisites

To use Vercel Web Analytics, you need:

1. A Vercel account (free at https://vercel.com/signup)
2. A Vercel project (create at https://vercel.com/new)
3. The Vercel CLI installed locally

Install the Vercel CLI:

```bash
npm i vercel
```

## Setup

### 1. Enable Web Analytics in Vercel Dashboard

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your Movement Core project
3. Click the **Analytics** tab
4. Click **Enable** to enable Web Analytics

> **💡 Note:** Enabling Web Analytics will add new routes (scoped at `/_vercel/insights/*`) after your next deployment.

### 2. Install Dependencies

The `@vercel/analytics` package is already included in the project dependencies:

```bash
npm install
```

### 3. Deploy to Vercel

Deploy your application to Vercel:

```bash
vercel deploy
```

Or, if you've already connected your Git repository, your application will automatically deploy when you push commits to your main branch.

## Usage

### Tracking Page Views

Page views are automatically tracked in the main application file (`src/index.ts`). The analytics hook tracks every incoming request:

```typescript
fastify.addHook("onRequest", async (request, reply) => {
  trackPageView({
    pathname: request.url,
    referrer: request.headers.referer || undefined,
  });
});
```

### Tracking Custom Events

You can track custom events using the `trackCustomEvent` function from `src/analytics.ts`:

```typescript
import { trackCustomEvent } from "./analytics.js";

// Track a custom event
trackCustomEvent("user-signup", {
  userId: "user123",
  plan: "pro",
});

// Track page duration
trackPageDuration("/dashboard", 1234);
```

### Using Analytics Middleware

The `analyticsMiddleware` in `src/middleware/analytics.ts` provides automatic tracking of page views with performance metrics. To use it:

```typescript
import { analyticsMiddleware } from "./middleware/analytics.js";

fastify.addHook("onRequest", analyticsMiddleware);
```

## Available Tracking Functions

### `trackPageView(data)`

Tracks a page view with pathname and optional referrer.

```typescript
trackPageView({
  pathname: "/governance",
  referrer: "https://example.com",
});
```

### `trackCustomEvent(eventName, properties)`

Tracks a custom event with optional properties.

```typescript
trackCustomEvent("proposal-submitted", {
  proposalId: "prop-123",
  votingPeriod: 7,
});
```

### `trackPageDuration(pathname, duration)`

Tracks the duration a user spent on a page.

```typescript
trackPageDuration("/dashboard", 5000); // 5 seconds
```

## Viewing Analytics Data

Once your application is deployed and users have visited your site:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your Movement Core project
3. Click the **Analytics** tab
4. You'll see data about:
   - Visits and page views
   - Top pages
   - Referrers
   - Device types
   - Geographic data

After a few days of traffic, you'll be able to:
- Filter by date range and dimensions
- Track custom events (Pro and Enterprise plans)
- Analyze user behavior patterns

## Best Practices

1. **Track Meaningful Events**: Focus on tracking events that provide business value, such as user signups, proposals created, votes submitted, etc.

2. **Use Descriptive Names**: Give your custom events clear, descriptive names that indicate what happened:
   - ✅ `governance-proposal-submitted`
   - ❌ `event1`

3. **Include Context**: Add relevant properties to events to provide context:

```typescript
trackCustomEvent("governance-vote-cast", {
  proposalId: "prop-456",
  userRole: "tokenHolder",
  votingSide: "for",
});
```

4. **Avoid Sensitive Data**: Don't track personally identifiable information (PII) or sensitive data in event properties.

5. **Performance Consideration**: Analytics calls are non-blocking and won't impact your application's performance.

## Privacy & Compliance

Vercel Web Analytics is privacy-first and complies with:

- GDPR
- CCPA
- ePrivacy Directive

For more information, see the [Privacy Policy](https://vercel.com/analytics/privacy).

## Troubleshooting

If analytics data isn't appearing:

1. **Check the Network Tab**: In your browser's DevTools, look for requests to `/_vercel/insights/view` or `/_vercel/insights/script.js`

2. **Verify Deployment**: Make sure your application is deployed to Vercel (not running locally)

3. **Wait for Data**: It may take a few minutes for data to appear in the dashboard

4. **Check Enable Status**: Verify that Web Analytics is enabled in your Vercel project settings

## Next Steps

- [Learn more about the @vercel/analytics package](/docs/analytics/package)
- [Set up custom events](/docs/analytics/custom-events)
- [Filter and analyze data](/docs/analytics/filtering)
- [Explore analytics limits and pricing](/docs/analytics/limits-and-pricing)
