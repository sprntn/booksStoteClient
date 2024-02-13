import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBooksFilterComponent } from './admin-books-filter.component';

describe('AdminBooksFilterComponent', () => {
  let component: AdminBooksFilterComponent;
  let fixture: ComponentFixture<AdminBooksFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBooksFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminBooksFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
