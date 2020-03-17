import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Component({
  selector: "app-data-get-test",
  templateUrl: "./data-get-test.component.html",
  styleUrls: ["./data-get-test.component.styl"]
})
export class DataGetTestComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDataCenter();
    this.getShijingData();
  }
  DataCenter = [];
  getDataCenter() {
    const condition = {
      image_filter: {
        image_type: 101,
        start_time: "2019-03-17 00:00:00",
        end_time: "2020-3-17 23:59:59",
        sat_ids: [1001, 1002, 1003]
      },
      query: {
        projection: "EPSG:4326",
        polygon: [
          { x: 106.413574, y: 38.376115 },
          { x: 111.730957, y: 38.376115 },
          { x: 111.730957, y: 40.212441 },
          { x: 106.413574, y: 40.212441 },
          { x: 106.413574, y: 38.376115 }
        ]
      }
    };
    this.http
      .post(
        "https://api.siweiearth.com/seis/v3/api/image_query",
        JSON.stringify(condition),
        {
          params: {
            op: "polygon_select",
            access_token: "9277ff7eef009cc136b6d242f35a674b"
          }
        }
      )
      .subscribe(res => (this.DataCenter = res["result"].item_list));
  }

  shijing = [];
  getShijingData() {
    this.http
      .get("http://api.spaceview.com/wss/search", {
        params: {
          request: "searchimage",
          layer: "1",
          mode: "attr",
          channel: "513",
          cloudcover: "-10000,10",
          bandtype: "0",
          producttype: "0",
          productlevel: "0",
          satviewangle: "-10000,10",
          resolution: "0,60",
          time: "2019-03-17 00:00:00,2020-03-17 23:59:59",
          category: "01;03;ALOS2;CSKS2;Deimos 2;GF1;GF1B",
          output: "json",
          datatype: "attr",
          geometry:
            "POLYGON((106.413574 38.376115,111.730957 38.376115,111.730957 40.212441,106.413574 40.212441,106.413574 38.376115))",
          page_no: " 0",
          page_size: " 100",
          v: "2"
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .subscribe(res => (this.shijing = res["result"]["attrs"]));
  }
}
