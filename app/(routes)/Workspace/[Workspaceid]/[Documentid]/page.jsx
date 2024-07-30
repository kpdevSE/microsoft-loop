"use client";
import { useEffect } from "react";
import SideNavigationBar from "../../_components/NavigationBarSide";

export default function WorkspaceDocument({ params }) {
  useEffect(() => {
    console.log(params);
  }, [params]);
  return (
    <div>
      <div>
        <SideNavigationBar params={params} />
      </div>
      <div className="md:ml-72">Document</div>
    </div>
  );
}
