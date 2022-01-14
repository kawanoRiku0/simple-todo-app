import { TodoList } from "components/organisims/TodoList";
import { TodoModal } from "components/organisims/TodoModal";
import { DefaultLayout } from "layouts/DefaultLayout";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <div className="pt-14 space-y-14 max-w-lg mx-auto flex flex-col  pb-28">
        <TodoList title="やった方がいいこと" />
      </div>
      <TodoModal />
    </DefaultLayout>
  );
};

export default Home;
