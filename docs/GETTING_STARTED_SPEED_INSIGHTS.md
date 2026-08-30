# Getting Started with Vercel Speed Insights

This guide helps you get started with using Vercel Speed Insights on the Movement Core project. Speed Insights tracks Core Web Vitals and performance metrics to help you understand and optimize the user experience of your web application.

## What is Speed Insights?

Vercel Speed Insights automatically tracks important performance metrics including:

- **Largest Contentful Paint (LCP)** - Measures loading performance
- **First Input Delay (FID)** - Measures interactivity  
- **Cumulative Layout Shift (CLS)** - Measures visual stability
- **First Contentful Paint (FCP)** - Measures perceived loading speed
- **Time to First Byte (TTFB)** - Measures server response time

These metrics are part of Google's Core Web Vitals and directly impact SEO rankings and user experience.

## Prerequisites

- A Vercel account. If you don't have one, you can [sign up for free](https://vercel.com/signup).
- A Vercel project. If you don't have one, you can [create a new project](https://vercel.com/new).
- The Vercel CLI installed (optional). Install with: `npm i -g vercel`

## Enable Speed Insights in Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your Project
3. Click the **Speed Insights** tab
4. Click **Enable** from the dialog

> **💡 Note:** Enabling Speed Insights will add new routes (scoped at `/_vercel/speed-insights/*`) after your next deployment.

## Package Installation

The `@vercel/speed-insights` package is already included in the Movement Core project dependencies. If you need to add it manually to another project:

### Using npm:
```bash
npm i @vercel/speed-insights
```

### Using pnpm:
```bash
pnpm i @vercel/speed-insights
```

### Using yarn:
```bash
yarn add @vercel/speed-insights
```

### Using bun:
```bash
bun add @vercel/speed-insights
```

## Integration for Backend Applications

Since Movement Core is a Fastify backend application that can serve HTML pages, Speed Insights is integrated through script injection into HTML responses.

### How Speed Insights Works in Movement Core

1. **Automatic Script Injection**: HTML pages served by the application include the Speed Insights script
2. **Core Web Vitals Collection**: The script automatically measures performance metrics in the browser
3. **Data Upload**: Metrics are sent to `/_vercel/speed-insights/*` routes (automatically created by Vercel)
4. **Dashboard Visualization**: View performance data in the Vercel Dashboard

### Using Speed Insights Functions

Movement Core provides utility functions in `src/speed-insights.ts` for integrating Speed Insights:

#### Initialize Speed Insights

```typescript
import { initializeSpeedInsights } from "./speed-insights.js";

// Call at application startup
initializeSpeedInsights();
```

#### Get Speed Insights Script

For manual HTML generation:

```typescript
import { getSpeedInsightsScript } from "./speed-insights.js";

const script = getSpeedInsightsScript();
// Returns the script tags to inject into your HTML
```

#### Inject Speed Insights into HTML

Automatically inject the script into existing HTML:

```typescript
import { injectSpeedInsights } from "./speed-insights.js";

let html = `
<!DOCTYPE html>
<html>
  <head><title>My Page</title></head>
  <body><h1>Hello World</h1></body>
</html>`;

// Inject into head (default)
html = injectSpeedInsights(html, 'head');

// Or inject before closing body tag
html = injectSpeedInsights(html, 'body');
```

#### Generate Complete HTML Page

Use the helper function to create a complete HTML page with Speed Insights:

```typescript
import { getSampleHTMLWithInsights } from "./speed-insights.js";

const html = getSampleHTMLWithInsights(
  "My Page Title",
  "<h1>Page Content</h1>"
);
```

### Example Fastify Route with Speed Insights

```typescript
import { getSampleHTMLWithInsights } from "./speed-insights.js";

fastify.get("/dashboard", async (request, reply) => {
  const content = `
    <h1>Dashboard</h1>
    <div class="metrics">
      <p>Network Status: Active</p>
    </div>
  `;
  
  const html = getSampleHTMLWithInsights("Dashboard", content);
  reply.type("text/html").send(html);
});
```

## Example Implementation

