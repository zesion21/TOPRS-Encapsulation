import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NzMessageService, NzModalService } from "ng-zorro-antd";

@Component({
  selector: "paging-query",
  templateUrl: "./paging-query.component.html",
  styleUrls: ["./paging-query.component.styl"]
})
export class PagingQueryComponent implements OnInit {
  @Input() condition: any;
  @Output() conditionChange = new EventEmitter();
  @Input() queryUrl: string;
  @Input() deleteUrl: string;
  @Output() result = new EventEmitter();
  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}
  bufferConditon: object;
  ngOnInit() {
    this.bufferConditon = JSON.parse(JSON.stringify(this.condition));
  }
  reset(): any {
    this.condition = JSON.parse(JSON.stringify(this.bufferConditon));
    this.conditionChange.emit(this.condition);
  }
  query() {
    this.http.post(this.queryUrl, this.condition).subscribe(
      res => {
        if (res["status"] == 100) {
          this.result.emit(res["data"]);
        } else this.message.error(res["reason"]);
      },
      error => {
        this.message.error("服务器错误！");
      }
    );
  }
  pageIndexChange(val, key) {
    key = key || "pageIndex";
    this.condition[key] = val;
    this.query();
  }
  pageSizeChange(val, key) {
    key = key || "pageSize";
    this.condition[key] = val;
    this.query();
  }

  /**
   *@param "id:删除的id,title：显示标题"
   */
  itemDel(id, title?) {
    title = title || "确认删除该条记录吗？";
    this.modal.confirm({
      nzTitle: title,
      nzOkText: "确认",
      nzCancelText: "取消",
      nzOnOk: () => {
        this.http.get(this.deleteUrl + id).subscribe(
          res => {
            if (res[status] == 100) {
              this.message.success("删除成功");
              this.query();
            } else this.message.error(res["reason"]);
          },
          error => {
            this.message.error("服务器错误");
          }
        );
      }
    });
  }
}
