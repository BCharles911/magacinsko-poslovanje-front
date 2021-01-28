import { ListaPrijemnicaComponent } from './lista-prijemnica/lista-prijemnica.component';
import { MestaComponent } from './mesta/mesta.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { PoslovniPartneriComponent } from './poslovni-partneri/poslovni-partneri.component';
import { OtpremnicaComponent } from './otpremnica/otpremnica.component';
import { PrijemnicaComponent } from './prijemnica/prijemnica.component';
import { ArtikliComponent } from './artikli/artikli.component';
import { MagaciniComponent } from './magacini/magacini.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MagacinComponent } from './magacin/magacin.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {path: 'magacini', component: MagaciniComponent },
  {path: 'magacini/magacin/:id', component: MagacinComponent},
  {path: 'admin-panel/magacin/:id', component: MagacinComponent},
  {path: 'artikli', component: ArtikliComponent},
  {path: 'prijemnica', component: PrijemnicaComponent},
  {path: 'otpremnica', component: OtpremnicaComponent},
  {path: 'poslovni-partneri', component: PoslovniPartneriComponent},
  {path: 'mesta', component: MestaComponent},
  {path: 'lista-prijemnica', component: ListaPrijemnicaComponent},

  {path: 'admin-panel', component: BoardAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
