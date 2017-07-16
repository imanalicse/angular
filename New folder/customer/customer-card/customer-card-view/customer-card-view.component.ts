import { Component, OnInit, Input } from '@angular/core';
import { CustomerCardModel } from "app/shared/models/customer-card.model";
import { CustomerService } from "app/services/customer.service";
import { BaseService } from "app/services/base.service";

@Component({
  selector: 'app-customer-card-view',
  templateUrl: './customer-card-view.component.html',
  styleUrls: ['./customer-card-view.component.css']
})
export class CustomerCardViewComponent implements OnInit {

  @Input() models: CustomerCardModel[];
  deleteButtonVisibility: boolean;

  constructor(private customerService: CustomerService, private baseService: BaseService) { }

  ngOnInit() {
  }

  onClickUpdateButton(model: CustomerCardModel) {
    this.customerService.onCardUpdateButtonClicked.next(model);
  }

  onClickDeleteButton(model: CustomerCardModel) {
    this.customerService.onCardDeleteButtonClicked.next(model);
  }

  onClickAddButton() {
    this.customerService.onCardAddButtonClicked.next('');
  }

}
