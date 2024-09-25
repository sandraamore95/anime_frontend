import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/models/User';
import { FriendService } from 'src/app/services/friend.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friends-list.component.html', // Asegúrate de que el nombre del archivo sea correcto
  styleUrls: ['./friends-list.component.css']
})
export class FriendRequestComponent implements OnInit {

  @Input() user: any;
  isFriend: boolean = false;
  isPending: boolean = false;
  isSender: boolean = false;
  isReceiver: boolean = false;

  userPrincipal: any;

  constructor(
    private storageService: StorageService,
    private friendService: FriendService
  ) {}

  ngOnInit(): void {
    this.processUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.processUser();
    }
  }

  processUser(): void {
    this.userPrincipal = this.storageService.getUser(); // usuario principal

    if (this.user) {
      // CHECK ARE FRIENDS? 
      this.friendService.existFriend(this.user.id).subscribe(result => {
        this.isFriend = result;
      });

      // CHECK PENDING? 
      this.friendService.existPending(this.user.id).subscribe(result => {
        this.isPending = result;

        // CHECK SENDER 
        if (this.isPending) {
          this.friendService.getFriendshipRequest(this.user.id).subscribe(
            (sender: User) => {
              this.isSender = sender != null; // true si es el remitente
            }
          );

          // CHECK RECEIVER 
          this.friendService.isReceiver(this.user.id).subscribe(result => {
            this.isReceiver = result; // true si es el receptor
          });
        }
      });
    }
  }

  sendFriendRequest(friendId: number) {
    this.friendService.sendRequest(friendId).subscribe(() => {
      this.isPending = true;
      this.isSender = true; // Ahora es el remitente
    });
  }

  acceptFriendRequest(friendId: number) {
    this.friendService.acceptRequest(friendId).subscribe(() => {
      this.isFriend = true;
      this.isPending = false;
    });
  }

  cancelFriendRequest(friendId: number) {
    this.friendService.cancelRequest(friendId).subscribe(() => {
      this.isPending = false;
      this.isSender = false; // Deja de ser el remitente
    });
  }

  rejectFriendRequest(friendId: number) {
    this.friendService.rejectRequest(friendId).subscribe(() => {
      this.isReceiver = false;
      this.isPending = false;
    });
  }
}