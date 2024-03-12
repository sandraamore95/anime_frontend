import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-similars',
  templateUrl: './similars.component.html',
  styleUrls: ['./similars.component.css']
})
export class SimilarsComponent {
  @Input() anime: any ; 
}
