import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'URL_de_tu_API';

  constructor(private http: HttpClient) {}

  search(query: string) {
    // Realiza una solicitud GET a la API con el término de búsqueda.
    return this.http.get(`${this.apiUrl}?query=${query}`);
  }

}
