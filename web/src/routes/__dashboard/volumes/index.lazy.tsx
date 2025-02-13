import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/__dashboard/volumes/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__dashboard/volumes/"!</div>;
}
