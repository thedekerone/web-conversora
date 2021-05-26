import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatatableService } from 'src/app/services/utils/datatable.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ProgramaCmrService } from 'src/app/services/table-maintenance/programacmr.service';

declare var $: any;

@Component({
  selector: 'app-programa-cmr',
  templateUrl: './programa-cmr.component.html',
  styleUrls: ['./programa-cmr.component.css'],
})
export class ProgramaCmrComponent implements OnInit {
  registerCmrForm: FormGroup;
  updateCmrForm: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  listaCmr = [];

  constructor(
    private pgCmrServ: ProgramaCmrService,
    private utilsDt: DatatableService,
    private formBuilder: FormBuilder
  ) {
    this.listaCmr = [];
    this.dtTrigger = new Subject();
    this.dtOptions = this.utilsDt.optionsDataTable();
  }

  ngOnInit(): void {
    this.listarCmr();

    this.registerCmrForm = this.formBuilder.group({
      action: 'crear',
      producto_cmr: ['', [Validators.required]],
      programa_cmr: ['', [Validators.required, Validators.minLength(2)]],
      plan_cmr_sap: ['', [Validators.required]],
      convenio_recaudador: ['', [Validators.required]],
      convenio_unidad_venta: ['', [Validators.required]],
      codigo_bp_unidad_venta: ['', [Validators.required]],
      codigo_bp_recaudador: ['', [Validators.required]],
      convenio_broker: [''],
      codigo_bp_broker: [''],
      gpo_vendedor: ['', [Validators.required]],
    });
    this.updateCmrForm = this.formBuilder.group({
      action: 'actualizar',
      producto_cmr: ['', [Validators.required]],
      programa_cmr: ['', [Validators.required]],
      plan_cmr_sap: ['', [Validators.required]],
      convenio_recaudador: ['', [Validators.required]],
      convenio_unidad_venta: ['', [Validators.required]],
      codigo_bp_unidad_venta: [
        '',
        [Validators.required, Validators.minLength(10)],
      ],
      codigo_bp_recaudador: [
        '',
        [Validators.required, Validators.minLength(10)],
      ],
      convenio_broker: [''],
      codigo_bp_broker: [''],
      gpo_vendedor: ['', [Validators.required]],
    });
  }

  listarCmr() {
    this.pgCmrServ.listarCmr().subscribe((response) => {
      this.listaCmr = response['data'];
      this.listaCmr.sort((a, b) => b.estado - a.estado);
      console.log(this.listaCmr);
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  format(event) {
    console.log(event);
    event.target.value = this.padLeft(event.target.value, '0', 10);
  }

  padLeft(text: string, padChar: string, size: number): string {
    return (String(padChar).repeat(size) + text).substr(size * -1, size);
  }

  abrirModal(iduser) {
    $('#contentModalVendedor').modal('show');
    $('#programaTramaAdd').val('');
    $('#codProgramaSapAdd').val('');
    $('#planCmrSapAdd').val('');
    this.registerCmrForm.reset();
  }

  abrirModalActualizar(producto_cmr, programa_cmr) {
    $('#contentModalActualizar').modal('show');
    this.pgCmrServ
      .editarCmr(producto_cmr, programa_cmr)
      .subscribe((response) => {
        var listaPCmr = response['data'][0];

        $('#programaTramaUpdate').val(listaPCmr.producto_cmr);
        $('#codProgramaSapUpdate').val(listaPCmr.programa_cmr);
        $('#planCmrSapUpdate').val(listaPCmr.plan_cmr_sap);
        console.log(listaPCmr);
        this.updateCmrForm.controls.producto_cmr.setValue(
          listaPCmr.producto_cmr
        );
        this.updateCmrForm.controls.programa_cmr.setValue(
          listaPCmr.programa_cmr
        );
        this.updateCmrForm.controls.plan_cmr_sap.setValue(
          listaPCmr.plan_cmr_sap
        );
        this.updateCmrForm.controls.convenio_recaudador.setValue(
          listaPCmr.convenio_recaudador
        );
        this.updateCmrForm.controls.convenio_unidad_venta.setValue(
          listaPCmr.convenio_unidad_venta
        );
        this.updateCmrForm.controls.codigo_bp_unidad_venta.setValue(
          listaPCmr.codigo_bp_unidad_venta
        );
        this.updateCmrForm.controls.codigo_bp_recaudador.setValue(
          listaPCmr.codigo_bp_recaudador
        );
        this.updateCmrForm.controls.convenio_broker.setValue(
          listaPCmr.convenio_broker
        );
        this.updateCmrForm.controls.codigo_bp_broker.setValue(
          listaPCmr.codigo_bp_broker
        );
        this.updateCmrForm.controls.gpo_vendedor.setValue(
          listaPCmr.gpo_vendedor
        );
      });
  }

  btnRegistrar() {
    this.pgCmrServ
      .crearCmr(this.registerCmrForm.value)
      .subscribe((response) => {
        console.log(this.registerCmrForm.value);
        if (response['success'] == true) {
          Swal.fire({
            icon: 'success',
            title: 'Proceso completado',
            text: 'Registro exitoso',
          });
          $('#contentModalVendedor').modal('hide');

          this.dtTrigger.unsubscribe();
          this.listarCmr();
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

  btnActualizar() {
    console.log(this.updateCmrForm.value);
    this.pgCmrServ.actualizarCmr(this.updateCmrForm.value).subscribe(
      (response) => {
        if (response['success'] == true) {
          Swal.fire({
            icon: 'success',
            title: 'Proceso completado',
            text: 'Programa Grupal actualizado correctamente',
          });

          $('#contentModalActualizar').modal('hide');

          this.dtTrigger.unsubscribe();
          this.listarCmr();
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

  abrirModalCambiarEstado(producto_cmr, programa_cmr, estado) {
    Swal.fire({
      title: `¿Quieres ${
        estado == 0 ? 'activar' : 'desactivar'
      } el Programa CMR?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {
      console.log(estado);
      if (result.isConfirmed) {
        this.pgCmrServ
          .cambiarEstadoCmr(producto_cmr, programa_cmr, estado == 0 ? 1 : 0)
          .subscribe((response) => {
            Swal.fire('Estado actualizado', '', 'success');
            console.log(response);
            this.dtTrigger.unsubscribe();
            this.listarCmr();
          });
      }
    });
  }
}
