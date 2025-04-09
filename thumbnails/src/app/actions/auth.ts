"use server";

import bcrypt from "bcryptjs";
import { signInSchema } from "~/schemas/auth";
import { db } from "~/server/db";
import { redirect } from "next/navigation";
export const signup = async (email: string, password: string) => {
  //validation

  const isValid = signInSchema.safeParse({ email, password });

  if (isValid.error) {
    return "Error";
  }

  //see if user exist
  const user = await db.user.findUnique({
    where: {
      email: isValid.data.email,
    },
  });

  if (user) {
    return "User already exists";
  }
  //encrypt password

  const hash = await bcrypt.hash(isValid.data.password, 10);

  //Create stripe user

  // create user
  await db.user.create({
    data: {
      email: isValid.data.email,
      password: hash,
    },
  });

  //redirect user to signin if user is registered
  redirect("/signin");
};
