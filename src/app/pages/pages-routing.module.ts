import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleanimeComponent } from './anime/detalleanime/detalleanime.component';
import { NormalGuard } from '../guards/normal.guard';
import { AdminGuard } from '../guards/admin.guard';
import { HomeComponent } from './home/home.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin/dashboard/admin-dashboard.component';
import { FavoritosComponent } from './anime/favoritos/favoritos.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../guards/auth.guard';
import { ChangeEmailComponent } from '../componentes/profile/change-email/change-email.component';
import { ChangePasswordComponent } from '../componentes/profile/change-password/change-password.component';
import { MenuComponent } from '../componentes/profile/menu/menu.component';

import { PostComponent } from './post/post.component';
import { PersonalDataComponent } from '../componentes/profile/personal-data/personal-data.component';
import { CharacterDetalleComponent } from './anime/character-detalle/character-detalle.component';
import { UserprofilelistComponent } from './profile/userprofilelist/userprofilelist.component';
import { ForgetPasswComponent } from './account/forget-passw/forget-passw.component';
import { FavoritePostsComponent } from './favorite-posts/favorite-posts.component';
import { ResetPasswComponent } from './account/reset-passw/reset-passw.component';




const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'detalle/:id',
    component: DetalleanimeComponent,
  },
  {
    path: 'detalleCharacter/:id',
    component: CharacterDetalleComponent,
  },
  {
    path: 'user-dashboard',  // esta es una pagina qeu obtendra los datos dl user, favoritos anime, amigos que se podra acceder al perfil
    component: UserDashboardComponent,
    canActivate:[AuthGuard,NormalGuard],
    children: [
      { path: '', redirectTo: 'resetPassw', pathMatch: 'full' },
      { path: 'resetPassw', component: ChangePasswordComponent },
      { path: 'resetEmail', component: ChangeEmailComponent },
      { path: 'personalInfo', component: PersonalDataComponent },
      // Agrega más rutas según sea necesario
    ]
   
    //canActivate:[NormalGuard]
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate:[AuthGuard,AdminGuard]
    //canActivate:[AdminGuard]
  },
  {
    path: 'forgot-password',
    component: ForgetPasswComponent,
  },
  {
    path: 'reset-passw',
    component: ResetPasswComponent,
  },
  {
    path: 'favorites/:username',
    component: FavoritosComponent,
    canActivate:[AuthGuard]

  },
  {
    path: 'favorites-posts/:username',
    component: FavoritePostsComponent,
    canActivate:[AuthGuard]

  },
  {
    path: 'post/:id',
    component: PostComponent,
    canActivate:[AuthGuard]

  },
  {
    path: 'profile/:username',
    component: ProfileComponent,
    canActivate:[AuthGuard]
  }
  ,
  {
    path: 'user-list',
    component: UserprofilelistComponent,
    canActivate:[AuthGuard]
   
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
