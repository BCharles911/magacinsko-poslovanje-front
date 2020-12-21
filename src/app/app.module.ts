import { MagacinskeKarticeComponent } from './magacinske-kartice/magacinske-kartice.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardMagacionerComponent } from './board-magacioner/board-magacioner.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { allIcons } from 'ngx-bootstrap-icons';
import { MagaciniComponent } from './magacini/magacini.component';
import { MagacinComponent } from './magacin/magacin.component';

const routes: Routes = [
  { path: 'magacinske-kartice', component: MagacinskeKarticeComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserProfileComponent,
    BoardAdminComponent,
    BoardMagacionerComponent,
    MagaciniComponent,
    MagacinComponent
  ],
  imports: [

    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
