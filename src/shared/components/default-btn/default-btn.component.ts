import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-default-btn',
  templateUrl: './default-btn.component.html',
  styleUrls: ['./default-btn.component.sass']
})
export class DefaultBtnComponent {
  @Input() disabled: boolean;
  @Input() type: string;
  @Input() text: string;
}
