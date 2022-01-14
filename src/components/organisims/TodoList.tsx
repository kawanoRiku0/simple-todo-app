import { AddButton } from "components/molecules/AddButton";
import { Todo } from "components/molecules/Todo";
import { modalState } from "globalStates/TodoModal";
import { useTodos } from "hooks/useTodos";
import { FC, memo } from "react";
import { TodoType } from "types/todo";
import { useSnapshot } from "valtio";

type Props = {
  title: string;
};

// メモ化されていないコンポーネント
const TodoListWithoutMemo: FC<Props> = (props) => {
  const { handleEdit, handleDelete, handleAdd, todos } = useTodos();
  const modalStateHandler = useSnapshot(modalState);

  const handleClick = () => {
    modalStateHandler.handleOpen();
  };
  return (
    <>
      <div className="p-5">
        <h2 className={`text-4xl font-body font-bold text-orange-500`}>
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
        <AddButton handleClick={handleClick} />
      </div>
    </>
  );
};

// メモ化してエクスポート
export const TodoList = memo(TodoListWithoutMemo);
