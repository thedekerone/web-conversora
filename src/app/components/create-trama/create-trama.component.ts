import { ReportsService } from './../../services/reports.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { LoadService } from 'src/app/services/load.service';
import { TramaService } from 'src/app/services/trama.service';
import { EmpresasService } from 'src/app/services/empresas.service';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Component({
  selector: 'app-create-trama',
  templateUrl: './create-trama.component.html',
  styleUrls: ['./create-trama.component.css'],
})
export class CreateTramaComponent implements OnInit {
  proceso: boolean = false;
  telemarketing: boolean = false;
  bancayseguros: boolean = false;
  grupales: boolean = false;
  generica: boolean = false;
  titleData = 'Verifica los datos antes de cargar la trama';
  listaInfo = [];
  listaEmpresa = [];
  listaEmpresaSub = [];
  listaTipoPago = [];

  listaCanales = [];
  permisos = [];
  convenioRolCliente = '';
  plan = '';
  sede = '';
  codigoBpUnidVenta = '';
  tipoCanal = '0';
  tiposelected = '0';
  empresaselected = '0';
  tiposelected2 = '0';
  empresaselected2 = '0';
  tiposelected3 = '0';
  empresaselected3 = '0';
  tiposelected4 = '0';
  empresaselected4 = '0';
  empresaSubselected = '0';
  empresaSub = false;
  errorTipo = false;
  errorEmpresa = false;
  errorTrama = false;
  errorTipo2 = false;
  errorEmpresa2 = false;
  errorTrama2 = false;
  errorTipo3 = false;
  errorEmpresa3 = false;
  errorTrama3 = false;
  errorTipo4 = false;
  errorEmpresa4 = false;
  errorTrama4 = false;
  errorEmpresa5 = false;
  convenioRolRecaudador = '';
  nConvenioRecaudador = '';
  capitalizado = '';
  tipoRol = '';
  codigoBroker = '';
  tipoRol2 = '';
  convenioRolUnidVenta = '';
  convenioRolBroker = '';
  mostrarConvenios = false;
  tipoempresaselected = '0';
  mostrarArchivo = false;
  archivoPago = '';
  horaTransc = '';
  minutosTransc = '';
  extension = '';
  nombre_archivo = '';
  file = '';
  tipoIdentificacion = '';
  nroIdentificacion = '';
  codigoEmpresa = '';
  razonSocial = '';
  rol = '';
  grupo_vendedor = '';
  numero_convenio = '';
  archivo;
  hide: boolean = false;
  showConvenio: boolean = true;
  codBpVendedor = '';
  codBpBroker = '';
  codBpConvBroker = '';
  codEmpRecaud = '';
  canalVenta = '';
  nombreEmpresa = '';
  formaPlan = '';
  tipoVia = '';
  codOncosys = '';
  nombreVia = '';
  form_manzana = '';
  lote = '';
  dpt = '';
  departamento = '';
  urbanizacion = '';
  provincia = '';
  distrito = '';
  referencia = '';
  archivoDePagoExpirado: any;
  finalizarProceso: any;
  codigoBPSede: any;
  codBpRolCliente: any;
  tipoempresa: string;
  rucSubrogada: any;
  razonSocialSubrogado: any;
  bpSapSubrogador: any;
  descripcionSede: any;
  id_empresa: any;
  bp_empresa: any;
  codConvenioBpVendedor: any;
  bp_sap_cliente: any;
  brokerList: any;
  mostrarTelemarketing = false;
  mostrarBancaSeguros: boolean;
  mostrarGrupales: boolean;
  mostrarSubrogada: boolean;
  nombre_convenio: any;

  constructor(
    public loadServ: LoadService,
    public authSer: AuthService,
    public reportSer: ReportsService,
    public tramaSer: TramaService,
    public emprSer: EmpresasService
  ) {}

  async ngOnInit() {
    this.mostrarTelemarketing = this.authSer.mostrarTelemarketing();
    this.mostrarGrupales = this.authSer.mostrarGrupales();
    this.mostrarBancaSeguros = this.authSer.mostrarBancaSeguros();
    this.mostrarSubrogada = this.authSer.mostrarSubrogada();
    console.log(this.mostrarSubrogada);

    this.loadServ
      .listarCanales(this.authSer.getIdusuario())
      .subscribe((response) => {
        console.log(response);
        this.listaCanales = response['data'].filter((el) => {
          console.log(el);
          // console.log(this.mostrarTelemarketing)
          if (this.authSer.getIDRol() === '3') return true;
          if (el.id_canal == 2 && this.mostrarTelemarketing) {
            console.log('fdas');
            return true;
          }
          if (el.id_canal == 3 && this.mostrarBancaSeguros) {
            return true;
          }
          if (
            el.id_canal == 4 &&
            (this.mostrarGrupales || this.mostrarSubrogada)
          ) {
            console.log('faasdf');
            return true;
          }
          return false;
        });

        console.log('-------------------------------------------');
        console.log(this.authSer.getIDRol());

        if (this.authSer.getIDRol() === '2') {
          console.log('--------------------------entro-----------------');
          this.listaCanales = this.listaCanales.filter(
            (el) => this.authSer.getIDCanal() == el.id_canal
          );
        }

        console.log(this.listaCanales);
        this.permisos = JSON.parse(localStorage.getItem('zxc21dsrty5uyj11j1'));

        /*this.loadServ.listarTipoArchivo(this.listaCanales[0]["id_canal"]).subscribe(response => {
        console.log("***");
        this.listaInfo = response["data"];

        this.loadServ.listarEmpresaTipoArchivo(this.listaCanales[0]["id_tipo_trama"]).subscribe(response => {
          this.listaEmpresa = response["data"];
          console.log("*");
          console.log(this.listaEmpresa);
        });
      });*/
      });
  }

