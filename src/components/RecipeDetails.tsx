import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Badge,
  DropdownMenu,
  Flex,
  Grid,
  Heading,
  Text,
  IconButton,
  Tooltip,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import EditRecipeModal from "./EditRecipeModal";
import { Recipe } from "@prisma/client";
import { Session } from "next-auth";
import { Router, useRouter } from "next/router";
import {
  CheckIcon,
  DotsVerticalIcon,
  PlusCircledIcon,
  PlusIcon,
} from "@radix-ui/react-icons";

type Props = {
  recipe: Recipe;
};

const RecipeDetails: React.FC<Props> = ({ recipe: initialRecipe }) => {
  const [recipe, setRecipe] = useState(initialRecipe);

  const { data: session } = useSession();
  // TODO: verify author off id not email
  // @ts-expect-error change recipeprops to include author
  const isAuthor = session?.user?.email === recipe.author?.email;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const tooltipContent = isAdded ? "Added to Watch List" : "Add to Watch Lidt";

  // TODO: Refactor to add to watch list on user's page
  const handleAddToWatchList = async (session: Session, data: Recipe) => {
    console.log({ data });
    try {
      const response = await fetch("/api/copyrecipe", {
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

  const handleDelete = async (data: Recipe) => {
    try {
      const response = await fetch("/api/recipe", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeData: data,
        }),
      });

      if (response.ok) {
        const deletedRecipe = await response.json();
        console.log("Recipe Deleted:", deletedRecipe);
        window.history.back();
      } else {
        console.error("Error deleting recipe:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <Flex justify="center">
      <Card m="4" className="w-full md:w-[80%] lg:w-[70%]">
        {/* {isAuthor && <EditRecipeModal initialRecipeData={recipe} />}
      {isAuthor && <DeleteRecipe recipeData={recipe} />} */}
        <Flex justify="end">
          {isAuthor && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button
                  style={{
                    width: "15px",
                    height: "15px",
                    padding: 0,
                    backgroundColor: "transparent",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <DotsVerticalIcon color="black" />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content variant="soft">
                <DropdownMenu.Item onClick={handleEditModalOpen}>
                  {/* <EditRecipeModal initialRecipeData={recipe} /> */}
                  Edit
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() => handleDelete(recipe)}
                  color="red"
                >
                  Delete
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
          {!isAuthor && session && (
            <Tooltip content={tooltipContent}>
              <IconButton
                radius="full"
                onClick={() => {
                  handleAddToWatchList(session, recipe);
                  setIsAdded(true);
                }}
                disabled={isAdded}
              >
                {isAdded ? <CheckIcon /> : <PlusIcon />}
              </IconButton>
            </Tooltip>
          )}
        </Flex>
        <Flex gap="3" align="start" direction="column">
          <Flex gap="3" direction="row">
            <Box>
              {/* TODO: style image */}
              <img
                src={recipe.picture || "/logo.png"}
                alt="Logo"
                className="object-cover w-full h-full"
              />
            </Box>
            <Flex direction="column">
              <Heading size="7">{recipe.title}</Heading>
              <Text weight="light">
                {/* @ts-expect-error make the author defined in getServerSideProps */}
                {recipe.author?.name ? recipe.author.name : "No author"}
              </Text>
              <Flex direction="row" gap="2">
                {recipe.hashtags.map((hashtag, index) => (
                  <Badge radius="full" key={index}>
                    #{hashtag}
                  </Badge>
                ))}
              </Flex>
              <Text>{recipe.description}</Text>
            </Flex>
          </Flex>
          <Grid columns="2" gap="4">
            <Box>
              <Heading size="4">Ingredients</Heading>
              <ul className="list-disc list-inside pl-4">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </Box>
            <Box>
              <Heading size="4">Directions</Heading>
              <ol className="list-decimal list-inside pl-4">
                {recipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </Box>
          </Grid>
        </Flex>
      </Card>
      <EditRecipeModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        initialRecipeData={recipe}
        setRecipe={setRecipe}
      />
    </Flex>
  );
};

export default RecipeDetails;
