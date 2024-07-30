"use client";
import Image from "next/image";
import logoImage from "../../../../public/Microsoft_Loop_logo.svg.png";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  collection,
  doc,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useEffect, useState } from "react";
import DocumentList from "./DocumentList";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SideNavigationBar({ params }) {
  const [documentList, setDocumentList] = useState([]);
  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    params && GetDocumentList();
  }, [params]);

  /**
   * Used to get Document List
   */
  const GetDocumentList = () => {
    const q = query(
      collection(db, "workspaceDocuments"),
      where("workspaceId", "==", Number(params?.workspaceid))
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setDocumentList([]);

      querySnapshot.forEach((doc) => {
        setDocumentList((documentList) => [...documentList, doc.data()]);
        console.log(documentList);
      });
    });
  };

  const CreateNewDocument = async () => {
    const docId = uuid4();
    await setDoc(doc(db, "workspaceDocuments", docId.toString()), {
      workspaceId: Number(params?.workspaceId),
      createdBy: user?.primaryEmailAddress?.emailAddress,
      coverImage: null,
      emoji: null,
      id: docId,
      documentName: "Untitled Document",
      documentoutput: [],
    });

    await setDoc(doc(db, "documentOutput", docId.toString()), {
      docId: docId,
      output: [],
    });

    setLoading(false);
    console.log("Data inserted Successfully");
    router.replace("/Workspace/" + params?.workspaceId + "/" + docId);
  };

  return (
    <div className="h-screen md:w-72 hidden md:block fixed bg-blue-50">
      <div className="flex items-center justify-between w-[95%] mx-auto pt-3">
        <div className="flex gap-1 items-center">
          <Image src={logoImage} alt="" width={30} height={30} />
          <h1 className="font-bold">Loop</h1>
        </div>
        <div>
          <Bell className="cursor-pointer" />
        </div>
      </div>
      <div className="p-3">
        <hr className="mt-1"></hr>
      </div>
      <div className="flex items-center justify-between w-[95%] mx-auto">
        <h1 className="font-bold">Workspace Name</h1>
        <Button size="sm" onClick={CreateNewDocument}>
          +
        </Button>
      </div>
      <div>
        <DocumentList documentList={documentList} />
      </div>
    </div>
  );
}
