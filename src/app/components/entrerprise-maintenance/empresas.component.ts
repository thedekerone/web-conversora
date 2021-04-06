import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatatableService } from 'src/app/services/utils/datatable.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { LoadService } from 'src/app/services/load.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresasService } from 'src/app/services/empresas.service';

declare var $: any;

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})

export class EmpresasComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  listaEmpresas = [];
  listaCanales = []
  listaCanales2 = []
  telemarketing: boolean = false;
  bancayseguros: boolean = false;
  grupales: boolean = false;
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
  emprSubrogada = ""
  rucSubrogada = ""
  bpSubrogada = ""
  id_empresa = ""
  id_empresa_sub = ""
  bpSapX = ""
  updateSubrogado: boolean = false
  addSubrogado: boolean = false
  rucEmpresa = ""
  mostrar: boolean = false
  showTable: boolean = false
  listaSubrog = []
  listaSubrog2 = []
  listaSubrogados = []
  errorRucTmk = false;
  listaSubrogAntes = []
  showTableEdit: boolean = false
  emprSubrogadaUpdate = ""
  rucSubrogadaUpdate = ""
  bpSubrogadaUpdate = ""
  mostrarRadioTmk = false;
  mostrarRadioBS = false
  radioTmkReg
  radioTmkPos

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
    this.empServ.listarEmpresas("").subscribe(response => {
      this.listaEmpresas = response["data"];
      console.log(response)
      this.dtTrigger.next();
    });
  }

  listarEmpSubrog() {
    var cantidad = localStorage.getItem('countsub')
    for (let i = 0; i < Number(cantidad); i++) {
      this.listaSubrog.push(localStorage.getItem('subrogada' + i))
    }
    console.log(this.listaSubrog)
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  abrirModal() {
    this.addSubrogado = false
    this.canalSelected = "0"
    this.ruc_empresa = ""
    this.nom_empresa = ""
    this.bp_sap = ""
    this.codEmprOn = ""
    this.bpSapRec = ""
    this.bancaSeguro = ""
    this.nConvenioRec = ""
    this.bpSapCliente = ""
    this.emprSubrogada = ""
    this.rucSubrogada = ""
    this.bpSubrogada = ""
    this.listaSubrog = []
    this.mostrar = false
    this.telemarketing = false
    this.bancayseguros = false
    this.grupales = false

    $("#contentModalVendedor").modal("show");
  }

  onChangeCanal(data) {
    this.mostrar = true
    this.ruc_empresa = ""
    this.nom_empresa = ""

    if (data == "0") {
      this.mostrar = false;
      this.telemarketing = false;
      this.bancayseguros = false;
      this.grupales = false;
      this.mostrarRadioTmk = false;
      this.mostrarRadioBS = false;
    }

    if (data == "2") {
      this.telemarketing = true;
      this.bancayseguros = false;
      this.grupales = false;
      this.mostrarRadioTmk = true;
      this.mostrarRadioBS = false;
    }

    if (data == "3") {
      this.telemarketing = false;
      this.bancayseguros = true;
      this.grupales = false;
      this.mostrarRadioBS = true;
      this.mostrarRadioTmk = false;
    }

    if (data == "4") {
      this.telemarketing = false;
      this.bancayseguros = false;
      this.grupales = true;
      this.addSubrogado = true
      this.showTable = false;
      this.listaSubrog = []
      this.mostrarRadioTmk = false;
      this.mostrarRadioBS = false;
    }
  }

  AbrirModalSubrogado() {
    $("#contentModalSubrogada").modal("show")
    this.emprSubrogada = ""
    this.rucSubrogada = ""
    this.bpSubrogada = ""
  }

  btnAgregarSubrogado(empSubrogada, rucSubrogada, bpSubrogada) {
    this.emprSubrogada = empSubrogada
    this.rucSubrogada = rucSubrogada
    this.bpSubrogada = bpSubrogada
    $("#contentModalSubrogada").modal("hide")
    var listaSub = {
      emprSubrogada: this.emprSubrogada,
      rucSubrogada: this.rucSubrogada,
      bpSubrogada: this.bpSubrogada
    }
    this.showTable = true
    /*var count = "0"
    var cantidad = localStorage.getItem('countsub')
    var cantidadNew

    if(localStorage.getItem('subrogada0') == undefined) {
      localStorage.setItem('subrogada'+count, JSON.stringify(listaSub)) 
      cantidadNew = Number(cantidad) + 1
      $("#dataG").load(" #dataG");
    } else {
        cantidadNew = Number(cantidad) + 1
        localStorage.setItem('subrogada'+cantidadNew, JSON.stringify(listaSub)) 
        localStorage.setItem('countsub', cantidadNew)
        $("#dataG").load(" #dataG");
    }*/

    this.listaSubrog.push(listaSub)
    this.listaSubrogAntes = this.listaSubrog
    console.log(this.listaSubrog)
  }

  quitarEmpresaSubr(value) {
    console.log(value)
    this.listaSubrogAntes.forEach((element, index) => {
      if (index == value) {
        this.listaSubrog.splice(element, 1)
        if (this.listaSubrog.length == 0) {
          this.showTable = false
        }
      }
    })
    console.log(this.listaSubrog)
  }


  btnRegistrar(data) {
    var request
    this.errorRucTmk = false;
    $(".errorborderdata").removeClass("form-error");

    if (this.ruc_empresa == "") {
      this.errorRucTmk = true;
      $(".errorborderdata").addClass("form-error");
      return false;
    }
    if (data == 2) {
      console.log(this.radioTmkPos.value)
      request = {
        action: "crear",
        ruc_empresa: this.ruc_empresa,
        nom_empresa: this.nom_empresa,
        bp_sap: this.bp_sap,
        canal: 2,
        tipo_trama: "1"
      }
    } if (data == 3) {
      request = {
        action: "crear",
        ruc_empresa: this.ruc_empresa,
        nom_empresa: this.nom_empresa,
        canal: 3,
        cod_empresa_oncosys: this.codEmprOn,
        bp_sap_recaudador: this.bpSapRec,
        nombre_bca_seguro: this.bancaSeguro,
        n_convenio_recaudador: this.nConvenioRec,
        capitalizado: "1",
        tipo_trama: "1"
      }
    } if (data == 4) {
      request = {
        action: "crear",
        ruc_empresa: this.ruc_empresa,
        nom_empresa: this.nom_empresa,
        canal: 4,
        bp_sap_cliente: this.bpSapCliente,
        subrogadas: [
          {
            subrogador: this.emprSubrogada,
            ruc_subrogador: this.rucSubrogada,
            razon_social_subrogado: this.nom_empresa,
            ruc_subrogado: this.rucEmpresa,
            bp_sap_subrogador: this.bpSubrogada
          },
        ]
      }
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
        //this.listarEmpresas();
        //document.location.reload()
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

  abrirModalActualizar(ruc) {

    $("#contentModalActualizar").modal("show");
    this.canalSelected = ""
    this.ruc_empresa = ""
    this.nom_empresa = ""
    this.bp_sap = ""
    this.codEmprOn = ""
    this.bpSapRec = ""
    this.bancaSeguro = ""
    this.nConvenioRec = ""
    this.bpSapCliente = ""
    this.emprSubrogada = ""
    this.rucSubrogada = ""
    this.bpSubrogada = ""
    this.listaSubrog2 = []

    this.listaEmpresas.forEach(element => {
      if (element.ruc == ruc) {
        this.id_empresa = element.id_empresa
        this.canalSelected = element.id_canal
        this.ruc_empresa = element.ruc
        this.nom_empresa = element.empresa
        if (element.id_canal == 2) {
          this.telemarketing = true;
          this.bancayseguros = false;
          this.grupales = false;
          this.bp_sap = element.bp_sap
          this.bpSapX = this.bp_sap
          this.showTableEdit = false
        }
        if (element.id_canal == 3) {
          this.telemarketing = false;
          this.bancayseguros = true;
          this.grupales = false;
          this.codEmprOn = element.cod_empresa_oncosys
          this.bpSapRec = element.bp_sap_recaudador
          this.bancaSeguro = element.nombre_bca_seguro
          this.nConvenioRec = element.n_convenio_recaudador
          this.bpSapX = this.bpSapRec
          this.showTableEdit = false
        }
        if (element.id_canal == 4) {
          this.telemarketing = false;
          this.bancayseguros = false;
          this.grupales = true;
          this.bpSapCliente = element.bp_sap_cliente
          this.bpSapX = this.bpSapCliente
          this.updateSubrogado = true
          this.empServ.listarSubrogados(this.id_empresa).subscribe(
            response => {
              console.log(response)
              if (response['success'] == true) {
                console.log(response["data"])
                this.showTableEdit = true
                this.listaSubrogados = response["data"]
                var listaSub = {
                  razon_social_subrogado: response["data"][0].razon_social_subrogado,
                  ruc_subrogador: response["data"][0].ruc_subrogador,
                  bp_sap_subrogador: response["data"][0].bp_sap_subrogador,
                  estado: response["data"][0].estado,
                  id_empresa_subrogada: response["data"][0].id_empresa_subrogada
                }
                this.listaSubrog2.push(listaSub)
                return false
              }
            })
          console.log(this.listaSubrog2)
        }
      }
    })
  }

  btnActualizar() {
    var request
    request = {
      action: "actualizar",
      id_empresa: this.id_empresa,
      ruc_empresa: this.ruc_empresa,
      nom_empresa: this.nom_empresa,
      tipo_trama: "1",
      tipo_pago: "1",
      bp_sap: this.bpSapX,
      canal: this.canalSelected
    }
    console.log(request)
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

  abrirModalActualizarSub(index) {
    $("#contentModalUpdateSubrogada").modal("show");
    console.log(index)
    console.log(this.listaSubrogados)
    this.empServ.listarSubrogados(this.id_empresa).subscribe(
      response => {
        console.log(response)
        if (response['success'] == true) {
          console.log(response["data"])
          this.showTableEdit = true
          this.listaSubrogados = response["data"]
          this.listaSubrogados.forEach((element, value) => {
            if (index == value) {
              this.emprSubrogadaUpdate = element.razon_social_subrogado
              this.rucSubrogadaUpdate = element.ruc_subrogador
              this.bpSubrogadaUpdate = element.bp_sap_subrogador
              this.id_empresa_sub = element.id_empresa_subrogada
            }
          })
        }
      })

  }

  btnActualizarSubrogado() {
    var request = {
      action: "actualizarSub",
      id_subrogada: this.id_empresa_sub,
      id_empresa: this.id_empresa,
      subrogador: this.emprSubrogadaUpdate,
      ruc_subrogador: this.rucSubrogadaUpdate,
      razon_social_subrogado: this.nom_empresa,
      ruc_subrogado: this.ruc_empresa,
      bp_sap_subrogador: this.bpSubrogadaUpdate
    }
    console.log(request)
    this.empServ.actualizarSubrogados(request).subscribe(
      response => {
        console.log(response)
        if (response['success'] == true) {
          console.log(request)
          Swal.fire({
            icon: 'success',
            title: 'Proceso completado',
            text: 'Empresa subrogada actualizada correctamente',
          });

          $("#contentModalUpdateSubrogada").modal("hide");

          this.dtTrigger.unsubscribe();
          this.listarEmpresas();
        } else {
          $("#contentModalUpdateSubrogada").modal("hide");
          Swal.fire({
            icon: 'info',
            title: 'Hubo un error',
            text: response['message'],
          });
        }
      })
  }

  abrirModalCambiarEstado(nomEmpresa, estado) {
    console.log(nomEmpresa)
    console.log(estado)
    Swal.fire({
      title: '¿Quieres desactivar la empresa ' + nomEmpresa + '?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.empServ.cambiarEstadoEmpresas(nomEmpresa, estado).subscribe(response => {
          Swal.fire('Estado actualizado', '', 'success')
          console.log(response)
          this.dtTrigger.unsubscribe();
          this.listarEmpresas();
          document.location.reload()
        });
      }
    })
  }

  abrirModalDesactivarSub(subrogada) {

    Swal.fire({
      title: '¿Quieres desactivar la empresa?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.empServ.cambiarEstadoEmpresas(subrogada, 0).subscribe(response => {
          console.log(response)
          Swal.fire('Estado actualizado', '', 'success')
          //this.dtTrigger.unsubscribe();
          this.listarEmpresas();
          document.location.reload()
        });
      }
    })

  }
  abrirModalActivarSub(subrogada) {

    Swal.fire({
      title: '¿Quieres activar la empresa?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.empServ.cambiarEstadoEmpresas(subrogada, 1).subscribe(response => {
          console.log(response)
          Swal.fire('Estado actualizado', '', 'success')
          //this.dtTrigger.unsubscribe();
          this.listarEmpresas();
          document.location.reload()
        });
      }
    })

  }

}
