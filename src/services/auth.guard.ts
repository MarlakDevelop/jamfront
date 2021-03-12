import { Injectable, Inject } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class AuthGuard
  implements CanActivate, CanActivateChild {
  constructor(
    @Inject(AuthService) private authService: AuthService, private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|boolean {
    return this.authService.isAuth().pipe(
      map(res => true),
      catchError((err) => {
        this.router.navigateByUrl('/auth');
        return of(false);
      })
    );
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|boolean {
    return this.authService.isAuth().pipe(
      map(res => true),
      catchError((err) => {
        this.router.navigateByUrl('/auth');
        return of(false);
      })
    );
  }
}


@Injectable()
export class NotAuthGuard
  implements CanActivate, CanActivateChild {
  constructor(
    @Inject(AuthService) private authService: AuthService, private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|boolean {
    return this.authService.isAuth().pipe(
      map(res => {
        this.router.navigateByUrl('/messenger');
        return false;
      }),
      catchError(err => of(true))
    );
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|boolean {
    return this.authService.isAuth().pipe(
      map(res => {
        this.router.navigateByUrl('/messenger');
        return false;
      }),
      catchError(err => of(true))
    );
  }
}
