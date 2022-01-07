import { FC, memo } from "react";

// メモ化されていないコンポーネント
const FooterWithoutMemo: FC = () => {
  return (
    <div className="bg-gray-200 fixed bottom-0 w-full text-center py-2">
      <p>&copy; zubora-todo by oira</p>
    </div>
  );
};

// メモ化してエクスポート
export const Footer = memo(FooterWithoutMemo);
