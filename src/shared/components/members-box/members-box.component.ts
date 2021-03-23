import { Component, Input } from '@angular/core';
import { UserModel } from '@models/user.model';

@Component({
  selector: 'app-members-box',
  templateUrl: './members-box.component.html',
  styleUrls: ['./members-box.component.sass']
})
export class MembersBoxComponent{
  @Input() members: UserModel[];
  @Input() isOwner: boolean;
  @Input() openDeleteMemberDialog: (...kwargs) => any;

  cancelIcon = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.165 19.33C5.10331 19.33 1 15.2267 1 10.165C1 5.10331 5.10331 1 10.165 1C15.2267 1 19.33 5.10331 19.33 10.165C19.33 15.2267 15.2267 19.33 10.165 19.33ZM10.165 17.6636C14.3064 17.6636 17.6636 14.3064 17.6636 10.165C17.6636 6.02362 14.3064 2.66636 10.165 2.66636C6.02362 2.66636 2.66636 6.02362 2.66636 10.165C2.66636 14.3064 6.02362 17.6636 10.165 17.6636ZM7.42142 14.0869L10.165 11.3433L12.9086 14.0869L14.0869 12.9086L11.3433 10.165L14.0869 7.42142L12.9086 6.24312L10.165 8.98671L7.42142 6.24312L6.24312 7.42142L8.98671 10.165L6.24312 12.9086L7.42142 14.0869Z" fill="#C81C1F"/></svg>';
}
