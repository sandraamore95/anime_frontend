import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  response = '';
  constructor(private formBuilder: FormBuilder, 
    private userService: UserService,
    private utilService: UtilsService,
    private snackBar : MatSnackBar
  ) {
    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.utilService.matchPassword('newPassword')]],

    });
  }

 
  onSubmit() {
    const newPassword = this.changePasswordForm.value.newPassword;
    this.userService.changePassword(newPassword)
      .subscribe(
        response => {
          const message = response || 'Contraseña cambiada con éxito';
         this.openSnackBar(message, 'Cerrar');
        },
        error => {
          const errorMessage = error|| 'Error al cambiar la contraseña!';
          this.openSnackBar(errorMessage, 'Cerrar');
        }
      );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Duración en milisegundos
    });
  }
}
