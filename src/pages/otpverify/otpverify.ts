import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,AlertController } from 'ionic-angular';
import { FormGroup, FormControl,  } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UpdatepinPage } from '../updatepin/updatepin';
/**
 * Generated class for the OtpverifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otpverify',
  templateUrl: 'otpverify.html',
})
export class OtpverifyPage {
  otpForm: FormGroup;
  shouldHide: any;
  otpsubmitbtn:any;
  otpresendbtn:any;
  loading:any;
  otpvalidatedata:any;
  res:any;
  resendOTPdata:any;
  constructor(private alertCtrl: AlertController,public navCtrl: NavController,private network: Network,private toastCtrl: ToastController,public loadingCtrl: LoadingController, private elementRef: ElementRef,public navParams: NavParams,public authservice: AuthServiceProvider) {
  
this.otpForm = new FormGroup({otpinput: new FormControl()});
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpverifyPage');
  }
  ionViewDidPause(){

  }

  otpSubmit(){
    
    if(this.otpForm.value.otpinput == null || this.otpForm.value.otpinput == '')
    {
      
      this.showToast('Please enter OTP');
    }
    else{
      if(this.otpForm.value.otpinput.length == 5)
      {
        this.showLoading()
        this.otpvalidatedata = {
          RegistrationId: window.localStorage.getItem('Token'),
          OTP:this.otpForm.value.otpinput
        }
        if(this.network.type == 'none')
        {
          this.hideLoading();
        this.showToast('Please check your internet connection. And try again');
        }
        else
        {
            this.authservice.otpVerification(JSON.stringify(this.otpvalidatedata))
          .then(data => {
            this.res = data;
            if(this.res.d.ErrFlag == 0)
            {
              this.hideLoading();
              this.navCtrl.push(UpdatepinPage);
              window.localStorage.setItem('isotpverifyed','1');
            }
            else
            {
              this.hideLoading();
              this.showToast(this.res.d.ErrMessage);
            }
          
          });
        }
      }
      else{
        this.hideLoading();
        this.showToast('OTP should be 5 digit');
      }
    }
    
  }

  resendSubmit(){
    window.localStorage.setItem('isOTPexpired','0');
    this.ngOnInit();
    
    this.resendOTPdata = {
      RegistrationId: window.localStorage.getItem('Token')
    }
    if(this.network.type == 'none')
    {
      this.hideLoading();
    this.showToast('Please check your internet connection. And try again');
    }
    else
    {
        this.authservice.resendOTP(JSON.stringify(this.resendOTPdata))
      .then(data => {
        this.res = data;
        //alert(this.res);
      
      });
    }
  }
//Alert
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

  ngOnInit() {
    
    
    var callDuration = this.elementRef.nativeElement.querySelector('#time');
    if(window.localStorage.getItem('isOTPexpired') === '1')
    {
      this.shouldHide=true;
      this.otpsubmitbtn=false;
      this.otpresendbtn=true;
    }
    else
    {
      this.otpsubmitbtn=true;
      this.otpresendbtn=false;
      this.shouldHide=false;
      this.startTimer(callDuration);
    
    }
    
  }
  startTimer(display) {

    var timer = 60;
    var minutes;
    var seconds;

    let subscribetion = Observable.interval(1000).subscribe(x => {
        minutes = Math.floor(timer / 60);
        seconds = Math.floor(timer % 60);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        
        display.textContent = minutes + ":" + seconds;

        if(display.textContent == "00:00")
        {
          window.localStorage.setItem('isOTPexpired','1');
          this.shouldHide=true;
          this.otpsubmitbtn=false;
          this.otpresendbtn=true;
          subscribetion.unsubscribe();
        }
      
        --timer;
        
    })
}


}
