import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminBooksFilterComponent } from "../admin-books-filter/admin-books-filter.component";
import { Book } from '../../models/book';
//import { Observable } from 'rxjs';
import { Author } from '../../models/author';
import { Category } from '../../models/category';
import { Country } from '../../models/country';
import { BooksService } from '../../services/books.service';
import { AdminService } from '../../services/admin.service';
import { BookSearchParameters } from '../../interfaces/book-search-parameters';
import { AdminBookCardComponent } from "../admin-book-card/admin-book-card.component";

@Component({
    selector: 'app-admin-page',
    standalone: true,
    templateUrl: './admin-page.component.html',
    styleUrl: './admin-page.component.scss',
    imports: [ReactiveFormsModule, AdminBooksFilterComponent, AdminBookCardComponent]
})
export class AdminPageComponent implements OnInit{

  //static booksCounter: number = 0;
  savedBooks: Book[] = [];
  books: Book[] = [];
  googleBooks: Book[] = [];

  isBooksFilterOpen: boolean = false;

  countries: Country[] = [];
  googleBooksCategories: Category[] = [];
  googleBooksAuthors: Author[] = [];
  categorires: Category[] = [];
  //authors: Author[] = []; 
  
  constructor(private booksService: BooksService, private adminService: AdminService){}
 
  ngOnInit(): void {
    this.adminService.getFilterData().subscribe(data => {
      console.log(data);
      this.googleBooksCategories = data.categories;
      this.googleBooksAuthors = data.authors;
    });
    this.booksService.getCategories().subscribe(categorires => this.categorires = categorires);
  }

  //get books, then for each book add author, category, country to their array if not exist already
  handleSearch(parameters: BookSearchParameters) {
    console.log(parameters);
    this.adminService.fetchBooks(parameters).subscribe(books => {
      console.log(books);
      this.googleBooks = books;
    });
    
    //const { searchKey, categoryId, countryId, authorId } = parameters;
    //const { searchKey, categoryId, authorId } = parameters;
    //console.log(searchKey, categoryId, authorId);
    //console.log(parameters);
    //find category in categories array
    //const foundCategory = categories.find(category => category.name === categoryToFind);
    //if (foundCategory){console.log(`Category '${categoryToFind}' found with id: ${foundCategory.id}`);}
  }

  addBook(book: Book){
    console.log(`book received: ${JSON.stringify(book)}`);
    this.savedBooks.push(book);
    //add book from list to savedBooks array, play as event from book card component
  }

  uploadBooks() {
    console.log(this.savedBooks);
    this.booksService.uploadBooks(this.savedBooks).subscribe();
    //upload savedBooks to database
    //find match between categories by 
  }
  toggleBooksFilter() {
    this.isBooksFilterOpen = !this.isBooksFilterOpen;
  }
}
