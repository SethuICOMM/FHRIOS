import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { OtpverifyPage } from '../otpverify/otpverify';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registrationForm: FormGroup;
  public type = 'password';
  public showPass = false;
  res:any;
   loading:any;
   public userdata:any;
  
  constructor(private alertCtrl: AlertController,public network: Network,private device: Device,public navCtrl: NavController,private toastCtrl: ToastController,public authservice: AuthServiceProvider,public loadingCtrl: LoadingController, public navParams: NavParams, public appVersion: AppVersion) {
    //console.log('Device model is: ' + this.device.model);
    this.registrationForm = new FormGroup({
      clientID: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
      isTosRead: new FormControl(false, [Validators.requiredTrue])
      })
  //console.log(this.registrationForm.value.clientID);
      console.log(this.registrationForm);
      this.navCtrl.swipeBackEnabled = false;
     //network

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

  showPassword() {
    this.showPass = !this.showPass;
 
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
  regForm(){
    if(this.network.type == 'none')
    {
       this.showToast('Please check your internet connection. And try again');
    }
    else
    {
      this.showLoading();
      this.userdata = {
        CompanyId:this.registrationForm.value.clientID,
        UserName:this.registrationForm.value.userName,
        Password:this.registrationForm.value.password,
        MobileNumber:this.registrationForm.value.mobile,
        RegistrationId: window.localStorage.getItem('Token'),
        VersionName:window.localStorage.getItem('buildVersion'),
        DeviceName:'iOS',
        ModalName:'iOS',
        DeviceUniqueID:this.device.uuid
      }
      
      console.log(JSON.stringify(this.userdata));
      //alert(this.registrationForm.value.clientID);
      //this.showLoading();
      //alert(JSON.stringify(this.userdata));
        this.authservice.addUser(JSON.stringify(this.userdata))
        .then(data => {
        this.res = data;
        if(this.res.d.ErrFlag == 0)
        {
         
          this.hideLoading();
          window.localStorage.setItem('isregistered','1');
          window.localStorage.setItem('clientURL',this.res.d.URL);
          this.navCtrl.push(OtpverifyPage);
        }
        else
        {
          this.hideLoading();
         this.showToast(this.res.d.ErrMessage);
        }
        //alert(JSON.stringify(this.res.d));
        console.log(JSON.stringify(this.res.d));
        });
    }
             
      
    
  }
  
OpenPolicy()
{
  window.open('http://www.formulahr.com/privacy_policy.html','_blank','location=no,closebuttoncaption=Close');
}

}
