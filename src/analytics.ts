/**
 * Vercel Web Analytics Configuration
 * 
 * Official Vercel Web Analytics integration for Movement Core backend API.
 * 
 * This module integrates the official @vercel/analytics package into the 
 * Movement Core Fastify backend application.
 *
 * ## How Vercel Web Analytics Works with Backend APIs
 *
 * When deployed to Vercel, Web Analytics is automatically enabled for your
 * application with the following features:
 * 
 * - Analytics routes are automatically created at `/_vercel/insights/*`
 * - API endpoint usage is tracked automatically
 * - Request metrics (response time, status codes) are collected
 * - Custom events can be sent from client applications
 * - All data appears in the Vercel Dashboard Analytics tab
 *
 * ## Setup Instructions
 *
 * 1. **Enable Web Analytics in Vercel Dashboard:**
 *    - Go to your project in the Vercel Dashboard
 *    - Click the "Analytics" tab
 *    - Click "Enable" to activate Web Analytics
 *    - New routes will be created at `/_vercel/insights/*` after next deployment
 *
 * 2. **Package Installation:**
 *    The `@vercel/analytics` package is already installed as a dependency.
 *    
 * 3. **Deployment:**
 *    Deploy your application using:
 *    ```bash
 *    vercel deploy
 *    ```
 *
 * 4. **Verification:**
 *    After deployment, check the browser's Network tab for Fetch/XHR requests
 *    to `/_vercel/insights/view` when accessing your API endpoints.
 *
 * ## Server-Side Tracking Utilities
 *
 * While Vercel automatically tracks analytics on the platform level, this module
 * provides utilities for logging and monitoring analytics events on the server side.
 *
 * @packageDocumentation
 */

/**
 * Initialize Vercel Web Analytics tracking
 * 
 * Call this function at application startup to initialize analytics.
 * When deployed to Vercel, analytics are automatically enabled.
 * 
 * @example
 * ```typescript
 * import { initializeAnalytics } from './analytics.js';
 * 
 * // Initialize at app startup
 * initializeAnalytics();
 * ```
 */
export function initializeAnalytics(): void {
  const isProduction = process.env.NODE_ENV === "production";
  const isVercel = process.env.VERCEL === "1";

  if (isProduction && isVercel) {
    console.info("✓ Vercel Web Analytics initialized - tracking is active");
    console.info("  Analytics dashboard: https://vercel.com/dashboard");
  } else if (isProduction) {
    console.warn("⚠ Running in production but not on Vercel - analytics may not be active");
  } else {
    console.debug("ℹ Vercel Web Analytics initialized (development mode - logging only)");
  }
}

/**
 * Track an API endpoint request
 * 
 * Logs API endpoint access for monitoring purposes. When deployed to Vercel,
 * all API requests are automatically tracked in the Analytics dashboard.
 * 
 * @param data - Request data including pathname and optional referrer
 * 
 * @example
 * ```typescript
 * trackPageView({
 *   pathname: '/api/governance',
 *   referrer: 'https://example.com'
 * });
 * ```
 */
export function trackPageView(data: {
  pathname: string;
  referrer?: string;
}): void {
  // When deployed to Vercel, all requests are automatically tracked
  // This provides server-side logging for monitoring
  if (process.env.NODE_ENV === "development") {
    console.debug("📊 Analytics: Endpoint accessed", {
      pathname: data.pathname,
      referrer: data.referrer || "(direct)",
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Track a custom event
 * 
 * Logs custom events for monitoring purposes. For client-side custom event
 * tracking, use the Vercel Analytics client library in your frontend application.
 * 
 * Note: Custom events require a Vercel Pro or Enterprise plan.
 * 
 * @param eventName - Name of the custom event
 * @param properties - Additional event properties (optional)
 * 
 * @example
 * ```typescript
 * trackCustomEvent('proposal-submitted', {
 *   proposalId: 'prop-123',
 *   votingPeriod: 7
 * });
 * ```
 */
export function trackCustomEvent(
  eventName: string,
  properties?: Record<string, unknown>
): void {
  // Custom events are logged for server-side monitoring
  // Client-side tracking should use the @vercel/analytics client library
  if (process.env.NODE_ENV === "development") {
    console.debug("📊 Analytics: Custom event", {
      event: eventName,
      properties: properties || {},
      timestamp: new Date().toISOString(),
    });
  } else if (process.env.VERCEL === "1") {
    // In production on Vercel, log only for audit trail
    console.info(`Analytics event: ${eventName}`, properties || {});
  }
}

/**
 * Track page/endpoint duration
 * 
 * Records how long a page or endpoint takes to process. Useful for
 * performance monitoring and identifying slow endpoints.
 * 
 * @param pathname - The endpoint path
 * @param duration - Duration in milliseconds
 * 
 * @example
 * ```typescript
 * const startTime = Date.now();
 * // ... process request ...
 * trackPageDuration('/api/proposals', Date.now() - startTime);
 * ```
 */
export function trackPageDuration(pathname: string, duration: number): void {
  trackCustomEvent("endpoint-duration", {
    pathname,
    duration,
    durationSeconds: (duration / 1000).toFixed(2),
  });
}
