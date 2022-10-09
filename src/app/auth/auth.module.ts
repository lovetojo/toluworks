import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    LoginComponent,
    SigninComponent,
    ResetpasswordComponent,
    HomeComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    LoginComponent,
    SigninComponent,
    ResetpasswordComponent,
    LandingComponent,
    HomeComponent,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AuthModule { }
