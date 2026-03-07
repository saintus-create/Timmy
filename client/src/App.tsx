import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Chat from "@/pages/chat";
import About from "@/pages/about";
import Settings from "@/pages/settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chat" component={Chat} />
      <Route path="/about" component={About} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const runtime = useChatRuntime({
    api: '/api/chat',
  });

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SidebarProvider style={sidebarStyle as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1 w-full">
                <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">Timmy</h1>
                  <div className="w-8" />
                </header>
                <main className="flex-1 overflow-auto">
                  <Router />
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </AssistantRuntimeProvider>
  );
}

export default App;
