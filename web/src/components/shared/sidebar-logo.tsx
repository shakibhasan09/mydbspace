import { Database } from "lucide-react";

export const SidebarLogo = () => {
  return (
    <div className="flex items-center gap-2 py-4">
      <Database className="size-10 text-primary" />
      <div>
        <h1 className="text-xl font-bold text-primary">MyDBSpace</h1>
        <p className="text-xs text-muted-foreground">Database Console</p>
      </div>
    </div>
  );
};
