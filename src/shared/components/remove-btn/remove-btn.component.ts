import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-remove-btn',
  templateUrl: './remove-btn.component.html',
  styleUrls: ['./remove-btn.component.sass']
})
export class RemoveBtnComponent {
  @Input() disabled: boolean;
  @Input() type: string;
  @Input() text: string;
}
