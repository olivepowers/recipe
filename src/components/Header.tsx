import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Avatar, Button, Flex } from "@radix-ui/themes";

const Header = () => {
  return (
    <Flex
      gap="3"
      justify="between"
      align="center"
      className="py-4 px-6 pb-5 bg-slate-200"
    >
      {/* <Button color="cyan" variant="ghost" className="mr-auto">
        Home
      </Button> */}
      <img src="/logo.png" alt="Logo" width={40} height={60} />
      <Flex gap="4" align="center">
        <Button color="cyan" variant="ghost">
          Recipe Box
        </Button>
        <Avatar color="cyan" radius="full" fallback="OP" />
      </Flex>
    </Flex>
  );
};

export default Header;
