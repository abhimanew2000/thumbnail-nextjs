"use server";

import { getServerSession} from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "~/server/auth/config";
import type { Session } from "next-auth";
import Signup from "~/components/ui/signup";

const Page = async () => {
  const serverSession = await getServerSession(authConfig); 
    if (serverSession?.user){
        redirect("/dashboard")
    }

  return <>
    <Signup/>
    </>;
};

export default Page;
