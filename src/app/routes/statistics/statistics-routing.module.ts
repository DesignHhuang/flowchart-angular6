import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataStatisticsComponent } from './data';
import { ExpStatisticsComponent } from './exp';
import { ProjectStatisticsComponent } from './project';

const routes: Routes = [
    { path: 'data', component: DataStatisticsComponent },
    { path: 'exp', component: ExpStatisticsComponent },
    { path: 'project', component: ProjectStatisticsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StatisticsRoutingModule { }
