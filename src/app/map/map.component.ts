import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { EsriService } from "../service/esri.service";
import {
  MapOperationService,
  extentOption,
  coordinateChange
} from "../common-component/map-operation.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.styl"]
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor(
    private esri: EsriService,
    public operation: MapOperationService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getAdministrative(0, "156000000", "level0");
    // const str =
    //   "POLYGON((113.996455 36.896927,114.132031 36.874394,114.099475 36.750692,113.964117 36.773211,113.996455 36.896927))";
  }
  navigation;
  async ngAfterViewInit() {
    await this.esri.initMap();

    this.esri.map = new this.esri.Map("map", {
      // center: [93, 38],
      slider: false,
      // zoom: 5,
      maxZoom: 17,
      minZoom: 1
    });
    new this.esri.BasemapGallery({
      basemaps: [this.operation.InitTDTBasemap()],
      showArcGISBasemaps: false,
      map: this.esri.map
    });
    this.operation.location(this.esri.map, { center: [93, 5], zoom: 1 });
    this.operation.InitToolBar(this.esri.map);
  }
  addGraphic() {
    var polygon = new this.esri.Polygon({
      rings: [
        [
          [106.413574, 38.376115],
          [111.730957, 38.376115],
          [111.730957, 40.212441],
          [106.413574, 40.212441],
          [106.413574, 38.376115]
        ]
      ],
      spatialReference: { wkid: 4326 }
    });

    this.operation.addGraphicsToLayer(this.esri.map, {
      geometrys: [polygon],
      symbol: this.operation.createSymbol([255, 0, 255], 2, [
        255,
        255,
        0,
        0.25
      ]),
      clearBefore: true
    });
    this.operation.location(this.esri.map, {
      extent: polygon.getExtent(),
      expand: 2
    });
  }
  full() {
    let op: extentOption = { center: [112, 38], zoom: 5 };
    this.operation.location(this.esri.map, op);
  }
  draw() {
    this.operation
      .drawGraphic({
        geometryType: "RECTANGLE",
        map: this.esri.map,
        symbol: this.operation.createSymbol([255, 0, 0], 2, [0, 0, 0, 0])
      })
      .subscribe(graphicArr => {
        console.log(graphicArr);
      });
  }

  clear() {
    this.operation.clearDraw(this.esri.map);
    this.esri.map.graphics.clear();
  }

  //行政区定位代码
  level0 = [];
  level0Selected;
  level1 = [];
  level1Selected;
  level2 = [];
  level2Selected;

  zhixiashiCode = [156500000, 156110000, 156310000, 156120000];
  getAdministrative(type, key, level) {
    this.http
      .get("http://api.tianditu.gov.cn/administrative", {
        params: {
          tk: "ab1846502fcc2340e75c1d9ceb67c58b",
          postStr: JSON.stringify({
            searchWord: key,
            searchType: type,
            needSubInfo: "true",
            needAll: "false",
            needPolygon: "true",
            needPre: "false"
          })
        }
      })
      .subscribe(res => {
        if (res["data"].points) this.location(res["data"].points);
        if (!res["data"]["child"]) return;
        if (!this.zhixiashiCode.includes(+key))
          this[level] = res["data"]["child"];
        else {
          this[level] = [{ cityCode: key, name: "市辖区" }];
          this.level2 = res["data"]["child"];
        }
      });
  }

  location(points) {
    let narr = [];
    for (let item of points) {
      const arr = [];
      for (let val of item.region.split(",")) {
        arr.push([+val.split(" ")[0], +val.split(" ")[1]]);
      }
      narr.push(arr);
    }
    const polygon = new this.esri.Polygon({
      rings: narr,
      spatialReference: { wkid: 4326 }
    });
    this.operation.addGraphicsToLayer(this.esri.map, {
      geometrys: [polygon],
      symbol: this.esri.heightSimpleFillSymbol,
      clearBefore: true
    });
    this.operation.location(this.esri.map, {
      extent: polygon.getExtent(),
      expand: 2
    });
  }
}
