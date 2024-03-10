import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category';
import { Author } from '../models/author';
import { BookSearchParameters } from '../interfaces/book-search-parameters';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  /*
  const PAGE_SIZE = 20;
  const googleUrl = `https://www.googleapis.com/books/v1/volumes?printType=books&maxResults=${PAGE_SIZE}`;
  */
  private PAGE_SIZE = 20;
  private googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?printType=books&maxResults=${this.PAGE_SIZE}`;

  private apiURL = environment.baseUrl + 'Admin/';

  constructor(private httpClient : HttpClient) { }

  login(admin: {email: string, password: string}) :Observable<Boolean>{
    console.log(admin);
    
    return this.httpClient.post<boolean>(`${this.apiURL}login`, {"Email": admin.email, "Password":admin.password});
  }

  //(data) => data.categories.map((category) => this.mapCategory(category))
  getFilterData(): Observable<{categories: Category[], authors: Author[]}>{
    return this.httpClient.get<{categories: Category[], authors: Author[]}>(`${this.apiURL}GetFilterData`).pipe(
      map((serverData) => {
        return {
          categories: serverData.categories.map((category) => this.mapCategory(category)),
          authors: serverData.authors.map((author) => this.mapAuthor(author))
        }
      })
    );
  }

  //fetchBooks(parameters: BookSearchParameters): Observable<any>{
  fetchBooks(parameters: BookSearchParameters): Observable<Book[]>{
    console.log(parameters);
    
    //return this.httpClient.get<any>(this.googleBooksUrl);
    //return this.httpClient.get<any>("https://www.googleapis.com/books/v1/volumes?printType=books&maxResults=20&startIndex=0");
    const tempUrl = "https://www.googleapis.com/books/v1/volumes?printType=books&maxResults=20&q=javascript";
    //for test only, hardcoded
    //return this.httpClient.get<any>("https://www.googleapis.com/books/v1/volumes?printType=books&maxResults=20&q=javascript");
    return this.httpClient.get<any>(tempUrl).pipe(map((data) => data.items.map((book: any) => this.mapBook(book))));
  }
  
  uploadBooks(books: Book[]): Observable<boolean>{
    return this.httpClient.post<boolean>(`${this.apiURL}`, books)
  }

  private mapBook(book: any): Book{
    const serverBook : Book = {
      Description: book.volumeInfo.description,
      ImgUrl: book.volumeInfo.imageLinks.smallThumbnail,
      Title: book.volumeInfo.title,
      //AuthorId: 0,
      Author: book.volumeInfo.authors.join(' & '),
      //BookId: 0,
      //CategoryId: 0,
      //Category: book.volumeInfo.categorires[0],//for now just the first category
      PublishDate: book.volumeInfo.publishedDate,
      AverageRating: book.volumeInfo.averageRating 
    }
    console.log(serverBook);
    return serverBook;
    // return {
    //   Description: book.volumeInfo.description,
    //   ImgUrl: book.volumeInfo.imageLinks.smallThumbnail,
    //   Title: book.volumeInfo.title,
    //   //AuthorId: 0,
    //   Author: book.volumeInfo.authors.join(' & '),
    //   //BookId: 0,
    //   //CategoryId: 0,
    //   Category: book.volumeInfo.categorires[0],//for now just the first category
    //   PublishDate: book.volumeInfo.publishedDate,
    //   AverageRating: book.volumeInfo.averageRating 
    // }
  }
  
  private mapAuthor(author: any): Author {
    return {
      AuthorId: author.authorId,
      //FirstName: author.firstName,
      //LastName: author.lastName,
      FullName: author.fullName,
      BirthDate: author.birthDate,
      CountryId: author.countryId,
      Email: author.email
    }
  }
  
  private mapCategory(serverCategory: any): Category {
    return {
      CategoryId: serverCategory.categoryId,
      Title: serverCategory.title
    };
  }
}
