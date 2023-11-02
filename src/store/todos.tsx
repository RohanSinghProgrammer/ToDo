"use client";

import { todoContext, todoType } from "@/types/todoTypes";
import { doc, setDoc } from "firebase/firestore";
import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { db } from "../../firebase";

export const TodosContext = createContext<todoContext | null>(null);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = useState("") // state to store current user UID
  
  // ---------------------------- Functions related to firebase ----------------------------
  const addFirebaseTodo = async (todo: todoType) => {
    await setDoc(doc(db, id, todo.id), todo);
  };

  const updateFirebaseTodo = (uid: string) => {};

  const deleteFirebaseTodo = (uid: string) => {};

  // -------------------------- Functions related to manage state --------------------------
  const [todos, setTodos] = useState<Array<todoType>>([]);

  // add ToDo function
  const addTodo = (task: string) => {
    let todo: todoType = {
      id: Math.random().toString(),
      task,
      isCompleted: false,
      createdAt: new Date(),
    };
    addFirebaseTodo(todo);
    setTodos((prev) => [todo, ...prev]);
  };
  // mark as completed function
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
  // delete ToDo function
  const deleteTodo = (id: string) => {
    let filteredTodos = todos.filter((item) => item.id != id);
    setTodos(filteredTodos);
  };

  return (
    <TodosContext.Provider
      value={{ todos, addTodo, markAsCompleted, deleteTodo, setId }}
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
