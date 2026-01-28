import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
  const server = createServer(app);

  await registerRoutes(app);

  // IMPORTANT: For Replit deployment, the app MUST listen on port 5000.
  // We use a forced port 5000 to ensure Replit's health check passes.
  const PORT = 5000;
  
  const startServer = () => {
    try {
      server.listen(PORT, "0.0.0.0", () => {
        log(`serving on port ${PORT}`);
      }).on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          log(`Port ${PORT} is busy, retrying in 1s...`);
          server.close();
          setTimeout(startServer, 1000);
        } else {
          log(`Server error: ${err.message}`);
        }
      });
    } catch (e: any) {
      log(`Failed to start server: ${e.message}`);
    }
  };

  startServer();

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(server, app);
  } else {
    serveStatic(app);
  }
})();
