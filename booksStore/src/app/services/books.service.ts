//import { HttpClient, provideHttpClient } from '@angular/common/http';
//import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Book } from '../models/book';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

//import { HttpClientModule } from '@angular/common/http';
//import { HttpClient, provideHttpClient } from '@nguniversal/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiURL = environment.baseUrl + 'Books/';
  //private httpClient : HttpClient

  constructor(private httpClient : HttpClient) { }

  //getBooks(): Observable<Book[]>{
  getBooks(): Observable<any>{
    //return this.httpClient.get<Book[]>(`${this.apiURL}GetBooksDemo`).pipe(map(() => ({})));
    return this.httpClient.get<Book[]>(`${this.apiURL}GetBooksDemo`);
  }

  //to use with: this.books$ = this.bookService.getBooks();
  getBooksV2(): Observable<Book[]>{
    return this.httpClient.get<Book[]>(`${this.apiURL}GetBooksDemo`).
      pipe(map((serverBooks) => serverBooks.map((book) => this.mapBook(book))));
  }
  //to use with: this.books$ = this.bookService.getBooks();
  getBooksV3(): Observable<Book[]>{
    return this.httpClient.get<any[]>(`${this.apiURL}GetBooksDemo`).
      pipe(map((serverBooks) => serverBooks.map((book) => ({
        Title: book.title,
        ImgUrl: book.imageUrl,
        Description: book.description,
        //AuthorId: 0,
        //BookId: 0,
        //GenreId: 0,
        //PublishDate: new Date
      }))));
  }

  private mapBook(serverBook: any): Book {
    return {
      Title: serverBook.title,
      ImgUrl: serverBook.imageUrl,
      Description: serverBook.description,
      //AuthorId: 0,
      //BookId: 0,
      //GenreId: 0,
      //PublishDate: new Date
    };
  }
}
