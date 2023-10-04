import React from "react";
import { useSession } from "next-auth/react";
import RecipeForm from "./RecipeForm";
import { Recipe } from "@prisma/client";
import { Session } from "next-auth";
import { DropdownMenu } from "@radix-ui/themes";

const EditRecipeModal = ({
  initialRecipeData,
  isOpen,
  setIsOpen,
  setRecipe,
}: {
  initialRecipeData: Recipe;
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
  setRecipe: (recipe: Recipe) => void;
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
        setRecipe(updatedRecipe.recipe);
      } else {
        const errorData = await response.json();
        console.error("Error updating recipe:", errorData);
        throw new Error(
          errorData.error || "An error occured while updating the recipe."
        );
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  const triggerElem = <DropdownMenu.Item>Edit</DropdownMenu.Item>;

  return (
    <RecipeForm
      initialData={initialRecipeData}
      onSubmit={handleUpdate}
      buttonText="Edit Recipe"
      modalDescription="Edit Recipe"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
};

export default EditRecipeModal;
