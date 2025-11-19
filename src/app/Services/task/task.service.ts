import { Injectable } from '@angular/core';
import { Tasks } from '../../Interfaces/tasks';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private task: Tasks[] = [];

  constructor() {
    this.task = [
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

  getTasks(): Observable<Tasks[]> {
    return of(this.task);
  }

  addTask(task: Tasks) {
    task.id = this.task.length + 1;
    this.task.push(task);
  }

  deleteTask(task: Tasks) {
    this.task = this.task.filter((t) => t.id !== task.id);
  }

  markAsCompleted(id: number) {
    const task = this.task.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }

  switchPriority(task: Tasks) {
    let taskToChange = this.task.find((t) => t.id === task.id);

    const PRIORITIES: Array<Tasks['priority']> = ['low', 'medium', 'high'];
    const currentPriority = PRIORITIES.indexOf(task.priority);
    const nextPriority = (currentPriority + 1) % PRIORITIES.length;

    taskToChange!.priority = PRIORITIES[nextPriority];
  }
}
