import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatatableService } from 'src/app/services/utils/datatable.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { LoadService } from 'src/app/services/load.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresasService } from 'src/app/services/empresas.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ParsedEvent } from '@angular/compiler';

declare var $: any;

@Component({
  selector: 'app-banca-seguro',
  templateUrl: './banca-seguro.component.html',
  styleUrls: ['./banca-seguro.component.css'],
})
export class BancaSeguroComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  listaEmpresas = [];
  idCanals = '';
  canalSelected = '3';
  ruc_empresa = '';
  nom_empresa = '';
  bp_sap = '';
  codEmprOn = '';
  bpSapRec = '';
  bancaSeguro = '';
  nConvenioRec = '';
  bpSapCliente = '';
  id_empresa = '';
  bpSapX = '';
  rucEmpresa = '';
  errorRucTmk = false;
  listaSubrogAntes = [];
  radioTmkReg;
  radioTmkPos;
  tipo_trama = [];
  isCmr: boolean;

  constructor(
    private empServ: EmpresasService,
    public loadServ: LoadService,
    private utilsDt: DatatableService,
    private formBuilder: FormBuilder,
    public authSer: AuthService
  ) {
    this.listaEmpresas = [];
    this.dtTrigger = new Subject();
    this.dtOptions = this.utilsDt.optionsDataTable();
  }

  ngOnInit(): void {
    this.listarEmpresas();
    //this.listarEmpSubrog()
    /*this.registerCmrForm = this.formBuilder.group({
      action: "crear",
      ruc_empresa: ['', [Validators.required]],
      nom_empresa: ['', [Validators.required]],
      bp_sap: ['', [Validators.required]],
    });
    this.updateCmrForm = this.formBuilder.group({
      action: "actualizar",
      producto_cmr: ['', [Validators.required]],
      programa_cmr: ['', [Validators.required]],
      plan_cmr_sap: ['', [Validators.required]],
    });*/
    localStorage.setItem('countsub', '0');
  }

  listarEmpresas() {
    this.empServ.listarEmpresas('3').subscribe((response) => {
      this.listaEmpresas = response['data'];
      console.log(response);
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  abrirModal() {
    this.canalSelected = '3';
    this.ruc_empresa = '';
    this.nom_empresa = '';
    this.bp_sap = '';
    this.codEmprOn = '';
    this.bpSapRec = '';
    this.bancaSeguro = '';
    this.nConvenioRec = '';
    this.bpSapCliente = '';

    $('#contentModalVendedor').modal('show');
  }

  btnRegistrar() {
    var request;
    this.errorRucTmk = false;
    $('.errorborderdata').removeClass('form-error');

    if (this.ruc_empresa == '') {
      this.errorRucTmk = true;
      $('.errorborderdata').addClass('form-error');
      return false;
    }
    if ($('#cmr').is(':checked')) {
      var tipo_trama = '2-4-6';
    } else if ($('#regular').is(':checked')) {
      var tipo_trama = '1-3-5';
    }

    if ($('#agregarCapitalizado').prop('checked')) {
      var capitalizado = '1';
    } else {
      var capitalizado = '0';
    }

    request = {
      action: 'crear',
      ruc_empresa: this.ruc_empresa,
      nom_empresa: this.nom_empresa,
      canal: parseInt(this.canalSelected),
      cod_empresa_oncosys: this.codEmprOn,
      bp_sap_recaudador: this.bpSapRec,
      nombre_bca_seguro: this.bancaSeguro,
      n_convenio_recaudador: this.nConvenioRec,
      capitalizado: capitalizado,
      tipo_trama: tipo_trama,
    };

    console.log(request);
    this.empServ.crearEmpresas(request).subscribe((response) => {
      console.log(response);
      if (response['success'] == true) {
        Swal.fire({
          icon: 'success',
          title: 'Proceso completado',
          text: 'Registro exitoso',
        });
        $('#contentModalVendedor').modal('hide');

        this.dtTrigger.unsubscribe();
        //this.listarEmpresas();
        document.location.reload();
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Hubo un error',
          text: response['message'],
        });
        $('#contentModalVendedor').modal('hide');
      }
    });
  }

  abrirModalActualizar(id_empresa) {
    console.log(id_empresa);
    $('#contentModalActualizar').modal('show');
    this.ruc_empresa = '';
    this.nom_empresa = '';
    this.bp_sap = '';
    this.codEmprOn = '';
    this.bpSapRec = '';
    this.nConvenioRec = '';
    this.bpSapCliente = '';
    var oblig = $('input:radio[name=optradio]');
    oblig.filter('[value=0]').attr('checked', false);
    oblig.filter('[value=1]').attr('checked', false);

    this.listaEmpresas.forEach((element) => {
      var tipo_trama;
      if (element.id_empresa == id_empresa) {
        this.id_empresa = element.id_empresa;
        this.ruc_empresa = element.ruc;
        this.nom_empresa = element.empresa;
        console.log(element);
        this.codEmprOn = element.cod_empresa_oncosys;
        this.bpSapRec = element.bp_sap_recaudador;
        this.bancaSeguro = element.nombre_bca_seguro;
        this.nConvenioRec = element.n_convenio_recaudador;
        tipo_trama = element.tipo_trama;
        console.log(element);
        $('#actualizarCapitalizado').val(element.capitalizado == 1);
        console.log(element.capitalizado == 1);
        console.log($('#actualizarCapitalizado').val());

        $('#actualizarCapitalizado').bootstrapToggle(
          element.capitalizado == 1 ? 'on' : 'off'
        );
        if (tipo_trama.includes('2')) {
          if (tipo_trama.includes('4')) {
            if (tipo_trama.includes('6')) {
              oblig.filter('[value=0]').attr('checked', true);
              this.isCmr = true;
            }
          }
        } else {
          if (tipo_trama.includes('1')) {
            if (tipo_trama.includes('3')) {
              if (tipo_trama.includes('5')) {
                oblig.filter('[value=1]').attr('checked', true);
                this.isCmr = false;
              }
            }
          }
        }
        /*if(element.tipo_trama == "2,4,6" || element.tipo_trama == "4,2,6" || element.tipo_trama == "6,2,4") {
          oblig.filter('[value=0]').attr('checked', true);
        } else if(element.tipo_trama == "1,3,5") {
          oblig.filter('[value=1]').attr('checked', true);
        }*/
      }
    });
  }

  btnActualizar() {
    if ($('#cmr2').is(':checked')) {
      var tipo_trama = '2,4,6';
      console.log('cmr');
    } else if ($('#regular2').is(':checked')) {
      var tipo_trama = '1,3,5';
      console.log('regular');
    }
    if ($('#actualizarCapitalizado').prop('checked')) {
      var capitalizado = '1';
    } else {
      var capitalizado = '0';
    }
    var request;
    request = {
      action: 'actualizar',
      id_empresa: this.id_empresa + '',
      ruc_empresa: this.ruc_empresa,
      nom_empresa: this.nom_empresa,
      tipo_trama: tipo_trama,
      canal: parseInt(this.canalSelected),
      cod_empresa_oncosys: this.codEmprOn,
      bp_sap_recaudador: this.bpSapRec,
      nombre_bca_seguro: this.bancaSeguro,
      n_convenio_recaudador: this.nConvenioRec,
      capitalizado: capitalizado,
    };
    console.log('adsda');
    console.log(request);
    Swal.fire({
      title: 'Cargando',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.empServ.actualizarEmpresas(request).subscribe(
      (response) => {
        Swal.close();
        console.log('response');
        console.log(response);
        if (response['success'] == true) {
          Swal.fire({
            icon: 'success',
            title: 'Proceso completado',
            text: 'Empresa actualizada correctamente',
          });

          $('#contentModalActualizar').modal('hide');

          this.dtTrigger.unsubscribe();
          this.listarEmpresas();
          // document.location.reload();
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Hubo un error',
            text: response['message'],
          });
          $('#contentModalActualizar').modal('hide');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  abrirModalDesactivar(id_empresa) {
    console.log(id_empresa);
    Swal.fire({
      title: '¿Quiere desactivar la empresa?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.empServ
          .cambiarEstadoEmpresas(id_empresa, 0)
          .subscribe((response) => {
            if (response['success']) {
              Swal.fire('Estado actualizado', '', 'success');
              console.log(response);
              this.dtTrigger.unsubscribe();
              //this.listarEmpresas();
              document.location.reload();
            }
          });
      }
    });
  }

  abrirModalActivar(id_empresa) {
    console.log(id_empresa);
    Swal.fire({
      title: '¿Quiere activar la empresa?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.empServ
          .cambiarEstadoEmpresas(id_empresa, 1)
          .subscribe((response) => {
            if (response['success']) {
              Swal.fire('Estado actualizado', '', 'success');
              console.log(response);
              this.dtTrigger.unsubscribe();
              //this.listarEmpresas();
              document.location.reload();
            }
          });
      }
    });
  }
}
