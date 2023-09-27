import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import type { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import RecipeComponent from "@web/components/Recipe";
import Layout from "@web/components/Layout";
import AddRecipeModal from "@web/components/AddRecipeModal";
import { useEffect } from "react";
import { Recipe } from "@prisma/client";
export const getServerSideProps: GetServerSideProps = async () => {
  const recipes = await prisma.recipe.findMany({
    // include: {
    //   author: true,
    // },
  });
  return {
    props: { recipes },
  };
};

type Props = {
  recipes: Recipe[];
};

export default function Home(props: Props) {
  console.log({ props });

  return (
    <Layout>
      <AddRecipeModal />
      <Flex className="min-h-screen p-5 flex-col">
        <Flex direction="column" gap="5">
          {props.recipes.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe} />
          ))}
        </Flex>
      </Flex>
    </Layout>
  );
}
