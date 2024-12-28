import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { NgModule } from '@angular/core';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent  },
    { path: 'tasks', component: TasksListComponent },
    { path: 'categories', component: CategoriesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule], 
})
export class AppRoutingModule {}