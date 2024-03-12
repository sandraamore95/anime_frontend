import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

  animeInfo: any[] = [];

  constructor(
    private animeService: ApiService,
  ) {}

  ngOnInit(): void {
    let imagePaths = [
      'https://steamuserimages-a.akamaihd.net/ugc/938331383377013948/14D0758C8965C2E10BCFAABCCA71406FD3DDE126/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
      'https://i.pinimg.com/564x/e0/7a/7a/e07a7a7cd6b726af0e1d7a108720cef4.jpg',
      'https://images2.alphacoders.com/132/1321650.jpeg'
    ];

    let top_animes: number[] = [31964, 21, 9253];

    // este array de objetos vamos a llenarlo
    const requests = top_animes.map(id => this.animeService.getAnimeById(id));

    forkJoin(requests).subscribe(
      (responses: any[]) => {
        // 'responses' es un array que contiene las respuestas de los tres animes
        for (let i = 0; i < responses.length; i++) {
          this.animeInfo.push({
            id: responses[i].data.mal_id,
            imagePath: imagePaths[i]
          });
        }
       console.log(this.animeInfo);
      },
      error => {
        console.error('Error al obtener los top animes:', error);
      }
    );
  }
}