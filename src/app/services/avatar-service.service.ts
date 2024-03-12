import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  constructor(private userService: UserService) {}

  getAvatarUrl(username: string): Observable<string> {
    return this.userService.getuserAvatar(username).pipe(
      map(blob => URL.createObjectURL(blob))
    );
  }
}