import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }



  notEquals(otherControlName: string) {
    return (control: AbstractControl) => {
      const otherControl = control.root.get(otherControlName);
      return otherControl && control.value !== otherControl.value ? null : { equals: true };
    };
  }

  matchPassword(otherControlName: string) {
    return (control: AbstractControl) => {
      const otherControl = control.root.get(otherControlName);
      if (otherControl) {
        const subscription = otherControl.valueChanges.subscribe(() => {
          control.updateValueAndValidity();
          subscription.unsubscribe();
        });
      }
      return otherControl && control.value === otherControl.value ? null : { mismatch: true };
    };
  }


}
