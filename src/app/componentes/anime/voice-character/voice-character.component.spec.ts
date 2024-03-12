import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceCharacterComponent } from './voice-character.component';

describe('VoiceCharacterComponent', () => {
  let component: VoiceCharacterComponent;
  let fixture: ComponentFixture<VoiceCharacterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoiceCharacterComponent]
    });
    fixture = TestBed.createComponent(VoiceCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
