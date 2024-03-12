import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



const API_URL = 'http://localhost:8080/api/profile/';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      // 'Authorization': 'Bearer ' + this.storageservice.getToken(), // Reemplaza con tu token real
    });
  }
  addProfile(user: any): Observable<string> {
    const options = {
      headers: this.headers.set('Accept', 'text/plain'),
      responseType: 'text' as 'json' // Esto evita errores de tipo en TypeScript
    };
    return this.http.post<string>(API_URL + 'add-profile', user ,options);
  }

  getUserProfile(username:string): Observable<any> {
    const options = {
      responseType: 'json' as 'json'
    };
    // Asumiendo que tienes un endpoint específico para obtener el perfil del usuario autenticado
    return this.http.get<any>(API_URL + `get-profile/${username}`,options);
  }

  updateProfile(profileData: any) :Observable<any>  {
 
    return this.http.put<any>(API_URL + 'update-profile',profileData);

  }



}
