/**
 * Vercel Speed Insights Configuration
 *
 * This module integrates Vercel Speed Insights into the Movement Core backend.
 * Speed Insights tracks Core Web Vitals and performance metrics for web applications.
 *
 * For backend applications serving HTML content:
 * - Speed Insights automatically collects Core Web Vitals
 * - Tracks Largest Contentful Paint (LCP)
 * - Tracks First Input Delay (FID)
 * - Tracks Cumulative Layout Shift (CLS)
 * - Tracks First Contentful Paint (FCP)
 * - Tracks Time to First Byte (TTFB)
 *
 * ## Setup
 *
 * 1. Enable Speed Insights in your Vercel Dashboard (Speed Insights tab)
 * 2. Ensure @vercel/speed-insights is installed (already included)
 * 3. Add the Speed Insights script to your HTML pages
 * 4. Deploy to Vercel - Speed Insights will automatically activate
 *
 * ## Deployment
 *
 * When deployed to Vercel, the platform automatically:
 * - Creates the /_vercel/speed-insights/* routes
 * - Collects Core Web Vitals data
 * - Provides performance data in the Vercel Dashboard
 */

/**
 * Generate Speed Insights script tags for HTML injection
 * This should be added to the <head> or before </body> in HTML responses
 * 
 * @returns HTML script tags for Speed Insights
 */
export function getSpeedInsightsScript(): string {
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV) {
    return `<script>
  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
</script>
<script defer src="/_vercel/speed-insights/script.js"></script>`;
  }
  
  // In development, return a no-op script for testing
  return `<!-- Speed Insights: Development mode (tracking disabled) -->`;
}

/**
 * Inject Speed Insights into HTML content
 * Use this helper to automatically inject the Speed Insights script into HTML responses
 * 
 * @param html - The HTML content to inject the script into
 * @param position - Where to inject: 'head' (default) or 'body'
 * @returns HTML content with Speed Insights script injected
 */
export function injectSpeedInsights(html: string, position: 'head' | 'body' = 'head'): string {
  const script = getSpeedInsightsScript();
  
  if (position === 'head') {
    // Inject before closing </head> tag
    return html.replace('</head>', `${script}\n</head>`);
  } else {
    // Inject before closing </body> tag
    return html.replace('</body>', `${script}\n</body>`);
  }
}

/**
 * Initialize Speed Insights
 * This function can be called at application startup for logging
 */
export function initializeSpeedInsights(): void {
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV) {
    console.info('Vercel Speed Insights initialized - Core Web Vitals tracking is active');
  } else {
    console.debug('Vercel Speed Insights initialized (development mode - tracking disabled)');
  }
}

/**
 * Get a sample HTML page with Speed Insights integrated
 * This demonstrates how to properly integrate Speed Insights into HTML responses
 * 
 * @param title - Page title
 * @param content - Page content
 * @returns Complete HTML page with Speed Insights
 */
export function getSampleHTMLWithInsights(title: string, content: string): string {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  ${getSpeedInsightsScript()}
</head>
<body>
  ${content}
</body>
</html>`;
  
  return html;
}
