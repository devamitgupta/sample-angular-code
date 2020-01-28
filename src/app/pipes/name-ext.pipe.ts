import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'docName', pure: false })
export class DocName implements PipeTransform {
    transform(value: any): any {
        if (value) {
            let docName = value.split('.').slice(0, -1).join('.');
            return docName;
        } else {
            return '';
        }
    }
}

@Pipe({ name: 'docExt', pure: false })
export class DocExt implements PipeTransform {
    transform(value: any): any {
        if (value) {
        let docExt = value.substr((value.lastIndexOf('.') + 1));
        return docExt;
        } else {
            return '';
        }
    }
}