import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-btn-popup',
  templateUrl: './btn-popup.component.html',
  styleUrls: ['./btn-popup.component.sass']
})
export class BtnPopupComponent {
  @Input() text: string;
  @Input() btnText: string;
}
