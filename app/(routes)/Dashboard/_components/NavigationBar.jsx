import Image from "next/image";
import logoImage from "../../../../public/Microsoft_Loop_logo.svg.png";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export default function NavigationBar() {
  return (
    <div className="flex items-center justify-between w-[95%] mx-auto shadow-sm p-5 flex-wrap ">
      <div className="flex items-center justify-center gap-3">
        <Image src={logoImage} alt=" " width={30} height={30} />
        <h1 className="font-bold text-2xl">Loop</h1>
      </div>
      <div>
        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/Dashboard"}
          afterLeaveOrganizationUrl={"/Dashboard"}
        />
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}
