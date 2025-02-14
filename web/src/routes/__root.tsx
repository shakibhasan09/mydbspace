import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { ContextRouterType } from "@web/types/context-router";

export const Route = createRootRouteWithContext<ContextRouterType>()({
  component: Outlet,
});
