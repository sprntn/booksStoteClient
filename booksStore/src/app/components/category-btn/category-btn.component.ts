import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-btn',
  standalone: true,
  imports: [],
  templateUrl: './category-btn.component.html',
  styleUrl: './category-btn.component.scss'
})
export class CategoryBtnComponent {
  @Input() CategoryId!: number;
  @Input() CategoryName!: string;
  
  @Output() CategorySelected: EventEmitter<number> = new EventEmitter();

  constructor(){}

  onCategorySelected(): void{
    this.CategorySelected.emit(this.CategoryId);
  }
}
