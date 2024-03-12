import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from 'src/app/services/anime.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StorageService } from 'src/app/services/storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Anime } from 'src/app/models/Anime';

@Component({
  selector: 'app-character-detalle',
  templateUrl: './character-detalle.component.html',
  styleUrls: ['./character-detalle.component.css']
})
export class CharacterDetalleComponent implements OnInit{
  constructor(private route: ActivatedRoute,
    private ApiService: ApiService,
    private storageservice: StorageService,
    private r: Router,
    private sanitizer: DomSanitizer) {

  }
character :any;


ngOnInit(): void {
  this.route.params.subscribe(params => {
    let animeId = params['id'];
    // Resto del código para cargar datos según el nuevo animeId
    console.log("el ID es " + animeId);
    this.loadCharacter(animeId);
  
  });
}





  loadCharacter(animeId: number): void {

    this.ApiService.getCharacterbyAnime(animeId).subscribe(
      (character: any) => {
  console.log(character);
  this.character=character.data;
  let similars=character.data.anime;
  console.log(similars);
        }
      
    );
  };






}
