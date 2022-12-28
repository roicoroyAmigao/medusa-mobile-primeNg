import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, PopoverController, ToastController } from '@ionic/angular';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  isLoading = false;
  currencySym = '£';
  roleMsg = '';

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public popoverController: PopoverController,
    private navigation: NavigationService
  ) { }

  async presentPopover(component: any, e: Event) {
    const popover = await this.popoverController.create({
      component,
      event: e,
    });

    await popover.present();

    const { role } = await popover.onDidDismiss();
    this.roleMsg = `Popover dismissed with role: ${role}`;
  }

  async presentLoading(content: any) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      // message: content,
      spinner: 'circles',
      // duration: 2000
    }).then(loader => {
      loader.present().then(resp => {
        // console.log('loading present :>> ');
        if (!this.isLoading) {
          loader.dismiss().then(() => { });
        }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    if (this.loadingCtrl) {
      return await this.loadingCtrl.dismiss().then(resp => {
        // console.log(' :>> Loading dismiss');
      });
    }
  }

  /* Show Toast*/
  async showToast(msg: string, position: any, duration: number) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration,
      position,
      buttons: [
        {
          text: 'ok',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });
    toast.present();
  }
  async presentAlertEnterShop(regions: any) {
    let handlerMessage = '';
    let roleMessage = '';
    // console.log('inputs', regions);
    const alert = await this.alertCtrl.create({
      header: 'Alert!',
      inputs: regions,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    roleMessage = `Dismissed with role: ${role}`;
    console.log('roleMessage::: ', roleMessage);
  }

  async presentAlert(message: any, route?: string) {
    // console.log(route);
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            if (route) {
              this.navigation.navControllerDefault(route);
            }
          },
        },
      ]
    });

    alert.present();
  }
  async presentErrorAlert(error: HttpErrorResponse) {
    const alert = await this.alertCtrl.create({
      cssClass: 'custom-alert-class',
      header: error.error?.code,
      subHeader: error?.statusText,
      message: JSON.stringify(error.error?.message),
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          },
        },
      ]
    });
    alert.present();
  }
}
