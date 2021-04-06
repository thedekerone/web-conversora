import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  rechazados = [];
  exitosos = [];
  subidos = [];
  webconversora = [];
  reporteAltaByC = [];
  reporteRecaudoByC = [];
  reporteBajaByC = [];
  reporteGrupales = [];
  reporteTelemarketing = [];
  showLoading: boolean = true;
  isLoading = false
  isLoading2 = false
  isLoading3 = false
  isLoading4 = false
  isLoading5 = false

  constructor(private reportServ: ReportsService, private excelService: ExcelService) {
    this.rechazados = [];
    this.exitosos = [];
    this.subidos = [];
    this.webconversora = [];
    this.reporteAltaByC = [];
    this.reporteRecaudoByC = [];
    this.reporteBajaByC = [];
    this.reporteGrupales = [];
    this.reporteTelemarketing = [];
  }

  ngOnInit(): void {

    this.reportServ.cantidadRechazados().subscribe(response => {
      this.rechazados = response["data"][0].archivos_rechazados;
      console.log(this.rechazados)
      this.showLoading = false
    });

    this.reportServ.cantidadExitosos().subscribe(response => {
      this.exitosos = response["data"][0].procesados_correctamente;
      this.showLoading = false
    });
    this.reportServ.cantidadSubidos().subscribe(response => {
      this.subidos = response["data"][0].subidos;
      this.showLoading = false
    });
    this.reportServ.cantidadWebConversora().subscribe(response => {
      this.webconversora = response["data"][0].procesados_web_conversora;
      this.showLoading = false
    });

  }

  exportarAltaByC() {
    this.isLoading = true
    this.reportServ.reporteAltaByC().subscribe(response => {
      // this.reporteAltaByC  = response["data"];
      var res = response["data"][0]
      console.log(res);
      this.reporteAltaByC = [
        {
          "Tipo canal": res.canal,
          "Empresa": res.empresa,
          "RAZÓN SOCIAL": res.razon_social,
          "RUC": res.ruc,
          "BP EMPRESA": res.bp_empresaws,
          "Producto": res.producto,
          "Propuesta, solicitud": res.propuesta,
          "Codigo unico de afiliado": res.cod_afiliado,
          "Nombres y Apellidos": res.nommbres_apellidos,
          "Sexo": res.sexo_afiliado,
          "Fecha nacimiento": res.fecha_nacimiento_afi,
          "Tipo Doc. identidad": res.tipo_Documento_afi,
          "N°Documento identidad ": res.num_documento_afi,
          "Categoria": res.categoria,
          "Fecha venta": res.fecha_venta,
          "Fecha afiliacion": res.fecha_afiliacion,
          "Programa": res.programa,
          "Edad": res.edad_afi,
          "Fuma": res.fuma,
          "Tarifa (monto S/)": res.tarifa_monto,
          "Ubigeo Afiliado": res.ubigeo_afi,
          "Ubigeo distrito": res.ubigeo_distrito,
          "Ubigeo provincia": res.ubigeo_provincia,
          "Ubigeo departamento": res.ubigeo_departamento,
          "Direccion Afiliado": res.direccion_afi,
          "Telefono Afiliado": res.telefono,
          "Celular Afiliado": res.celular,
          "Correo Afiliado": res.correo_afi,
          "Tipo documento venta (Factura, Boleta)": res.tipo_documento_venta,
          "Apellido paterno contratante": res.ap_paterno_contratante,
          "Apellido materno contratante": res.ap_materno_contratante,
          "Nombre 1 contratante": res.nombre_1_contratante,
          "Nombre 2 contratante": res.nombre_2_contratante,
          "Sexo contratante": res.sexo_contratante,
          "Fecha nacimiento contratante": res.fecha_nacimiento_contratante,
          "Tipo Dscto identidad": res.tipo_documento_contratante,
          "Numero Dscto identidad ": res.num_documento_contratante,
          "Ubigeo Contratante": res.ubigeo_contratante,
          "Direccion Contratante": res.direccion_contratante,
          "Telefono Contratante": res.telefono_contratante,
          "Celular Contratante": res.celular_contratante,
          "Correo Contratante": res.correo_contratante,
          "Numero de tarjeta o cuenta": res.num_tarjeta_cuenta,
          "Agencia": res.agencia,
          "Vendedor": res.vendedor,
          "DOCUMENTO RESPONSABLE": res.documento_usuario,
          "Solicitud": res.solicitud,
          "Grupo Familiar (OPP)": res.grupo_familiar,
          "Nro. Certificado": res.no_certificado,
          "Numero CUA": res.no_cua,
          "BP Afiliado": res.bp_afiliado,
          "BP Contratante": res.bp_contratante,
          "Estatus": res.estado,
          "Cod. Mensaje": res.cod_mensaje,
          "Descripción del mensaje": res.detalle,
        }
      ]

      this.excelService.exportToExcel(this.reporteAltaByC, 'AltaByC');
      this.isLoading = false
    });

  }

  exportarRecaudoByC() {
    this.isLoading2 = true
    this.reportServ.reporteRecaudoByC().subscribe(response => {
      // this.reporteRecaudoByC = response["data"];
      var res = response["data"][0]
      console.log(res);
      this.reporteRecaudoByC = [
        {
          "Tipo canal": res.canal,
          "Empresa": res.empresa,
          "Razon Social": res.razon_social,
          "Ruc": res.ruc,
          "Bp empresa": res.bp_empresaws,
          "Producto": res.producto,
          "Propuesta, solicitud": res.propuesta,
          "Codigo unico de afiliado": res.codigo_afiliado,
          "Nombres y Apellidos": res.nombre_apellidos,
          "Categoria": res.categoria,
          "Fecha de cargo": res.fecha_cargo,
          "Programa": res.programa,
          "Edad": res.edad,
          "Fuma": res.fuma,
          "Tarifa (monto)": res.tarifa_monto,
          "Periodo": res.periodo,
          "Operación": res.operacion,
          "Entidad Procesadora": res.codigo_procesadora,
          "Fecha Proceso": res.fecha_proceso,
          "Nro Cuota": res.numero_cuota,
          "N° cuenta": res.num_cuenta,
          "Documento responsable": res.documento_usuario,
          "Fecha nacimiento": res.fecha_nacimiento_afi,
          "Tipo de doc identidad": res.tipo_Documento_afi,
          "Num documento identidad": res.num_documento_afi,
          "Fecha de venta": res.fecha_venta,
          "Fecha de afilicación":  res.fecha_afiliacion,
          "Solicitud": res.solicitud,
          "Grupo Familiar (OPP)": res.grupo_familiar,
          "Nro. Certificado": res.no_certificado,
          "Numero CUA": res.no_cua,
          "BP Afiliado": res.bp_afiliado,
          "BP Contratante": res.bp_contratante,
          "Estatus": res.estado,
          "Cod. Mensaje": res.cod_mensaje,
          "Descripción del mensaje": res.detalle,
        }
      ]

      this.excelService.exportToExcel(this.reporteRecaudoByC, 'RecaudoByC');
      this.isLoading2 = false
    });
  }

  exportarBajaByC() {
    this.isLoading3 = true
    this.reportServ.reporteBajaByC().subscribe(response => {
      // this.reporteBajaByC = response["data"];
      var res = response["data"][0]
      console.log(res);
      this.reporteBajaByC = [
        {
          "Tipo canal": res.canal,
          "Empresa": res.empresa,
          "Razon Social": res.razon_social,
          "Ruc": res.ruc,
          "Bp empresa": res.bp_empresaws,
          "Producto": res.producto,
          "Propuesta, solicitud": res.propuesta,
          "Codigo unico de afiliado": res.codigo_afiliado,
          "Nombres y Apellidos": res.nombre_apellidos,
          "Tipo Dcmto identidad": res.afi_tipo_doc,
          "Num documento identidad ": res.afi_num_doc,
          "Categoria (Titular/Dependiente)": res.categoria,
          "Fecha venta": res.fecha_venta,
          "Fecha afiliacion": res.fecha_afiliacion,
          "Programa": res.programa,
          "Fecha de baja": res.fecha_baja,
          "Codigo de Baja": res.codigo_baja,
          "Motivo de Baja": res.motivo_baja,
          "Documento responsable": res.documento_usuario,
          "Solicitud": res.solicitud,
          "Grupo Familiar (OPP)": res.grupo_familiar,
          "Nro. Certificado": res.no_certificado,
          "Numero CUA": res.no_cua,
          "BP Afiliado": res.bp_afiliado,
          "BP Contratante": res.bp_contratante,
          "Estatus": res.estado,
          "Cod. Mensaje": res.cod_mensaje,
          "Descripción del mensaje": res.detalle,
        }
      ]
      this.excelService.exportToExcel(this.reporteBajaByC, 'BajaByC');
      this.isLoading3 = false
    });
  }

  exportarGrupales() {
    this.isLoading4 = true
    this.reportServ.reporteGrupales().subscribe(response => {
      // this.reporteGrupales = response["data"];
      var res = response["data"][0]
      console.log(res);
      this.reporteGrupales = [
        {
          "PAIS": res.pais,
          "Tipo de Trama": res.tipo_movimiento,
          "Razon Social": res.razon_social,
          "Ruc": res.ruc,
          "Bp empresa": res.bp_empresaws,
          "GRUPO FAMILIAR": res.grupo_familiar,
          "CERTIFICADO (GF EXTERNO)": res.cod_afiliado,
          "APELLIDO PATERNO": res.apellido_paterno,
          "APELLIDO MATERNO": res.apellido_materno,
          "NOMBRE 1": res.nombre_1,
          "NOMBRE 2": res.nombre_2,
          "SEXO": res.sexo,
          "FECHA DE NACIMIENTO": res.fecha_nacimiento,
          "PARENTESCO": res.parentesco,
          "TIPO DE DOCUMENTO": res.tipo_documento,
          "NUMERO DE DOCUMENTO": res.numero_doc,
          "DIRECCION DE EMPRESA": res.direccion_empresa,
          "CORREO DE CONTACTO DE LA EMPRESA": res.correo_empresa,
          "PROGRAMA": res.programa,
          "INICIO DE VIGENCIA": res.fecha_vigencia,
          "NOMBRE DE LA EMPRESA": res.nombre_empresa,
          "SEDE": res.sede_carga,
          "EDAD DEL AFILIADO": res.edad_afiliado,
          "FIN DE VIGENCIA": res.fecha_fin_vigencia,
          "Solicitud": res.solicitud,
          "Grupo Familiar (OPP)": res.grupo_familiar_opp,
          "Nro. Certificado": res.no_certificado,
          "Numero CUA": res.no_cua,
          "BP Afiliado": res.bp_afiliado,
          "BP Contratante": res.bp_contratante,
          "Estatus": res.estado,
          "Cod. Mensaje": res.cod_mensaje,
          "Descripción del mensaje": res.detalle,
        }
      ]
      this.excelService.exportToExcel(this.reporteGrupales, 'Grupales');
      this.isLoading4 = false
    });
  }

  exportarTelemarketing() {
    this.isLoading5 = true
    this.reportServ.reporteTelemarketing().subscribe(response => {
      // this.reporteTelemarketing = response["data"];
      var res = response["data"][0] 
      console.log(res);
      this.reporteTelemarketing = [
        {
          "CANAL": res.canal,
          "RAZÓN SOCIAL": res.razon_social,
          "RUC": res.ruc,
          "BP EMPRESA": res.bp_empresaws,
          "CERTIFICADO": res.certificado,
          "CUA": res.cod_afiliado,
          "GRUPO FAMILIAR": res.grupo_familiar,
          "TIPO DOC. AFILIADO": res.tipo_documento_afi,
          "DOC. IDE. AFILIADO": res.num_documento_afi,
          "APELLIDO 1 AFILIADO": res.ap_paterno,
          "APELLIDO 2 AFILIADO": res.ap_materno,
          "NOMBRE 1 AFILIADO": res.nombre_1,
          "NOMBRE 2 AFILIADO": res.nombre_2,
          "SEXO AFILIADO": res.sexo_afi,
          "FECHA NACIMI. AFILIADO": res.fecha_nacimiento_afi,
          "UBIGEO AFILIADO": res.ubigeo_afi,
          "UBIGEO DISTRITO AFILIADO": res.ubigeo_distrito,
          "UBIGEO PROVINCIA AFILIADO": res.ubigeo_provincia,
          "UBIGEO DEPARTAMENTO AFILIADO": res.ubigeo_departamento, 
          "DIRECCIÓN AFILIADO": res.direccion_afi,
          "CORREO ELECTRONICO AFILIADO": res.correo_afi,
          "NÚMERO TELEFONO 1 AFILIADO": res.telefono_afi,
          "NÚMERO TELEFONO 2 AFILIADO": res.celular_afi,
          "CATEGORIA": res.categoria,
          "PRODUCTO": res.producto,
          "PROGRAMA": res.programa,
          "FUMA": res.fuma,
          "TARIFA": res.tarifa,
          "FECHA VENTA": res.fecha_venta,
          "FECHA AFILIACION": res.fecha_afiliacion,
          "FECHA PROCESO": res.fecha_proceso,
          "PROCESADORA": res.ent_procesadora,
          "TARJETA ENMASCARADA": res.num_tarjeta_cuenta,
          "TOKEN": res.token_tarjeta,
          "FV TOKEN": res.fecha_vencimiento_token,
          "NUMERO PEDIDO": res.num_pedido,
          "CODIGO AUTORIZACION": res.cod_autorizacion,
          "TIPO DOCUMENTO VENTA": res.tipo_documento_venta,
          "TIPO DOC. APORTANTE": res.tipo_documento_contratante,
          "DOC. IDE. APORTANTE": res.num_documento_contratante,
          "APELLIDO 1 APORTANTE": res.ap_paterno_contratante,
          "APELLIDO 2 APORTANTE": res.ap_materno_contratante,
          "NOMBRE 1 APORTANTE": res.nombre_1_contratante,
          "NOMBRE 2 APORTANTE": res.nombre_2_contratante,
          "SEXO APORTANTE": res.sexo_contratante,
          "FECHA NACIMI. APORTANTE": res.fecha_nacimiento_contratante,
          "UBIGEO APORTANTE": res.ubigeo_contratante,
          "UBIGEO DISTRITO APORTANTE": res.ubigeo_distrito_aportante,
          "UBIGEO PROVINCIA APORTANTE": res.ubigeo_provincia_aportante,
          "UBIGEO DEPARTAMENTO APORTANTE": res.ubigeo_departamento_aportante,
          "DIRECCIÓN APORTANTE": res.direccion_contratante,
          "CORREO ELECTRONICO APORTANTE": res.correo_contratante,
          "NÚMERO TELEFONO 1 APORTANTE": res.telefono_contratante,
          "NÚMERO TELEFONO 2 APORTANTE": res.celular_contratante,
          "DOCUMENTO VENDEDOR": res.dni_vendedor,
          "DOCUMENTO SUPERVISOR": res.dni_supervisor,
          "PLAN": res.plan,
          "CAMPAÑA": res.campana,
          "GRUPO VENDEDOR": res.grupo_vendedores,
          "NUM CONVENIO": res.num_convenio,
          "BANCO PROMO": res.banco_promo,
          "CUOTA PROMO": res.cuota_promo,
          "CODIGO BP": res.codigo_bp,
          "DJS": res.djs,
          "LDPD": res.ldpd,
          "DOCUMENTO RESPONSABLE": res.documento_usuario,
          "Solicitud": res.solicitud,
          "Grupo Familiar (OPP)": res.grupo_familiar_opp,
          "Nro. Certificado": res.no_certificado,
          "Numero CUA": res.no_cua,
          "BP Afiliado": res.bp_afiliado,
          "BP Contratante": res.bp_contratante,
          "Estatus": res.estado,
          "Cod. Mensaje": res.cod_mensaje,
          "Descripción del mensaje": res.detalle,

        }
      ]
      this.excelService.exportToExcel(this.reporteTelemarketing, 'Telemarketing');
      this.isLoading5 = false
    });
  }

}
