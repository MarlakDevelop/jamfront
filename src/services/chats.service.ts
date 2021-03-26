import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatUploadModel } from '@models/chats.model';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  constructor(private http: HttpClient) {
  }

  createChat(model: ChatUploadModel): Observable<any> {
    return this.http.post<any>(`${environment.server}${environment.apiVerPath}/create_chat/`, model);
  }

  getChats(search: string): Observable<any> {
    return this.http.get<any>(`${environment.server}${environment.apiVerPath}/chats?search=${search}`);
  }

  getChat(id: number): Observable<any> {
    return this.http.get<any>(`${environment.server}${environment.apiVerPath}/chat/${id}`);
  }

  updateChat(id: number, model: ChatUploadModel): Observable<any> {
    return this.http.patch<any>(`${environment.server}${environment.apiVerPath}/update_chat/${id}`, model);
  }

  leaveChat(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.server}${environment.apiVerPath}/leave_chat/${id}`);
  }

  getMembers(id: number): Observable<any> {
    return this.http.get<any>(`${environment.server}${environment.apiVerPath}/chat/${id}/members`);
  }

  addMember(chatId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${environment.server}${environment.apiVerPath}/chat/${chatId}/add_member/${userId}`, {});
  }

  removeMember(chatId: number, userId: number): Observable<any> {
    return this.http.delete<any>(`${environment.server}${environment.apiVerPath}/chat/${chatId}/remove_member/${userId}`);
  }

  getMessages(chatId: number, idFrom: number | null, offset: number, limit: number): Observable<any>{
    return this.http.get<any>(`${environment.server}${environment.apiVerPath}/chat/${chatId}/messages?id_from=${idFrom ? idFrom : 0}&limit=${limit}&offset=${offset}`);
  }
}
