import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from 'src/app/services/anime.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StorageService } from 'src/app/services/storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Anime } from 'src/app/models/Anime';

@Component({
  selector: 'app-detallevillager',
  templateUrl: './detalleanime.component.html',
  styleUrls: ['./detalleanime.component.css']
})
export class DetalleanimeComponent {
  existFav$: Observable<boolean>;
  private existFavSubject: BehaviorSubject<boolean>;
  anime: any;

  constructor(private route: ActivatedRoute,
    private ApiService: ApiService,
    private storageservice: StorageService,
    private r: Router,
    private sanitizer: DomSanitizer) {
    this.existFavSubject = new BehaviorSubject<boolean>(this.existFav);
    this.existFav$ = this.existFavSubject.asObservable();
  }

  isLoggedIn = false;
  existFav = false;
  videoUrl: SafeResourceUrl | undefined;
  showVideo = false;

  toggleVideo(): void {
    this.showVideo = !this.showVideo;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageservice.isLoggedIn();
    // Inicializa el BehaviorSubject con el valor inicial de existFav
    this.existFavSubject = new BehaviorSubject<boolean>(this.existFav);
    // Convierte el BehaviorSubject en un observable
    this.existFav$ = this.existFavSubject.asObservable();
    this.route.params.subscribe(params => {
      let animeId = params['id'];
      // Resto del código para cargar datos según el nuevo animeId
      console.log("el ID es " + animeId);
      this.loadAnime(animeId);


    });

  }
  loadAnime(animeId: number): void {
    this.ApiService.getAnimeById(animeId).subscribe(
      (anime: any) => {
        this.anime = anime.data;
        console.log(anime.data);
        if (anime.data.trailer.embed_url != null) {
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(anime.data.trailer.embed_url);
        }
        const anime_new: any = { malId: this.anime.mal_id };
        //esto solo sucede si el usuario esta logeado
        if (this.isLoggedIn == true) {
          this.checkIfAnimeExists(anime_new).subscribe(result => {
            if (result) {
              console.log(result);
              this.existFav = true;
              this.existFavSubject.next(true);
            }else{
              this.existFav = false;
              this.existFavSubject.next(false);
            }
          });
        }
      }
    );
  };


  toggleFavorites(): void {
    if (this.existFav) {
      this.eliminarFavoritos();
    } else {
      // Lógica para agregar amigo
      this.agregarFavoritos();
    }
  }

  agregarFavoritos() {
    if (!this.isLoggedIn) {
      this.r.navigate(['auth/login', { previousUrl: 'pages/detalle/' + this.anime.mal_id }]);
    } else {
      // Verifica si el usuario autenticado no tiene el rol de administrador
      if (!this.storageservice.getUser().roles.includes('ROLE_ADMIN')) {
        // Crea un objeto de modelo Anime
        const anime_new: Anime = { malId: this.anime.mal_id };
        this.ApiService.guardarAnime(anime_new).subscribe(
          (response) => {
            this.existFav = true;
            this.existFavSubject.next(true);
            console.log('Anime guardado con éxito', response);
          },
          (error) => {
            console.error('Error al guardar el Anime', error);
            // Maneja errores de acuerdo a tus necesidades
          }
        );
      } else {
        // Muestra un mensaje o realiza alguna acción específica para administradores
        console.log('Los administradores no pueden agregar animes a su lista personal.');
      }
    }
  }
  
 

  

  eliminarFavoritos() {
    const anime_new: Anime = { malId: this.anime.mal_id };
    this.ApiService.eliminarAnime(anime_new).subscribe(
      (response) => {
        this.existFav = false;
        this.existFavSubject.next(false);
        console.log('Anime eliminado con éxito', response);
      },
      (error) => {
        console.error('Error al eliminar el Anime', error);
      }
    );

  }
  checkIfAnimeExists(anime: Anime): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.ApiService.existAnimeFav(anime).subscribe(result => {
        if (result) {
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      });
    });
  }

}

