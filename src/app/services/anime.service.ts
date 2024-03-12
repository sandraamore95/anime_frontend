import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Anime } from 'src/app/models/Anime';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = "http://localhost:8080/api/"
  urlApi:string='https://api.jikan.moe/v4';



  headers: HttpHeaders;

  constructor(private http: HttpClient, private storageservice : StorageService, private messageService :MessageService) {
   
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.storageservice.getToken(),

    });

  }

  getDatosDeAPI(): Observable<any> {
    return this.http.get(`https://api.jikan.moe/v4/top/anime`);
    
  }

  //este endpoint guarda peliculas para el usuario autenticado y no se puede repetir el mal_id , porque directamente deberia salir que pueda eliminarlas de favoritos
  guardarAnime(anime: Anime): Observable<string> {
    const options = {
      headers: this.headers,
      responseType: 'text' as 'json'
    };
    return this.http.post<string>(`${this.baseUrl}anime/addFavorite`, anime, options);
  }


  eliminarAnime(anime: Anime): Observable<string> {
    const options = {
      headers: this.headers,
      responseType: 'text' as 'json'

    };
    return this.http.post<string>(`${this.baseUrl}anime/deleteFavorite`, anime, options);
  }


 sacarFavoritos(username: string): Observable<any> {
  const options = {
    headers: this.headers
  };
    return this.http.get(`${this.baseUrl}anime/usuario/${username}`, options);
  }

  existAnimeFav(anime: any):Observable<boolean> {
    const options = {
      headers: this.headers
    };
    return this.http.post<boolean>(`${this.baseUrl}anime/exists-fav`, anime, options);
  }

  

 getAnimes(): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${this.urlApi}/top/anime`)
      .pipe(
        tap(_ => this.log('fetched animes')),
        catchError(this.handleError<Anime[]>('getAnimes', []))
      );
  }



 
  getAnimeRamdom(): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${this.urlApi}/random/anime`);
  }

  /** DETAIL ANIME- GET anime by id. Will 404 if id not found */
  getAnimeById(id: number): Observable<Anime> {
    const url = `${this.urlApi}/anime/${id}/full`;
    return this.http.get<Anime>(url).pipe(
      tap(_ => this.log(`fetched anime id=${id}`)),
      catchError(this.handleError<Anime>(`getAnime id=${id}`))
    );
  }


  /** GET anime  by id. Return `undefined` when id not found */
  getAnimeNo404<Data>(id: number): Observable<Anime> {
    const url = `${this.urlApi}/anime/${id}/full`;
    return this.http.get<Anime[]>(url)
      .pipe(
        map(animes => animes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} anime id=${id}`);
        }),
        catchError(this.handleError<Anime>(`getAnime id=${id}`))
      );
}



getCharacters(animeId: number): Observable<any> {
  
  const url = `${this.urlApi}/anime/${animeId}/characters`;
  return this.http.get<any>(url);
}

getCharacterbyAnime(characterId: number): Observable<any> {
  const url = `${this.urlApi}/characters/${characterId}/full`;
  return this.http.get<any>(url);
}

getRecommendationsByAnime(animeId: number): Observable<any> {
  const url = `${this.urlApi}/anime/${animeId}/recommendations`;
  return this.http.get<any>(url);
}
  //----------endpoints--------------------------------------


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AnimeService: ${message}`);
  }



}


