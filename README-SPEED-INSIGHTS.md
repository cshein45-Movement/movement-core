# Vercel Speed Insights Integration

This document provides an overview of the Vercel Speed Insights integration in the Movement Core project.

## Overview

Vercel Speed Insights has been successfully integrated into this project to track Core Web Vitals and performance metrics. This integration helps monitor and optimize the user experience of web pages served by the Movement Core backend.

## What's Included

### 1. Package Installation

- **@vercel/speed-insights** package added to dependencies (v1.0.12)
- Installed alongside existing @vercel/analytics package

### 2. Speed Insights Module (`src/speed-insights.ts`)

A comprehensive TypeScript module providing:

- `initializeSpeedInsights()` - Initialize Speed Insights at application startup
- `getSpeedInsightsScript()` - Generate the Speed Insights script tags
- `injectSpeedInsights(html, position)` - Automatically inject the script into HTML
- `getSampleHTMLWithInsights(title, content)` - Create complete HTML pages with Speed Insights

### 3. Integration in Main Application (`src/index.ts`)

The main application now includes:

- Speed Insights initialization on startup
- Example HTML routes (`/` and `/dashboard`) with Speed Insights enabled
- Proper script injection into HTML responses

### 4. Updated Example (`examples/fastify-integration.ts`)

The Fastify integration example has been updated to include:

- Speed Insights initialization
- Proper import statements
- TypeScript type safety for all routes

### 5. Comprehensive Documentation

- **docs/GETTING_STARTED_SPEED_INSIGHTS.md** - Complete guide covering:
  - What Speed Insights is and what it measures
  - Installation and setup instructions
  - Usage examples for backend applications
  - Framework-specific notes
  - Troubleshooting guide
  - Performance metric explanations

### 6. Project Configuration

New configuration files added:

- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.json` - ESLint configuration
- `.gitignore` - Git ignore patterns
- `vercel.json` - Vercel deployment configuration

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build the project
npm run build

# Run linter
npm run lint

# Type check
npm run type-check
```

### Testing Locally

Visit the example HTML pages with Speed Insights:

```bash
npm run dev
```

Then open:
- http://localhost:3000/ - Home page with Speed Insights
- http://localhost:3000/dashboard - Dashboard page with Speed Insights

### Deployment

Deploy to Vercel to activate Speed Insights:

```bash
vercel deploy
```

Or connect your Git repository for automatic deployments.

## How It Works

### In Production (Vercel)

1. When deployed to Vercel, the Speed Insights script is automatically activated
2. The script loads from `/_vercel/speed-insights/script.js` (created automatically by Vercel)
3. Core Web Vitals are collected from real user visits
4. Data appears in the Vercel Dashboard under Speed Insights tab

### In Development

- Script injection is replaced with HTML comments
- No tracking occurs locally
- You can still verify the script injection works correctly

## Core Web Vitals Tracked

Speed Insights automatically measures:

| Metric | What It Measures | Good Score |
|--------|------------------|------------|
| **LCP** | Largest Contentful Paint - Loading performance | < 2.5s |
| **FID** | First Input Delay - Interactivity | < 100ms |
| **CLS** | Cumulative Layout Shift - Visual stability | < 0.1 |
| **FCP** | First Contentful Paint - Perceived loading speed | < 1.8s |
| **TTFB** | Time to First Byte - Server response time | < 600ms |

## Usage Examples

### Basic HTML Page with Speed Insights

```typescript
import { getSampleHTMLWithInsights } from "./speed-insights.js";

fastify.get("/my-page", async (request, reply) => {
  const content = `<h1>My Page</h1><p>Content here</p>`;
  const html = getSampleHTMLWithInsights("My Page", content);
  reply.type("text/html").send(html);
});
```

### Manual Script Injection

```typescript
import { getSpeedInsightsScript } from "./speed-insights.js";

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
    ${getSpeedInsightsScript()}
  </head>
  <body>
    <h1>Content</h1>
  </body>
</html>`;
```

### Inject into Existing HTML

```typescript
import { injectSpeedInsights } from "./speed-insights.js";

let html = getHtmlFromSomewhere();
html = injectSpeedInsights(html, 'head'); // or 'body'
```

## Difference from Web Analytics

Movement Core now has both Vercel products integrated:

| Product | Purpose | Tracks |
|---------|---------|--------|
| **Web Analytics** | User behavior tracking | Page views, events, traffic sources |
| **Speed Insights** | Performance tracking | Core Web Vitals, loading times |

Both work together to provide comprehensive monitoring.

## Environment Variables

Speed Insights automatically detects the environment using:

- `NODE_ENV=production` - Enables tracking
- `VERCEL_ENV` - Auto-set by Vercel deployment
- Development mode - Disables tracking

No manual configuration needed!

## Troubleshooting

### Script Not Loading in Browser

1. Verify you've deployed to Vercel (Speed Insights only works on Vercel)
2. Check Speed Insights is enabled in Vercel Dashboard
3. View page source to confirm script tags are present
4. Check browser Network tab for requests to `/_vercel/speed-insights/`

### No Data in Dashboard

1. Ensure you're in production environment
2. Wait a few minutes for data to process
3. Verify users are actually visiting the HTML pages
4. Check that pages return HTML, not just JSON

### TypeScript Errors

All code is fully typed. If you encounter TypeScript errors:

```bash
npm run type-check
```

## File Structure

```
movement-core/
├── src/
│   ├── analytics.ts           # Web Analytics module
│   ├── speed-insights.ts      # Speed Insights module (NEW)
│   └── index.ts               # Main application (UPDATED)
├── examples/
│   └── fastify-integration.ts # Example with both integrations (UPDATED)
├── docs/
│   ├── GETTING_STARTED_ANALYTICS.md
│   └── GETTING_STARTED_SPEED_INSIGHTS.md # Complete guide (NEW)
├── dist/                      # Build output
├── package.json               # Dependencies (NEW)
├── tsconfig.json              # TypeScript config (NEW)
├── .eslintrc.json             # ESLint config (NEW)
├── .gitignore                 # Git ignore (NEW)
├── vercel.json                # Vercel config (NEW)
└── README-SPEED-INSIGHTS.md   # This file (NEW)
```

## Next Steps

1. **Deploy to Vercel** - Speed Insights only activates in production
2. **Enable in Dashboard** - Turn on Speed Insights in your Vercel project settings
3. **Add More Pages** - Use the helper functions to add Speed Insights to more HTML routes
4. **Monitor Performance** - Check the Vercel Dashboard after deployment
5. **Optimize** - Use the data to identify and fix performance bottlenecks

## Resources

- [Official Vercel Speed Insights Documentation](https://vercel.com/docs/speed-insights)
- [Core Web Vitals Guide](https://web.dev/vitals/)
- [Getting Started Guide](./docs/GETTING_STARTED_SPEED_INSIGHTS.md)
- [Speed Insights Module Source](./src/speed-insights.ts)

## Support

For issues or questions:

1. Check the [Getting Started Guide](./docs/GETTING_STARTED_SPEED_INSIGHTS.md)
2. Review the [Troubleshooting section](#troubleshooting)
3. Consult [Vercel's official documentation](https://vercel.com/docs/speed-insights)

---

**Note**: This integration fetched the latest installation instructions from the official Vercel documentation to ensure compatibility with current best practices.
