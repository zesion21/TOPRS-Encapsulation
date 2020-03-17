import { Injectable } from "@angular/core";
import { loadCss, loadModules, loadScript } from "esri-loader";
import { UrlService } from "./url.service";
@Injectable({
  providedIn: "root"
})
export class EsriService {
  constructor(private url: UrlService) {}

  Map: any;
  Basemap: any;
  BasemapLayer: any;
  BasemapGallery: any;
  Navigation;
  Draw: any;
  GraphicsLayer: any;
  Graphic;
  SimpleFillSymbol;
  SimpleLineSymbol;
  Color;
  SpatialReference: any;
  Polygon: any;

  public heightSimpleFillSymbol: any;

  async initMap() {
    loadCss(this.url.ArcGISApi.replace("init.js", "esri/css/esri.css"));
    await loadScript({ url: `${this.url.ArcGISApi}` });
    [
      this.Map,
      this.Basemap,
      this.BasemapLayer,
      this.BasemapGallery,
      this.Navigation,
      this.Draw,
      this.GraphicsLayer,
      this.Graphic,
      this.SimpleFillSymbol,
      this.SimpleLineSymbol,
      this.Color,
      this.SpatialReference,
      this.Polygon
    ] = await loadModules([
      "esri/map",
      "esri/dijit/Basemap",
      "esri/dijit/BasemapLayer",
      "esri/dijit/BasemapGallery",
      "esri/toolbars/navigation",
      "esri/toolbars/draw",
      "esri/layers/GraphicsLayer",
      "esri/graphic",
      "esri/symbols/SimpleFillSymbol",
      "esri/symbols/SimpleLineSymbol",
      "esri/Color",
      "esri/SpatialReference",
      "esri/geometry/Polygon"
    ]);

    this.heightSimpleFillSymbol = new this.SimpleFillSymbol(
      this.SimpleFillSymbol.STYLE_SOLID,
      new this.SimpleLineSymbol(
        this.SimpleLineSymbol.STYLE_SOLID,
        new this.Color([255, 0, 0]),
        2
      ),
      new this.Color([255, 255, 0, 0.25])
    );
  }
}
