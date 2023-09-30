import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  ContextMenu,
  DropdownMenu,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import EditRecipeModal from "./EditRecipeModal";
import { Recipe } from "@prisma/client";
import DeleteRecipe from "./DeleteRecipe";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

type Props = {
  recipe: Recipe;
};

const RecipeDetails: React.FC<Props> = ({ recipe }) => {
  const { data: session } = useSession();
  // TODO: verify author off id not email
  // @ts-expect-error change recipeprops to include author
  const isAuthor = session?.user?.email === recipe.author?.email;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
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
                <DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        </Flex>
        <Flex gap="3" align="start" direction="column">
          <Flex gap="3" direction="row">
            <Box>
              <img
                src="/logo.png"
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
      />
    </Flex>
  );
};

export default RecipeDetails;
