import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RegistrationComponent} from './registration/registration.component';
import {RegistrationRoutingModule} from './registration-routing.module';


@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RegistrationRoutingModule
  ],
  exports: [
    RegistrationComponent,
  ],
  providers: [
  ]
})
export class RegistrationModule { }
