import React from "react";
import { useSession } from "next-auth/react";
import RecipeForm from "./RecipeForm";
import { Recipe } from "@prisma/client";
import { Session } from "next-auth";

const EditRecipeModal = ({
  initialRecipeData,
}: {
  initialRecipeData: Recipe;
}) => {
  const { data: session } = useSession();

  const handleUpdate = async (session: Session, data: Recipe) => {
    try {
      const response = await fetch("/api/recipe", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeData: data }),
      });
      if (response.ok) {
        const updatedRecipe = await response.json();
        console.log("Recipe Updated:", updatedRecipe);
        return updatedRecipe;
      } else {
        const errorData = await response.json();
        console.error("Error updating recipe:", errorData);
        throw new Error(
          errorData.error || "Any error occured while updating the recipe."
        );
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };
  return (
    <RecipeForm
      initialData={initialRecipeData}
      onSubmit={handleUpdate}
      buttonText="Edit Recipe"
      modalDescription="Edit Recipe"
    />
  );
};

export default EditRecipeModal;
