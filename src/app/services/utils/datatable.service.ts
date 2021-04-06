import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  dtPagination : DataTables.LanguagePaginateSettings = {
    first: "Primero",
    last: "Último",
    next: "Siguiente",
    previous: "Anterior",
  };

  dtlanguage : DataTables.LanguageSettings;
  constructor() { }

  optionsDataTable(){
    return {
      pagingType: 'full_numbers',
      pageLength: 10,
      order : [[ 0, "asc" ]],
      language : this.lenguageSpanish(),
    };
  }

  optionsLogDataTable(){
    return {
      pagingType: 'numbers',
      pageLength: 10,
      order : [[ 0, "asc" ]],
      language : this.lenguageSpanish(),
    };
  }

  lenguageSpanish(){
    return this.dtlanguage = {
      emptyTable: "Ningún dato disponible en esta tabla",
      info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      infoFiltered: "(filtrado de un total de _MAX_ registros)",
      infoPostFix: "",
      loadingRecords: "",
      processing: "Cargando...",
      lengthMenu : "Mostrar _MENU_ registros",
      search: "Buscar:",
      searchPlaceholder: "",
      zeroRecords: "No se encontraron resultados",
      url: "",
      paginate : this.dtPagination
    };
  }

}
