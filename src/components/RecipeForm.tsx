import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Flex,
  Select,
  Slider,
  Switch,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { Recipe } from "@prisma/client";
import { Session } from "next-auth";

type RecipeProps = {
  initialData: Recipe;
  onSubmit: (session: Session, recipe: Recipe) => void;
  buttonText: string;
  modalDescription: string;
  triggerElem?: React.ReactNode;
};

const RecipeForm = ({
  initialData,
  onSubmit,
  buttonText,
  modalDescription,
  triggerElem,
}: RecipeProps) => {
  const { data: session } = useSession();
  const [recipeData, setRecipeData] = useState<Recipe>(initialData);

  const resetRecipeData = () => {
    setRecipeData(initialData);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setRecipeData((prevData: Recipe) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setRecipeData((prevData: Recipe) => ({
      ...prevData,
      category: value,
    }));
  };

  useEffect(() => {
    console.log({ recipeData });
  }, [recipeData]);

  const handleChangeStatus = (e: boolean) => {
    let nextStatus = "havemade";
    if (e === false) {
      nextStatus = "wanttomake";
    }
    setRecipeData((prev: Recipe) => ({ ...prev, status: nextStatus }));
  };

  const handleRatingChange = (newValue: number) => {
    setRecipeData((prevData: Recipe) => ({ ...prevData, rating: newValue }));
  };

  //   const handleSave = async () => {
  //     try {
  //       const newRecipe = await createRecipe(recipeData);
  //       console.log("Recipe saved:", newRecipe);
  //     } catch (error) {
  //       console.error("Error saving recipe:", error);
  //     }
  //   };

  const handleSubmit = (e: any) => {
    if (session) {
      onSubmit(session, recipeData);
    } else {
      //TODO: add later, return to sign in page maybe?
    }
  };

  return (
    <Flex justify="end">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>{buttonText}</Button>
        </Dialog.Trigger>
        <Dialog.Content style={{ maxWidth: 500 }}>
          <Dialog.Title>{buttonText}</Dialog.Title>
          <Dialog.Description>{modalDescription}</Dialog.Description>
          <Flex direction="column" gap="3">
            <TextField.Input
              name="title"
              value={recipeData.title}
              onChange={handleInputChange}
              placeholder="Your recipe title"
            />
            <TextField.Input
              name="picture"
              value={recipeData?.picture ?? "Default Image URL TODO"}
              onChange={handleInputChange}
              placeholder="Insert a picture"
            />
            <TextField.Input
              name="link"
              value={recipeData?.link ?? ""}
              onChange={handleInputChange}
              placeholder="Link to recipe if applicable"
            />
            {/* <TextArea
            //   name="ingredients"
            //   value={recipeData.ingredients}
            //   onChange={handleInputChange}
              placeholder="List of ingredients"
            /> */}
            {/* <TextArea
              name="steps"
              value={recipeData.steps}
              onChange={handleInputChange}
              placeholder="Steps of recipe"
            /> */}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Rating
              </Text>
              <Slider
                defaultValue={[recipeData?.rating ?? 0]}
                onValueChange={(newValues) => {
                  handleRatingChange(newValues[0]);
                }}
              />
            </label>
            <Select.Root
              name="category"
              value={recipeData?.category ?? ""}
              onValueChange={handleCategoryChange}
            >
              <Select.Trigger
                name="category"
                value={recipeData?.category ?? ""}
                placeholder="Select a category..."
              />
              <Select.Content>
                <Select.Group>
                  <Select.Item value="appetizer">Appetizer</Select.Item>
                  <Select.Item value="Main">Main</Select.Item>
                  <Select.Item value="Dessert">Dessert</Select.Item>
                  <Select.Item value="appetizer">Snack</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <Flex>
              <Text size="2">
                <label>
                  <Switch
                    mr="2"
                    radius="full"
                    defaultChecked
                    onCheckedChange={handleChangeStatus}
                    checked={recipeData.status == "havemade"}
                  />{" "}
                  Have Made
                </label>
              </Text>
            </Flex>
            <TextArea
              name="description"
              value={recipeData?.description ?? ""}
              onChange={handleInputChange}
              placeholder="Description or notes"
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

export default RecipeForm;
