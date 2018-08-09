import { NgModule } from '@angular/core';

export {
}

@NgModule()
export class ServicesModule {
    static forRoot() {
        return {
            ngModule: ServicesModule,
            providers: [
            ]
        };
    }
}