import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  createLazyFileRoute,
  useAwaited,
  useRouter,
} from "@tanstack/react-router";
import { Button } from "@web/components/ui/button";
import { Card, CardContent, CardHeader } from "@web/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@web/components/ui/form";
import { Input } from "@web/components/ui/input";
import { api } from "@web/utils/api";
import { Database, Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createLazyFileRoute(
  "/__dashboard/databases/$database/edit/"
)({
  component: RouteComponent,
});

const formSchema = z.object({
  name: z.string().min(1),
});

type formSchemaType = z.infer<typeof formSchema>;

function RouteComponent() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const loader = Route.useLoaderData();

  const [database] = useAwaited({ promise: loader.database });

  const queryClient = useQueryClient();

  const [loading, setLoading] = React.useState(false);

  const form = useForm<formSchemaType>({
    defaultValues: {
      name: database.name,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: formSchemaType) => {
    setLoading(true);
    await api(`/api/databases/${database.uuid}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    await queryClient.invalidateQueries({
      queryKey: ["databases"],
      type: "all",
    });
    await router.invalidate();
    setLoading(false);
    toast.success("Database updated successfully");
    navigate({ to: "/databases" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Edit Database</h1>
            <p className="text-muted-foreground text-sm">
              Edit and manage your database
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <Card className="bg-muted/50">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                <Database className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Basic Configuration</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Database Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nextjs Project Database"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit" variant="outline">
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Update Database
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
