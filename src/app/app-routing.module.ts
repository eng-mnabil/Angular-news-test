import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import { CreatePostComponent } from './admin-panel/create-post/create-post.component';
import { AuthGuard } from './_services';

import { Role } from './_models';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }},
    { path: 'admin/create', component: CreatePostComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }},
    { path: 'admin/edit/:id', component: CreatePostComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
