import { createLazyFileRoute } from "@tanstack/react-router";
import DBCreate from "../../dbcreate.lazy";

export const Route = createLazyFileRoute("/__dashboard/databases/new/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <DBCreate />
    </div>
  );
}
