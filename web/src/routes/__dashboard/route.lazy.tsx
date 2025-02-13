import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { ModeToggle } from "@web/components/shared/mode-toggle";
import { AppSidebar } from "@web/components/shared/sidebar";
import { SidebarProvider, SidebarTrigger } from "@web/components/ui/sidebar";

export const Route = createLazyFileRoute("/__dashboard")({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <div className="py-2 px-4 flex items-center justify-between">
          <SidebarTrigger />
          <ModeToggle />
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  ),
});
