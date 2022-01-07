import { TodoList } from "components/organisims/TodoList";
import { DefaultLayout } from "layouts/DefaultLayout";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <div className="pt-14 space-y-14 max-w-lg mx-auto flex flex-col  pb-28">
        <TodoList title="今日やること" color="orange" />
        <TodoList title="明日やること" color="red" />
        <TodoList title="今度やること" color="blue" />
      </div>
    </DefaultLayout>
  );
};

export default Home;
