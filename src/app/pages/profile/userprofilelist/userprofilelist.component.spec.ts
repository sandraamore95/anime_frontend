import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofilelistComponent } from './userprofilelist.component';

describe('UserprofilelistComponent', () => {
  let component: UserprofilelistComponent;
  let fixture: ComponentFixture<UserprofilelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserprofilelistComponent]
    });
    fixture = TestBed.createComponent(UserprofilelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
