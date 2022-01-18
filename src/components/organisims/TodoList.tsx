import { AddButton } from "components/molecules/AddButton";
import { Todo } from "components/molecules/Todo";
import { modalState } from "globalStates/TodoModal";
import { FC, memo } from "react";
import { TodoType } from "types/todo";
import { useSnapshot } from "valtio";

type Props = {
  todos?: TodoType[];
  title: string;
};

// メモ化されていないコンポーネント
const TodoListWithoutMemo: FC<Props> = (props) => {
  const modalStateHandler = useSnapshot(modalState);

  const handleDelete = async (id: string) => {
    const URL = `http://localhost:5001/simple-todo-76227/asia-northeast2/api/todos/${id}`;
    const res = await fetch(URL, {
      method: "DELETE",
      mode: "cors",
    });

    const message = await res.json();

    if (message.error) {
      alert(message.error);
    } else {
      console.log(message.message);
    }
  };

  const handleClick = () => {
    modalStateHandler.handleOpen();
  };
  return (
    <>
      <div className="p-5">
        <h2 className={`text-4xl font-body font-bold text-orange-500`}>
          {props.title}
        </h2>
        {props.todos?.map((todo) => (
          <Todo
            key={todo.id}
            value={todo.value}
            id={todo.id}
            handleEdit={() => {}}
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
