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

  return (
    <div className="w-full">
      {filterTodos.map((item) => (
        <div key={item.id} className="w-full flex items-center p-2 h-14 border-b hover:bg-red-100">
          <input
            type="checkbox"
            id={`todo-${item.id}`}
            checked={item.isCompleted}
            onChange={() => markAsCompleted(item.id)}
            className="bg-red-500"
          />
          <label htmlFor={`todo-${item.id}`} className="flex-1 px-4">
            {item.task}
          </label>
          {item.isCompleted && (
            <button onClick={() => deleteTodo(item.id)} className="px-4 py-2 bg-red-500 text-white rounded-md">DELETE</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Todos;
