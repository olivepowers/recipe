import React, { useState } from "react";
import { Button, TextField, Flex, Text } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";

type ListManagerProps = {
  name: string;
  value: string[];
  onUpdateList: (updatedList: string[]) => void;
  inputPlaceholder: string;
};

const ListManager = ({
  name,
  value,
  onUpdateList,
  inputPlaceholder,
}: ListManagerProps) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState(value);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      const updatedItems = [...items, inputValue];
      setItems(updatedItems);
      onUpdateList(updatedItems);
      setInputValue("");
    }
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    onUpdateList(updatedItems);
  };

  return (
    <Flex direction="column" gap="3">
      <label>
        <Text as="div" size="2" weight="bold">
          {name}
        </Text>
      </label>
      <Flex align="center" width="100%">
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between space-x-1"
            >
              <span>{item}</span>
              <Button
                size="1"
                variant="ghost"
                color="red"
                onClick={() => handleDeleteItem(index)}
              >
                <TrashIcon color="red" />
              </Button>
            </li>
          ))}
        </ul>
      </Flex>
      <Flex gap="1" justify="between">
        <TextField.Input
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={inputPlaceholder}
        />
        <Button onClick={handleAddItem}>Add</Button>
      </Flex>
    </Flex>
  );
};

export default ListManager;
