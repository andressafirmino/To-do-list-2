export type TaskType = {
  id: string;
  name: string;
  isFinished: boolean;
};

export type TaskInputType = Omit<TaskType, 'id'>;
