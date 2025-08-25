export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

export interface TaskManagerState {
  tasks: Task[];
  filter: 'all' | 'completed' | 'todo';
}