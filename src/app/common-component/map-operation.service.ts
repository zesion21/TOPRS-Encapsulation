import { Injectable } from "@angular/core";
import { EsriService } from "../service/esri.service";
import { Observable } from "rxjs";
import addImgGraphic from "./addImgGraphic";

export interface extentOption {
  extent?: any;
  zoom?: number;
  center?: Array<number>;
  expand?: number;
}

@Injectable({
  providedIn: "root"
})
export class MapOperationService {
  constructor(private esri: EsriService) {}

  /**
   * @param map 地图实例
   * @param {extentOption} extentOption 输入的范围参数
   * @returns [none]
   * @description 定位到输入的范围
   */
  public location(map, extentOption: extentOption): void {
    if (extentOption.extent) {
      extentOption.expand = extentOption.expand || 1;
      map.setExtent(extentOption.extent.expand(extentOption.expand));
    } else {
      map.centerAndZoom(extentOption.center, extentOption.zoom);
    }
  }
  private navigation: any;
  private draw: any;
  /**
   * @param map 地图实例
   * @description 初始化工具条
   */
  public InitToolBar(map) {
    this.navigation = new this.esri.Navigation(map);
    this.draw = new this.esri.Draw(map);
  }

  /**
   *  @description 切换到下一视图范围
   */
  public zoomNext() {
    this.navigation.zoomToNextExtent();
  }
  /**
   *  @description 切换到上一视图范围
   */
  public zoomPrev() {
    this.navigation.zoomToPrevExtent();
  }

  /**
   *  @description 放大地图
   */
  public zoomIn() {
    this.draw.deactivate();
    this.navigation.activate(this.esri.Navigation.ZOOM_IN);
  }

  /**
   *  @description 缩小地图
   */
  public zoomOut() {
    this.draw.deactivate();
    this.navigation.activate(this.esri.Navigation.ZOOM_OUT);
  }

  /**
   *  @description 清除地图的绘图状态
   */
  public default() {
    this.navigation.deactivate();
    this.draw.deactivate();
  }

  /**
   * @description 画图工具
   * @param geometryType 图形类型 可选：CIRCLE,ELLIPSE,EXTENT,LINE,POINT,POLYGON,POLYLINE,RECTANGLE
   * @param multi  是否可以显示多个图形（非必选）
   * @param symbol 绘制的图形的symbol（可选）
   * @param layerId  要添加图形的图层id （可选，默认为"drawLayer"）
   * @returns [Observable]
   */
  public drawGraphic(drawOption: {
    geometryType: string;
    map: any;
    symbol?: any;
    multi?: boolean;
    layerId?: string;
  }) {
    const layerId = drawOption.layerId || "drawLayer";
    const symbol = drawOption.symbol || this.esri.heightSimpleFillSymbol;
    const drawLayer =
      drawOption.map.getLayer(layerId) ||
      new this.esri.GraphicsLayer({ id: layerId });
    if (!drawOption.map.getLayer(layerId)) {
      drawOption.map.addLayer(drawLayer);
    }
    if (!drawOption.multi) drawLayer.clear();
    this.navigation.deactivate();
    this.draw.activate(this.esri.Draw[drawOption.geometryType]);
    return new Observable<any>(obserber => {
      const drawEvent = this.draw.on("draw-complete", event => {
        drawEvent.remove();
        this.default();
        console.log(event);
        drawLayer.add(new this.esri.Graphic(event.geographicGeometry, symbol));
        obserber.next(drawLayer.graphics);
      });
    });
  }

