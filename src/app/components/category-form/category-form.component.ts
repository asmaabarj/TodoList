import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  categoryName: string = ''; 
  @Input() categoryToUpdate: Category | null = null; 
  @Output() categorySaved = new EventEmitter<Category>();
  errorMessage: string = '';

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    if (this.categoryToUpdate) {
      this.categoryName = this.categoryToUpdate.name || '';
    }
  }


  onSubmit() {
    if (this.categoryName) {
      try {
        let updatedCategory: Category;
        if (this.categoryToUpdate) {
          updatedCategory = { ...this.categoryToUpdate, name: this.categoryName };
          this.categoryService.updateCategory(this.categoryToUpdate, this.categoryName);
        } else {
          updatedCategory = { name: this.categoryName };
          this.categoryService.addCategory(updatedCategory);
        }
        this.categorySaved.emit(updatedCategory);

      } catch (error: any) {
        this.errorMessage = error.message;
      }
    }
  }
}
