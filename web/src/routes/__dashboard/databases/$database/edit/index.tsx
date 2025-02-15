import { createFileRoute, defer } from "@tanstack/react-router";
import { Database } from "@web/types/database";
import { api } from "@web/utils/api";

export const Route = createFileRoute("/__dashboard/databases/$database/edit/")({
  loader: ({ context, params }) => {
    const query = context.query.ensureQueryData<Database>({
      queryKey: ["databases", params.database],
      queryFn: () =>
        api(`/api/databases/${params.database}`)
          .then((res) => res.json())
          .catch(() => {
            // TODO: Handle error
            return {};
          }),
    });

    return {
      database: defer(query),
    };
  },
});
