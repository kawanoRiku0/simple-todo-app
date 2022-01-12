import { Category } from "types/category";
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

const handleAddCategory = (value: Category) => {
  newTodoState.category = value;
};

const handleDeleteCategory = () => {
  newTodoState.category = "";
};

export const newTodoState = proxy({
  todo: "",
  category: "",
  handleEditTodo,
  handleDeleteTodo,
  handleAddTodo,
  handleAddCategory,
  handleDeleteCategory,
});
