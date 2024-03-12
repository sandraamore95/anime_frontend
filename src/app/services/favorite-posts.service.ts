import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:8080/api/favoritePosts/';
@Injectable({
  providedIn: 'root'
})
export class FavoritePostsService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      // 'Authorization': 'Bearer ' + this.storageservice.getToken(), // Reemplaza con tu token real
    });
  }
  getFavoritePostsByUsername(username: string): Observable<any> {
    let url = API_URL + `user/${username}`;
    return this.http.get<any>(url);
  }
  
  addFavoritePost(favoritePost: any): Observable<any> {
    const options = {
      responseType: 'text' as 'json'
   };
    return this.http.post<any>(`${API_URL}user/favorite-posts`, favoritePost,options);
  }
  removeFavorite(postId: number): Observable<any> {
    return this.http.delete(`${API_URL}favorite-posts/${postId}`);
  }

  isFavorite(postId: number): Observable<boolean> {
    let url = API_URL + `isFavoritePost/post/${postId}`;
    return this.http.get<boolean>(url);
  }

}
