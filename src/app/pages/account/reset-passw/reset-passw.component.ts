import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-reset-passw',
  templateUrl: './reset-passw.component.html',
  styleUrls: ['./reset-passw.component.css']
})
export class ResetPasswComponent implements OnInit {
  token: string | null = null;
  isValidToken:boolean=false;
  resetPasswordForm: FormGroup;
  constructor(private route: ActivatedRoute,private accountService:AccountService, private formBuilder: FormBuilder,
    private router: Router 
  ) { 
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Recoger el token y el nombre de usuario de la URL
    this.route.queryParamMap.subscribe(params => {
     this.token= params.get('token') ;
    if (this.token !== null) { 
      this.validateToken(this.token);
    }
    });
  }

  validateToken(token: string): void {
    this.accountService.validateToken(token).subscribe(
      isValid => {
        this.isValidToken = isValid;
        console.log("el token ES VALIDO");
        if (!isValid) {
          // Manejar el caso en que el token no sea válido
          console.log('El token no es válido');
        }
      },
      error => {
        // Manejar cualquier error que ocurra al validar el token
        console.error('Error al validar el token:', error);
      }
    );
  }

  resetPassword(): void {
    if (this.isValidToken && this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.value.newPassword;
      console.log(newPassword);
      //llamar al endpoint una vez tenemos el token validado!
      if (this.token !== null) { 
        this.accountService.resetPassword(this.token,newPassword)
        .subscribe(
          response => {
            alert(response);
            this.router.navigate(['/login']); 
            // Aquí puedes manejar la respuesta del backend según sea necesario
          },
          error => {
            console.error('Error al restablecer la contraseña', error);
            // Aquí puedes manejar cualquier error que ocurra al llamar al endpoint
          }
        );

      }
      



      
    }
  }
}
