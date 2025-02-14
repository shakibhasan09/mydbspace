import { createFileRoute, defer } from "@tanstack/react-router";
import { Volume } from "@web/types/volume";
import { api } from "@web/utils/api";

export const Route = createFileRoute("/__dashboard/databases/new/")({
  loader: ({ context }) => {
    const query = context.query.ensureQueryData<Volume[]>({
      queryKey: ["volumes"],
      queryFn: () =>
        api("/api/volumes")
          .then((res) => res.json())
          .catch(() => {
            // TODO: Handle error
            return [];
          }),
    });

    return {
      volumes: defer(query),
    };
  },
});
