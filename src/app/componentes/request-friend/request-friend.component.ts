import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Profile } from 'src/app/models/Profile';
import { User } from 'src/app/models/User';
import { FriendService } from 'src/app/services/friend.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-friend',
  templateUrl: './request-friend.component.html',
  styleUrls: ['./request-friend.component.css']
})
export class RequestFriendComponent implements OnInit {


  @Input() user: any;
  isFriend: boolean = false;
  isPending: boolean = false;
  isSender: boolean = false;
  isReceiver: boolean = false;
  isCancel: boolean = false;



  selectedNotification: any;
  notificationsSender: any[] = [];
  userPrincipal: any;
  constructor(
    private storageService: StorageService,
    private friendService: FriendService,
    private notificationService: NotificationService
  ) {

  }
  //username -> principal
  //user -> el del profile que vamos a visitar
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
    console.log(this.userPrincipal);
    console.log(this.user);  // usuario del profile (friend)
if(this.user){
//CHECK ARE FRIENDS ? 
this.friendService.existFriend(this.user.id).subscribe(result => {
  if (result) {
    this.isFriend = true;
    console.log("SON AMIGOS");
  } else {
    console.log("NOOOOO SON AMIGOS");
  }
});

// CHECK PENDING? 
this.friendService.existPending(this.user.id).subscribe(result => {
  this.isPending = result;
  if (result) {
    this.isPending = true;
    console.log("HAY PENDING ");

    //CHECK SENDER 
    this.friendService.getFriendshipRequest(this.user.id).subscribe(
      (sender: User) => {
        if (sender != null) {
          this.isSender = true;
          console.log('el usuario Principal Actua de SENDER en la peticion');
        } else {
          console.log('el usuario Principal NO  Actua de SENDER en la peticion');
        }
      },
      (error) => {
        console.error('Error al obtener el remitente de la solicitud de amistad:', error);
      }
    );

    //CHECK RECEIVER 
    this.friendService.isReceiver(this.user.id).subscribe(result => {
      console.log(result);
      this.isReceiver = result;
      if (this.isReceiver) { 

        console.log("el usuario Principal Actua de RECEIVER en la peticion ");
      } else {
        console.log("el usuario Principal NOOO Actua de RECEIVER en la peticion ");
      }
    });

  } else {
    console.log("NOOOOO HAY PENDING");
  }
});
}

}
    

  //METODOS DE FRIENDS REQUEST


  sendFriendRequest(friendId: number) {
    // Lógica para enviar una solicitud de amistad
    this.friendService.sendRequest(friendId).subscribe(
      response => {
        // Manejo de la respuesta exitosa
        console.log(this.isCancel);
        this.isCancel=true;
        this.isPending = true;
        console.log(this.isSender);
        this.isSender = true;
        console.log('Solicitud de amistad enviada correctamente', response);
      },
      error => {
        // Manejo del error
        console.error('Error al enviar la solicitud de amistad', error);
      }
    );
  }

  acceptFriendRequest(friendId: number) {
    this.friendService.acceptRequest(friendId).subscribe(() => {
      this.isFriend = true;
      this.isPending = false;
    });
  }

  cancelFriendRequest(friendId: number) {
    console.log(this.userPrincipal);
    console.log(friendId);

    this.friendService.cancelRequest(friendId).subscribe(() => {
      if(this.isSender){
        this.isPending=false;
      }
      this.isCancel = false;
    });
  }

  rejectFriendRequest(friendId: number) {
    this.friendService.rejectRequest(friendId).subscribe(() => {
      this.isReceiver = false;this.isPending = false;

    });
  }
  deleteFriend(friendId: number) {
 
  }

}
