"use server";

import { getServerSession } from "next-auth";
import { authConfig } from "~/server/auth/config";
import { db } from "~/server/db";
const Credits = async ()=>{
    const serverSession = await getServerSession(authConfig)
    const user = await db.user.findUnique({
        where:{
            id:serverSession?.user.id
        },
        select:{
            credits:true
        }
    })
    
    return (
        <p>{user?.credits} credits left</p>
       
    )
}

export default Credits;