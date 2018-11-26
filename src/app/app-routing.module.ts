import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ListCardsComponent } from './components/list-cards/list-cards.component';
import { MembersComponent } from './components/members/members.component';
import { LoginComponent } from './components/login/login.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { SuperAdminGuard } from './guards/super-admin.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ListCardsComponent
  },
  {
    path: 'members',
    canActivate: [SuperAdminGuard],
    component: MembersComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
