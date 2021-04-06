import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Guards **/
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LoginGuard } from 'src/app/guards/login.guard';


import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { CreateTramaComponent } from './components/create-trama/create-trama.component';
import { ReportComponent } from './components/report/report.component';
import { UsersComponent } from './components/users/users.component';
import { HistoryComponent } from './components/history/history.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProgramaComponent } from './components/table-maintenance/programa/programa.component';
import { DjsComponent } from './components/table-maintenance/djs/djs.component';
import { LddpComponent } from './components/table-maintenance/lddp/lddp.component';
import { ConvenioComponent } from './components/table-maintenance/convenio/convenio.component';
import { CodigoBPComponent } from './components/table-maintenance/codigobp/codigobp.component';
import { GrupoVendedorComponent } from './components/table-maintenance/grupo-vendedor/grupo-vendedor.component';
import { PlanCampanaComponent } from './components/table-maintenance/plancampana/plancampana.component';
import { CuentaContableComponent } from './components/table-maintenance/cuenta-contable/cuenta-contable.component';
import { ProgramaGrupalesComponent } from './components/table-maintenance/programa-grupales/programa-grupales.component';
import { ProgramaCmrComponent } from './components/table-maintenance/programa-cmr/programa-cmr.component';
import { BancaSeguroComponent } from './components/entrerprise-maintenance/banca-seguro/banca-seguro.component';
import { GrupalesComponent } from './components/entrerprise-maintenance/grupales/grupales.component';
import { TelemarketingComponent } from './components/entrerprise-maintenance/telemarketing/telemarketing.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent, pathMatch: 'full', canActivate: [LoginGuard]
  },
  {
    path: 'recuperar-cuenta', component: ForgotPasswordComponent, canActivate: [LoginGuard]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'trama', component: CreateTramaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'historial', component: HistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: 'reportes', component: ReportComponent, canActivate: [AuthGuard]
  },
  {
    path: 'usuarios', component: UsersComponent, canActivate: [AuthGuard]
  },
  { path: 'tabla-mantenimiento',
    children: [
      { path: 'programa', component: ProgramaComponent, canActivate: [AuthGuard]  },
      { path: 'djs', component: DjsComponent, canActivate: [AuthGuard]  },
      { path: 'lddp', component: LddpComponent, canActivate: [AuthGuard]  },
      { path: 'convenio', component: ConvenioComponent, canActivate: [AuthGuard]  },
      { path: 'codigo-bp', component: CodigoBPComponent, canActivate: [AuthGuard]  },
      { path: 'grupo-vendedor', component: GrupoVendedorComponent, canActivate: [AuthGuard]  },
      { path: 'plan-campana', component: PlanCampanaComponent, canActivate: [AuthGuard]  },
      { path: 'cuenta-contable', component: CuentaContableComponent, canActivate: [AuthGuard]  },
      { path: 'programa-grupales', component: ProgramaGrupalesComponent, canActivate: [AuthGuard]  },
      { path: 'programa-cmr', component: ProgramaCmrComponent, canActivate: [AuthGuard]  },
    ]
  },
  {
    path: 'empresas-mantenimiento', 
    children: [
      { path: 'banca-seguro', component: BancaSeguroComponent, canActivate: [AuthGuard]  },
      { path: 'telemarketing', component: TelemarketingComponent, canActivate: [AuthGuard]  },
      { path: 'grupales', component: GrupalesComponent, canActivate: [AuthGuard]  },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    AuthGuard, LoginGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
