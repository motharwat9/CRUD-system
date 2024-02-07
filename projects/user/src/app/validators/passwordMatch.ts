import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatch:ValidatorFn = 
   (formGrop:AbstractControl):ValidationErrors | null =>{
      let password=formGrop.get('password');
      let confirmPassword=formGrop.get('confirmPassword');
      if(!password || !confirmPassword || !password.value || !confirmPassword.value){
         return null
      }
      let valErr={'UnmatchedPassword': {'pass': password?.value, 'confrim': confirmPassword?.value}}
      return (password.value === confirmPassword.value)?null :valErr
}