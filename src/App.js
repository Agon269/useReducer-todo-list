import { Box, Heading } from "@chakra-ui/react";
import { VStack, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import TododList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import React, { useEffect, useReducer } from "react";

export const ACTIONS = {
  addToDo: "ADDTODO",
  deleteTodo: "DELETETODO",
};

//reducer function
const reducer = (todos, action) => {
  switch (action.type) {
    case ACTIONS.addToDo:
      return [...todos, action.payload];
    case ACTIONS.deleteTodo:
      const tr = todos.filter((todo) => action.payload !== todo.id);
      return tr;
    default:
      return todos;
  }
};
function App() {
  //rewrite the stae
  //pass the dispatch function for todo list and add todo
  const [todos, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const deleteTodo = (id) => {
    dispatch({ type: ACTIONS.deleteTodo, payload: id });
  };
  const addTodos = (newTodo) => {
    dispatch({ type: ACTIONS.addToDo, payload: newTodo });
  };
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <VStack p={4}>
      <IconButton
        icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
        size="lg"
        alignSelf="flex-end"
        onClick={toggleColorMode}
      />
      <Box p={8}>
        <Heading fontWeight="extrabold" size="2xl">
          App
        </Heading>
      </Box>
      <TododList todos={todos} deleteTodo={deleteTodo} />
      <AddTodo addTodos={addTodos} />
    </VStack>
  );
}

export default App;
