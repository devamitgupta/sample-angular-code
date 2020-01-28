import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isTrue',  pure: false })
export class IsTrue implements PipeTransform {
    transform(arrCategory: Array<any>): any {
        return arrCategory.filter(x=> { return x.checked === true });
    }
}

@Pipe({ name: 'isFalse',  pure: false })
export class IsFalse implements PipeTransform {
    transform(arrCategory: Array<any>, isTrue: boolean): any {
        return arrCategory.filter(x=> { return x.checked === false });
    }
}