import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Book } from '../../models/book';
import { BooksService } from '../../services/books.service';
import { BooksCardsListComponent } from '../books-cards-list/books-cards-list.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [BooksCardsListComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit, OnDestroy{
  
  //public booksList$ !: Observable<Book[]>;
  public books !: Book[];
  booksSubscription!: Subscription;

  //books$!: Observable<Book[]>;

  constructor(private booksService: BooksService){}
  
  ngOnDestroy(): void {
    this.booksSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.getBooks();
    //this.books$ = this.booksService.getBooksV2();
  }

  // getBooksV2(): void{
  //   console.log("get books v2");
    
  //   this.books$ = this.booksService.getBooksV2();
  // }

  // getBooksV(): void{
  //   console.log("get books v2");
    
  //   this.books$ = this.booksService.getBooks().pipe(map((books) => (this.toClient(books))));
  // }

  // toClient(books: any[]): Book[] {
  //   return books.map((book) => ({
  //     Description: book.description,
  //     ImgUrl: book.imageUrl,
  //     Title: book.title
  //   }));
  // }

  getBooks(): void{
    //this.booksService.getBooks().subscribe(res => console.log(res));
    
    console.log("user page initial");
    
    this.booksSubscription = this.booksService.getBooks().subscribe({
      next: (books) => {
        console.log(books);
        //this.books = books;
        this.books = books.map((book: { description: string; imageUrl: string; title: string; }) => ({
          Description: book.description,
          ImgUrl: book.imageUrl,
          Title: book.title
        }));
      },
      error: (err) => {
        console.log(err);
        
      },
      complete: () => {}
    });

    //test
    // this.booksService.getBooksV2().subscribe({
    //   next: (books) => {console.log(books)},
    //   error: () => {},
    //   complete: () => {}
    // });
  }
}
