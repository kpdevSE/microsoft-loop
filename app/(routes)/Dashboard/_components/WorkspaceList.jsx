"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { AlignLeft, LayoutGrid } from "lucide-react";
import createNewWorkspaceImage from "../../../../public/workspace.png";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function WorkspaceList() {
  const { user } = useUser();
  const [workspaceList, setWorkspacList] = useState([]);
  return (
    <div className="lg:w-[65%] md:w-[80%] w-[90%] mx-auto mt-16 gap-10 flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">
          Hello, {user?.firstName + " " + user?.lastName}
        </h1>
        <Link href="/CreateWorkspace">
          <Button>+</Button>
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-primary">Workspaces</h2>
        <div className="flex items-center justify-center gap-2">
          <LayoutGrid />
          <AlignLeft />
        </div>
      </div>
      {workspaceList.length == 0 ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <div>
            <Image
              src={createNewWorkspaceImage}
              alt=""
              width={250}
              height={250}
            />
          </div>
          <h1>Create a New Workspace</h1>
          <Link href={"/CreateWorkspace"}>
            <Button>+ New Workspace</Button>
          </Link>
        </div>
      ) : (
        <div>
          <h1>Workspace List</h1>
        </div>
      )}
    </div>
  );
}