  /**@description 清除绘制的涂层的全部图形  @param map 地图实例 @param  layerId 清除的图层ID（可选，默认为"drawLayer"） */
  clearDraw(map, layerId?) {
    const layer = map.getLayer(layerId || "drawLayer");
    if (layer) {
      layer.clear();
    }
  }
  /**
   * @description 以经纬度投影的方式初始化天地图
   * @returns []:BasemapLayer
   */
  InitTDTBasemap() {
    const subDomains = ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"];
    const layer1 = new this.esri.BasemapLayer({
      type: "WebTiledLayer",
      templateUrl:
        "http://{subDomain}.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=ab1846502fcc2340e75c1d9ceb67c58b",
      subDomains: subDomains,
      tileInfo: this.esri.tileInfo
    });
    const layer2 = new this.esri.BasemapLayer({
      type: "WebTiledLayer",
      templateUrl:
        "http://{subDomain}.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=ab1846502fcc2340e75c1d9ceb67c58b",
      subDomains: subDomains,
      tileInfo: this.esri.tileInfo
    });
    const layer3 = new this.esri.BasemapLayer({
      type: "WebTiledLayer",
      templateUrl:
        "http://{subDomain}.tianditu.gov.cn/ibo_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=ab1846502fcc2340e75c1d9ceb67c58b",
      subDomains: subDomains,
      tileInfo: this.esri.tileInfo
    });
    const TDT = new this.esri.Basemap({
      layers: [layer1, layer2, layer3]
    });

    return TDT;
  }

  /**
   * @description 以墨卡托的方式初始化天地图
   * @returns []:BasemapLayer
   */
  InitMercatorTDTBasemap() {
    const subDomains = ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"];
    const layer1 = new this.esri.BasemapLayer({
      type: "WebTiledLayer",
      templateUrl:
        "http://{subDomain}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=ab1846502fcc2340e75c1d9ceb67c58b",
      subDomains: subDomains
    });
    const layer2 = new this.esri.BasemapLayer({
      type: "WebTiledLayer",
      templateUrl:
        "http://{subDomain}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=ab1846502fcc2340e75c1d9ceb67c58b",
      subDomains: subDomains
    });
    const layer3 = new this.esri.BasemapLayer({
      type: "WebTiledLayer",
      templateUrl:
        "http://{subDomain}.tianditu.gov.cn/ibo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=ab1846502fcc2340e75c1d9ceb67c58b",
      subDomains: subDomains
    });
    const TDT = new this.esri.Basemap({
      layers: [layer1, layer2, layer3]
    });

    return TDT;
  }

  /**
   * @description 添加四维的网片涂层
   */
  addWebTiledLayer(map, imageid, versionid) {
    addImgGraphic.addWebTiledLayer(
      map,
      this.esri.WebTiledLayer,
      this.esri.tileInfo,
      imageid,
      versionid
    );
  }
  /**
   * @description 创建一个Symbol
   */
  createSymbol(
    borderColor: Array<number>,
    borderWidth: number,
    fillColor: Array<number>
  ) {
    return new this.esri.SimpleFillSymbol(
      this.esri.SimpleFillSymbol.STYLE_SOLID,
      new this.esri.SimpleLineSymbol(
        this.esri.SimpleLineSymbol.STYLE_SOLID,
        new this.esri.Color(borderColor),
        borderWidth
      ),
      new this.esri.Color(fillColor)
    );
  }
}

export class coordinateChange {
  private DS: string;
  constructor(dataSources) {
    this.DS = dataSources;
  }

  public send(data: string) {
    // let lower = data.toLowerCase();
    // if (lower.includes("polygon")) lower = `${lower.replace("polygon", "")}`;
    // console.log(lower);
    if (this.DS == "shijing") {
      return this.shijingSend(data);
    } else if (this.DS == "siwei") {
      return this.siweiSend(data);
    }
  }
  public receive(data: any) {
    if (this.DS == "shijing") {
      return this.shijingReceive(data);
    } else if (this.DS == "siwei") {
      return this.siweiReceive(data);
    }
  }

  private shijingSend(data) {}
  private shijingReceive(data: string) {
    let lower = data.toLowerCase();
    if (lower.includes("polygon")) lower = lower.replace("polygon", "");
    lower = lower.replace(/\(/g, "").replace(/\)/g, "");
    const pointArr = lower.split(",");
    const resultArr = [];
    for (let item of pointArr) {
      const buffer = item.split(" ");
      resultArr.push([+buffer[0], +buffer[1]]);
    }
    return [resultArr];
  }

  private siweiSend(data) {
    return [1, 2, 3, 5, 6, 6, 8];
  }
  private siweiReceive(data) {}
}
