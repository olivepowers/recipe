// pages/api/recipe
import { Recipe } from "@prisma/client";
import prisma, { createRecipe, updateRecipe } from "@web/lib/prisma"; // Import your createRecipe function
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (session === null || !session?.user?.email) {
    return res.status(401).json({ error: "You must be logged in. " });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  const userId = user?.id;

  try {
    if (req.method === "POST") {
      const {
        title,
        picture,
        link,
        ingredients,
        steps,
        rating,
        category,
        status,
        description,
      } = req.body;

      // Perform data validation and create the recipe using Prisma
      const newRecipe = await createRecipe(
        {
          title,
          picture,
          link,
          ingredients,
          steps,
          rating,
          category,
          status,
          description,
        } as Recipe,
        userId
      );

      return res.status(201).json({ recipe: newRecipe });
    } else if (req.method == "PATCH") {
      const { recipeData } = req.body;
      console.log("recipeData:", recipeData);
      const recipeId = recipeData.id;
      console.log("recipeId:", recipeId);

      if (!recipeId) {
        return res
          .status(400)
          .json({ error: "Recipe ID is required for updating." });
      }

      const existingRecipe = await prisma.recipe.findUnique({
        where: {
          id: recipeId,
        },
      });

      if (!existingRecipe) {
        return res.status(404).json({ error: "Recipe not found." });
      }

      if (existingRecipe.authorId !== userId) {
        return res
          .status(403)
          .json({ error: "You are not authorized to update this recipe." });
      }

      // @ts-expect-error
      const updateData: Recipe = {
        title: recipeData.title,
        picture: recipeData.picture,
        link: recipeData.picture,
        ingredients: recipeData.ingredients,
        steps: recipeData.steps,
        rating: recipeData.rating,
        category: recipeData.category,
        status: recipeData.status,
        description: recipeData.description,
      };

      // TODO: reduce is clunky here
      const filteredUpdateData = Object.keys(updateData).reduce(
        (acc: any, key) => {
          // @ts-expect-error
          if (updateData[key] !== undefined) {
            // @ts-expect-error
            acc[key] = updateData[key];
          }
          return acc;
        },
        {}
      );

      const updatedRecipe = await updateRecipe(recipeId, filteredUpdateData);
      return res.status(200).json({ recipe: updatedRecipe });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error with recipe:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
