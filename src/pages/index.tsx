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
import { RecipeProps } from "@web/components/Recipe";
import Recipe from "@web/components/Recipe";
import Header from "@web/components/Header";
export const getServerSideProps: GetServerSideProps = async () => {
  const recipes = await prisma.recipe.findMany({
    include: {
      author: true,
    },
  });
  return {
    props: { recipes },
  };
};

type Props = {
  recipes: RecipeProps[];
};

export default function Home(props: Props) {
  console.log({ props });

  return (
    <Flex className="min-h-screen p-5 flex-col">
      <Header />
      <Flex direction="column" gap="5">
        {props.recipes.map((recipe, index) => (
          <Recipe key={index} recipe={recipe} />
        ))}
      </Flex>
    </Flex>
  );
}
