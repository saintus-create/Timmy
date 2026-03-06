import { LiquidSimulation } from "@/components/liquid-glass";
import { VoiceProvider, useVoice } from "@humeai/voice-react";
import { useState, useEffect } from "react";
import { Persona } from "@/components/ai-elements/persona";
import { Button } from "@/components/ui/button";

function VoiceControl() {
  const { connect, disconnect, status, isPlaying } = useVoice();
  
  // Determine the Persona state based on Hume Voice status
  let personaState: "idle" | "listening" | "thinking" | "speaking" | "asleep" = "idle";
  
  if (status.value === "connected") {
    if (isPlaying) {
      personaState = "speaking";
    } else {
      personaState = "listening";
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 pointer-events-auto">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <Persona 
          state={personaState} 
          variant="command"
          className="w-full h-full"
        />
      </div>
      
      {status.value === "connected" ? (
        <Button onClick={() => disconnect()} variant="destructive" size="lg" className="rounded-full shadow-lg">
          Disconnect
        </Button>
      ) : (
        <Button 
          onClick={() => connect().catch(console.error)} 
          disabled={status.value === "connecting"}
          size="lg"
          className="rounded-full shadow-lg bg-white text-black hover:bg-zinc-200"
        >
          {status.value === "connecting" ? "Connecting..." : "Start Voice Agent"}
        </Button>
      )}
    </div>
  );
}

function HumeApp() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/hume/token")
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token);
        } else {
          setError("No token received");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch token");
      });
  }, []);

  if (error) return <div className="text-red-400 mt-8">{error}</div>;
  if (!token) return <div className="text-zinc-400 mt-8 animate-pulse">Initializing AI...</div>;

  return (
    <VoiceProvider 
      auth={{ type: "accessToken", value: token }}
      onMessage={(message) => console.log("Hume message:", message)}
    >
      <VoiceControl />
    </VoiceProvider>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white dark overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LiquidSimulation />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-10 text-center">
        <div className="mb-12 pointer-events-none">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 text-white drop-shadow-lg">
            TIM
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-lg mx-auto drop-shadow-md">
            Hume Empathic Voice Interface
          </p>
        </div>
        
        <div className="w-full max-w-md mx-auto">
          <HumeApp />
        </div>
      </div>
    </div>
  );
}
