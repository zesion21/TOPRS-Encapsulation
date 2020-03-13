import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PopoutComponent } from "./popout/popout.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NzIconModule,
  NzMessageModule,
  NzPaginationModule,
  NzModalModule
} from "ng-zorro-antd";
import { PagingQueryComponent } from "./paging-query/paging-query.component";
@NgModule({
  declarations: [PopoutComponent, PagingQueryComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NzIconModule,
    NzMessageModule,
    NzPaginationModule,
    BrowserAnimationsModule,
    NzModalModule
  ],
  exports: [
    PopoutComponent,
    NzIconModule,
    PagingQueryComponent,
    NzPaginationModule,
    NzModalModule
  ]
})
export class CommonComponentModule {}
