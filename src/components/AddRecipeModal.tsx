import React, { useEffect, useState } from "react";
import { createRecipe } from "@web/lib/prisma";
import { useSession } from "next-auth/react";
import RecipeForm from "./RecipeForm";

const AddRecipeModal = () => {
  const { data: session } = useSession();

  const initialRecipeData = {
    title: "",
    picture: "",
    link: "",
    ingredients: [],
    steps: [],
    rating: 0,
    category: "",
    status: "havemade", // havemade or wanttomake
    description: "",
  };

  const handleSave = async (session: any, data: any) => {
    console.log({ data });
    try {
      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          authorId: session?.user?.id,
        }),
      });

      if (response.ok) {
        const newRecipe = await response.json();
        console.log("Recipe Saved:", newRecipe);
      } else {
        console.error("Error saving recipe:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <RecipeForm
      initialData={initialRecipeData}
      onSubmit={handleSave}
      buttonText="Add Recipe"
      modalDescription="Add Recipe"
    />
  );
};

export default AddRecipeModal;
