import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Anime } from 'src/app/models/Anime';
import { ApiService } from 'src/app/services/anime.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {
  filteredName: string = '';
  animes: Anime[] = [];
  pageSize: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual

username:string='';


  constructor(
    private ACservice: ApiService,private route: ActivatedRoute,
    ) {

  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchData(this.username);
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      // Resto del código para cargar datos según el nuevo animeId
      this.fetchData(this.username);


    });
    

  } 

  onSearchQueryChanged(query: string): void {
    this.filteredName = query;
  }

  fetchData(username:string): void {
    this.ACservice.sacarFavoritos(username).subscribe((data: any) => {
      data.forEach((anime:any)  => {
        this.ACservice.getAnimeById(anime.malId).subscribe({
          next: (anime: any) => {
            this.animes.push(anime.data);
          }
        })
      });
      },
      (error) => {

      }
    );
  }
}

