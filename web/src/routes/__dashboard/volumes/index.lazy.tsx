import { Await, createLazyFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "@web/components/ui/button";
import { Skeleton } from "@web/components/ui/skeleton";
import { VolumesList } from "@web/components/volumes/list";
import { PlusIcon } from "lucide-react";

export const Route = createLazyFileRoute("/__dashboard/volumes/")({
  component: RouteComponent,
});

function RouteComponent() {
  const loader = Route.useLoaderData();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Volumes</h1>
          <p className="text-muted-foreground text-sm">
            Manage your volume instances
          </p>
        </div>
        <div>
          <Link
            to="/volumes/new"
            className={buttonVariants({
              variant: "outline",
              className: "dark:bg-muted/50",
            })}
          >
            <PlusIcon />
            Create New Volume
          </Link>
        </div>
      </div>
      <Await promise={loader.volumes} fallback={<Skeleton className="h-80" />}>
        {(data) => <VolumesList volumes={data} />}
      </Await>
    </div>
  );
}
