import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Author } from '../../models/author';
import { CommonModule } from '@angular/common';
// { BooksService } from '../../services/books.service';
import { Category } from '../../models/category';
import { Country } from '../../models/country';
import { BookSearchParameters } from '../../interfaces/book-search-parameters';
//import { AdminService } from '../../services/admin.service';

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
  //authors$!: Observable<Author[]>;
  //categories$!: Observable<Category[]>;
  //countries$!: Observable<Country[]>;
  // countries: Country[] = [];
  //categories: Category[] = [];
  // authors: Author[] = [];
  
  
  @Input() authors: Author[] = [];
  @Input() categories: Category[] = [];
  @Input() countries: Country[] = [];
  @Output() search: EventEmitter<BookSearchParameters> = new EventEmitter();

  constructor(){}
  
  ngOnInit(): void {
    //this.authors$ = this.booksService.getAuthors();
    //this.categories$ = this.booksService.getCategories();
    //this.countries$ = this.booksService.getCountries();
    //this.countries$.subscribe(res => console.log(res));
    //this.booksService.getCategories().subscribe(categories => this.categories = categories);
    // this.fetchFilterData();

    this.initializeFilterForm();
  }

  // fetchFilterData(){
  //   this.booksService.getAuthors().subscribe(authors => this.authors = authors);
  //   this.booksService.getCategories().subscribe(categories => this.categories = categories);
  //   this.booksService.getCountries().subscribe(countries => this.countries = countries);
  // }

  initializeFilterForm() {
    this.filterForm = new FormGroup({
      searchKey: new FormControl(""),
      authorSelect: new FormControl(0),
      categorySelect: new FormControl(0)
    });
  }

  onSearch() {
    console.log(this.filterForm.value);
    
    //emit to admin page the search parameters
    //check form controls values
    // const parametrs: BookSearchParameters = {
    //   authorId: 0,
    //   categoryId: 0,
    //   //countryId: 0,
    //   searchKey: ""
    // }
    // console.log('parameters: ', parametrs);
    
    //this.search.emit(parametrs);
    this.search.emit(this.filterForm.value);


    //console.log('test');
    //this.categories$.forEach(category => console.log(category));
    //this.categories.forEach(category => console.log(category));
     
    //this.adminService.fetchBooks().subscribe(books => console.log(books));
  }
}