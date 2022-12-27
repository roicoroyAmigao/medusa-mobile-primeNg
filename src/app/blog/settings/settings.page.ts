import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LanguageComponent } from 'src/app/components/language-component/language.component';
import { IonLanguageService } from 'src/app/shared/services/language/language.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  settingsValid: boolean | null = null;

  constructor(
    public popoverController: PopoverController,
    public languageService: IonLanguageService,
    private navigation: NavigationService,
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() { }

  async presentPopover() {
    console.log('presentPopover');
    const popover = await this.popoverController.create({
      component: LanguageComponent,
    });
    await popover.present();
    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  homePage(){
    this.navigation.navigateForward('/home', 'back');
  }
  strapiPage(){
    this.navigation.navigateFlip('/auth/profile/strapi');
  }
}
