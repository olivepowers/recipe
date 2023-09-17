// pages/api/recipes/create.js
import { createRecipe } from "@web/lib/prisma"; // Import your createRecipe function

export default async function handler(req: any, res: any) {
  console.log({ req });
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
      const newRecipe = await createRecipe({
        title,
        picture,
        link,
        ingredients,
        steps,
        rating,
        category,
        status,
        description,
      });

      return res.status(201).json({ recipe: newRecipe });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error creating recipe:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
