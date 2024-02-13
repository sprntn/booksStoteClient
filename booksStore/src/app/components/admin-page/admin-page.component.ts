import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminBooksFilterComponent } from "../admin-books-filter/admin-books-filter.component";
import { Book } from '../../models/book';

@Component({
    selector: 'app-admin-page',
    standalone: true,
    templateUrl: './admin-page.component.html',
    styleUrl: './admin-page.component.scss',
    imports: [ReactiveFormsModule, AdminBooksFilterComponent]
})
export class AdminPageComponent{

  //static booksCounter: number = 0;
  savedBooks: Book[] = [];
  

  isBooksFilterOpen: boolean = false;

  

  
  
  constructor(){}

  saveBook(){
    //add book from list to savedBooks array, play as event from book card component
  }

  uploadBooks() {
    //upload savedBooks to database
  }
  toggleBooksFilter() {
    this.isBooksFilterOpen = !this.isBooksFilterOpen;
  }
}
