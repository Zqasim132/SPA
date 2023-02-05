/** Angular **/
import { Injectable } from '@angular/core';
/** External libraries **/
import { OidcSecurityService, OpenIdConfiguration, UserDataResult, AuthStateResult,
  EventTypes,
  OidcClientNotification,
  PublicEventsService, } from 'angular-auth-oidc-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** Private properties **/
  private user: any;
  // private authenticated!: boolean;



  userData$: Observable<UserDataResult>;

  // configuration$: Observable<OpenIdConfiguration>;

  isAuthenticated = false;
  authenticated: boolean;
  private _isAuthorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _accessToken: BehaviorSubject<string> = new BehaviorSubject<string>('');
  isAuthenticated$ = this._isAuthorized.asObservable();
  accessToken$ = this._accessToken.asObservable();

  /** Constructor **/
  constructor(
    public readonly oidcSecurityService: OidcSecurityService,
    public readonly eventService: PublicEventsService
  ) {
    // this.oidcSecurityService.isAuthenticated$.subscribe(
    //   ({ isAuthenticated, allConfigsAuthenticated }) => {
    //     debugger
    //     this.authenticated = isAuthenticated;

    //     console.warn('authenticated: ', isAuthenticated);
    //   }
    // );

    // this.oidcSecurityService.userData$.subscribe(({ userData }) => {
    //   this.user = userData;
    //   console.warn('user: ', JSON.stringify(userData));
    // });

    // this.eventService
    //   .registerForEvents()
    //   .subscribe((result: OidcClientNotification<AuthStateResult>) => {
    //     console.warn('Event Received, ', JSON.stringify(result));
    //   });

    // this.eventService
    //   .registerForEvents()
    //   .pipe(
    //     filter(
    //       (notification) =>
    //         notification.type === EventTypes.NewAuthenticationResult
    //     )
    //   )
    //   .subscribe((result) => {
    //     console.warn('Token Expired, ', JSON.stringify(result));
    //     // if (result?.type === 4 && result?.value?.isAuthenticated === false)
    //     //   this.logoffAndRevokeTokens();
    //   });





    // this.configuration$ = this.oidcSecurityService.getConfiguration();
    this.userData$ = this.oidcSecurityService.userData$;

    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;

      console.info('authenticated: ', isAuthenticated);
    });

    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, errorMessage }) => {
      debugger
      this._isAuthorized.next(isAuthenticated);
      this._accessToken.next(accessToken);
      console.log(isAuthenticated);
      console.log(userData);
      console.log(accessToken);
      console.log(errorMessage);
    });

    
        // this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken }) => {
        //   // ...
        //   debugger 
        //   console.log(isAuthenticated)
        // });
    
        // this.oidcSecurityService.isAuthenticated$.subscribe(
        //   ({ isAuthenticated, allConfigsAuthenticated }) => {
        //     this.authenticated = isAuthenticated;
        //     debugger
        //     console.log('authenticated: ', isAuthenticated);
        //     // if(isAuthenticated){
        //     //   this.router.navigate(['callback']);
        //     // }

        //   }
        // );
    
        this.oidcSecurityService.userData$.subscribe(({ userData }) => {
          // this.user = userData;
          debugger
          console.log('user: ', JSON.stringify(userData));
        });
    
        this.eventService
          .registerForEvents()
          .subscribe((result: OidcClientNotification<AuthStateResult>) => {
            debugger
            console.log('Event Received, ', JSON.stringify(result));
          });
    
        this.eventService
          .registerForEvents()
          .pipe(
            filter(
              (notification) =>
                notification.type === EventTypes.NewAuthenticationResult
            )
          )
          .subscribe((result) => {
            debugger
            console.log('Token Expired, ', JSON.stringify(result));
            // if (result?.type === 4 && result?.value?.isAuthenticated === false)
            //   this.logoffAndRevokeTokens();
          });
  }
  

  loginWithPopup() {
    debugger
    this.oidcSecurityService.authorizeWithPopUp().subscribe(({ isAuthenticated, userData, accessToken, errorMessage }) => {
      debugger
      console.log(isAuthenticated);
      console.log(userData);
      console.log(accessToken);
      console.log(errorMessage);
    });
  }

  openWindow() {
    window.open('/', '_blank');
  }

  forceRefreshSession() {
    this.oidcSecurityService.forceRefreshSession().subscribe((result) => console.warn(result));
  }

  logout() {
    this.oidcSecurityService.logoff();
  }



  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this._isAuthorized.value;
  }

  private checkLogin(): void {
    debugger
    const hash = window.location.hash.slice(0, 2);
    if (hash && hash !== '#/') {
      // this.oidcSecurityService.authorizedCallback();
      this._isAuthorized.subscribe((e: boolean) => {
        if (e) { window.location.reload(); }
      });
    } else if (!this.oidcSecurityService.getIdToken()) {
      this.login();
    }
  }

  login() {
    this.oidcSecurityService.authorize();
    // this.authService.logIn();
  }

//   /** Public methods **/
//   get isAuthenticated() {
//     return this.authenticated;
//   }

//   logIn(): void {
//     this.oidcSecurityService.authorize();
//   }

//   logOut(): void {
//     this.oidcSecurityService.logoff();
//   }

//   logoffAndRevokeTokens(): void {
//     this.oidcSecurityService.logoffAndRevokeTokens();
//   }

//   getUser(): any {
//     const user: any = new Object();
//     user.name = this.user?.name;
//     user.userId = this.user?.preferred_username ?? this.user?.oid;
//     user.preferred_username = this.user?.preferred_username;
//     user.oid = this.user?.oid;

//     return user;
//   }

//   checkAuth() {
//     this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
//       console.warn('CheckAuth(): ' + JSON.stringify(isAuthenticated));
//     });
//   }
}
