import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import {AuthHttp, JwtHelper, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import { App } from './app.component';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

/**
 * Bootstraps the application and makes the ROUTER_PROVIDERS
 * and the APP_BASE_HREF available to it.
 *
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 */
bootstrap(App, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  AUTH_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' }),
  provide(AuthHttp, {
      useFactory: (http:any) => {
          return new AuthHttp(new AuthConfig({
              headerName: 'Authorization',
              headerPrefix: 'Token',
              tokenName: 'auth_token',
              // tokenGetter: 'get_auth()',
              globalHeaders: [{ 'Content-Type': 'application/json' }],
              noJwtError: true,
              noTokenScheme: true
          }), http);
      },
      deps: [Http]
  })
]);

