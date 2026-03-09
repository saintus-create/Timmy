import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime, AssistantChatTransport } from "@assistant-ui/react-ai-sdk";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Chat from "@/pages/Chat";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chat" component={Chat} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: '/api/chat',
    }),
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SidebarProvider defaultOpen={false}>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <SidebarInset>
                <div className="relative flex flex-col w-full h-full">
                  <header className="absolute top-4 left-4 z-50 pointer-events-auto">
                    <SidebarTrigger className="text-foreground/40 hover:text-foreground transition-colors" />
                  </header>
                  <Router />
                </div>
              </SidebarInset>
            </div>
            <Toaster />
          </SidebarProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </AssistantRuntimeProvider>
  );
}

export default App;
