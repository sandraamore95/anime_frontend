import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  isChangePassw = false;
  response = '';
  constructor(private formBuilder: FormBuilder, private userService: UserService,private utilService: UtilsService) {
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
          this.isChangePassw= true;
      this.response=response;
        },
        error => {
          console.error( error); this.isChangePassw= true;
          this.response =  'Error al cambiar la contraseña!';
         
        }
      );
  }
}
