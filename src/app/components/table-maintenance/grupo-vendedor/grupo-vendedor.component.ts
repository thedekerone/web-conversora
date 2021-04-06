import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatatableService } from 'src/app/services/utils/datatable.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { GrupoVendedorService } from 'src/app/services/table-maintenance/grupovendedor.service';

declare var $: any;

@Component({
  selector: 'app-grupo-vendedor',
  templateUrl: './grupo-vendedor.component.html',
  styleUrls: ['./grupo-vendedor.component.css']
})
export class GrupoVendedorComponent implements OnInit {

  registerGPForm: FormGroup;
  updateGPForm: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  listaGPs = [];

  constructor( private grupoVendServ: GrupoVendedorService, private utilsDt: DatatableService, private formBuilder: FormBuilder) {
    this.listaGPs = [];
    this.dtTrigger = new Subject();
    this.dtOptions = this.utilsDt.optionsDataTable();
  }

  ngOnInit(): void {

    this.listarGrupoVendedores();

    this.registerGPForm = this.formBuilder.group({
      action: "crear",
      cod_empresa: ['', [Validators.required]],
      grupo_vendedor: ['', [Validators.required]],
    });
    this.updateGPForm = this.formBuilder.group({
      action: "actualizar",
      cod_empresa: ['', [Validators.required]],
      grupo_vendedor: ['', [Validators.required]],
    });

  }

  listarGrupoVendedores(){
    this.grupoVendServ.listarGrupoVendedores().subscribe(response => {
      this.listaGPs = response["data"];
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  abrirModal(iduser){
    $("#contentModalVendedor").modal("show");
    $("#codEmpresaAdd").val("");
    $("#gpAdd").val("");

  }

  abrirModalActualizar(cod){
    $("#contentModalActualizar").modal("show");
    this.grupoVendServ.editarGrupoVendedor(cod).subscribe(response => {
      var listaGP = response["data"][0]

      $("#codEmpresaUpdate").val(listaGP.cod_empresa);
      $("#grupoVendedorUpdate").val(listaGP.grupo_vendedor);

      this.updateGPForm.controls.cod_empresa.setValue(listaGP.cod_empresa);
      this.updateGPForm.controls.grupo_vendedor.setValue(listaGP.grupo_vendedor);
    });
  }

  btnRegistrar() {

    this.grupoVendServ.crearGrupoVendedor(this.registerGPForm.value).subscribe(response => {
      if(response['success'] == true){
        Swal.fire({
          icon: 'success',
          title: 'Proceso completado',
          text: 'Registro exitoso',
        });
        $("#contentModalVendedor").modal("hide");

        this.dtTrigger.unsubscribe();
        this.listarGrupoVendedores();
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

    this.grupoVendServ.actualizarGrupoVendedor(this.updateGPForm.value).subscribe(response => {
      if(response['success'] == true){
        Swal.fire({
          icon: 'success',
          title: 'Proceso completado',
          text: 'Grupo Vendedor actualizado correctamente',
        });

        $("#contentModalActualizar").modal("hide");

        this.dtTrigger.unsubscribe();
        this.listarGrupoVendedores();
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
      title: '¿Quieres desactivar el Grupo Vendedor?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.grupoVendServ.desactivarGrupoVendedor(ruc, 0).subscribe(response => {
          Swal.fire(response['message'], '', 'success')

          this.dtTrigger.unsubscribe();
          this.listarGrupoVendedores();
        });
      }
    })

  }

  abrirModalActivar(ruc) {

    Swal.fire({
      title: '¿Quieres activar el Grupo Vendedor?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.grupoVendServ.desactivarGrupoVendedor(ruc, 1).subscribe(response => {
          Swal.fire(response['message'], '', 'success')

          this.dtTrigger.unsubscribe();
          this.listarGrupoVendedores();
        });
      }
    })

  }

}



