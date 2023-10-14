import React from "react";
import { Avatar, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

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
        <div onClick={() => router.push("/profile")}>
          <Avatar color="cyan" radius="full" fallback="OP" />
        </div>
      </Flex>
    </Flex>
  );
};

export default Header;
