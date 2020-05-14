import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import Crypto from 'crypto-js'; 
import { LoginPage } from '../login/login';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the UpdatepinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updatepin',
  templateUrl: 'updatepin.html',
})
export class UpdatepinPage {
  updatePINForm: FormGroup;
  loading:any;
  updatepindata:any;
  res:any;
  constructor(private alertCtrl: AlertController,public network: Network,public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController,public loadingCtrl: LoadingController,public authservice: AuthServiceProvider) {
    this.updatePINForm = new FormGroup({newpininput: new FormControl(),confirmpininput: new FormControl()});
    this.navCtrl.swipeBackEnabled = false;  
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      let toast = this.toastCtrl.create({
        message: 'Please check your internet connection. And try again',
        duration: 3000,
        position: 'bottom'
      });
  
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
  
      toast.present();
  
    });
  
  
    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      let toast = this.toastCtrl.create({
        message: 'Internet connected!',
        duration: 3000,
        position: 'bottom'
      });
  
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
  
      toast.present();
      
    });
  }


  showAlert(title:string,subtitle:string,alertcode:any)
  {
   
    if(alertcode == 1)
    {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        buttons: [
        {
          text: 'Retry',
          handler: () => {
            if(this.authservice.checkNetwork())
            {
              this.navCtrl.push(this.navCtrl.getActive().component);
            }
            else
            {
              this.showAlert("Internet not available","Cross check your internet connectivity and try again.",1);
            }
            
            // this.navCtrl.swipeBackEnabled = false;
            // this.MobileAppLoad();
          }
        }],
        enableBackdropDismiss: false // <- Here! :)
      });
  
      alert.present();
    }
    }

  showToast(message:string){
    
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  
    }

    showLoading(){
      this.loading = this.loadingCtrl.create({
       content: 'Please wait...'
     });
   
     this.loading.present();
   }
   hideLoading(){
     this.loading.dismiss();
   }

   updatePINSubmit(){
    if(this.updatePINForm.value.newpininput == null || this.updatePINForm.value.newpininput == '')
    {
   this.showToast("Please enter new pin");
    }
    else if(this.updatePINForm.value.newpininput.length != 5)
    {
      this.showToast("Pin should be 5 digit");
    }
    else if(this.updatePINForm.value.confirmpininput == null || this.updatePINForm.value.confirmpininput == '')
    {
      this.showToast("Please enter confirm pin");
    }
    else if(this.updatePINForm.value.confirmpininput.length != 5)
    {
      this.showToast("Pin should be 5 digit");
    }
    else if(this.updatePINForm.value.newpininput != this.updatePINForm.value.confirmpininput)
    {
      this.showToast("New pin and confirm pin mismatched.");
    }
    else{
    this.showLoading()
    let hash = Crypto.SHA256(this.updatePINForm.value.newpininput).toString(Crypto.enc.Hex);
    //alert(hash);
      this.updatepindata ={
        RegistrationId: window.localStorage.getItem('Token'),
        NewMobilePIN:Crypto.SHA256(this.updatePINForm.value.newpininput).toString(Crypto.enc.Hex),
        ConMobilePIN:Crypto.SHA256(this.updatePINForm.value.confirmpininput).toString(Crypto.enc.Hex)
      }
     
      //alert(JSON.stringify(this.updatepindata));
      if(this.network.type == 'none')
      {
        this.hideLoading();
      this.showToast('Please check your internet connection. And try again');
      }
      else
      {
        this.authservice.updatePIN(JSON.stringify(this.updatepindata))
          .then(data => {
          this.res =data;
          if(this.res.d.ErrFlag == 0)
          {
            // this.hideLoading();
            // this.navCtrl.push(UpdatepinPage);
            // window.localStorage.setItem('isotpverifyed','1');
            this.hideLoading();
            window.localStorage.setItem('ispinupdated','1');
            this.navCtrl.push(LoginPage);
          }
          else
          {
            this.hideLoading();
            this.showToast(this.res.d.ErrMessage);
          }
        });
    }
    }
  }

}
