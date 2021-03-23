import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SubmitDialogComponent } from '@components/submit-dialog/submit-dialog.component';
import { TextDialogComponent } from '@components/text-dialog/text-dialog.component';
import { ChatDetailModel, MessageModel } from '@models/chats.model';
import { UserModel } from '@models/user.model';
import { ChatsService } from '@services/chats.service';
import { Subscription } from 'rxjs';


export interface MessagesConfig {
  idFrom: number | null;
  offset: number;
  limit: number;
  isFinished: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})

export class ChatComponent implements OnInit, OnDestroy {
  aSub: Subscription;
  navSub: Subscription;
  messagesConfig: MessagesConfig;
  chat: ChatDetailModel;
  messages: MessageModel[];
  members: UserModel[];

  constructor(private chatsService: ChatsService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {
    this.navSub = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.getChat();
        this.messages = [];
        this.members = [];
        this.getMembers();
        this.messagesConfig = {
          idFrom: null,
          offset: 0,
          limit: 20,
          isFinished: false
        };
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.aSub){
      this.aSub.unsubscribe();
    }
    if (this.navSub){
      this.navSub.unsubscribe();
    }
  }

  openLeaveSubmitDialog(text: string): void {
    const dialogRef = this.dialog.open(SubmitDialogComponent, {
      data: {
        text
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.chatsService.leaveChat(this.chat?.id).subscribe(
        res => this.router.navigateByUrl('/messenger'),
        err => this.dialog.open(TextDialogComponent, {
          data: {
            text: 'Ошибка! Не получилось выйти из чата!'
          }
        })
      ); }
    });
  }

  getChat() {
    this.aSub = this.chatsService.getChat(+this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        this.chat = res.chat;
      },
      err => this.router.navigateByUrl('/messenger')
    );
  }

  getMembers() {
    this.aSub = this.chatsService.getMembers(+this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        this.members = res.members.map(member => member.member.member.user);
      },
      err => this.router.navigateByUrl('/messenger')
    );
  }

  openDeleteMemberDialog(id: number, username: string): void {
    console.log(id, username);
  }
}
