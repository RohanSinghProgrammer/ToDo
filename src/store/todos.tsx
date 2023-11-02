"use client";

import { todoContext, todoDocumentType, todoType } from "@/types/todoTypes";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { usePathname } from "next/navigation";
import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { db } from "../../firebase";

export const TodosContext = createContext<todoContext | null>(null);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [id, setId] = useState(""); // state to store current user UID

  // --------------------------------- Firebase functions ---------------------------------
  const getDataFromFirebase = async () => {
    const postsCollection = collection(db, id);
    const postsSnapshot = await getDocs(postsCollection);
    const posts: todoDocumentType[] = [];
    postsSnapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    return posts;
  };

  const addFirebaseTodo = async (todo: todoType) => {
    await setDoc(doc(db, id, todo.id), todo);
  };

  const updateFirebaseTodo = async (uid: string) => {
    const docRef = doc(db, id, uid);
    const docSnap = await getDoc(docRef);
    docSnap.data()?.isCompleted;
    const updateDocRef = doc(db, id, uid);
    // have to get the doc and then set the isCompleted status revert
    await updateDoc(updateDocRef, {
      isCompleted: !docSnap.data()?.isCompleted,
    });
  };

  const deleteFirebaseTodo = async (uid: string) => {
    await deleteDoc(doc(db, id, uid));
  };

  // -------------------------- Functions related to manage state --------------------------
  const [todos, setTodos] = useState<Array<todoDocumentType>>([]);

  // GET initial data
  useEffect(() => {
    if (pathname.length == 1) {
      getDataFromFirebase().then((data) => setTodos(data));
    }
  }, [pathname]);

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
    updateFirebaseTodo(id);
  };
  // delete ToDo function
  const deleteTodo = (id: string) => {
    let filteredTodos = todos.filter((item) => item.id != id);
    setTodos(filteredTodos);
    deleteFirebaseTodo(id);
  };

  return (
    <TodosContext.Provider
      value={{ todos, addTodo, markAsCompleted, deleteTodo, setId, id }}
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
