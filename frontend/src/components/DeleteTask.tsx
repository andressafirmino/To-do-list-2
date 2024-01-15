import { TasksContext } from '@/context/tasks';
import { useContext } from 'react';
import axios from 'axios';

export default function DeleteTask() {
  const { setDelTask, taskId } = useContext(TasksContext);

  function deleteTask() {
    axios
      .delete(`${process.env.NEXT_PUBLIC_DB_HOST}/tarefas/${taskId}`)
      .then(() => setDelTask(false))
      .catch((e) => (alert(e.response.data.message), setDelTask(false)));
  }

  return (
    <div className="w-screen h-screen bg-gray-400 fixed top-0 left-0 z-30 flex justify-center items-center bg-opacity-5">
      <div className="w-box h-64 min-w-box p-3 bg-white flex flex-col items-center justify-around rounded-md">
        <p className="text-2xl ">Deseja excluir a tarefa?</p>
        <div className="w-96 flex justify-around items-center">
          <button
            className="btn-update"
            onClick={() => {
              setDelTask(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="btn-update"
            onClick={() => {
              deleteTask();
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
