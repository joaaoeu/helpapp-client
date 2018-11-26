import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { ListCardsComponent } from './components/list-cards/list-cards.component';
import { MembersComponent } from './components/members/members.component';
import { LoginComponent } from './components/login/login.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { SuperAdminGuard } from './guards/super-admin.guard';

// Services
import { InterceptorService } from './services/interceptor/interceptor.service';
import { AuthService } from './services/auth/auth.service';
import { MembersService } from './services/members/members.service';

@NgModule({
  declarations: [
    AppComponent,
    ListCardsComponent,
    MembersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    SuperAdminGuard,
    AuthService,
    MembersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
