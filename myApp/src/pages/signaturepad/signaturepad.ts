import { Component, ViewChild } from '@angular/core';
import { NavParams, ViewController, Platform } from 'ionic-angular';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

/**
 * Generated class for the SignaturepadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signaturepad',
  templateUrl: 'signaturepad.html',
})
export class SignaturepadPage {
  public val:number;
  public val1:number;
  public val2:number;
  public signatureImage:string;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 375,
    'canvasHeight': 200
  };
  constructor(public navParams: NavParams, public viewCtrl:ViewController, private screenOrientation: ScreenOrientation, private platform:Platform) {
    if (!this.platform.is('core')){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    console.log(window.innerHeight, window.innerWidth);
    this.val1 = window.innerHeight;
    this.val2 = window.innerWidth;
    this.val = this.val1 > this.val2? this.val1 : this.val2;
    this.signaturePadOptions = { // passed through to szimek/signature_pad constructor
      'minWidth': 5,
      'canvasWidth': this.val * .95,
      'canvasHeight': 200
    };
  }
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
 
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    this.signatureImage = this.signaturePad.toDataURL();
    //console.log(this.signatureImage);
    this.viewCtrl.dismiss(this.signatureImage);
  }
  drawClear(){
    this.signaturePad.clear();
  }
  drawCancel(){
    this.viewCtrl.dismiss();
  }
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
}
