import { Injectable } from "@angular/core";
import { EsriService } from "../service/esri.service";
import { Observable, of, Observer } from "rxjs";
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
    this.navigation.activate(this.esri.Navigation.ZOOM_IN);
  }

  /**
   *  @description 缩小地图
   */
  public zoomOut() {
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
   * @returns [Observable]
   */
  public drawGraphic(geometryType: string, map: any, multi: boolean = false) {
    const drawLayer =
      map.getLayer("drawLayer") ||
      new this.esri.GraphicsLayer({ id: "drawLayer" });
    if (!map.getLayer("drawLayer")) {
      map.addLayer(drawLayer);
    }
    if (!multi) drawLayer.clear();
    this.draw.activate(this.esri.Draw[geometryType]);
    return new Observable(obserber => {
      const drawEvent = this.draw.on("draw-complete", event => {
        drawEvent.remove();
        this.default();
        drawLayer.add(
          new this.esri.Graphic(
            event.geometry,
            this.esri.heightSimpleFillSymbol
          )
        );
        obserber.next(drawLayer.graphics);
      });
    });
  }

  /**@description 清除绘制的涂层的全部图形  @param map 地图实例*/
  clearDraw(map) {
    const layer = map.getLayer("drawLayer");
    if (layer) {
      layer.clear();
    }
  }
}
