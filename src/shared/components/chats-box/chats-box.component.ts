import { Component, Input } from '@angular/core';
import { ChatShortModel } from '@models/chats.model';

@Component({
  selector: 'app-chats-box',
  templateUrl: './chats-box.component.html',
  styleUrls: ['./chats-box.component.sass']
})
export class ChatsBoxComponent {
  @Input() chats: ChatShortModel[];
}