  clearEmpresa() {
    this.tiposelected2 = '0';
    this.empresaselected2 = '0';
    this.tiposelected3 = '0';
    this.empresaselected3 = '0';
    this.tiposelected4 = '0';
    this.empresaselected4 = '0';
    this.empresaSubselected = '0';
    this.empresaSub = false;
    this.errorTipo = false;
    this.errorEmpresa = false;
    this.errorTrama = false;
    this.errorTipo2 = false;
    this.errorEmpresa2 = false;
    this.errorTrama2 = false;
    this.errorTipo3 = false;
    this.errorEmpresa3 = false;
    this.errorTrama3 = false;
    this.errorTipo4 = false;
    this.errorEmpresa4 = false;
    this.errorTrama4 = false;
    this.errorEmpresa5 = false;
    this.convenioRolRecaudador = '';
    this.nConvenioRecaudador = '';
    this.capitalizado = '';
    this.tipoRol = '';
    this.codigoBroker = '';
    this.tipoRol2 = '';
    this.convenioRolUnidVenta = '';
    this.convenioRolBroker = '';
    this.mostrarConvenios = false;
    // this.tipoempresaselected = '0';
    this.mostrarArchivo = false;
    this.archivoPago = '';
    this.horaTransc = '';
    this.minutosTransc = '';
    this.extension = '';
    this.nombre_archivo = '';
    this.file = '';
    this.tipoIdentificacion = '';
    this.nroIdentificacion = '';
    this.codigoEmpresa = '';
    this.razonSocial = '';
    this.rol = '';
    this.grupo_vendedor = '';
    this.numero_convenio = '';
    this.archivo;
    this.hide = false;
    this.showConvenio = true;
    this.codBpVendedor = '';
    this.codBpBroker = '';
    this.codBpConvBroker = '';
    this.codEmpRecaud = '';
    this.canalVenta = '';
    this.nombreEmpresa = '';
    this.formaPlan = '';
    this.tipoVia = '';
    this.codOncosys = '';
    this.nombreVia = '';
    this.form_manzana = '';
    this.lote = '';
    this.dpt = '';
    this.departamento = '';
    this.urbanizacion = '';
    this.provincia = '';
    this.distrito = '';
    this.referencia = '';
    this.archivoDePagoExpirado = null;
    this.finalizarProceso = null;
    this.codigoBPSede = null;
    this.codBpRolCliente = null;
    this.tipoempresa = '';
    this.rucSubrogada = null;
    this.razonSocialSubrogado = null;
    this.bpSapSubrogador = null;
    this.descripcionSede = null;
    this.id_empresa = null;
    this.bp_empresa = null;
    this.codConvenioBpVendedor = null;
    this.bp_sap_cliente = null;
    this.brokerList = null;
  }

  resetVariables() {
    this.proceso = false;
    this.telemarketing = false;
    this.bancayseguros = false;
    this.grupales = false;
    this.generica = false;
    this.titleData = 'Verifica los datos antes de cargar la trama';
    this.listaInfo = [];
    this.listaEmpresa = [];
    this.listaEmpresaSub = [];
    this.listaTipoPago = [];

    // this.listaCanales = [];
    // this.permisos = [];
    this.convenioRolCliente = '';
    this.plan = '';
    this.sede = '';
    this.codigoBpUnidVenta = '';
    this.tipoCanal = '0';
    this.tiposelected = '0';
    this.empresaselected = '0';
    this.tiposelected2 = '0';
    this.empresaselected2 = '0';
    this.tiposelected3 = '0';
    this.empresaselected3 = '0';
    this.tiposelected4 = '0';
    this.empresaselected4 = '0';
    this.empresaSubselected = '0';
    this.empresaSub = false;
    this.errorTipo = false;
    this.errorEmpresa = false;
    this.errorTrama = false;
    this.errorTipo2 = false;
    this.errorEmpresa2 = false;
    this.errorTrama2 = false;
    this.errorTipo3 = false;
    this.errorEmpresa3 = false;
    this.errorTrama3 = false;
    this.errorTipo4 = false;
    this.errorEmpresa4 = false;
    this.errorTrama4 = false;
    this.errorEmpresa5 = false;
    this.convenioRolRecaudador = '';
    this.nConvenioRecaudador = '';
    this.capitalizado = '';
    this.tipoRol = '';
    this.codigoBroker = '';
    this.tipoRol2 = '';
    this.convenioRolUnidVenta = '';
    this.convenioRolBroker = '';
    this.mostrarConvenios = false;
    this.tipoempresaselected = '0';
    this.mostrarArchivo = false;
    this.archivoPago = '';
    this.horaTransc = '';
    this.minutosTransc = '';
    this.extension = '';
    this.nombre_archivo = '';
    this.file = '';
    this.tipoIdentificacion = '';
    this.nroIdentificacion = '';
    this.codigoEmpresa = '';
    this.razonSocial = '';
    this.rol = '';
    this.grupo_vendedor = '';
    this.numero_convenio = '';
    this.archivo;
    this.hide = false;
    this.showConvenio = true;
    this.codBpVendedor = '';
    this.codBpBroker = '';
    this.codBpConvBroker = '';
    this.codEmpRecaud = '';
    this.canalVenta = '';
    this.nombreEmpresa = '';
    this.formaPlan = '';
    this.tipoVia = '';
    this.codOncosys = '';
    this.nombreVia = '';
    this.form_manzana = '';
    this.lote = '';
    this.dpt = '';
    this.departamento = '';
    this.urbanizacion = '';
    this.provincia = '';
    this.distrito = '';
    this.referencia = '';
    this.archivoDePagoExpirado = null;
    this.finalizarProceso = null;
    this.codigoBPSede = null;
    this.codBpRolCliente = null;
    this.tipoempresa = '';
    this.rucSubrogada = null;
    this.razonSocialSubrogado = null;
    this.bpSapSubrogador = null;
    this.descripcionSede = null;
    this.id_empresa = null;
    this.bp_empresa = null;
    this.codConvenioBpVendedor = null;
    this.bp_sap_cliente = null;
    this.brokerList = null;
    this.clearEmpresa();
  }

