import { createLazyFileRoute, Link } from "@tanstack/react-router";
import DBCreate from "../__dashboard/dbcreate.lazy";

export const Route = createLazyFileRoute("/__public/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (


    <DBCreate />
  );
}
