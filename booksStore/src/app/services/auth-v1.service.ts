import { Injectable } from '@angular/core';
import { Auth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthV1Service implements Auth{

  constructor() { }
  getToken(): string {
    return localStorage.getItem('jwtToken') ?? "";
  }
  setToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }
  clearToken(): void {
    localStorage.removeItem("jwtToken");
  }
}
