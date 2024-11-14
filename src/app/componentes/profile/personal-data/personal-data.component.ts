import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';
import { Profile } from 'src/app/models/Profile';
import { AccountService } from 'src/app/services/account.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  personalDataForm: FormGroup;
  isFormSubmitted = false;
  profile:any;

  constructor(private formBuilder: FormBuilder,private profileService:ProfileService,
     private storageService:StorageService, private accountService:AccountService,
     private snackbarService: SnackbarService) {
    this.profile=this.storageService.getProfile();
    this.personalDataForm = this.formBuilder.group({
      fullName: [this.profile.fullName],
      facebookUrl: [this.profile.FacebookInProfile],
      twitterUrl: [this.profile.twitterProfile],
      instagramUrl: [this.profile.InstragramProfile],
      about: [this.profile.about]
    });
    };

    ngOnInit(): void {
      this.profile=this.storageService.getProfile();
      console.log();
    }


    onSubmit() {
    
        this.isFormSubmitted = true;
    
        if (this.personalDataForm.invalid) {
          return;
        }
    
        const formData = this.personalDataForm.value;
        const profileData = {
          fullName: formData.fullName,
          facebookInProfile: formData.facebookUrl,
          twitterProfile: formData.twitterUrl,
          instragramProfile: formData.instagramUrl,
          about: formData.about
        };

        this.profileService.updateProfile(profileData).subscribe(
          (profile) => {
            let updatedProfile: Profile = { ...profile, avatar: this.profile.avatar };

            // Guardar el nuevo perfil en el servicio de almacenamiento
            this.storageService.saveProfile(updatedProfile);

            // Actualiza la sesión en el servicio que almacena el perfil
            this.profile = updatedProfile; 
            const message = 'Perfil actualizado exitosamente';
            this.snackbarService.openSnackBar(message, 'Cerrar');
            
          },
          (error) => {
            console.log(error);
            const message = 'Error al actualizar Perfil';
            this.snackbarService.openSnackBar(message, 'Cerrar');
         
          }
        );
      }


      deleteAccount() {
        let user_email=this.storageService.getProfile().email;
        console.log(user_email);
         this.accountService.deleteAccount(user_email)
           .subscribe(
             () => {
               alert('Se ha enviado un correo electrónico de confirmación. Por favor, revisa tu bandeja de entrada.');
               //ahora se tiene que cerrar la sesion 
               this.storageService.logout();
             },
             error => {
               console.error('Error al enviar la solicitud de eliminación de cuenta:', error);
               alert('Error al enviar la solicitud de eliminación de cuenta. Por favor, inténtalo de nuevo más tarde.');
             }
           );
       }
    }


