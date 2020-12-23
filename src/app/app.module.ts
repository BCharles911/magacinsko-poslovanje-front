import { authInterceptorProviders } from './_helper/auth.interceptor';




import { MagacinskeKarticeComponent } from './magacinske-kartice/magacinske-kartice.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DecimalPipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardMagacionerComponent } from './board-magacioner/board-magacioner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { allIcons } from 'ngx-bootstrap-icons';
import { MagaciniComponent } from './magacini/magacini.component';
import { MagacinComponent, NgbdModalContent, NgbMagacinskeKartice } from './magacin/magacin.component';
import { ArtikliComponent } from './artikli/artikli.component';
import { ModalPrijemnicaComponent } from './magacin/modal-prijemnica/modal-prijemnica.component';
import { ModalOtpremnicaComponent } from './magacin/modal-otpremnica/modal-otpremnica.component';
import { PrijemnicaComponent } from './prijemnica/prijemnica.component';
import { OtpremnicaComponent } from './otpremnica/otpremnica.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';


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
    MagacinComponent,
    NgbdModalContent,
    NgbMagacinskeKartice,
    ArtikliComponent,
    ModalPrijemnicaComponent,
    ModalOtpremnicaComponent,
    PrijemnicaComponent,
    OtpremnicaComponent
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
    ReactiveFormsModule,
    NgSelectModule,
    NgxBootstrapIconsModule.pick(allIcons),

  ],
  providers: [authInterceptorProviders,  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
