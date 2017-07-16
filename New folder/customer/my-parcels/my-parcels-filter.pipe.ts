import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'parcelFilter',
    pure: false
})
export class MyParcelsFilterPipe implements PipeTransform {
    transform(items:any[], filter:any):any {

        if (!items || !filter) {
            return items;
        }

        filter = filter.toLowerCase();

        return items.filter(
            item => {
                if(item.sender != null){
                    return item.sender.toLowerCase().indexOf(filter) !== -1 || (item.trackingNumber !=null && item.trackingNumber.toLowerCase().indexOf(filter) !== -1)  || item.description.toLowerCase().indexOf(filter) !== -1 || (item.reliveriTrackingNumber !=null && item.reliveriTrackingNumber.toLowerCase().indexOf(filter) !== -1) ;
                }
         });
    }
}