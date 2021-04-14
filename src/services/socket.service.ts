import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { Observable, Observer } from 'rxjs';
import { environment } from '../environments/environment';
import io from 'socket.io-client';


@Injectable()
export class SocketService {
  private socket;

  constructor(public authService: AuthService) {}

  public initSocket(): void {
    this.socket = io(environment.socketServer);
  }

  public send(message): void {
    this.socket.emit('message', message);
  }

  public onUserOnline(uid: number): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(`user_online/${uid}`, (data) => observer.next(data));
    });
  }

  public onUserOffline(uid: number): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(`user_offline/${uid}`, (data) => observer.next(data));
    });
  }

  public onChatNewMessage(chatId: number): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(`chat/${chatId}/new_message`, (data) => observer.next(data));
    });
  }

  public onChatMembersUpdate(chatId: number): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(`chat/${chatId}/members_update`, (data) => observer.next(data));
    });
  }

  public onChatsUpdate(curUId: number): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(`user/${curUId}/chats_update`, (data) => observer.next(data));
    });
  }

  public onFriendshipUpdate(curUId: number): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(`user/${curUId}/friendship_update`, (data) => observer.next(data));
    });
  }
}
