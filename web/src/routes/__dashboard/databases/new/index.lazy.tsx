import { createLazyFileRoute } from "@tanstack/react-router";
import { DatabasesCreate } from "@web/components/databases/create";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@web/components/ui/form";

export const Route = createLazyFileRoute("/__dashboard/databases/new/")({
  component: RouteComponent,
});

export const formSchema = z.object({
  volume_uuid: z.string().min(1),
  name: z.string().min(1),
  type: z.string().min(1),
  image_name: z.string().min(1),
  image_version: z.string().min(1),
  environment: z
    .array(z.object({ key: z.string(), value: z.string() }))
    .default([]),
  domain: z.string().optional(),
  port: z.number().optional(),
  usetls: z.boolean().default(false),
});

export type formSchemaType = z.infer<typeof formSchema>;

function RouteComponent() {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: formSchemaType) => {
    console.log(data);
  };

  console.log(form.formState.errors);

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
        <DatabasesCreate form={form} />
      </form>
    </Form>
  );
}
