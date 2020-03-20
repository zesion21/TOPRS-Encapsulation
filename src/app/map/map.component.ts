import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { EsriService } from "../service/esri.service";
import {
  MapOperationService,
  extentOption,
  coordinateChange
} from "../common-component/map-operation.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.styl"]
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor(
    private esri: EsriService,
    public operation: MapOperationService
  ) {}

  ngOnInit() {
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
}
