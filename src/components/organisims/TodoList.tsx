import { AddButton } from "components/molecules/AddButton";
import { Todo } from "components/molecules/Todo";
import { FC, memo, useCallback, useState } from "react";
import { TodoType } from "types/todo";

// テスト用
// const todolist = [
//   {
//     value: "朝ごはん食べる",
//     id: 1,
//   },
//   {
//     value: "昼ごはん食べる",
//     id: 2,
//   },
//   {
//     value: "夜ごはん食べる",
//     id: 3,
//   },
// ];

// メモ化されていないコンポーネント
const TodoListWithoutMemo: FC = () => {
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

  return (
    <div>
      <div>
        <h2 className="text-lg font-body font-bold">今日やること</h2>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            value={todo.value}
            id={todo.id}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <AddButton handleAdd={handleAdd} />
    </div>
  );
};

// メモ化してエクスポート
export const TodoList = memo(TodoListWithoutMemo);
