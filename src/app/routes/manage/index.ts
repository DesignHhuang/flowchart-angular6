import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { NodeInputfileComponent } from './node-inputfile';
import { NodeParamsetComponent } from './node-paramset';

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        NodeInputfileComponent,
        NodeParamsetComponent,
    ],
    entryComponents: [NodeInputfileComponent, NodeParamsetComponent,]
})
export class ManageModule { }
