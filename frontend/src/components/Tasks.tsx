import { useContext, useState } from 'react';
import Task from './Task';
import { IoMdAddCircle } from 'react-icons/io';
import { VscSend } from 'react-icons/vsc';
import { TasksContext } from '@/context/tasks';
import axios from 'axios';

export default function Tasks() {
  const { tasks } = useContext(TasksContext);
  const [add, setAdd] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [disabled, setDisabled] = useState(true);

  function addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const body = {
      name: newTask,
      isFinished: false,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_DB_HOST}/tarefas`, body)
      .then(() => {
        setNewTask(''), setDisabled(true);
      })
      .catch((e) => alert(e.response.data.message));
  }
  function validateTask(value: string) {
    if (value.trim().length >= 3) {
      setNewTask(value);
      setDisabled(false);
    } else {
      setNewTask(value);
      setDisabled(true);
    }
  }
  return (
    <div
      className="w-max-width h-auto px-4 pt-16 bg-tasks-color rounded-md
        flex flex-col justify-around items-center shadow-md mx-auto mt-52 relative"
    >
      <IoMdAddCircle
        className="w-12 h-12 text-blue-900 absolute top-2 right-2"
        onClick={() => {
          add ? setAdd(false) : setAdd(true);
        }}
      />
      {add && (
        <form className="w-full relative" onSubmit={addTask}>
          <input
            className="w-full h-10 p-3 mb-1 flex items-center rounded-md text-base font-normal border-none cursor-pointer 
            focus:outline-none placeholder-gray-500 placeholder-italic shadow-md bg-white "
            placeholder="Escreva a nova tarefa"
            type="text"
            value={newTask}
            onChange={(e) => {
              validateTask(e.target.value);
            }}
          />
          <button disabled={disabled}>
            <VscSend className={`absolute top-3 right-2 ${disabled ? 'opacity-0' : ''}`} />
          </button>
        </form>
      )}
      {tasks.map((task, i) => (
        <Task key={i} {...task} />
      ))}
    </div>
  );
}
