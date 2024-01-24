import { Injectable } from '@angular/core';
import { Auth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthV1Service implements Auth{

  constructor() { }
  getToken(): string {
    throw new Error('Method not implemented.');
  }
  setToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }
  clearToken(): void {
    throw new Error('Method not implemented.');
  }
}
