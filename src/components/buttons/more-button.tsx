"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { DrawerDialog } from "@/components/drawer-dialog";
import { RecapForm } from "@/components/forms/recap-form";
import { TypeForm } from "@/components/forms/type-form";
import { toast } from "sonner";
import { MoreHorizontal, SquarePen, Trash2Icon } from "lucide-react";
import { deleteRecap, deleteType } from "@/db/appwrite";

interface MoreButtonProps {
  mode: "type" | "recap";
  item_id: string;
}

export function MoreButton({ mode, item_id }: MoreButtonProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleEdit = () => {
    setDropdownOpen(false);
    setDrawerOpen(true);
  };

  const handleDelete = () => {
    setDropdownOpen(false);
    setAlertOpen(true);
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            title="More Options"
            size="icon-xs"
            aria-label="More Options"
          >
            <MoreHorizontal className="size-4" />
            <span className="sr-only">More Options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={handleEdit}>
              <SquarePen className="mr-2 size-4" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={handleDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash2Icon className="mr-2 size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DrawerDialog
        open={drawerOpen}
        setOpen={setDrawerOpen}
        title={mode === "type" ? "Edit type" : "Edit recap"}
        description={`Make changes to your ${
          mode === "type" ? "type" : "recap"
        } here. Click submit when you're done.`}
      >
        {mode === "type" ? (
          <TypeForm setOpen={setDrawerOpen} item_id={item_id} />
        ) : mode === "recap" ? (
          <RecapForm setOpen={setDrawerOpen} item_id={item_id} />
        ) : null}
      </DrawerDialog>

      <DeleteAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        title={mode === "type" ? "Delete this type?" : "Delete this recap?"}
        description={`This action cannot be undone. This will permanently delete this ${
          mode === "type" ? "type" : "recap"
        }.`}
        mode={mode}
        item_id={item_id}
      />
    </>
  );
}

interface DeleteAlertProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  mode: "type" | "recap";
  item_id: string;
}

function DeleteAlert({
  open,
  setOpen,
  title,
  description,
  mode,
  item_id
}: DeleteAlertProps) {
  const handleClick = async () => {
    if (mode === "type") {
      await deleteType(item_id);
      toast.success("Type deleted successfully!");
    } else if (mode === "recap") {
      await deleteRecap(item_id);
      toast.success("Recap deleted successfully!");
    }
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
