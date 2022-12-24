import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { StrapiAuthPageRoutingModule } from "./strapi-auth-routing.module";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    IonicModule,
    StrapiAuthPageRoutingModule
  ],
  exports: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class StrapiAuthModule { }
