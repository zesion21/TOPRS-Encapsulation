import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MapComponent } from "./map/map.component";
import { DataGetTestComponent } from "./data-get-test/data-get-test.component";

const routes: Routes = [
  {
    path: "map",
    component: MapComponent
  },
  {
    path: "test",
    component: DataGetTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
