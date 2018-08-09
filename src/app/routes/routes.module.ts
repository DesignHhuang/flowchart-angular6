import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';

const COMPONENTS = [
];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, RouteRoutingModule],
    declarations: [
        ...COMPONENTS,
        ...COMPONENTS_NOROUNT,
    ],
    entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule { }
