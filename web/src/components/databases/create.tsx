import { formSchemaType } from "@web/routes/__dashboard/databases/new/index.lazy";
import { Archive, Container, Database, Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button, buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Await, Link, useLoaderData } from "@tanstack/react-router";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

type DatabasesCreateProps = {
  form: UseFormReturn<formSchemaType>;
};

export const DatabasesCreate = (props: DatabasesCreateProps) => {
  const [environment, setEnvironment] = React.useState<
    formSchemaType["environment"]
  >([{ key: "", value: "" }]);

  const loader = useLoaderData({ from: "/__dashboard/databases/new/" });

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-4">
        <Card className="bg-muted/50">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <Database className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Basic Configuration</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={props.form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Database Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a your database" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="postgresql">PostgreSQL</SelectItem>
                      <SelectItem value="mysql">MySQL</SelectItem>
                      <SelectItem value="mariadb">MariaDB</SelectItem>
                      <SelectItem value="mongodb">MongoDB</SelectItem>
                      <SelectItem value="redis">Redis</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={props.form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Database Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Nextjs Project Database" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={props.form.control}
              name="image_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Name</FormLabel>
                  <FormControl>
                    <Input placeholder="postgres" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={props.form.control}
              name="image_version"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Version</FormLabel>
                  <FormControl>
                    <Input placeholder="15.11-alpine" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={props.form.control}
              name="usetls"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md bg-background border-input border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      TLS/SSL database connection (Recommended)
                    </FormLabel>
                    <FormDescription>
                      This will enable TLS for the database connection
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            {props.form.watch("usetls") && (
              <FormField
                control={props.form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domain</FormLabel>
                    <FormControl>
                      <Input placeholder="mydb.example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>

        <Await
          promise={loader.volumes}
          fallback={<Skeleton className="h-44" />}
        >
          {(data) => (
            <Card className="bg-muted/50">
              <CardHeader className="space-y-0 flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                  <Archive className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Storage</h3>
                </div>
                <Link
                  to="/volumes"
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                  })}
                >
                  <Plus className="size-5" />
                </Link>
              </CardHeader>
              <CardContent>
                <FormField
                  control={props.form.control}
                  name="volume_uuid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Volume</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select volume" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {data.map((volume) => (
                            <SelectItem key={volume.uuid} value={volume.uuid}>
                              {volume.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}
        </Await>

        <Card className="bg-muted/50">
          <CardHeader className="space-y-0 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Container className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Environment</h3>
            </div>
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={() =>
                setEnvironment([...environment, { key: "", value: "" }])
              }
            >
              <Plus className="size-5" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {environment.map((env, index) => (
              <div className="grid grid-cols-2 gap-4" key={index}>
                <FormField
                  control={props.form.control}
                  name={`environment.${index}.key`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key</FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={env.key}
                          placeholder="POSTGRES_USER"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={props.form.control}
                  name={`environment.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value</FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={env.value}
                          placeholder="postgres"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1">
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle> Configuration Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Database Type</span>
                <span className="font-medium">{props.form.watch("type")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Database Version</span>
                {props.form.watch("image_version") && (
                  <Badge className="font-medium">
                    {props.form.watch("image_version")}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="pt-6 justify-end">
            <Button type="submit" variant="outline">
              <Database /> Create Database
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
