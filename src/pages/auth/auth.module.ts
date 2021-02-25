import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AuthRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AuthComponent]
})
export class AuthModule { }
