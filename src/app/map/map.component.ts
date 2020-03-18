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
  map: any;
  navigation;
  async ngAfterViewInit() {
    await this.esri.initMap();

    this.map = new this.esri.Map("map", {
      center: [118, 38],
      slider: false,
      zoom: 4,
      maxZoom: 17,
      minZoom: 3
    });
    this.map.SpatialReference = new this.esri.SpatialReference({
      wkid: 4326
    });
    new this.esri.BasemapGallery({
      basemaps: [this.operation.InitTDTBasemap()],
      showArcGISBasemaps: false,
      map: this.map
    });

    this.operation.InitToolBar(this.map);
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
    this.map.graphics.clear();
    this.map.graphics.add(
      new this.esri.Graphic(polygon, this.esri.heightSimpleFillSymbol)
    );
    this.operation.location(this.map, {
      center: [106.413574, 38.376115],
      zoom: 8
    });
  }
  full() {
    let op: extentOption = { center: [112, 38], zoom: 5 };
    this.operation.location(this.map, op);
  }
  draw() {
    this.operation
      .drawGraphic("RECTANGLE", this.map, false)
      .subscribe(graphicArr => {
        new coordinateChange("siwei").send(graphicArr[0].geometry.rings);
        console.log(graphicArr);
      });
  }

  clear() {
    this.operation.clearDraw(this.map);
  }
}
