import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  //title: string = "To Kill a Mockingbird";
  //description: string = "A classic novel by Harper Lee";
  //imageUrl: string = "https://example.com/to-kill-a-mockingbird.jpg";
  //imageUrl: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg/828px-To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg";
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
}
