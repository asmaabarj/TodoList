import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.model';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [];
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private taskService: TaskService) {}

  addCategory(category: Category): void {
    if (this.categories.some(c => c.name.toLowerCase() === category.name.toLowerCase())) {
      throw new Error('Une catégorie avec ce nom existe déjà');
    }
    this.categories.push(category);
    this.categoriesSubject.next([...this.categories]);
  }

  deleteCategory(category: Category): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ? Toutes les tâches associées seront également supprimées.')) {
      this.categories = this.categories.filter(c => c.name !== category.name);
      this.categoriesSubject.next([...this.categories]);
      this.taskService.deleteTasksByCategory(category.name);
    }
  }

  updateCategory(categoryToUpdate: Category, newCategoryName: string) {
    const currentCategories = this.categoriesSubject.value;
    const categoryExists = currentCategories.some(
      (cat: Category) => cat.name.toLowerCase() === newCategoryName.toLowerCase() && cat.name !== categoryToUpdate.name
    );

    if (categoryExists) {
      throw new Error('Une catégorie avec ce nom existe déjà');
    }

    const categoryIndex = currentCategories.findIndex((cat: Category) => cat.name === categoryToUpdate.name);

    if (categoryIndex !== -1) {
      currentCategories[categoryIndex] = { name: newCategoryName };
      this.categoriesSubject.next([...currentCategories]);
    }
  }
}
