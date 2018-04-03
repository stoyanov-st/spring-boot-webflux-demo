import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {ProfileService} from "./profile.service";
import {ProfileComponent} from "./profile/profile.component";

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [ProfileComponent],
  providers: [ProfileService]
})
export class UserModule { }
