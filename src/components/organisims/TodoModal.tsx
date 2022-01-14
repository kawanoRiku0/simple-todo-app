import { FC, memo } from "react";
import { Dialog } from "@headlessui/react";
import { useSnapshot } from "valtio";
import { modalState } from "globalStates/TodoModal";
import { newTodoState } from "globalStates/NewTodo";

const TodoModalWithoutMemo: FC = () => {
  const modalStateHandler = useSnapshot(modalState);
  const newTodoStateHandler = useSnapshot(newTodoState);

  return (
    <Dialog
      open={modalStateHandler.isOpen}
      onClose={() => {
        modalStateHandler.handleClose();
        newTodoState.handleDeleteTodo();
      }}
      className="w-11/12  sm:max-w-xl p-7 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md bg-white "
    >
      <Dialog.Overlay className="bg-gray-100 opacity-40 w-screen h-screen fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 " />

      <div className=" space-y-10">
        <Dialog.Title className="font-bold text-3xl">
          あたらしいTODOを作成
        </Dialog.Title>

        <input
          className="appearance-none bg-transparent border-none w-full h-full text-gray-700 py-4 px-2 leading-tight focus:outline-none bg-gray-100 rounded-lg focus:bg-gray-50 font font-body font-bold placeholder-gray-500"
          type="text"
          placeholder="やること"
          aria-label="body"
          value={newTodoStateHandler.todo}
          onChange={(e) => newTodoStateHandler.handleEditTodo(e.target.value)}
        />
        <div className=" flex sm:justify-between sm:flex-row sm:space-y-0 flex-col space-y-4">
          <button
            className=" bg-green-300 p-3 rounded-md text-2xl"
            onClick={modalStateHandler.handleClose}
          >
            あたらしく追加
          </button>
          <button
            className=" bg-red-300 p-3 rounded-md text-2xl"
            onClick={() => {
              modalStateHandler.handleClose();
              newTodoStateHandler.handleDeleteTodo();
            }}
          >
            やっぱやめた！
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export const TodoModal = memo(TodoModalWithoutMemo);
