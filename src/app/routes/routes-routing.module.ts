import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
import { LayoutDefaultComponent } from '../layout/default/default.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutDefaultComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
    exports: [RouterModule],
})
export class RouteRoutingModule { }
