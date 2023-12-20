import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendIconComponent } from "../../icons/send-icon/send-icon.component";
import { LoginIconComponent } from "../../icons/login-icon/login-icon.component";

@Component({
    selector: 'app-signup-modal',
    standalone: true,
    templateUrl: './signup-modal.component.html',
    styleUrl: './signup-modal.component.scss',
    imports: [CommonModule, ReactiveFormsModule, SendIconComponent, LoginIconComponent]
})
//export class SignupModalComponent implements OnInit{
export class SignupModalComponent{
  
  public title: string = "signup"
  @Output() closeMeEvent = new EventEmitter();
  @Output() succeededEvent = new EventEmitter();

  signupForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    //confirmEmail: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  //public signupForm! : FormGroup;

  //constructor(private formBuilder: FormBuilder){}
  // ngOnInit(): void {
  //   //this.initializeForm();
  //   //this.signupForm = new FormGroup({});
  // }

  // initializeForm(): void{
  //   this.signupForm = this.formBuilder.group({});
  // }
  
  submitForm() {
    console.log('submit event');
    
  }

  anyClick(event: any){
    if(event.target.nodeName === 'SECTION'){
      this.closeMeEvent.emit();
    }
  }
  ok(){
    console.log('close');
    console.log(this.signupForm.value);
    

    
    this.succeededEvent.emit();
  }
}
