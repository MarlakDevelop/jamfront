import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ChatDialogComponent } from '@components/chat-dialog/chat-dialog.component';
import { TextDialogComponent } from '@components/text-dialog/text-dialog.component';
import { ChatShortModel, MessageModel } from '@models/chats.model';
import { ChatsService } from '@services/chats.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.sass']
})
export class MessengerComponent implements OnInit, OnDestroy {
  aSub: Subscription;
  navSub: Subscription;
  chats: ChatShortModel[];
  searchChats = '';

  constructor(private dialog: MatDialog, private chatsService: ChatsService, private router: Router, private route: ActivatedRoute) {
    this.navSub = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.loadChats();
      }
    });
  }

  ngOnInit() {
    this.loadChats();
  }

  ngOnDestroy() {
    if (this.aSub){
      this.aSub.unsubscribe();
    }
  }

  openCreateChatDialog(): void {
    const dialogRef = this.dialog.open(ChatDialogComponent, {
      data: {
        title: 'Создание чата',
        image: '',
        name: '',
        buttonSubmitText: 'Создать',
        buttonDoNothingText: 'Отменить'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.chatsService.createChat(result).subscribe(
        res => {
          this.loadChats();
          this.router.navigateByUrl(`/messenger/chats/${res.chat.id}`);
        },
        err => this.dialog.open(TextDialogComponent, {
          data: {
            text: 'Ошибка! Чат не был обновлён'
          }
        })
      ); }
    });
  }

  loadChats() {
    this.aSub = this.chatsService.getChats(this.searchChats).subscribe(
      res => {
        this.chats = res.chats.map(chat => chat.chat);
      },
      err => {}
    );
  }
}
