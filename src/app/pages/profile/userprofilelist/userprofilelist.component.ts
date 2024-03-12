import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { FilterUserPipe } from 'src/app/pipes/filter-user.pipe';
import { AccountService } from 'src/app/services/account.service';
import { AvatarService } from 'src/app/services/avatar-service.service';
import { ProfileService } from 'src/app/services/profile.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userprofilelist',
  templateUrl: './userprofilelist.component.html',
  styleUrls: ['./userprofilelist.component.css'],
  providers: [FilterUserPipe],
 
})
export class UserprofilelistComponent implements OnInit {

  searchHolder:string='search User...'
  users: any[] = [];
  modoAdministrador: boolean = false;

  search: string = '';
  userLogged:string='';

  // Nueva propiedad para el paginador
  pageSizeOptions: number[] = [5, 10];
  pageSize: number = 10;
  pageIndex: number = 0;
  totalUsers: number = 0;
  
   constructor(private userService: UserService, private storageService:StorageService, private avatarService:AvatarService, private accountService:AccountService
    ) {
  
  }

  ngOnInit(): void {
    if(this.storageService.getUser().roles=='ROLE_ADMIN'){
      this.modoAdministrador=true;
    }
    this.loadUsersPaginated();
    this.userLogged=this.storageService.getUser().username;
  }

  onSearchQueryChanged(query: string): void {
    this.search = query;
  }

  loadUsersPaginated(): void {
    this.userService.getAllUsers().pipe(
      switchMap((users: any[]) => {
        // Paginación
        const startIndex = this.pageIndex * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        const paginatedUsers = users.filter((user: any) => user.username !== this.userLogged && !user.roles.some((role: any) => role.name === 'ROLE_ADMIN'))
          .slice(startIndex, endIndex);
        this.totalUsers = users.length; // Total de usuarios sin paginación
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
  
  

  
  onPageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsersPaginated();
  }

  editarUsuario(user: any) {
    // Lógica para editar usuario
  }

  eliminarUsuario(user: any) {
  
    console.log(user);
     this.accountService.deleteAccount(user.email)
       .subscribe(
         () => {
           alert('Se ha eliminado correctamente el usuario');
           this.loadUsersPaginated();
         },
         error => {
           console.error('Error al enviar la solicitud de eliminación de cuenta:', error);
         
         }
       );
   }



  }








