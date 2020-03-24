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
  }
  navigation;
  async ngAfterViewInit() {
    await this.esri.initMap();
    this.esri.map = new this.esri.Map("map", {
      center: [113, 38],
      slider: false,
      zoom: 4,
      maxZoom: 17,
      minZoom: 3
    });
    new this.esri.BasemapGallery({
      basemaps: [this.operation.InitMercatorTDTBasemap()],
      showArcGISBasemaps: false,
      map: this.esri.map
    });
    this.operation.InitToolBar(this.esri.map);
  }
  addGraphic() {
    var polygon2 = new this.esri.Polygon({
      rings: [
        [
          [110.0885008515625, 39.1899078828125],
          [113.0877684296875, 39.1349762421875],
          [113.0108641328125, 37.4540680390625],
          [110.1104735078125, 37.4870270234375],
          [110.0885008515625, 39.1899078828125]
        ]
      ],
      spatialReference: { wkid: 4326 }
    });
    var polygon3 = new this.esri.Polygon({
      rings: [
        [
          [109.03655993359375, 38.87954411328125],
          [110.74493395703125, 38.81911930859375],
          [110.71746813671875, 37.93471989453125],
          [109.06951891796875, 37.86330876171875],
          [109.06951891796875, 37.86330876171875],
          [109.03655993359375, 38.87954411328125]
        ]
      ],
      spatialReference: { wkid: 4326 }
    });

    var polygon4 = new this.esri.Polygon({
      rings: [
        [
          [110.687255734375, 39.8710602265625],
          [110.665283078125, 38.7065094453125],
          [108.226318234375, 38.8163727265625],
          [108.358154171875, 40.1347321015625],
          [110.687255734375, 39.8710602265625]
        ]
      ],
      spatialReference: { wkid: 4326 }
    });
    var polygon5 = new this.esri.Polygon({
      rings: [
        [
          [113.5491942109375, 40.51101383984375],
          [116.2188719453125, 40.34621891796875],
          [116.3177488984375, 37.44582829296875],
          [113.8503172578125, 37.43484196484375],
          [113.5491942109375, 40.51101383984375]
        ]
      ],
      spatialReference: { wkid: 4326 }
    });

    var areas = this.esri.geometryEngine.union([
      polygon3,
      polygon2,
      polygon4,
      polygon5
    ]);

    this.operation.addGraphicsToLayer(this.esri.map, {
      geometrys: [areas],
      symbol: this.operation.createSymbol([255, 0, 255], 2, [
        255,
        255,
        0,
        0.25
      ]),
      clearBefore: true
    });

    // console.log(
    //   this.esri.geodesicUtils.geodesicAreas([areas], this.esri.units.ACRES)
    // );
    // console.log(this.esri.geometryEngine.geodesicArea(areas, 109402));
    // console.log(this.esri.geometryEngine.geodesicArea(areas, 109414));
    // console.log(this.esri.geometryEngine.planarArea(areas, 109414));

    this.operation.location(this.esri.map, {
      extent: areas.getExtent(),
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
        geometryType: "POLYGON",
        map: this.esri.map,
        symbol: this.operation.createSymbol([255, 0, 0], 2, [0, 0, 0, 0.25])
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
    const g = this.operation.addGraphicsToLayer(this.esri.map, {
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
