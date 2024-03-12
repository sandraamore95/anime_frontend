import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswComponent } from './forget-passw.component';

describe('ForgetPasswComponent', () => {
  let component: ForgetPasswComponent;
  let fixture: ComponentFixture<ForgetPasswComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgetPasswComponent]
    });
    fixture = TestBed.createComponent(ForgetPasswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
