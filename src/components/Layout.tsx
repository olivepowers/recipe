import React from "react";
import Header from "./Header";
import { Flex } from "@radix-ui/themes";

const Layout: React.FC = ({ children }) => {
  return (
    <Flex direction="column">
      <Header />
      <main>{children}</main>
    </Flex>
  );
};

export default Layout;
