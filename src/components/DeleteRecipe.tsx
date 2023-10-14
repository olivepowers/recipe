import React, { useState } from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { Recipe } from "@prisma/client";
import { Session } from "next-auth";
import { useRouter } from "next/router";

const DeleteRecipe = ({ recipeData }: { recipeData: Recipe }) => {
  const router = useRouter();
  const handleDelete = async (data: Recipe) => {
    try {
      const response = await fetch("/api/recipe", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeData: data }),
      });
      if (response.ok) {
        const deletedRecipe = await response.json();
        console.log("Recipe Updated:", deletedRecipe);
        router.push("?mine");
        return deletedRecipe;
      } else {
        const errorData = await response.json();
        console.error("Error updating recipe:", errorData);
        throw new Error(
          errorData.error || "An error occured while updating the recipe."
        );
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Recipe</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Delete Recipe</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {" "}
          Are you sure? You will not be able to undo this action.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              onClick={() => handleDelete(recipeData)}
              variant="solid"
              color="red"
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteRecipe;
