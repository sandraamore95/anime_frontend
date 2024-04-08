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
  existFav$ = new BehaviorSubject<boolean>(false);
  
  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private storageService: StorageService,
    private router: Router,private formBuilder: FormBuilder,private avatarService :AvatarService,
    private favoritePostService:FavoritePostsService ,public themeService: ThemeService , private friendService:FriendService
  ) { }
  
  ngOnInit(): void {
    this.userLogged=this.storageService.getUser();
    this.loadPostData();
    
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
  downloadImage(){
    alert("decargar imagen en local!");
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

  getFollowers(){
    const user=this.userLogged;
    //obtenemos el usuario y ahora sacamos los amigos que tiene

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