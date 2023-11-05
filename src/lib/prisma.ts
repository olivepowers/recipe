import { PrismaClient, Recipe } from "@prisma/client";
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL + "?pgbouncer=true",
  });

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
  return updatedRecipe;
}

export async function deleteRecipe(recipeId: number) {
  const deletedRecipe = await prisma.recipe.delete({
    where: { id: recipeId },
  });
  return deletedRecipe;
}

// export async function addToWatchList(recipeId: number, userId: string) {
//   let watchList = await prisma.list.findFirst({
//     where: {
//       authorId: userId,
//       name: "Watch List",
//     },
//   });

//   if (!watchList) {
//     watchList = await prisma.list.create({
//       data: {
//         name: "Watch List",
//         authorId: userId,
//       },
//     });
//   }

//   const listRecipe = await prisma.listRecipe.create({
//     data: {
//       listId: watchList.id,
//       recipeId: recipeId,
//     },
//   });

//   return listRecipe;
// }

export async function checkInWatchlist(recipeId: number, userId: string) {
  let watchList = await prisma.list.findFirst({
    where: {
      authorId: userId,
      name: "Watch List",
    },
  });
  if (!watchList) {
    return false;
  }
  const recipeInWatchlist = await prisma.listRecipe.findFirst({
    where: {
      listId: watchList.id,
      recipeId: recipeId,
    },
  });

  return !!recipeInWatchlist;
}

export async function addToList(
  recipeId: number,
  userId: string,
  listName: string
) {
  let list = await prisma.list.findFirst({
    where: {
      authorId: userId,
      name: listName,
    },
  });

  if (!list) {
    list = await prisma.list.create({
      data: {
        name: listName,
        authorId: userId,
      },
    });
  }

  const listRecipe = await prisma.listRecipe.create({
    data: {
      listId: list.id,
      recipeId: recipeId,
    },
  });

  return listRecipe;
}

export default prisma;
