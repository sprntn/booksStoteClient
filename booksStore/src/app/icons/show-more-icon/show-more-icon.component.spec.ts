import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMoreIconComponent } from './show-more-icon.component';

describe('ShowMoreIconComponent', () => {
  let component: ShowMoreIconComponent;
  let fixture: ComponentFixture<ShowMoreIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowMoreIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowMoreIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
