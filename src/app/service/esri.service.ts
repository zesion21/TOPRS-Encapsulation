import { Injectable } from "@angular/core";
import { loadCss, loadModules, loadScript } from "esri-loader";
import { UrlService } from "./url.service";
@Injectable({
  providedIn: "root"
})
export class EsriService {
  constructor(private url: UrlService) {}

  map: any; //map实例的暂存

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
  WebTiledLayer: any;
  TileInfo: any;
  MapImage;
  MapImageLayer;
  graphicsUtils: any;
  geodesicUtils: any;
  units: any;
  geometryEngine: any;
  public tileInfo: any;
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
      this.Polygon,
      this.WebTiledLayer,
      this.TileInfo,
      this.MapImage,
      this.MapImageLayer,
      this.graphicsUtils,
      this.geodesicUtils,
      this.units,
      this.geometryEngine
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
      "esri/geometry/Polygon",
      "esri/layers/WebTiledLayer",
      "esri/layers/TileInfo",
      "esri/layers/MapImage",
      "esri/layers/MapImageLayer",
      "esri/graphicsUtils",
      "esri/geometry/geodesicUtils",
      "esri/units",
      "esri/geometry/geometryEngine"
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

    this.tileInfo = new this.TileInfo({
      dpi: 90.71428571427429,
      rows: 256,
      cols: 256,
      compressionQuality: 0,

      origin: {
        x: -180,
        y: 90
      },
      spatialReference: {
        wkid: 4326
      },
      lods: [
        {
          level: 2,
          levelValue: 2,
          resolution: 0.3515625,
          scale: 147748796.52937502
        },
        {
          level: 3,
          levelValue: 3,
          resolution: 0.17578125,
          scale: 73874398.264687508
        },
        {
          level: 4,
          levelValue: 4,
          resolution: 0.087890625,
          scale: 36937199.132343754
        },
        {
          level: 5,
          levelValue: 5,
          resolution: 0.0439453125,
          scale: 18468599.566171877
        },
        {
          level: 6,
          levelValue: 6,
          resolution: 0.02197265625,
          scale: 9234299.7830859385
        },
        {
          level: 7,
          levelValue: 7,
          resolution: 0.010986328125,
          scale: 4617149.8915429693
        },
        {
          level: 8,
          levelValue: 8,
          resolution: 0.0054931640625,
          scale: 2308574.9457714846
        },
        {
          level: 9,
          levelValue: 9,
          resolution: 0.00274658203125,
          scale: 1154287.4728857423
        },
        {
          level: 10,
          levelValue: 10,
          resolution: 0.001373291015625,
          scale: 577143.73644287116
        },
        {
          level: 11,
          levelValue: 11,
          resolution: 0.0006866455078125,
          scale: 288571.86822143558
        },
        {
          level: 12,
          levelValue: 12,
          resolution: 0.00034332275390625,
          scale: 144285.93411071779
        },
        {
          level: 13,
          levelValue: 13,
          resolution: 0.000171661376953125,
          scale: 72142.967055358895
        },
        {
          level: 14,
          levelValue: 14,
          resolution: 8.58306884765625e-5,
          scale: 36071.483527679447
        },
        {
          level: 15,
          levelValue: 15,
          resolution: 4.291534423828125e-5,
          scale: 18035.741763839724
        },
        {
          level: 16,
          levelValue: 16,
          resolution: 2.1457672119140625e-5,
          scale: 9017.8708819198619
        },
        {
          level: 17,
          levelValue: 17,
          resolution: 1.0728836059570313e-5,
          scale: 4508.9354409599309
        },
        {
          level: 18,
          levelValue: 18,
          resolution: 5.3644180297851563e-6,
          scale: 2254.4677204799655
        },
        {
          level: 19,
          levelValue: 19,
          resolution: 2.68220901489257815e-6,
          scale: 1127.23386023998275
        },
        {
          level: 20,
          levelValue: 2,
          resolution: 1.341104507446289075e-6,
          scale: 563.616930119991375
        }
      ]
    });
  }
  Symbol: any;
}
