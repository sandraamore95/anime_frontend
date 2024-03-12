import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimeComponent } from './anime/anime.component';
import { Router, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FilterNamePipe } from '../pipes/filter-name.pipe';
import { MessagesComponent } from './messages/messages.component';
import { ChangeEmailComponent } from './profile/change-email/change-email.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { MenuComponent } from './profile/menu/menu.component';
import {  PostComponent } from './gallery/post.component';
import { CommentComponent } from './comment/comment.component';
import { RequestFriendComponent } from './request-friend/request-friend.component';
import { PersonalDataComponent } from './profile/personal-data/personal-data.component';
import { CharacterComponent } from './anime/character/character.component';
import { RecommendationComponent } from './anime/recommendation/recommendation.component';
import { FilterUserPipe } from '../pipes/filter-user.pipe';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { SimilarsComponent } from './anime/similars/similars.component';
import { VoiceCharacterComponent } from './anime/voice-character/voice-character.component';






@NgModule({
  //componentes que pertenecen al modulo
  declarations: [
     AnimeComponent, SearchComponent, SearchResultsComponent ,FilterNamePipe, MessagesComponent, 
     ChangeEmailComponent, ChangePasswordComponent, MenuComponent, PostComponent,
      CommentComponent, RequestFriendComponent, PersonalDataComponent, CharacterComponent,
       RecommendationComponent,FilterUserPipe, CarrouselComponent, SimilarsComponent, VoiceCharacterComponent// Make sure the pipe is declared here
  
  ],
  //cosas que ncesitamos en este modilo
  imports: [
    CommonModule, RouterModule,FormsModule,ReactiveFormsModule
  ],
  //cosas declaradas en el modulo que se pueden usar fuera
  exports: [
    AnimeComponent,SearchComponent,SearchResultsComponent ,
    MenuComponent,PostComponent,CommentComponent,RequestFriendComponent,CharacterComponent,
    RecommendationComponent,FilterUserPipe,CarrouselComponent,SimilarsComponent,VoiceCharacterComponent
  ]
})
export class ComponentesModule { }
