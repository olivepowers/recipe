import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function createRecipe(recipeData: any, userId: string) {
  const newRecipe = await prisma.recipe.create({
    data: {
      ...recipeData,
      authorId: userId,
    },
  });
  return newRecipe;
}

export default prisma;
