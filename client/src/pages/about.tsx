import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Info className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">About Timmy</h1>
        </div>

        <Card className="bg-slate-800 border-slate-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">What is Timmy?</h2>
          <p className="text-slate-300 leading-relaxed">
            Timmy is an advanced AI assistant designed to help you with a wide range of tasks.
            Whether you need information, creative help, coding assistance, or just someone to chat with,
            Timmy is here to assist you.
          </p>
        </Card>

        <Card className="bg-slate-800 border-slate-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Features</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Chat Interface</Badge>
            <Badge variant="secondary">AI Powered</Badge>
            <Badge variant="secondary">24/7 Available</Badge>
            <Badge variant="secondary">Easy to Use</Badge>
          </div>
        </Card>

        <Card className="bg-slate-800 border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-3">Get Started</h2>
          <p className="text-slate-300">
            Head over to the <span className="text-blue-400 font-semibold">Chat</span> section to start
            a conversation with Timmy right now!
          </p>
        </Card>
      </div>
    </div>
  );
}
