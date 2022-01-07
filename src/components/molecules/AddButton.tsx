import { FC, memo } from "react";

type Props = {
  handleAdd: () => void;
};

// メモ化されていないコンポーネント
const AddButtonWithoutMemo: FC<Props> = (props) => {
  return (
    <div
      className="relative h-14 hover:bg-gray-300 transition"
      onClick={props.handleAdd}
    >
      <input
        className="appearance-none bg-transparent border-none w-full h-full text-gray-700 ml-10 py-2 px-2 leading-tight focus:outline-none focus:bg-gray-150 font font-body font-bold"
        type="text"
        disabled
        placeholder="新しく追加"
        aria-label="body"
      />
      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 hover:text-teal-800"
        type="button"
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
};

// メモ化してエクスポート
export const AddButton = memo(AddButtonWithoutMemo);
