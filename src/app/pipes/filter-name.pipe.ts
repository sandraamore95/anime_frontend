import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterName'
})
export class FilterNamePipe implements PipeTransform {

  //le pasamos por parametro un array de animes  y la palabra que queremos buscar para ver si esta dentro del array 
  transform(animes: any, filterString: string) {
    if (animes.length === 0 || filterString === '') {
      return animes;
    }

    const animes_search = [];

  
    for (const anime of animes) {
      //comprobacion de si existe el caracter dentro de algun nombre del objeto sacarlo
      
      let name=anime.value.title.toLowerCase(); //EL NOMBRE
      
      if (name.includes(filterString)) { //EL CHAR(STRING)
        animes_search.push(anime);
      }
    }
   return animes_search;
  }
}
