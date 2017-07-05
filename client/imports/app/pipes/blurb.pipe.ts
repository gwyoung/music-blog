import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'blurb'
})
export class BlurbPipe implements PipeTransform {
    transform(blurb: string): string {
        // Replace all line breaks with <br /> tags
        return blurb.replace(/(?:\r\n|\r|\n)/g, '<br />');
    }
}