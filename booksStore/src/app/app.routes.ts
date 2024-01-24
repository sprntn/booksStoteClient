import { Routes } from '@angular/router';
import { UserPageComponent } from './components/user-page/user-page.component';
import { NoUserPageComponent } from './components/no-user-page/no-user-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: 'user-page',title: "choose a book",component: UserPageComponent, canActivate: [authGuard]},
    //{path: 'user-page',title: "choose a book",component: UserPageComponent},
    {path: 'no-user-page', component: NoUserPageComponent},
    {path: '', redirectTo: '/no-user-page', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];
