import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { LayoutDefaultComponent } from './default/default.component';
import { NodeInputfileComponent } from '../routes/manage/node-inputfile';
import { NodeParamsetComponent } from '../routes/manage/node-paramset';

const COMPONENTS = [
    LayoutDefaultComponent,
];

@NgModule({
    imports: [SharedModule],
    providers: [],
    declarations: [...COMPONENTS, NodeInputfileComponent, NodeParamsetComponent],
    exports: [...COMPONENTS],
    entryComponents: [NodeInputfileComponent, NodeParamsetComponent,]
})
export class LayoutModule { }
