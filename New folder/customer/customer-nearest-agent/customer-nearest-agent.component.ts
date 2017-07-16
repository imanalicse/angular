import { Component, OnInit, ViewEncapsulation, ContentChildren, QueryList, ViewChildren, EventEmitter, Output } from '@angular/core';
import { GoogleMapsAPIWrapper, LatLng, MapsAPILoader, MarkerManager, AgmMarker, AgmMap, InfoWindowManager, AgmInfoWindow } from "@agm/core";
import { CustomerService } from "app/services/customer.service";
import { BaseComponent } from "app/shared/base.component";
import { BaseService } from "app/services/base.service";
import { NearestAgentModel } from "app/shared/models/nearest-agent.model";
import { DialogTypeEnum } from "app/shared/enum-collection/dialog-type-enum";
import { PreferredAgentModel } from "app/shared/models/preferred-agent.model";
import {environment} from "../../../environments/environment";

declare var google: any;

@Component({
    selector: 'app-customer-nearest-agent',
    templateUrl: './customer-nearest-agent.component.html',
    styleUrls: ['./customer-nearest-agent.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CustomerNearestAgentComponent extends BaseComponent implements OnInit {

    lat: number;
    lng: number;
    zoom: number;
    tabChanged: boolean;

    windows: AgmInfoWindow[];
    map: any;
    showRightSidebar: boolean;
    nearestAgents: NearestAgentModel[];
    selectedNearestAgent: NearestAgentModel;
    preferredAgent: PreferredAgentModel;


    @Output() onMapLoad: EventEmitter<{}> = new EventEmitter<{}>();

    constructor(public mapWrapper: GoogleMapsAPIWrapper, public mapsAPILoader: MapsAPILoader, private customerService: CustomerService, private baseService: BaseService) {
        super();

        this.showRightSidebar = true;
        this.zoom = 8;
        this.nearestAgents = [];
        this.preferredAgent = new PreferredAgentModel();
        this.selectedNearestAgent = new NearestAgentModel();
        this.tabChanged = false;

    }

    ngOnInit(): void {

    }

    @ViewChildren(AgmInfoWindow) children: QueryList<AgmInfoWindow>;
    mapLoaded(map) {
        this.map = map;
        this.windows = this.children.toArray();
    }

    clickOnNearestAgent(index: number, agent: NearestAgentModel) {
        this.selectedNearestAgent = agent;
        this.setCenter(index);
    }

    selectNearestAgent(agent: NearestAgentModel) {
        this.customerService.updatePreferredAgent(agent.id).subscribe(
            success => {
                if (success.status && success.status.code == 200) {
                    this.baseService.openDialog(DialogTypeEnum.Success, success.status.message);
                    this.preferredAgent.id = agent.id;
                } else if (success.status && success.status.code == 204) {
                    this.baseService.openDialog(DialogTypeEnum.Error, success.status.message);
                }
            },
            error => {
                this.baseService.openDialog(DialogTypeEnum.Error);
            }
        )
    }

    private setCenter(index: number) {
        this.map.setCenter({
            lat: this.nearestAgents[index].lat,
            lng: this.nearestAgents[index].lng
        });
        if (this.windows.length > 0) {
            this.windows[index].open();
        }

    }

    selectChange($event: any) {
        this.nearestAgents = [];
        this.preferredAgent = new PreferredAgentModel();
        this.selectedNearestAgent = new NearestAgentModel();
        this.tabChanged = false;
        if ($event.index == 3) {

            this.tabChanged = true;
            // get preferred agent
            this.customerService.getPreferredAgent().subscribe(
                data => {
                    if (data.data && data.status) {
                        this.preferredAgent = data.data
                    }
                }
            );

            // get nearest agents
            this.customerService.nearestAgents().subscribe(
                data => {
                    this.requesting = false;
                    if (data) {
                        if (!data.data) {
                            // request success but no agent received
                            this.hasRequestError = false;
                            this.showRightSidebar = false;
                        }
                        if (data.status && data.status.code == 200) {
                            this.hasRequestError = false;
                            this.showRightSidebar = data.data.items.length > 0;
                            for (var item of data.data.items) {
                                var _agent = new NearestAgentModel();
                                _agent.id = item.id;
                                _agent.name = item.user.firstName;
                                _agent.photoPath = item.user.photoPath? environment.webapiuri + "/" +item.user.photoPath: "../assets/images/default-large.png";
                                _agent.name += item.user.lastName == null ? "" : " " + item.user.lastName;
                                _agent.lat = 0;
                                _agent.lng = 0;
                                if (item.user.userAddresses && item.user.userAddresses.length > 0) {
                                    _agent.lat = parseFloat(item.user.userAddresses[0].address.latitude);
                                    _agent.lng = parseFloat(item.user.userAddresses[0].address.longitude);
                                    var _address = item.user.userAddresses[0].address.addressLine1;
                                    _address += item.user.userAddresses[0].address.addressLine2 == undefined || item.user.userAddresses[0].address.addressLine2 == null || item.user.userAddresses[0].address.addressLine2 == "" ? "" : ", " + item.user.userAddresses[0].address.addressLine2;
                                    _address += item.user.userAddresses[0].address.city == null ? "" : ", " + item.user.userAddresses[0].address.city;
                                    _address += ", " + item.user.userAddresses[0].address.state.name;
                                    _address += ", " + item.user.userAddresses[0].address.postCode;
                                    _agent.address = _address;
                                }
                                this.nearestAgents.push(_agent);

                                if (_agent.id == this.preferredAgent.id) {
                                    this.lat = _agent.lat;
                                    this.lng = _agent.lng;
                                    this.map.setCenter({
                                        lat: this.lat,
                                        lng: this.lng
                                    });
                                }
                            }
                        }
                    }
                },
                error => {
                    this.requesting = false;
                    this.hasRequestError = true;
                    //this.baseService.openErrorModal("Could not connect to server!");
                }
            );
        }
    }

}
