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
  
  private componentSubscriber!: Subject<boolean>;//true if success
  
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

  openLoginModal(entry: ViewContainerRef): Observable<boolean> {
    console.log('open logi modal');
    
    this.loginComponentRef = entry.createComponent(LoginModalComponent);
    this.loginComponentRef.instance.closeMeEvent.subscribe(() => this.closeModal(this.loginComponentRef));
    this.loginComponentRef.instance.succeededEvent.subscribe(() => this.success(this.loginComponentRef));
    this.loginComponentRef.instance.redirectToSignupEvent.subscribe(() => {
      this.closeModal(this.loginComponentRef);
      this.openSignupModal(entry);
    });

    this.componentSubscriber = new Subject<boolean>();

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
    
    this.componentSubscriber.next(true);
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
