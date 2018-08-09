import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '@core/i18n/i18n.service';

@Injectable()
export class StartupService {
    constructor(
        private menuService: MenuService,
        private translate: TranslateService,
        @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        private httpClient: HttpClient,
        private injector: Injector,
    ) { }

    load(): Promise<any> {
        return new Promise((resolve, reject) => {
            zip(
                this.httpClient.get(`assets/tmp/i18n/zh-CN.json`),
                this.httpClient.get('assets/tmp/app-data.json'),
            ).pipe(
                catchError(([langData, appData]) => {
                    resolve(null);
                    return [langData, appData];
                }),
            ).subscribe(
                ([langData, appData]) => {
                    this.translate.setTranslation(this.i18n.defaultLang, langData);
                    this.translate.setDefaultLang(this.i18n.defaultLang);
                    const res: any = appData;
                    this.settingService.setApp(res.app);
                    this.settingService.setUser(res.user);
                    this.aclService.setFull(true);
                    this.menuService.add(res.menu);
                    this.titleService.suffix = res.app.name;
                },
                () => { },
                () => {
                    resolve(null);
                },
            );
        });
    }
}
