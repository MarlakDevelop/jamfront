import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chats-item',
  templateUrl: './chats-item.component.html',
  styleUrls: ['./chats-item.component.sass']
})
export class ChatsItemComponent implements OnInit {
  @Input() linkIsActive = false;
  @Input() id: number;
  @Input() image: string;
  @Input() name: string;
  @Input() date: Date;
  linkToChat: string;
  timeZone: string;

  ngOnInit() {
    this.timeZone = new Date().toString().match(/([-\+][0-9]+)\s/)[1];
    this.linkToChat = `/messenger/chats/${this.id}`;
  }
}
