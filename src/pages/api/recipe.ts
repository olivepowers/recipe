// pages/api/recipes/create.js
import prisma, { createRecipe } from "@web/lib/prisma"; // Import your createRecipe function
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req: any, res: any) {
  const session = await getServerSession(req, res, authOptions);

  if (session === null || !session?.user?.email) {
    // TODO: handle error
    res.send();
    return;
  }
  console.log("hola");
  console.log({ session, req });

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
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
        },
        userId
      );

      return res.status(201).json({ recipe: newRecipe });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error creating recipe:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
