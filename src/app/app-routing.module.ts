import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: "", loadChildren: () => import('./management/management.module').then(m => m.ManagementModule)},
  { path: "", redirectTo: "", pathMatch: "full"},
  { path: "**", redirectTo: ""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
