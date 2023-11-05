import React, { useState } from "react";
import { Button, TextField, Flex, Text, Box } from "@radix-ui/themes";
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
      <label style={items.length == 0 ? { marginBottom: -14 } : {}}>
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
      <Flex direction="row" gap="3" className="mr-5">
        <Box grow="1">
          <TextField.Input
            name={name}
            value={inputValue}
            // className="flex-grow"
            style={{ flex: 1 }}
            onChange={handleInputChange}
            placeholder={inputPlaceholder}
          />
        </Box>
        <Box width="6">
          <Button onClick={handleAddItem}>Add</Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ListManager;
