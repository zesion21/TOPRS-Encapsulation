import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MapComponent } from "./map/map.component";
import { QueryTestComponent } from "./query-test/query-test.component";

const routes: Routes = [
  {
    path: "map",
    component: MapComponent
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
