import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from '@services/auth.interceptor';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { EscapeHtmlPipe } from '@pipes/keep-html.pipe';
import { AuthGuard, NotAuthGuard } from '@services/auth.guard';

import { NavbarComponent } from '@components/navbar/navbar.component';
import { NavbarItemComponent } from '@components/navbar-item/navbar-item.component';
import { MessagesBoxComponent } from '@components/messages-box/messages-box.component';
import { MessagesItemComponent } from '@components/messages-item/messages-item.component';
import { ChatsBoxComponent } from '@components/chats-box/chats-box.component';
import { ChatsItemComponent } from '@components/chats-item/chats-item.component';
import { SearchbarComponent } from '@components/searchbar/searchbar.component';
import { MembersBoxComponent } from '@components/members-box/members-box.component';
import { UsersItemComponent } from '@components/users-item/users-item.component';
import { MessageFieldBoxComponent } from '@components/message-field-box/message-field-box.component';
import { ChatMetaBarComponent } from '@components/chat-meta-bar/chat-meta-bar.component';
import { NewFriendshipFormComponent } from '@components/new-friendship-form/new-friendship-form.component';
import { AddNewBtnComponent } from '@components/add-new-btn/add-new-btn.component';
import { LineInputFieldComponent } from '@components/line-input-field/line-input-field.component';
import { RemoveBtnComponent } from '@components/remove-btn/remove-btn.component';
import { DefaultBtnComponent } from '@components/default-btn/default-btn.component';
import { LoaderRingComponent } from '@components/loader-ring/loader-ring.component';
import { LoaderDualRingComponent } from '@components/loader-dual-ring/loader-dual-ring.component';
import { ErrorMessageComponent } from '@components/error-message/error-message.component';
import { TextDialogComponent } from '@components/text-dialog/text-dialog.component';
import { SubmitDialogComponent } from '@components/submit-dialog/submit-dialog.component';
import { ChatDialogComponent } from '@components/chat-dialog/chat-dialog.component';

@NgModule({
  declarations: [
    EscapeHtmlPipe,
    NavbarComponent,
    NavbarItemComponent,
    MessagesBoxComponent,
    MessagesItemComponent,
    ChatsBoxComponent,
    ChatsItemComponent,
    SearchbarComponent,
    MembersBoxComponent,
    UsersItemComponent,
    MessageFieldBoxComponent,
    ChatMetaBarComponent,
    NewFriendshipFormComponent,
    AddNewBtnComponent,
    LineInputFieldComponent,
    RemoveBtnComponent,
    DefaultBtnComponent,
    LoaderRingComponent,
    LoaderDualRingComponent,
    ErrorMessageComponent,
    TextDialogComponent,
    SubmitDialogComponent,
    ChatDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    AuthGuard,
    NotAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [],
  exports: [
    EscapeHtmlPipe,
    NavbarComponent,
    NavbarItemComponent,
    MessagesBoxComponent,
    MessagesItemComponent,
    ChatsBoxComponent,
    ChatsItemComponent,
    SearchbarComponent,
    MembersBoxComponent,
    UsersItemComponent,
    MessageFieldBoxComponent,
    ChatMetaBarComponent,
    NewFriendshipFormComponent,
    AddNewBtnComponent,
    LineInputFieldComponent,
    RemoveBtnComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    DefaultBtnComponent,
    ErrorMessageComponent,
    TextDialogComponent,
    SubmitDialogComponent,
    ChatDialogComponent
  ]
})
export class SharedModule { }
