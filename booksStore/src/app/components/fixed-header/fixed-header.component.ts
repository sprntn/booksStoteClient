import { AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, Subscription, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ModalsService } from '../../services/modals.service';
import { LogoutIconComponent } from '../../icons/logout-icon/logout-icon.component';
import { LoginIconComponent } from '../../icons/login-icon/login-icon.component';
import { SignupIconComponent } from '../../icons/signup-icon/signup-icon.component';
import { MenuIconComponent } from '../../icons/menu-icon/menu-icon.component';
import { CloseMenuIconComponent } from '../../icons/close-menu-icon/close-menu-icon.component';
import { AccountIconComponent } from "../../icons/account-icon/account-icon.component";
import { ShowMoreIconComponent } from "../../icons/show-more-icon/show-more-icon.component";
import { ShowLessIconComponent } from "../../icons/show-less-icon/show-less-icon.component";
import { CategoriesIconComponent } from "../../icons/categories-icon/categories-icon.component";
//import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { CategoryBtnComponent } from "../category-btn/category-btn.component";
import { ReloadBooksSubjectService } from '../../services/reload-books-subject.service';
import { Category } from '../../models/category';
//import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-fixed-header',
    standalone: true,
    templateUrl: './fixed-header.component.html',
    styleUrl: './fixed-header.component.scss',
    imports: [
        ReactiveFormsModule,
        LogoutIconComponent,
        LoginIconComponent,
        SignupIconComponent,
        MenuIconComponent,
        CloseMenuIconComponent,
        AccountIconComponent,
        ShowMoreIconComponent,
        ShowLessIconComponent,
        CategoriesIconComponent,
        CategoryBtnComponent,
        CommonModule
    ]
})
export class FixedHeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('formModal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;
  public isUserLogged: boolean = false;
  public isOpenMenu = false;
  public isAccountMenuOpen = false;
  public isCategoriesMenuOpen = false;

  categories$!: Observable<Category[]>;

  //message: string | undefined ;
  searchControl = new FormControl('');

  // @ViewChild('headerElement', { static: true })
  // headerElement!: ElementRef;
  @ViewChild('headerElement') headerElement!: ElementRef;
  @Output() heightChanged: EventEmitter<number> = new EventEmitter();

  //height!:number;

  constructor(
    private modalsService: ModalsService, 
    private booksService: BooksService,
    private reloadBooksSubject: ReloadBooksSubjectService){}
  
  // ngAfterContentInit(): void {
  //   console.log(this.headerElement);
  //   const height = this.headerElement.nativeElement.offsetHeight;
  //   console.log('header height ', height);
  //   //this.heightChanged.emit(height);
  //   //window.addEventListener('resize', () => this.heightChanged.emit(height));
  // }

  ngAfterViewInit(): void {
    console.log(this.headerElement);
    const height = this.headerElement.nativeElement.offsetHeight;
    console.log('header height ', height);
    this.heightChanged.emit(height);
    //window.addEventListener('resize', () => this.heightChanged.emit(height));
  }
  
  ngOnDestroy(): void {
    console.log('on destroy!');
    
  }
  // ngOnDestroy(): void {
  //   window.removeEventListener('resize', this.updatePaddingHeight);
  // }
  
  ngOnInit(): void {
    console.log('initial categories');
    this.categories$ = this.booksService.getCategories();

    //this.categories$.subscribe(categories => console.log(categories));
    
    // this.searchControl.valueChanges.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged()

    // ).subscribe(v => console.log(v));
  }

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
      //this.message = `wellcome ${res}`
      this.isUserLogged = true;
    })
    //this.isUserLogged = true;//test!!!
    // this.sub = this.modalsService.openLoginModal(this.entry).subscribe(res => {
    //   console.log(`res: ${res}`);
      
    // })
  }

  logOut() {
    console.log('log out!!!');
    this.isUserLogged = false;
    //this.message = undefined;

    //clean token
    localStorage.removeItem("jwtToken");
  }
    
  toggleMenu(){
    this.isOpenMenu = !this.isOpenMenu;
  }

  toggleCategories(){
    this.isCategoriesMenuOpen = !this.isCategoriesMenuOpen;
  }

  toggleAccount(){
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  handleCategorySelected(categoryId: number) {
    console.log(`searching for ${categoryId} id category`);
    
    //call books page to reload books
    //this.reloadBooksSubject.loginSubject$.next({});
    this.reloadBooksSubject.reloadSubject$.next({categoryId: categoryId, searchKey: ""});
  }
}