The Movement Core project includes example routes with Speed Insights:

- `/` - Home page with Speed Insights
- `/dashboard` - Dashboard page with Speed Insights

You can test these routes locally:

```bash
npm run dev
```

Then visit `http://localhost:3000/` or `http://localhost:3000/dashboard`

## Deploy Your App to Vercel

Deploy your app using the Vercel CLI:

```bash
vercel deploy
```

Alternatively, connect your project's Git repository for automatic deployments when you push to main.

Once deployed, Speed Insights will automatically start collecting Core Web Vitals data from user visits.

> **💡 Note:** Speed Insights only activates in production. In development, the script is replaced with a comment for testing purposes.

## View Your Data in the Dashboard

After your app is deployed and users have visited your pages:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click the **Speed Insights** tab
4. View Core Web Vitals metrics, performance scores, and trends

### Understanding the Metrics

- **LCP < 2.5s** = Good
- **FID < 100ms** = Good  
- **CLS < 0.1** = Good
- **FCP < 1.8s** = Good
- **TTFB < 600ms** = Good

## Difference Between Web Analytics and Speed Insights

Movement Core uses both Vercel products:

| Feature | Web Analytics | Speed Insights |
|---------|--------------|----------------|
| **Purpose** | Track page views and user events | Track performance metrics |
| **Metrics** | Page views, custom events, traffic | Core Web Vitals, loading times |
| **Package** | `@vercel/analytics` | `@vercel/speed-insights` |
| **Use Case** | Understand user behavior | Optimize performance |

Both work together to give you a complete picture of your application's health and user experience.

## Framework-Specific Notes

### For Backend APIs (like Movement Core)

Speed Insights is most useful when your API serves HTML pages. If your application is purely an API that returns JSON, you may want to:

1. Add Speed Insights to your frontend application instead
2. Use it on documentation pages or admin dashboards
3. Track API response times using Web Analytics custom events

### For Frontend Frameworks

If you're building a separate frontend, see the official Vercel documentation for framework-specific integration:

- [Next.js Integration](https://vercel.com/docs/speed-insights/quickstart#next.js)
- [React Integration](https://vercel.com/docs/speed-insights/quickstart#react)
- [Vue Integration](https://vercel.com/docs/speed-insights/quickstart#vue)
- [Svelte Integration](https://vercel.com/docs/speed-insights/quickstart#sveltekit)

## Environment Variables

Speed Insights automatically detects the environment:

- In **production** (`NODE_ENV=production` or `VERCEL_ENV` set): Fully active
- In **development**: Script injection is replaced with HTML comments

No additional configuration is required.

## Troubleshooting

### Script Not Loading

1. Verify Speed Insights is enabled in your Vercel Dashboard
2. Confirm you've deployed to Vercel (Speed Insights only works on Vercel)
3. Check that the HTML includes the script tags (view page source)
4. Look for requests to `/_vercel/speed-insights/script.js` in Network tab

### No Data in Dashboard

1. Ensure you've deployed to production
2. Wait a few minutes for data to appear (not real-time)
3. Verify users have actually visited your pages
4. Check that the pages serve HTML (not just JSON APIs)

### Development Testing

Speed Insights only activates in production. To test locally:

1. Check that `getSpeedInsightsScript()` returns the correct HTML
2. Verify the script is injected into your HTML responses
3. Deploy to Vercel preview environment to test with real data

## Next Steps

- [Learn about optimizing Core Web Vitals](https://web.dev/vitals/)
- [Read about Speed Insights pricing](https://vercel.com/docs/speed-insights/limits-and-pricing)
- [Explore Web Analytics integration](./GETTING_STARTED_ANALYTICS.md)
- [View example implementation](../examples/fastify-integration.ts)

## Additional Resources

- [Official Vercel Speed Insights Docs](https://vercel.com/docs/speed-insights)
- [Core Web Vitals Guide](https://web.dev/vitals/)
- [Google's Performance Optimization](https://developers.google.com/web/fundamentals/performance)
- [Movement Core Speed Insights Module](../src/speed-insights.ts)
