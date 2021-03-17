import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileSettingsModel } from '@models/profile-settings.model';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  constructor(private http: HttpClient) {
  }

  makeFriendshipOffer(id: number): Observable<any> {
    return this.http.post<any>(`${environment.server}${environment.apiVerPath}/friendship_offers/create/${id}`, {id});
  }

  removeFriendshipOffer(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.server}${environment.apiVerPath}/friendship_offers/delete/${id}`);
  }

  getFriends(search: string): Observable<any> {
    return this.http.get<any>(`${environment.server}${environment.apiVerPath}/friends?search=${search}`);
  }

  getFriendshipOffersToMe(search: string): Observable<any> {
    return this.http.get<any>(`${environment.server}${environment.apiVerPath}/friendship_offers_to_me?search=${search}`);
  }

  getFriendshipOffersByMe(search: string): Observable<any> {
    return this.http.get<any>(`${environment.server}${environment.apiVerPath}/friendship_offers_by_me?search=${search}`);
  }

  getMe(): Observable<any> {
    return this.http.get<any>(`${environment.server}${environment.apiVerPath}/users/me`);
  }

  updateMe(model: ProfileSettingsModel): Observable<any> {
    return this.http.patch<string>(`${environment.server}${environment.apiVerPath}/users/me`, model);
  }
}
