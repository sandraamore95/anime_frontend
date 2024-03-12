import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFriendComponent } from './request-friend.component';

describe('RequestFriendComponent', () => {
  let component: RequestFriendComponent;
  let fixture: ComponentFixture<RequestFriendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestFriendComponent]
    });
    fixture = TestBed.createComponent(RequestFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
