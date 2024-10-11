import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const USER_KEY = 'auth-user';
const PROFILE_KEY = 'user-profile';
const USER_TOKEN = 'user-token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private userLoggedSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  userLogged$: Observable<any | null> = this.userLoggedSubject.asObservable();

  constructor() {
    const user = this.getUser();
    this.userLoggedSubject.next(user);
  }

  setUserLogged(user: any | null): void {
    this.userLoggedSubject.next(user);
  }

  logout(): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(PROFILE_KEY);
    window.localStorage.removeItem(USER_TOKEN);
    this.setUserLogged(null);
  }

  saveUser(user: any): void {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.setUserLogged(user);
  }

  getUser(): any {
    const userString = window.localStorage.getItem(USER_KEY);
    return userString ? JSON.parse(userString) : null;
  }

  public saveToken(token: string): void {
    window.localStorage.setItem(USER_TOKEN, token);
  }

  public getToken(): any {
    return window.localStorage.getItem(USER_TOKEN);
  }

  // Almacenar el perfil
  public saveProfile(profile: any): void {
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }

  // Obtener el perfil
  public getProfile(): any { ;
    const profile_user = window.localStorage.getItem(PROFILE_KEY);
    console.log("Profile User:", profile_user); // Verifica el contenido
    return profile_user ? JSON.parse(profile_user) : {};
  }

  public isLoggedIn(): boolean {
    return !!window.localStorage.getItem(USER_KEY);
  }

  public getUserRole() {
    const user = this.getUser();
    return user ? user.roles[0] : null;
  }
}
