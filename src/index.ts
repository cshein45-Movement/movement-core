import Fastify from "fastify";
import { trackPageView } from "./analytics.js";

const fastify = Fastify({
  logger: true,
});

// Register a hook to track page views
fastify.addHook("onRequest", async (request, reply) => {
  // Track the page view with Vercel Analytics
  trackPageView({
    pathname: request.url,
    referrer: request.headers.referer || undefined,
  });
});

// Health check endpoint
fastify.get("/health", async (request, reply) => {
  return { status: "ok" };
});

// Example API endpoint
fastify.get("/api/governance", async (request, reply) => {
  return {
    message: "Movement Network Governance",
    version: "1.0.0",
  };
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server running at http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
