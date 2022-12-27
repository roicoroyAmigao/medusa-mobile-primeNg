import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { NavigationService } from './navigation.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddressesActions } from 'src/app/store/addresses/addresses.actions';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { CartActions } from 'src/app/store/cart/cart.actions';
import { CustomerActions } from 'src/app/store/customer/customer.actions';
import { StrapiUserActions } from 'src/app/store/strapi-user/strapi-user.actions';
import { ProductsLogOut } from 'src/app/store/products/products.actions';

@Injectable({
    providedIn: 'root'
})
export class AppAuthService {
    headers_json = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(
        private store: Store,
        private navigation: NavigationService,
        private http: HttpClient
    ) { }

    public async logout(): Promise<void> {
        const deleteReq = this.http.delete(environment.MEDUSA_API_BASE_PATH + '/store/auth', { headers: this.headers_json });
        this.store.dispatch(new CustomerActions.LogOutMedusaUser());
        this.store.dispatch(new MedusaActions.LogOut());
        this.store.dispatch(new CartActions.LogOut());
        this.store.dispatch(new AddressesActions.LogOut());
        this.store.dispatch(new StrapiUserActions.LogOutStrapiUser());
        // this.store.dispatch(new ProductsLogOut());
        // this.navigation.navigateForward('/home', 'back');
    }
    public async logoutUser(): Promise<void> {
        const deleteReq = this.http.delete(environment.MEDUSA_API_BASE_PATH + '/store/auth', { headers: this.headers_json });
        this.store.dispatch(new CustomerActions.LogOutMedusaUser());
        this.store.dispatch(new MedusaActions.LogOut());
        this.store.dispatch(new StrapiUserActions.LogOutStrapiUser());
    }
}
