import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Profile } from 'src/app/models/Profile';

import { AuthService } from 'src/app/services/authservice.service';
import { AvatarService } from 'src/app/services/avatar-service.service';
import { ProfileService } from 'src/app/services/profile.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  isLoginFailed = false;
  errorMessage = '';
 


  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private profileService: ProfileService, private storageService: StorageService,
    private route: ActivatedRoute, 
    private authService: AuthService, private avatarService:AvatarService,
    private router: Router) {

      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });

  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      // Form is not valid, do not proceed
      return;
    }
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    
    this.authService.login(username, password).subscribe({
      next: user => {
        this.storageService.saveToken(user.token);
        this.storageService.saveUser(user);
        // si el usuario es normal , recuperamos el profile
        console.log(user);
        if (user.roles.includes('ROLE_USER')) {

          this.avatarService.getAvatarUrl(user.username).subscribe(imageURL => {
            this.profileService.getUserProfile(user.username).subscribe((response) => {
              let profile: Profile = {
                id: response.user.id,
                fullName: response.fullName,
                username: response.user.username,
                email:user.email,
                avatar: imageURL,
                FacebookInProfile: response.facebookInProfile,
                InstragramProfile:response.instragramProfile,
                twitterProfile: response.twitterProfile,
                about: response.about
              };
              this.storageService.saveProfile(profile);
              this.storageService.setUserLogged(true);
             
            });
          });
        }
        this.redirectUser(username);
      },
      error: err => {
        this.errorMessage = err.error.message || 'Something went wrong!';
        this.isLoginFailed = true;
        // Manejo de errores al iniciar sesión
      }
    });
  }

  private redirectUser(username: string): void {
    // Obtener la URL de redirección previa
    const previousUrl = this.route.snapshot.paramMap.get('previousUrl');

    // Redirigir al usuario después del inicio de sesión exitoso
    if (previousUrl != null) {
      this.router.navigate([previousUrl]);
    } else {
      // dependiendo si es admin o user estandar 
     
      
      if (this.storageService.getUser().roles.includes('ROLE_ADMIN')){
        this.router.navigate(['/pages/admin-dashboard']);
      }else{
        this.router.navigate(['/pages/profile/' + username]);
      }
    }
  }
  

 
}



