import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatatableService } from 'src/app/services/utils/datatable.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ConvenioService } from 'src/app/services/table-maintenance/convenio.service';

declare var $: any;

@Component({
  selector: 'app-convenio',
  templateUrl: './convenio.component.html',
  styleUrls: ['./convenio.component.css']
})
export class ConvenioComponent implements OnInit {

  registerConvenioForm: FormGroup;
  updateConvenioForm: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  listaConvenios = [];

  constructor( private convServ: ConvenioService, private utilsDt: DatatableService, private formBuilder: FormBuilder) {
    this.listaConvenios = [];
    this.dtTrigger = new Subject();
    this.dtOptions = this.utilsDt.optionsDataTable();
  }

  ngOnInit(): void {

    this.listarConvenios();

    this.registerConvenioForm = this.formBuilder.group({
      action: "crear",
      ruc_empresa: ['', [Validators.required]],
      convenio_vendedor: [''],
      convenio_recaudador: [''],
      convenio_broker: [''],
    });
    this.updateConvenioForm = this.formBuilder.group({
      action: "actualizar",
      ruc_empresa: ['', [Validators.required]],
      convenio_vendedor: [''],
      convenio_recaudador: [''],
      convenio_broker: [''],
    });

  }

  listarConvenios(){
    this.convServ.listarConvenios().subscribe(response => {
      this.listaConvenios = response["data"];
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  abrirModal(iduser){
    $("#contentModalVendedor").modal("show");
    $("#rucEmpresaAdd").val("");
    $("#convenioVendedorAdd").val("");
    $("#convenioRecaudadorAdd").val("");
    $("#convenioBrokerAdd").val("");
  }

  abrirModalActualizar(ruc){
    $("#contentModalActualizar").modal("show");
    this.convServ.editarConvenio(ruc).subscribe(response => {
      var listaConvenio = response["data"][0]

      $("#rucEmpresaUpdate").val(listaConvenio.ruc_empresa);
      $("#convenioVendedorUpdate").val(listaConvenio.convenio_vendedor);
      $("#convenioRecaudadorUpdate").val(listaConvenio.convenio_recaudador);
      $("#convenioBrokerUpdate").val(listaConvenio.convenio_broker);

      this.updateConvenioForm.controls.ruc_empresa.setValue(listaConvenio.ruc_empresa);
      this.updateConvenioForm.controls.convenio_vendedor.setValue(listaConvenio.convenio_vendedor);
      this.updateConvenioForm.controls.convenio_recaudador.setValue(listaConvenio.convenio_recaudador);
      this.updateConvenioForm.controls.convenio_broker.setValue(listaConvenio.convenio_broker);
    });
  }

  btnRegistrar() {

    var convenio_vendedor =this.registerConvenioForm.value.convenio_vendedor
    var convenio_recaudador =this.registerConvenioForm.value.convenio_recaudador
    var convenio_broker =this.registerConvenioForm.value.convenio_broker

    if((convenio_vendedor == "") && (convenio_recaudador == "") && (convenio_broker == "")  ){
      Swal.fire({
        icon: 'info',
        title: 'Campo Convenio incompleto',
        text: 'Debe de completar al menos un campo convenio',
      });
    }else{
    this.convServ.crearConvenio(this.registerConvenioForm.value).subscribe(response => {

      if(response['success'] == true){
        Swal.fire({
          icon: 'success',
          title: 'Proceso completado',
          text: 'Registro exitoso',
        });
        $("#contentModalVendedor").modal("hide");

        this.dtTrigger.unsubscribe();
        this.listarConvenios();
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

    var convenio_vendedor =this.updateConvenioForm.value.convenio_vendedor
    var convenio_recaudador =this.updateConvenioForm.value.convenio_recaudador
    var convenio_broker =this.updateConvenioForm.value.convenio_broker

    if((convenio_vendedor == "") && (convenio_recaudador == "") && (convenio_broker == "")  ){
      Swal.fire({
        icon: 'info',
        title: 'Campo Convenio incompleto',
        text: 'Debe de completar al menos un campo convenio',
      });
    }else{

      this.convServ.actualizarConvenio(this.updateConvenioForm.value).subscribe(response => {

        if(response['success'] == true){
        Swal.fire({
          icon: 'success',
          title: 'Proceso completado',
          text: 'Convenio actualizado correctamente',
        });
        this.dtTrigger.unsubscribe();
        this.listarConvenios();

        $("#contentModalActualizar").modal("hide");


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
        this.convServ.desactivarConvenio(ruc, 0).subscribe(response => {

          Swal.fire(response['message'], '', 'success')

          this.dtTrigger.unsubscribe();
          this.listarConvenios();
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
        this.convServ.desactivarConvenio(ruc, 1).subscribe(response => {
          Swal.fire(response['message'], '', 'success')

          this.dtTrigger.unsubscribe();
          this.listarConvenios();
        });
      }
    })

  }

}



