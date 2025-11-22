export interface Tasks {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
}

export type TaskPriority = Tasks['priority'];

export type NewTask = Omit<Tasks, 'id' | 'completed'>;
