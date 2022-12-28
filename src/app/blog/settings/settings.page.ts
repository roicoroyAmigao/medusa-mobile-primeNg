import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import { LanguageComponent } from 'src/app/components/language-component/language.component';
import { IonLanguageService } from 'src/app/shared/services/language/language.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { ThemeService } from 'src/app/shared/services/theme-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  themeForm: FormGroup;
  settingsValid: boolean | null = null;

  constructor(
    public popoverController: PopoverController,
    public languageService: IonLanguageService,
    private navigation: NavigationService,
    private theme: ThemeService,
    private fb: FormBuilder,
  ) {
    this.themeForm = this.fb.group({
      styles: [],
    });
  }
  submitForm() {
    console.log(this.themeForm);
  }
  initTheme() {
    // this.theme.initTheme();
  }
  darkTheme() {
    this.theme.enableDark();
  }
  removeDarkTheme() {
    this.theme.removeDark();
  }
  async presentPopover() {
    // const popover = await this.popoverController.create({
    //   component: LanguageComponent,
    // });
    // await popover.present();
    // const { role } = await popover.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }
  homePage() {
    this.navigation.navigateForward('/home', 'back');
  }
  strapiPage() {
    this.navigation.navigateFlip('/auth/profile/strapi');
  }
}
