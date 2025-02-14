import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/__dashboard/databases/$database/edit/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__dashboard/databases/$database/edit/"!</div>;
}
