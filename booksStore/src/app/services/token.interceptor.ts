import { HttpInterceptorFn } from '@angular/common/http';
//import { AuthV1Service } from './auth-v1.service';
//import { Inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  //authService = Inject(AuthV1Service);
  // const authService = Inject(AuthV1Service);
  // const x = authService.getToken();
  // console.log(`x; ${x}`);
  //const authService = Inject(AuthV1Service);
  //console.log(authService);
  //let a = authService.getToken();
  
  
  //const authService = Inject(AuthV1Service);
  //const authService: AuthV1Service = new AuthV1Service;  

  //const token = localStorage.getItem("jwtToken");
  // if(token){
  //   const clonedReq = req.clone({
  //     headers: req.headers.set("Authorization", "Bearer " + token)
  //   });
  //   console.log(`req with token: ${clonedReq}`);
  //   return next(clonedReq);
  // }

  console.log(req);
  
  // console.log(`req with no token: ${JSON.stringify(req)}`);
  try{
    //console.log(authService.getToken() ?? "not working");
    
    const token = localStorage.getItem("jwtToken");
    console.log("token found");
    console.log(token);

    const clonedReq = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + token)
    });
    //const req2 = req.clone({headers: req.headers.set("Test", "Bearertest: tokentest")})
    //console.log(req2);
    
    console.log(clonedReq);
    
    //return next(req);
    return next(clonedReq);
    
  }catch{
    console.log("not found");
    return next(req);
  }
  
  // console.log("req with no token");
  // console.log(req);
  
  // return next(req);
};
