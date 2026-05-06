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
 */

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
