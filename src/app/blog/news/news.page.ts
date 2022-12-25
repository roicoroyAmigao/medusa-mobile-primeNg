import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  constructor(
    private navigation: NavigationService,
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }
  authBlog() {
    this.navigation.navigateFlip('/strapi-auth/login')
  }
  logoutBlog() {

  }
  home() {
    this.navigation.navigateForward('/home', 'back');
  }
}
