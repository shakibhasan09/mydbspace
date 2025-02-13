import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/__public/")({
  loader: () => {
    return redirect({ to: "/databases" });
  },
});
