import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage {

  constructor(
    private navigation: NavigationService,
  ) { }

  loginBlog() {
    this.navigation.navigateFlip('/strapi-auth/login')
  }
  logoutBlog() {

  }
  home() {
    this.navigation.navigateForward('/home', 'back');
  }
}
