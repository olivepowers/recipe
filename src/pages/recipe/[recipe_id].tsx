import Layout from "@web/components/Layout";
import { RecipeProps } from "@web/components/Recipe";
import RecipeDetails from "@web/components/RecipeDetails";
import prisma from "@web/lib/prisma";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { recipe_id } = context.query;

  const id = recipe_id ? parseInt(recipe_id as string, 10) : undefined;

  const recipes = await prisma.recipe.findMany({
    // include: {
    //   author: true,
    // },
    where: {
      id,
    },
  });

  const recipe = recipes?.[0];

  return {
    props: { recipe },
  };
};

type Props = {
  recipe: RecipeProps;
};

// get :recipe_id from route
export default function RecipePage(props: Props) {
  console.log({ props });

  return (
    <Layout>
      <RecipeDetails recipe={props.recipe} />
    </Layout>
  );
}