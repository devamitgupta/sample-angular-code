import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'splitText' })
export class SplitText implements PipeTransform {
  transform(textContent: any): any {
    if (textContent) {
      if (textContent.length > 50) {
        textContent = textContent.substring(0, 50) + '...';
      }
      return textContent;
    } else {
      return '';
    }
  }
}
