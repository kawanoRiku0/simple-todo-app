import { FC, memo } from "react";
import { TodoType } from "types/todo";

type Props = TodoType & {
  handleEdit: (id: number, value: string) => void;
  handleDelete: (id: number) => void;
};

// メモ化されていないコンポーネント
const TodoWithoutMemo: FC<Props> = (props) => {
  return (
    <div className="relative h-14 max-w-lg">
      <input
        className="appearance-none bg-transparent border-none w-full h-full text-gray-700 py-2 px-2 leading-tight focus:outline-none focus:bg-gray-50 font font-body font-bold"
        type="text"
        placeholder="やるべきこと"
        aria-label="body"
        value={props.value}
        onChange={(e) => props.handleEdit(props.id, e.target.value)}
      />
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-500 hover:text-teal-800"
        type="button"
        onClick={() => props.handleDelete(props.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};

// メモ化してエクスポート
export const Todo = memo(TodoWithoutMemo);
