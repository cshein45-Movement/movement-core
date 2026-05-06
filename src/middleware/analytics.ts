import type { FastifyReply, FastifyRequest } from "fastify";
import { trackPageView, trackCustomEvent } from "../analytics.js";

/**
 * Middleware to track page views and performance metrics with Vercel Analytics
 */
export async function analyticsMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const startTime = Date.now();

  // Track the page view
  trackPageView({
    pathname: request.url,
    referrer: request.headers.referer as string | undefined,
  });

  // Hook into the onResponse event to measure page duration
  reply.header("x-analytics-tracked", "true");

  // Log the request for analytics purposes
  const duration = Date.now() - startTime;
  trackCustomEvent("page-load", {
    pathname: request.url,
    duration,
    method: request.method,
    statusCode: reply.statusCode,
  });
}
