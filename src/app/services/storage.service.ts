import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


const USER_KEY = 'auth-user';
const PROFILE_KEY = 'user-profile';
const USER_TOKEN = 'user-token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private userLoggedSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  userLogged$: Observable<any | null> = this.userLoggedSubject.asObservable();
  constructor() { }

  setUserLogged(user: any | null): void {
    this.userLoggedSubject.next(user);
  }

  
    
  logout(): void {
    // Tu lógica de cierre de sesión aquí
   
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(PROFILE_KEY);
    window.localStorage.removeItem(USER_TOKEN);
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(PROFILE_KEY);this.setUserLogged(false);
  }

  saveUser(user: any): void {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.setUserLogged(user);
  }

  getUser(): any {
    const userString = window.localStorage.getItem(USER_KEY);
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }


  ///  almacenamos el token del usuario
  public saveToken(token: string): void {
    window.localStorage.removeItem(USER_TOKEN);
    window.localStorage.setItem(USER_TOKEN, token);
  }

  public getToken(): any {
    return window.localStorage.getItem(USER_TOKEN);
  }
  //almacenamos en una sesion el usuario que contiene el token tambien
  public saveProfile(profile: any): void {
    window.localStorage.removeItem(PROFILE_KEY);
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }




  public getProfile(): any {
    const profile_user = window.localStorage.getItem(PROFILE_KEY);
    if (profile_user) {
      return JSON.parse(profile_user);
    }

    return {};
  }


  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  public getUserRole() {

    let user = this.getUser(); console.log(user);
    return user.roles[0];
  }



}