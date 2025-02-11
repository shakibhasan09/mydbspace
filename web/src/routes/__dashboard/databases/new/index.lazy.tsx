import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/__dashboard/databases/new/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Welcome to new database page</div>;
}
