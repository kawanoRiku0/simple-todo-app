import { FC, memo, ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

type Props = {
  children: ReactNode;
};

// メモ化されていないコンポーネント
const DefaultLayoutWithoutMemo: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

// メモ化してエクスポート
export const DefaultLayout = memo(DefaultLayoutWithoutMemo);
