import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';


const API_URL = 'http://localhost:8080/api/notifications/';


@Injectable({
  providedIn: 'root'
})


export class NotificationService {

  // VAMOSA PROBARLO PRIMERO SIN PASARLE  EL AUTH INTERCEPTOR, SINO DESDE AQUI PASARLE EL HEADER CO EL TOKEN AVER SI IFUNCIONA , LUEGO PRUEBO CON LO OTRO
  headers: HttpHeaders;

  private selectedNotificationSource = new Subject<any>();
  selectedNotification$ = this.selectedNotificationSource.asObservable();

  private notificationDeletedSource = new Subject<number>();
  notificationDeleted$ = this.notificationDeletedSource.asObservable();

  selectedNotification: any; 

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      // 'Authorization': 'Bearer ' + this.storageservice.getToken(), // Reemplaza con tu token real
    });
  }
  setSelectedNotification(notification: any) {
    this.selectedNotificationSource.next(notification);
  }
  getAllNotificationsByUser(role: string): Observable<any[]> {
    // Suponiendo que estás enviando el rol como parámetro en la URL
    const url = API_URL + `user-notifications?role=${role}`;
    return this.http.get<any[]>(url);
  }

  deleteNotification(notificationId: number,role:string): Observable<any> {
    return this.http.delete<any>(API_URL + `delete-notification/${notificationId}?role=${role}`, { responseType: 'text' as 'json'}).pipe(
      tap(() => this.notificationDeletedSource.next(notificationId)),
      catchError(error => {
        // Manejo de errores
        return throwError(error);
      })
    );
  }
  









 
  





  




}
