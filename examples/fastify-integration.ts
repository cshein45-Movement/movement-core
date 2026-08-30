/**
 * Example Fastify application with Vercel Web Analytics and Speed Insights integration
 *
 * This shows how to integrate analytics and speed insights into a Fastify application
 * with proper error handling and performance tracking.
 */

import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { initializeAnalytics, trackPageView, trackCustomEvent } from "../src/analytics.js";
import { initializeSpeedInsights } from "../src/speed-insights.js";

/**
 * Create and configure a Fastify instance with analytics
 */
export async function createApp(): Promise<FastifyInstance> {
  const fastify = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || "info",
    },
  });

  // Initialize analytics tracking
  initializeAnalytics();
  
  // Initialize Speed Insights tracking
  initializeSpeedInsights();

  /**
   * Hook: Track all incoming requests
   */
  fastify.addHook("onRequest", async (request: FastifyRequest, reply: FastifyReply) => {
    const startTime = Date.now();

    // Track the page view
    trackPageView({
      pathname: request.url,
      referrer: request.headers.referer as string | undefined,
    });

    // Store start time for response tracking
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (reply as any)._startTime = startTime;
  });

  /**
   * Hook: Track response time and status
   */
  fastify.addHook("onResponse", async (request: FastifyRequest, reply: FastifyReply) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const startTime = (reply as any)._startTime || Date.now();
    const duration = Date.now() - startTime;

    // Track response metrics
    trackCustomEvent("http-request", {
      method: request.method,
      pathname: request.url,
      statusCode: reply.statusCode,
      duration,
    });

    // Track slow requests
    if (duration > 1000) {
      trackCustomEvent("slow-request", {
        pathname: request.url,
        duration,
        threshold: 1000,
      });
    }
  });

  /**
   * Health check endpoint
   */
  fastify.get("/health", async (_request: FastifyRequest, _reply: FastifyReply) => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  /**
   * Governance proposal endpoints
   */
  fastify.get<{ Params: { proposalId: string } }>(
    "/api/proposals/:proposalId",
    async (request: FastifyRequest<{ Params: { proposalId: string } }>, reply: FastifyReply) => {
      try {
        // Simulate fetching proposal
        const proposal = {
          id: request.params.proposalId,
          title: "Example Proposal",
          status: "active",
        };

        trackCustomEvent("proposal-viewed", {
          proposalId: request.params.proposalId,
        });

        return reply.status(200).send(proposal);
      } catch (error) {
        trackCustomEvent("proposal-view-error", {
          proposalId: request.params.proposalId,
          error: String(error),
        });

        return reply.status(500).send({ error: "Failed to fetch proposal" });
      }
    }
  );

  /**
   * Submit vote endpoint
   */
  fastify.post<{ Body: { proposalId: string; vote: "for" | "against" | "abstain" } }>(
    "/api/proposals/:proposalId/vote",
    async (request: FastifyRequest<{ Body: { proposalId: string; vote: "for" | "against" | "abstain" } }>, reply: FastifyReply) => {
      try {
        const { proposalId, vote } = request.body;

        // Simulate vote submission
        const result = {
          success: true,
          proposalId,
          vote,
          transactionHash: "0x123...",
        };

        trackCustomEvent("vote-submitted", {
          proposalId,
          vote,
        });

        return reply.status(200).send(result);
      } catch (error) {
        trackCustomEvent("vote-submission-error", {
          error: String(error),
        });

        return reply.status(500).send({ error: "Failed to submit vote" });
      }
    }
  );

  /**
   * Error handler
   */
  fastify.setErrorHandler(async (error: Error, request: FastifyRequest, reply: FastifyReply) => {
    fastify.log.error(error);

    trackCustomEvent("unhandled-error", {
      pathname: request.url,
      method: request.method,
      error: error.message,
    });

    return reply.status(500).send({ error: "Internal server error" });
  });

  return fastify;
}

/**
 * Start the server
 */
export async function start(): Promise<void> {
  const fastify = await createApp();

  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server running at http://localhost:3000");
    console.log("Analytics enabled - tracking requests to Vercel Web Analytics");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

// Start the server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  start();
}
