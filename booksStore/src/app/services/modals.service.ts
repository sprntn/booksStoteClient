import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { SignupModalComponent } from '../components/signup-modal/signup-modal.component';
import { Observable, Subject } from 'rxjs';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  private signupComponentRef!: ComponentRef<SignupModalComponent>;
  
  private loginComponentRef!: ComponentRef<LoginModalComponent>;
  //private componentRef!: ComponentRef<any>;
  
  private componentSubscriber!: Subject<any>;//true if success
  //private componentSubscriber!: Subject<boolean>;//true if success
  //private loginComponentSubscriber!: Subject<string>;//true if success
  
  constructor() { }
  //constructor(private viewContainerRef: ViewContainerRef) { }
  
  // openModal(modalType: string) {
  //   console.log(`open modal ${modalType}`);
    
  //   let component;
  //   switch(modalType){
  //     case 'login':
  //       component = this.viewContainerRef.createComponent(LoginModalComponent);
  //   }
  //   component?.instance.closeMeEvent.subscribe(() => this.closeModal());
  //   component?.instance.succeededEvent.subscribe(() => this.success());
  // }

  //openLoginModal(entry: ViewContainerRef): Observable<boolean> {
  //openLoginModal(entry: ViewContainerRef): Observable<any> {
  openLoginModal(entry: ViewContainerRef): Observable<string> {
    console.log('open logi modal');
    
    this.loginComponentRef = entry.createComponent(LoginModalComponent);
    this.loginComponentRef.instance.closeMeEvent.subscribe(() => this.closeModal(this.loginComponentRef));
    this.loginComponentRef.instance.succeededEvent.subscribe((user) => this.successLogin(this.loginComponentRef, user));
    this.loginComponentRef.instance.redirectToSignupEvent.subscribe(() => {
      this.closeModal(this.loginComponentRef);
      this.openSignupModal(entry);
    });

    this.componentSubscriber = new Subject<string>();

    return this.componentSubscriber.asObservable();
  }

  openSignupModal(entry: ViewContainerRef): Observable<boolean>{
    console.log(`open modal`);

    //this.componentRef = entry.createComponent(SignupModalComponent)
    this.signupComponentRef = entry.createComponent(SignupModalComponent);
    this.signupComponentRef.instance.closeMeEvent.subscribe(() => this.closeModal(this.signupComponentRef));
    this.signupComponentRef.instance.succeededEvent.subscribe(() => this.success(this.signupComponentRef));
    this.signupComponentRef.instance.redirectToLoginEvent.subscribe(() => {
      this.closeModal(this.signupComponentRef);
      this.openLoginModal(entry);
    });

    this.componentSubscriber = new Subject<boolean>();

    return this.componentSubscriber.asObservable();
  }

  //success(): void{
  success(componentRef: ComponentRef<any>): void{
    console.log(`successful modal`);
    
    this.componentSubscriber.next(true);//insteade pass the logged user, after that it's needed to redirect to user page
    //this.closeModal();
    this.closeModal(componentRef);
  }

  successLogin(componentRef: ComponentRef<any>, user: any): void{
    console.log(`successful modal`);
    console.log(`user received by modal service: ${JSON.stringify(user)}`);
    
    this.componentSubscriber.next(user.firstName);//insteade pass the logged user, after that it's needed to redirect to user page
    //this.closeModal();
    this.closeModal(componentRef);
  }

  closeModal(componentRef: ComponentRef<any>): void{
  //closeModal(): void{
    console.log('close');
    
    this.componentSubscriber.complete();
    componentRef.destroy();
    //this.componentRef.destroy();
    //this.signupComponentRef.destroy();
  }
}
