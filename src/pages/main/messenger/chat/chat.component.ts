import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AddMembersDialogComponent } from '@components/add-members-dialog/add-members-dialog.component';
import { MessagesBoxComponent } from '@components/messages-box/messages-box.component';
import { SubmitDialogComponent } from '@components/submit-dialog/submit-dialog.component';
import { TextDialogComponent } from '@components/text-dialog/text-dialog.component';
import { ChatDetailModel, MessageModel } from '@models/chats.model';
import { UserModel } from '@models/user.model';
import { ChatsService } from '@services/chats.service';
import { FriendsService } from '@services/friends.service';
import {SocketService} from '@services/socket.service';
import { Subscription } from 'rxjs';


export interface MessagesConfig {
  idFrom: number | null;
  offset: number;
  limit: number;
  loading: boolean;
  isFinished: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})

export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild(MessagesBoxComponent) messagesBoxComponent: MessagesBoxComponent;
  aSub: Subscription;
  navSub: Subscription;
  messagesConfig: MessagesConfig;
  chat: ChatDetailModel;
  messages: MessageModel[];
  members: UserModel[] = [];

  constructor(
    private chatsService: ChatsService,
    private friendsService: FriendsService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private socketService: SocketService
  ) {
    this.navSub = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.getChat();
        this.messagesConfig = {
          idFrom: null,
          offset: 0,
          limit: 20,
          loading: false,
          isFinished: false
        };
        this.messages = [];
        this.loadMessages();
        this.members = [];
        this.getMembers();
      }
    });
  }

  ngOnInit() {
    this.socketService.onChatNewMessage(+this.route.snapshot.paramMap.get('id')).subscribe(
      res => {
        this.messages = this.messages.reverse();
        this.messages.push({
          id: res.data.message.id,
          username: res.data.message.author.user.username,
          image: res.data.message.author.user.image,
          text: res.data.message.text,
          date: res.data.message.date_created
        });
        this.messages = this.messages.reverse();
        this.messagesBoxComponent.updateFlexBox();
      },
      err => {}
    );
    this.socketService.onChatMembersUpdate(+this.route.snapshot.paramMap.get('id')).subscribe(
      res1 => {
        this.aSub = this.chatsService.getMembers(+this.route.snapshot.paramMap.get('id')).subscribe(
          res => {
            this.members = res.members.map(member => member.member.member.user);
          },
          err => this.router.navigateByUrl('/messenger')
        );
      },
      err1 => {}
    );
  }

  ngOnDestroy() {
    if (this.aSub){
      this.aSub.unsubscribe();
    }
    if (this.navSub){
      this.navSub.unsubscribe();
    }
  }

  openDialog(text: string): void {
    this.dialog.open(TextDialogComponent, {
      data: {
        text
      }
    });
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

  loadMessages(): void {
    if (this.messagesConfig.isFinished || this.messagesConfig.loading) {
      return null;
    }
    this.messagesConfig.loading = true;
    this.aSub = this.chatsService.getMessages(
      +this.route.snapshot.paramMap.get('id'),
      this.messagesConfig.idFrom,
      this.messagesConfig.offset,
      this.messagesConfig.limit
    ).subscribe(
      res => {
        if (res.messages.length < this.messagesConfig.limit){
          this.messagesConfig.isFinished = true;
        }
        if (this.messagesConfig.idFrom === null && !!res.count) {
          this.messagesConfig.idFrom = res.messages[0].message.id;
        }
        this.messagesConfig.offset += this.messagesConfig.limit;
        this.messagesConfig.loading = false;
        this.messages.push(...res.messages.map(message => {
          return {
            id: message.message.id,
            username: message.message.author.user.username,
            image: message.message.author.user.image,
            text: message.message.text,
            date: message.message.date_created
          };
        }));
        this.messagesBoxComponent.updateFlexBox();
      },
      err => {
        this.messagesConfig.isFinished = true;
      }
    );
  }

  sendMessage(text) {
    this.chatsService.sendMessage(this.chat.id, text).subscribe(
      res => {},
      err => {
        this.openDialog('Не получилось отправить сообщение');
      }
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

  openDeleteMemberDialog = (id: number, username: string): void => {
    const dialogRef = this.dialog.open(SubmitDialogComponent, {
      data: {
        text: `Вы точно хотите удалить ${username} из чата?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.chatsService.removeMember(this.chat.id, id).subscribe(
        res => {},
        err => this.dialog.open(TextDialogComponent, {
          data: {
            text: 'Ошибка! Не получилось удалить пользователя из чата!'
          }
        })
      ); }
    });
  }

  openAddMemberDialog = (): void => {
    const dialogRef = this.dialog.open(AddMembersDialogComponent, {
      data: {
        chatId: this.chat.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.chatsService.addMember(this.chat.id, result.id).subscribe(
        res => {},
        err => this.dialog.open(TextDialogComponent, {
          data: {
            text: `Ошибка! Не получилось добавить в ${result.username} чат!`
          }
        })
      ); }
    });
  }
}
