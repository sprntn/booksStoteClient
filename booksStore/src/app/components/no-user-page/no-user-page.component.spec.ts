import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoUserPageComponent } from './no-user-page.component';

describe('NoUserPageComponent', () => {
  let component: NoUserPageComponent;
  let fixture: ComponentFixture<NoUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoUserPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
