import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataTaskComponent } from './data';
import { ExpTaskComponent } from './exp';

const routes: Routes = [
    { path: 'data', component: DataTaskComponent },
    { path: 'exp', component: ExpTaskComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TaskRoutingModule { }
