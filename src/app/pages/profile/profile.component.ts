import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { Profile } from 'src/app/models/Profile';
import { User } from 'src/app/models/User';
import { FilterUserPipe } from 'src/app/pipes/filter-user.pipe';
import { AvatarService } from 'src/app/services/avatar-service.service';
import { FriendService } from 'src/app/services/friend.service';
import { ProfileService } from 'src/app/services/profile.service';
import { StorageService } from 'src/app/services/storage.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [FilterUserPipe]
})
export class ProfileComponent implements AfterViewInit ,OnInit{
  searchHolder: string = 'search User...'
  search: string = '';
  user: any;
  userlogged: any;
  friends: any[] = [];
  profile: any;
  users: any[] = [];
  showAllUsers: boolean = true;


  
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private friendService: FriendService, private avatarService: AvatarService,
    private profileService: ProfileService, 
    private filteredUserPipe: FilterUserPipe, 
    private cd: ChangeDetectorRef,public themeService: ThemeService
  ) {

  }
ngOnInit(): void {
  this.user=this.storageService.getUser();
}
  
  toggleTheme() {
    this.themeService.toggleTheme();
  }
  // LOGICA PARA LA BARRA BUSCADORA !!
  onSearchQueryChanged(query: string): void {
    this.search = query;

    // Tomar solo los primeros 5 resultados
    this.users = this.users.slice(0, 5);
    this.showAllUsers = this.users.length > 5;
  }


  toggleShowAllUsers(): void {
    this.showAllUsers = !this.showAllUsers;
    this.users = this.showAllUsers ? this.users : this.users.slice(0, 5);
  }
  ngAfterViewInit(): void {
    this.userlogged = this.storageService.getUser();
    this.loadUsers();
    this.loadUserData();
    this.getFriends();
  }


  loadUsers() {
    this.userService.getAllUsers().pipe(
      switchMap((users: any[]) => {
        const paginatedUsers = users.filter((user: any) => user.username !== this.userlogged.username && !user.roles.some((role: any) => role.name === 'ROLE_ADMIN'))
        const userObservables: Observable<any>[] = paginatedUsers.map((user: any) => {
          return this.avatarService.getAvatarUrl(user.username).pipe(
            map((avatarURL: string) => ({
              ...user,
              avatar: avatarURL
            })),
            catchError(() => of({ ...user, avatar: null }))
          );
        });
        return forkJoin(userObservables);
      })
    ).subscribe((usersWithAvatars: any[]) => {
      this.users = usersWithAvatars;
    });
  }

  addAvatarToUser(user: any): Observable<any> {
    return this.avatarService.getAvatarUrl(user.username).pipe(
      map(avatarURL => ({ ...user, avatar: avatarURL })),
      catchError(() => of({ ...user, avatar: null }))
    );
  }

  //load data de  usuarios randoms que no son PRINCIPAL users
  loadUserData(): void {
    this.route.params.subscribe(params => {
      let username_param = params['username'];
      this.userService.getUserByUsername(username_param).subscribe(
        (user: User) => {

          //cargamos el perfil 
          this.profileService.getUserProfile(username_param).subscribe(
            (data) => {
              this.profile = data; console.log(this.profile); 
              this.avatarService.getAvatarUrl(this.profile.user.username).subscribe((avatarURL: string) => {
                // Asigna la URL del avatar a la propiedad 'avatar' en el objeto 'profile'
                this.profile.avatar = avatarURL;
                this.user = user;
              });

            },
            (error) => {
              console.error('Error al obtener el perfil', error);
            }
          );
        }
      );

    });
  }
  getFriends() {
    console.log(this.user);
    this.friendService.getFriends(this.user.username).subscribe(
      (friends: any[]) => {
        // Iterar sobre la lista de amigos
        friends.forEach((friend: any) => {
          // Obtener la imagen de avatar para cada amigo
          this.avatarService.getAvatarUrl(friend.username).subscribe(
            (avatarURL: string) => {
              friend.avatar = avatarURL;
            }
          );
        });
        this.friends = friends; console.log(this.friends);
      }
    );
  }

 
}