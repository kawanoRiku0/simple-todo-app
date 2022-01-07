import { FC, memo } from "react";

// メモ化されていないコンポーネント
const HeaderWithoutMemo: FC = () => {
  return (
    <div className="h-20 relative w-full py-5 bg-white drop-shadow-md text-center">
      <h1 className=" text-3xl text-bold ">zubora todo</h1>
      <div className=" absolute right-7 h-12 w-12 -translate-y-1/2 top-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full  text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
};

// メモ化してエクスポート
export const Header = memo(HeaderWithoutMemo);
