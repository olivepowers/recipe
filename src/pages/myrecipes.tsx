import { Button, Flex } from "@radix-ui/themes";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import RecipeComponent from "@web/components/RecipeComponent";
import Layout from "@web/components/Layout";
import AddRecipeModal from "@web/components/AddRecipeModal";
import { Recipe } from "@prisma/client";
import Sidebar from "@web/components/Sidebar";
import { useState } from "react";

const getHashtags = (hashtagStr?: string) => {
  const hashtags = hashtagStr ? hashtagStr.split(",") : [];
  return hashtags;
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context); // Get the session data
  const hashtags = getHashtags(context.query?.hashtags);

  let where: {
    author: { email: string | null };
    hashtags?: { hasSome: string[] };
  } = {
    author: {
      email: session?.user?.email || null,
    },
  };

  if (hashtags.length !== 0) {
    where["hashtags"] = {
      hasSome: hashtags,
    };
  }

  const recipes = await prisma.recipe.findMany({
    where: where,
  });

  const recipeHashtags = await prisma.recipe
    .findMany({
      where: {
        author: {
          email: session?.user?.email || null,
        },
      },
    })
    .then((recipes) => {
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

export default function MyRecipes(props: Props) {
  console.log({ props });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <Layout>
      <AddRecipeModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />
      <div className="flex">
        <Sidebar hashtags={props.recipeHashtags} />
        <div className="flex-1 p-5">
          <Flex className="min-h-screen p-5 flex-col">
            <Flex justify="end" p="2">
              <Button onClick={() => setIsAddModalOpen(true)}>
                Add Recipe
              </Button>
            </Flex>
            <Flex direction="column" gap="5">
              {props.recipes.map((recipe, index) => (
                <RecipeComponent key={index} recipe={recipe} />
              ))}
            </Flex>
          </Flex>
        </div>
      </div>
    </Layout>
  );
}
