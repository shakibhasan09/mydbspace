import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@web/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@web/components/ui/card";
import { Input } from "@web/components/ui/input";
import { api } from "@web/utils/api";
import { cn } from "@web/utils/cn";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useNavigate } from "@tanstack/react-router";

const formSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type formData = z.infer<typeof formSchema>;

export function LoginForm() {
  const navigate = useNavigate({ from: "/" });

  const [loading, setLoading] = React.useState(false);

  const form = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: formData) => {
    setLoading(true);
    api("/login", { method: "POST", body: JSON.stringify(data) })
      .then((res) => {
        setLoading(false);

        if (!res.ok) {
          toast.error("Login failed");
          return;
        }

        navigate({ to: "/databases" });

        toast.success("Login successful");
      })
      .catch(() => {
        setLoading(false);
        // TODO: Handle error
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6")}
      >
        <Card className="bg-muted/50">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Login with your email and password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="admin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pasword</FormLabel>
                  <FormControl>
                    <Input placeholder="*********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              variant="outline"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 animate-spin" />}
              {loading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
