import { Component, Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ChatDialogComponent} from '@components/chat-dialog/chat-dialog.component';
import {TextDialogComponent} from '@components/text-dialog/text-dialog.component';
import {ChatShortModel} from '@models/chats.model';
import {ChatsService} from '@services/chats.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chat-meta-bar',
  templateUrl: './chat-meta-bar.component.html',
  styleUrls: ['./chat-meta-bar.component.sass']
})
export class ChatMetaBarComponent {
  @Input() id: number;
  @Input() name: string;
  @Input() image: string;
  @Input() isOwner: boolean;
  aSub: Subscription;

  constructor(private dialog: MatDialog, private chatsService: ChatsService, private router: Router) {
  }

  openUpdateChatDialog(): void {
    const dialogRef = this.dialog.open(ChatDialogComponent, {
      data: {
        title: 'Обновление чата',
        image: this.image,
        name: this.name,
        buttonSubmitText: 'Обновить',
        buttonDoNothingText: 'Отменить'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.chatsService.updateChat(this.id, result).subscribe(
        res => {
          this.router.navigateByUrl(`/`);
          this.router.navigateByUrl(`/messenger/chats/${this.id}`);
        },
        err => this.dialog.open(TextDialogComponent, {
          data: {
            text: 'Ошибка! Чат не был создан'
          }
        })
      ); }
    });
  }
}
