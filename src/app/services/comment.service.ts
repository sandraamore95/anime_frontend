import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:8080/api/comments/';



@Injectable({
  providedIn: 'root'
})
export class CommentService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      // 'Authorization': 'Bearer ' + this.storageservice.getToken(), // Reemplaza con tu token real
    });
  }

  
  
  getCommentById(commentId: number): Observable<any> {
    const url = API_URL + `user-comment/${commentId}`;
    return this.http.get<any>(url);
  }
  
  getCommentByPostId(postId: number): Observable<any> {
    const url = API_URL + `user-comments-post/${postId}`;
    return this.http.get<any>(url);
  }


  createComment(comment: any): Observable<any> {
    const options = {
      responseType: 'text' as 'json'
   };
    return this.http.post<any>(`${API_URL}create-comment`, comment);
  }


  eliminarComment(idComment: number):Observable<string> {
    const options = {
      responseType: 'text' as 'json'
   };
    return this.http.delete<string>(`${API_URL}delete-comment/${idComment}`,options);
  }






}

