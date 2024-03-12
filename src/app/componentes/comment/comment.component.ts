import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Observable, map } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AvatarService } from 'src/app/services/avatar-service.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{
  @Input() post: any;
  userComments: any[] = [];
  myForm: FormGroup;
  imageUrl: string = '';
  userlogged:any;


  constructor(
    private commentService: CommentService,
    private storageService: StorageService,
    private userService: UserService, private avatarService:AvatarService,
  ) {
    this.myForm = new FormGroup({
      commentText: new FormControl('')
    });
  }
  ngOnInit(): void {
    this.userlogged=this.storageService.getUser();
    console.log(this.userlogged);
    console.log(this.post.author.username);
    this.loadComments();
  }

  //recibimos el post del componente padre,  para sacar los comentarios 
  loadComments() {
    this.commentService.getCommentByPostId(this.post.id).subscribe(
      (comments) => {
        this.userComments = comments;
        this.userComments.forEach(comment => {
          this.loadCommentAvatar(comment);
        });
      }
    );
  }
  loadCommentAvatar(comment: any) {
    this.avatarService.getAvatarUrl(comment.author.username).subscribe(url => {
      comment.author = { ...comment.author, avatarUrl: url };
    });
  }
 

  
  deleteComment(comment: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
      this.commentService.eliminarComment(comment.id).subscribe(
        () => this.loadComments(),
        (error) => console.error('Error al eliminar el comentario', error)
      );
    }
  }


  addcomment() {
    const newComment = {
      text:  this.myForm.get('commentText')?.value,
      author: { id: this.storageService.getUser().id }, // el author es el usuario autenticado (principal)
      post: { id: this.post.id }
    };
    this.commentService.createComment(newComment).subscribe(
      (response) => {
        ;
        this.loadComments();
        console.log('Comentario creado ', response);
        this.myForm.reset();
      },
      (error) => {
        console.error('Error al crear el comentario', error);
        // Manejar errores aquí
      }
    );

  }

}
