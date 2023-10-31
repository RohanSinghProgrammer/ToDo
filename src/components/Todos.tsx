"use client";

import { useTodos } from "@/store/todos";
import React, { useEffect } from "react";

type Params = {
  tab: string | null;
};

const Todos = ({ tab }: Params) => {
  const { todos, markAsCompleted, deleteTodo } = useTodos();

  let filterTodos = todos;
  if (tab === "active") {
    filterTodos = todos.filter((item) => !item.isCompleted);
  } else if (tab === "completed") {
    filterTodos = todos.filter((item) => item.isCompleted);
  }

  const done = "line-through text-red-600 flex-1 px-4";
  const notDone = "text-gray-900 flex-1 px-4";

  return (
    <div className="w-full">
      {filterTodos.map((item) => (
        <div
          key={item.id}
          className="w-full flex items-center p-2 h-14 border-b hover:bg-red-50"
        >
          <input
            type="checkbox"
            id={`todo-${item.id}`}
            checked={item.isCompleted}
            onChange={() => markAsCompleted(item.id)}
            className="accent-red-500"
          />
          <label
            htmlFor={`todo-${item.id}`}
            className={item.isCompleted ? done : notDone}
          >
            {item.task}
          </label>
          {item.isCompleted && (
            <button
              onClick={() => deleteTodo(item.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              DELETE
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Todos;
