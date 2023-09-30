import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const RecipeFilter = () => {
  return (
    <Accordion.Root type="single">
      <Accordion.Item value="category">
        <Accordion.Header>
          <Accordion.Trigger>Category</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>This is the content.</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default RecipeFilter;
