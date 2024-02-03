//import { HttpClient, provideHttpClient } from '@angular/common/http';
//import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Book } from '../models/book';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthV1Service } from './auth-v1.service';
import { Category } from '../models/category';

//import { HttpClientModule } from '@angular/common/http';
//import { HttpClient, provideHttpClient } from '@nguniversal/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  

  private apiURL = environment.baseUrl + 'Books/';
  //private httpClient : HttpClient

  constructor(private httpClient : HttpClient, private authService: AuthV1Service) { }

  getCategories(): Observable<Category[]> {
    // return this.httpClient.get<Category[]>(`${this.apiURL}GetCategories`).
    //   pipe(map((serverCategories) => serverCategories.map((category) => this.mapCategory(category))));
    return this.httpClient.get<Category[]>(`${this.apiURL}GetCategories`);//שמות המשתנים זהים בשרת ובקליינט לכן לא צריך למפות
  }
  
  //getBooks(): Observable<Book[]>{
  getBooks(): Observable<any>{
    //return this.httpClient.get<Book[]>(`${this.apiURL}GetBooksDemo`).pipe(map(() => ({})));
    return this.httpClient.get<Book[]>(`${this.apiURL}GetBooksDemo`);
  }

  getBooksV2(categoryId: number, searchKey: string) :Observable<Book[]>{
    try {
      //get the token
      const token = this.authService.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.httpClient.get<Book[]>(`${this.apiURL}GetBooks/${categoryId}/${searchKey}`, { headers }).
        pipe(map((serverBooks) => serverBooks.map((book) => this.mapBook(book))));
    } catch (error) {
      return this.httpClient.get<Book[]>(`${this.apiURL}GetBooks/${categoryId}/${searchKey}`).
        pipe(map((serverBooks) => serverBooks.map((book) => this.mapBook(book))));
    }
  }
  //to use with: this.books$ = this.bookService.getBooks();
  getBooksV4(): Observable<Book[]>{
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

  // private mapCategory(serverCategory: Category): Category {
  //   return {
  //     CategoryId: serverCategory.CategoryId,
  //     Title: serverCategory.Title
  //   };
  // }
}
