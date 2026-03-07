import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export default function Chat() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <MessageCircle className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Chat with Timmy</h1>
        </div>
        
        <Card className="bg-slate-800 border-slate-700 p-6 mb-6">
          <p className="text-slate-300 mb-4">
            Start a conversation with your AI assistant. Ask questions, get help, or just chat!
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="input-chat-message"
            />
            <Button className="bg-blue-600 hover:bg-blue-700" data-testid="button-send-message">
              Send
            </Button>
          </div>
        </Card>

        <Card className="bg-slate-800 border-slate-700 p-6">
          <p className="text-slate-400 text-center">
            No messages yet. Start typing above to begin!
          </p>
        </Card>
      </div>
    </div>
  );
}
