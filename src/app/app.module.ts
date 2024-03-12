import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './componentes/header/header.component';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatIconModule} from '@angular/material/icon'
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { FooterComponent } from './componentes/footer/footer.component';
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { authInterceptorProviders } from './services/auth.interceptor';
import { StorageService } from './services/storage.service';
import { AuthGuard } from './guards/auth.guard';

import { FilterUserPipe } from './pipes/filter-user.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { } from '@angular/material/';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,FooterComponent
   
   
  ],
  imports: [
 
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
    RouterModule,
   
  
   
  ],  //INTERCEPTOR HTTP REQUEST
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
