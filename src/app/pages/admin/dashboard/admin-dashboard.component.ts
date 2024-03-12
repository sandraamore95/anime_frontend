import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { UserprofilelistComponent } from '../../profile/userprofilelist/userprofilelist.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent extends UserprofilelistComponent {

  //CRUD DE USUARIOS Y PODER EDITAR ELEIMINAR AÑADIR
  content?: string;
  isLoggedIn = false;




}
