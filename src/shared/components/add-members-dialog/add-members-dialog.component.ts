import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from '@models/user.model';
import { ChatsService } from '@services/chats.service';
import { FriendsService } from '@services/friends.service';
import { Subscription } from 'rxjs';


export interface AddMembersDialogData {
  chatId: number;
}


@Component({
  selector: 'app-add-members-dialog',
  templateUrl: './add-members-dialog.component.html',
  styleUrls: ['./add-members-dialog.component.sass']
})
export class AddMembersDialogComponent implements OnDestroy {
  date: Date;
  aSub: Subscription;
  bSub: Subscription;
  searchFriends = '';
  friends: UserModel[];
  acceptIcon = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 19.1666C4.93743 19.1666 0.833374 15.0626 0.833374 9.99998C0.833374 4.93737 4.93743 0.833313 10 0.833313C15.0626 0.833313 19.1667 4.93737 19.1667 9.99998C19.1667 15.0626 15.0626 19.1666 10 19.1666ZM10 17.5C14.1422 17.5 17.5 14.1421 17.5 9.99998C17.5 5.85785 14.1422 2.49998 10 2.49998C5.85791 2.49998 2.50004 5.85785 2.50004 9.99998C2.50004 14.1421 5.85791 17.5 10 17.5ZM12.7441 6.91072L8.33337 11.3215L6.42263 9.41073L5.24412 10.5892L8.33337 13.6785L13.9226 8.08924L12.7441 6.91072Z" fill="#33E164"/></svg>';


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddMembersDialogData,
    private dialogRef: MatDialogRef<AddMembersDialogComponent>,
    private friendsService: FriendsService,
    private chatsService: ChatsService
  ) {
    this.getFriends();
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
    if (this.bSub) {
      this.bSub.unsubscribe();
    }
  }

  getFriends(): void {
    this.aSub = this.friendsService.getFriends(this.searchFriends).subscribe(
      res1 => {
        this.bSub = this.chatsService.getMembers(this.data.chatId).subscribe(
          res2 => {
            const friends = res1.users.map(user => user.user);
            const members = res2.members.map(member => member.member.member.user);
            this.friends = friends.filter(user => !members.find(member => member.id === user.id));
          },
          err2 => {}
        );
      },
      err1 => {}
    );
  }

  addMember = (id: number, username: string): void => {
    this.dialogRef.close({
      id,
      username
    });
  }
}
