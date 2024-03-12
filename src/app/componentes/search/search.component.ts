import { Component,EventEmitter,Input,Output ,OnInit} from '@angular/core';
import { Anime } from 'src/app/models/Anime';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {
  
  @Output() searchQueryChanged = new EventEmitter<string>();
  @Input() placeholder: string = 'Search for an Anime'; // por default
  filteredName: string = '';

  onSearchInputChange(event: Event): void {
    this.filteredName = (event.target as HTMLInputElement).value;
    this.searchQueryChanged.emit(this.filteredName);
  }
}
