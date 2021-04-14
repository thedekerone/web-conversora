import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatatableService } from 'src/app/services/utils/datatable.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { UsersService } from 'src/app/services/users.service';
import { formatDate } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  registerUserForm: FormGroup;
  updateUserForm: FormGroup;
  updatePermisosForm: FormGroup;
  formDisplay: boolean = false;
  formDisplayUpdate: boolean = false;
  showCanalInfo: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  listaUsers = [];
  listaProfile = [];
  listaCompanies = [];
  listaCanals = [];
  roles = [];
  tipodocumentos = [];
  empresaaunas = [];
  nacimiento = '';
  date = '';
  errorNacimiento = false;
  valorDoc: string;
  id_usuario: string;
  listaPermiso=[];

  constructor(
    public authSer: AuthService,
    private userServ: UsersService,
    private utilsDt: DatatableService,
    private formBuilder: FormBuilder
  ) {
    this.listaUsers = [];
    this.listaProfile = [];
    this.dtTrigger = new Subject();
    this.dtOptions = this.utilsDt.optionsDataTable();
    this.listaCompanies = [];
    this.listaCanals = [];
    this.roles = [
      { id: 1, name: 'Negocio' },
      { id: 2, name: 'Externo' },
    ];
    this.tipodocumentos = [
      { id: 0, name: 'DNI' },
      { id: 1, name: 'RUC' },
      { id: 2, name: 'CE' },
      { id: 3, name: 'PASAPORTE' },
    ];
    this.empresaaunas = [{ id: 0, name: 'Auna' }];
    $('#toggle-one').bootstrapToggle();
    // $('.toggleGeneral').bootstrapToggle();

    this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  onChangeTipoUsuario(data) {
    console.log(data);
    this.formDisplay = true;
    if (data == '1') {
      this.showCanalInfo = false;
    }
    if (data == '2') {
      this.showCanalInfo = true;
      this.userServ.listarEmpresas().subscribe((response) => {
        this.listaCompanies = response['data'].filter((el) => el.estado == 1);
        console.log(response['data']);
        console.log(this.listaCompanies);
        //this.dtTrigger.next();
      });

      this.userServ.listarCanales().subscribe((response) => {
        this.listaCanals = response['data'];

        //this.dtTrigger.next();
      });
    }
  }

  onChangeEmpresa($event) {
    this.userServ.listarEmpresa('demo').subscribe((response) => {
      var result = response['data']['Response']['DatosEmpresa'][0];
      $('#razonSocialAdd').val(result['DatosGenerales'].RazonSocial);
      $('#rucAdd').val(result['DatosGenerales'].RazonSocial);
      $('#grupovendedorAdd').val(result['DatosGenerales'].GrupoVendedor);
      //this.dtTrigger.next();
      this.registerUserForm.controls.tipo_documento.setValue(
        result['DatosGenerales'].RazonSocial
      );
      this.registerUserForm.controls.documento.setValue(
        result['DatosGenerales'].RazonSocial
      );
    });
  }

  onChangeEmpresaActualizar($event) {
    this.userServ.listarEmpresa('demo').subscribe((response) => {
      var result = response['data']['Response']['DatosEmpresa'][0];
      $('#razonSocialAdd').val(result['DatosGenerales'].RazonSocial);
      $('#rucAdd').val(result['DatosGenerales'].RazonSocial);
      $('#grupovendedorAdd').val(result['DatosGenerales'].GrupoVendedor);
      //this.dtTrigger.next();
    });
  }

  onChangeTipoDocumento(data) {
    $('#documentoAdds').val('');
    this.valorDoc = data;
    if (data == '0') {
      $('#documentoAdds').attr('maxlength', '8');
      $('#documentoAdds').attr('pattern', '[0-9]{8}');
      //$('#documentoAdds').attr("onkeyup", "descriptionCaracter(this,8);return event.charCode >= 48 && event.charCode <= 57");
      //$('#documentoAdds').attr("onkeypress", "descriptionCaracter(this,8);return event.charCode >= 48 && event.charCode <= 57");
    }
    if (data == '1') {
      $('#documentoAdds').attr('type', 'text');
      $('#documentoAdds').attr('maxlength', '11');
      $('#documentoAdds').attr('pattern', '[0-9]{11}');
      //$('#documentoAdds').attr("onkeyup", "descriptionCaracter(this,11)");
      //$('#documentoAdds').attr("onkeypress", "descriptionCaracter(this,11)");
    }
    if (data == '2') {
      $('#documentoAdds').attr('type', 'text');
      $('#documentoAdds').attr('maxlength', '12');
      $('#documentoAdds').attr('pattern', '[0-9]{12}');
      //$('#documentoAdds').attr("onkeyup", "descriptionCaracter(this,12)");
      //$('#documentoAdds').attr("onkeypress", "descriptionCaracter(this,12)");
    }
    if (data == '3') {
      $('#documentoAdds').attr('type', 'text');
      $('#documentoAdds').attr('maxlength', '12');
      $('#documentoAdds').attr('pattern', '[0-9]{12}');
      //$('#documentoAdds').attr("onkeyup", "descriptionCaracter(this,12)");
      //$('#documentoAdds').attr("onkeypress", "descriptionCaracter(this,12)");
    }
  }

  keyPressNumDoc(event) {
    if (this.valorDoc == '0' || this.valorDoc == '1') {
      if (event.charCode >= 48 && event.charCode <= 57) {
        return true;
      }
    } else if (this.valorDoc == '2' || this.valorDoc == '3') {
      if (event.charCode >= 20 && event.charCode <= 122) {
        return true;
      }
    }
    return false;
  }

  onChangeTipoDocumentoActualizar(data) {
    $('#documentoUpdate').val('');

    if (data == '0') {
      $('#documentoUpdate').attr('mask', '00000000');
      $('#documentoUpdate').attr('pattern', '[0-9]{8}');
      //$('#documentoUpdate').attr("onkeyup", "descriptionCaracter(this,8);return event.charCode >= 48 && event.charCode <= 57");
      //$('#documentoUpdate').attr("onkeypress", "descriptionCaracter(this,8);return event.charCode >= 48 && event.charCode <= 57");
    }
    if (data == '1') {
      $('#documentoUpdate').attr('type', 'text');
      $('#documentoUpdate').attr('maxlength', '11');
      $('#documentoUpdate').attr('pattern', '[0-9]{11}');
      //$('#documentoUpdate').attr("onkeyup", "descriptionCaracter(this,11)");
      //$('#documentoUpdate').attr("onkeypress", "descriptionCaracter(this,11)");
    }
    if (data == '2') {
      $('#documentoUpdate').attr('type', 'text');
      $('#documentoUpdate').attr('maxlength', '12');
      $('#documentoUpdate').attr('pattern', '[0-9]{12}');
      //$('#documentoUpdate').attr("onkeyup", "descriptionCaracter(this,12)");
      //$('#documentoUpdate').attr("onkeypress", "descriptionCaracter(this,12)");
    }
    if (data == '3') {
      $('#documentoUpdate').attr('type', 'text');
      $('#documentoUpdate').attr('maxlength', '12');
      $('#documentoUpdate').attr('pattern', '[0-9]{12}');
      //$('#documentoUpdate').attr("onkeyup", "descriptionCaracter(this,12)");
      //$('#documentoUpdate').attr("onkeypress", "descriptionCaracter(this,12)");
    }
  }

  descriptionCaracter(self, long) {
    let length = self.value.length;
    $(self)
      .parent()
      .siblings('sub')
      .text(length + '/' + long);
  }

  onChangeTipoUsuarioActualizar(data) {
    console.log(data);
    this.formDisplayUpdate = true;
    if (data == '1') {
      this.showCanalInfo = false;
      $('#selectType option[value=' + data + ']').attr('selected', true);
    }
    if (data == '2') {
      this.showCanalInfo = true;
      $("#selectType option[value='2']").attr('selected', true);
    }
  }

  handleOnChangeNacimiento() {
    if (this.nacimiento != '') {
      $('#nacimientoCreate').removeClass('placeholder');
    } else {
      $('#nacimientoCreate').addClass('placeholder');
    }
  }

  ngOnInit(): void {
    this.listarUsuarios();

    this.registerUserForm = this.formBuilder.group({
      action: 'crear',
      id_rol: ['', [Validators.required]],
      id_canal: [''],
      id_empresa: ['', [Validators.required]],
      tipo_documento: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido_paterno: ['', [Validators.required]],
      apellido_materno: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      clave: ['', [Validators.required]],
    });

    this.updateUserForm = this.formBuilder.group({
      action: 'actualizar',
      id_usuario: [''],
      id_rol: [''],
      id_canal: [''],
      id_empresa: ['', [Validators.required]],
      tipo_documento: [''],
      documento: [''],
      nombre: ['', [Validators.required]],
      apellido_paterno: ['', [Validators.required]],
      apellido_materno: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      correo: ['', [Validators.required]],
    });
  }

  listarUsuarios() {
    this.userServ.listarProductos().subscribe((response) => {
      this.listaUsers = response['data'];
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  abrirModal(iduser) {
    this.registerUserForm.controls.id_empresa.setValue(0);

    $('#contentModalVendedor').modal('show');
    $('#rucAdd').val('');
    $('#documentoAdds').val('');
    $('#razonSocialAdd').val('');
    $('#grupovendedorAdd').val('');
    $('#apellidoPatAdd').val('');
    $('#apellidoMatAdd').val('');
    $('#nombreAdd').val('');
    $('#fechaAdd').val('');
    $('#emailAdd').val('');
    $('#emailAdd').val('');
    $('#claveAdd').val('');
  }

  async abrirModalActualizar(user_id) {
    await $('#contentModalActualizar').modal('show');
    this.userServ.listarPerfil(user_id).subscribe((response) => {
      //this.listaProfile = response["data"][0];
      var listProfile = response['data'][0];
      var id_rol = response['data'][0].id_rol;

      $('#nombreUpdate').val(listProfile.nombre);
      $('#apepaternoUpdate').val(listProfile.apellido_paterno);
      $('#apematernoUpdate').val(listProfile.apellido_materno);
      $('#fechaUpdate').val(listProfile.fecha_nacimiento);
      $('#correoUpdate').val(listProfile.correo);
      $('#selectTypeUpdate option[value=' + id_rol + ']').attr(
        'selected',
        true
      );

      this.updateUserForm.controls.id_usuario.setValue(user_id);
      this.updateUserForm.controls.nombre.setValue(listProfile.nombre);
      this.updateUserForm.controls.apellido_paterno.setValue(
        listProfile.apellido_paterno
      );
      this.updateUserForm.controls.apellido_materno.setValue(
        listProfile.apellido_materno
      );
      this.updateUserForm.controls.fecha_nacimiento.setValue(
        listProfile.fecha_nacimiento
      );
      this.updateUserForm.controls.correo.setValue(listProfile.correo);
      this.updateUserForm.controls.id_rol.setValue(id_rol);

      this.formDisplayUpdate = true;
      if (id_rol == '1') {
        this.showCanalInfo = false;
        //  this.updateUserForm.controls.empresa.setValue(listProfile.empresa);

        // $("#empresaAunaUpdate option[value="+listProfile.empresa+"]").attr("selected", true);
        $(
          '#tipoDocumentoUpdate option[value=' +
            listProfile.tipo_documento +
            ']'
        ).attr('selected', true);
        $('#documentoUpdate').val(listProfile.documento);
        this.updateUserForm.controls.tipo_documento.setValue(
          listProfile.tipo_documento
        );
        this.updateUserForm.controls.documento.setValue(listProfile.documento);
        this.updateUserForm.controls.id_empresa.setValue('Auna');
      }
      if (id_rol == '2') {
        this.showCanalInfo = true;

        this.userServ.listarEmpresas().subscribe((response) => {
          this.listaCompanies = response['data'];
          //this.dtTrigger.next();
          $('#empresaUpdate option[value=' + listProfile.id_empresa + ']').attr(
            'selected',
            true
          );
          this.updateUserForm.controls.id_empresa.setValue(
            listProfile.id_empresa
          );
          this.updateUserForm.controls.documento.setValue(listProfile.ruc);

          this.userServ.listarEmpresa('demo').subscribe((response) => {
            var result = response['data']['Response']['DatosEmpresa'][0];
            $('#razonSocialUpdate').val(result['DatosGenerales'].RazonSocial);
            $('#rucUpdate').val(result['DatosGenerales'].RazonSocial);
            $('#grupovendedorUpdate').val(
              result['DatosGenerales'].GrupoVendedor
            );
            this.updateUserForm.controls.tipo_documento.setValue(
              result['DatosGenerales'].RazonSocial
            );
          });
        });

        this.userServ.listarCanales().subscribe((response) => {
          this.listaCanals = response['data'];
          //this.dtTrigger.next();
          $('#canalUpdate option[value=' + listProfile.id_canal + ']').attr(
            'selected',
            true
          );
          this.updateUserForm.controls.id_canal.setValue(listProfile.id_canal);
        });
      }

      // this.dtTrigger.next();
    });
  }

  btnRegistrar() {
    this.errorNacimiento = false;
    $('#fechaAdd').removeClass('form-error');

    var today = new Date();
    var año = today.getFullYear();
    if (parseInt(this.nacimiento.split('-')[0]) > año) {
      this.errorNacimiento = true;
      $('#fechaAdd').addClass('form-error');
      return false;
    }

    if (this.registerUserForm.value.id_rol == 1) {
      this.registerUserForm.value.id_canal = 0;
      this.registerUserForm.value.id_empresa = 0;
    } else {
      this.registerUserForm.value.tipo_documento = 1;
    }

    this.userServ
      .crearUsuario(this.registerUserForm.value)
      .subscribe((response) => {
        if (response['success'] == true) {
          console.log(response);
          this.id_usuario = response['retorno'];

          $('#contentModalVendedor').modal('hide');
          this.abrirModalPermisos();

          document.location.reload();
          // this.dtTrigger.unsubscribe();
          // this.listarUsuarios();
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
    if (this.updateUserForm.value.id_rol == 1) {
      this.updateUserForm.value.id_canal = 0;
    } else {
      this.updateUserForm.controls.tipo_documento.setValue(1);
    }

    this.userServ
      .actualizarUsuario(this.updateUserForm.value)
      .subscribe((response) => {
        if (response['success'] == true) {
          Swal.fire({
            icon: 'success',
            title: 'Proceso completado',
            text: 'Usuario actualizado correctamente',
          }).then((result) => {
            if (result.isConfirmed) {
              document.location.reload();
            }
          });

          $('#contentModalActualizar').modal('hide');

          this.dtTrigger.unsubscribe();
          //this.listarUsuarios();
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

  abrirModalDesactivar(id_usuario) {
    Swal.fire({
      title: '¿Quieres desactivar al usuario?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userServ.desactivarUsuario(id_usuario, 0).subscribe((response) => {
          Swal.fire(response['message'], '', 'success');

          this.dtTrigger.unsubscribe();
          this.listarUsuarios();
          document.location.reload();
        });
      }
    });
  }
  abrirModalActivar(id_usuario) {
    Swal.fire({
      title: '¿Quieres activar al usuario?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userServ.desactivarUsuario(id_usuario, 1).subscribe((response) => {
          Swal.fire(response['message'], '', 'success');

          this.dtTrigger.unsubscribe();
          this.listarUsuarios();
          document.location.reload();
        });
      }
    });
  }

  async actualizarPermisos() {
    
    for(let permiso of this.listaPermiso){
      this.userServ
      .actualizarPermiso(permiso.id_operacion, this.id_usuario, Number(permiso.estado))
      .subscribe();
    }



    $('#contentModalSettings').modal('hide');

    Swal.fire({
      icon: 'success',
      title: 'Proceso completado',
      text: 'Acción realizada exitosamente',
    });
    // document.location.reload();
  }

  abrirModalPermisosEditar(id_usuario, nombre, pate) {
    Swal.showLoading()
    this.id_usuario=id_usuario
    this.userServ.listarPerfil(id_usuario).subscribe((response) => {
      console.log(response);
      var listaPermiso = response['data'][0]['permisos'];
      this.listaPermiso = listaPermiso
      Swal.close()
      $('#nameUserActive').text(nombre + ' ' + pate);
      $('#contentModalSettings').modal('show');
      $('#permisoUno').data('id', id_usuario);



      console.log($(`#permiso1`))


      console.log($('#permiso1').val())


    });
  }

  togglePermiso(id){
    console.log(id)
    this.listaPermiso = this.listaPermiso.map(el=>{
      if(el.id_operacion==id){
        el.estado = !el.estado
      }
      return el
    })
  }

  abrirModalPermisos() {
    $('#contentModalSettings').modal('show');

  }

  onChangeTipoCanal(data) {
    console.log(data);
  }
}

$(document).ready(function () {
  $('#type_document').on('change', function () {
    /* {id: 0, name: 'DNI'},
    {id: 1, name: 'RUC'},
    {id: 2, name: 'CE'},
    {id: 3, name: 'PASAPORTE'} */

    if ($(this).val() == 'DNI') {
      $('#documentoAdds').attr('maxlength', '8');
      $('#documentoAdds').attr('pattern', '[0-9]{8}');
      //$('#documentoAdds').attr("onkeyup", "descriptionCaracter(this,8)");
      //$('#documentoAdds').attr("onkeypress", "descriptionCaracter(this,8)");
    }
    if ($(this).val() == 'RUC') {
      $('#documentoAdds').attr('maxlength', '11');
      $('#documentoAdds').attr('pattern', '[0-9]{11}');
      //$('#documentoAdds').attr("onkeyup", "descriptionCaracter(this,11)");
      //$('#documentoAdds').attr("onkeypress", "descriptionCaracter(this,11)");
    }
  });
});
