import { Button, Flex } from "@radix-ui/themes";
import type { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import RecipeComponent from "@web/components/RecipeComponent";
import Layout from "@web/components/Layout";
import AddRecipeModal from "@web/components/AddRecipeModal";
import { Recipe } from "@prisma/client";
import { useState } from "react";
import Sidebar from "@web/components/Sidebar";

const getHashtags = (hashtagStr?: string) => {
  const hashtags = hashtagStr ? hashtagStr.split(",") : [];
  return hashtags;
};

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const hashtags = getHashtags(ctx.query?.hashtags);

  const recipes = await prisma.recipe.findMany({
    include: {
      author: true,
    },
    where:
      hashtags.length != 0
        ? {
            hashtags: {
              hasSome: hashtags,
            },
          }
        : {},
  });

  const recipeHashtags = await prisma.recipe.findMany().then((recipes) => {
    const allRecipeHashtags = recipes.reduce((acc: string[], recipe) => {
      if (recipe.hashtags && recipe.hashtags.length > 0) {
        acc.push(...recipe.hashtags);
      }
      return acc;
    }, []);
    return Array.from(new Set(allRecipeHashtags));
  });

  return {
    props: { recipes, recipeHashtags },
  };
};

type Props = {
  recipes: Recipe[];
  recipeHashtags: string[];
};

export default function Home(props: Props) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <Layout>
      <AddRecipeModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />

      <div className="flex">
        <Sidebar hashtags={props.recipeHashtags} />
        <div className="flex-1 p-5">
          <Flex justify="end" p="2">
            <Button onClick={() => setIsAddModalOpen(true)}>Add Recipe</Button>
          </Flex>
          <Flex direction="column" gap="5">
            {props.recipes.map((recipe, index) => (
              <RecipeComponent key={index} recipe={recipe} />
            ))}
          </Flex>
        </div>
      </div>
    </Layout>
  );
}
