import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from '../book-card/book-card.component';
import { ReloadBooksSubjectService } from '../../services/reload-books-subject.service';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss'
})
export class BooksPageComponent implements OnInit, OnDestroy{
  
  books$!: Observable<Book[]>;
  //booksSubscription!: Subscription;
  private searckKey = "";
  private category = 0;//change later to category object
  
  constructor(private booksService: BooksService, private reloadSubjectService: ReloadBooksSubjectService){}

  ngOnDestroy(): void {
    //this.booksSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.getBooks(this.searckKey, this.category);
    this.reloadSubjectService.reloadSubject$.subscribe((res) => {
      console.log(res);
      if(res.categoryId){
        this.category = res.categoryId;
      }
      if(res.searchKey){
        this.searckKey = res.searchKey;
      }
      this.getBooks(this.searckKey, this.category)
    })
    // this.reloadSubjectService.loginSubject$.subscribe((category) => {
    //   console.log('category:',category);
    //   console.log('reload books');
      
    //   //store user if needed
    //   this.getBooks();//with token
    // } );
  }

  //change later to category object
  getBooks(searchKey: string, category: number): void{
    this.books$ = this.booksService.getBooksV2(category, searchKey)
  }
}
