import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:8080/api/account/';



@Injectable({
  providedIn: 'root'
})



export class AccountService {

  headers: HttpHeaders;
  constructor(private http: HttpClient, private storageservice: StorageService) {
    this.headers = new HttpHeaders({
      // 'Authorization': 'Bearer ' + this.storageservice.getToken(), // Reemplaza con tu token real
    });
  }
  deleteAccount(email: string) {
    const options = {
      headers: this.headers,
      responseType: 'text' as 'json'

    };
    return this.http.post<any>(API_URL + 'delete-account', { email },options);
  }

  forgotPassword(email: string): Observable<string> {
    return this.http.post<string>(`${API_URL}forgot-password`, email, { responseType: 'text' as 'json' });
  }
  validateToken(token: string): Observable<boolean> {
    const url = API_URL+'validate-token';
    return this.http.get<boolean>(url, { params: { token } });
  }

  resetPassword(token: string, newPassword: string): Observable<string> {
    const url = API_URL + 'reset-password';
    const body = { token, newPassword };
    return this.http.post<string>(url, body,{ responseType: 'text' as 'json' });
  }
  

 
}



