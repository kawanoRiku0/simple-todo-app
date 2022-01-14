import { TodoList } from "components/organisims/TodoList";
import { TodoModal } from "components/organisims/TodoModal";
import { DefaultLayout } from "layouts/DefaultLayout";
import { NextPage } from "next";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return await res.json();
};

const Home: NextPage = () => {
  const URL =
    "http://localhost:5001/simple-todo-76227/asia-northeast2/api/todos";
  const { data, error } = useSWR(URL, fetcher);

  if (!data) return <div>loading</div>;
  if (error) return <div>{error}</div>;

  return (
    <DefaultLayout>
      <div className="pt-14 space-y-14 max-w-lg mx-auto flex flex-col  pb-28">
        <TodoList title="やった方がいいこと" todos={data.todos} />
      </div>
      <TodoModal />
    </DefaultLayout>
  );
};

export default Home;
