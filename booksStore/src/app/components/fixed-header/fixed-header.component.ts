import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalsService } from '../../services/modals.service';
import { LogoutIconComponent } from '../../icons/logout-icon/logout-icon.component';
import { LoginIconComponent } from '../../icons/login-icon/login-icon.component';
import { SignupIconComponent } from '../../icons/signup-icon/signup-icon.component';
import { MenuIconComponent } from '../../icons/menu-icon/menu-icon.component';
import { CloseMenuIconComponent } from '../../icons/close-menu-icon/close-menu-icon.component';


@Component({
  selector: 'app-fixed-header',
  standalone: true,
  imports: [LogoutIconComponent , LoginIconComponent, SignupIconComponent, MenuIconComponent, CloseMenuIconComponent],
  templateUrl: './fixed-header.component.html',
  styleUrl: './fixed-header.component.scss'
})
export class FixedHeaderComponent {

  @ViewChild('formModal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;
  public isUserLogged: boolean = false;
  public openMenu = false;

  message: string | undefined ;

  constructor(private modalsService: ModalsService){}

  openSignupModal() {
    console.log('open sign up modal!!');

    this.sub = this.modalsService.openSignupModal(this.entry).subscribe(res => {
      console.log(`res == ${res}`);//true or false
    });
  }

  // openModal(modalType: string){
  //   // this.sub = this.modalsService.openModal(this.entry).subscribe(res => {
  //   //   console.log(res);
      
  //   // })
  // }

  openLoginModal() {
    console.log('open login modal!!!');
    this.sub = this.modalsService.openLoginModal(this.entry).subscribe(res => {
      console.log(res);
      this.message = `wellcome ${res}`
    })
    //this.isUserLogged = true;//test!!!
    // this.sub = this.modalsService.openLoginModal(this.entry).subscribe(res => {
    //   console.log(`res: ${res}`);
      
    // })
  }

  logOut() {
    console.log('log out!!!');
    this.isUserLogged = false;
    this.message = undefined;
  }
    
  openCloseMenu(){
    this.openMenu = !this.openMenu;
  }
}
