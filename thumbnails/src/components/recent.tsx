"use server";

import { Separator } from "@radix-ui/react-select";
import { Button } from "./ui/button";
import { getServerSession } from "next-auth";
import { authConfig } from "~/server/auth/config";
import AWS from "aws-sdk";
import { env } from "process";

const Recent = async () => {
    const serverSession = await getServerSession(authConfig)
    const s3 = new AWS.S3({
      accessKeyId: env.AWS_ACCESS_KEY,
      secretAccessKey: env.AWS_SECRET_KEY,
      region: env.AWS_REGION,
    });
    const prefix = `${serverSession?.user.id}/`;

    const params = {
        Bucket:env.AWS_BUCKET_NAME,
        Prefix:prefix,
        MaxKeys:10
    };
    const data = await s3.listObjectsV2(params).promise();
    const recentThumbnails = data.Contents?.sort((a,b)=>{
        const dateA = new Date(a.LastModified??0).getTime()
        const dateB = new Date(b.LastModified??0).getTime()
        return dateB - dateA;


    }).map((item)=>{
        url:`https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${item.Key}`
    })
  return (
    <div className="flex flex-col">
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight"></h3>
      <p className="text-muted-foreground text-sm">
        Download your most recent thumbnails
      </p>
      <Separator className="my-2" />
      <div className="flex h-fit max-w-full gap-2 overflow-x-scroll">
        <div className="flex min-w-fit flex-col gap-1">
          <img
            src="/style1.png"
            alt="image"
            className="h-56 w-auto rounded-lg object-contain"
          />
          <p className="text-sm">
            {" "}
            From {""}
            {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
          <Button className="w-full" variant="outline">
            Download
          </Button>
        </div>
        <div className="flex min-w-fit flex-col gap-1">
          <img
            src="/style1.png"
            alt="image"
            className="h-56 w-auto rounded-lg object-contain"
          />
          <p className="text-sm">
            {" "}
            From {""}
            {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
          <Button className="w-full" variant="outline">
            Download
          </Button>
        </div>
        <div className="flex min-w-fit flex-col gap-1">
          <img
            src="/style1.png"
            alt="image"
            className="h-56 w-auto rounded-lg object-contain"
          />
          <p className="text-sm">
            {" "}
            From {""}
            {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
          <Button className="w-full" variant="outline">
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Recent;
