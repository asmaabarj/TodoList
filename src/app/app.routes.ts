import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';

export const routes: Routes = [
    { path: 'categories', component: CategoriesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule], 
})
export class AppRoutingModule {}