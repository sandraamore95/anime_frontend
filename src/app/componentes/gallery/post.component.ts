import { Component, ElementRef, Input, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, switchMap, tap } from 'rxjs';
import { FriendService } from 'src/app/services/friend.service';
import { ThemeService } from 'src/app/services/theme.service';
@Component({
  selector: 'app-post-profile',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() user_profile?: any;
  userPosts: any[] = [];
  userLogged: string = '';
  postImages: { [postId: number]: string } = {};
  imageData: string | ArrayBuffer | null = null;
  selectedFile: File | any;
  myForm: FormGroup;
  mostrarFormulario: boolean = false;
  isFriend: boolean = false;

  currentPage = 0; // Página actual
  totalPages = 0; // Número total de páginas
  pageSize = 8; // Tamaño de la página


  constructor(
    private postService: PostService,
    private storageService: StorageService,
    private userService: UserService,
    private formBuilder: FormBuilder, private friendshipService: FriendService,
    public themeService: ThemeService

  ) {
    this.myForm = this.formBuilder.group({
      image: [null],
      textArea: ['', Validators.required],
      textArea2: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.userLogged = this.storageService.getUser().username;
    this.loadPostsAndImages(this.currentPage, this.pageSize);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('user_profile' in changes && this.user_profile) {
      this.loadPostsAndImages(this.currentPage, this.pageSize);
      //this.areFriends(this.user_profile);
    }
  }

  ngOnDestroy() {
    Object.keys(this.postImages).forEach((key: string) => {
      const postId: number = parseInt(key);
      URL.revokeObjectURL(this.postImages[postId]);
    });
  }

  getUserByUsername(username: string): Observable<any> {
    return this.userService.getUserByUsername(username);
  }
  // Función para crear un nuevo post
  createNewPost(user: any, textAreaValue: string, textAreaValue2: string): Observable<number> {
    const post = {
      id: null,
      title: textAreaValue,
      subtitle: textAreaValue2,
      author: user
    };

    return this.postService.createPost(post);
  }
  // Cargar las publicaciones y las imágenes
  loadPostsAndImages(page: number, pageSize: number): void {
    this.postService.getPaginatedPostsByUser(this.user_profile.username, page, pageSize)
      .pipe(
        tap((response: any) => {
          console.log(response);
          this.userPosts = response.content;
          this.totalPages = response.totalPages;
          this.currentPage = page;

          response.content.forEach((post: any) => {
            this.loadPostImage(post.id, this.user_profile.username);
          });
        })
      )
      .subscribe();
  }



  loadPostImage(postId: number, username: string): void {
    this.postService.getuserPostImage(postId, username).subscribe((image: Blob) => {
      const imageUrl = URL.createObjectURL(image);
      this.postImages[postId] = imageUrl;
    });
  }

  // Función para ir a la página siguiente
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadPostsAndImages(this.currentPage, this.pageSize);
    }
  }

  // Función para ir a la página anterior
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPostsAndImages(this.currentPage, this.pageSize);
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageData = reader.result;
        this.selectedFile = file;
      };
    }
  }

  uploadPost(): void {
    const textAreaValue = this.myForm.get('textArea')?.value;
    const textAreaValue2 = this.myForm.get('textArea2')?.value;
    if (this.selectedFile) {
      this.getUserByUsername(this.user_profile.username).pipe(
        switchMap((user: any) => this.createNewPost(user, textAreaValue, textAreaValue2))
      ).subscribe(
        (postId: number) => {
          console.log('Post creado con ID:', postId);
          this.onUpload(this.selectedFile, postId);
          this.myForm.reset();
          this.ocultarAgregarFormulario();
          this.loadPostsAndImages(0, this.pageSize);
        },
        (error) => {
          console.error('Error al crear el post:', error);
        }
      );
    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  }

  onUpload(selectedFile: File, postId: number): void {
    this.postService.uploadImage(selectedFile, postId).subscribe(
      (response) => {
        console.log('Imagen subida exitosamente:', response);
        this.loadPostsAndImages(this.currentPage, this.pageSize);
      },
      error => {
        console.error('Error al cargar la imagen:', error);
      }
    );
  }

  mostrarAgregarFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario; 
  }

  ocultarAgregarFormulario() {
    this.mostrarFormulario = false;
  }


  areFriends(user_profile: any) {
    this.friendshipService.existFriend(user_profile.id).subscribe(response => {
      if (response) {
        this.isFriend = true;
      }

    });
  }

}  
