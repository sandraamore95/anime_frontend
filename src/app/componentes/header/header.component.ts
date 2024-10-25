import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/authservice.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StateService } from 'src/app/services/state.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;

  user: any;
  user_profile: any;

  isAdmin: boolean = false;
  isUser: boolean = false;
  image: string | null = null; // Define la propiedad
  notifications: any[] = [];
  navLinksHidden: boolean = true;
  private notificationSubscription: Subscription = new Subscription;


  constructor(
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService,
    private stateService: StateService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    console.log("Inicializando HeaderComponent...");
    this.storageService.userLogged$.subscribe(user => {
      this.isLoggedIn = !!user; // Verificar si hay usuario
      this.user = this.storageService.getUser();
      console.log(this.user);

      if (this.isLoggedIn) {
        this.isUser = this.user.roles.includes('ROLE_USER');
        this.isAdmin = this.user.roles.includes('ROLE_ADMIN');

        if (this.isUser) {
          console.log("estamos aqui");
          console.log(this.user);
          this.stateService.userProfile$.subscribe(profile => {
            console.log('Perfil desde StateService:', profile);
            console.log('Perfil desde localStorage:', this.storageService.getProfile().avatar); this.image = this.storageService.getProfile().avatar;
            this.user_profile = profile || this.storageService.getProfile(); // Actualiza el perfil
          

        });
        this.notificationSubscription = this.notificationService.notificationDeleted$.subscribe(deletedNotificationId => {
          // Actualizar la lista de notificaciones eliminando la notificación correspondiente
          this.notifications = this.notifications.filter(notification => notification.id !== deletedNotificationId);
        });

          this.getNotifications();
        }
      } else {
        // Si no está logueado, limpia el usuario y los estados
        this.isUser = false;
        this.isAdmin = false;
      }
    });
  }

  logout(): void {
    console.log("Vamos a cerrar sesión");
    this.storageService.logout();
    this.isLoggedIn = false; // Actualiza el estado
    this.isUser = false; // Actualiza el estado
    this.isAdmin = false; // Actualiza el estado
    this.router.navigate(['/auth/login']);
  }




  getNotifications(): void {
    //obtenemos las notificaciones del user logged
    this.notificationService.getAllNotificationsByUser("receiver").subscribe(
      (notifications: any[]) => {
        this.notifications = notifications;
        console.log(notifications.length);
      }
    );
  }


  redirectTo(notification: any) {
    this.notificationService.setSelectedNotification(notification);
    if (notification.dtype === "Notification") {
      const username = notification.sender.username;
      this.router.navigate(['/pages/profile/', username]);
    } else {
      // Redirigir a la página del post y eliminar la notificación
      console.log(notification);
      const username = notification.comment.post.author.username;

      // Eliminar la notificación antes de redirigir
      this.notificationService.deleteNotification(notification.id).subscribe(
        (deletedNotification: any) => {
          console.log("Notificación eliminada:", deletedNotification);
          // Redirigir a la página del post
          this.router.navigate(['/pages/post/', notification.comment.post.id]);
        },
        (error) => {
          console.error("Error al eliminar la notificación:", error);
        }
      );
    }
  }



  ngOnDestroy(): void {
    // Desuscribirse al destruir el componente
    this.notificationSubscription.unsubscribe();
  }


}


