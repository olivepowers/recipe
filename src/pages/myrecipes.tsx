import { Button, Flex, Separator, Text } from "@radix-ui/themes";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import RecipeComponent from "@web/components/RecipeComponent";
import Layout from "@web/components/Layout";
import AddRecipeModal from "@web/components/AddRecipeModal";
import { List, Recipe, ListRecipe } from "@prisma/client";
import Sidebar from "@web/components/Sidebar";
import { Fragment, useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";

const getHashtags = (hashtagStr?: string) => {
  const hashtags = hashtagStr ? hashtagStr.split(",") : [];
  return hashtags;
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context); // Get the session data
  const hashtags = getHashtags(context.query?.hashtags);
  const listTab = context.query?.list;
  console.log(listTab);

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

  const lists = await prisma.list.findMany({
    where: {
      author: {
        email: session?.user?.email || null,
      },
    },
  });

  return {
    props: { recipes, recipeHashtags, lists, listTab },
  };
};

type Props = {
  recipes: Recipe[];
  recipeHashtags: string[];
  lists: List[];
  listTab: string;
};

export default function MyRecipes(props: Props) {
  console.log("props", { props });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<List | null>();

  return (
    <Layout>
      <AddRecipeModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />
      <div className="flex">
        <Sidebar hashtags={props.recipeHashtags} />
        <div className="flex-1 p-5">
          <Text size="2">
            <Flex
              gap="3"
              align="center"
              // className={`${
              //   selectedList === "My Recipes" ? "text-blue-500" : ""
              // }cursor-pointer`}
            >
              <Button variant="ghost" onClick={() => setSelectedList(null)}>
                My Recipes
              </Button>
              {props.lists.map((list, index) => (
                <Fragment key={index}>
                  <Separator orientation="vertical" />
                  <Button variant="ghost" onClick={() => setSelectedList(list)}>
                    {list.name}
                  </Button>
                </Fragment>
              ))}
              <Separator orientation="vertical" />
              <PlusIcon />
            </Flex>
            <Separator size="4" orientation="horizontal" />
          </Text>
          <Flex className="min-h-screen p-5 flex-col">
            <Flex justify="end" p="2">
              <Button onClick={() => setIsAddModalOpen(true)}>
                Add Recipe
              </Button>
            </Flex>
            <Flex direction="column" gap="5">
              {selectedList
                ? props.recipes
                    .filter((recipe) =>
                      recipe.lists.some(
                        (list: ListRecipe) => list.listId === selectedList.id
                      )
                    )
                    .map((recipe, index) => (
                      <RecipeComponent key={index} recipe={recipe} />
                    ))
                : props.recipes.map((recipe, index) => (
                    <RecipeComponent key={index} recipe={recipe} />
                  ))}
              {/* {props.recipes.map((recipe, index) => ( */}
              {/* <RecipeComponent key={index} recipe={recipe} /> */}
              {/* ))} */}
            </Flex>
          </Flex>
        </div>
      </div>
    </Layout>
  );
}
