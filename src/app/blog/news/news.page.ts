import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { AppAuthService } from 'src/app/shared/services/auth.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { AddressesActions } from 'src/app/store/addresses/addresses.actions';
import { CartActions } from 'src/app/store/cart/cart.actions';
import { CustomerActions } from 'src/app/store/customer/customer.actions';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { StrapiUserActions } from 'src/app/store/strapi-user/strapi-user.actions';
import { NewsFacade } from './news.facade';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnDestroy {

  viewState$: Observable<any>;

  subscription!: Subscription;
  private readonly ngUnsubscribe = new Subject();

  constructor(
    private navigation: NavigationService,
    private auth: AppAuthService,
    private facade: NewsFacade,
    private store: Store,
  ) { }
  ionViewWillEnter() {
    this.viewState$ = this.facade.viewState$;
  }
  authBlog() {
    this.navigation.navigateFlip('/auth/login')
  }
  getStrapiUser() {
    this.store.dispatch(new StrapiUserActions.GetStrapiUser());
  }
  logoutBlog() {
    this.auth.logout();
  }
  home() {
    this.navigation.navigateForward('/home', 'back');
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
