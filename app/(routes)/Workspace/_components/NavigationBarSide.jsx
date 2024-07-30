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

export default function SideNavigationBar({ params }) {
  const [documentList, setDocumentList] = useState();

  useEffect(() => {
    params && getDocumentList();
  }, [params]);

  const getDocumentList = () => {
    const qu = query(
      collection(db, "workspaceDocuments"),
      where("workspaceId", "==", Number(params?.workspaceId))
    );

    const unsubscribe = onSnapshot(qu, (QuerySnapshot) => {
      QuerySnapshot.forEach((doc) => {
        console.log(doc.data());
        setDocumentList((documentList) => [...documentList, doc.data()]);
      });
    });
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
        <Button size="sm">+</Button>
      </div>
      <div></div>
    </div>
  );
}
