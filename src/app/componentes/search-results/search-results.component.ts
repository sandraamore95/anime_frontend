import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  //LOS PARAMETROS QUE LE LLEGAN DESDE EL COMPONENTE PADRE : muestra o los animes de home o los animes de favoritos
  @Input() animes: any;
  @Input() searchQuery: string = '';
 
}