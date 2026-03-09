import { Thread } from "@/components/assistant-ui/thread";
import { LiquidSimulation } from "@/components/liquid-glass";

export default function ChatPage() {
  return (
    <div className="relative flex h-screen w-full flex-col bg-background text-foreground overflow-hidden">
      {/* Subtle background ripple to maintain aesthetic continuity */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <LiquidSimulation />
      </div>

      <main className="relative z-10 flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tighter">TIM CORE</h1>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Active Session</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Linked</span>
          </div>
        </header>

        <div className="relative flex-1 bg-background/40 backdrop-blur-xl border border-border/40 rounded-3xl overflow-hidden shadow-2xl">
          <Thread />
        </div>
      </main>
    </div>
  );
}
