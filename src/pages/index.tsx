import { Button, DropdownMenu, Flex, Separator, Text } from "@radix-ui/themes";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import RecipeComponent from "@web/components/RecipeComponent";
import Layout from "@web/components/Layout";
import AddRecipeModal from "@web/components/AddRecipeModal";
import { List, Recipe, ListRecipe, User } from "@prisma/client";
import Sidebar from "@web/components/Sidebar";
import { Fragment, useState } from "react";
import { PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import RecipeGenerator from "@web/components/RecipeGeneratorModal";

const getHashtags = (hashtagStr?: string) => {
  const hashtags = hashtagStr ? hashtagStr.split(",") : [];
  return hashtags;
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context);

  // Create vars from query params
  const listId = parseInt(context.query?.list_id);
  const showUserRecipes = context.query?.mine == "";

  // Get all user lists
  const lists = await prisma.list.findMany({
    where: {
      author: {
        email: session?.user?.email || null,
      },
    },
  });

  // Build WHERE statement for recipes
  let where: {
    author?: { email: string | null };
    lists?: {
      some: {
        listId: number;
      };
    };
  } = {};

  // Only filter by lists if `?list_id` is specified
  if (!isNaN(listId)) {
    where["lists"] = {
      some: {
        listId: listId,
      },
    };
  }

  if (showUserRecipes) {
    // Show author recipes only if no lists are defined
    where["author"] = {
      email: session?.user?.email || null,
    };
  }

  const recipes = await prisma.recipe.findMany({
    // Use built where statement
    where,
    include: {
      author: true,
      lists: true,
    },
  });

  return {
    props: { recipes, lists },
  };
};

type RecipeWithListsAndAuthor = Recipe & {
  lists: ListRecipe[];
  author: User;
};

type Props = {
  recipes: RecipeWithListsAndAuthor[];
  lists: List[];
};

export default function MyRecipes(props: Props) {
  console.log({ props });
  const router = useRouter();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isGeneratorModalOpen, setisGeneratorModalOpen] = useState(false);
  const selectedList = parseInt((router.query?.list_id as string) ?? "0");
  const hashtags = Array.from(
    new Set(props.recipes.flatMap((r) => r.hashtags))
  );
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);

  console.log({ hashtags });

  return (
    <Layout>
      <AddRecipeModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />
      <RecipeGenerator
        isOpen={isGeneratorModalOpen}
        setIsOpen={setisGeneratorModalOpen}
      />
      <div className="flex">
        <Sidebar
          hashtags={hashtags}
          selectedHashtags={selectedHashtags}
          setSelectedHashtags={setSelectedHashtags}
        />
        <div className="flex-1 p-5">
          <Text size="2">
            <Flex gap="3" align="center">
              <Button
                variant="ghost"
                onClick={() => {
                  router.push("");
                }}
              >
                All Recipes
              </Button>
              <Separator orientation="vertical" />
              <Button
                variant="ghost"
                onClick={() => {
                  router.push("?mine");
                }}
              >
                My Recipes
              </Button>
              {props.lists.map((list, index) => (
                <Fragment key={index}>
                  <Separator orientation="vertical" />
                  <Button
                    variant="ghost"
                    onClick={() => {
                      router.push("?list_id=" + list.id);
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
              {/* <Button onClick={() => setIsAddModalOpen(true)}>
                Add Recipe
              </Button> */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button
                    radius="full"
                    className="flex items-center justify-center text-current"
                    style={{
                      height: 30,
                      width: 30,
                      fontSize: 20,
                      paddingBottom: 3,
                    }}
                  >
                    +
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content variant="soft">
                  <DropdownMenu.Item onClick={() => setIsAddModalOpen(true)}>
                    Add Recipe
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => setisGeneratorModalOpen(true)}
                  >
                    Generate Recipe
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Flex>
            <Flex direction="column" gap="5">
              {props.recipes
                .filter(
                  (recipe) =>
                    selectedHashtags.length === 0 ||
                    recipe.hashtags.some((h) => selectedHashtags.includes(h))
                )
                .map((recipe, index) => (
                  <RecipeComponent key={index} recipe={recipe as Recipe} />
                ))}
            </Flex>
          </Flex>
        </div>
      </div>
    </Layout>
  );
}
