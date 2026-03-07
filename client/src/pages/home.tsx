import { Link } from "wouter";
import { LiquidSimulation } from "@/components/liquid-glass";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white dark overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LiquidSimulation />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-10 text-center">
        <div className="mb-12 pointer-events-none">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 text-white drop-shadow-lg">
            Timmy
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-lg mx-auto drop-shadow-md">
            Your AI Assistant
          </p>
        </div>
        
        <div className="w-full max-w-md mx-auto flex gap-4">
          <Link href="/chat">
            <Button size="lg" className="flex-1 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-start-chat">
              Start Chatting
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="flex-1 rounded-full shadow-lg" data-testid="button-learn-more">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
