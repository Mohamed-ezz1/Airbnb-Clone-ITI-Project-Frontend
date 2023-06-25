import { CanActivateFn } from '@angular/router';

export const authenticatonGuard: CanActivateFn = (route, state) => {
  return true;
};
