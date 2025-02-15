import { createFileRoute, defer } from "@tanstack/react-router";
import { Volume } from "@web/types/volume";
import { api } from "@web/utils/api";

export const Route = createFileRoute("/__dashboard/volumes/$volume/edit/")({
  loader: ({ context, params }) => {
    const query = context.query.ensureQueryData<Volume>({
      queryKey: ["volumes", params.volume],
      queryFn: () =>
        api(`/api/volumes/${params.volume}`)
          .then((res) => res.json())
          .catch(() => {
            // TODO: Handle error
            return {};
          }),
    });

    return {
      volume: defer(query),
    };
  },
});
