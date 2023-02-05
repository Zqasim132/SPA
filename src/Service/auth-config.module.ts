import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        // sendAccessToken:true,
        authority: "https://login.microsoftonline.com/334311ec-1641-49d9-ba10-b2ec2853864d/v2.0",
        authWellknownEndpointUrl: "https://login.microsoftonline.com/334311ec-1641-49d9-ba10-b2ec2853864d/v2.0",
        // redirectUrl:'http://localhost:4200/',
        // postLogoutRedirectUri: 'http://localhost:4200/',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: "8518ab77-f369-4676-843c-e11793ab01d4",
        scope: "openid profile offline_access api://8518ab77-f369-4676-843c-e11793ab01d4/access_as_user",
        responseType: 'code',
        silentRenew: true,
        maxIdTokenIatOffsetAllowedInSeconds: 600,
        issValidationOff: true,
        autoUserInfo: false,
        ignoreNonceAfterRefresh: true,
        useRefreshToken: true,
        // renewTimeBeforeTokenExpiresInSeconds: 600,
        logLevel: environment.production ? LogLevel.None : LogLevel.Debug,

          // clientId: config.oidc.clientId,
          // scope: config.oidc.scope,
          // responseType: config.oidc.responseType,
          // silentRenew: config.oidc.silentRenew,
          // maxIdTokenIatOffsetAllowedInSeconds:
          //   config.oidc.maxIdTokenIatOffsetAllowedInSeconds,
          // issValidationOff: config.oidc.issValidationOff,
          // autoUserInfo: config.oidc.autoUserInfo,
          // useRefreshToken: config.oidc.useRefreshToken,
          // logLevel: this.logLevel(config.oidc.logLevel),
          customParamsAuthRequest: {
            prompt: 'select_account', // login, consent, select_account, admin_consent
          },
          secureRoutes: []
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
