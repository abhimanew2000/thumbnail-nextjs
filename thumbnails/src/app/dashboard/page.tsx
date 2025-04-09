import { getServerSession } from "next-auth";
import { authConfig } from "~/server/auth/config";
import { db } from "~/server/db";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import ThumbnailCreator from "~/components/ui/thumbnail-creator";
import Style from "~/components/ui/style";
import Recent from "~/components/recent";
import { env } from "~/env";
const Page = async () => {
  const serverSession = await getServerSession(authConfig);
  const user = await db.user.findUnique({
    where: {
      id: serverSession?.user.id,
    },
    select: {
      credits: true,
    },
  });
  

  return (
    <div className="flex h-screen max-w-full items-center justify-center px-4 md:max-w-3xl md:px-0">
      <div className="flex max-w-full flex-col gap-10">
        {user?.credits == 0 ? (
          <div className="flex flex-col px-10 md:mt-10">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Hi There
            </h1>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Want to create a thumbnail?
            </h1>
            <div className="mt-2 flex flex-col gap-3">
              <p className="text-muted-foreground leading-7">
                Buy more credits to continue generating thumbails
              </p>
              <Link href="/dashboard/pricing">
                <Button>Buy Credits</Button>
              </Link>
            </div>
            <div>
              <div className="mt-8">
                <Recent/>
              </div>
            </div>
          </div>
        ) : (
          <ThumbnailCreator><Recent/></ThumbnailCreator>
        )}
      </div>
    </div>
  );
};

export default Page;
