# Vercel Web Analytics Setup

This guide documents how Vercel Web Analytics is integrated into the Movement Core project.

## Overview

Vercel Web Analytics is enabled for this Fastify backend application deployed on Vercel. Analytics tracking is automatically configured when the application is deployed to the Vercel platform.

## Prerequisites

- A Vercel account
- A Vercel project connected to the repository
- The `@vercel/analytics` package installed (see package.json)

## Installation

The `@vercel/analytics` package is already installed as a dependency:

```bash
pnpm install @vercel/analytics
```

## Configuration

### Enable Web Analytics in Vercel Dashboard

1. Go to your [Vercel dashboard](https://vercel.com/dashboard)
2. Select your Movement Core project
3. Click the **Analytics** tab
4. Click **Enable** to activate Web Analytics

**Note:** Enabling Web Analytics will automatically add analytics routes (`/_vercel/insights/*`) after your next deployment.

## Implementation Details

### Analytics Module (`src/analytics.ts`)

The analytics module provides utility functions for tracking:

- **`trackPageView(data)`** - Log API endpoint accesses
  ```typescript
  trackPageView({
    pathname: request.url,
    referrer: request.headers.referer
  });
  ```

- **`trackCustomEvent(eventName, properties)`** - Track custom events
  ```typescript
  trackCustomEvent("api-request", {
    method: request.method,
    endpoint: request.url,
    duration: responseTime
  });
  ```

- **`trackPageDuration(pathname, duration)`** - Track how long requests take
  ```typescript
  trackPageDuration(request.url, endTime - startTime);
  ```

### Analytics Middleware (`src/middleware/analytics.ts`)

The analytics middleware automatically tracks:

- Page views (API endpoint accesses)
- Request duration and performance metrics
- HTTP method and status codes

The middleware is integrated into the Fastify application in `src/index.ts`:

```typescript
fastify.addHook("onRequest", async (request, reply) => {
  trackPageView({
    pathname: request.url,
    referrer: request.headers.referer || undefined,
  });
});
```

## How It Works

### Server-Side Tracking

For a Fastify backend application:

1. **Vercel Deployment**: When deployed to Vercel, the platform automatically injects analytics tracking
2. **Analytics Routes**: Vercel creates `/_vercel/insights/*` routes to handle analytics collection
3. **Client-Side Script**: Client requests can trigger analytics collection through the `/_vercel/insights/script.js` endpoint
4. **Server Logging**: The analytics module logs tracking events in development mode for debugging

### Client-Side Integration

When clients interact with your API:

1. Requests are automatically tracked by Vercel's analytics infrastructure
2. Page views and custom events are recorded
3. Data is sent to the `/_vercel/insights/view` endpoint
4. Analytics are visible in the Vercel dashboard

## Deployment

To deploy your application to Vercel:

```bash
vercel deploy
```

Or, connect your Git repository to Vercel for automatic deployments on every push:

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import your repository
3. Deploy

Once deployed, analytics will automatically start tracking visitors and API requests.

## Viewing Analytics Data

### In the Vercel Dashboard

1. Go to your [Vercel dashboard](https://vercel.com/dashboard)
2. Select your Movement Core project
3. Click the **Analytics** tab
4. View real-time metrics:
   - Page views and visitors
   - Top pages
   - Referrers
   - Custom events (Pro/Enterprise plans)

### Custom Events

Users on Pro and Enterprise plans can track custom events to monitor:

- Specific API endpoint usage
- User interactions
- Performance metrics
- Business events

Example custom event tracking:

```typescript
trackCustomEvent("governance-proposal-submitted", {
  proposalId: "prop-123",
  proposer: "user-456",
  timestamp: Date.now()
});
```

## Network Verification

To verify that analytics are working correctly:

1. Open your browser's **Network** tab (DevTools)
2. Navigate to your application
3. Look for a request to `/_vercel/insights/view`
4. The request should have a `2xx` status code, indicating successful tracking

**Note:** This will only work when the application is deployed to Vercel. In development mode, the analytics module logs to the console instead.

## Best Practices

1. **Enable in Production**: Make sure analytics are enabled in your Vercel project settings
2. **Monitor Performance**: Use analytics to track API response times and performance
3. **Track Key Events**: Log important user interactions and API events for business insights
4. **Review Data**: Regularly check the Vercel dashboard to analyze traffic patterns and API usage
5. **Privacy**: Vercel Web Analytics respects user privacy and GDPR compliance

## Troubleshooting

### Analytics Not Showing Data

- Verify analytics are enabled in the Vercel dashboard
- Ensure the application is deployed to Vercel (not running locally)
- Check that users are accessing the application
- Wait a few moments for data to appear in the dashboard

### Missing Network Request

- Verify you're deployed to Vercel
- Check the browser console for any JavaScript errors
- Ensure the `@vercel/analytics` package is installed
- Confirm Web Analytics is enabled in Vercel project settings

### Development Mode

In development mode (local testing):

- Analytics functions log to the console with `console.debug()`
- No data is sent to Vercel (since the app isn't deployed)
- This helps verify the code is working correctly

## Privacy & Compliance

Vercel Web Analytics:

- Respects user privacy and does not use cookies
- Is GDPR compliant
- Does not track personally identifiable information (PII) by default
- Provides data retention and deletion options

For more information, see [Vercel Analytics Privacy Policy](https://vercel.com/docs/analytics/privacy-policy).

## Next Steps

- Monitor analytics regularly in the Vercel dashboard
- Add custom event tracking for business-critical operations
- Set up alerts for performance metrics
- Review analytics data to optimize API performance
- Explore privacy settings and data retention options

## References

- [Vercel Web Analytics Documentation](https://vercel.com/docs/analytics)
- [Vercel Web Analytics Package](https://www.npmjs.com/package/@vercel/analytics)
- [Fastify Hooks Documentation](https://www.fastify.io/docs/latest/Hooks/)
- [Vercel Deployment Guide](https://vercel.com/docs/deployments/overview)
