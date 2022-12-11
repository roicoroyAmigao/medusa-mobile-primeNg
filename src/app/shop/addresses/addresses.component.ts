import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { Product } from 'src/app/home/interfaces';
import { ProductService } from 'src/app/home/product.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { IRegisterAddress } from 'src/app/store/state.interfaces';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { AddressesFacade } from './addresses.facade';
import { AddressBillingDetailsComponent } from './billing-address-details/billing-address-details.component';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent {

  @Input() isModal = false;

  medusaClient: any;
  presentingElement: any;
  customer$: Observable<any>;

  viewState$: Observable<any>;

  productDialog: boolean;

  products: Product[] | any;
  product: Product | any;
  selectedProducts: Product[] | any;
  submitted: boolean;

  sortOptions: SelectItem[];

  sortOrder: number;
  sortKey: any;
  sortField: string;

  constructor(
    private modalCtrl: ModalController,
    private store: Store,
    private navigation: NavigationService,
    private readonly facade: AddressesFacade,
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    // private productService: ProductService
  ) { }

  ionViewWillEnter() {
    this.viewState$ = this.facade.viewState$;
    this.viewState$.subscribe((state) => {
      console.log(state.medusaState);
    });
    this.store.dispatch(new AuthActions.GetSession());
    // const cartid = this.store.selectSnapshot<any>((state) => state.medusaState.cartId);
    // this.store.dispatch(new MedusaActions.GetMedusaCart(cartid));
    this.store.dispatch(new MedusaActions.GetMedusaRegionList());

    this.productService.getProducts().then(data => this.products = data);

    this.productService.getProducts().then(data => this.products = data);

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val: any) => !this.selectedProducts.includes(val));
        this.selectedProducts = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val: any) => val.id !== product.id);
        this.product = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }


  onCheckboxChange(id: any, $event: any) {
    // console.log(id, $event.detail);
    // console.log(id, $event.detail.checked);
  }
  async navigateBack() {
    // console.log(this.isModal);
    if (this.isModal === false) {
      await this.navigation.navigateFlip('/shop/orders');
    } else {
      await this.modalCtrl.dismiss();
    }
  }
  async viewBilingAddress() {
    const modal = await this.modalCtrl.create({
      component: AddressBillingDetailsComponent,
    });
    await modal.present();
  }
  async openShippingAddressModal(address?: IRegisterAddress) {
    const modal = await this.modalCtrl.create({
      component: AddressDetailsComponent,
      componentProps: {
        address: address != null ? address : null,
      }
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    const address_form: IRegisterAddress = {
      last_name: data?.last_name,
      first_name: data?.first_name,
      address_1: data?.address_1,
      address_2: data?.address_2,
      city: data?.city,
      country_code: data?.country,
      postal_code: data?.postal_code,
      phone: data?.phone,
    }
    if (data.id === null || data.id === "" && role === 'save') {
      this.saveNewAddress(address_form);
    } else if (data.id != null && role === 'save') {
      const addressId: string = data.id;
      this.updateAdress(addressId, address_form);
    }
  }
  updateAdress(addressId?: any, address_form?: IRegisterAddress) {
    console.log(addressId, address_form);
    this.store.dispatch(new MedusaActions.UpdateCustomerRegisterAddress(addressId, address_form));
  }
  saveNewAddress(address_form?: IRegisterAddress) {
    console.log(address_form);
    this.store.dispatch(new MedusaActions.AddaShippingAddress(address_form));
  }
}


