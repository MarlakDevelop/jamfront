import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {Login, Registration} from '../models/auth.model';
import {tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = !!this.getToken() ? this.getToken() : null;

  constructor(private http: HttpClient) {
  }

  signIn(model: Login): Observable<string> {
    return this.http.post<string>(`${environment.server}${environment.apiVerPath}/users/signin`, model)
      .pipe(
        tap(
          (token: string) => {
            this.setToken(token);
            localStorage.setItem('token', token);
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

  isAuth(): boolean {
    this.setToken(this.getToken());
    return !!this.token;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token: string | null): void {
    this.token = token;
  }
}
