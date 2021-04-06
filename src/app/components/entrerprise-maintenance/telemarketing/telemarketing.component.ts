import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatatableService } from 'src/app/services/utils/datatable.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { LoadService } from 'src/app/services/load.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresasService } from 'src/app/services/empresas.service';

declare var $: any;

@Component({
  selector: 'app-telemarketing',
  templateUrl: './telemarketing.component.html',
  styleUrls: ['./telemarketing.component.css']
})

export class TelemarketingComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  listaEmpresas = [];
  listaCanales = []
  listaCanales2 = []
  idCanals = ""
  canalSelected = ""
  ruc_empresa = ""
  nom_empresa = ""
  bp_sap = ""
  codEmprOn = ""
  bpSapRec = ""
  bancaSeguro = ""
  nConvenioRec = ""
  bpSapCliente = ""
  id_empresa = ""
  rucEmpresa = ""
  mostrar: boolean = false
  showTable: boolean = false
  errorRucTmk = false;
  showTableEdit: boolean = false
  mostrarRadioTmk = false;
  mostrarRadioBS = false
  tipo_trama = ""

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
    localStorage.setItem('countsub', "0")
  }

  listarEmpresas() {
    this.empServ.listarEmpresas("2").subscribe(response => {
      this.listaEmpresas = response["data"];
      console.log(response)
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  abrirModalRegistrar() {
    this.canalSelected = "2"
    this.ruc_empresa = ""
    this.nom_empresa = ""
    this.bp_sap = ""
    this.codEmprOn = ""
    this.bpSapRec = ""
    this.bancaSeguro = ""
    this.nConvenioRec = ""
    this.bpSapCliente = ""

    $("#contentModalVendedor").modal("show");
  }


  btnRegistrar() {
    var request
    this.errorRucTmk = false;
    $(".errorborderdata").removeClass("form-error");

    if (this.ruc_empresa == "") {
      this.errorRucTmk = true;
      $(".errorborderdata").addClass("form-error");
      return false;
    }

    var tempregu = false;
    var temppospc = false;
    var tipo_trama = "";

    if ($("#regular").is(':checked')) {
      tempregu = true;
    }
    if ($("#pospc").is(':checked')) {
      temppospc = true;
    }
    if(tempregu == true && temppospc == true ){
      tipo_trama = "19-20"
    }else if(tempregu){
      tipo_trama = "20"
    }else if(temppospc){
      tipo_trama = "19"
    }else{
      this.errorRucTmk = true;
      $(".errorborderdata").addClass("form-error");
      return false;
    }

    request = {
      action: "crear",
      ruc_empresa: this.ruc_empresa,
      nom_empresa: this.nom_empresa,
      bp_sap: this.bp_sap,
      canal: parseInt(this.canalSelected),
      tipo_trama: tipo_trama
    }

    console.log(request)

    this.empServ.crearEmpresas(request).subscribe(response => {
      console.log(response)
      if (response['success'] == true) {
        Swal.fire({
          icon: 'success',
          title: 'Proceso completado',
          text: 'Registro exitoso',
        });
        $("#contentModalVendedor").modal("hide");

        this.dtTrigger.unsubscribe();
        this.listarEmpresas();
        document.location.reload()
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Hubo un error',
          text: response['message'],
        });
        $("#contentModalVendedor").modal("hide");
      }
    });
  }

  abrirModalActualizar(id_empresa) {

    $("#contentModalActualizar").modal("show"); 
    //var oblig = $('input:radio[name=optradio2]');
    //oblig.filter('[value=0]').attr('checked', false);
    //oblig.filter('[value=1]').attr('checked', false);
    $('#regular2').attr('checked', false);
    $('#pospc2').attr('checked', false);
    this.canalSelected = "2"
    this.ruc_empresa = ""
    this.nom_empresa = ""
    this.bp_sap = ""
    this.codEmprOn = ""
    this.bpSapRec = ""
    this.bancaSeguro = ""
    this.nConvenioRec = ""
    this.bpSapCliente = ""

    this.listaEmpresas.forEach(element => {
      if (element.id_empresa == id_empresa) {
        this.id_empresa = element.id_empresa
        this.ruc_empresa = element.ruc
        this.nom_empresa = element.empresa
        console.log(element)
        this.bp_sap = element.bp_sap 
        var tiposTramas = (element.tipo_trama).split(",");
        console.log(tiposTramas);
        for (let index = 0; index < tiposTramas.length; index++) {
          console.log(tiposTramas[index]);
          if(tiposTramas[index] == "20"){
            //oblig.filter('[value=0]').attr('checked', true);
            $('#regular2').attr('checked', true);
          }
          if(tiposTramas[index] == "19"){
            //oblig.filter('[value=1]').attr('checked', true);
            $('#pospc2').attr('checked', true);
          }
        }
      }
    })
  }

  btnActualizar() {
    
    var tempregu = false;
    var temppospc = false;
    var tipo_trama = "";
    if ($("#regular2").is(':checked')) {
      tempregu = true;
    }
    if ($("#pospc2").is(':checked')) {
      temppospc = true;
    }
    if(tempregu == true && temppospc == true ){
      tipo_trama = "19,20"
    }else if(tempregu){
      tipo_trama = "20"
    }else if(temppospc){
      tipo_trama = "19"
    }else{
      return false;
    }
  
    var request = {
      action: "actualizar",
      id_empresa: this.id_empresa,
      ruc_empresa: this.ruc_empresa,
      nom_empresa: this.nom_empresa,
      tipo_trama: tipo_trama,
      bp_sap: this.bp_sap,
      canal: parseInt(this.canalSelected)
    }
    console.log(request);
    this.empServ.actualizarEmpresas(request).subscribe(response => {
      if (response['success'] == true) {
        Swal.fire({
          icon: 'success',
          title: 'Proceso completado',
          text: 'Empresa actualizada correctamente',
        });

        $("#contentModalActualizar").modal("hide");

        this.dtTrigger.unsubscribe();
        this.listarEmpresas();
        document.location.reload()
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Hubo un error',
          text: response['message'],
        });
        $("#contentModalActualizar").modal("hide");
      }
    }, error => {
      console.log(error)
    });
  }

  abrirModalDesactivar(id_empresa) {
    console.log(id_empresa)
    Swal.fire({
      title: '¿Quiere desactivar la empresa?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.empServ.cambiarEstadoEmpresas(id_empresa, 0).subscribe(response => {
          if (response['success']) {
            Swal.fire('Estado actualizado', '', 'success')
            console.log(response)
            this.dtTrigger.unsubscribe();
            //this.listarEmpresas();
            document.location.reload()
          }
        });
      }
    })
  }

  abrirModalActivar(id_empresa) {
    console.log(id_empresa)
    Swal.fire({
      title: '¿Quiere activar la empresa?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.empServ.cambiarEstadoEmpresas(id_empresa, 1).subscribe(response => {
          if (response['success']) {
            Swal.fire('Estado actualizado', '', 'success')
            console.log(response)
            this.dtTrigger.unsubscribe();
            this.listarEmpresas();
            document.location.reload()
          }
        });
      }
    })
  }


}
