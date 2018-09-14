import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {SignaturepadPage} from '../signaturepad/signaturepad';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
/**
 * Generated class for the DevPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dev',
  templateUrl: 'dev.html'
})
export class DevPage {
  public signatureImage:string;
  somevalue:string = "bar code value"
  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public modalController:ModalController, private screenOrientation: ScreenOrientation, private platform:Platform) {
    if (!this.platform.is('core')){
      //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevPage');
  }
  DoThis(){
    console.log("Hello dev");
    this.barcodeScanner.scan().then(barcodeData => {
      this.somevalue = barcodeData.text;
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }
  OpenPad(){
    let modal = this.modalController.create(SignaturepadPage);
    modal.onDidDismiss(data => {
      if (data){
        this.signatureImage = data;
      }
      if (!this.platform.is('core')){
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        this.screenOrientation.unlock();
      }
    });
    modal.present();
  }
}
