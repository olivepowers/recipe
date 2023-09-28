import { Button, Flex } from "@radix-ui/themes";
import type { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import RecipeComponent from "@web/components/RecipeComponent";
import Layout from "@web/components/Layout";
import AddRecipeModal from "@web/components/AddRecipeModal";
import { Recipe } from "@prisma/client";
import { useState } from "react";
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
  recipes: Recipe[];
};

export default function Home(props: Props) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <Layout>
      <AddRecipeModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />
      <Flex className="min-h-screen p-5 flex-col">
        <Button onClick={() => setIsAddModalOpen(true)}>Add Recipe</Button>
        <Flex direction="column" gap="5">
          {props.recipes.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe} />
          ))}
        </Flex>
      </Flex>
    </Layout>
  );
}
