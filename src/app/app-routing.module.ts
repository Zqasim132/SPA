import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { AutoLoginPartialRoutesGuard, AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full', },
  { path: 'callback', component: CallbackComponent, pathMatch: 'full', canActivate: [AutoLoginAllRoutesGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      //initialNavigation: 'enabledBlocking',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
