import { Routes } from '@angular/router';
import { UserPageComponent } from './components/user-page/user-page.component';
import { NoUserPageComponent } from './components/no-user-page/no-user-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';
import { BooksPageComponent } from './components/books-page/books-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';

export const routes: Routes = [
    //{path: 'user-page',title: "choose a book",component: UserPageComponent, canActivate: [authGuard]},
    //{path: 'user-page',title: "choose a book",component: UserPageComponent},
    //{path: 'no-user-page', component: NoUserPageComponent},
    {path: 'books-page', component: BooksPageComponent},
    {path: 'admin-page', component: AdminPageComponent},
    {path: 'login-admin', component: LoginAdminComponent},
    //{path: '', redirectTo: '/no-user-page', pathMatch: 'full'},
    {path: '', redirectTo: '/books-page', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];
