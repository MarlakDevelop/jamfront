import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SubmitDialogComponent } from '@components/submit-dialog/submit-dialog.component';
import { TextDialogComponent } from '@components/text-dialog/text-dialog.component';
import { UserModel } from '@models/user.model';
import { UserAction } from '@models/user-action.model';
import { FriendsService } from '@services/friends.service';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.sass']
})
export class FriendsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription;
  friendshipOffersToMe: UserModel[];
  friends: UserModel[];
  friendshipOffersByMe: UserModel[];
  searchFriendshipOffersToMe = '';
  searchFriends = '';
  searchFriendshipOffersByMe = '';

  acceptIcon = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 19.1666C4.93743 19.1666 0.833374 15.0626 0.833374 9.99998C0.833374 4.93737 4.93743 0.833313 10 0.833313C15.0626 0.833313 19.1667 4.93737 19.1667 9.99998C19.1667 15.0626 15.0626 19.1666 10 19.1666ZM10 17.5C14.1422 17.5 17.5 14.1421 17.5 9.99998C17.5 5.85785 14.1422 2.49998 10 2.49998C5.85791 2.49998 2.50004 5.85785 2.50004 9.99998C2.50004 14.1421 5.85791 17.5 10 17.5ZM12.7441 6.91072L8.33337 11.3215L6.42263 9.41073L5.24412 10.5892L8.33337 13.6785L13.9226 8.08924L12.7441 6.91072Z" fill="#33E164"/></svg>';
  cancelIcon = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.165 19.33C5.10331 19.33 1 15.2267 1 10.165C1 5.10331 5.10331 1 10.165 1C15.2267 1 19.33 5.10331 19.33 10.165C19.33 15.2267 15.2267 19.33 10.165 19.33ZM10.165 17.6636C14.3064 17.6636 17.6636 14.3064 17.6636 10.165C17.6636 6.02362 14.3064 2.66636 10.165 2.66636C6.02362 2.66636 2.66636 6.02362 2.66636 10.165C2.66636 14.3064 6.02362 17.6636 10.165 17.6636ZM7.42142 14.0869L10.165 11.3433L12.9086 14.0869L14.0869 12.9086L11.3433 10.165L14.0869 7.42142L12.9086 6.24312L10.165 8.98671L7.42142 6.24312L6.24312 7.42142L8.98671 10.165L6.24312 12.9086L7.42142 14.0869Z" fill="#C81C1F"/></svg>';


  constructor(private friendsService: FriendsService, private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.form = formBuilder.group({
        id: ['', [Validators.required]]
      }
    );
  }

  ngOnInit() {
    this.getFriends();
    this.getFriendshipOffersByMe();
    this.getFriendshipOffersToMe();
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  openDialog(text: string): void {
    this.dialog.open(TextDialogComponent, {
      data: {
        text
      }
    });
  }

  openMakeFriendShipDialog = (id: number, username: string): void => {
    const dialogRef = this.dialog.open(SubmitDialogComponent, {
      data: {
        text: `Вы хотите предложить ${username} дружбу?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.aSub = this.friendsService.makeFriendshipOffer(id).subscribe(
          res => { this.getFriendshipOffersToMe(); this.getFriendshipOffersByMe(); this.getFriends(); },
          err => this.openDialog('Запрос пользователю уже был отправлен')
        );
      }
    });
  }

  openRemoveFriendShipDialog = (id: number, username: string): void => {
    const dialogRef = this.dialog.open(SubmitDialogComponent, {
      data: {
        text: `Вы хотите отвергнуть ваше предложение ${username} о дружбе?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.aSub = this.friendsService.removeFriendshipOffer(id).subscribe(
          res => { this.getFriendshipOffersToMe(); this.getFriendshipOffersByMe(); this.getFriends(); },
          err => this.openDialog('Вы уже отвергли предложение о дружбе')
        );
      }
    });
  }

  // search(terms: Observable<string>) {
  //   return terms.debounceTime(400)
  //     .distinctUntilChanged()
  //     .switchMap(term => this.searchEntries(term));
  // }

  sendFriendshipOffer(): void {
    this.aSub = this.friendsService.makeFriendshipOffer(+this.form.controls.id.value).subscribe(
      res => {
        this.openDialog('Запрос отправлен');
        this.getFriendshipOffersToMe();
        this.getFriendshipOffersByMe();
        this.getFriends();
      },
      err => { this.openDialog('Пользователь не существует или запрос на дружбу уже был отправлен'); }
    );
  }

  getFriendshipOffersToMe(): void {
    this.aSub = this.friendsService.getFriendshipOffersToMe(this.searchFriendshipOffersToMe).subscribe(
      res => {
        this.friendshipOffersToMe = res.users.map(user => user.user);
      },
      err => {}
    );
  }

  getFriends(): void {
    this.aSub = this.friendsService.getFriends(this.searchFriends).subscribe(
      res => {
        this.friends = res.users.map(user => user.user);
      },
      err => {}
    );
  }

  getFriendshipOffersByMe(): void {
    this.aSub = this.friendsService.getFriendshipOffersByMe(this.searchFriendshipOffersByMe).subscribe(
      res => {
        this.friendshipOffersByMe = res.users.map(user => user.user);
      },
      err => {}
    );
  }
}
