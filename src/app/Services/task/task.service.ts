import { Injectable } from '@angular/core';
import { Tasks } from '../../Interfaces/tasks';
import { interval, map, Observable, of, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Tasks[] = [];

  constructor() {
    this.tasks = [
      {
        id: 1,
        title: 'Aprender Angular',
        description: 'Ver cursos de angular y aprender el mejor framework',
        dueDate: new Date(2025, 10, 19, 9, 0, 0),
        priority: 'high',
        completed: false,
      },
      {
        id: 2,
        title: 'Aprender React',
        description: 'Aprender React y aprender el segundo mejor framework',
        dueDate: new Date(2025, 10, 24, 16, 0, 0),
        priority: 'medium',
        completed: false,
      },
      {
        id: 3,
        title: 'Aprender Unity',
        description: 'Aprender Unity para desarrollar videojuegos',
        priority: 'low',
        dueDate: new Date(2025, 11, 1, 14, 0, 0),
        completed: false,
      },
    ];
  }

  getTasks(): Observable<(Tasks & { remaining: string })[]> {
    return interval(1000).pipe(
      startWith(0),
      map(() =>
        this.tasks.map((task) => ({
          ...task,
          remaining: this.getRemainingTime(task.dueDate!),
        }))
      )
    );
  }

  getRemainingTime(date: Date): string {
    const diff = date.getTime() - Date.now();

    if (diff <= 0) return 'expired';

    const minutes = Math.floor(diff / 60000) % 60;
    const hours = Math.floor(diff / 3600000) % 24;
    const days = Math.floor(diff / 86400000);
    const seconds = Math.floor(diff / 1000) % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  addTask(task: Tasks) {
    task.id = this.tasks.length + 1;
    this.tasks.push(task);
  }

  deleteTask(task: Tasks) {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }

  markAsCompleted(id: number) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }

  switchPriority(task: Tasks) {
    let taskToChange = this.tasks.find((t) => t.id === task.id);

    const PRIORITIES: Array<Tasks['priority']> = ['low', 'medium', 'high'];
    const currentPriority = PRIORITIES.indexOf(task.priority);
    const nextPriority = (currentPriority + 1) % PRIORITIES.length;

    taskToChange!.priority = PRIORITIES[nextPriority];
  }
}
