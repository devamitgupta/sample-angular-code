import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { NoSidebarLayoutComponent } from './layout/no-sidebar-layout/no-sidebar-layout.component';
import { LoginGuardService, AuthGuardService } from 'src/app/core/guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../../modules/dashboard/dashboard.module').then(mod => mod.DashboardModule)
      },
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    component: NoSidebarLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('../../modules/auth/auth.module').then(m => m.AuthModule)
      }
    ],
    canActivate: [LoginGuardService]
  },
  {
    path: '**',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
