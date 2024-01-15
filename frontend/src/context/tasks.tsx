import { TaskType } from '@/protocols';
import React, { ReactNode, createContext, useState } from 'react';

interface TasksContextProps {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  delTask: boolean;
  setDelTask: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: string;
  setTaskId: React.Dispatch<React.SetStateAction<string>>;
  updTask: boolean;
  setUpdTask: React.Dispatch<React.SetStateAction<boolean>>;
  taskName: string;
  setTaskName: React.Dispatch<React.SetStateAction<string>>;
  taskStatus: boolean | null;
  setTaskStatus: React.Dispatch<React.SetStateAction<boolean | null>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const TasksContext = createContext<TasksContextProps>({
  tasks: [],
  setTasks: () => {},
  delTask: false,
  setDelTask: () => {},
  taskId: '',
  setTaskId: () => {},
  updTask: false,
  setUpdTask: () => {},
  taskName: '',
  setTaskName: () => {},
  taskStatus: null,
  setTaskStatus: () => {},
  category: '',
  setCategory: () => {},
});

interface TasksProviderProps {
  children: ReactNode;
}

export default function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [delTask, setDelTask] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>('');
  const [updTask, setUpdTask] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>('');
  const [taskStatus, setTaskStatus] = useState<boolean | null>(null);
  const [category, setCategory] = useState<string>('all');

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        delTask,
        setDelTask,
        taskId,
        setTaskId,
        updTask,
        setUpdTask,
        taskName,
        setTaskName,
        taskStatus,
        setTaskStatus,
        category,
        setCategory,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
