import { Component, Input, OnInit } from '@angular/core';
import { BookCardComponent } from '../book-card/book-card.component';
import { Book } from '../../models/book';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books-cards-list',
  standalone: true,
  imports: [BookCardComponent, CommonModule],
  templateUrl: './books-cards-list.component.html',
  styleUrl: './books-cards-list.component.scss'
})
export class BooksCardsListComponent implements OnInit{
  //numbers = [0]
  //numbers: number[] = Array.from({ length: 11 }, (_, index) => index);

  //@Input() books$!: Observable<Book[]>;
  @Input() books!: Book[];
  //@Input() books$!: Observable<Book[]>;
  

  ngOnInit(): void {
    //console.log(this.numbers);
    
  }
}
