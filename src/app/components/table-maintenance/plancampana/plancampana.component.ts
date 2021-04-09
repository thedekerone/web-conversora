import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatatableService } from 'src/app/services/utils/datatable.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { PlanCampanaService } from 'src/app/services/table-maintenance/plancampana.service';

declare var $: any;

@Component({
  selector: 'app-plancampana',
  templateUrl: './plancampana.component.html',
  styleUrls: ['./plancampana.component.css'],
})
export class PlanCampanaComponent implements OnInit {
  registerPYCForm: FormGroup;
  updatePYCForm: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  listaPlanes = [];

  constructor(
    private plancampanaServ: PlanCampanaService,
    private utilsDt: DatatableService,
    private formBuilder: FormBuilder
  ) {
    this.listaPlanes = [];
    this.dtTrigger = new Subject();
    this.dtOptions = this.utilsDt.optionsDataTable();
  }

  ngOnInit(): void {
    this.listarCampanas();

    this.registerPYCForm = this.formBuilder.group({
      action: 'crear',
      procedencia: ['', [Validators.required]],
      cod_empresa: ['', [Validators.required]],
      plan_sap: ['', [Validators.required]],
      campana_sap: [''],
    });
    this.updatePYCForm = this.formBuilder.group({
      action: 'actualizar',
      cod_empresa: ['', [Validators.required]],
      programa: ['', [Validators.required]],
      procedencia: ['', [Validators.required]],
      plan_sap: ['', [Validators.required]],
      campana_sap: [''],
    });
  }

  listarCampanas() {
    this.plancampanaServ.listarCampanas().subscribe((response) => {
      this.listaPlanes = response['data'];
      console.log(this.listaPlanes);
      this.listaPlanes.sort((a, b) => b.estado - a.estado);
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  abrirModal(iduser) {
    $('#contentModalVendedor').modal('show');
    $('#procedenciaAdd').val('');
    $('#codEmpresaAdd').val('');
    $('#planSapAdd').val('');
    $('#campanaSapAdd').val('');
  }

  abrirModalActualizar(procedencia, cod_empresa) {
    $('#contentModalActualizar').modal('show');
    this.plancampanaServ
      .editarCampanas(procedencia, cod_empresa)
      .subscribe((response) => {
        var listaPlan = response['data'][0];

        $('#procedenciaUpdate').val(listaPlan.procedencia);
        $('#codEmpresaUpdate').val(listaPlan.cod_empresa);
        $('#planSapUpdate').val(listaPlan.plan_sap);
        $('#campanaSapUpdate').val(listaPlan.cod_bp_broker);
        console.log(listaPlan);
        this.updatePYCForm.controls.cod_empresa.setValue(listaPlan.cod_empresa);
        this.updatePYCForm.controls.programa.setValue(listaPlan.programa);
        this.updatePYCForm.controls.procedencia.setValue(listaPlan.procedencia);
        this.updatePYCForm.controls.plan_sap.setValue(listaPlan.plan_sap);
        this.updatePYCForm.controls.campana_sap.setValue(listaPlan.campana_sap);
        console.log(this.updatePYCForm.valid);
        console.log(this.updatePYCForm);
      });
  }

  btnRegistrar() {
    this.plancampanaServ
      .crearCampanas(this.registerPYCForm.value)
      .subscribe((response) => {
        if (response['success'] == true) {
          document.location.reload();
          Swal.fire({
            icon: 'success',
            title: 'Proceso completado',
            text: 'Registro exitoso',
          });
          $('#contentModalVendedor').modal('hide');

          this.dtTrigger.unsubscribe();
          //this.listarCampanas();
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

  btnActualizar() {
    this.plancampanaServ
      .actualizarCampanas(this.updatePYCForm.value)
      .subscribe((response) => {
        if (response['success'] == true) {
          Swal.fire({
            icon: 'success',
            title: 'Proceso completado',
            text: 'Campaña actualizado correctamente',
          });

          $('#contentModalActualizar').modal('hide');

          this.dtTrigger.unsubscribe();
          this.listarCampanas();
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Hubo un error',
            text: response['message'],
          });
          $('#contentModalActualizar').modal('hide');
        }
      });
  }

  abrirModalDesactivar(procedencia, cod_empresa) {
    Swal.fire({
      title: '¿Quieres desactivar la Campaña?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.plancampanaServ
          .desactivarCampanas(procedencia, cod_empresa, 0)
          .subscribe((response) => {
            Swal.fire(response['message'], '', 'success');

            this.dtTrigger.unsubscribe();
            this.listarCampanas();
          });
      }
    });
  }

  abrirModalActivar(procedencia, cod_empresa) {
    Swal.fire({
      title: '¿Quieres activar la Campaña?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.plancampanaServ
          .desactivarCampanas(procedencia, cod_empresa, 1)
          .subscribe((response) => {
            Swal.fire(response['message'], '', 'success');

            this.dtTrigger.unsubscribe();
            this.listarCampanas();
          });
      }
    });
  }
}
