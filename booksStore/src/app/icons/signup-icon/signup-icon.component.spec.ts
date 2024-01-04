import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupIconComponent } from './signup-icon.component';

describe('SignupIconComponent', () => {
  let component: SignupIconComponent;
  let fixture: ComponentFixture<SignupIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
