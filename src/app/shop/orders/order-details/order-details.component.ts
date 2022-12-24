import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import Medusa from "@medusajs/medusa-js";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() orderId: any;

  orderDetails: any;

  medusaClient: any;

  constructor(
    private modalCtrl: ModalController,
  ) {
    this.medusaClient = new Medusa({ baseUrl: environment.MEDUSA_API_BASE_PATH, maxRetries: 10 });
  }

  ngOnInit() {
    this.medusaClient.orders.retrieve(this.orderId)
      .then((order: any) => {
        this.orderDetails = order.order;
        // console.log(this.orderDetails);
      });
  }
  dismissModal() {
    return this.modalCtrl.dismiss(this.orderDetails, 'confirm');
  }
}
