import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatatableService } from 'src/app/services/utils/datatable.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { LddpService } from 'src/app/services/table-maintenance/lddp.service';

declare var $: any;

@Component({
  selector: 'app-lddp',
  templateUrl: './lddp.component.html',
  styleUrls: ['./lddp.component.css']
})
export class LddpComponent implements OnInit {

  registerLddpForm: FormGroup;
  updateLddpForm: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  listaLppds = [];
  listaLppd = [];

  constructor( private lppdServ: LddpService, private utilsDt: DatatableService, private formBuilder: FormBuilder) {
    this.listaLppds = [];
    this.listaLppd = [];
    this.dtTrigger = new Subject();
    this.dtOptions = this.utilsDt.optionsDataTable();
  }

  ngOnInit(): void {

    this.listarLddps();

    this.registerLddpForm = this.formBuilder.group({
      action: "crear",
      ruc_empresa: ['', [Validators.required]],
      lddp: ['', [Validators.required]],
    });
    this.updateLddpForm = this.formBuilder.group({
      action: "actualizar",
      ruc_empresa: ['', [Validators.required]],
      lddp: ['', [Validators.required]],
    });

  }

  listarLddps(){
    this.lppdServ.listarLddps().subscribe(response => {
      this.listaLppds = response["data"];
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  abrirModal(iduser){
    $("#contentModalVendedor").modal("show");
    $("#toggle-one").bootstrapToggle('on', true)
    this.registerLddpForm.controls.lddp.setValue("01");
    $("#rucEmpresaAdd").val("");
    
  }

  abrirModalActualizar(ruc){
    $("#contentModalActualizar").modal("show");
    this.lppdServ.editarLddp(ruc).subscribe(response => {
      var listaLddp = response["data"][0]

      $("#rucEmpresaUpdate").val(listaLddp.ruc_empresa);
      $("#lddpUpdate").val(listaLddp.lddp);

      this.updateLddpForm.controls.ruc_empresa.setValue(listaLddp.ruc_empresa);
      this.updateLddpForm.controls.lddp.setValue(listaLddp.lddp);

      if($("#lddpUpdate").val() == '01') $("#lddpUpdate").bootstrapToggle('on')
      else $("#lddpUpdate").bootstrapToggle('off')
    });
  }

  btnRegistrar() {

    var lddp = $('#toggle-one').prop('checked') ? '01' : '02'
    this.registerLddpForm.controls.lddp.setValue(lddp);

    this.lppdServ.crearLddp(this.registerLddpForm.value).subscribe(response => {
      if(response['success'] == true){
        Swal.fire({
          icon: 'success',
          title: 'Proceso completado',
          text: 'Registro exitoso',
        });
        $("#contentModalVendedor").modal("hide");

        this.dtTrigger.unsubscribe();
        this.listarLddps();
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
    var lddpUpdate = $('#lddpUpdate').prop('checked') ? '01' : '02'
    this.updateLddpForm.controls.lddp.setValue(lddpUpdate);
    this.lppdServ.actualizarLddp(this.updateLddpForm.value).subscribe(response => {
      if(response['success'] == true){
        Swal.fire({
          icon: 'success',
          title: 'Proceso completado',
          text: 'LPPD actualizado correctamente',
        });

        $("#contentModalActualizar").modal("hide");

        this.dtTrigger.unsubscribe();
        this.listarLddps();
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
      title: '¿Quieres desactivar la LDDP?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.lppdServ.desactivarLddp(ruc, 0).subscribe(response => {
          Swal.fire(response['message'], '', 'success')

          this.dtTrigger.unsubscribe();
          this.listarLddps();
        });
      }
    })

  }

  abrirModalActivar(ruc) {

    Swal.fire({
      title: '¿Quieres activar la LDDP?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.lppdServ.desactivarLddp(ruc, 1).subscribe(response => {
          Swal.fire(response['message'], '', 'success')

          this.dtTrigger.unsubscribe();
          this.listarLddps();
        });
      }
    })

  }

}



