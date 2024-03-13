import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'preferred-theme';
  private theme: 'light' | 'dark' = 'light'; // Cambiado a 'light' | 'dark'

  constructor() {
    // Obtener el tema preferido del almacenamiento local o establecer uno predeterminado
    this.theme = localStorage.getItem(this.THEME_KEY) as 'light' | 'dark' || 'light'; // Asegurarse de que coincida con el tipo esperado
    document.body.setAttribute('data-theme', this.theme);
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', this.theme);
    // Guardar la preferencia del tema en el almacenamiento local
    localStorage.setItem(this.THEME_KEY, this.theme);
  }

  getTheme(): 'light' | 'dark' {
    return this.theme;
  }
}
