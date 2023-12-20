import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalsService } from '../../services/modals.service';


@Component({
  selector: 'app-fixed-header',
  standalone: true,
  imports: [],
  templateUrl: './fixed-header.component.html',
  styleUrl: './fixed-header.component.scss'
})
export class FixedHeaderComponent {

  @ViewChild('formModal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;
  public isUserLogged: boolean = false;

  constructor(private modalsService: ModalsService){}

  openSignupModal() {
    console.log('open sign up modal!!');

    this.sub = this.modalsService.openSignupModal(this.entry).subscribe(res => {
      console.log(`res == ${res}`);//true or false
    });
  }

  openLoginModal() {
    console.log('open login modal!!!');
    this.isUserLogged = true;//test!!!
  }

  logOut() {
    console.log('log out!!!');
    this.isUserLogged = false;
  }
    
}
