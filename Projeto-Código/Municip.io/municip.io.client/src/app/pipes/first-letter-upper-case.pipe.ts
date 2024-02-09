import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterUpperCase'
})
export class FirstLetterUpperCasePipe implements PipeTransform {
  transform(value: string): string {
    // Check if the value is not null or undefined
    if (!value) {
      return value;
    }

    // Split the string into words
    const words = value.split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    // Join the words back together with spaces
    return capitalizedWords.join(' ');
  }
}
