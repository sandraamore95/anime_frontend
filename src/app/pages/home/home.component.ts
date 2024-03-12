import { Component, Input } from '@angular/core';

import { ApiService } from 'src/app/services/anime.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { count } from 'rxjs';
import { Anime } from 'src/app/models/Anime';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  carouselData: any;

  onDataReady(data: any): void {
    this.carouselData = data;
    console.log(this.carouselData)
  }

  animes: Anime[] = [];
  filteredName: string = '';
  constructor(
    private ACservice: ApiService) {

  }
  ngOnInit(): void {
   
    this.fetchData();
  }
  onSearchQueryChanged(query: string): void {
    this.filteredName = query;
  }
  fetchData(): void {
    this.ACservice.getDatosDeAPI().subscribe(
      (animes: any) => {
        //obtenemos los animes de la API JIKAN
        this.animes = animes.data;
      }
    );
  }



}
