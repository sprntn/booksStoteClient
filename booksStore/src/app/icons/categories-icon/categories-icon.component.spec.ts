import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesIconComponent } from './categories-icon.component';

describe('CategoriesIconComponent', () => {
  let component: CategoriesIconComponent;
  let fixture: ComponentFixture<CategoriesIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
