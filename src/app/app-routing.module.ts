import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { CardComponent } from './components/card/card.component';
import { RoutesGuard } from './core/guards/routes.guard';

const routes: Routes = [

  {
    path: 'start',
    component: StartComponent
  },
  {
    path: 'machine-food',
    component: CardComponent,
  },
  {
    path: 'machine-food',
    canActivate: [RoutesGuard],
    canLoad: [RoutesGuard],
    loadChildren: () => import('./lazy-loading-routing.module')
      .then(m => m.LazyLoadingRoutingModule)
  },
  {
    path: 'machine-food',
    canActivate: [RoutesGuard],
    canLoad: [RoutesGuard],
    loadChildren: () => import('./lazy-loading-routing.module')
      .then(m => m.LazyLoadingRoutingModule)
  },
  {
    path: '**',
    redirectTo: '/start',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
