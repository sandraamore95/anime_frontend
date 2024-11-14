import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-forget-passw',
  templateUrl: './forget-passw.component.html',
  styleUrls: ['./forget-passw.component.css']
})
export class ForgetPasswComponent {
  forgotPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private accountService:AccountService) {

     this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
   }

  ngOnInit(): void {
   
  }
  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      // Lógica para enviar solicitud de restablecimiento de contraseña al servidor
      console.log('Forgot password request submitted for email:', email);
      
        this.accountService.forgotPassword(email).subscribe(
          response => {
            alert('Se ha enviado el enlace de restablecimiento de contraseña:'+ response);
            // Aquí puedes mostrar un mensaje de éxito al usuario
          },
          error => {
            console.error('Error al enviar el enlace de restablecimiento de contraseña:', error);
            // Aquí puedes mostrar un mensaje de error al usuario
          }
        );
    }
  
}}