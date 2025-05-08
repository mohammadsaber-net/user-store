import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const gaurdGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  if (localStorage.getItem("user")) {
    router.navigate(["/product"])
    return false;
  } else {
    return true
  }
};