import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { HStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { nanoid } from "nanoid";
import React, { useState } from "react";

function AddTodo({ addTodos }) {
  const [body, setBody] = useState("");
  const toast = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    if (!body) {
      toast({
        title: "No content",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const todo = {
      id: nanoid(),
      body,
    };
    addTodos(todo);
    setBody("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt="8">
        <Input
          onChange={(e) => setBody(e.target.value)}
          value={body}
          variant="filled"
          placeholder="learning chackra"
        />
        <Button colorScheme="teal" px="8" type="submit">
          Add to do
        </Button>
      </HStack>
    </form>
  );
}

export default AddTodo;
