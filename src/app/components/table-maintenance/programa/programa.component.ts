import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatatableService } from 'src/app/services/utils/datatable.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ProgramaService } from 'src/app/services/table-maintenance/programa.service';

declare var $: any;

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css']
})
export class ProgramaComponent implements OnInit {

  registerProgramForm: FormGroup;
  updateProgramForm: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  listaPrograms = [];
  listaProgram = [];

  constructor( private programServ: ProgramaService, private utilsDt: DatatableService, private formBuilder: FormBuilder) {
    this.listaPrograms = [];
    this.listaProgram = [];
    this.dtTrigger = new Subject();
    this.dtOptions = this.utilsDt.optionsDataTable();
  }

  ngOnInit(): void {

    this.listarProgramas();

    this.registerProgramForm = this.formBuilder.group({
      action: "crear",
      cod_programa_oncosys: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      cod_programa_sap: ['', [Validators.required]],
    });

    this.updateProgramForm = this.formBuilder.group({
      action: "actualizar",
      cod_programa_oncosys: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      cod_programa_sap: ['', [Validators.required]],
    });

  }

  listarProgramas(){
    this.programServ.listarProgramas().subscribe(response => {
      this.listaPrograms = response["data"];
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  abrirModal(iduser){
    $("#contentModalVendedor").modal("show");
    $("#codProgramaOncosysAdd").val("");
    $("#descripcionAdd").val("");
    $("#codProgramaSapAdd").val("");
  }

  abrirModalActualizar(cod){
    $("#contentModalActualizar").modal("show");
    this.programServ.editarPrograma(cod).subscribe(response => {
      var listaPrograma = response["data"][0]


      $("#codProgramaOncosysUpdate").val(listaPrograma.cod_programa_oncosys);
      $("#descripcionUpdate").val(listaPrograma.descripcion);
      $("#codProgramaSapUpdate").val(listaPrograma.cod_programa_sap);

      this.updateProgramForm.controls.cod_programa_oncosys.setValue(listaPrograma.cod_programa_oncosys);
      this.updateProgramForm.controls.descripcion.setValue(listaPrograma.descripcion);
      this.updateProgramForm.controls.cod_programa_sap.setValue(listaPrograma.cod_programa_sap);
    });
  }

  btnRegistrar() {

    this.programServ.crearPrograma(this.registerProgramForm.value).subscribe(response => {
      if(response['success'] == true){
        document.location.reload();
        Swal.fire({
          icon: 'success',
          title: 'Proceso completado',
          text: 'Registro exitoso',
        });
        $("#contentModalVendedor").modal("hide");
        this.dtTrigger.unsubscribe();
        //this.listarProgramas();
      } else{
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

    this.programServ.actualizarPrograma(this.updateProgramForm.value).subscribe(response => {
      if(response['success'] == true){
        Swal.fire({
          icon: 'success',
          title: 'Proceso completado',
          text: 'Usuario actualizado correctamente',
        });

        $("#contentModalActualizar").modal("hide");

        this.dtTrigger.unsubscribe();
        this.listarProgramas();
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

  abrirModalDesactivar(cod_program) {

    Swal.fire({
      title: '¿Quieres desactivar el Programa?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.programServ.desactivarPrograma(cod_program, 0).subscribe(response => {
          Swal.fire(response['message'], '', 'success')
          this.dtTrigger.unsubscribe();
          this.listarProgramas();
        });


      }
    })

  }

  abrirModalActivar(cod_program) {

    Swal.fire({
      title: '¿Quieres activar el Programa?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.programServ.desactivarPrograma(cod_program, 1).subscribe(response => {
          Swal.fire(response['message'], '', 'success')
          this.dtTrigger.unsubscribe();
          this.listarProgramas();
        });


      }
    })

  }

}



