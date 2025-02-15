import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@web/components/login/form";

export const Route = createFileRoute("/__public/")({
  component: () => {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <LoginForm />
        </div>
      </div>
    );
  },
});
