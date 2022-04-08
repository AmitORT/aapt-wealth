import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  isNullEmptyUndefined(value: string): boolean {
    if (value === null || value === "" || value === undefined)
      return true;
    else
      return false;
  }
  numberOnly(event:KeyboardEvent): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
