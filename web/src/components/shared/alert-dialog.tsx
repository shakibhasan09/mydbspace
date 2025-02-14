import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@web/components/ui/alert-dialog";
import React from "react";

type MyAlertDialogProps = {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  cancelButton?: React.ReactNode;
  continueButton?: React.ReactNode;
  open?: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MyAlertDialog = (props: MyAlertDialogProps) => {
  return (
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogTrigger asChild>{props.trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {props.cancelButton ? (
            props.cancelButton
          ) : (
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          )}
          {props.continueButton ? (
            props.continueButton
          ) : (
            <AlertDialogAction>Continue</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
