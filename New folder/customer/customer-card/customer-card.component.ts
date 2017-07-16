import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { CustomerService } from "app/services/customer.service";
import { CustomerCardModel } from "app/shared/models/customer-card.model";
import { BaseService } from "app/services/base.service";
import { BaseComponent } from "app/shared/base.component";
import { DialogTypeEnum } from "app/shared/enum-collection/dialog-type-enum";
import { CustomerCardUpdateModel } from "app/shared/models/customer-card-update.model";
import { CardTypeModel } from "app/shared/models/card-type.model";
import { CustomerCardAddModel } from "app/shared/models/customer-card-add.model";

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerCardComponent extends BaseComponent implements OnInit {

  viewModels: CustomerCardModel[];
  updateModel: CustomerCardModel;
  addModel: CustomerCardAddModel;
  activePanel: string;
  cardTypes: CardTypeModel[];

  constructor(private customerService: CustomerService, private baseService: BaseService) {
    super();

    this.viewModels = [];

    // update
    BaseService.subscribeOnce(
      this.customerService.onCardUpdateButtonClicked,
      data => {
        this.showUpdatePanel(data);
      },
      error => {
        console.log("error ", error);
      }
      );

    // save
    BaseService.subscribeOnce(
      this.customerService.onCardSaveButtonClicked,
      data => {
        this.showViewPanel();
      },
      error => { console.log("error ", error); }
      );

    // cancel
    BaseService.subscribeOnce(
      this.customerService.onCardCancelButtonClicked,
      data => {
        this.showViewPanel();
      },
      error => { console.log("error ", error); }
      );

    // delete
    BaseService.subscribeOnce(
      this.customerService.onCardDeleteButtonClicked,
      data => {
        this.baseService.openDialog(
          DialogTypeEnum.Confirm,
          "Are you sure you want to delete the card?",
          "Delete Card",
          {
            positive: () => {
              this.customerService.deleteCard(data.id).subscribe(
                data => {
                  if (data && data.status.code == 200) {
                    this.showViewPanel();
                  } else {
                    // failed to delete
                    this.baseService.openDialog(DialogTypeEnum.Error, "Could not detele.");
                  }
                },
                error => {
                  console.log('error on delete card');
                }
                )
            },
            negative: () => {
              //
            }
          }
          );
      },
      error => { console.log("error ", error); }
      );

    // add
    BaseService.subscribeOnce(
      this.customerService.onCardAddButtonClicked,
      data => {
        this.activePanel = 'add';
      },
      error => { console.log("error ", error); }
      );

    // add cancel
    BaseService.subscribeOnce(
      this.customerService.onCardAddCancelButtonClicked,
      data => {
        this.showViewPanel();
      },
      error => { console.log("error ", error); }
      );

    // on card added
    BaseService.subscribeOnce(this.customerService.onCardAdded,
      data => {
        if (data) {
          this.showViewPanel();
        }
      },
      error => { console.log('error on delete button click'); }
      )

  }

  ngOnInit() {

    this.showViewPanel();

    this.customerService.getCardTypes().subscribe(
      data => {
        var _data = data as any;
        if (_data.status.code && _data.status.code == 200) {
          this.cardTypes = _data.data;
        }
      },
      error => { }
      )

  }

  ngOnDestroy() {
    this.activePanel = '';
  }

  showViewPanel() {
    this.customerService.getCard().subscribe(
      data => {
        this.requesting = false;
        this.hasRequestError = false;
        this.activePanel = 'view';
        this.viewModels = data.data;
      },
      error => {
        this.activePanel = '';
        this.requesting = false;
        this.hasRequestError = true;
        this.baseService.openDialog(DialogTypeEnum.Error, "Could not connect to server!");
      }
      )
  }

  showUpdatePanel(model: CustomerCardModel) {
    this.updateModel = model;
    this.activePanel = 'update';
    this.requesting = false;
    this.hasRequestError = false;
  }

  showAddPanel(model: CustomerCardAddModel) {
    this.addModel = model;
    this.activePanel = 'add';
    this.requesting = false;
    this.hasRequestError = false;
  }

  selectChange($event: any) {
    if ($event.index == 2) {
    }
  }

}
