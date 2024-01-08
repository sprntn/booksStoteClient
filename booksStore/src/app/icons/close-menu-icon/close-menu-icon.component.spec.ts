import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseMenuIconComponent } from './close-menu-icon.component';

describe('CloseMenuIconComponent', () => {
  let component: CloseMenuIconComponent;
  let fixture: ComponentFixture<CloseMenuIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseMenuIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloseMenuIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
