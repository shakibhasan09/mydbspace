import { createFileRoute, defer } from "@tanstack/react-router";
import { Database } from "@web/types/database";
import { api } from "@web/utils/api";

export const Route = createFileRoute("/__dashboard/databases/")({
  loader: ({ context }) => {
    const query = context.query.ensureQueryData<Database[]>({
      queryKey: ["databases"],
      queryFn: () => api("/api/databases").then((res) => res.json()),
    });

    return {
      databases: defer(query),
    };
  },
});
