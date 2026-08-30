import Fastify from "fastify";
import { initializeAnalytics, trackPageView } from "./analytics.js";
import { initializeSpeedInsights, getSampleHTMLWithInsights } from "./speed-insights.js";

const fastify = Fastify({
  logger: true,
});

// Initialize analytics tracking
initializeAnalytics();

// Initialize Speed Insights tracking
initializeSpeedInsights();

// Register a hook to track page views
fastify.addHook("onRequest", async (request, _reply) => {
  // Track the page view with Vercel Analytics
  trackPageView({
    pathname: request.url,
    referrer: request.headers.referer || undefined,
  });
});

// Health check endpoint
fastify.get("/health", async (_request, _reply) => {
  return { status: "ok" };
});

// Example API endpoint
fastify.get("/api/governance", async (_request, _reply) => {
  return {
    message: "Movement Network Governance",
    version: "1.0.0",
  };
});

// Example HTML page with Speed Insights
fastify.get("/", async (request, reply) => {
  const content = `
    <h1>Movement Network</h1>
    <p>Welcome to Movement Core - A modular civilization layer for blockchain infrastructure</p>
    <nav>
      <ul>
        <li><a href="/api/governance">Governance API</a></li>
        <li><a href="/health">Health Check</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
      </ul>
    </nav>
  `;
  
  const html = getSampleHTMLWithInsights("Movement Network", content);
  reply.type("text/html").send(html);
});

// Example dashboard page with Speed Insights
fastify.get("/dashboard", async (request, reply) => {
  const content = `
    <h1>Movement Network Dashboard</h1>
    <div class="metrics">
      <div class="metric">
        <h2>Network Status</h2>
        <p>Active</p>
      </div>
      <div class="metric">
        <h2>Proposals</h2>
        <p>12 Active</p>
      </div>
      <div class="metric">
        <h2>Total Votes</h2>
        <p>1,234</p>
      </div>
    </div>
    <style>
      body { font-family: system-ui, sans-serif; max-width: 1200px; margin: 0 auto; padding: 2rem; }
      .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 2rem; }
      .metric { background: #f5f5f5; padding: 1.5rem; border-radius: 8px; }
      .metric h2 { margin: 0 0 0.5rem 0; font-size: 1rem; color: #666; }
      .metric p { margin: 0; font-size: 2rem; font-weight: bold; color: #333; }
    </style>
  `;
  
  const html = getSampleHTMLWithInsights("Dashboard - Movement Network", content);
  reply.type("text/html").send(html);
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
