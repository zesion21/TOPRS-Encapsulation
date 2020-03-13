import { BrowserModule } from "@angular/platform-browser";
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommonComponentModule } from "./common-component/common-component.module";

import { NZ_I18N, zh_CN } from "ng-zorro-antd";
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";
import { FormsModule } from "@angular/forms";
registerLocaleData(zh);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonComponentModule,
    FormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {}