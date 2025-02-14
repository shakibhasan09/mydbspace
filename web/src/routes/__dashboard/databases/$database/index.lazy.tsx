import { Await, createLazyFileRoute, Link } from "@tanstack/react-router";
import { DatabasesView } from "@web/components/databases/view";
import { buttonVariants } from "@web/components/ui/button";
import { Skeleton } from "@web/components/ui/skeleton";
import { Edit } from "lucide-react";

export const Route = createLazyFileRoute("/__dashboard/databases/$database/")({
  component: RouteComponent,
});

function RouteComponent() {
  const loader = Route.useLoaderData();

  return (
    <Await promise={loader.database} fallback={<Skeleton className="h-80" />}>
      {(data) => (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Database</h1>
              <p className="text-muted-foreground text-sm">
                View and manage your database
              </p>
            </div>
            <div>
              <Link
                to="/databases/$database/edit"
                params={{ database: data.uuid }}
                className={buttonVariants({
                  variant: "outline",
                  className: "dark:bg-muted/50",
                })}
              >
                <Edit />
                Edit Database
              </Link>
            </div>
          </div>
          <DatabasesView database={data} />
        </div>
      )}
    </Await>
  );
}
