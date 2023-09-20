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
import { createRecipe } from "@web/lib/prisma";

const AddRecipeModal = () => {
  const [recipeData, setRecipeData] = useState({
    title: "",
    picture: "",
    link: "",
    ingredients: [],
    steps: [],
    rating: 0,
    category: "",
    status: "havemade", // havemade or wanttomake
    description: "",
  });

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

  const resetRecipeData = () => {
    setRecipeData(initialRecipeData);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setRecipeData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  useEffect(() => {
    console.log({ recipeData });
  }, [recipeData]);

  const handleChangeStauts = (e: any) => {
    console.log({ e });
    let nextVal = "havemade";
    if (e === false) {
      nextVal = "wanttomake";
    }
    setRecipeData((prev) => ({ ...prev, status: nextVal }));
  };

  const handleRatingChange = (newValue: number) => {
    setRecipeData((prevData) => ({ ...prevData, rating: newValue }));
  };

  //   const handleSave = async () => {
  //     try {
  //       const newRecipe = await createRecipe(recipeData);
  //       console.log("Recipe saved:", newRecipe);
  //     } catch (error) {
  //       console.error("Error saving recipe:", error);
  //     }
  //   };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
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
    <Flex justify="end">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Add Recipe</Button>
        </Dialog.Trigger>
        <Dialog.Content style={{ maxWidth: 500 }}>
          <Dialog.Title>Add Recipe</Dialog.Title>
          <Dialog.Description>
            Add a recipe to your recipe box
          </Dialog.Description>
          <Flex direction="column" gap="3">
            <TextField.Input
              name="title"
              value={recipeData.title}
              onChange={handleInputChange}
              placeholder="Your recipe title"
            />
            <TextField.Input
              name="picture"
              value={recipeData.picture}
              onChange={handleInputChange}
              placeholder="Insert a picture"
            />
            <TextField.Input
              name="link"
              value={recipeData.link}
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
                defaultValue={[recipeData.rating]}
                onValueChange={(newValues) => {
                  handleRatingChange(newValues[0]);
                }}
              />
            </label>
            <Select.Root
              name="category"
              value={recipeData.category}
              onValueChange={handleCategoryChange}
            >
              <Select.Trigger
                name="category"
                value={recipeData.category}
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
                    onCheckedChange={handleChangeStauts}
                    checked={recipeData.status == "havemade"}
                  />{" "}
                  Have Made
                </label>
              </Text>
            </Flex>
            <TextArea
              name="description"
              value={recipeData.description}
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
              <Button onClick={handleSave}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
};

export default AddRecipeModal;
