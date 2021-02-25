import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { EscapeHtmlPipe } from '../pipes/keep-html.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarItemComponent } from './components/navbar-item/navbar-item.component';
import { MessagesBoxComponent } from './components/messages-box/messages-box.component';
import { MessagesItemComponent } from './components/messages-item/messages-item.component';
import { ChatsBoxComponent } from './components/chats-box/chats-box.component';
import { ChatsItemComponent } from './components/chats-item/chats-item.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { MembersBoxComponent } from './components/members-box/members-box.component';
import { UsersItemComponent } from './components/users-item/users-item.component';
import { MessageFieldBoxComponent } from './components/message-field-box/message-field-box.component';
import { ChatMetaBarComponent } from './components/chat-meta-bar/chat-meta-bar.component';
import { NewFriendshipFormComponent } from './components/new-friendship-form/new-friendship-form.component';
import { AddNewBtnComponent } from './components/add-new-btn/add-new-btn.component';
import { LineInputFieldComponent } from './components/line-input-field/line-input-field.component';
import { RemoveBtnComponent } from './components/remove-btn/remove-btn.component';
import { DefaultBtnComponent } from './components/default-btn/default-btn.component';
import { LoaderRingComponent } from './components/loader-ring/loader-ring.component';
import { LoaderDualRingComponent } from './components/loader-dual-ring/loader-dual-ring.component';
import { DefaultPopupComponent } from './components/default-popup/default-popup.component';
import { BtnPopupComponent } from './components/btn-popup/btn-popup.component';

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
    DefaultPopupComponent,
    BtnPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
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
    DefaultPopupComponent,
    BtnPopupComponent
  ]
})
export class SharedModule { }
