import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DelonFormModule, WidgetRegistry } from '@delon/form';

export const SCHEMA_THIRDS_COMPONENTS = [
];

@NgModule({
    declarations: SCHEMA_THIRDS_COMPONENTS,
    entryComponents: SCHEMA_THIRDS_COMPONENTS,
    imports: [SharedModule, DelonFormModule.forRoot()],
    exports: [...SCHEMA_THIRDS_COMPONENTS],
})
export class JsonSchemaModule {
    constructor(widgetRegistry: WidgetRegistry) {
    }
}
