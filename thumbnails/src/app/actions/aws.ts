"use server";

import AWS from "aws-sdk";
import { getServerSession } from "next-auth";
import { env } from "process";
import { authConfig } from "~/server/auth/config";
import { format } from "date-fns";

const s3 = new AWS.S3({
  accessKeyId: env.AWS_ACCESS_KEY,
  secretAccessKey: env.AWS_SECRET_KEY,
  region: env.AWS_REGION,
});

export const getPresignedUrl = async () => {
  const serverSession = await getServerSession(authConfig);
  if (!serverSession) {
    throw new Error("User not authenticated");
  }
  const timestamp = format(new Date(), "yyyyMMddHHmmss");
  const key = `${serverSession?.user.id}/${timestamp}.png`;
  const params = {
    Bucket: env.AWS_BUCKET_NAME,
    Key: key,
    Expires: 60,
    ContentType: "image/png",
  };
  const uploadUrl = s3.getSignedUrl("putObject", params);
  return uploadUrl;
};
