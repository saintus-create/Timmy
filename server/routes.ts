import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
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

  return httpServer;
}
