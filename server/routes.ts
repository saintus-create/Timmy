import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { fetchAccessToken } from "hume";
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;
    const result = await streamText({
      model: openai('gpt-4o'),
      messages,
    });
    return result.toTextStreamResponse();
  });

  app.get("/api/hume/token", async (req, res) => {
    // ensure we have the keys (the server index.ts also checks this on startup)
    if (!process.env.HUME_API_KEY || !process.env.HUME_SECRET_KEY) {
      const msg = "HUME_API_KEY or HUME_SECRET_KEY not set";
      console.error(msg);
      return res.status(500).json({ error: msg });
    }

    try {
      const token = await fetchAccessToken({
        apiKey: String(process.env.HUME_API_KEY),
        secretKey: String(process.env.HUME_SECRET_KEY),
      });
      res.json({ token });
    } catch (error: any) {
      console.error("Error fetching Hume token:", error);
      // include error message if available to aid debugging
      res.status(500).json({ error: error?.message || "Failed to fetch token" });
    }
  });

  return httpServer;
}
