import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {


  private userProfileSubject = new BehaviorSubject<any>(null);
  userProfile$: Observable<any> = this.userProfileSubject.asObservable();

  constructor(private storageService: StorageService) {
    const userProfile = this.storageService.getProfile();
    console.log(userProfile)
   
}

  updateUserProfile(userProfile: any): void {
    this.userProfileSubject.next(userProfile);
  }
}
