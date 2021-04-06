import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { saveAs as importedSaveAs } from "file-saver";
import * as XLSX from 'xlsx';
import { map } from 'rxjs/operators';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  download_endpoint = "";
  constructor(private http: HttpClient) { }

  exportToExcel(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  saveAsFile(fileName: string, urlFile: string): void {

    //var extension = fileName.split(".")[1]
    //var file = fileName.split(".")[0]

    //console.log(extension);
    //console.log(file);
    //FileSaver.saveAs(urlFile, file + '_export_' + new Date().getTime() + extension);
    var blob = new Blob([urlFile], { type: 'application/octet-stream' });
    console.log(blob);
    var url = window.URL.createObjectURL(blob);

    importedSaveAs(blob, fileName);
    //window.open(url);
  }
  down(url) {
    return this.http.get(url).pipe(map(res => res))
  }

}
