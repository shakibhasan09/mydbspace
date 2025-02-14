import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { DatabasesCreate } from "@web/components/databases/create";
import { Form } from "@web/components/ui/form";
import { api } from "@web/utils/api";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createLazyFileRoute("/__dashboard/databases/new/")({
  component: RouteComponent,
});

export const formSchema = z
  .object({
    volume_uuid: z.string().min(1),
    name: z.string().min(1),
    type: z.string().min(1),
    image_name: z.string().min(1),
    image_version: z.string().min(1),
    environment: z
      .array(z.object({ key: z.string(), value: z.string() }))
      .default([])
      .optional(),
    domain: z.string().optional(),
    port: z.coerce.number().optional(),
    usetls: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.usetls && !data.domain) {
        return false;
      }
      return true;
    },
    {
      message: "Domain is required when using TLS",
      path: ["domain"],
    }
  )
  .refine(
    (data) => {
      if (!data.usetls && !data.port) {
        return false;
      }
      return true;
    },
    {
      message: "Port is required when not using TLS",
      path: ["port"],
    }
  );

export type formSchemaType = z.infer<typeof formSchema>;

function RouteComponent() {
  const router = Route.useNavigate();

  const queryClient = useQueryClient();

  const [loading, setLoading] = React.useState(false);

  const form = useForm<formSchemaType>({
    defaultValues: {
      image_name: "",
      image_version: "",
      name: "",
      type: "",
      environment: [],
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: formSchemaType) => {
    console.log(JSON.stringify(data));
    setLoading(true);
    await api("/api/databases", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch(() => {
        // TODO: Handle error
        setLoading(false);
      });
    setLoading(false);
    await queryClient.invalidateQueries({
      queryKey: ["databases"],
      type: "all",
    });
    toast.success("Database created successfully");
    router({ to: "/databases" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">New Database</h1>
            <p className="text-muted-foreground text-sm">
              Create a new database
            </p>
          </div>
        </div>
        <DatabasesCreate form={form} loading={loading} />
      </form>
    </Form>
  );
}
