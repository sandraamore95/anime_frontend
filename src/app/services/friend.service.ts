import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { User } from '../models/User';

const API_URL = 'http://localhost:8080/api/friends/';
@Injectable({
  providedIn: 'root'
})


export class FriendService {

 // VAMOSA PROBARLO PRIMERO SIN PASARLE  EL AUTH INTERCEPTOR, SINO DESDE AQUI PASARLE EL HEADER CO EL TOKEN AVER SI IFUNCIONA , LUEGO PRUEBO CON LO OTRO
 headers: HttpHeaders;




 constructor(private http: HttpClient, private storageservice: StorageService) {
   this.headers = new HttpHeaders({
     // 'Authorization': 'Bearer ' + this.storageservice.getToken(), // Reemplaza con tu token real
   });
 }
//ENDPOINTS CONTROLLER FRIENDScontroller

getFriends(username: string): Observable<User[]> {
  return this.http.get<User[]>(API_URL + `all?username=${username}`);
}


existFriend(friend_id:number):Observable<boolean> {
  let url = API_URL + `existFriendShip/${friend_id}`;
  return this.http.get<boolean>(url);
}

existPending(friend_id:number):Observable<boolean> {
  let url = API_URL + `existPending/${friend_id}`;
  return this.http.get<boolean>(url);
}
sendRequest(friend_id: number) :Observable<string> {
  const options = {
    responseType: 'text' as 'json'
 };
  let url = API_URL + `send-request/${friend_id}`;
  return this.http.post<string>(url, {}, options);
}

deleteFriend(friend_id: number):Observable<string> {
  let url = API_URL + `delete-friendship/${friend_id}`;
  const options = {
    responseType: 'text' as 'json'
 };
  return this.http.delete<string>(url,options);
}

acceptRequest(friend_id: number):Observable<string> {
  let url = API_URL + `accept-request/${friend_id}`;
  const options = {
    responseType: 'text' as 'json'
 };
  return this.http.post<string>(url, {},options);
}

cancelRequest(friend_id: number) :Observable<string> {
  let url = API_URL + `cancel-request/${friend_id}`;
  const options = {
    responseType: 'text' as 'json'
 };
  return this.http.delete<string>(url, options);
}

rejectRequest(friend_id: number) :Observable<string> {
  let url = API_URL + `reject-request/${friend_id}`;
  const options = {
    responseType: 'text' as 'json'
 };
  return this.http.delete<string>(url, options);
}
getFriendshipRequest(friend_id: number): Observable<User>  {
  let url = API_URL + `friendship-request-sender/${friend_id}`;
  return this.http.get<User>(url);
}
isReceiver(friend_id: number):Observable<boolean>  {
  let url = API_URL + `friendship-request-receiver/${friend_id}`;
  return this.http.get<boolean>(url);
}





}








