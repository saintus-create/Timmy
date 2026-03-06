import { LiquidSimulation } from "@/components/liquid-glass";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white dark overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LiquidSimulation />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pointer-events-none p-10 text-center">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 text-white drop-shadow-lg">
          TIM
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 max-w-lg drop-shadow-md">
          Liquid glass effect on dark mode
        </p>
      </div>
    </div>
  );
}
