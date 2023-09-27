import React, { ReactNode } from "react";
import Header from "./Header";
import { Flex } from "@radix-ui/themes";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex direction="column">
      <Header />
      <main>{children}</main>
    </Flex>
  );
};

export default Layout;
