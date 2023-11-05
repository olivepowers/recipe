import React, { useEffect, useState } from "react";
import { Button, Dialog, Flex, TextArea } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { Recipe } from "@prisma/client";
import { Session } from "next-auth";
import ListManager from "./ListManager";
import RecipeForm from "./RecipeForm";

const RecipeGenerator = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
}) => {
  //   const { data: session } = useSession();
  const [generatedFields, setGeneratedFields] = useState<any>({
    description: "",
    ingredients: [],
  });
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [lists, setLists] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const resetRecipeData = () => {
    setGeneratedFields({
      description: "",
      ingredients: [],
    });
    setGeneratedRecipe(null);
    setIsOpen(false);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setGeneratedFields({
      ...generatedFields,
      description: e.target.value,
    });
  };

  const handleUpdateIngredients = (newIngredients: string[]) => {
    setGeneratedFields({
      ...generatedFields,
      ingredients: newIngredients,
    });
  };

  //   TODO: route to addRecipeModal
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generateRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(generatedFields),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        console.log(data.lists);
        setLists(data.lists);
        console.log(lists);
        const genRecipe = {
          title: data.title,
          picture: "",
          ingredients: data.ingredients,
          steps: data.steps,
          rating: 0,
          hashtags: data.hashtags,
          status: "wanttomake",
          description: "",
        } as Recipe;
        setGeneratedRecipe(genRecipe);
      } else {
        console.error("Failed to generate recipe");
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
        for (const listName of lists) {
          console.log("listName", listName);
          const addToListResponse = await fetch("/api/copyrecipe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...(newRecipe.recipe as Recipe),
              // @ts-expect-error ID is actually on session but not on type
              authorId: session?.user?.id,
              listName,
            }),
          });
          if (!addToListResponse.ok) {
            console.error(
              "Error adding recipe to list:",
              addToListResponse.statusText
            );
          }
        }
        resetRecipeData();
      } else {
        console.error("Error saving recipe:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <Flex justify="end">
      <Dialog.Root open={isOpen}>
        <Dialog.Content style={{ maxWidth: 500 }}>
          {isLoading ? (
            <Flex>
              <Dialog.Title>Generating Recipe...</Dialog.Title>
            </Flex>
          ) : (
            <Flex direction="column">
              <Dialog.Title>Generate Recipe</Dialog.Title>
              <Dialog.Description>
                Fill out the following fields and get a custom made recipe
              </Dialog.Description>
              <Flex direction="column" gap="3">
                <TextArea
                  name="description"
                  rows={5}
                  value={generatedFields.description}
                  onChange={handleDescriptionChange}
                  placeholder="Description of what you would like to make (Ex: A would like to make an easy dinner for my family of 4, we follow a pescetarian diet...)"
                />
                {/* <Flex> */}
                <ListManager
                  name="Ingredients"
                  value={generatedFields.ingredients}
                  onUpdateList={handleUpdateIngredients}
                  inputPlaceholder="Enter any ingredients you'd like to use"
                />
                {/* </Flex> */}
              </Flex>
              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray" onClick={resetRecipeData}>
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button onClick={handleSubmit}>Next</Button>
                </Dialog.Close>
              </Flex>
            </Flex>
          )}
        </Dialog.Content>
      </Dialog.Root>
      {generatedRecipe && (
        <RecipeForm
          initialData={generatedRecipe}
          onSubmit={handleSave}
          buttonText="Add Generated Recipes"
          modalDescription="Create generated recipe"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClose={resetRecipeData}
        />
      )}
    </Flex>
  );
};

export default RecipeGenerator;
