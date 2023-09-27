import { PrismaClient, Recipe } from "@prisma/client";
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function createRecipe(recipeData: Recipe, userId: string) {
  const newRecipe = await prisma.recipe.create({
    data: {
      ...recipeData,
      authorId: userId,
    },
  });
  return newRecipe;
}

export async function updateRecipe(recipeId: number, updatedData: any) {
  const updatedRecipe = await prisma.recipe.update({
    where: { id: recipeId },
    data: updatedData,
  });
  return updateRecipe;
}

export default prisma;
