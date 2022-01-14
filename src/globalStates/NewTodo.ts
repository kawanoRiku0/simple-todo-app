import { proxy } from "valtio";

const handleEditTodo = (value: string) => {
  newTodoState.todo = value;
};

const handleDeleteTodo = () => {
  newTodoState.todo = "";
};
const handleAddTodo = () => {
  //firebaseに追加処理
};

export const newTodoState = proxy({
  todo: "",
  handleEditTodo,
  handleDeleteTodo,
  handleAddTodo,
});
