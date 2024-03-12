import { Component,Input } from '@angular/core';
import { ApiService } from 'src/app/services/anime.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css']
})
export class AnimeComponent {
  @Input() anime:any;
  showTitle = false;

}
