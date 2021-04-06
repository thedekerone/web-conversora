import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatatableService } from 'src/app/services/utils/datatable.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { DjsService } from 'src/app/services/table-maintenance/djs.service';

declare var $: any;

@Component({
  selector: 'app-djs',
  templateUrl: './djs.component.html',
  styleUrls: ['./djs.component.css']
})
export class DjsComponent implements OnInit {

  registerDeclarationForm: FormGroup;
  updateDeclarationForm: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  listaDeclarations = [];
  listaDeclaration = [];

  constructor( private djsServ: DjsService, private utilsDt: DatatableService, private formBuilder: FormBuilder) {
    this.listaDeclarations = [];
    this.listaDeclaration = [];
    this.dtTrigger = new Subject();
    this.dtOptions = this.utilsDt.optionsDataTable();
    $('#toggle-one').bootstrapToggle();
  }

  ngOnInit(): void {

    this.listarDeclaraciones();

    this.registerDeclarationForm = this.formBuilder.group({
      action: "crear",
      ruc_empresa: ['', [Validators.required]],
      djs: ['', [Validators.required]],
    });
    this.updateDeclarationForm = this.formBuilder.group({
      action: "actualizar",
      ruc_empresa: ['', [Validators.required]],
      djs: ['', [Validators.required]],
    });

  }

  listarDeclaraciones(){
    this.djsServ.listarDeclaraciones().subscribe(response => {
      this.listaDeclarations = response["data"];
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  abrirModal(iduser){
    $("#contentModalVendedor").modal("show");
    $("#toggle-one").bootstrapToggle('on', true)
    this.registerDeclarationForm.controls.djs.setValue("01");
    $("#rucEmpresaAdd").val("");

  }

  abrirModalActualizar(ruc){
    $("#contentModalActualizar").modal("show");
    this.djsServ.editarDeclaracion(ruc).subscribe(response => {
      var listaDeclaration = response["data"][0]

      $("#rucEmpresaUpdate").val(listaDeclaration.ruc_empresa);
      $("#djsUpdate").val(listaDeclaration.djs);

      this.updateDeclarationForm.controls.ruc_empresa.setValue(listaDeclaration.ruc_empresa);
      this.updateDeclarationForm.controls.djs.setValue(listaDeclaration.djs);

      if($("#djsUpdate").val() == '01') $("#djsUpdate").bootstrapToggle('on')
      else $("#djsUpdate").bootstrapToggle('off')
    });
  }

  btnRegistrar() {
    var djs = $('#toggle-one').prop('checked') ? '01' : '02'
    this.registerDeclarationForm.controls.djs.setValue(djs);
    this.djsServ.crearDeclaracion(this.registerDeclarationForm.value).subscribe(response => {
      if(response['success'] == true){
        Swal.fire({
          icon: 'success',
          title: 'Proceso completado',
          text: 'Registro exitoso',
        });
        $("#contentModalVendedor").modal("hide");

        this.dtTrigger.unsubscribe();
        this.listarDeclaraciones();
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

  btnActualizar() {
    var djsUpdate = $('#djsUpdate').prop('checked') ? '01' : '02'
    this.updateDeclarationForm.controls.djs.setValue(djsUpdate);

    this.djsServ.actualizarDeclaracion(this.updateDeclarationForm.value).subscribe(response => {
      if(response['success'] == true){
        Swal.fire({
          icon: 'success',
          title: 'Proceso completado',
          text: 'Declaración actualizado correctamente',
        });

        $("#contentModalActualizar").modal("hide");

        this.dtTrigger.unsubscribe();
        this.listarDeclaraciones();
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

  abrirModalDesactivar(ruc) {

    Swal.fire({
      title: '¿Quieres desactivar la DJS?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.djsServ.desactivarDeclaracion(ruc, 0).subscribe(response => {
          Swal.fire(response['message'], '', 'success')

          this.dtTrigger.unsubscribe();
          this.listarDeclaraciones();
        });
      }
    })

  }
  abrirModalActivar(ruc) {

    Swal.fire({
      title: '¿Quieres activar la DJS?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.djsServ.desactivarDeclaracion(ruc, 1).subscribe(response => {
          Swal.fire(response['message'], '', 'success')

          this.dtTrigger.unsubscribe();
          this.listarDeclaraciones();
        });
      }
    })

  }

}



