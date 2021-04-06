import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatatableService } from 'src/app/services/utils/datatable.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ProgramaGrupalesService } from 'src/app/services/table-maintenance/programagrupales.service';

declare var $: any;

@Component({
  selector: 'app-programa-grupales',
  templateUrl: './programa-grupales.component.html',
  styleUrls: ['./programa-grupales.component.css']
})
export class ProgramaGrupalesComponent implements OnInit {

  registerPGForm: FormGroup;
  updatePGForm: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  listaPGrupales = [];

  constructor( private pgServ: ProgramaGrupalesService, private utilsDt: DatatableService, private formBuilder: FormBuilder) {
    this.listaPGrupales = [];
    this.dtTrigger = new Subject();
    this.dtOptions = this.utilsDt.optionsDataTable();
  }

  ngOnInit(): void {

    this.listarPGs();

    this.registerPGForm = this.formBuilder.group({
      action: "crear",
      programa_trama: ['', [Validators.required]],
      cod_programa_sap: ['', [Validators.required]],
    });
    this.updatePGForm = this.formBuilder.group({
      action: "actualizar",
      programa_trama: ['', [Validators.required]],
      cod_programa_sap: ['', [Validators.required]],
    });

  }

  listarPGs(){
    this.pgServ.listarPGs().subscribe(response => {
      this.listaPGrupales = response["data"];
      console.log(this.listaPGrupales)
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  abrirModal(iduser){
    $("#contentModalVendedor").modal("show");
    $("#programaTramaAdd").val("");
    $("#codProgramaSapAdd").val("");

  }

  abrirModalActualizar(id_programa_grupales){
    $("#contentModalActualizar").modal("show");
    this.pgServ.editarPG(id_programa_grupales).subscribe(response => {
      var listaPGrupal = response["data"][0]

      $("#programaTramaUpdate").val(listaPGrupal.programa_trama);
      $("#codProgramaSapUpdate").val(listaPGrupal.cod_programa_sap);

      this.updatePGForm.controls.programa_trama.setValue(listaPGrupal.programa_trama);
      this.updatePGForm.controls.cod_programa_sap.setValue(listaPGrupal.cod_programa_sap);
    });
  }

  btnRegistrar() {

    this.pgServ.crearPG(this.registerPGForm.value).subscribe(response => {
      if(response['success'] == true){
        document.location.reload()
        Swal.fire({
          icon: 'success',
          title: 'Proceso completado',
          text: 'Registro exitoso',
        });
        $("#contentModalVendedor").modal("hide");
        //this.listarPGs();
        this.dtTrigger.unsubscribe();
        
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

    this.pgServ.actualizarPG(this.updatePGForm.value).subscribe(response => {
      if(response['success'] == true){
        Swal.fire({
          icon: 'success',
          title: 'Proceso completado',
          text: 'Programa Grupal actualizado correctamente',
        });

        $("#contentModalActualizar").modal("hide");

        this.dtTrigger.unsubscribe();
        this.listarPGs();
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

  abrirModalDesactivar(id_programa_grupales) {

    Swal.fire({
      title: '¿Quieres desactivar el Programa Grupal?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.pgServ.desactivarPG(id_programa_grupales, 0).subscribe(response => {
          Swal.fire('Estado actualizado', '', 'success')
          this.dtTrigger.unsubscribe();
          this.listarPGs();
        });
      }
    })

  }
  abrirModalActivar(id_programa_grupales) {

    Swal.fire({
      title: '¿Quieres activar el Programa Grupal?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.pgServ.desactivarPG(id_programa_grupales, 1).subscribe(response => {
          Swal.fire('Estado actualizado', '', 'success')
          this.dtTrigger.unsubscribe();
          this.listarPGs();
        });
      }
    })

  }

}



