import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-messages-item',
  templateUrl: './messages-item.component.html',
  styleUrls: ['./messages-item.component.sass']
})
export class MessagesItemComponent {
  @Input() image: string;
  @Input() name: string;
  @Input() date: Date;
  @Input() text: string;
}
