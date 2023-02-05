import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthConfigModule } from '../Service/auth-config.module';
import { CallbackComponent } from './callback/callback.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AppComponent, CallbackComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, AuthConfigModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
