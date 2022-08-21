import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService} from 'primeng/api';
import { SnotifyService } from 'ng-snotify';
import { AuthService } from '../auth/auth.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { stream } from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private _Router: Router,
    private _NgxSpinnerService: NgxSpinnerService,
    private _SnotifyService: SnotifyService,
    private _MessageService: MessageService,
    private _AuthService: AuthService,
  ) { }

  messageService(type: string, title: string, message: string) {
    // this._MessageService.clear();
    this._MessageService.add({severity: type, summary: title, detail: message});
  }

  /**
   * messagePrimengToast
   * @param type
   * @param title
   * @param message
   * @param clean
   */
  messagePrimengToast(type = '', title = '', message: string, clean = false) {
    if ( clean ) { this._MessageService.clear(); }
    let severity = 'success';
    switch (type) {
      case 'i':
        severity = 'info';
        break;
      case 'w':
        severity = 'warn';
        break;
      case 'e':
        severity = 'error';
        break;
      default :
        break;
    }
    this.hideLoading();
    this._MessageService.add({severity: severity, summary: title !== '' ? title : '¡Exito..!', detail: message});
  }

  /**
   * messagePrimengToastCrud
   * @param crud
   * @param title
   * @param message
   * @param clean
   */
  messagePrimengToastCrud(crud = '', title = '', message = '', clean = false): void {
    let msg = 'Datos actualizados correctamente.';
    switch (crud) {
      case 'r':
        msg  = 'Datos registrados correctamente.';
        break;
      case 'd':
        msg  = 'Datos eliminados correctamente.';
        break;
      default :
        break;
    }
    this.hideLoading();
    this.messagePrimengToast('', title !== '' ? title : '¡Exito..!', message !== '' ? message : msg, clean);
  }

  /**
   * messageSnotifyToast
   * @param type
   * @param title
   * @param message
   * @param clean
   */
  messageSnotifyToast(message = '', title = '', type = '', clean = false) {
    message = message !== '' ? message : 'Datos actualizados correctamente.';
    title = title !== '' ? title : '¡Exito..!';
    switch (type) {
      case 'i':
        this._SnotifyService.info(message, title);
        break;
      case 'w':
        this._SnotifyService.warning(message, title);
        break;
      case 'd':
        this._SnotifyService.error(message, title);
        break;
      case 'e':
        this._SnotifyService.error(message, title);
        break;
      case 'sp':
        this._SnotifyService.simple(message, title);
        break;
      case 'pp':
        this._SnotifyService.prompt(message, title);
        break;
      case 'cf':
        this._SnotifyService.confirm(message, title);
        break;
      default :
        this._SnotifyService.success(message, title);
        break;
    }
    this.hideLoading();
  }

  /**
   * messageSnotifyToastCrud
   * @param crud
   * @param title
   * @param message
   * @param clean
   */
  messageSnotifyToastCrud(crud = '', title = '', message = '', clean = false): void {
    message = message !== '' ? message : 'Datos actualizados correctamente.';
    title = title !== '' ? title : '¡Exito..!';
    switch (crud) {
      case 'r':
        message  = 'Datos registrados correctamente.';
        break;
      case 'd':
        message  = 'Datos eliminados correctamente.';
        break;
      default :
        break;
    }
    this.hideLoading();
    this.messageSnotifyToast('', title, message, clean);
  }

  /**
   * formatDateToDateSpanish
   * @param date
   */
  formatDateToDateSpanish(date: Date): string {
    date = new Date(date + ' 00:00:00');
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
  }

  /**
   * formatTimToDateSpanish
   * @param date
   */
  formatTimToDateSpanish(date: Date): string {
    date = new Date(date);
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
  }

  /**
   * formatTimToTimSpanish
   * @param date
   */
  formatTimToTimSpanish(date: Date): string {
    date = new Date(date);
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() +
      ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
  }

  /**
   * formatTimzoneToDate
   * @param date
   */
  formatTimzoneToDate(date: Date): string {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  /**
   * formatTimzoneToTim
   * @param date
   */
  formatTimzoneToTim(date: Date): string {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) +
      ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
  }

  /**
   * formatDateSpanishToDate
   * @param date
   */
  formatDateSpanishToDate(date: string): string {
    const res = date.split('/');
    return res[2] + '-' + res[1] + '-' + res[0];
  }

  /**
   * showLoading
   */
  showLoading(): void {
    this._NgxSpinnerService.show();
  }

  /**
   * closedSpinner
   */
  hideLoading(): void {
    setTimeout(() => {
      /** spinner ends after 1 seconds */
      this._NgxSpinnerService.hide();
    }, 100);
  }

  /**
   * exportPdf
   * @param cols
   * @param rows
   * @param options
   * @param filename
   */
  exportPdf(cols: any, rows: [], options: any, filename: string) {
    const doc = new jsPDF();
    autoTable(doc, {columns: cols, body: rows, styles: options});
    doc.save(filename + '.pdf');
  }

  /**
   * exportExcel
   * @param cols
   * @param rows
   * @param options
   * @param filename
   */
  exportExcel(cols: never, rows: [], options: any, filename: string) {
    rows.unshift(cols);
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(rows, {skipHeader: true});
      const workbook = { Sheets: {hoja1: worksheet }, SheetNames: ['hoja1'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, filename);
    });
  }

  /**
   * saveAsExcelFile
   * @param buffer
   * @param fileName
   */
  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  /**
   * regexValidateDate
   */
  regexValidateDate() {
    const sep          = '[/]',
      dia1a28          = '(0?[1-9]|1\\d|2[0-8])',
      dia29            = '(29)',
      dia29o30         = '(29|30)',
      dia31            = '(31)',

      mes1a12          = '(0?[1-9]|1[0-2])',
      mes2             = '(0?2)',
      mesNoFeb         = '(0?[13-9]|1[0-2])',
      mes31dias        = '(0?[13578]|1[02])',

      diames29Feb      = dia29 + sep + mes2,
      diames1a28       = dia1a28 + sep + mes1a12,
      diames29o30noFeb = dia29o30 + sep + mesNoFeb,
      diames31         = dia31 + sep + mes31dias,
      diamesNo29Feb    = '(?:' + diames1a28 + '|' + diames29o30noFeb + '|' + diames31 + ')',

      anno1a9999       = '(0{2,3}[1-9]|0{1,2}[1-9]\\d|0?[1-9]\\d{2}|[1-9]\\d{3})',
      annoMult4no100   = '\\d{1,2}(?:0[48]|[2468][048]|[13579][26])',
      annoMult400      = '(?:0?[48]|[13579][26]|[2468][048])00',
      annoBisiesto     = '(' + annoMult4no100 + '|' + annoMult400 + ')',

      fechaNo29Feb     = diamesNo29Feb + sep + anno1a9999,
      fecha29Feb       = diames29Feb + sep + annoBisiesto,

      fechaFinal       = '^(?:' + fechaNo29Feb + '|' + fecha29Feb + ')$';

    return new RegExp(fechaFinal);
  }

  /**
   * validateDate
   * @param texto
   * @param UTC
   */
  validateDate(texto: string, UTC = false) {
    let group;
    const validate_date = this.regexValidateDate();
    /* validate_date = /^(?:(?:(0?[1-9]|1\d|2[0-8])[/](0?[1-9]|1[0-2])|(29|30)[/](0?[13-9]|1[0-2])
    |(31)[/](0?[13578]|1[02]))[/](0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|(29)[/]
    (0?2)[/](\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/, */

    if (group = validate_date.exec(texto)) {
      /* Unir día mes y año desde los grupos que pueden haber coincidido */
      const d = [group[1], group[3], group[5], group[8]].join(''),
        m = [group[2], group[4], group[6], group[9]].join(''),
        a = [group[7], group[10]].join(''),
        date = new Date(0);

      /* Obtener la fecha en formato local o UTC */
      if (UTC) {
        date.setUTCHours(0);
        date.setUTCFullYear(Number(a), parseInt(m, 10) - 1, Number(d));
      } else {
        date.setHours(0);
        date.setFullYear(Number(a), parseInt(m, 10) - 1, Number(d));
      }

      /* Devolver como objeto con cada número por separado */
      /*return {
        d: d,
        m: m,
        a: a,
        date: date
      };*/
      return true;
    }
    return false; /* No es fecha válida */
  }

  /**
   * calculateAge
   * @param birthday
   */
  calculateAge(birthday: any) {
    const birthday_arr = birthday.split('/');
    const birthday_date = new Date(birthday_arr[2], birthday_arr[1] - 1, birthday_arr[0]);
    const ageDifMs = Date.now() - birthday_date.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  /**
   * dateSplit
   * @param date
   */
  dateSplit(date: string) {
    const res = date.split('/');
    if ( res.length > 2 ) {
      return res[2] + '-' + res[1] + '-' + res[0];
    } else {
      return res[0];
    }
  }

  languageCalendar(): any {
    return {
      firstDayOfWeek: 1,
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      today: 'Hoy',
      clear: 'Borrar',
      dateFormat: 'dd/mm/yy',
    };
  }
}
