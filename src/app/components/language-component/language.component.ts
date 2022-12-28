/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { IonLanguageService } from '../../shared/services/language/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IonStorageService } from '../../shared/services/ionstorage.service';
import { SAVED_LANGUAGE } from '../../shared/services/language/language.service';

@Component({
  selector: 'app-workspace-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  profile: any;
  availableLanguages: any = [];
  translations: any;
  translateSub: Subscription;
  selectedLanguage: any;
  constructor(
    public translate: TranslateService,
    public languageService: IonLanguageService,
    public alertController: AlertController,
    private storageService: IonStorageService,
    public popoverController: PopoverController,
  ) {
    // this.getTranslations();
  }
  ngOnInit(): void {
    this.availableLanguages = this.languageService.getLanguages();
  }

  ionViewWillEnter() {
    this.storageService.storageGet(SAVED_LANGUAGE).then((language) => {
      this.selectedLanguage = language;
    });
  }

  selectLanguage(item: any) {
    // console.log(item);
    this.selectedLanguage = item?.code;
    // console.log(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
    this.storageService.storageSet(SAVED_LANGUAGE, this.selectedLanguage);
    this.popoverController.dismiss();
    this.getTranslations();
  }

  getTranslations() {
    // get translations for this page to use in the Language Chooser Alert
    this.translate.getTranslation(this.translate.currentLang)
      .subscribe((translations) => {
        this.translations = translations;
      });
  }
}
