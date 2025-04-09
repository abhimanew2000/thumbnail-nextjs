import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";
import { db } from "~/server/db";
import { signInSchema } from "~/schemas/auth";
import { env } from "~/env";

export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: env.AUTH_SECRET,

  // 1) Credentials Provider
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);

          const user = await db.user.findUnique({ where: { email } });
          if (!user) throw new Error("User not found");

          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) return null;

          return user; // if successful, returns user object
        } catch (error) {
          if (error instanceof ZodError) return null;
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],

  // 2) Pages
  pages: {
    signIn: "/signin",
  },

  // 3) Session & JWT
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
