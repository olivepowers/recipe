import React, { useState } from "react";
import { Button, TextField, Flex, Text } from "@radix-ui/themes";

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
        <Text as="div" size="2" mb="1" weight="bold">
          {name}
        </Text>
      </label>
      <TextField.Input
        name={name}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={inputPlaceholder}
      />
      <Button onClick={handleAddItem}>Add</Button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <Button onClick={() => handleDeleteItem(index)}>Delete</Button>
          </li>
        ))}
      </ul>
    </Flex>
  );
};

export default ListManager;
