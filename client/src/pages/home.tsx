import { LiquidSimulation } from "@/components/liquid-glass";
import { Persona } from "@/components/ai-elements/persona";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden selection:bg-primary/20">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <LiquidSimulation />
      </div>

      {/* Content Layer */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center pointer-events-none">
        {/* Header Section */}
        <header className="mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-linear-to-b from-foreground via-foreground to-foreground/40 drop-shadow-2xl">
            TIM
          </h1>
          <p className="text-base md:text-lg font-medium text-muted-foreground/80 tracking-wide uppercase max-w-lg mx-auto">
            Interactive AI Core
          </p>
        </header>
        
        {/* Interaction Section */}
        <section className="w-full max-w-2xl mx-auto pointer-events-auto">
          <div className="flex flex-col items-center gap-12 group">
            {/* Persona Container with subtle depth */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <Persona 
                state="idle" 
                variant="command"
                className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              />
            </div>

            {/* Hint or secondary interaction */}
            <div className="animate-in fade-in slide-in-from-bottom-4 delay-500 duration-1000 mt-4">
              <div className="px-4 py-1 rounded-full border border-border/40 bg-background/20 backdrop-blur-md text-xs font-mono text-muted-foreground/60 shadow-sm transition-all hover:border-primary/30 hover:text-primary/60">
                SYSTEM STANDBY
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Corner UI Elements for 'Premium Service' feel */}
      <div className="fixed bottom-6 right-6 z-20 pointer-events-none flex items-center gap-4 text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.2em]">
        <span>v1.0.4-dev</span>
        <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
      </div>
    </div>
  );
}
