import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatatableService } from 'src/app/services/utils/datatable.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { CuentaContableService } from 'src/app/services/table-maintenance/cuentacontable.service';

declare var $: any;

@Component({
  selector: 'app-cuenta-contable',
  templateUrl: './cuenta-contable.component.html',
  styleUrls: ['./cuenta-contable.component.css'],
})
export class CuentaContableComponent implements OnInit {
  registerContableForm: FormGroup;
  updateContableForm: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  listaContables = [];

  constructor(
    private cuentacontaServ: CuentaContableService,
    private utilsDt: DatatableService,
    private formBuilder: FormBuilder
  ) {
    this.listaContables = [];
    this.dtTrigger = new Subject();
    this.dtOptions = this.utilsDt.optionsDataTable();
  }

  ngOnInit(): void {
    this.listarContables();

    this.registerContableForm = this.formBuilder.group({
      action: 'crear',
      origen: ['', [Validators.required]],
      cuenta_contable: ['', [Validators.required]],
      segmento: ['', [Validators.required]],
      cebe: ['', [Validators.required]],
    });
    this.updateContableForm = this.formBuilder.group({
      action: 'actualizar',
      id_cuenta_contable: [''],
      origen: ['', [Validators.required]],
      cuenta_contable: ['', [Validators.required]],
      segmento: ['', [Validators.required]],
      cebe: ['', [Validators.required]],
    });
  }

  listarContables() {
    this.cuentacontaServ.listarContables().subscribe((response) => {
      this.listaContables = response['data'];
      this.listaContables.sort((a, b) => b.estado - a.estado);
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  abrirModal(iduser) {
    $('#contentModalVendedor').modal('show');
    $('#origenAdd').val('');
    $('#cuentaContableAdd').val('');
    $('#segmentoAdd').val('');
    $('#cebeAdd').val('');
  }

  abrirModalActualizar(id_cuenta_contable) {
    $('#contentModalActualizar').modal('show');
    console.log(id_cuenta_contable);
    this.cuentacontaServ
      .editarContable(id_cuenta_contable)
      .subscribe((response) => {
        var listaContable = response['data'][0];

        $('#origenUpdate').val(listaContable.origen);
        $('#cuentaContableUpdate').val(listaContable.cuenta_contable);
        $('#segmentoUpdate').val(listaContable.segmento);
        $('#cebeUpdate').val(listaContable.cebe);
        this.updateContableForm.controls.id_cuenta_contable.setValue(
          id_cuenta_contable
        );

        this.updateContableForm.controls.origen.setValue(listaContable.origen);
        this.updateContableForm.controls.cuenta_contable.setValue(
          listaContable.cuenta_contable
        );
        this.updateContableForm.controls.segmento.setValue(
          listaContable.segmento
        );
        this.updateContableForm.controls.cebe.setValue(listaContable.cebe);
      });
  }

  btnRegistrar() {
    this.cuentacontaServ
      .crearContable(this.registerContableForm.value)
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
          //this.listarContables();
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
    this.cuentacontaServ
      .actualizarContable(this.updateContableForm.value)
      .subscribe((response) => {
        if (response['success'] == true) {
          Swal.fire({
            icon: 'success',
            title: 'Proceso completado',
            text: 'Cuenta Contable actualizado correctamente',
          });

          $('#contentModalActualizar').modal('hide');

          this.dtTrigger.unsubscribe();
          this.listarContables();
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

  abrirModalDesactivar(id_cuenta_contable) {
    Swal.fire({
      title: '¿Quieres desactivar la Cuenta Contable?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuentacontaServ
          .desactivarContable(id_cuenta_contable, 0)
          .subscribe((response) => {
            Swal.fire(response['message'], '', 'success');

            this.dtTrigger.unsubscribe();
            this.listarContables();
          });
      }
    });
  }

  abrirModalActivar(id_cuenta_contable) {
    Swal.fire({
      title: '¿Quieres activar la Cuenta Contable?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuentacontaServ
          .desactivarContable(id_cuenta_contable, 1)
          .subscribe((response) => {
            Swal.fire(response['message'], '', 'success');

            this.dtTrigger.unsubscribe();
            this.listarContables();
          });
      }
    });
  }
}
