import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
//import { Router } from 'express';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const protectedRoutes : String[] = ['/user-page'];
  if(!protectedRoutes.includes(state.url)){
    console.log("allowed route");
    
    return true;
  }
  let token: string | null;
  try {
    token = localStorage.getItem("jwtToken");
  } catch (error) {
    token = null;
    // console.log("redirect to home page");
    // router.navigate(['/']);
  }
  //check token validation
  if(!token){
    console.log("redirect to home page");
    
    router.navigate(['/']);
  }
  return true;
  

  //return protectedRoutes.includes(state.url) && !token ? router.navigate(['/']) : true;
  // return !protectedRoutes.includes(state.url) || token
  
  //return false;
};
