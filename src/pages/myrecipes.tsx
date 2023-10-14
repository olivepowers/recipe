import { Button, Flex, Separator, Text } from "@radix-ui/themes";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import RecipeComponent from "@web/components/RecipeComponent";
import Layout from "@web/components/Layout";
import AddRecipeModal from "@web/components/AddRecipeModal";
import { List, Recipe, ListRecipe, User } from "@prisma/client";
import Sidebar from "@web/components/Sidebar";
import { Fragment, useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";

const getHashtags = (hashtagStr?: string) => {
  const hashtags = hashtagStr ? hashtagStr.split(",") : [];
  return hashtags;
};

// Hashtags: recipe.hashtags
// Author: recipe.author_id
// Lists: list_item, join query

// have list displayed filtered here on server side props
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context); // Get the session data
  const hashtags = getHashtags(context.query?.hashtags);
  const listTab = parseInt(context.query?.list);
  // console.log(listTab);

  // TODO: create helper function for getting user id from email

  let where: {
    author?: { email: string | null };
    hashtags?: { hasSome: string[] };
    lists?: {
      some: {
        listId: number;
      };
    };
  } = {
    // author: {
    //   email: session?.user?.email || null,
    // },
  };

  if (!isNaN(listTab)) {
    where["lists"] = {
      some: {
        listId: listTab,
      },
    };
  }

  const lists = await prisma.list.findMany({
    where: {
      author: {
        email: session?.user?.email || null,
      },
    },
  });

  if (hashtags.length !== 0) {
    where["hashtags"] = {
      hasSome: hashtags,
    };
  }

  const recipes = await prisma.recipe.findMany({
    where: where,
    include: {
      author: true,
      lists: true,
    },
  });

  // const selectedListRecipes = listTab ? recipes.filter((recipe) => recipe.lists.some((list) => list.list?.name === listTab)
  // ) : recipes;

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
    props: { recipes, recipeHashtags, lists, listTab },
  };
};

type RecipeWithListsAndAuthor = Recipe & {
  lists: ListRecipe[];
  author: User;
};

type Props = {
  recipes: RecipeWithListsAndAuthor[];
  recipeHashtags: string[];
  lists: List[];
  listTab: number;
};
// type Props = typeof

export default function MyRecipes(props: Props) {
  console.log("props", { props });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<number | null>(
    props.listTab
  );
  const router = useRouter();

  console.log({ selectedList });

  return (
    <Layout>
      <AddRecipeModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />
      <div className="flex">
        <Sidebar hashtags={props.recipeHashtags} />
        <div className="flex-1 p-5">
          <Text size="2">
            <Flex gap="3" align="center">
              <Button variant="ghost" onClick={() => setSelectedList(null)}>
                My Recipes
              </Button>
              {props.lists.map((list, index) => (
                <Fragment key={index}>
                  <Separator orientation="vertical" />
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedList(list.id);
                      router.push("?hashtags=") + list.name;
                    }}
                  >
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
                        (list: ListRecipe) => list.listId === selectedList
                      )
                    )
                    .map((recipe, index) => (
                      <RecipeComponent key={index} recipe={recipe} />
                    ))
                : props.recipes.map((recipe, index) => (
                    <RecipeComponent key={index} recipe={recipe} />
                  ))}
            </Flex>
          </Flex>
        </div>
      </div>
    </Layout>
  );
}
