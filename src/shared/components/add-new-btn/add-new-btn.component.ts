import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-new-btn',
  templateUrl: './add-new-btn.component.html',
  styleUrls: ['./add-new-btn.component.sass']
})
export class AddNewBtnComponent {
  @Input() disabled: boolean;
  @Input() type: string;
  @Input() text: string;
}
