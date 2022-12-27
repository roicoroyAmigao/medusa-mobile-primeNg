import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppAuthService } from 'src/app/shared/services/auth.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
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
  ) { }
  ionViewWillEnter() {
    this.viewState$ = this.facade.viewState$;
    // this.viewState$.subscribe((state) => {
    //   console.log(state);
    // });
  }
  authBlog() {
    this.navigation.navigateFlip('/strapi-auth/login')
  }
  logoutBlog() {
    this.auth.logout();
  }
  home() {
    this.navigation.navigateForward('/home', 'back');
  }
}
