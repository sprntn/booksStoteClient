import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2, ViewChild } from '@angular/core';
import { Category } from '../../models/category';
import { Book } from '../../models/book';

//import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-book-card',
  standalone: true,
  imports: [],
  // imports: [FormsModule],
  templateUrl: './admin-book-card.component.html',
  styleUrl: './admin-book-card.component.scss'
})
export class AdminBookCardComponent implements AfterViewInit, OnDestroy{

  @Input() title!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
  @Input() serverCategories!: Category[];

  //Output() starSelected: EventEmitter<number> = new EventEmitter();//to set rating star
  @Output() onBookSelected: EventEmitter<Book> = new EventEmitter();

  @ViewChild('image', { static: true }) image!: ElementRef;
  @ViewChild('desc', { static: true }) desc!: ElementRef;
  @ViewChild('actions', { static: true }) actions!: ElementRef;
  ratio: number = 2.5
  descFonySize : number = 10;//px

  selectedCategory: number = 0;

  constructor(private renderer: Renderer2){}

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.setDescHeight);
  }
  
  ngAfterViewInit(): void {
    this.setDescHeight();

    window.addEventListener('resize', () => this.setDescHeight());
  }

  setDescHeight(){
    const cardWidth = this.image.nativeElement.offsetWidth;// card width in px
    const totalHeight = cardWidth * this.ratio;//total card Height in px
    const imgHeight = this.image.nativeElement.offsetHeight;//get image height in px
    const actionsHeight = this.actions.nativeElement.offsetHeight;//get actions height in px
    const descHeight = totalHeight - imgHeight - actionsHeight;
    const linesNum = Math.floor(descHeight / (this.descFonySize * 2.2));
    
    console.log(`lines num: ${linesNum}`);
    //this.renderer.setStyle(this.desc.nativeElement, '-webkit-line-clamp', descHeight / this.descFonySize);
    //this.renderer.setStyle(this.desc.nativeElement, '-webkit-line-clamp', "10");
    this.renderer.setStyle(this.desc.nativeElement, '-webkit-line-clamp',linesNum.toString());
  }

  onSelectionChange(event: any) {
    console.log(`category id: ${event.target.value}`);
    this.selectedCategory = event.target.value;
  }

  selectBook() {
    const book = new Book(this.title, this.description, this.imageUrl);
    book.CategoryId = this.selectedCategory;
    book.Author = "demo test";

    console.log(book);
    this.onBookSelected.emit(book);
  }
}
