import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/__dashboard")({
  component: Outlet,
});
