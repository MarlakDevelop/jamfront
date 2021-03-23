import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages-item',
  templateUrl: './messages-item.component.html',
  styleUrls: ['./messages-item.component.sass']
})
export class MessagesItemComponent implements OnInit {
  @Input() image: string;
  @Input() name: string;
  @Input() date: Date;
  @Input() text: string;
  timeZone: string;

  ngOnInit() {
    this.timeZone = new Date().toString().match(/([-\+][0-9]+)\s/)[1];
  }
}
