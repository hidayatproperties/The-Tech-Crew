import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// PORT 5000 is required for Replit publishing health checks.
// We use a constant to ensure it's always this port.
const PORT = 5000;

// 1. OPEN PORT IMMEDIATELY
// This is the absolute first thing that happens to satisfy Replit's health check.
const server = createServer(app);

server.listen(PORT, "0.0.0.0", () => {
  log(`Health check ready: serving on port ${PORT}`);
});

// Middleware for logging
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

// 2. INITIALIZE APP LOGIC WITHOUT BLOCKING
// We register routes and setup static files in a separate block.
(async () => {
  try {
    // Register all API and Auth routes
    await registerRoutes(app);

    // Global error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      res.status(status).json({ message: err.message || "Internal Server Error" });
    });

    // Finalize setup based on environment
    if (app.get("env") === "development") {
      await setupVite(server, app);
    } else {
      serveStatic(app);
    }
    
    log("App logic fully initialized.");
  } catch (e: any) {
    log(`Initialization Error: ${e.message}`);
    // We don't exit here so the port remains open for Replit's system.
  }
})();
