import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keys', pure: false })
export class KeysPipe implements PipeTransform {
  transform(value: any): any {
    return Object.keys(value);
  }
}

@Pipe({ name: 'values', pure: false })
export class ValuesPipe implements PipeTransform {
  transform(value: any): any {
    const key = Object.keys(value)[0];
    return value[key];
  }
}
