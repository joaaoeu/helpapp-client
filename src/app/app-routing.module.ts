import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ListCardsComponent } from './components/list-cards/list-cards.component';
import { ReportComponent } from './components/report/report.component';
import { MembersComponent } from './components/members/members.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: ListCardsComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: 'members',
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
