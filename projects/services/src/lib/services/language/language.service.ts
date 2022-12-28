import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Device } from '@capacitor/device';
import { LanguageModel } from './language.model';
import { IonStorageService } from '../ionstorage.service';
import { Store } from '@ngxs/store';
export const SAVED_LANGUAGE = 'saved_language';

@Injectable({
  providedIn: 'root'
})
export class IonLanguageService {
  languages: Array<LanguageModel> = new Array<LanguageModel>();

  constructor(
    public translate: TranslateService,
    private store: Store,
  ) { }

  getLanguages(): any {
    this.languages = [];
    this.languages.push(
      { name: 'English', code: 'en' },
      { name: 'Portuguese', code: 'pt' },
    );
    return this.languages;
  }

  async initTranslate() {
    const language = await Device.getLanguageCode();
    const device = await Device.getInfo();
    const getLanguageTag = await Device.getLanguageTag();
    // console.log("language", language);
    // console.log("device", device);
    // console.log("getLanguageTag", getLanguageTag);
    const deviceLanguage = await this.shortLanguage(language);
    const useLang = deviceLanguage.match(/en|pt/) ? deviceLanguage : 'en';
    if (useLang) {
      // this.store.dispatch(new LanguageActions.SetLanguage(useLang));
      const lang = this.store.selectSnapshot<any>((state) => state.language.language);
      // console.log(lang);
      if (lang && lang !== undefined) {
        await this.translate.use(lang);
        // this.store.dispatch(new LanguageActions.SetLanguage(lang));
      } else {
        await this.translate.use(useLang);
        // await this.store.dispatch(new LanguageActions.SetLanguage(useLang));
      }

    }
  }
  async shortLanguage(language: any) {
    if (language) {
      const short = language.value.split('-');
      return await short[0];
    }
  }
}
