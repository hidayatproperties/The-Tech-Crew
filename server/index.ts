import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// PORT 5000 is required for Replit publishing health checks
const PORT = 5000;

// 1. OPEN PORT IMMEDIATELY
// Replit publishing system needs to see a listening port within seconds.
const server = createServer(app);

server.listen(PORT, "0.0.0.0", () => {
  log(`serving on port ${PORT}`);
});

// Minimal logging
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

// 2. BACKGROUND INITIALIZATION
// We initialize routes and static files without blocking the 'listen' call above.
(async () => {
  try {
    await registerRoutes(app);

    // Error handling
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      res.status(status).json({ message: err.message || "Internal Server Error" });
    });

    if (app.get("env") === "development") {
      await setupVite(server, app);
    } else {
      serveStatic(app);
    }
  } catch (e: any) {
    log(`Startup Error: ${e.message}`);
  }
})();
