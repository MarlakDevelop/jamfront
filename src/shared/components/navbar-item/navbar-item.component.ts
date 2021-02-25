import { Component, Input } from '@angular/core';
import { Link } from '../../../models/link.model';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.sass']
})
export class NavbarItemComponent {
  @Input() link: Link;
}
