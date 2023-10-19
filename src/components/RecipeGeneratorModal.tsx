import React, { useEffect, useState } from "react";
import { Button, Dialog, Flex, TextArea } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { Recipe } from "@prisma/client";
import { Session } from "next-auth";
import ListManager from "./ListManager";

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
  const [recipe, setRecipe] = useState();

  const resetRecipeData = () => {
    setGeneratedFields({
      description: "",
      ingredients: [],
    });
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

  const handleSubmit = async () => {
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
        setRecipe(data);
        console.log({ recipe });
      } else {
        console.error("Failed to generate recipe");
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  return (
    <Flex justify="end">
      <Dialog.Root open={isOpen}>
        <Dialog.Content style={{ maxWidth: 500 }}>
          <Dialog.Title>Generate Recipe</Dialog.Title>
          <Dialog.Description>
            Fill out the following fields and get a custom made recipe
          </Dialog.Description>
          <Flex direction="column" gap="3">
            <TextArea
              name="description"
              value={generatedFields.description}
              onChange={handleDescriptionChange}
              placeholder="Description of what you would like to make (Ex: A would like to make an easy dinner for my family of 4, we follow a pescetarian diet...)"
            />
            <ListManager
              name="Ingredients"
              value={generatedFields.ingredients}
              onUpdateList={handleUpdateIngredients}
              inputPlaceholder="Enter any ingredients you'd like to use"
            />
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" onClick={resetRecipeData}>
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleSubmit}>Submit</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
};

export default RecipeGenerator;
