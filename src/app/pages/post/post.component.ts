import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from 'src/app/services/anime.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StorageService } from 'src/app/services/storage.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { AvatarService } from 'src/app/services/avatar-service.service';
import { FavoritePostsService } from 'src/app/services/favorite-posts.service';
import { ThemeService } from 'src/app/services/theme.service';
import { FriendService } from 'src/app/services/friend.service';
import { HttpClient } from '@angular/common/http';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  post: any;
  imageUrl: string = '';
  isuserPrincipal: boolean = false;
  userLogged:any;
  user_post_avatar:string='';
  editPostForm!: FormGroup;
  mostrarFormulario: boolean = false;
  isFormSubmitted: boolean = false;
  followers:number=0;
  existFav$ = new BehaviorSubject<boolean>(false);
  userRole:string='';
  
  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private storageService: StorageService,
    private router: Router,private formBuilder: FormBuilder,private avatarService :AvatarService,
    private favoritePostService:FavoritePostsService ,private storageservice:StorageService,public themeService: ThemeService , private followService:FollowService,private http: HttpClient
  ) { }
  
  ngOnInit(): void {
    this.userLogged=this.storageService.getUser();
    this.loadPostData();
    this.userRole=this.storageservice.getUserRole();
    console.log(this.userRole);
  }

  mostrarAgregarFormulario() {
    this.mostrarFormulario = true;
  }

  ocultarAgregarFormulario() {
    this.mostrarFormulario = false;
  }

  loadPostData() {
    const postIdString = this.route.snapshot.paramMap.get('id');
    let postId;
    
    if (postIdString ) {
      postId = parseInt(postIdString);
      this.postService.getPostById(postId).subscribe(
        (post) => {
          console.log(post);
          this.getProfileImageByUserPost(post.author.username);
          this.post = post;this.editPostForm = this.formBuilder.group({
            title: [this.post.title],
            subtitle: [this.post.subtitle],
          });
          this.isuserPrincipal = this.post.author.id === this.userLogged.id;
          console.log('Publicación obtenida:', this.post);
          this.getFollowers();
          this.checkIfFavorite();
          this.postService.getuserPostImage(post.id, this.post.author.username).subscribe((image: Blob) => {
            this.imageUrl = URL.createObjectURL(image);
          });
        },
        (error) => {
          console.error('Error al obtener la publicación:', error);
        }
      );
    }
  }

  //el usuario Principal || ADMIN puede eliminar el post entero
  deletePost(post: any) {
    this.postService.eliminarPost(post.id,post.author.username).subscribe(
      (response) => {
        console.log('Post eliminado correctamente', response);
        this.router.navigateByUrl(`/pages/profile/${this.post.author.username}`);
      },
      (error) => {
        console.error('Error al eliminar el post', error);
        // Manejar errores aquí
      }
    );
  }

  getProfileImageByUserPost(username:string){
    console.log(username);
    this.avatarService.getAvatarUrl(username).subscribe(response=>{
      this.user_post_avatar=response;
    });
    
  }


  eliminarPost(post:any){
    this.deletePost(post);
  };
  
  downloadImage() {
    this.http.get(this.imageUrl, { responseType: 'blob' }).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'image.jpg'; // Nombre del archivo de la imagen que se descargará
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error al descargar la imagen', error);
    });
  }
 

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.editPostForm.invalid) {
      return;
    }
    const formData = this.editPostForm.value;
    const postData = {
      title:formData.title,
      subtitle:formData.subtitle
    };
    this.postService.updatePost(this.post.id,postData).subscribe(
      (newPost) => { 
        this.editPostForm.reset();
        this.ocultarAgregarFormulario();
        this.loadPostData();

      },
      (error) => {
        console.log(error);

      }
    );
  }
  
  
  checkIfFavorite() {
    this.favoritePostService.isFavorite(this.post.id).subscribe(isFav => {
      this.existFav$.next(isFav);
    });
  }

  getFollowers() {
    // Verifica que existe un usuario asociado al post
    if (this.post && this.post.author && this.post.author.id) {
      const userId = this.post.author.id;
  
      // Llama al servicio getFollowers con userId
      this.followService.getFollowers(userId).subscribe(
        (followers: any[]) => {
          console.log(followers.length);
          this.followers = followers.length; // Actualiza la cantidad de seguidores
        },
        error => {
          console.error("Error al obtener seguidores:", error);
        }
      );
    } else {
      console.error("No se pudo obtener el ID del usuario del post");
    }
  }
  

  toggleFavorites() {
    const currentValue = this.existFav$.value;
    if (currentValue) {
      // Lógica para quitar de favoritos
    this.remove();
  
    } else {
    this.save();
    }
  }

  save(){
    const favoritePost = {
      user: { id: this.storageService.getUser().id }, //deserializacion
      post: { id: this.post.id }
    };
    console.log(favoritePost);
    this.favoritePostService.addFavoritePost(favoritePost)
    .subscribe(
      response => {
        this.existFav$.next(true); // Actualizar el estado
        console.log('Favorite post added successfully', response);
      },
      error => {
        console.error('Error adding favorite post', error);
      }
    );
  }


  remove(){
    this.favoritePostService.removeFavorite(this.post.id).subscribe(() => {
      this.existFav$.next(false); // Actualizar el estado
    });
  }

  

}