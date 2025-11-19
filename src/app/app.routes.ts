import { Routes } from '@angular/router';

export const routes: Routes = [
  //   { path: '', redirectTo: 'task-list', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () =>
      import('./task-list/task-list.component').then(
        (m) => m.TaskListComponent
      ),
    pathMatch: 'full',
  },
];
