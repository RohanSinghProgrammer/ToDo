export type todoType = {
    id: string;
    task: string;
    isCompleted: boolean;
    createdAt: Date;
  };

  export type todoDocumentType = {
    id?: string;
    task?: string;
    isCompleted?: boolean;
    createdAt?: Date;
  };
  
  export type todoContext = {
    todos: todoDocumentType[];
    addTodo: (task: string) => void;
    markAsCompleted: (id: string) => void;
    deleteTodo: (id: string) => void;
    setId: React.Dispatch<string>;
    id: string
  };