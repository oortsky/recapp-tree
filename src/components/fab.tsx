"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DrawerDialog } from "@/components/drawer-dialog";
import { RecapForm } from "@/components/forms/recap-form";

export function Fab() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-10 right-1/2 translate-x-1/2">
        <Button
          onClick={handleClick}
          size="lg"
          className="relative rounded-full shadow-lg"
        >
          <Plus className="size-4" /> Add new recap
        </Button>
      </div>

      <DrawerDialog
        open={open}
        setOpen={setOpen}
        title="Add new recap"
        description="Make a new recap here. Click submit when you're done."
      >
        <RecapForm setOpen={setOpen} />
      </DrawerDialog>
    </>
  );
}
