/**
 * Example usage of Vercel Web Analytics in Movement Core
 *
 * This file demonstrates how to use the analytics functions throughout
 * your Fastify application to track user interactions and custom events.
 */

import { trackCustomEvent, trackPageDuration } from "../src/analytics.js";

/**
 * Example 1: Tracking a proposal submission
 */
export function trackProposalSubmission(proposalData: {
  proposalId: string;
  title: string;
  description: string;
  votingPeriodDays: number;
  creatorId: string;
}) {
  trackCustomEvent("governance-proposal-submitted", {
    proposalId: proposalData.proposalId,
    title: proposalData.title,
    votingPeriodDays: proposalData.votingPeriodDays,
    creatorId: proposalData.creatorId,
  });
}

/**
 * Example 2: Tracking a vote cast
 */
export function trackVoteCast(voteData: {
  proposalId: string;
  voterId: string;
  votingSide: "for" | "against" | "abstain";
  votingWeight: number;
}) {
  trackCustomEvent("governance-vote-cast", {
    proposalId: voteData.proposalId,
    votingSide: voteData.votingSide,
    votingWeight: voteData.votingWeight,
  });
}

/**
 * Example 3: Tracking page duration
 */
export function trackPageLoadTime(pathname: string, duration: number) {
  trackPageDuration(pathname, duration);

  // Also track a custom event if the page load time is unusually high
  if (duration > 3000) {
    trackCustomEvent("slow-page-load", {
      pathname,
      duration,
      threshold: 3000,
    });
  }
}

/**
 * Example 4: Tracking user authentication events
 */
export function trackUserAuthentication(action: "login" | "logout" | "signup") {
  trackCustomEvent(`user-${action}`, {
    timestamp: Date.now(),
  });
}

/**
 * Example 5: Tracking API errors
 */
export function trackAPIError(endpoint: string, statusCode: number, error: string) {
  trackCustomEvent("api-error", {
    endpoint,
    statusCode,
    errorType: error,
    timestamp: Date.now(),
  });
}

/**
 * Example 6: Tracking feature usage
 */
export function trackFeatureUsage(featureName: string, metadata?: Record<string, unknown>) {
  trackCustomEvent("feature-used", {
    feature: featureName,
    ...metadata,
  });
}

/**
 * Example 7: Tracking performance metrics
 */
export function trackDatabaseQueryTime(query: string, duration: number) {
  if (duration > 1000) {
    // Only track slow queries
    trackCustomEvent("slow-db-query", {
      query,
      duration,
      threshold: 1000,
    });
  }
}

/**
 * Example usage in a route handler:
 *
 * ```typescript
 * fastify.post<{ Body: ProposalPayload }>("/api/proposals", async (request, reply) => {
 *   const startTime = Date.now();
 *
 *   try {
 *     // ... create proposal logic ...
 *
 *     trackProposalSubmission({
 *       proposalId: proposal.id,
 *       title: proposal.title,
 *       description: proposal.description,
 *       votingPeriodDays: proposal.votingPeriod,
 *       creatorId: request.user.id,
 *     });
 *
 *     return reply.status(201).send(proposal);
 *   } catch (error) {
 *     const duration = Date.now() - startTime;
 *     trackPageLoadTime(request.url, duration);
 *
 *     return reply.status(500).send({ error: "Failed to create proposal" });
 *   }
 * });
 * ```
 */
