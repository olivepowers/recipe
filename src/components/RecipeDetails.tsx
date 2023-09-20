import React from "react";
import { RecipeProps } from "./Recipe";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";

type Props = {
  recipe: RecipeProps;
};

const RecipeDetails: React.FC<Props> = ({ recipe }) => {
  return (
    <Card>
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
