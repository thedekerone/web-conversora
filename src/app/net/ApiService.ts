import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public _END_POINTS = {
    BASE_ROUTE_PATH: `${environment.baseRoute}`,
    BASE_ROUTE_PATH_HISTORY: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-historico`,
    BASE_ROUTE_PATH_CMR: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-plan-cmr`,
    BASE_ROUTE_PATH_EMP: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-empresa`,
    BASE_ROUTE_PATH_UPLOAD_ARCHIVO_PAGO: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-cargararchivopago`,
    URL_GET_USER_PROFILE: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-usuario`,
    URL_GET_COMPANY: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-sapws`,
    URL_GET_TYPE_OF_PAY_BY_COMPANY: `${environment.baseRoutePath}/api-usuario-conversor`,
    BASE_ROUTE_PATH_PUNTUACION: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-puntuaciones`,
    BASE_ROUTE_PATH_REPORTES: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-reportes`,
    BASE_ROUTE_PATH_MANT_PROGRAMA: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-programa`,
    BASE_ROUTE_PATH_SAVE: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-trama`,
    BASE_ROUTE_PATH_MANT_DJS: `${environment.baseRoutePathMantDjs}/dev-conversor-declaracionjs`,
    BASE_ROUTE_PATH_MANT_LPPD: `${environment.baseRoutePathMantLppd}/dev-conversor-lddp`,
    BASE_ROUTE_PATH_MANT_CONVENIO: `${environment.baseRoutePathMantConvenio}/dev-conversor-convenio`,
    BASE_ROUTE_PATH_MANT_CODIGOBP: `${environment.baseRoutePathMantCodigoBP}/dev-conversor-codigobp`,
    BASE_ROUTE_PATH_MANT_GRUPOVENDEDOR: `${environment.baseRoutePathMantGrupoVendedor}/dev-conversor-grupovendedor`,
    BASE_ROUTE_PATH_MANT_CAMPANAS: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-eq-plancampana`,
    BASE_ROUTE_PATH_MANT_CONTABLES: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-cuentacontables`,
    BASE_ROUTE_PATH_MANT_PROGRAM_GRUPALES: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-programagrupales`,
    BASE_ROUTE_PATH_ESTADO_CARGA_PROCESOS: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-trama`,
  };
}
