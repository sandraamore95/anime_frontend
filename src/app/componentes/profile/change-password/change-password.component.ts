import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';
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
    private snackbarService: SnackbarService
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
         this.snackbarService.openSnackBar(message, 'Cerrar');
        },
        error => {
          const errorMessage = error|| 'Error al cambiar la contraseña!';
          this.snackbarService.openSnackBar(errorMessage, 'Cerrar');
        }
      );
  }

 
}
