// mask-password.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskPassword',
})
export class MaskPasswordPipe implements PipeTransform {
  transform(value: string): string {
    return value ? '********' : '';
  }
}
