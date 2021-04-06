import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/** Libs Internal **/
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { CreateTramaComponent } from './components/create-trama/create-trama.component';
import { ReportComponent } from './components/report/report.component';
import { UsersComponent } from './components/users/users.component';
import { FooterComponent } from './components/pagemaster/footer/footer.component';
import { HeaderComponent } from './components/pagemaster/header/header.component';
import { SidebarComponent } from './components/pagemaster/sidebar/sidebar.component';
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

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    CreateTramaComponent,
    ReportComponent,
    UsersComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    HistoryComponent,
    ForgotPasswordComponent,
    ProgramaComponent,
    DjsComponent,
    LddpComponent,
    ConvenioComponent,
    CodigoBPComponent,
    GrupoVendedorComponent,
    PlanCampanaComponent,
    CuentaContableComponent,
    ProgramaGrupalesComponent,
    ProgramaCmrComponent,
    BancaSeguroComponent,
    GrupalesComponent,
    TelemarketingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig),
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
