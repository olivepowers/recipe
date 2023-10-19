import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { Recipe } from "@prisma/client";

const RecipeComponent: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const router = useRouter();

  const handleClick = () => {
    console.log(recipe.id);
    router.push("/recipe/" + recipe.id);
  };

  return (
    <Card size="2" onClick={handleClick}>
      <Flex gap="5" align="center">
        <Box>
          <Text as="div" size="4" weight="bold">
            {recipe.title}
          </Text>
          <Text as="div" size="2" color="gray">
            {/* @ts-expect-error RecipeProps should include author object */}
            {recipe?.author?.name}
          </Text>
          <Text as="div" size="3">
            {recipe.description}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default RecipeComponent;
