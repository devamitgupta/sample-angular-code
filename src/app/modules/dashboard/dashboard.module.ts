import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing';
import { DashboardService } from './dashboard.service';
import { CustomPipes } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CustomPipes,
    DashboardRoutingModule
  ],
  providers: [DashboardService],
  bootstrap: []
})
export class DashboardModule {
  constructor() { }
}
