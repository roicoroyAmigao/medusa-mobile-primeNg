import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppAuthService } from 'projects/services/src/lib/services/auth.service';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { Observable } from 'rxjs';
import { StrapiUserActions } from 'src/app/store/strapi-user/strapi-user.actions';
import { NewsFacade } from './news.facade';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage {

  viewState$: Observable<any>;

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
    this.navigation.navigateFlip('/home');
  }
}
