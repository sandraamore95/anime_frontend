import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { FavoritePostsService } from 'src/app/services/favorite-posts.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-favorite-posts',
  templateUrl: './favorite-posts.component.html',
  styleUrls: ['./favorite-posts.component.css']
})
export class FavoritePostsComponent implements OnInit{

username:string='';
favoritePosts: any[] = [];

constructor(private favoritePostService:FavoritePostsService, private route: ActivatedRoute,private postService:PostService){
  
}
ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.username = params['username'];
    this.getFavoritePosts(this.username);
  });
}


getFavoritePosts(username: string): void {
  this.favoritePostService.getFavoritePostsByUsername(username).subscribe(
    (favoritePosts) => {
      this.favoritePosts = favoritePosts;
      const getImageUrlsObservables = this.favoritePosts.map(post => {
        return this.getImageUrl(post.post.id, post.post.author.username);
      });

      forkJoin(getImageUrlsObservables).subscribe((imageUrls: string[]) => {
        this.favoritePosts.forEach((post, index) => {
          post.imageUrl = imageUrls[index]; // Asignar la URL de la imagen al post
        });
      });
    }
  );
}



getImageUrl(postId: number, username: string): Observable<string> {
  return this.postService.getuserPostImage(postId, username).pipe(
    map((image: Blob) => URL.createObjectURL(image))
  );
}




}