  alertError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocurrio un error en el archivo procesado',
    });
  }

  openFile(event) {
    var ext = event.target.files[0].type.toString();
    var extension = '';
    if (
      ext == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
      extension = 'xlsx';
    if (ext == 'application/vnd.ms-excel') extension = 'xls';
    if (ext == 'text/plain') extension = 'txt';
    var nombre_archivo = event.target.files[0].name.split('.txt')[0];
    nombre_archivo = nombre_archivo.split('.TXT')[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      var contenido = '';
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        contenido = reader.result.toString();
        this.file = contenido.split(';base64,')[1];
        this.tramaSer
          .cargarArchivoPago(
            extension,
            this.file,
            this.tiposelected,
            nombre_archivo
          )
          .subscribe((response) => {
            if (response['success']) {
              console.log(response);

              this.reportSer
                .duracionTiempoTransc(this.tiposelected)
                .subscribe((response) => {
                  console.log(response['data'][0].horas_transcurridas);
                  var tiempoTranscurrido =
                    response['data'][0].horas_transcurridas;
                  this.horaTransc = tiempoTranscurrido.split(':')[0];
                  this.minutosTransc = tiempoTranscurrido.split(':')[1];
                  this.archivoDePagoExpirado =
                    Number(tiempoTranscurrido.split(':')[0]) >= 24;

                  Swal.fire({
                    icon: 'success',
                    title: 'Proceso completado',
                    text: 'El archivo se cargó exitosamente',
                  });
                });
            }
          });
      };
    }
  }

  async openFileTrama(event) {
    this.errorTrama = false;
    this.errorTrama2 = false;
    this.errorTrama3 = false;
    this.errorTrama4 = false;

    var ext = event.target.files[0].type.toString();
    var archivo = event.target.files[0].name;
    if (
      ext ==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      ext == 'application/vnd.ms-excel'
    ) {
      this.extension = 'xlsx';
      this.nombre_archivo = archivo.split('.xlsx')[0];
    }
    if (ext == 'application/vnd.ms-excel') {
      this.extension = 'xls';
      this.nombre_archivo = archivo.split('.xls')[0];
    }

    if (ext == 'text/plain') {
      this.extension = 'txt';
      this.nombre_archivo = archivo.split('.txt')[0];
      this.nombre_archivo = this.nombre_archivo.split('.TXT')[0];
    }
    console.log(this.extension);
    console.log(this.nombre_archivo);
    const reader = new FileReader();
    console.log(reader);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);

      reader.readAsDataURL(file);
      reader.onload = async () => {
        var contenido = reader.result.toString();
        console.log(contenido);
        console.log(reader.result);
        this.archivo = contenido.split(';base64,')[1];
        console.log(this.archivo);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }

  procesarDatos(data) {
    var usuario = JSON.parse(localStorage.getItem('zxc21dsrty5uyj11j1'));
    console.log(usuario);
    var id_usuario = usuario['id_usuario'];
    var id_empresa = this.id_empresa;
    console.log(this.listaInfo);
    console.log(this.tiposelected);
    var nombreCanal = this.listaInfo.find(
      (el) => el.id_tipo_trama == this.tiposelected
    ).tipo_trama;
    console.log(
      this.listaInfo.find((el) => el.id_tipo_trama == this.tiposelected)
    );
    console.log(nombreCanal);
    console.log(this.listaInfo);
    console.log(this.horaTransc);

    var nombreTrama = this.listaCanales.find(
      (el) => el.id_canal == this.tipoCanal
    ).canal;

    console.log(nombreCanal);
    if (data == '1') {
      console.log(nombreTrama);
      $('.errorborderdata').removeClass('form-error');
      $('.errorborderdata2').removeClass('form-error');

      this.errorTipo = false;
      this.errorEmpresa = false;
      this.errorTrama = false;
      console.log('1');
      if (this.horaTransc && Number(this.horaTransc) >= 24) {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar la trama',
          text: 'Debes volver a cargar el archivo de pago',
        });
        return false;
      }

      console.log('2');
      if (this.tiposelected == '0') {
        this.errorTipo = true;
        $('.errorborderdata').addClass('form-error');
        return false;
      }
      console.log('3');

      if (this.empresaselected == '0') {
        this.errorEmpresa = true;
        $('.errorborderdata2').addClass('form-error');
        return false;
      }
      console.log('4');

      console.log(this.nombre_archivo);
      if ($('#fileInput1').val() == '') {
        this.errorTrama = true;
        return false;
      }
      if (!this.nombre_archivo) {
        this.errorTrama = true;
        return false;
      }

      Swal.fire({
        title: 'Cargando trama',
        didOpen: () => {
          Swal.showLoading();
        },
      });

      this.tramaSer
        .registrarTramaTmk(
          this.extension,
          this.nombre_archivo,
          this.archivo,
          nombreTrama,
          nombreCanal,
          this.bp_empresa,
          this.tipoCanal,
          id_usuario,
          this.tiposelected,
          id_empresa
        )
        .subscribe(
          (response: {
            code: number;
            success: boolean;
            data: any;
            file: string;
          }) => {
            console.log(response);
            const intervaloRevisar = setInterval(() => {
              console.log('ejecutado');

              this.tramaSer
                .revisarEstadoProceso(response.code)
                .subscribe((res) => {
                  console.log(res);
                  if (res['data'][0]['estado'] != 0) {
                    clearInterval(intervaloRevisar);
                    this.finalizarProceso = true;
                    Swal.close();

                    console.log(response);
                    if (response['success']) {
                      Swal.fire({
                        icon: 'success',
                        title: 'Proceso completado',
                        text: 'El archivo se cargó exitosamente',
                      });
                      this.resetVariables();
                    } else {
                      Swal.fire({
                        icon: 'error',
                        title: 'Error al cargar la trama',
                        text: response['message'],
                      });
                    }
                  }
                });
            }, 5000);
          }
        );
    }

    if (data == '2') {
      $('.errorborderdata3').removeClass('form-error');
      $('.errorborderdata4').removeClass('form-error');

      this.errorTipo2 = false;
      this.errorEmpresa2 = false;
      this.errorTrama2 = false;

      if (this.tiposelected == '0') {
        this.errorTipo2 = true;
        $('.errorborderdata3').addClass('form-error');
        return false;
      }

      if (this.empresaselected2 == '0') {
        this.errorEmpresa2 = true;
        $('.errorborderdata4').addClass('form-error');
        return false;
      }

      if ($('#fileInput2').val() == '') {
        this.errorTrama2 = true;
        return false;
      }
      // var nombreTrama = $('#tipoCanalByS option:selected').text();
      console.log(this.tiposelected);
      if (this.tiposelected == '1' || this.tiposelected == '2') {
        Swal.fire({
          title: 'Cargando trama',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.tramaSer
          .registrarTramaByS(
            this.extension,
            this.archivo,
            this.nombre_archivo,
            nombreTrama,
            this.tipoCanal,
            nombreCanal,
            this.codigoEmpresa,
            id_usuario,
            this.tiposelected,
            id_empresa,
            this.codOncosys,
            this.capitalizado,
            this.codBpVendedor,
            this.codConvenioBpVendedor,
            this.codBpBroker,
            this.codBpConvBroker,
            this.tipoRol,
            this.nConvenioRecaudador,
            this.canalVenta
          )
          .subscribe((response) => {
            console.log(response);
            if (response['success']) {
              this.tipoCanal = '0';
              this.telemarketing = false;
              this.bancayseguros = false;
              this.grupales = false;
              this.generica = false;

              const intervaloRevisar = setInterval(() => {
                console.log('ejecutado');

                this.tramaSer
                  .revisarEstadoProceso(response['code'])
                  .subscribe((res) => {
                    console.log(res);
                    if (res['data'][0]['estado'] != 0) {
                      clearInterval(intervaloRevisar);
                      this.finalizarProceso = true;
                      Swal.close();

                      console.log(response);
                      if (response['success']) {
                        Swal.fire({
                          icon: 'success',
                          title: 'Proceso completado',
                          text: 'El archivo se cargó exitosamente',
                        });
                        this.resetVariables();
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error al cargar la trama',
                          text: response['message'],
                        });
                      }
                    }
                  });
              }, 5000);
            }
          });
      } else {
        Swal.fire({
          title: 'Cargando trama',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.tramaSer
          .registrarTramaRecaudo(
            this.extension,
            this.nombre_archivo,
            this.archivo,
            nombreTrama,
            nombreCanal,
            this.codOncosys,
            this.tipoCanal,
            id_usuario,
            this.tiposelected,
            id_empresa,
            this.nroIdentificacion
          )
          .subscribe((response) => {
            console.log('das asdasdasd asd adasd asd asd  asd');
            console.log(response);
            if (response['success']) {
              this.tipoCanal = '0';
              this.telemarketing = false;
              this.bancayseguros = false;
              this.grupales = false;
              this.generica = false;
              const intervaloRevisar = setInterval(() => {
                console.log('ejecutado');

                this.tramaSer
                  .revisarEstadoProceso(response['code'])
                  .subscribe((res) => {
                    console.log(res);
                    if (res['data'][0]['estado'] != 0) {
                      clearInterval(intervaloRevisar);
                      this.finalizarProceso = true;
                      Swal.close();

                      console.log(response);
                      if (response['success']) {
                        Swal.fire({
                          icon: 'success',
                          title: 'Proceso completado',
                          text: 'El archivo se cargó exitosamente',
                        });
                        this.resetVariables();
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error al cargar la trama',
                          text: response['message'],
                        });
                      }
                    }
                  });
              }, 5000);
            }
          });
      }
    }

    if (data == '3') {
      $('.errorborderdata5').removeClass('form-error');
      $('.errorborderdata6').removeClass('form-error');
      $('.errorborderdata9').removeClass('form-error');

      this.errorTipo3 = false;
      this.errorEmpresa3 = false;
      this.errorTrama3 = false;
      this.errorEmpresa5 = false;

      if (this.tiposelected == '0') {
        this.errorTipo3 = true;
        $('.errorborderdata5').addClass('form-error');
        return false;
      }

      if (this.empresaselected3 == '0') {
        this.errorEmpresa3 = true;
        $('.errorborderdata6').addClass('form-error');
        return false;
      }

      if ($('#fileInput3').val() == '') {
        this.errorTrama3 = true;
        return false;
      }
      // var nombreTrama = $('#tipoCanalGrup option:selected').text();
      console.log(nombreTrama);

      if (this.tiposelected == '8') {
        Swal.fire({
          title: 'Cargando trama',
          didOpen: () => {
            Swal.showLoading();
          },
        });

        this.tramaSer
          .registrarTramaGrup1(
            this.extension,
            this.nombre_archivo,
            this.archivo,
            nombreTrama,
            this.tipoCanal,
            nombreCanal,
            this.bp_sap_cliente,
            id_usuario,
            this.tiposelected,
            id_empresa,
            this.descripcionSede,
            this.nombreEmpresa,
            this.bpSapSubrogador,
            this.rucSubrogada,
            this.razonSocialSubrogado,
            this.nombre_convenio
          )
          .subscribe((response) => {
            console.log(response);
            if (response['success']) {
              this.tipoCanal = '0';
              this.telemarketing = false;
              this.bancayseguros = false;
              this.grupales = false;
              this.generica = false;
              const intervaloRevisar = setInterval(() => {
                console.log('ejecutado');

                this.tramaSer
                  .revisarEstadoProceso(response['code'])
                  .subscribe((res) => {
                    console.log(res);
                    if (res['data'][0]['estado'] != 0) {
                      clearInterval(intervaloRevisar);
                      this.finalizarProceso = true;
                      Swal.close();

                      console.log(response);
                      if (response['success']) {
                        Swal.fire({
                          icon: 'success',
                          title: 'Proceso completado',
                          text: 'El archivo se cargó exitosamente',
                        });
                        this.resetVariables();
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error al cargar la trama',
                          text: response['message'],
                        });
                      }
                    }
                  });
              }, 5000);
            }
          });
      } else {
        if (!this.convenioRolRecaudador) {
          Swal.fire({
            icon: 'error',
            title: 'No se puede cargar la trama',
            text: 'Falta convenio',
          });

          return;
        }
        if (!this.convenioRolUnidVenta) {
          Swal.fire({
            icon: 'error',
            title: 'No se puede cargar la trama',
            text: 'Falta convenio',
          });

          return;
        }
        Swal.fire({
          title: 'Cargando trama',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.tramaSer
          .registrarTramaGrup2(
            this.extension,
            this.nombre_archivo,
            this.archivo,
            nombreTrama,
            this.tipoCanal,
            nombreCanal,
            this.bp_sap_cliente,
            this.tiposelected,
            id_usuario,
            this.tiposelected,
            id_empresa,
            this.codBpVendedor,
            this.codConvenioBpVendedor,
            this.codBpBroker,
            this.codBpConvBroker,
            this.canalVenta,
            this.formaPlan,
            this.tipoVia,
            this.nombreVia,
            'vacio',
            'vacio',
            'vacio',
            this.form_manzana,
            this.lote,
            this.dpt,
            'vacio',
            'vacio',
            this.departamento,
            this.provincia,
            this.distrito,
            'vacio',
            'vacio',
            'vacio',
            this.numero_convenio,
            this.nroIdentificacion,
            this.numero_convenio,
            this.codigoBPSede,
            this.codBpRolCliente,
            this.tipoempresa,
            this.rucSubrogada,
            this.nombreEmpresa,
            this.razonSocialSubrogado,
            this.bpSapSubrogador,
            this.descripcionSede,
            this.nombre_convenio
          )
          .subscribe((response) => {
            console.log(response);
            if (response['success']) {
              this.tipoCanal = '0';
              this.telemarketing = false;
              this.bancayseguros = false;
              this.grupales = false;
              this.generica = false;
              const intervaloRevisar = setInterval(() => {
                console.log('ejecutado');

                this.tramaSer
                  .revisarEstadoProceso(response['code'])
                  .subscribe((res) => {
                    console.log(res);
                    if (res['data'][0]['estado'] != 0) {
                      clearInterval(intervaloRevisar);
                      this.finalizarProceso = true;
                      Swal.close();

                      console.log(response);
                      if (response['success']) {
                        Swal.fire({
                          icon: 'success',
                          title: 'Proceso completado',
                          text: 'El archivo se cargó exitosamente',
                        });
                        this.resetVariables();
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error al cargar la trama',
                          text: response['message'],
                        });
                      }
                    }
                  });
              }, 5000);
            }
          });
      }
    }

    if (data == '4') {
      $('.errorborderdata7').removeClass('form-error');
      $('.errorborderdata8').removeClass('form-error');

      this.errorEmpresa4 = false;
      this.errorTrama4 = false;

      if (this.tiposelected4 == '0') {
        this.errorTipo4 = true;
        $('.errorborderdata7').addClass('form-error');
        return false;
      }

      if (this.empresaselected4 == '0') {
        this.errorEmpresa4 = true;
        $('.errorborderdata8').addClass('form-error');
        return false;
      }

      if ($('#fileInput4').val() == '') {
        this.errorTrama3 = true;
        return false;
      }
      Swal.fire({
        title: 'Cargando trama',
        didOpen: () => {
          Swal.showLoading();
        },
      });

      this.tramaSer
        .registrarTramaByS(
          this.extension,
          this.archivo,
          this.nombre_archivo,
          data,
          this.tiposelected,
          this.tipoCanal,
          id_usuario,
          id_empresa,
          this.convenioRolUnidVenta,
          this.convenioRolRecaudador,
          '47',
          '1',
          this.codBpVendedor,
          'codconvboven',
          this.codBpBroker,
          this.codBpConvBroker,
          'codbpem',
          'codconrec',
          this.canalVenta
        )
        .subscribe((response) => {
          console.log(response);
          if (response['success']) {
            const intervaloRevisar = setInterval(() => {
              console.log('ejecutado');

              this.tramaSer
                .revisarEstadoProceso(response['code'])
                .subscribe((res) => {
                  console.log(res);
                  if (res['data'][0]['estado'] != 0) {
                    clearInterval(intervaloRevisar);
                    this.finalizarProceso = true;
                    Swal.close();

                    console.log(response);
                    if (response['success']) {
                      Swal.fire({
                        icon: 'success',
                        title: 'Proceso completado',
                        text: 'El archivo se cargó exitosamente',
                      });
                      this.resetVariables();
                    } else {
                      Swal.fire({
                        icon: 'error',
                        title: 'Error al cargar la trama',
                        text: response['message'],
                      });
                    }
                  }
                });
            }, 5000);
          }
        });
    }
  }

  onChangeCanal(data) {
    console.log(data);
    this.convenioRolCliente = '';
    this.convenioRolRecaudador = '';
    this.convenioRolUnidVenta = '';
    this.convenioRolBroker = '';

    if (data == '0') {
      this.telemarketing = false;
      this.bancayseguros = false;
      this.grupales = false;
      this.generica = false;
    }

    if (data == '2') {
      this.telemarketing = true;
      this.bancayseguros = false;
      this.grupales = false;
      this.generica = false;
    }

    if (data == '3') {
      this.telemarketing = false;
      this.bancayseguros = true;
      this.grupales = false;
      this.generica = false;
    }

    if (data == '4') {
      this.telemarketing = false;
      this.bancayseguros = false;
      this.grupales = true;
      this.generica = false;
    }

    if (data == '5') {
      this.telemarketing = false;
      this.bancayseguros = false;
      this.grupales = false;
      this.generica = true;
    }

    if (data != '0') {
      this.loadServ.listarTipoArchivo(data).subscribe((response) => {
        this.listaInfo = response['data'];
        console.log(this.listaInfo);
      });
    }
  }

  onChangeTipoArchivo(data) {
    console.log(data);

    if (data == 1 || data == 2) {
      this.mostrarConvenios = true;
    }
    if (data == 3 || data == 4 || data == 5 || data == 6) {
      this.mostrarConvenios = false;
    }
    if (data == 8) {
      this.showConvenio = false;
      this.listaEmpresa = [];
      this.tipoempresaselected = '0';
    }
    if (data == 7) {
      this.showConvenio = true;
      this.listaEmpresa = [];
      this.tipoempresaselected = '0';
    }
    if (data == 19) {
      this.reportSer.duracionTiempoTransc(data).subscribe((response) => {
        console.log(response['data'][0].horas_transcurridas);
        var tiempoTranscurrido = response['data'][0].horas_transcurridas;
        this.horaTransc = tiempoTranscurrido.split(':')[0];
        this.minutosTransc = tiempoTranscurrido.split(':')[1];
        this.archivoDePagoExpirado =
          Number(tiempoTranscurrido.split(':')[0]) >= 24;
      });
      this.archivoPago = 'Cargar archivo de pago';
      this.mostrarArchivo = true;
    }

    if (data == 20) {
      this.reportSer.duracionTiempoTransc(data).subscribe((response) => {
        console.log(response['data'][0].horas_transcurridas);
        var tiempoTranscurrido = response['data'][0].horas_transcurridas;
        this.horaTransc = tiempoTranscurrido.split(':')[0];
        this.minutosTransc = tiempoTranscurrido.split(':')[1];
        this.archivoDePagoExpirado =
          Number(tiempoTranscurrido.split(':')[0]) >= 24;
      });
      this.archivoDePagoExpirado = Number(this.horaTransc) >= 24;
      this.archivoPago = 'Cargar archivo de afiliación';
      this.mostrarArchivo = true;
    }

    this.loadServ.listarEmpresaTipoArchivo(data).subscribe((response) => {
      this.listaEmpresa = response['data'].filter((el) => el.estado == 1);
      console.log(this.listaEmpresa);
    });

    $('.errorborderdata2').removeClass('form-error');
    $('.errorborderdata4').removeClass('form-error');
    $('.errorborderdata6').removeClass('form-error');
    $('.errorborderdata8').removeClass('form-error');
    this.errorEmpresa = false;
    this.errorEmpresa2 = false;
    this.errorEmpresa3 = false;
    this.errorEmpresa4 = false;
    this.empresaselected = '0';
    this.empresaselected2 = '0';
    this.empresaselected3 = '0';
    this.empresaselected4 = '0';
    this.plan = '';
    this.sede = '';
    this.convenioRolCliente = '';
    this.convenioRolRecaudador = '';
    this.convenioRolUnidVenta = '';
    this.convenioRolBroker = '';
  }

  handleSecondCall(
    grupoVendedorSW,
    unidadVenta,
    conveniosList,
    result,
    index = 0
  ) {
    console.log(unidadVenta);
    // unidadVenta[index]['CodigoBPUnidadVenta'],
    this.loadServ
      .listarEmpresa(
        this.tipoIdentificacion,
        '',
        unidadVenta[index]['CodigoBPUnidadVenta'],
        this.razonSocial,
        '00',
        '',
        ''
      )
      .subscribe((responseDos) => {
        console.log(responseDos);

        if (!responseDos['data']['Response']['DatosEmpresa']) {
          this.handleSecondCall(
            grupoVendedorSW,
            unidadVenta,
            conveniosList,
            result,
            index + 1
          );
          return;
        }
        var result2 = responseDos['data']['Response']['DatosEmpresa'][0];
        var conveniosListTwo = result2['DatosConvenio'];
        if (!Array.isArray(conveniosListTwo)) {
          conveniosListTwo = [conveniosListTwo];
        }
        console.log(conveniosListTwo);
        console.log(grupoVendedorSW);
        console.log(unidadVenta[index]['CodigoBPUnidadVenta']);

        for (let i = 0; i < conveniosListTwo.length; i++) {
          if (
            grupoVendedorSW ==
            conveniosListTwo[i]['DatosCabecera']['GrupoVendedor']
          ) {
            console.log('completado');

            this.convenioRolUnidVenta =
              conveniosListTwo[0]['DatosCabecera']['Convenio'] +
              ' ' +
              result2['DatosGenerales']['RazonSocial'] +
              ' ' +
              conveniosListTwo[0]['DatosCabecera']['DescripcionGpoVendedor'];

            this.codBpVendedor =
              conveniosList[0]['UnidadVenta'][index]['CodigoBPUnidadVenta'];
            this.codConvenioBpVendedor =
              conveniosListTwo[0]['DatosCabecera']['Convenio'];
            this.handleThirdCall(this.brokerList);

            // if (conveniosList[i]['Broker'] != undefined) {
            //   // si tiene Broker
            //   this.codBpBroker = result['Convenio']['Broker'][0].CodigoBPBroker;
            //   console.log(this.codBpVendedor);
            //   console.log(this.codBpBroker);
            // }
          } else if (i == conveniosListTwo.length - 1) {
            Swal.fire({
              text: 'El Grupo no coinciden',
            });
          }
        }
      });
  }

  onChangeEmpresa(data) {
    console.log(data);
    this.plan = '';
    this.sede = '';
    this.convenioRolCliente = '';
    this.convenioRolRecaudador = '';
    this.convenioRolUnidVenta = '';
    this.convenioRolBroker = '';
    this.tipoIdentificacion = '';
    this.nroIdentificacion = '';
    this.codigoEmpresa = '';
    this.razonSocial = '';
    this.grupo_vendedor = '';
    this.numero_convenio = '';

    this.listaEmpresa.forEach((element) => {
      if (element.id_empresa == data) {
        console.log('this.tipoempresaselected');
        console.log(element);
        console.log(this.tipoempresaselected);
        this.nroIdentificacion = '';
        this.numero_convenio = element.n_convenio_recaudador;
        this.capitalizado = element.capitalizado;
        this.nroIdentificacion = element.ruc;
        this.tipoRol = element.bp_sap_recaudador;
        this.codBpRolCliente = element.bp_sap_cliente;
        this.nombreEmpresa = element.empresa;
        this.codOncosys = element.cod_empresa_oncosys;
        this.id_empresa = element.id_empresa;
        this.bp_empresa = element.bp_sap;
        this.bp_sap_cliente = element.bp_sap_cliente;
        this.nConvenioRecaudador = element.n_convenio_recaudador;
        this.codOncosys = element.cod_empresa_oncosys;

        console.log('xddd');
        if (this.tipoempresaselected == '2') {
          this.emprSer.listarSubrogados(element.id_empresa).subscribe(
            (response) => {
              console.log('response');
              console.log(response);
              this.listaEmpresaSub = response['data'].filter(
                (el) => el.estado == 1
              );

              console.log(this.listaEmpresaSub);
            },
            (err) => console.log('err:' + err)
          );
        }
      }
    });

    console.log('dasasd');
    if (this.empresaSub) return;
    // Banca y seguros
    if (this.bancayseguros) {
      this.loadServ
        .listarEmpresa(
          this.tipoIdentificacion,
          this.nroIdentificacion,
          this.codigoEmpresa,
          this.razonSocial,
          '01',
          this.grupo_vendedor,
          this.numero_convenio
        )
        .subscribe((response) => {
          console.log('Respuesta de el primer servicio con rol 01 : ');
          // this.numero_convenio
          // '0070010008'

          console.log(response);
          console.log('----------------------------');
          var result = response['data']['Response']['DatosEmpresa'][0];
          var conveniosList = result['DatosConvenio'];
          if (!Array.isArray(conveniosList)) {
            conveniosList = [conveniosList];
          }

          this.canalVenta =
            result['DatosConvenio'][0]['DatosCabecera']['GrupoVendedor'];
          this.codigoEmpresa = result['DatosGenerales']['CodigoEmpresa'];
          this.brokerList = result['DatosConvenio'][0]['Broker'];

          this.grupo_vendedor =
            result['DatosConvenio'][0]['DatosCabecera']['GrupoVendedor'];

          var grupoVendedorSW =
            conveniosList[0]['DatosCabecera']['GrupoVendedor'];
          console.log(grupoVendedorSW);
          this.convenioRolRecaudador =
            conveniosList[0]['DatosCabecera']['Convenio'] +
            ' ' +
            result['DatosGenerales']['RazonSocial'] +
            ' ' +
            conveniosList[0]['DatosCabecera']['DescripcionGpoVendedor'];

          // no tiene Broker, ejecuta vendedor
          var completed = false;
          var unidadVenta = conveniosList[0]['UnidadVenta'];
          var ventaSize = unidadVenta.length;

          console.log(unidadVenta);

          this.handleSecondCall(
            grupoVendedorSW,
            unidadVenta,
            conveniosList,
            result
          );

          /**
          this.convenioRolRecaudador = (result["Convenio"][0]["DatosCabecera"]["NombreConvenio"] + " " + result["DatosGenerales"]["RazonSocial"])
          this.convenioRolBroker = (result["Convenio"][0]["Broker"][0].Nombre1 + " " + result["Convenio"][0]["UnidadVenta"][0].Nombre2 + " " + result["Convenio"][0]["Broker"][0].RazonSocial + " " + result["Convenio"][0]["Broker"][0].DescripcionTipoIdentificacion)
          this.convenioRolCliente = (result["Convenio"][0]["Broker"][0].Nombre1)
          this.sede = (result["Convenio"][0]["Sede"][0].CodigoBPSede + " " + result["Convenio"][0]["Sede"][0].RazonSocial)
          this.codBpVendedor = (result["Convenio"][0]["UnidadVenta"][0]["CodigoBPUnidadVenta"]).toString()
          this.codBpConvBroker = (result["Convenio"][0]["Broker"][0].CodigoConvenioVigente).toString()
          this.codEmpRecaud = (result["Convenio"][0]["DatosCabecera"]["Convenio"]).toString()
          this.canalVenta = (result["Convenio"][0]["DatosCabecera"]["CanalDistribucion"])
          this.sede = (result["Convenio"][0]["Sede"][0]["DescripcionSede"])
          this.nombreEmpresa = (result["Convenio"][0]["Broker"][0].RazonSocial)
          this.formaPlan = (result["Convenio"][0]["DatosCabecera"]["FormaPagoRecaudo"])
          this.tipoVia = (result["DatosGenerales"]["TipoVia"])
          this.codigoEmpresa = (result["DatosGenerales"]["CodigoEmpresa"]).toString()
          this.nombreVia = (result["DatosGenerales"]["NombreVia"])
          this.form_manzana = (result["DatosGenerales"]["Manzana"])
          this.lote = (result["DatosGenerales"]["Lote"]).toString()
          this.dpt = (result["DatosGenerales"]["IntDptoTdaStd"]).toString()
          this.departamento = (result["DatosGenerales"]["DescripcionDepartamento"]).toString()
          this.provincia = (result["DatosGenerales"]["DescipcionProvincia"])
          this.distrito = (result["DatosGenerales"]["DescripcionDistrito"])**/
        }),
        (error) => {
          console.error(error);
        };
    } else {
      //Otros...
      this.consultasGrupales();
    }
  }

  handleThirdCall(brokerList, index = 0) {
    this.loadServ
      .listarEmpresa(
        '',
        '',
        brokerList[index]['CodigoBPBroker'],
        this.razonSocial,
        '03',
        '',
        ''
      )
      .subscribe((response) => {
        console.log(response);
        if (!response['data']['Response']['DatosEmpresa']) {
          this.handleThirdCall(brokerList, 1);
        } else {
          var result3 = response['data']['Response']['DatosEmpresa'][0];

          this.codBpBroker = brokerList[index]['CodigoBPBroker'];
          // this.codConvenioBpVendedor= brokerList[index]["CodigoBPBroker"]
          this.codBpConvBroker =
            result3['DatosConvenio'][0]['DatosCabecera']['Convenio'];
          this.convenioRolBroker =
            result3['DatosConvenio'][0]['DatosCabecera']['Convenio'] +
            ' ' +
            result3['DatosGenerales']['RazonSocial'] +
            ' ' +
            result3['DatosConvenio'][0]['DatosCabecera'][
              'DescripcionGpoVendedor'
            ];
        }
      });
  }

  consultasGrupales() {
    if (this.empresaSub) {
      this.listaEmpresaSub.forEach((el) => {
        if (el.id_empresa == this.empresaSubselected) {
          console.log('subrogador');
          console.log(el);
          // this.nroIdentificacion = el.ruc_subrogado
          this.codBpRolCliente = el.bp_sap_subrogador;
          this.rucSubrogada = el.ruc_subrogado;
          this.razonSocialSubrogado = el.razon_social_subrogado;
          this.bpSapSubrogador = el.bp_sap_subrogador;
        }
      });
    }

    console.log('start grupales');
    console.log(
      this.tipoIdentificacion,
      this.nroIdentificacion,
      this.codigoEmpresa,
      this.razonSocial,
      this.rol,
      this.grupo_vendedor,
      this.numero_convenio
    );
    this.loadServ
      .listarEmpresa(
        this.tipoIdentificacion,
        this.rucSubrogada || this.nroIdentificacion,
        '',
        this.razonSocial,
        '02',
        this.grupo_vendedor,
        ''
      )
      .subscribe((response) => {
        console.log(response);
        var result = response['data']['Response']['DatosEmpresa'][0];

        console.log(response['data']['Response']['DatosEmpresa'][0]);

        this.nombre_convenio =
          result['DatosConvenio'][0]['DatosCabecera']['NombreConvenio'];

        // this.convenioRolCliente =
        //   result['DatosConvenio'][0]['DatosCabecera']['NombreConvenio'] +
        //   ' ' +
        //   result['DatosGenerales']['RazonSocial'] + " " + result['DatosConvenio'][0]['DatosCabecera']["DescripcionGpoVendedor"];

        // Segunda Llamada
        if (
          result['DatosConvenio'][0]['UnidadVenta'] &&
          result['DatosConvenio'][0]['UnidadVenta'][0]['CodigoBPUnidadVenta']
        ) {
          this.codigoEmpresa =
            result['DatosConvenio'][0]['UnidadVenta'][0]['CodigoBPUnidadVenta'];
        }

        // copia---------------------------------------------------------------

        console.log('3');
        this.convenioRolRecaudador =
          result['DatosConvenio'][0]['DatosCabecera']['NombreConvenio'] +
          ' ' +
          result['DatosGenerales']['RazonSocial'] +
          ' ' +
          result['DatosConvenio'][0]['DatosCabecera']['DescripcionGpoVendedor'];

        console.log('2');
        // this.convenioRolUnidVenta =
        //   result['DatosConvenio'][0]['UnidadVenta'][0].Nombre1 +
        //   ' ' +
        //   result['DatosConvenio'][0]['UnidadVenta'][0].Nombre2 +
        //   ' ' +
        //   result['DatosGenerales']['RazonSocial'] +
        //   ' ' +
        //   result['DatosConvenio'][0]['DatosCabecera']['DescripcionGpoVendedor'];

        console.log('1');

        if (result['DatosConvenio'][0]['Broker']) {
          this.convenioRolBroker =
            result['DatosConvenio'][0]['Broker'][0].Nombre1 +
            ' ' +
            result['DatosConvenio'][0]['UnidadVenta']
              ? result['DatosConvenio'][0]['UnidadVenta'][0].Nombre2
              : '' +
                ' ' +
                result['DatosConvenio'][0]['Broker'][0].RazonSocial +
                ' ' +
                result['DatosConvenio'][0]['Broker'][0]
                  .DescripcionTipoIdentificacion;
        }

        console.log('dsadsadsasdadsasd');
        console.log('dsadsadsasdadsasd');

        this.convenioRolCliente =
          result['DatosConvenio'][0]['DatosCabecera']['NombreConvenio'];

        this.numero_convenio =
          result['DatosConvenio'][0]['DatosCabecera']['Convenio'];
        console.log(this.numero_convenio);

        // --------------------SEDE-------------------
        if (result['DatosConvenio'][0].sede) {
          this.codigoBPSede = result['DatosConvenio'][0]?.sede[0].CodigoBPSede;
          this.descripcionSede =
            result['DatosConvenio'][0]?.sede[0].DescripcionSede;

          this.sede =
            result['DatosConvenio'][0]?.sede[0].CodigoBPSede +
            ' ' +
            result['DatosConvenio'][0]?.sede[0].RazonSocial;

          this.sede = result['DatosConvenio'][0]?.sede[0]['DescripcionSede'];
        }

        // --------------------SEDE-------------------

        console.log('dsadsadsasdadsasd');

        this.codBpVendedor =
          result['DatosConvenio'][0]['UnidadVenta'][0][
            'CodigoBPUnidadVenta'
          ].toString();

        if (result['DatosConvenio'][0]['Broker']) {
          this.codBpBroker =
            result['DatosConvenio'][0]['Broker'][0].CodigoBPBroker.toString();
          this.codBpConvBroker =
            result['DatosConvenio'][0][
              'Broker'
            ][0].CodigoConvenioVigente.toString();
          this.nombreEmpresa =
            result['DatosConvenio'][0]['Broker'][0].RazonSocial;
        }

        console.log('dsadsadsasdadsasd');
        this.codEmpRecaud =
          result['DatosConvenio'][0]['DatosCabecera']['Convenio'].toString();

        console.log('dsadsadsasdadsasd');

        this.canalVenta =
          result['DatosConvenio'][0]['DatosCabecera']['GrupoVendedor'];

        this.formaPlan =
          result['DatosConvenio'][0]['DatosCabecera']['FormaPagoRecaudo'];

        this.tipoVia = result['DatosGenerales']['TipoVia'];
        console.log('dsadsadsasdadsasd');

        this.nombreVia = result['DatosGenerales']['NombreVia'];
        this.form_manzana = result['DatosGenerales']['Manzana'];
        // this.lote = result['DatosGenerales']['Lote'].toString();
        // this.dpt = result['DatosGenerales']['IntDptoTdaStd'].toString();
        this.departamento = result['DatosGenerales']['Departamento'].toString();

        console.log('dsadsadsasdadsasd');
        this.provincia = result['DatosGenerales']['Provincia'];
        this.distrito = result['DatosGenerales']['Distrito'];

        this.loadServ
          .listarEmpresa(
            '',
            '',
            this.codigoEmpresa,
            this.razonSocial,
            '00',
            this.grupo_vendedor,
            ''
          )
          .subscribe((res) => {
            console.log(res);

            const result2 = res['data']['Response']['DatosEmpresa'][0];

            // this.convenioRolUnidVenta =result2["DatosConvenio"][0]["DatosCabecera"]["Convenio"]
            console.log(
              result2['DatosConvenio'][0]['DatosCabecera']['NombreConvenio']
            );
            this.convenioRolUnidVenta =
              result2['DatosConvenio'][0]['DatosCabecera']['NombreConvenio'];
            this.codConvenioBpVendedor =
              result2['DatosConvenio'][0]['DatosCabecera']['Convenio'];
            this.loadServ
              .listarEmpresa(
                this.tipoIdentificacion,
                '',
                '',
                this.razonSocial,
                '03',
                '',
                ''
              )
              .subscribe((res2) => {
                console.log(res2);
              });
          });
      }),
      (error) => {
        console.error(error);
      };
  }

  onChangeTipoEmpresa(value) {
    var tipo = '';
    this.clearEmpresa();
    this.listaEmpresa = [];
    this.convenioRolCliente = '';
    this.sede = '';
    console.log(this.listaEmpresa);

    if (value == 1) {
      tipo = 'Independientes';
      this.tipoempresa = 'Empresa independiente';
      this.empresaSub = false;
    } else {
      tipo = 'Subrogadas';
      this.tipoempresa = 'Empresa subrogada';
      this.empresaSub = true;
    }
    this.loadServ
      .listarTipoEmpresa(this.tiposelected, tipo)
      .subscribe((response) => {
        console.log(response);
        this.listaEmpresa = response['data'].filter((el) => el.estado == 1);
      });
  }

  /*
  onChangeTipoTrama(data) {
    console.log("*tipo")
    console.log(data);
    this.loadServ.listarEmpresaTipoArchivo(data).subscribe(response => {
      this.listaEmpresa = response["data"];
      console.log(response);
    });
  }
*/
}
