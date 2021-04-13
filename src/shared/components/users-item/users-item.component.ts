import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserAction } from '@models/user-action.model';
import { SocketService } from '@services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.sass']
})
export class UsersItemComponent implements OnInit, OnDestroy {
  @Input() userActions: UserAction[];
  @Input() id: number;
  @Input() username: string;
  @Input() image: string;
  @Input() online: boolean;
  onUserOnlineSocketSub: Subscription;
  onUserOfflineSocketSub: Subscription;

  constructor(
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.onUserOnlineSocketSub = this.socketService.onUserOnline(this.id).subscribe(
      res => {
        this.online = true;
      },
      err => {}
    );
    this.onUserOfflineSocketSub = this.socketService.onUserOffline(this.id).subscribe(
      res => {
        this.online = false;
      },
      err => {}
    );
  }

  ngOnDestroy() {
    if (this.onUserOnlineSocketSub){
      this.onUserOnlineSocketSub.unsubscribe();
    }
    if (this.onUserOfflineSocketSub){
      this.onUserOfflineSocketSub.unsubscribe();
    }
  }
}
