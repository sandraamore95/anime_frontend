import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private userProfileSubject = new BehaviorSubject<any>(null);
  userProfile$: Observable<any> = this.userProfileSubject.asObservable();

  updateUserProfile(userProfile: any): void {
    this.userProfileSubject.next(userProfile);
  }
}
