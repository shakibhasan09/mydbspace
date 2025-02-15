import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/__dashboard/volumes/$volume/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
