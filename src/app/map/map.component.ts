import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { EsriService } from "../service/esri.service";
import {
  MapOperationService,
  extentOption
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

  ngOnInit() {}
  map: any;
  navigation;
  async ngAfterViewInit() {
    await this.esri.initMap();
    this.map = new this.esri.Map("map", {
      basemap: "topo",
      center: [118, 38],
      slider: false,
      zoom: 8
    });
    this.operation.InitToolBar(this.map);
  }
  full() {
    let op: extentOption = { center: [112, 38], zoom: 5 };
    this.operation.location(this.map, op);
  }
  draw() {
    this.operation
      .drawGraphic("RECTANGLE", this.map, true)
      .subscribe(graphicArr => {
        console.log(graphicArr);
      });
  }

  clear() {
    this.operation.clearDraw(this.map);
  }
}
