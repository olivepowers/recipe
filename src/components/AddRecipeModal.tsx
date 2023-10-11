import React from "react";
import { useSession } from "next-auth/react";
import RecipeForm from "./RecipeForm";
import { Recipe } from "@prisma/client";
import { Session } from "next-auth";
import { Button } from "@radix-ui/themes";

const AddRecipeModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const { data: session } = useSession();

  // @ts-expect-error
  const initialRecipeData = {
    title: "",
    picture: "",
    link: "",
    ingredients: [],
    steps: [],
    rating: 0,
    hashtags: [],
    status: "havemade", // havemade or wanttomake
    description: "",
  } as Recipe;

  const handleSave = async (session: Session, data: Recipe) => {
    try {
      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          // @ts-expect-error ID is actually on session but not on type
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
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
};

export default AddRecipeModal;
