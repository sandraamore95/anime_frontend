import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { User } from '../models/User';

const API_URL = 'http://localhost:8080/api/users/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // VAMOSA PROBARLO PRIMERO SIN PASARLE  EL AUTH INTERCEPTOR, SINO DESDE AQUI PASARLE EL HEADER CO EL TOKEN AVER SI IFUNCIONA , LUEGO PRUEBO CON LO OTRO
  headers: HttpHeaders;




  constructor(private http: HttpClient, private storageservice: StorageService) {
    this.headers = new HttpHeaders({
      // 'Authorization': 'Bearer ' + this.storageservice.getToken(), // Reemplaza con tu token real
    });
  }

  // este no requiere que se le pase ninguna cabecera 
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }


  getModeratorBoard(): Observable<any> {
    const options = {
      headers: this.headers.set('Accept', 'text/plain'),
      responseType: 'text' as 'json' // Esto evita errores de tipo en TypeScript
    };
    return this.http.get(API_URL + 'mod', options);
  }

  getUserBoard(): Observable<any> {
    const options = {
      headers: this.headers.set('Accept', 'text/plain'),
      responseType: 'text' as 'json' // Esto evita errores de tipo en TypeScript
    };
    return this.http.get(API_URL + 'user', options);
  }

  getAdminBoard(): Observable<any> {
    const options = {
      headers: this.headers.set('Accept', 'text/plain'),
      responseType: 'text' as 'json' // Esto evita errores de tipo en TypeScript
    };
    return this.http.get(API_URL + 'admin', options);
  }

  getAllUsers(): Observable<any[]> {
    // Reemplaza 'getAll' con la ruta correcta de tu endpoint
    return this.http.get<any[]>(API_URL);
  }

  getUserByUsername(username: string): Observable<User> {
    let url = API_URL + `user/${username}`;
    return this.http.get<User>(url);

  }

  getUserById(id: number): Observable<User> {
    let url = API_URL + `id/${id}`;
    return this.http.get<User>(url);

  }

  changePassword(newPassword: string): Observable<string> {
    const url = API_URL + `change-password/${newPassword}`;
    const options = {
      responseType: 'text' as 'json'
   };
    return this.http.get<string>(url,  options);
  }
  changeEmail(newEmail: string): Observable<string> {
    const url = API_URL + `change-email/${newEmail}`;
    const options = {
       responseType: 'text' as 'json'
    };
    return this.http.get<string>(url,  options);
  }



  getProfileImage(): Observable<string> {
    const url = API_URL + 'profile-image-user';
    const headers = {
      Authorization: 'Bearer ' + this.storageservice.getToken()
    };
    return this.http.get<string>(url, { responseType: 'text' as 'json' });
  }

  getuserAvatar(username: string) {
    const url = API_URL + `profile-image/${username}`;
    return this.http.get(url, { responseType: 'blob' });
  }



  updateProfileImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    //le pasamos el Bearer Token
  
    const url = API_URL + 'update-profile-image';
    
    return this.http.post(url, formData, {responseType:'blob'});
  }

}