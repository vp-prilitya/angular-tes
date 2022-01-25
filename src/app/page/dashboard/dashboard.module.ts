import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { DashboardRoutingModule } from './dashboard.routing.module';
import { DetailComponent } from './detail/detail.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardRoutingModule,
    MatPaginatorModule,
    MatIconModule
  ],
  declarations: [DashboardComponent, DetailComponent]
})
export class DashboardModule { }
