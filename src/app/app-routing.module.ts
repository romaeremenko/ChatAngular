import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatGuard} from './chat.guard';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {
    path: 'registration',
    loadChildren: () => import('./login/registration.module').then(m => m.RegistrationModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: '', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule),
    canLoad: [ChatGuard],
    canActivate: [ChatGuard]
  },
  {path: 'chatroom', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule), canLoad: [ChatGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
