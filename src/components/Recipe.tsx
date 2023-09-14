import React from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";

export type RecipeProps = {
  id: number;
  title: string;
  description: string;
  author: {
    name: string;
    email: string;
  } | null;
};

const Recipe: React.FC<{ recipe: RecipeProps }> = ({ recipe }) => {
  return (
    <Card size="2">
      <Flex gap="5" align="center">
        <Box>
          <Text as="div" size="4" weight="bold">
            {recipe.title}
          </Text>
          <Text as="div" size="2" color="gray">
            {recipe.author?.name}
          </Text>
          <Text as="div" size="3">
            {recipe.description}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default Recipe;
