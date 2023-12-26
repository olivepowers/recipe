import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // CredentialsProvider({
    //   id: "credentials",
    //   name: "credentials",
    //   credentials: {
    //     username: { label: "Name", type: "text", placeholder: "jsmith" },
    //   },
    //   async authorize(credentials) {
    //     const user = await prisma.user.findFirst({
    //       where: {
    //         name: credentials?.username,
    //       },
    //     });
    //     console.log({ user, credentials });
    //     return user;x
    //   },
    // }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: "olivia",
};

export default NextAuth(authOptions);
