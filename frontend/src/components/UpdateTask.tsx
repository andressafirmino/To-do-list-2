import { TasksContext } from '@/context/tasks';
import { useContext } from 'react';
import axios from 'axios';

export default function UpdateTask() {
  const { setUpdTask, taskId, taskName, setTaskName, taskStatus, setTaskStatus } = useContext(TasksContext);

  function updateTask() {
    const body = {
      name: taskName,
      isFinished: taskStatus,
    };
    axios
      .put(`${process.env.NEXT_PUBLIC_DB_HOST}/tarefas/${taskId}`, body)
      .then(() => setUpdTask(false))
      .catch((e) => alert(e.response.data.message));
  }

  return (
    <div className="w-screen h-screen bg-gray-400 fixed top-0 left-0 z-30 flex justify-center items-center bg-opacity-30">
      <div className="w-box-upd h-64 p-3 bg-white flex flex-col items-center justify-around rounded-md">
        <p className="text-2xl ">Deseja editar tarefa?</p>
        <div className="flex items-center">
          <input
            className="w-w-box h-10 border-2 border-gray-400 rounded-md text-lg text-gray-500 outline-none p-2 
                    border-custom-gray box-border m-1 shadow-md focus:border-2"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button
            className={`btn-completed ${taskStatus ? 'bg-green-600' : 'bg-gray-600'}`}
            onClick={() => {
              {
                taskStatus ? setTaskStatus(false) : setTaskStatus(true);
              }
            }}
          >
            {taskStatus ? 'Concluída' : 'Pendente'}
          </button>
        </div>
        <div className="w-96 flex justify-around items-center">
          <button
            className="btn-update"
            onClick={() => {
              setUpdTask(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="btn-update"
            onClick={() => {
              updateTask();
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
