import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// FORCE PORT 5000 - No environment variable fallback for stability
const PORT = 5000;

// 1. OPEN PORT IMMEDIATELY
const server = createServer(app);

server.listen(PORT, "0.0.0.0", () => {
  log(`serving on port ${PORT}`);
});

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;
  let resBody: any;

  const oldJson = res.json;
  res.json = function (body) {
    resBody = body;
    return oldJson.apply(this, arguments as any);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (resBody) {
        logLine += ` :: ${JSON.stringify(resBody)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    // 2. INITIALIZE ROUTES AFTER PORT IS OPEN
    await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
    });

    if (app.get("env") === "development") {
      await setupVite(server, app);
    } else {
      serveStatic(app);
    }
  } catch (e: any) {
    log(`Initialization error: ${e.message}`);
  }
})();
