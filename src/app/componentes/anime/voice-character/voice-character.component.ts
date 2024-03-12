import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-voice-character',
  templateUrl: './voice-character.component.html',
  styleUrls: ['./voice-character.component.css']
})
export class VoiceCharacterComponent {
  @Input() character: any ; 
}
