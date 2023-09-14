
import { Box, Button, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";
import type { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { RecipeProps } from "@web/components/Recipe";

export const getServerSideProps: GetServerSideProps = async () => {
  const recipes = await prisma.recipe.findMany();
  return {
    props: { recipes },
  };
}

type Props = {
  recipes: RecipeProps[];
}

export default function Home(props: Props) {
  console.log({ props });

  return (
    <div className="min-h-screen">
      <Card
        my={"7"}
        variant="classic"
        size={"4"}
        style={{ borderRadius: "0" }}
      >
        <Container py={"6"}>
          <Flex direction={"column"}>
            <Heading as="h1" mb={"4"} size={"7"}>
              Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </Heading>
            <Text as="p" size={"4"}>
              Qui minim labore adipisicing minim sint
            </Text>
            <Box mt={"6"}>
              <Button size={"3"}>Learn More</Button>
            </Box>
          </Flex>
        </Container>
      </Card>
    </div >
  );
}