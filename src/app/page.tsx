import AddTodo from "@/components/AddTodo";
import { FcTodoList } from "react-icons/fc";

export default function Home() {
  return (
    <main className="grid place-items-center p-12">
      <div className="w-80 flex flex-col space-y-4 items-center">
        <div className=" w-full flex items-center space-x-3">
          <FcTodoList className='text-2xl' />
          <h2 className="uppercase text-2xl font-semibold">
            Next.js ToDo App
          </h2>
          <FcTodoList className='text-2xl' />
        </div>
        <AddTodo />
      </div>
    </main>
  );
}
