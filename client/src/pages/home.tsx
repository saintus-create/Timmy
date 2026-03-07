import { LiquidSimulation } from "@/components/liquid-glass";
import { VoiceProvider, useVoice } from "@humeai/voice-react";
import { useState, useEffect } from "react";
import { Persona } from "@/components/ai-elements/persona";
import { Button } from "@/components/ui/button";

interface VoiceControlProps {
  token: string;
}

function VoiceControl({ token }: VoiceControlProps) {
  const { connect, disconnect, status, isPlaying, error } = useVoice();

  // Determine the Persona state based on Hume Voice status
  let personaState: "idle" | "listening" | "thinking" | "speaking" | "asleep" = "idle";

  if (status.value === "connected") {
    if (isPlaying) {
      personaState = "speaking";
    } else {
      personaState = "listening";
    }
  }

  const handleConnect = () => {
    // supply options required by the SDK (auth + configId etc.)
    connect({
      auth: { type: "accessToken", value: token },
      configId: process.env.NEXT_PUBLIC_HUME_CONFIG_ID || "<YOUR_CONFIG_ID>",
      // you can include other session settings here
    }).catch((err) => console.error("Connect error:", err));
  };

  return (
    <div className="flex flex-col items-center gap-8 pointer-events-auto">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <Persona 
          state={personaState} 
          variant="command"
          className="w-full h-full"
        />
      </div>
      
      <div className="flex flex-col items-center gap-4">
        {status.value === "connected" ? (
          <Button onClick={() => disconnect()} variant="destructive" size="lg" className="rounded-full shadow-lg">
            Disconnect
          </Button>
        ) : (
          <Button 
            onClick={handleConnect}
            disabled={status.value === "connecting"}
            size="lg"
            className="rounded-full shadow-lg bg-white text-black hover:bg-zinc-200"
          >
            {status.value === "connecting" ? "Connecting..." : "Start Voice Agent"}
          </Button>
        )}

        {error && (
          <p className="text-red-500 text-sm max-w-xs bg-black/50 p-2 rounded">
            Error: {error.message || "An unknown error occurred"}
          </p>
        )}
        
        <p className="text-zinc-500 text-xs">
          Status: {status.value}
        </p>
      </div>
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
          // server might send an error property
          setError(data.error || "No token received");
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
      onMessage={(message) => console.log("Hume message:", message)}
    >
      <VoiceControl token={token} />
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
