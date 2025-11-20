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
  tasks: (Tasks & { remaining: string })[] = [];
  locked = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  markAsCompleted(id: number) {
    this.taskService.markAsCompleted(id);
  }

  changePriority(task: Tasks) {
    this.taskService.switchPriority(task);
  }
}
