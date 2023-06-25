import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/User/user.service';

export const authenticatonGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.isLoggedIn$.value) {
    return true;
  }
  router.navigateByUrl('/authentication/login');
  return false;
};
