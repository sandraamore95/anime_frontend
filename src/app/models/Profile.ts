import { SafeResourceUrl } from "@angular/platform-browser";

export interface Profile {
    id: number;
    fullName: string;
    username:string;
    email:string;
    avatar: string  | SafeResourceUrl;
    FacebookInProfile: string;
    twitterProfile: string;
    InstragramProfile:string;
    about: string;
  }