import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent  implements OnInit,OnChanges{
  @Input() anime: any ; // por default
  characters:any[]=[];
  constructor(
    private Apiservice: ApiService,
    ) {

  }

ngOnInit(): void {
}

ngOnChanges(changes: SimpleChanges): void {
  if (changes['anime'] && changes['anime'].currentValue) {
    this.loadCharacters(); // Llama a un método para actualizar los personajes con el nuevo anime
  }
}

loadCharacters(){
  this.characters = [];
  //https://api.jikan.moe/v4/anime/5114/characters
  this.Apiservice.getCharacters(this.anime.mal_id).subscribe(
    (data: any) => {
      let response=data.data;
  
    //recorremos los personajes
    response.forEach((character: any) => {  
      if(character.role === 'Main'){
        console.log(character);
        this.characters.push(character.character);  // Agrega el personaje al array
      }
    });
    
    },
    (error) => {
      console.error('Error al obtener los personajes', error);
    }
  );
  
}

}
