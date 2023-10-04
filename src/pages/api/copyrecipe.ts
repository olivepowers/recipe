// pages/api/copyrecipe
import { Recipe } from "@prisma/client";
import prisma, { addToWatchList } from "@web/lib/prisma";
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
      const recipe = req.body;

      // Perform data validation and create the recipe using Prisma
      const addedToWatchList = await addToWatchList(recipe.id, userId);

      return res.status(201).json({ recipe: addedToWatchList });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error with recipe:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
