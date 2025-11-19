import { Component } from '@angular/core';
import { Tasks } from '../Interfaces/tasks';
import { TaskService } from '../Services/task/task.service';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe, NgClass, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  tasks: Tasks[] = [];
  locked = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  markAsCompleted(id: number) {
    this.taskService.markAsCompleted(id);
  }

  changePriority(task: Tasks) {
    this.taskService.switchPriority(task);
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
}
