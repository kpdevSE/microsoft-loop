"use client";
import Image from "next/image";
import coverImageWorkspace from "../../../public/cover.png";
import { Button } from "@/components/ui/button";
import { Edit, SmilePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import CoverPicker from "@/app/_components/CoverPicker";

export default function CreateWorkspace() {
  const [workspaceName, setWorkspaceName] = useState();
  const [coverImage, setCoverImage] = useState(coverImageWorkspace);
  return (
    <div className="lg:w-[50%] md:w-[65%] w-[80%] mx-auto flex flex-col items-start justify-center mt-36 shadow-2xl">
      <div className="w-full relative">
        <CoverPicker setNewCover={(v) => setCoverImage(v)}>
          <Edit className="cursor-pointer absolute ml-96 mt-6" />
        </CoverPicker>

        <Image
          src={coverImage}
          alt=""
          width={500}
          height={200}
          className="w-full h-[150px] rounded-t-2xl object-cover cursor-pointer"
        />
      </div>
      <div className="p-12 flex flex-col gap-4">
        <h1 className="font-bold text-lg">Create a New Workspace</h1>
        <p>
          This is a shared space where you can collabarte with your team.You can
          always rename it later.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline">
            <SmilePlus />
          </Button>
          <Input
            placeholder="Workspace Name"
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-end gap-3">
          <Button disabled={!workspaceName?.length}>Create</Button>
          <Link href={"/Dashboard"}>
            <Button variant="destructive">Cancel</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
