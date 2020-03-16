import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UrlService {
  constructor() {}
  ArcGISApi = "http://192.168.1.147:8090/3.31/init.js";
}
