import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { MessageModel } from '@models/chats.model';

@Component({
  selector: 'app-messages-box',
  templateUrl: './messages-box.component.html',
  styleUrls: ['./messages-box.component.sass']
})
export class MessagesBoxComponent {
  @Input() messages: MessageModel[];
  @Input() isLoading: boolean;
  @Output() scrollBottomEvent = new EventEmitter<any>();
  flex = true;

  messagesBoxScroll($event): void {
    if ($event.target.clientHeight + 50 >= $event.target.scrollHeight + $event.target.scrollTop){
      this.scrollBottomEvent.emit();
    }
  }

  updateFlexBox(): void {
    this.flex = true;
    setTimeout(() => {
      this.flex = false;
    },
    1);
  }
}
