import { Await, createLazyFileRoute, Link } from "@tanstack/react-router";
import { DatabasesList } from "@web/components/databases/list";
import { buttonVariants } from "@web/components/ui/button";
import { Skeleton } from "@web/components/ui/skeleton";
import { PlusIcon } from "lucide-react";

export const Route = createLazyFileRoute("/__dashboard/databases/")({
  component: RouteComponent,
});

function RouteComponent() {
  const loader = Route.useLoaderData();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Databases</h1>
          <p className="text-muted-foreground text-sm">
            Manage your database instances
          </p>
        </div>
        <div>
          <Link
            to="/databases/new"
            className={buttonVariants({
              variant: "outline",
              className: "dark:bg-muted/50",
            })}
          >
            <PlusIcon />
            Create New Database
          </Link>
        </div>
      </div>
      <Await
        promise={loader.databases}
        fallback={<Skeleton className="h-80" />}
      >
        {(data) => <DatabasesList databases={data} />}
      </Await>
    </div>
  );
}
