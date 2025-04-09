"use server";

import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import Signout from "~/components/ui/signout";
import Credits from "~/components/ui/credits";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen w-full flex-col items-center overflow-y-scroll px-6 py-6">
        <nav className="flex w-full items-center justify-end pb-6">
            
            <div className="flex items-center gap-4 pb-6">

            <Credits/>
            <Link href="/dashboard/pricing">
            <Button>Buy More</Button>
            </Link>
            <Signout/>
            </div>
        </nav>
            {children}
    </div>
  );
}
