import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MapComponent } from "./map/map.component";
import { DataGetTestComponent } from "./data-get-test/data-get-test.component";
import { QueryTestComponent } from "./query-test/query-test.component";

const routes: Routes = [
  {
    path: "map",
    component: MapComponent
  },
  {
    path: "test",
    component: DataGetTestComponent
  },
  {
    path: "",
    redirectTo: "map",
    pathMatch: "full"
  },
  {
    path: "queryTest",
    component: QueryTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
