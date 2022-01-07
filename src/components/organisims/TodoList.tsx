import { AddButton } from "components/molecules/AddButton";
import { Todo } from "components/molecules/Todo";
import { useTodo } from "hooks/useTodo";
import { FC, memo } from "react";

type Props = {
  title: string;
  color: string;
};

// メモ化されていないコンポーネント
const TodoListWithoutMemo: FC<Props> = (props) => {
  const { handleEdit, handleDelete, handleAdd, todos } = useTodo();
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
