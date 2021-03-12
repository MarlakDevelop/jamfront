import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@services/auth.guard';
import { MainComponent } from './main.component';
import { MessengerComponent } from './messenger/messenger.component';
import { FriendsComponent } from './friends/friends.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ChatComponent } from './messenger/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'messenger',
        component: MessengerComponent,
        children: [
          {
            path: 'chats/:id',
            component: ChatComponent
          }
        ]
      },
      {
        path: 'friends',
        component: FriendsComponent
      },
      {
        path: 'profile-settings',
        component: ProfileSettingsComponent
      },
      {
        path: '',
        redirectTo: '/messenger',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
