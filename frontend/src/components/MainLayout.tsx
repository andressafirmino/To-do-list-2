import TasksProvider from '@/context/tasks';
import Menu from './Menu';

export default function MainLayout({ children }: any) {
  return (
    <TasksProvider>
      <div className="h-screen flex items-center  flex-col bg-bg-color">
        <Menu />
        {children}
      </div>
    </TasksProvider>
  );
}
