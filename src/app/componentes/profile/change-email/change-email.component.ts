import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent {
  changeEmailForm: FormGroup;
  response = '';
  constructor(private formBuilder: FormBuilder, private userService: UserService,private utilService: UtilsService,
    private storageService:StorageService,
    private snackbarService: SnackbarService) {
    this.changeEmailForm = this.formBuilder.group({
  
      newEmail: ['', [Validators.required, Validators.minLength(8)]],
      confirmEmail: ['', [Validators.required, this.utilService.matchPassword('newEmail')]],

    });
  }


  ngOnInit(): void {
    console.log(this.storageService.getProfile());
  }

  
  onSubmit() {
  
    const newEmail = this.changeEmailForm.value.newEmail;
    this.userService.changeEmail(newEmail)
    .subscribe(
        response => {
          const message = response || 'Email cambiado con éxito';
          this.snackbarService.openSnackBar(message, 'Cerrar');
           
            // Obtener el usuario del servicio de almacenamiento
            let profile = this.storageService.getProfile();
            
            // Actualizar el email del usuario
            profile.email = newEmail;
            
            // Actualizar el usuario en el servicio de almacenamiento
            this.storageService.saveProfile(profile);
            console.log(this.storageService.getProfile()); //esto me funciona bien
        },
        error => {
            console.error(error);
            const message = error.error || '  Error al cambiar el email!';
            this.snackbarService.openSnackBar(message, 'Cerrar');
        }
);    }}
  

