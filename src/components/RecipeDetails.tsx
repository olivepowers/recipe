import React from "react";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import EditRecipeModal from "./EditRecipeModal";
import { Recipe } from "@prisma/client";
import DeleteRecipe from "./DeleteRecipe";

type Props = {
  recipe: Recipe;
};

const RecipeDetails: React.FC<Props> = ({ recipe }) => {
  const { data: session } = useSession();
  // TODO: verify author off id not email
  // @ts-expect-error change recipeprops to include author
  const isAuthor = session?.user?.email === recipe.author?.email;

  return (
    <Card>
      {isAuthor && <EditRecipeModal initialRecipeData={recipe} />}
      {isAuthor && <DeleteRecipe recipeData={recipe} />}
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
  );
};

export default RecipeDetails;
