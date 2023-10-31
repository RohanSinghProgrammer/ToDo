"use client";

import { createContext, ReactNode, useState, useContext } from "react";

export type todoType = {
  id: string;
  task: string;
  isCompleted: boolean;
  createdAt: Date;
};

export type todoContext = {
  todos: todoType[];
  addTodo: (task: string) => void;
};

export const TodosContext = createContext<todoContext | null>(null);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Array<todoType>>([]);

  const addTodo = (task: string) => {
    let todo: todoType = {
      id: Math.floor(Math.random() * 99999999).toString(),
      task,
      isCompleted: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [todo, ...prev]);
    console.log(todos);
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

// custom hook to get data
export const useTodos = () => {
  const todos = useContext(TodosContext);
  if (!todos) throw new Error("hook called outside provider!");
  return todos;
};
