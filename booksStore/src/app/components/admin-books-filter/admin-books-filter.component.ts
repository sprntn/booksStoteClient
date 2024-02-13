import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Author } from '../../models/author';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../services/books.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-admin-books-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-books-filter.component.html',
  styleUrl: './admin-books-filter.component.scss'
})
export class AdminBooksFilterComponent implements OnInit{

  public filterForm! : FormGroup;
  public searchPlaceholder = "Enter book's title or author"
  authors$!: Observable<Author[]>;
  categories$!: Observable<Category[]>;

  constructor(private booksService: BooksService){}
  
  ngOnInit(): void {
    this.authors$ = this.booksService.getAuthors();
    this.categories$ = this.booksService.getCategories();
    this.initializeFilterForm();
  }

  initializeFilterForm() {
    this.filterForm = new FormGroup({});
  }
}