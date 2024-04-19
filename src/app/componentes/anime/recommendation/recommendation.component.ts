import { Component, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnChanges {
  @Input() anime: any ; // por default
  recommendations:any[]=[];
  
  constructor(
    private Apiservice: ApiService,private route:ActivatedRoute
    ) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['anime'] && changes['anime'].currentValue) {
      this.loadRecommendations(); // Llama a un método para actualizar los personajes con el nuevo anime
    }
  }
  
loadRecommendations(){
  this.recommendations = [];
  this.Apiservice.getRecommendationsByAnime(this.anime.mal_id).pipe(
    take(10)
  ).subscribe(
    (data: any) => {
      let response=data.data;
      response.forEach((recommendation: any) => {
          this.recommendations.push(recommendation);
      });
    },
    (error) => {
      console.error('Error al obtener las recomendaciones', error);
    }
  );
  
}
 }