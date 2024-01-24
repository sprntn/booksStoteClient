import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksCardsListComponent } from './books-cards-list.component';

describe('BooksCardsListComponent', () => {
  let component: BooksCardsListComponent;
  let fixture: ComponentFixture<BooksCardsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksCardsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooksCardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
