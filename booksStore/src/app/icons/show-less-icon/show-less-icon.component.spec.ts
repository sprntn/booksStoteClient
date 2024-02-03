import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLessIconComponent } from './show-less-icon.component';

describe('ShowLessIconComponent', () => {
  let component: ShowLessIconComponent;
  let fixture: ComponentFixture<ShowLessIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowLessIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowLessIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
