import React from "react";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

const SignInPage = () => {
  return (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      <Card size="2">
        <Flex
          gap="6"
          align="center"
          direction="column"
          style={{ padding: "20px" }}
        >
          <Box>
            <Text as="div" size="7" weight="bold">
              Welcome to RecipeBox!
            </Text>
            <div style={{ padding: "10px" }}></div>
            <Flex align="center" justify="center">
              <Link href="/api/auth/signin">
                <Button variant="outline">Sign Up/ Sign In</Button>
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Card>
    </Flex>
  );
};

export default SignInPage;
