import { ChangeDetectorRef, Component, ElementRef, OnInit, StateKey, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user_profile: any;
  errorMessage = '';
  uploadImageFailed=false;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private stateService: StateService

  ) {}

  ngOnInit(): void {
   
    this.stateService.userProfile$.subscribe(profile => {
      this.user_profile = profile || this.storageService.getProfile();
      console.log(this.user_profile);
    
    });
    
  
  }
  onImageClick(): void {
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.userService.updateProfileImage(file).subscribe(
        (response) => {
          if (response instanceof Blob) {
            const imageURL = URL.createObjectURL(response);
            this.user_profile.avatar = imageURL;
            // Actualiza el perfil del usuario en el servicio de estado
            this.stateService.updateUserProfile({ ...this.user_profile, avatar: imageURL });
          }
        },
        (error) => {
          console.log('Error updating Profile Picture!')
        }
      );
    }
  }
  
}
