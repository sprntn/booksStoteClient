import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendIconComponent } from "../../icons/send-icon/send-icon.component";
import { LoginIconComponent } from "../../icons/login-icon/login-icon.component";
import { UsersService } from '../../services/users.service';
import { ValidatorService } from '../../services/validator.service';

@Component({
    selector: 'app-signup-modal',
    standalone: true,
    templateUrl: './signup-modal.component.html',
    styleUrl: './signup-modal.component.scss',
    imports: [CommonModule, ReactiveFormsModule, SendIconComponent, LoginIconComponent]
})
//export class SignupModalComponent implements OnInit{
export class SignupModalComponent implements OnInit, AfterViewInit, OnDestroy{

  public title: string = "signup"
  @Output() closeMeEvent = new EventEmitter();
  @Output() succeededEvent = new EventEmitter();
  @Output() redirectToLoginEvent = new EventEmitter();
  public message: string | undefined;
  public isSuccess!: boolean;

  @ViewChild('firstNameInput') firstNameInputElement!: ElementRef;
  @ViewChild('lastNameInput') lastNameInputElement!: ElementRef;
  @ViewChild('emailInput') emailInputElement!: ElementRef;
  @ViewChild('passwordInput') passwordInputElement!: ElementRef;
  @ViewChild('confirmPasswordInput') confirmPasswordInputElement!: ElementRef;
  
  firstNamePlaceholder = "First Name";
  lastNamePlaceholder = "Last Name";
  emailPlaceholder = "Email";
  passwordPlaceholder = "Password";
  confirmPasswordPlaceholder = "Confirm Password";

  // signupForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   //email: new FormControl('', this.validatorService.isValidEmail()),
  //   //email: new FormControl('', this.validatorService.testError()),
  //   email: new FormControl(''),
  //   //confirmEmail: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  // },{
  //   //validators: this.validatorService.passwordMatch
  //   //validators: this.validatorService.valuesMatch("password","confirmPassword")
  // });
  
  public signupForm! : FormGroup;

  private nameMaxLength:number = 50;
  private nameMinLength:number = 4;
  private passwordMaxLength:number = 255;
  private passwordMinLength:number = 8;

  //constructor(private usersService : UsersService, private formBuilder: FormBuilder, private validatorService: ValidatorService){}
  constructor(private usersService : UsersService, private validatorService: ValidatorService, private renderer: Renderer2){}
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.setPlaceholder);
  }
  
  ngAfterViewInit(): void {
    this.setPlaceholder()

    window.addEventListener('resize', () => {this.setPlaceholder()});
  }
  
  private setPlaceholder(): void{
    if (window.innerWidth <= 780){
      console.log('small screen');
      this.renderer.setAttribute(this.firstNameInputElement.nativeElement, 'placeholder', this.firstNamePlaceholder);
      this.renderer.setAttribute(this.lastNameInputElement.nativeElement, 'placeholder', this.lastNamePlaceholder);
      this.renderer.setAttribute(this.emailInputElement.nativeElement, 'placeholder', this.emailPlaceholder);
      this.renderer.setAttribute(this.passwordInputElement.nativeElement, 'placeholder', this.passwordPlaceholder);
      this.renderer.setAttribute(this.confirmPasswordInputElement.nativeElement, 'placeholder', this.confirmPasswordPlaceholder);
    }
  }

  ngOnInit(): void {
     this.initializeForm();
  }

  initializeForm(): void{
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required, 
        Validators.minLength(this.nameMinLength),
        Validators.maxLength(this.nameMaxLength)
      ]),
      lastName: new FormControl('', [
        Validators.required, 
        Validators.minLength(this.nameMinLength),
        Validators.maxLength(this.nameMaxLength)
      ]),
      email: new FormControl('', [Validators.required, this.validatorService.isValidEmail()]),
      password: new FormControl('', [
        Validators.required, 
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength),
        this.validatorService.isStrengthPassword()
      ]),
      confirmPassword: new FormControl('', Validators.required)
    },{
      validators: this.validatorService.confirmMatch()
    })
  }

  // initializeForm(): void{
  //   this.signupForm = this.formBuilder.group({
  //     firstName: new FormControl(''),
  //     lastName: new FormControl(''),
  //     email: new FormControl('', this.validatorService.testError()),
  //     password: new FormControl(''),
  //     confirmPassword: new FormControl(''),
  //   },
  //   // {
  //   //   validators: [this.validatorService.test2fieldsError(), this.validatorService.passwordMatch("","")] 
  //   // }
  //   );
  // }
  
  //constructor(private usersService : UsersService, private validatorService: ValidatorService) {}

  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }
  //get confirmPassword() { return this.signupForm.get('confirmPassword'); }

  redirectToLogin() {
    console.log('redirect to login modal');
    this.redirectToLoginEvent.emit();
  }

  anyClick(event: any){
    if(event.target.nodeName === 'SECTION'){
      this.closeMeEvent.emit();
    }
  }

  submitForm(){
    console.log('ok click');
    console.log(this.signupForm.value);
    
    const firstName = this.signupForm.value.firstName ?? "";
    const lastName = this.signupForm.value.lastName ?? "";
    const email = this.signupForm.value.email ?? "";
    const password = this.signupForm.value.password ?? "";

    this.usersService.addUser({FirstName:firstName, LastName: lastName, Email: email, Password: password}).subscribe({
      next: (res) => {
        console.log(res);
        this.isSuccess = true;
        this.message = "success";
        setTimeout(() => {
          this.succeededEvent.emit();
        }, 7000);
      },
      error: (err) => {
        console.log(err);
        this.isSuccess = false;
        this.message = err.error;
        setTimeout(() => {
          this.message = undefined;
        },7000);
      },
      complete: () => {}
    })
    // let x: string;
    // x = this.signupForm.get('firsrName')?.value;

    //this.usersService.addUser(this.signupForm.value);
    // this.usersService.test().subscribe((res: String) => {
    //   //this.message = "test message!!!!!!!!!!"
    //   console.log(res);
      
    // })

    // this.usersService.test().subscribe({
    //   next: (res) => {
    //     this.message = res; 
    //     setTimeout(() => {
    //       this.succeededEvent.emit();
    //     }, 3000);
    //   },
    //   error: () => {},
    //   complete: () => {}
    // });
    // console.log('close');
    // console.log(this.signupForm.value);
    
    // this.message = "test message!!!!!!!!!!"
    // setTimeout(() => {
    //   //this.message = undefined;
    //   this.succeededEvent.emit();
    // }, 3000);
    
    // this.succeededEvent.emit();
  }
}
