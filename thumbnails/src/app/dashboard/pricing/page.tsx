"use client";

import Link from "next/link"; // ✅ correct
import { IoIosCheckmarkCircleOutline, IoMdArrowBack } from "react-icons/io";
import PricingCard from "~/components/pricing-card";

const Page = async () => {
  return (
    <div className="flex w-full items-center justify-center md:h-full">
      <div className="flex flex-col gap-4">
        <Link className="flex items-center gap-2" href="/dashboard">
          <IoMdArrowBack className="h-4 w-4" />
          <p className="leading-7">Go Back</p>
        </Link>
        <div className="flex flex-col gap-4 md:flex-row">
       <PricingCard pricing="$10" credits="10"/>
       <PricingCard pricing="$25" credits="25"/>
       <PricingCard pricing="$50" credits="100"/>

        </div>
      </div>
    </div>
  );
};

export default Page;
