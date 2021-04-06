import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatatableService } from 'src/app/services/utils/datatable.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { CodigoBPService } from 'src/app/services/table-maintenance/codigobp.service';

declare var $: any;

@Component({
  selector: 'app-codigobp',
  templateUrl: './codigobp.component.html',
  styleUrls: ['./codigobp.component.css']
})
export class CodigoBPComponent implements OnInit {

  registerCodigoBPForm: FormGroup;
  updateCodigoBPForm: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  listaCodigobps = [];

  constructor( private codbpServ: CodigoBPService, private utilsDt: DatatableService, private formBuilder: FormBuilder) {
    this.listaCodigobps = [];
    this.dtTrigger = new Subject();
    this.dtOptions = this.utilsDt.optionsDataTable();
  }

  ngOnInit(): void {

    this.listarCodigoBPs();

    this.registerCodigoBPForm = this.formBuilder.group({
      action: "crear",
      ruc_empresa: ['', [Validators.required]],
      cod_bp_vendedor: [''],
      cod_bp_recaudador: [''],
      cod_bp_broker: [''],
    });
    this.updateCodigoBPForm = this.formBuilder.group({
      action: "actualizar",
      ruc_empresa: ['', [Validators.required]],
      cod_bp_vendedor: [''],
      cod_bp_recaudador: [''],
      cod_bp_broker: [''],
    });

  }

  listarCodigoBPs(){
    this.codbpServ.listarCodigoBPs().subscribe(response => {
      this.listaCodigobps = response["data"];
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  abrirModal(iduser){
    $("#contentModalVendedor").modal("show");
    $("#rucEmpresaAdd").val("");
    $("#codbpVendedorAdd").val("");
    $("#codbpRecaudadorAdd").val("");
    $("#codbpBrokerAdd").val("");

  }

  abrirModalActualizar(ruc){
    $("#contentModalActualizar").modal("show");
    this.codbpServ.editarCodigoBP(ruc).subscribe(response => {
      var listaConvenio = response["data"][0]

      $("#rucEmpresaUpdate").val(listaConvenio.ruc_empresa);
      $("#codbpVendedorUpdate").val(listaConvenio.cod_bp_vendedor);
      $("#codbpRecaudadorUpdate").val(listaConvenio.cod_bp_recaudador);
      $("#codbpBrokerUpdate").val(listaConvenio.cod_bp_broker);

      this.updateCodigoBPForm.controls.ruc_empresa.setValue(listaConvenio.ruc_empresa);
      this.updateCodigoBPForm.controls.cod_bp_vendedor.setValue(listaConvenio.cod_bp_vendedor);
      this.updateCodigoBPForm.controls.cod_bp_recaudador.setValue(listaConvenio.cod_bp_recaudador);
      this.updateCodigoBPForm.controls.cod_bp_broker.setValue(listaConvenio.cod_bp_broker);
    });
  }

  btnRegistrar() {

    var cod_bp_vendedor =this.registerCodigoBPForm.value.cod_bp_vendedor
    var cod_bp_recaudador =this.registerCodigoBPForm.value.cod_bp_recaudador
    var cod_bp_broker =this.registerCodigoBPForm.value.cod_bp_broker

    if((cod_bp_vendedor == "") && (cod_bp_recaudador == "") && (cod_bp_broker == "")  ){
      Swal.fire({
        icon: 'info',
        title: 'Campo Código incompleto',
        text: 'Debe de completar al menos un código BP',
      });
    }else{

      this.codbpServ.crearCodigoBP(this.registerCodigoBPForm.value).subscribe(response => {

        if(response['success'] == true){
          Swal.fire({
            icon: 'success',
            title: 'Proceso completado',
            text: 'Registro exitoso',
          });
          $("#contentModalVendedor").modal("hide");

          this.dtTrigger.unsubscribe();
          this.listarCodigoBPs();
        }else{
          Swal.fire({
            icon: 'info',
            title: 'Hubo un error',
            text: response['message'],
          });
          $("#contentModalVendedor").modal("hide");
        }

      });
    }
  }

  btnActualizar() {

    var cod_bp_vendedor =this.updateCodigoBPForm.value.cod_bp_vendedor
    var cod_bp_recaudador =this.updateCodigoBPForm.value.cod_bp_recaudador
    var cod_bp_broker =this.updateCodigoBPForm.value.cod_bp_broker

    if((cod_bp_vendedor == "") && (cod_bp_recaudador == "") && (cod_bp_broker == "")  ){
      Swal.fire({
        icon: 'info',
        title: 'Campo Código incompleto',
        text: 'Debe de completar al menos un código BP',
      });

    }else{

      this.codbpServ.actualizarCodigoBP(this.updateCodigoBPForm.value).subscribe(response => {
        if(response['success'] == true){
          Swal.fire({
            icon: 'success',
            title: 'Proceso completado',
            text: 'Convenio actualizado correctamente',
          });

          $("#contentModalActualizar").modal("hide");

          this.dtTrigger.unsubscribe();
          this.listarCodigoBPs();
        }else{
          Swal.fire({
            icon: 'info',
            title: 'Hubo un error',
            text: response['message'],
          });
          $("#contentModalActualizar").modal("hide");
        }

      });
    }
  }

  abrirModalDesactivar(ruc) {

    Swal.fire({
      title: '¿Quieres desactivar el Convenio?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.codbpServ.desactivarCodigoBP(ruc, 0).subscribe(response => {
          Swal.fire(response['message'], '', 'success')

          this.dtTrigger.unsubscribe();
          this.listarCodigoBPs();
        });
      }
    })

  }
  abrirModalActivar(ruc) {

    Swal.fire({
      title: '¿Quieres activar el Convenio?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.codbpServ.desactivarCodigoBP(ruc, 1).subscribe(response => {
          Swal.fire(response['message'], '', 'success')

          this.dtTrigger.unsubscribe();
          this.listarCodigoBPs();
        });
      }
    })

  }

}



