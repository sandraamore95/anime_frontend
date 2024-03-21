import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css']
})
export class NotificationPanelComponent implements OnInit {
  notifications: any[] = [];
  paginatedNotifications: any[] = [];
  currentPage = 1;
  notificationsPerPage = 10;
  totalNotifications = 0;
  pages: number[] = [];

  constructor(private notificationService: NotificationService, private router: Router) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationService.getAllNotificationsByUser("receiver").subscribe(
      (notifications: any[]) => {
        this.notifications = notifications;
        this.totalNotifications = notifications.length;
        this.setupPagination();
        this.paginateNotifications();
      }
    );
  }

  paginateNotifications(): void {
    const startIndex = (this.currentPage - 1) * this.notificationsPerPage;
    const endIndex = startIndex + this.notificationsPerPage;
    this.paginatedNotifications = this.notifications.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginateNotifications();
  }

  setupPagination(): void {
    this.pages = Array.from({ length: Math.ceil(this.totalNotifications / this.notificationsPerPage) }, (_, i) => i + 1);
  }

  
  redirectTo(notification: any) {
    this.notificationService.setSelectedNotification(notification);
    if (notification.dtype === "Notification") {
      const username = notification.sender.username;
      this.router.navigate(['/pages/profile/', username]);
    } else {
      // Redirigir a la página del post y eliminar la notificación
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

}