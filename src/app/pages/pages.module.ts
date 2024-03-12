import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from '../componentes/componentes.module';
import { DetalleanimeComponent } from './anime/detalleanime/detalleanime.component';
import { FilterNamePipe } from '../pipes/filter-name.pipe';
import { AdminDashboardComponent } from './admin/dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { HomeComponent } from './home/home.component';
import { FavoritosComponent } from './anime/favoritos/favoritos.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { FilterUserPipe } from '../pipes/filter-user.pipe';
import { CharacterDetalleComponent } from './anime/character-detalle/character-detalle.component';
import { UserprofilelistComponent } from './profile/userprofilelist/userprofilelist.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ForgetPasswComponent } from './account/forget-passw/forget-passw.component';
import { FavoritePostsComponent } from './favorite-posts/favorite-posts.component';
import { ResetPasswComponent } from './account/reset-passw/reset-passw.component';




@NgModule({
  declarations: [HomeComponent, AdminDashboardComponent,UserDashboardComponent,DetalleanimeComponent, FavoritosComponent, ProfileComponent, 
    PostComponent, CharacterDetalleComponent, UserprofilelistComponent, ForgetPasswComponent, FavoritePostsComponent, ResetPasswComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentesModule,MatPaginatorModule
  
    

  ],
  //cosas declaradas en el modulo que se pueden usar fuera
  exports: [

  ]

})
export class PagesModule { }
