
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StorageService } from "./storage.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private storageservice:StorageService) {

  }
//ESTO SIRVE PARA PASAR POR EL HEADER EL TOKEN BEARER
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
   
    const token = this.storageservice.getToken();
    console.log(token);
    //si el usuario esta logeado y la url pertenece a 8080
    if(token != null && (!req.url.includes('jikan'))){
     
      authReq = authReq.clone({
        headers: new HttpHeaders({
         
          'Authorization': `Bearer ${token}`,
          
      })
      })
    }
    return next.handle(authReq);
  }

}

export const authInterceptorProviders = [
  {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
  }
]


/*
 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {
            const authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${window.btoa(this.authenticationService.username + ":" + this.authenticationService.password)}`
                })
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }


*/