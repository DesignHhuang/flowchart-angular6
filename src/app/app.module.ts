import { NgModule, LOCALE_ID, APP_INITIALIZER, Injector } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DelonModule } from './delon.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { LayoutModule } from './layout/layout.module';
import { StartupService } from '@core/startup/startup.service';
import { DefaultInterceptor } from '@core/net/default.interceptor';
import { SimpleInterceptor } from '@delon/auth';
import { registerLocaleData } from '@angular/common';
import localeZh from '@angular/common/locales/zh';
registerLocaleData(localeZh);
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ALAIN_I18N_TOKEN } from '@delon/theme';
import { I18NService } from '@core/i18n/i18n.service';
import { UEditorModule } from 'ngx-ueditor';
import { NgxTinymceModule } from 'ngx-tinymce';
import { JsonSchemaModule } from '@shared/json-schema/json-schema.module';

export function I18nHttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, `assets/tmp/i18n/`, '.json');
}

export function StartupServiceFactory(
    startupService: StartupService,
): Function {
    return () => startupService.load();
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DelonModule.forRoot(),
        CoreModule,
        SharedModule,
        LayoutModule,
        RoutesModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: I18nHttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        UEditorModule.forRoot({
            js: [
                `//apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.config.js`,
                `//apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.all.min.js`,
            ],
            options: {
                UEDITOR_HOME_URL: `//apps.bdimg.com/libs/ueditor/1.4.3.1/`,
            },
        }),
        NgxTinymceModule.forRoot({
            baseURL: '//cdn.bootcss.com/tinymce/4.7.4/',
        }),
        JsonSchemaModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'zh-Hans' },
        { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
        { provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false },
        StartupService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
