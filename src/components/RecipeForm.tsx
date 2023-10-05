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
import ListManager from "./ListManager";

type RecipeProps = {
  initialData: Recipe;
  onSubmit: (session: Session, recipe: Recipe) => void;
  buttonText: string;
  modalDescription: string;
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
  type?: ModalType;
};

enum ModalType {
  Add = "Add",
  Edit = "Edit",
}

const RecipeForm = ({
  initialData,
  onSubmit,
  buttonText,
  modalDescription,
  isOpen,
  setIsOpen,
  type,
}: RecipeProps) => {
  const { data: session } = useSession();
  const [recipeData, setRecipeData] = useState<Recipe>(initialData);

  const resetRecipeData = () => {
    setRecipeData(initialData);
    setIsOpen(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setRecipeData((prevData: Recipe) => ({
      ...prevData,
      [name]: value,
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

  const handleUpdateIngredients = (newIngredients: string[]) => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: newIngredients,
    }));
  };

  const handleUpdateSteps = (newSteps: string[]) => {
    setRecipeData((prevData) => ({
      ...prevData,
      steps: newSteps,
    }));
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipeData((prevData) => ({
          ...prevData,
          picture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateHashtags = (newHashtags: string[]) => {
    setRecipeData((prevData) => ({
      ...prevData,
      hashtags: newHashtags,
    }));
  };

  const handleSubmit = (e: any) => {
    if (session) {
      onSubmit(session, recipeData);
      setIsOpen(false);
    } else {
      //TODO: add later, return to sign in page maybe?
      alert("Invalid auth");
    }
  };

  return (
    <Flex justify="end">
      <Dialog.Root open={isOpen}>
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
            {/* TODO: add ability to drag and drop image */}
            <input
              name="picture"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {/* <TextField.Input
              name="picture"
              value={recipeData?.picture ?? "Default Image URL TODO"}
              onChange={handleInputChange}
              placeholder="Insert a picture"
            /> */}
            <TextField.Input
              name="link"
              value={recipeData?.link ?? ""}
              onChange={handleInputChange}
              placeholder="Link to recipe if applicable"
            />
            <ListManager
              name="Ingredients"
              value={recipeData.ingredients}
              onUpdateList={handleUpdateIngredients}
              inputPlaceholder="Enter an ingredient"
            />
            <ListManager
              name="Steps"
              value={recipeData.steps}
              onUpdateList={handleUpdateSteps}
              inputPlaceholder="Enter a step"
            />
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
            <ListManager
              name="hashtags"
              value={recipeData.hashtags}
              onUpdateList={handleUpdateHashtags}
              inputPlaceholder="Enter a hashtag"
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
