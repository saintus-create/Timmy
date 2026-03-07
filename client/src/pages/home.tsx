import { LiquidSimulation } from "@/components/liquid-glass";
import { LiquidSimulation } from "@/components/liquid-glass";
import { Persona } from "@/components/ai-elements/persona";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white dark overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LiquidSimulation />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-10 text-center pointer-events-none">
        <div className="mb-12">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 text-white drop-shadow-lg">
            TIM
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-lg mx-auto drop-shadow-md">
            Interactive AI Interface
          </p>
        </div>
        
        <div className="w-full max-w-md mx-auto pointer-events-auto">
          <div className="flex flex-col items-center gap-8">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <Persona 
                state="idle" 
                variant="command"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
