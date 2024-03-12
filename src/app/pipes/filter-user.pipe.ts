import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
 // Asegúrate de importar correctamente el servicio UserService

@Pipe({
  name: 'filterUser',
  pure: false, // Establece pure a false para habilitar la detección de cambios en cada interacción del usuario
})
export class FilterUserPipe implements PipeTransform {
  transform(users: any[], searchText: string): any {
    if (!searchText || !users) {
      return users; // Si no hay texto de búsqueda o no hay usuarios, devuelve todos los usuarios
    }

    searchText = searchText.toLowerCase();

    // Realiza la búsqueda en el array de usuarios
    return users.filter((user: any) => {
      return user.username.toLowerCase().includes(searchText);
    });
  }
}