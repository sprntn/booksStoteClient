import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { emit } from 'process';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private apiURL = environment.baseUrl + 'Users/';

  constructor(private httpClient : HttpClient) { }

  addUser(user: {FirstName: string, LastName: string, Email: string, Password: string}): Observable<boolean>{
  //addUser(user: {FirstName: string, LastName: string, Email: string, Password: string}): void{
    //console.log(`add user: ${{...user}} `);

    //const postUser = {...user, UserId: 0}
    const postUser = {...user};
    console.log(postUser);
    
    return this.httpClient.post<boolean>(this.apiURL + 'signUpUser/', postUser);

    // return this.httpClient.post<boolean>(this.apiURL + 'signUpUser/',{
    //   ...user,
    //   Password: password
    // });//.pipe...
  }

  loginUser(user: {email: string, password: string}): Observable<any> {
  //loginUser(user: {email: string, password: string}): Observable<boolean> {
  //loginUser(user: {email: string, password: string}){
    
    //console.log(user);
    // const loginUser = {
    //   //"userId": 0,
    //   "firstName": "",
    //   "lastName": "",
    //   "email": user.email,
    //   "password": user.password
    //   //"createdAt": "2024-01-03T09:51:05.669Z"
    // }
    return this.httpClient.post<any>(this.apiURL + 'loginUser/', {"Email": user.email, "Password":user.password})
    //return this.httpClient.post<boolean>(this.apiURL + 'loginUser/', {"Email": user.email, "Password":user.password})
    //return this.httpClient.post<boolean>(this.apiURL + 'loginUser/', loginUser);
  }

  test(): Observable<string>{//this is how to get string from api!
    console.log('test user service');
    //return this.http.get(this.apiUrl, { responseType: 'text' });
    //return this.httpClient.get<string>(this.apiURL + 'test', { responseType: 'text' });
    return this.httpClient.get(this.apiURL + 'test', { responseType: 'text' });
  }
  // getStringData(): Observable<string> {
  //   return this.httpClient.get<string>(this.apiURL, { responseType: 'text' });
  // }

  // test2(): void{
  //   this.httpClient.get<string>(this.apiURL + 'test').subscribe(res => console.log(res));
  // }
}
