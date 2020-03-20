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
import { MapComponent } from "./map/map.component";
import { DataGetTestComponent } from "./data-get-test/data-get-test.component";
import { QueryTestComponent } from "./query-test/query-test.component";

import { NzDatePickerModule, NzSliderModule } from "ng-zorro-antd";
registerLocaleData(zh);
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DataGetTestComponent,
    QueryTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonComponentModule,
    NzDatePickerModule,
    NzSliderModule,
    FormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {}
