# Getting Started with Vercel Web Analytics

This guide helps you get started with using Vercel Web Analytics on the Movement Core project. It covers how to enable it, add the package to your project, deploy your app to Vercel, and view your data in the dashboard.

**Last Updated:** August 3, 2026 - Following official Vercel documentation from https://vercel.com/docs/analytics/quickstart

## Prerequisites

- A Vercel account. If you don't have one, you can [sign up for free](https://vercel.com/signup).
- A Vercel project. If you don't have one, you can [create a new project](https://vercel.com/new).
- The Vercel CLI installed globally. Install it using the following command:

### Install the Vercel CLI

Using npm:
```bash
npm i -g vercel
```

Using pnpm:
```bash
pnpm i -g vercel
```

Using yarn:
```bash
yarn global add vercel
```

Using bun:
```bash
bun add -g vercel
```

## Enable Web Analytics in Vercel

On the [Vercel dashboard](/dashboard), select your Project and then click the **Analytics** tab and click **Enable** from the dialog.

> **💡 Note:** Enabling Web Analytics will add new routes (scoped at `/_vercel/insights/*`) after your next deployment.

## Add `@vercel/analytics` to Your Project

The `@vercel/analytics` package is included in the Movement Core project dependencies (version 1.1.1+). To install or update it, use your package manager of choice:

### Using npm:
```bash
npm install @vercel/analytics
```

### Using pnpm:
```bash
pnpm add @vercel/analytics
```

### Using yarn:
```bash
yarn add @vercel/analytics
```

### Using bun:
```bash
bun add @vercel/analytics
```

After installation, run your package manager's install command to ensure all dependencies are up to date:
```bash
npm install  # or pnpm install, yarn install, bun install
```

## Integration for Fastify Backend

Since Movement Core is a Fastify backend application (not a frontend framework), the analytics integration is implemented through utility functions rather than a UI component.

### How Analytics Work in Movement Core

Analytics are tracked automatically when your application is deployed to Vercel. The `@vercel/analytics` package provides infrastructure support, and Vercel automatically:

1. Injects the analytics tracking script
2. Creates analytics routes at `/_vercel/insights/*`
3. Collects data from client requests
4. Provides data visualization in the dashboard

### Using Analytics Functions

The Movement Core project provides utility functions in `src/analytics.ts` for tracking events:

#### Track Page Views (API Endpoints)

```typescript
import { trackPageView } from "./analytics.js";

trackPageView({
  pathname: "/api/governance",
  referrer: "https://example.com",
});
```

#### Track Custom Events

```typescript
import { trackCustomEvent } from "./analytics.js";

trackCustomEvent("proposal-submitted", {
  proposalId: "prop-123",
  votingPeriod: 7,
});
```

#### Track Page Duration

```typescript
import { trackPageDuration } from "./analytics.js";

trackPageDuration("/api/governance", 1234); // 1234 milliseconds
```

### Using Analytics Middleware

The analytics middleware in `src/middleware/analytics.ts` automatically tracks all requests. It's already integrated into `src/index.ts`:

```typescript
fastify.addHook("onRequest", async (request, reply) => {
  trackPageView({
    pathname: request.url,
    referrer: request.headers.referer || undefined,
  });
});
```

## Deploy Your App to Vercel

Deploy your app using the Vercel CLI:

```bash
vercel deploy
```

Alternatively, if you haven't already, we also recommend [connecting your project's Git repository](https://vercel.com/docs/git#deploying-a-git-repository), which will enable Vercel to deploy your latest commits to main without terminal commands.

Once your app is deployed, it will start tracking visitors and page views.

> **💡 Note:** If everything is set up properly, you should be able to see a Fetch/XHR request in your browser's Network tab from `/_vercel/insights/view` when you visit any page.

## View Your Data in the Dashboard

Once your app is deployed, and users have visited your site, you can view your data in the dashboard.

To do so, go to your [dashboard](https://vercel.com/dashboard), select your project, and click the **Analytics** tab.

After a few days of visitors, you'll be able to start exploring your data by viewing and filtering the panels.

Users on Pro and Enterprise plans can also add custom events to their data to track user interactions such as API endpoint usage, proposal submissions, or votes.

## Next Steps

Now that you have Vercel Web Analytics set up, you can explore the following topics to learn more:

- [Learn how to use the analytics utilities](./ANALYTICS.md)
- [Learn how to set custom events](./ANALYTICS.md#tracking-custom-events)
- [Read about privacy and compliance](https://vercel.com/docs/analytics/privacy-policy)
- [Explore pricing](https://vercel.com/docs/analytics/limits-and-pricing)
- [Troubleshooting](./ANALYTICS.md#troubleshooting)
