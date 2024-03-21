import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterLink } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let IsloggedIn=sessionStorage.getItem("sessionID");
  const _router=inject(Router)
  if(IsloggedIn=='false'){
    alert("Please login! redirect to loginpage");
    _router.navigate(["login"]);
  }
  return true;
};
