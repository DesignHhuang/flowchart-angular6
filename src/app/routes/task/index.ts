import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ExpTaskComponent } from './exp';
import { DataTaskComponent } from './data';
import { TaskRoutingModule } from './task-routing.module';

@NgModule({
    imports: [
        SharedModule,
        TaskRoutingModule,

    ],
    declarations: [ExpTaskComponent, DataTaskComponent]
})
export class TaskModule { }
