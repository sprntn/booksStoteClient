import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  
  constructor() { }

  isValidEmail(){
    return (control:AbstractControl) : ValidationErrors | null =>{
      const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(control.value)) {
        return { 'invalidEmail': true };
      }
      return null;
    }
  }

  isStrengthPassword(){
    return (control:AbstractControl) : ValidationErrors | null =>{
      //test
      //return {passwordStrengthError:true};

      const password = control.value;

      const hasCapitalLetter = /[A-Z]/.test(password);
      const hasSmallLetter = /[a-z]/.test(password);
      const hasDigit = /\d/.test(password);
      const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

      //test
      //console.log(`has capital: ${hasCapitalLetter}\nhas small letter: 
      //${hasSmallLetter}\n has digit: ${hasDigit} \n has special: ${hasSpecialCharacter}`);
      

      const invalid = !hasCapitalLetter || !hasSmallLetter || !hasDigit || !hasSpecialCharacter;
      //console.log(`invalid password: ${invalid}`);
      

      //return invalid? null: {passwordStrengthError:true};
      return invalid? {passwordStrengthError:true} : null;
    }
  }

  // myvalidator(): ValidatorFn {
  //   return (control:AbstractControl) : ValidationErrors | null => {
  //     //control.get('password')?.value == control.get('confirmPassword')?.value ? console.log('yes') : console.log('no');
      
  //     const password = control.get('password')?.value;
  //     const confirmPassword = control.get('confirmPassword')?.value;
  //     if(password === confirmPassword){
  //       return {passwordmatcherror : true};
  //     }
  //     return null;
  //   }
  // }

  confirmMatch(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      //control.get('password')?.value == control.get('confirmPassword')?.value ? console.log('yes') : console.log('no');
      
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      //console.log(password, confirmPassword);
      
      if(password !== confirmPassword){
        //return {passwordmatcherror : true};
        control.get('confirmPassword')?.setErrors({passwordmatcherror : true});
        //console.log(control.get('confirmPassword'));
      }
      return null;
    }
  }

  // passwordMatch(password: string, confirmPassword: string){
  //   return(formGroup: FormGroup)=>{
  //     if(formGroup.controls[password].value !== formGroup.controls[confirmPassword].value){
  //       formGroup.controls[confirmPassword].setErrors({ passwordMismatch: true });
  //     }
  //     else{
  //       formGroup.controls[confirmPassword].setErrors(null);
  //     }
  //   } 
  // }
}
