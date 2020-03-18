import { Component, OnInit, ViewChild } from "@angular/core";
import { PagingQueryComponent } from "../common-component/paging-query/paging-query.component";

@Component({
  selector: "app-query-test",
  templateUrl: "./query-test.component.html",
  styleUrls: ["./query-test.component.styl"]
})
export class QueryTestComponent implements OnInit {
  @ViewChild(PagingQueryComponent, { static: true })
  query: PagingQueryComponent;
  constructor() {}

  ngOnInit() {}

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
