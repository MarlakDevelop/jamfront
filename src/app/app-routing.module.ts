import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainRoutingModule } from '@pages/main/main-routing.module';
import { AuthRoutingModule } from '@pages/auth/auth-routing.module';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [
    MainRoutingModule,
    AuthRoutingModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
