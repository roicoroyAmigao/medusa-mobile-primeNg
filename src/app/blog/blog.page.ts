import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {

  constructor(
    private navigation: NavigationService,
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }
  home() {
    this.navigation.navigateForward('/home', 'back');
  }
}
