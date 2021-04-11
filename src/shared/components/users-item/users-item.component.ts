import {Component, Input, OnInit} from '@angular/core';
import { UserAction } from '@models/user-action.model';
import {SocketService} from '@services/socket.service';

@Component({
  selector: 'app-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.sass']
})
export class UsersItemComponent implements OnInit{
  @Input() userActions: UserAction[];
  @Input() id: number;
  @Input() username: string;
  @Input() image: string;
  @Input() online: boolean;

  constructor(
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.socketService.onUserOnline(this.id).subscribe(
      res => {
        this.online = true;
      },
      err => {}
    );
    this.socketService.onUserOffline(this.id).subscribe(
      res => {
        this.online = false;
      },
      err => {}
    );
  }
}
