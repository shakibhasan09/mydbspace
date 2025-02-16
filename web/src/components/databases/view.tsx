import { Database } from "@web/types/database";
import {
  Activity,
  Circle,
  Container,
  DatabaseIcon,
  Pause,
  Trash,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

type DatabasesViewProps = {
  database: Database;
};

export const DatabasesView = (props: DatabasesViewProps) => {
  const envs = props.database.environment
    ? (JSON.parse(props.database.environment) as {
        key: string;
        value: string;
      }[])
    : [];

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="bg-muted/50 col-span-2">
        <CardHeader className="flex flex-row items-center gap-2 space-y-0">
          <DatabaseIcon className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Database Information</h3>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-6 gap-4">
            <h1 className="col-span-2 text-muted-foreground">Database ID</h1>
            <p className="text-base col-span-4">: {props.database.uuid}</p>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <h1 className="col-span-2 text-muted-foreground">Database Name</h1>
            <p className="text-base col-span-4">: {props.database.name}</p>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <h1 className="col-span-2 text-muted-foreground">Database Type</h1>
            <p className="text-base col-span-4">: {props.database.type}</p>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <h1 className="col-span-2 text-muted-foreground">Docker Image</h1>
            <p className="text-base col-span-4">
              : {props.database.image_name}
            </p>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <h1 className="col-span-2 text-muted-foreground">
              Docker Image Version
            </h1>
            <p className="text-base col-span-4">
              : {props.database.image_version}
            </p>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <h1 className="col-span-2 text-muted-foreground">
              Database Public Port
            </h1>
            <p className="text-base col-span-4">: {props.database.port}</p>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <h1 className="col-span-2 text-muted-foreground">
              Database Domain
            </h1>
            <p className="text-base col-span-4">: {props.database.domain}</p>
          </div>
        </CardContent>
      </Card>
      <div>
        <Card className="bg-muted/50">
          <CardHeader className="flex items-center gap-2 flex-row space-y-0">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Database Status</h3>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <div className="flex items-center gap-2">
                {props.database.status.toLowerCase() === "running" && (
                  <Circle className="size-4 fill-green-500 text-green-500 animate-pulse" />
                )}
                {props.database.status.toLowerCase() === "provisioning" && (
                  <Circle className="size-4 fill-yellow-500 text-yellow-500 animate-pulse" />
                )}
                <span className="font-medium uppercase">
                  {props.database.status}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Uptime</span>
              <span className="font-medium">0 days</span>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="pt-7 gap-2 justify-end">
            <Button variant="outline">Restart Database</Button>
            <Button variant="destructive">
              <Pause /> Stop Database
            </Button>
            <Button variant="destructive" size="icon">
              <Trash />
            </Button>
          </CardFooter>
        </Card>
      </div>
      {envs.length > 0 && (
        <Card className="bg-muted/50 col-span-2">
          <CardHeader className="space-y-0 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Container className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Environment</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {envs.map((env, index) => (
              <div key={index} className="grid grid-cols-6 gap-4">
                <h1 className="col-span-2 text-muted-foreground">{env.key}</h1>
                <p className="text-base col-span-4">: {env.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
