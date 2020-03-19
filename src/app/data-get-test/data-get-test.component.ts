import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EsriService } from "../service/esri.service";
import {
  MapOperationService,
  coordinateChange
} from "../common-component/map-operation.service";
@Component({
  selector: "app-data-get-test",
  templateUrl: "./data-get-test.component.html",
  styleUrls: ["./data-get-test.component.styl"]
})
export class DataGetTestComponent implements OnInit {
  @Input() map: any;

  constructor(
    private http: HttpClient,
    private esri: EsriService,
    private operation: MapOperationService
  ) {}

  ngOnInit() {
    this.getDataCenter();
    this.getShijingData();
  }

  dataShown = "siwei";
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
          category: "SV1-01",
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

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // console.log(this.map);
  }
  obt = [];
  getObtData() {
    if (this.obt.length == 0)
      this.http
        .get(`https://api.obtdata.com/example/data-product`)
        .subscribe(res => {
          if (res["code"] == "100000") this.obt = res["data"];
        });
  }

  addWebTiledLayer(imageid, versionid) {
    this.operation.addWebTiledLayer(this.esri.map, imageid, versionid);
  }
  async addImg(id, oid) {
    const res = await new Promise(resolve => {
      this.http
        .get(
          `http://api.spaceview.com/wss/search?request=getservice&layer=1&channel=513&entityid=${id}&output=json&v=2`
        )
        .subscribe(res => resolve(res));
    });

    const res2 = await this.http
      .get(`http://api.spaceview.com/wss/get`, {
        params: {
          request: "getdataview",
          layer: "1",
          channel: "513",
          entityid: id,
          type: "112",
          usage: "91",
          output: "json",
          v: "2"
        }
      })
      .subscribe(res => console.log(res));

    const graphic = new this.esri.Graphic(
      new this.esri.Polygon({
        rings: new coordinateChange("shijing").receive(
          res["result"].geos.geometry
        ),
        spatialReference: { wkid: 4326 }
      }),
      this.esri.heightSimpleFillSymbol
    );

    const layer =
      this.esri.map.getLayer("shijing") ||
      new this.esri.GraphicsLayer({ id: "shijing" });
    if (!this.esri.map.getLayer("shijing")) this.esri.map.addLayer(layer);
    layer.clear();
    layer.add(graphic);
    // var mi = new this.esri.MapImage({
    //   extent: graphic.geometry.getExtent(),
    //   href: `http://api.spaceview.com/wss/search?request=getdata&layer=1&channel=513&oid=${2113771}&v=2`
    // });
    // var mil = new this.esri.MapImageLayer({
    //   id: "usgs_screen_overlay"
    // });

    // mil.addImage(mi);
    // this.esri.map.addLayer(mil);
  }
  addObtImg(item) {
    const geoJson = item.geoJson;
    const graphic = new this.esri.Graphic(
      new this.esri.Polygon({
        rings: geoJson.coordinates,
        spatialReference: { wkid: 4326 }
      }),
      this.operation.createSymbol([255, 0, 0], 2, [0, 0, 0, 0])
    );

    const layer =
      this.esri.map.getLayer("shijing") ||
      new this.esri.GraphicsLayer({ id: "shijing" });
    if (!this.esri.map.getLayer("shijing")) this.esri.map.addLayer(layer);
    layer.clear();
    layer.add(graphic);
    this.operation.location(this.esri.map, {
      extent: graphic.geometry.getExtent(),
      expand: 2
    });
    const ext = graphic.geometry.getExtent();
    console.log(ext);
    var mi = new this.esri.MapImage({
      extent: ext,
      href: `https://gs.obtdata.com/geoserver//obtdata/wms?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=${item.geoserverWorkspace}%3A${item.geoserverLayer}&SRS=EPSG%3A4326&STYLES=&WIDTH=938&HEIGHT=934&BBOX=${ext.xmin}%2C${ext.ymin}%2C${ext.xmax}%2C${ext.ymax}`
    });

    "https://gs.obtdata.com/geoserver//obtdata/wms?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=obtdata%3AHAM1_20181023220945_0008_L1B_MSS_CCD2&SRS=EPSG%3A4326&STYLES=&WIDTH=938&HEIGHT=934&BBOX=115.04538564373303%2C38.00597903372964%2C117.04726835626698%2C39.999324932990525";
    var mil = new this.esri.MapImageLayer();

    mil.addImage(mi);
    this.esri.map.addLayer(mil);
  }
}
