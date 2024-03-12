import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authservice.service'; 
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder,private authService: AuthService, private router:Router,
     private profileService: ProfileService) {
      this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });

     }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      // Form is not valid, do not proceed
      return;
    }
  
    const username = this.registerForm.get('username')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    this.authService.register(username, email, password).subscribe({
      next: user => {
        //CREACION PROFILE USER
        this.crearPerfil(user);
        this.isSuccessful = true;
        this.isSignUpFailed = false;this.router.navigate(['/auth/login']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
  crearPerfil(user:any) {
    console.log(user);
    this.profileService.addProfile(user).subscribe(
      (response) => {
        console.log('Perfil creado exitosamente', response); 
      },
      (error) => {
        console.error('Error al crear el perfil', error);
      }
    );
  }
 
  
}

