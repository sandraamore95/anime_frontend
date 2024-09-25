import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private baseUrl = 'http://localhost:8080/api/follows';


  constructor(private http: HttpClient) { }

  followUser(userId: number): Observable<any> {
    const options = {
      responseType: 'text' as 'json'
   };
    return this.http.post(`${this.baseUrl}/follow/${userId}`, {},options);
  }

  unfollowUser(userId: number): Observable<any> {
    const options = {
      responseType: 'text' as 'json'
   };
    return this.http.delete(`${this.baseUrl}/unfollow/${userId}`,options);
  }

  isFollowing(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/is-following/${userId}`);
  }
}