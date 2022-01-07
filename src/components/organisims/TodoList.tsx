import { AddButton } from "components/molecules/AddButton";
import { Todo } from "components/molecules/Todo";
import { FC, memo, useCallback, useState } from "react";
import { TodoType } from "types/todo";

type Props = {
  title: string;
  color: string;
};

// メモ化されていないコンポーネント
const TodoListWithoutMemo: FC<Props> = (props) => {
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
    <div className="p-5">
      <h2 className={`text-4xl font-body font-bold text-${props.color}-500`}>
        {props.title}
      </h2>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          value={todo.value}
          id={todo.id}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
      <AddButton handleAdd={handleAdd} />
    </div>
  );
};

// メモ化してエクスポート
export const TodoList = memo(TodoListWithoutMemo);
