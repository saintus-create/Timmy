import { HomeIcon, MessageSquareIcon, LayoutDashboard, Settings, Cpu } from "lucide-react";
import { useLocation, Link } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    title: "Terminal",
    path: "/",
    icon: Cpu,
  },
  {
    title: "Session",
    path: "/chat",
    icon: MessageSquareIcon,
  },
  // {
  //   title: "Control Panel",
  //   path: "/dashboard",
  //   icon: LayoutDashboard,
  // },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar variant="floating" collapsible="icon" className="bg-background/40 backdrop-blur-xl border-r border-border/40 selection:bg-primary/20 transition-all duration-300">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 shrink-0">
            <Cpu size={18} />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-black tracking-tighter text-base">TIM CORE</span>
            <span className="text-[10px] font-mono text-muted-foreground uppercase leading-tight">Advanced System</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2 pt-8">
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden px-2 mb-4 text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">MAIN SYSTEMS</SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            {navigationItems.map((item) => {
              const isActive = location === item.path;
              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.title}
                    className={cn(
                      "transition-all duration-200 h-10 px-3",
                      isActive 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground shadow-md shadow-primary/10" 
                        : "hover:bg-primary/5 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Link href={item.path} className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/40">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Settings"
              className="h-10 px-3 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <Settings size={18} />
              <span className="font-medium group-data-[collapsible=icon]:hidden ml-3">Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
