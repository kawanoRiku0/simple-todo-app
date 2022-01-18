import { useSWRConfig } from "swr";
import { proxy } from "valtio";

const handleEditTodo = (value: string) => {
  newTodoState.todo = value;
};

const handleDeleteTodo = () => {
  newTodoState.todo = "";
};
const handleAddTodo = async () => {
  const URL =
    "http://localhost:5001/simple-todo-76227/asia-northeast2/api/todos";

  try {
    if (!newTodoState.todo) {
      alert("中身が空です");
      return;
    }
    const res = await fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: newTodoState.todo }),
    });

    const message = await res.json();

    if (message.error) {
      throw message.error;
    } else {
      console.log(message.message);
    }
  } catch (e) {
    alert(e);
  }
};

export const newTodoState = proxy({
  todo: "",
  handleEditTodo,
  handleDeleteTodo,
  handleAddTodo,
});
