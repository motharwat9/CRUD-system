import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginSuccessGuard: CanActivateFn = (route, state) => {
  
  const router=inject(Router)

  if ('token' in localStorage) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
