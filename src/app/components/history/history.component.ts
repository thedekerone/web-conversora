import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatatableService } from 'src/app/services/utils/datatable.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { HistoryService } from 'src/app/services/history.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExcelService } from 'src/app/services/excel.service';
import * as FileSaver from 'file-saver';

declare var require: any;
const FileSaver = require('file-saver');

declare var $: any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  p: number = 1;
  dtOptions: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  dtTrigger: Subject<any>;
  dtTrigger2: Subject<any>;
  listaHistorial = [];
  listaLog = [];

  constructor(
    private historyServ: HistoryService,
    private utilsDt: DatatableService,
    private excelService: ExcelService
  ) {
    this.listaHistorial = [];
    this.listaLog = [];
    this.dtTrigger = new Subject();

    this.dtOptions = this.utilsDt.optionsDataTable();
    this.dtOptions2 = this.utilsDt.optionsDataTable();
  }

  ngOnInit(): void {
    this.historyServ
      .downloadFile()
      .subscribe((response) => console.log(response));

    this.historyServ.listarHistorial().subscribe((response) => {
      var listaHist = response['data'];
      console.log(listaHist);
      listaHist.forEach((element) => {
        var hora = element.fecha_registro.substring(10, 19);
        for (let index = 0; index < hora.length; index++) {
          if (hora[index] == '-') {
            var horanueva = hora.replace(/-/g, ':');
            element.fecha_registro =
              element.fecha_registro.substring(0, 10) + '' + horanueva;
          }
        }
      });
      this.listaHistorial = listaHist;
      console.log(this.listaHistorial);
      this.dtTrigger.next();
    });
  }

  getBlob(url) {
    fetch(
      'https://afiliacion-procesadoras.s3.amazonaws.com/conversora/sc-D200903ALTA2.txt',
      {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
      .then((res) => {
        console.log(res);
        console.log(res.body);
        return res.blob();
      })
      .then((blob) => {
        console.log(blob);
      });
  }

  downloadPdf(url, name) {
    console.log(url);
    console.log(name);

    FileSaver.saveAs(url, name);
  }

  download(url) {
    this.excelService.down(url).subscribe((resp) => {
      console.log(resp);
    }),
      (error) => {
        console.log(error);
      };
  }

  /*downloadFile(fileName, url) {
    this.excelService.saveAsFile(fileName, url)
  }*/

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    //this.dtTrigger2.unsubscribe();
  }

  abrirModal(id_carga_trama) {
    this.listaLog = [];
    this.dtTrigger2 = new Subject();
    $('#contentModalVendedor').modal('show');
    this.historyServ.listarLog(id_carga_trama).subscribe((response) => {
      console.log(response);
      response['data'][0].fila_rechazada.map((el) => {
        el.tipo = 0;
        return el;
      });
      response['data'][0].fila_recaudo.map((el) => {
        el.tipo = 1;
        return el;
      });
      response['data'][0].fila_sap.map((el) => {
        el.tipo = 2;
        return el;
      });

      this.listaLog = response['data'][0].fila_rechazada;

      this.listaLog.push(
        ...response['data'][0].fila_recaudo,
        ...response['data'][0].fila_sap
      );
      console.log(this.listaLog);
      //this.dtTrigger2.next();
    });
    this.p = 1;
  }

  descargarLog(id_carga_trama, nombre_archivo) {
    var texto = [];
    this.dtTrigger2 = new Subject();
    this.historyServ.listarLog(id_carga_trama).subscribe((response) => {
      this.listaLog = response['data'][0].fila_rechazada;
      console.log(response);
      this.dtTrigger2.next();

      texto.push('N\t');
      texto.push('Tipo ');
      texto.push('\t');
      texto.push('Descripcion ');
      texto.push('\n');

      if (this.listaLog !== null) {
        console.log('tiene array');
        for (let i = 0; i < this.listaLog.length; i++) {
          texto.push('' + i);
          texto.push('\t');
          texto.push('Sistema');
          texto.push('\t');
          texto.push('' + this.listaLog[i].Log);
          texto.push('\n');
        }
      }

      var nombreArchivo = nombre_archivo.split('.')[0];
      var blob = new Blob(texto, { type: 'text/plain;charset=utf-8' });
      FileSaver.saveAs(blob, 'Log_' + nombreArchivo + '.txt');
    });
  }
}
