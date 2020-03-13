import { Component, ViewChild } from "@angular/core";
import { PagingQueryComponent } from "./common-component/paging-query/paging-query.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.styl"]
})
export class AppComponent {
  @ViewChild(PagingQueryComponent, { static: true })
  query: PagingQueryComponent;
  title = "fz-demo-e";
  isShow = false;
  data: any = {};
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.query.query();
  }
  condition = {
    pageNum: 1,
    pageSize: 1,
    title: "",
    date: ""
  };
}
