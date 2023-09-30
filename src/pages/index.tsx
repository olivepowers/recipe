import { Button, Checkbox, Flex, Text } from "@radix-ui/themes";
import type { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import RecipeComponent from "@web/components/RecipeComponent";
import Layout from "@web/components/Layout";
import AddRecipeModal from "@web/components/AddRecipeModal";
import { Recipe } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/router";

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
  return {
    props: { recipes },
  };
};

type Props = {
  recipes: Recipe[];
};

export default function Home(props: Props) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const HASHTAGS = ["cookies", "italian"];

  const router = useRouter();

  // @ts-expect-error
  const hashtags = getHashtags(router.query?.hashtags);

  const toggleHashtags = (hashtag: string) => {
    let newHashtags;
    if (hashtags.indexOf(hashtag) != -1) {
      newHashtags = hashtags.filter((h) => h != hashtag);
    } else {
      newHashtags = [...hashtags, hashtag];
    }

    if (newHashtags.length > 0) {
      router.push("?hashtags=" + newHashtags.join(","));
    } else {
      router.push("");
    }
  };

  return (
    <Layout>
      <AddRecipeModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />

      <div className="flex">
        {/* Sidebar for hashtag filtering */}
        <div
          className="w-1/4 p-4 border-r"
          style={{
            maxWidth: 200,
          }}
        >
          <Text size="2">Hashtags:</Text>
          {HASHTAGS.map((c) => (
            <div key={c}>
              <Text size="2">
                <label>
                  <Checkbox
                    className="mr-1"
                    checked={hashtags.indexOf(c) != -1}
                    onClick={() => toggleHashtags(c)}
                  />{" "}
                  {c}
                </label>
              </Text>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-5">
          <Button onClick={() => setIsAddModalOpen(true)}>Add Recipe</Button>
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
