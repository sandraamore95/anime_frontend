import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FollowService } from 'src/app/services/follow.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-follow-user',
  templateUrl: './follow-user.component.html',
  styleUrls: ['./follow-user.component.css']
})
export class FollowUserComponent implements OnInit, OnChanges {
  @Input() user: any;
  loggedUser: any; // Aquí almacenarás el nombre del usuario autenticado
  isFollowing: boolean = false;
  followers: any[] = [];
  following: any[] = [];

  constructor(private followService: FollowService, private storageService: StorageService) {}

  ngOnInit(): void {
    this.loggedUser = this.storageService.getUser();
    this.loadUserData(); // Cargar datos del usuario inicialmente
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Cuando cambie el input "user", recarga los datos
    const userChange = changes['user'];
    if (userChange && userChange.currentValue) {
      this.loadUserData();
    }
  }
  

  loadUserData(): void {
    console.log("Cargando datos para el usuario con ID:", this.user.id);
    this.checkIfFollowing();
    this.loadFollowers(); // Cargar seguidores
    this.loadFollowing(); // Cargar seguidos
  }

  loadFollowers(): void {
    this.followService.getFollowers(this.user.id).subscribe(
      followers => {
        this.followers = followers;
      },
      error => {
        console.error('Error fetching followers:', error);
      }
    );
  }

  loadFollowing(): void {
    this.followService.getFollowing(this.user.id).subscribe(
      following => {
        this.following = following;
      },
      error => {
        console.error('Error fetching following:', error);
      }
    );
  }

  checkIfFollowing(): void {
    this.followService.isFollowing(this.user.id).subscribe(
      result => {
        this.isFollowing = result;
      },
      error => {
        console.error('Error checking if following:', error);
      }
    );
  }

  followUser(userId: number): void {
    this.followService.followUser(userId).subscribe(
      () => {
        this.isFollowing = true;
        this.loadFollowers(); // Actualiza la lista de seguidores
      },
      error => {
        console.error('Error following user:', error);
      }
    );
  }

  unfollowUser(userId: number): void {
    this.followService.unfollowUser(userId).subscribe(
      () => {
        this.isFollowing = false;
        this.loadFollowers(); // Actualiza la lista de seguidores
      },
      error => {
        console.error('Error unfollowing user:', error);
      }
    );
  }
}
