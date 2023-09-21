import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "Name", type: "text", placeholder: "jsmith" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            name: credentials?.username,
          },
        });
        console.log({ user, credentials });
        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: "olivia",
});
