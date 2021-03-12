import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, Subscription } from 'rxjs';
import { Login, Registration } from '@models/auth.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = !!this.getToken() ? this.getToken() : null;
  private aSub: Subscription;
  public isLoggedIn: boolean;

  constructor(private http: HttpClient) {
  }

  signIn(model: Login): Observable<string> {
    return this.http.post<string>(`${environment.server}${environment.apiVerPath}/users/signin`, model)
      .pipe(
        tap(
          (response: any) => {
            this.setToken(response.user.token);
            localStorage.setItem('token', response.user.token);
          }
        )
      );
  }

  signUp(model: Registration): Observable<any> {
    return this.http.post<any>(`${environment.server}${environment.apiVerPath}/users/signup`, model);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.setToken(null);
  }

  isAuth(): Observable<any> {
    this.setToken(this.getToken());
    return this.http.get<any>(`${environment.server}${environment.apiVerPath}/users/me`);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token: string | null): void {
    this.token = token;
  }
}
