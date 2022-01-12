import { useCallback, useState } from "react";
import { TodoType } from "types/todo";

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const handleEdit = useCallback(
    (id: number, value: string) => {
      // ディープコピー
      const deepCopy = todos.map((todo) => ({ ...todo }));

      // 変更があったtodoをidで検索、更新
      const newTodos = deepCopy.map((todo) => {
        if (todo.id === id) {
          todo.value = value;
        }
        return todo;
      });
      setTodos(newTodos);
    },
    [todos]
  );

  const handleDelete = useCallback(
    (id: number) => {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    },
    [todos]
  );

  const handleAdd = useCallback(() => {
    const newTodo = {
      value: "",
      id: new Date().getTime(),
    };

    const newTodos = [...todos, newTodo];

    setTodos(newTodos);
  }, [todos]);

  return { handleEdit, handleDelete, handleAdd, todos };
};
