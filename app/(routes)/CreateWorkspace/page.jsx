"use client";
import Image from "next/image";
import coverImageWorkspace from "../../../public/cover.png";
import { Button } from "@/components/ui/button";
import { Edit, Loader2Icon, SmilePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import Link from "next/link";
import CoverPicker from "@/app/_components/CoverPicker";
import EmojiPickerComponent from "@/app/_components/EmojiPickerComponent";
import { useAuth, useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { db } from "@/config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import uuid4 from "uuid4";

const CreateWorkspace = () => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [coverImage, setCoverImage] = useState(coverImageWorkspace);
  const [emoji, setEmoji] = useState("");
  const { user } = useUser();
  const { orgId } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onCreateWorkspace = async () => {
    const workspaceId = Date.now();
    setLoading(true);
    await setDoc(doc(db, "workspace", workspaceId.toString()), {
      workspaceName,
      emoji,
      coverImage,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      id: workspaceId,
      orgId: orgId ? orgId : user?.primaryEmailAddress?.emailAddress,
    });

    const docId = uuid4();
    await setDoc(doc(db, "workspaceDocuments", docId.toString()), {
      workspaceId: workspaceId,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      coverImage: null,
      emoji: null,
      id: docId,
      documentoutput: [],
    });

    await setDoc(doc(db, "documentOutput", docId.toString()), {
      docId: docId,
      output: [],
    });

    setLoading(false);
    console.log("Data inserted Successfully");
    router.replace("/Workspace/" + workspaceId + "/" + docId);
  };

  return (
    <div className="lg:w-[50%] md:w-[65%] w-[80%] mx-auto flex flex-col items-start justify-center mt-36 shadow-2xl">
      <div className="w-full relative flex items-start left-0">
        <CoverPicker setNewCover={setCoverImage}>
          <Edit className="cursor-pointer absolute mt-6 text-white" />
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
          This is a shared space where you can collaborate with your team. You
          can always rename it later.
        </p>
        <div className="flex items-center justify-center gap-2">
          <EmojiPickerComponent setEmojiIcon={setEmoji}>
            <Button variant="outline">{emoji ? emoji : <SmilePlus />}</Button>
          </EmojiPickerComponent>
          <Input
            placeholder="Workspace Name"
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-end gap-3">
          <Button
            disabled={!workspaceName.length || loading}
            onClick={onCreateWorkspace}
          >
            {loading && <Loader2Icon className="animate-spin ml-2" />}
            Create
          </Button>
          <Link href="/Dashboard">
            <Button variant="destructive">Cancel</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspace;
