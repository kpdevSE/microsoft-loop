"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CoverOptions from "../_shared/CoverOptions";
import Image from "next/image";
import { useState } from "react";

export default function CoverPicker({ children, setNewCover }) {
  const [selectedCoverImage, setSelectedCoverImage] = useState();
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Cover Image</DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
              {CoverOptions.map((e, index) => {
                return (
                  <div
                    key={e.id}
                    onClick={() => setSelectedCoverImage(e?.imageUrl)}
                    className={`${
                      selectedCoverImage == e?.imageUrl &&
                      "border-primary border-2 rounded-lg "
                    }`}
                  >
                    <Image
                      src={e?.imageUrl}
                      alt=""
                      width={200}
                      height={200}
                      className="h-[70px] w-full object-cover rounded-xl"
                    />
                  </div>
                );
              })}
            </div>
          </DialogDescription>
        </DialogHeader>{" "}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={() => setNewCover(selectedCoverImage)}
            >
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
