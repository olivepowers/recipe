import React from "react";
import { Avatar, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";

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
      <Link href="/">
        <img src="/logo.png" alt="Logo" width={40} height={60} />
      </Link>
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
