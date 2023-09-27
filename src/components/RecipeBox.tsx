import { Flex } from "@radix-ui/themes";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import RecipeComponent from "@web/components/RecipeComponent";
import Layout from "@web/components/Layout";
import AddRecipeModal from "@web/components/AddRecipeModal";
import { Recipe } from "@prisma/client";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context); // Get the session data
  const recipes = await prisma.recipe.findMany({
    where: {
      author: {
        email: session?.user?.email || null,
      },
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
  const { data: session } = useSession();
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
