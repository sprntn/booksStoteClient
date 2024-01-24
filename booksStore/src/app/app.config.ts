import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './services/token.interceptor';
//import { TokenInterceptorService } from './services/token-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch(), withInterceptors([tokenInterceptor]))]
  //providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch())]
  //providers: [provideRouter(routes), provideClientHydration(), provideHttpClient()]
};
