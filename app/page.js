import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button>Subscribe Me</Button>
      <Link href={"/sign-in"}>
        <Button>Login</Button>
      </Link>
    </div>
  );
}
