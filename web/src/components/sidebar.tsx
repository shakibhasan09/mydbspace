import React from 'react';
import { Database, Settings, PlusCircle } from 'lucide-react';
import { Link, useRouter } from '@tanstack/react-router';
import { Button } from "@web/components/ui/button";
import { Card, CardContent } from "@web/components/ui/card";

export const Sidebar = () => {
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  
  const menuItems = [
    { 
      id: 'databases', 
      icon: Database, 
      label: 'Databases',
      path: '/dblist'
    },
    { 
      id: 'dbcreate', 
      icon: PlusCircle, 
      label: 'Create Database',
      path: '/dbcreate'
    },
    { 
      id: 'settings', 
      icon: Settings, 
      label: 'Settings',
      path: '/settings'
    },
  ];

  return (
    <div className="w-64 h-screen bg-background border-r fixed left-0 top-0">
      <div className="flex items-center gap-3 p-6">
        <Database className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-xl font-bold">DB Manager</h1>
          <p className="text-sm text-muted-foreground">Admin Console</p>
        </div>
      </div>
      
      <nav className="space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath.startsWith(item.path);
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                isActive 
                  ? 'bg-secondary' 
                  : 'hover:bg-secondary/50'
              }`}
              asChild
            >
              <Link to={item.path}>
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-6 left-6 right-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm">
              <p className="font-medium mb-1">Storage Usage</p>
              <div className="w-full h-2 bg-secondary rounded-full mt-2">
                <div className="w-2/3 h-2 bg-primary rounded-full" />
              </div>
              <p className="mt-2 text-muted-foreground">7.2 GB of 10 GB used</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};