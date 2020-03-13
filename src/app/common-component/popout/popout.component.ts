import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Renderer2,
  ViewChild,
  Output,
  EventEmitter,
  Input
} from "@angular/core";

@Component({
  selector: "popout",
  templateUrl: "./popout.component.html",
  styleUrls: ["./popout.component.styl"]
})
export class PopoutComponent implements OnInit, AfterViewInit {
  constructor(private renderer: Renderer2) {}

  @ViewChild("box", { static: true }) mapEl: ElementRef;
  @ViewChild("header", { static: true }) headerEl: ElementRef;
  @Output() close = new EventEmitter();
  @Input() left: number;
  @Input() top: number;
  @Input() foldable: boolean;
  @Input() titleSty: any;
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      this.mouseDown();
      this.mouseMove();
      this.mouseUp();
    }, 0);
  }
  private isDown: boolean = false;
  private VW: number; //文档宽度
  private VH: number; //文档高度
  private MaxW: number; //拖拽最大宽度
  private MaxH: number; //拖拽最大高度
  private moveW: number; //结束时的宽度
  private moveH: number; //结束时的高度
  private gapX: number; //鼠标和当前元素的宽度差
  private gapY: number; //鼠标和当前元素的高度差
  isFold = false;
  startX: number;
  startY: number;
  positionOption;
  titleStyle;
  ngOnInit(): void {
    this.positionOption = {
      left: this.left + "px" || 0,
      top: this.top + "px" || 0
    };
    this.titleStyle = this.titleSty || { background: "#19a0ff" };
  }

  mouseDown() {
    this.renderer.listen(this.headerEl.nativeElement, "mousedown", e => {
      if (e.button == 0) {
        this.isDown = true;
        let el = this.mapEl.nativeElement;
        this.gapX = e.clientX - el.offsetLeft;
        this.gapY = e.clientY - el.offsetTop;

        this.VW = document.body.clientWidth;
        this.VH = document.body.clientHeight;
      }
    });
  }
  mouseMove() {
    this.renderer.listen(document, "mousemove", e => {
      let el = this.mapEl.nativeElement;
      let w = el.offsetWidth;
      let h = el.offsetHeight;
      this.MaxW = this.VW - w;
      this.MaxH = this.VH - h;
      if (this.isDown) {
        this.moveW = Math.min(Math.max(0, e.clientX - this.gapX), this.MaxW);
        this.moveH = Math.min(Math.max(0, e.clientY - this.gapY), this.MaxH);
        this.renderer.setStyle(el, "left", this.moveW + "px");
        this.renderer.setStyle(el, "top", this.moveH + "px");
      }
    });
  }
  mouseUp() {
    this.renderer.listen(document, "mouseup", e => {
      if (this.isDown) {
        this.isDown = false;
      }
    });
  }
}
