import { Component, Input } from '@angular/core';
import { UserAction } from '@models/user-action.model';

@Component({
  selector: 'app-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.sass']
})
export class UsersItemComponent {
  @Input() userActions: UserAction[];
}
