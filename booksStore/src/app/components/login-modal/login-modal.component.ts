import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SendIconComponent } from '../../icons/send-icon/send-icon.component';
import { UsersService } from '../../services/users.service';
import { SignupIconComponent } from '../../icons/signup-icon/signup-icon.component';
import { Router } from '@angular/router';
//import { Auth } from '../../interfaces/auth';
//import { AuthV1Service } from '../../services/auth-v1.service';


@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SendIconComponent, SignupIconComponent],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent implements OnInit, AfterViewInit, OnDestroy{
  
  @Output() closeMeEvent = new EventEmitter();
  @Output() succeededEvent = new EventEmitter();
  @Output() redirectToSignupEvent = new EventEmitter();

  public loginForm! : FormGroup;

  @ViewChild('emailInput') emailInputElement!: ElementRef;
  @ViewChild('passwordInput') passwordInputElement!: ElementRef;
  emailPlaceholder = "Email";
  passwordPlaceholder = "Password";
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  public message: string | undefined;
  public isSuccess!: boolean;

  constructor(
    private usersService : UsersService, 
    private renderer: Renderer2, 
    private router: Router, 
    //private authService: Auth
    //private authService: AuthV1Service
    ){}

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
      this.renderer.setAttribute(this.emailInputElement.nativeElement, 'placeholder', this.emailPlaceholder);
      this.renderer.setAttribute(this.passwordInputElement.nativeElement, 'placeholder', this.passwordPlaceholder);
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  anyClick(event: any){
    if(event.target.nodeName === 'SECTION'){
      this.closeMeEvent.emit();
    }
  }

  redirectToSignup(){
    console.log('redirect to signup modal');
    this.redirectToSignupEvent.emit();
  }

  // storeToken(token: string){
  //   console.log("storing token");
    
  //   //localStorage.setItem('jwtToken', token);
  //   this.authService.setToken(token);
  // }

  submitForm(){
    console.log(this.loginForm.value);
    
    //this.usersService.loginUser(this.loginForm.value);

    this.usersService.loginUser(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        //this.storeToken(res.jwtToken);
        // this.authService.setToken(res.jwtToken);
        localStorage.setItem('jwtToken', res.jwtToken);
        this.isSuccess = true;
        this.message = `wellcome back ${res.firstName}`;
        this.router.navigate(['user-page', res])
        setTimeout(() => {
          this.succeededEvent.emit(res.user);
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
    //const email = this.signupForm.value.email ?? "";
    //const password = this.signupForm.value.password ?? "";
  }
}
