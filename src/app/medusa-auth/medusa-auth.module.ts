import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { MedusaAuthPageRoutingModule } from "./medusa-auth-routing.module";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    IonicModule,
    MedusaAuthPageRoutingModule
  ],
  exports: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class MedusaAuthModule { }
