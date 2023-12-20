import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { SignupModalComponent } from '../components/signup-modal/signup-modal.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  private signupComponentRef!: ComponentRef<SignupModalComponent>;
  //private componentRef!: ComponentRef<any>;
  
  private componentSubscriber!: Subject<boolean>;//true if success
  
  constructor() { }

  openSignupModal(entry: ViewContainerRef): Observable<boolean>{
    console.log(`open modal`);

    //this.componentRef = entry.createComponent(SignupModalComponent)
    this.signupComponentRef = entry.createComponent(SignupModalComponent);
    this.signupComponentRef.instance.closeMeEvent.subscribe(() => this.closeModal())
    this.signupComponentRef.instance.succeededEvent.subscribe(() => this.success());

    this.componentSubscriber = new Subject<boolean>();

    return this.componentSubscriber.asObservable();
  }

  success(): void{
    console.log(`successful modal`);
    
    this.componentSubscriber.next(true);
    this.closeModal();
  }

  //closeModal(componentRef: ComponentRef<any>): void{
  closeModal(): void{
    console.log('close');
    
    this.componentSubscriber.complete();
    //componentRef.destroy();
    //this.componentRef.destroy();
    this.signupComponentRef.destroy();
  }
}
