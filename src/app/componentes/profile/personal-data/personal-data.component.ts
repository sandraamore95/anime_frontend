import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/Profile';
import { AccountService } from 'src/app/services/account.service';
import { ProfileService } from 'src/app/services/profile.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  personalDataForm: FormGroup;
  isFormSubmitted = false;
  updateProfileResponse: string='';
  updateProfileResponseClass: string = '';
  profile:any;

  constructor(private formBuilder: FormBuilder,private profileService:ProfileService, private storageService:StorageService, private accountService:AccountService) {
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
            this.updateProfileResponse = 'Perfil actualizado exitosamente';
            this.updateProfileResponseClass = 'profile-success';
          },
          (error) => {
            console.log(error);
            this.updateProfileResponse = 'Error al actualizar el perfil';
            this.updateProfileResponseClass = 'profile-error';
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
               window.sessionStorage.removeItem("auth-user");
             },
             error => {
               console.error('Error al enviar la solicitud de eliminación de cuenta:', error);
               alert('Error al enviar la solicitud de eliminación de cuenta. Por favor, inténtalo de nuevo más tarde.');
             }
           );
       }
    }


