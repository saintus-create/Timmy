import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { fetchAccessToken } from "hume";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  app.get("/api/hume/token", async (req, res) => {
    try {
      const token = await fetchAccessToken({
        apiKey: String(process.env.HUME_API_KEY),
        secretKey: String(process.env.HUME_SECRET_KEY),
      });
      res.json({ token });
    } catch (error) {
      console.error("Error fetching Hume token:", error);
      res.status(500).json({ error: "Failed to fetch token" });
    }
  });

  return httpServer;
}
