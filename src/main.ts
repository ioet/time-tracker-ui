import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { EnvironmentType } from './environments/enum';

if (environment.production === EnvironmentType.TT_PROD || environment.production === EnvironmentType.TT_PROD_LEGACY) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
