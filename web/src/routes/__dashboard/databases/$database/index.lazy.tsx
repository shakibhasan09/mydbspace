import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/__dashboard/databases/$database/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Welcome to $database page</div>;
}
