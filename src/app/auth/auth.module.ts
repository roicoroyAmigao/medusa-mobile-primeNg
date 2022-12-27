import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { AuthPageRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    IonicModule,
    AuthPageRoutingModule
  ],
  exports: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AuthModule { }
