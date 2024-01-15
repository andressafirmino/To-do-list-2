import { TasksContext } from '@/context/tasks';
import { useContext } from 'react';

export default function Categories() {
  const { category, setCategory } = useContext(TasksContext);
  return (
    <div
      className="w-max-width h-12 bg-sec-color rounded-md
        flex justify-around items-center shadow-md fixed top-36 z-10 m-auto"
    >
      <div className={`btn-category ${category === 'all' ? 'bg-selected-btn' : ''}`} onClick={() => setCategory('all')}>
        Todas
      </div>
      <div
        className={`btn-category ${category === 'pending' ? 'bg-selected-btn' : ''}`}
        onClick={() => setCategory('pending')}
      >
        Pendentes
      </div>
      <div
        className={`btn-category ${category === 'completed' ? 'bg-selected-btn' : ''}`}
        onClick={() => setCategory('completed')}
      >
        Concluídas
      </div>
    </div>
  );
}
