import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-default-popup',
  templateUrl: './default-popup.component.html',
  styleUrls: ['./default-popup.component.sass']
})
export class DefaultPopupComponent {
  @Input() text: string;
}
