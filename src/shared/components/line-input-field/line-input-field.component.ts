import { Component, Input} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-line-input-field',
  templateUrl: './line-input-field.component.html',
  styleUrls: ['./line-input-field.component.sass']
})
export class LineInputFieldComponent {
  @Input() control: AbstractControl;
  @Input() type: string;
  @Input() placeholder: string;
}
