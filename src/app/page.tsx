"use client"

import AddTodo from "@/components/AddTodo";
import Navbar from "@/components/Navbar";
import Todos from "@/components/Todos";
import { useSearchParams } from "next/navigation";
import { FcTodoList } from "react-icons/fc";

export default function Home() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('todos')
  return (
    <main className="grid place-items-center p-6 md:p-12">
      <div className="w-full md:w-80 flex flex-col space-y-4 items-center">
        <div className=" w-full flex items-center space-x-3 justify-between">
          <FcTodoList className="text-2xl" />
          <h2 className="uppercase text-2xl font-semibold">Next.js ToDo App</h2>
          <FcTodoList className="text-2xl" />
        </div>
        <Navbar tab={activeTab} />
        <AddTodo />
        <Todos tab={activeTab} />
      </div>
    </main>
  );
}
