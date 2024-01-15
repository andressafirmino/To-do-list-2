import Categories from '@/components/Categories';
import Tasks from '@/components/Tasks';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { TasksContext } from '@/context/tasks';

export default function TasksPage() {
  const { tasks, setTasks } = useContext(TasksContext);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_DB_HOST}/tarefas`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }, [tasks]);

  return (
    <>
      <Categories />
      <Tasks />
    </>
  );
}
