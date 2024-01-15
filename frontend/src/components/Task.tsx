import { TaskType } from '@/protocols';
import { FaPen } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import { TiDelete } from 'react-icons/ti';
import { useContext } from 'react';
import DeleteTask from './DeleteTask';
import { TasksContext } from '@/context/tasks';
import UpdateTask from './UpdateTask';
import axios from 'axios';

export default function Task({ id, name, isFinished }: TaskType) {
  const { delTask, setDelTask, setTaskId, updTask, setUpdTask, setTaskName, setTaskStatus, category } =
    useContext(TasksContext);

  function updateStatusTask() {
    const body = {
      name,
      isFinished: !isFinished,
    };
    axios
      .put(`${process.env.NEXT_PUBLIC_DB_HOST}/tarefas/${id}`, body)
      .then(() => setUpdTask(false))
      .catch((e) => (alert(e.response.data.message), setUpdTask(false)));
  }
  return (
    <>
      {delTask && <DeleteTask />}
      {updTask && <UpdateTask />}
      {(category === 'all' || (category === 'completed' && isFinished) || (category === 'pending' && !isFinished)) && (
        <div
          className={`w-full h-full p-1 mb-2 bg-white flex items-center justify-between rounded-md ${isFinished ? 'completed' : ''}`}
        >
          <div className="w-full h-10 p-1 flex items-center">{name}</div>
          <div className="w-24 flex items-center justify-between">
            <FaPen
              className="w-4 h-5 text-gray-500"
              onClick={() => {
                setTaskId(id), setTaskName(name), setTaskStatus(isFinished), setUpdTask(true);
              }}
            />
            <FaCircleCheck
              className={`w-4 h-6 ${isFinished ? 'text-green-600' : 'text-gray-600'}`}
              onClick={() => updateStatusTask()}
            />
            <TiDelete
              className="w-6 h-6 text-red-600"
              onClick={() => {
                setTaskId(id), setDelTask(true);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
