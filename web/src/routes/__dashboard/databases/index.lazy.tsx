import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/__dashboard/databases/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Welcome to databases page</div>;
}
