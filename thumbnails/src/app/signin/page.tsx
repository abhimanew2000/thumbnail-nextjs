"use server";

import { getServerSession} from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "~/server/auth/config";
import type { Session } from "next-auth";
import Signin from "~/components/ui/signin";

const Page = async () => {
  const serverSession = await getServerSession(authConfig); 
    if (serverSession?.user){
        redirect("/dashboard")
    }

  return <>
    <Signin/>
    </>;
};

export default Page;
