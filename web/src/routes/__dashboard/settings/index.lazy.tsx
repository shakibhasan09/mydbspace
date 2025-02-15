import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/__dashboard/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
