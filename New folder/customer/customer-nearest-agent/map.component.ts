import { Component, OnInit, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import { GoogleMapsAPIWrapper, MarkerManager, InfoWindowManager } from "@agm/core";

declare var google: any;

@Component({
    selector: 'core-map',
    template: '',
})
export class CoreMap implements OnInit {

    @Output() onMapLoad: EventEmitter<{}> = new EventEmitter<{}>();

    constructor(public mapWrapper: GoogleMapsAPIWrapper) {}

    ngOnInit(): void {
        this.mapWrapper.getNativeMap().then((map)=> {
            this.onMapLoad.emit(map);
        });
    }
}