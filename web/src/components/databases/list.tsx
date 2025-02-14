import { ColumnDef } from "@tanstack/react-table";
import { Database } from "@web/types/database";
import { cn } from "@web/utils/cn";
import { DatabaseIcon } from "lucide-react";
import { DataTable } from "../shared/table";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

const columns: ColumnDef<Database>[] = [
  {
    accessorKey: "uuid",
    header: "Instance ID",
  },
  {
    accessorKey: "name",
    header: "Instance Name",
  },
  {
    accessorKey: "type",
    header: "Database Type",
  },
  {
    accessorKey: "image_name",
    header: "Image Name",
  },
  {
    accessorKey: "image_version",
    header: "Image Version",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant="outline">{row.original.status}</Badge>,
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => (
      <span>{new Date(row.original.created_at).toDateString()}</span>
    ),
  },
  {
    id: "actions",
  },
];

type DatabasesListProps = {
  className?: string;
  databases: Database[];
};

export const DatabasesList = (props: DatabasesListProps) => {
  return (
    <Card className={cn("bg-muted/50", props.className)}>
      <CardContent className="p-0">
        <DataTable
          columns={columns}
          data={props.databases}
          empty={{ icon: DatabaseIcon, text: "No Database Found" }}
        />
      </CardContent>
    </Card>
  );
};
