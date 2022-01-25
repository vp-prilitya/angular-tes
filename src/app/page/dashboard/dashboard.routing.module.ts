import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    },
    {
        path: ':id/detail',
        component: DetailComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
