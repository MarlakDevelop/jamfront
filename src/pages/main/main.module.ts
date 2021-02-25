import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EscapeHtmlPipe } from '../../pipes/keep-html.pipe';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MessengerComponent } from './messenger/messenger.component';
import { FriendsComponent } from './friends/friends.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ChatComponent } from './messenger/chat/chat.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MainComponent,
    MessengerComponent,
    FriendsComponent,
    ProfileSettingsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    MainRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class MainModule { }
