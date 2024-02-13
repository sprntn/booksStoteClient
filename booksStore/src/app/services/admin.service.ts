import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  

  private apiURL = environment.baseUrl + 'Admin/';

  constructor(private httpClient : HttpClient) { }

  login(admin: {email: string, password: string}) :Observable<Boolean>{
    console.log(admin);
    
    return this.httpClient.post<boolean>(`${this.apiURL}login`, {"Email": admin.email, "Password":admin.password})
  }
}
