import { AddButton } from "components/molecules/AddButton";
import { Todo } from "components/molecules/Todo";
import { newTodoState } from "globalStates/NewTodo";
import { modalState } from "globalStates/TodoModal";
import { useTodos } from "hooks/useTodos";
import { FC, memo } from "react";
import { Category } from "types/category";
import { useSnapshot } from "valtio";

type Props = {
  category: Category;
  color: string;
};

// メモ化されていないコンポーネント
const TodoListWithoutMemo: FC<Props> = (props) => {
  let title = "";

  switch (props.category) {
    case "today":
      title = "今日やること";
      break;
    case "tommorow":
      title = "明日やること";
      break;
    case "someday":
      title = "今度やること";
      break;
    default:
      title = "今度やること";
      break;
  }

  const { handleEdit, handleDelete, handleAdd, todos } = useTodos();
  const modalStateHandler = useSnapshot(modalState);
  const newTodoStateHandler = useSnapshot(newTodoState);

  const handleClick = () => {
    modalStateHandler.handleOpen();
    newTodoStateHandler.handleAddCategory(props.category);
  };
  return (
    <>
      <div className="p-5">
        <h2 className={`text-4xl font-body font-bold text-${props.color}-500`}>
          {title}
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
