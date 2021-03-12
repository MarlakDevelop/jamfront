import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileSettingsModel } from '@models/profile-settings.model';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsService {
  constructor(private http: HttpClient) {
  }

  getMe(): Observable<any> {
    return this.http.get<any>(`${environment.server}${environment.apiVerPath}/users/me`);
  }

  updateMe(model: ProfileSettingsModel): Observable<any> {
    return this.http.patch<string>(`${environment.server}${environment.apiVerPath}/users/me`, model);
  }
}
