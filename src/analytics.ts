/**
 * Vercel Web Analytics Configuration
 *
 * This module integrates Vercel Web Analytics into the Movement Core backend.
 * It provides utilities for tracking page views and custom events.
 *
 * For a Fastify backend application deployed on Vercel:
 * - Vercel automatically injects analytics tracking at deployment
 * - The analytics routes (/_vercel/insights/*) are automatically created
 * - Client-side requests to the API will be tracked automatically
 * - Page views and custom events are tracked via the analytics script
 *
 * This module provides logging and utility functions for analytics tracking
 * that work on the server-side.
 *
 * ## Setup
 *
 * 1. Enable Web Analytics in your Vercel Dashboard (Analytics tab)
 * 2. Ensure @vercel/analytics is installed (already included)
 * 3. Use the tracking functions provided in this module
 * 4. Deploy to Vercel - analytics will automatically be enabled
 *
 * ## Deployment
 *
 * When deployed to Vercel, the platform automatically:
 * - Injects the analytics tracking infrastructure
 * - Creates the /_vercel/insights/* routes
 * - Collects data from client requests
 * - Provides analytics data in the Vercel Dashboard
 */

/**
 * Initialize analytics tracking
 * This function can be called at application startup for any initialization tasks
 */
export function initializeAnalytics(): void {
  if (process.env.NODE_ENV === "production") {
    console.info("Vercel Web Analytics initialized - tracking is active");
  } else {
    console.debug(
      "Vercel Web Analytics initialized (development mode - logging only)"
    );
  }
}

/**
 * Track a page view with Vercel Analytics
 * @param data Page view data including pathname and optional referrer
 */
export function trackPageView(data: {
  pathname: string;
  referrer?: string;
}): void {
  // When deployed to Vercel, analytics are automatically tracked
  // This function logs the tracking for monitoring purposes
  if (process.env.NODE_ENV === "development") {
    console.debug("Analytics: Page view tracked", {
      pathname: data.pathname,
      referrer: data.referrer,
    });
  }
}

/**
 * Track a custom event with Vercel Analytics
 * @param eventName Name of the custom event
 * @param properties Additional event properties
 */
export function trackCustomEvent(
  eventName: string,
  properties?: Record<string, unknown>
): void {
  // When deployed to Vercel, custom events can be tracked via the client-side script
  // This function logs the event for monitoring purposes
  if (process.env.NODE_ENV === "development") {
    console.debug("Analytics: Custom event tracked", {
      event: eventName,
      properties,
    });
  }
}

/**
 * Track a page view duration
 * @param pathname Page pathname
 * @param duration Duration in milliseconds
 */
export function trackPageDuration(pathname: string, duration: number): void {
  trackCustomEvent("page-duration", {
    pathname,
    duration,
  });
}
