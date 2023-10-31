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
  markAsCompleted: (id: string) => void;
  deleteTodo: (id: string) => void;
};

export const TodosContext = createContext<todoContext | null>(null);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Array<todoType>>([]);

  const addTodo = (task: string) => {
    let todo: todoType = {
      id: Math.random().toString(),
      task,
      isCompleted: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [todo, ...prev]);
  };

  const markAsCompleted = (id: string) => {
    setTodos((prev) => {
      return prev.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      });
    });
  };
  
  const deleteTodo = (id: string) => {
    let filteredTodos = todos.filter((item) => item.id != id);
    setTodos(filteredTodos);
  };

  return (
    <TodosContext.Provider
      value={{ todos, addTodo, markAsCompleted, deleteTodo }}
    >
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
