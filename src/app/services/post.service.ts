import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const API_URL = 'http://localhost:8080/api/posts/';



@Injectable({
  providedIn: 'root'
})
export class PostService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      // 'Authorization': 'Bearer ' + this.storageservice.getToken(), // Reemplaza con tu token real
    });
  }

  getuserPostImage(post_id: number,username:string) {
    const url = API_URL + `${post_id}/image/user/${username}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  getAllPostsByUser(username:string): Observable<any[]> {
    const url = API_URL + `user-posts/${username}`;
    return this.http.get<any[]>(url);
  }

  getPostById(postId: number): Observable<any> {
    const url = API_URL + `user-post/${postId}`;
    return this.http.get<any>(url);
  }

  getPaginatedPostsByUser(username: string, page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('username', username);
      const url = API_URL + `user-posts/${username}`;
    return this.http.get<any>(url, { params });
  }

  uploadImage(file: File, postId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const options = {
      headers: this.headers.set('Accept', 'text/plain'),
      responseType: 'text' as 'json' // Esto evita errores de tipo en TypeScript
    };
    // Asegúrate de que tu backend espera un encabezado Content-Type multipart/form-data

    return this.http.post(`${API_URL}upload-image/${postId}`, formData,options);
  }



  createPost(post: any): Observable<number> {
    const options = {
      responseType: 'text' as 'json'
   };
    return this.http.post<number>(`${API_URL}create-post`, post,options);
  }
  updatePost(postId: number,postData:any) :Observable<any>  {
 
    return this.http.put<any>(`${API_URL}edit/${postId}`,postData);

  }
  eliminarPost(idPost: number, username: string): Observable<string> {
    const options = {
      responseType: 'text' as 'json'
    };
    return this.http.delete<string>(`${API_URL}delete-post/${idPost}?username=${username}`, options);
  }
 










}
