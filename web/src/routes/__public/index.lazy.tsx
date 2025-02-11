import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "@web/components/ui/button";

export const Route = createLazyFileRoute("/__public/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Welcome to index page{" "}
      <Link to="/databases" className={buttonVariants()}>
        Databases
      </Link>
    </div>
  );
}
