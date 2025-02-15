import { createFileRoute, redirect } from "@tanstack/react-router";
import { api } from "@web/utils/api";

export const Route = createFileRoute("/__dashboard")({
  loader: async () => {
    return api("/api/authorize")
      .then((res) => {
        if (!res.ok) {
          throw redirect({ to: "/" });
        }
      })
      .catch(() => {
        throw redirect({ to: "/" });
      });
  },
});
