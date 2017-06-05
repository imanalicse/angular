import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], filter: any): any {

        if (!items || !filter) {
            return items;
        }

        //console.log(items);
        filter = filter.toLowerCase();

        //console.log(filter);

        // filter items array, items which match and return true will be kept, false will be filtered out
        //return items.filter(item => item.title.indexOf(filter) !== -1);
        return items.filter(item => item.title.toLowerCase().indexOf(filter) !== -1 || item.phone.indexOf(filter) !== -1);
    }
}