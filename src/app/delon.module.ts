import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { throwIfAlreadyLoaded } from '@core/module-import-guard';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonAuthModule } from '@delon/auth';
import { DelonACLModule } from '@delon/acl';
import { DelonCacheModule } from '@delon/cache';
import { DelonUtilModule } from '@delon/util';
import { DelonMockModule } from '@delon/mock';
import * as MOCKDATA from '../../_mock';
import { environment } from '@env/environment';
const MOCKMODULE = !environment.production ? [DelonMockModule.forRoot({ data: MOCKDATA })] : [];
import { AdPageHeaderConfig } from '@delon/abc';
export function pageHeaderConfig(): AdPageHeaderConfig {
    return Object.assign(new AdPageHeaderConfig(), { home_i18n: 'home' });
}
import { DelonAuthConfig } from '@delon/auth';
export function delonAuthConfig(): DelonAuthConfig {
    return Object.assign(new DelonAuthConfig(), <DelonAuthConfig>{
        login_url: '/passport/login',
    });
}
@NgModule({
    imports: [
        NgZorroAntdModule.forRoot(),
        AlainThemeModule.forRoot(),
        DelonABCModule.forRoot(),
        DelonAuthModule.forRoot(),
        DelonACLModule.forRoot(),
        DelonCacheModule.forRoot(),
        DelonUtilModule.forRoot(),
        ...MOCKMODULE,
    ],
})
export class DelonModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: DelonModule,
    ) {
        throwIfAlreadyLoaded(parentModule, 'DelonModule');
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DelonModule,
            providers: [
                { provide: AdPageHeaderConfig, useFactory: pageHeaderConfig },
                { provide: DelonAuthConfig, useFactory: delonAuthConfig },
            ],
        };
    }
}
