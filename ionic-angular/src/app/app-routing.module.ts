import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "users",
    pathMatch: "full",
  },
  {
    path: "users",
    loadChildren: () =>
      import("./users/users.module").then((m) => m.UsersPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then((m) => m.AuthPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
