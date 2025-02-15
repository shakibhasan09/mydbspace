import { useQueryClient } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { Database } from "@web/types/database";
import { api } from "@web/utils/api";
import { cn } from "@web/utils/cn";
import { DatabaseIcon, Edit, Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { MyAlertDialog } from "../shared/alert-dialog";
import { DataTable } from "../shared/table";
import { Badge } from "../ui/badge";
import { Button, buttonVariants } from "../ui/button";
import { Card, CardContent } from "../ui/card";

type DatabasesListProps = {
  className?: string;
  databases: Database[];
};

export const DatabasesList = (props: DatabasesListProps) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const [deleteDialog, setDeleteDialog] = React.useState(false);

  const handleDeleteDatabase = async (database_uuid: string) => {
    await api(`/api/databases/${database_uuid}`, { method: "DELETE" }).then(
      (res) => res.json()
    );
    await queryClient.invalidateQueries({
      queryKey: ["databases"],
      type: "all",
    });
    await router.invalidate();
    setDeleteDialog(false);
    toast.success("Database deleted successfully");
  };

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
      cell: ({ row }) => (
        <div className="flex items-center gap-2 justify-end">
          <Link
            to="/databases/$database"
            params={{ database: row.original.uuid }}
            className={buttonVariants({ variant: "outline" })}
          >
            View
          </Link>
          <Link
            to="/databases/$database/edit"
            params={{ database: row.original.uuid }}
            className={buttonVariants({ variant: "outline", size: "icon" })}
          >
            <Edit />
          </Link>
          <MyAlertDialog
            trigger={
              <Button variant="destructive" size="icon">
                <Trash />
              </Button>
            }
            continueButton={
              <Button
                variant="destructive"
                onClick={() => handleDeleteDatabase(row.original.uuid)}
              >
                <Trash /> Delete Database
              </Button>
            }
            open={deleteDialog}
            onOpenChange={setDeleteDialog}
            title="Delete Database"
            description="Are you sure you want to delete this database?"
          />
        </div>
      ),
    },
  ];

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
