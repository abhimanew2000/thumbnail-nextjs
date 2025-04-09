"use client";

import { Button } from "./ui/button";
import { downloadS3File } from "~/app/actions/aws";
const DownloadRecentThumbnail = ({ url }: { url: string }) => {
  return (
    <Button
      onClick={async () => await downloadS3File(url)}
      className="w-full"
      variant="outline"
    >
      Download
    </Button>
  );
};

export default DownloadRecentThumbnail;
