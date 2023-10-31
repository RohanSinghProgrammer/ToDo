"use client";

import React, { useState } from "react";

const AddTodo = () => {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.length < 1) return null; // check null values
    console.log(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Add your todo"
        className="py-2 px-3 focus:outline-none border-2 rounded-md"
      />
      <button className="px-4 py-2 bg-green-500 text-white rounded-md">ADD</button>
    </form>
  );
};

export default AddTodo;
