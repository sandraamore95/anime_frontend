import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetalleComponent } from './character-detalle.component';

describe('CharacterDetalleComponent', () => {
  let component: CharacterDetalleComponent;
  let fixture: ComponentFixture<CharacterDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterDetalleComponent]
    });
    fixture = TestBed.createComponent(CharacterDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
