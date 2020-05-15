import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,LoadingController,ToastController, AlertController } from 'ionic-angular';
import { elementStart } from '@angular/core/src/render3';
import { AppVersion } from '@ionic-native/app-version';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { Subscription} from 'rxjs/Subscription';
import { Network } from '@ionic-native/network';
import { OtpverifyPage } from '../otpverify/otpverify';
import Crypto from 'crypto-js'; 
import { RegisterPage } from '../register/register';
import { SafariViewController } from '@ionic-native/safari-view-controller';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

pin:string="";
displaypin:string=""
loading:any;
res:any;
mobileapploaddata:any;
size1:any=0;
size2:any=0;
remindmelaterdata:any;
validatepindata:any;
connectSubscription:any
disconnectSubscription:any
  intervel:any;
  data:any;
  constructor(private safariViewController: SafariViewController,public network: Network,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,private toastCtrl: ToastController,private alertCtrl: AlertController, public modalcontroller: ModalController,private appVersion: AppVersion,public authservice: AuthServiceProvider) {
 
  //this.showAlert();
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
    this.MobileAppLoad();
  
  
  }

  
  //Showing alert popup
  showAlert(title:string,subtitle:string,alertcode:Number)
  {
    if(alertcode == 2)
    {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        buttons: [{
          text: 'Remind me later',
          
          handler: () => {
            this.RemindMeLater();
          }
        },
        {
          text: 'Update',
          handler: () => {
            this.safariViewController.isAvailable()
  .then((available: boolean) => {
      if (available) {

        this.safariViewController.show({
          url: 'itms-apps://itunes.apple.com/in/app/formulahr-mobile/id1206429350?mt=8',
          hidden: false,
          animated: false,
          transition: 'curl',
          enterReaderModeIfAvailable: true,
          tintColor: '#ff0000'
        })
        .subscribe((result: any) => {
            if(result.event === 'opened') console.log('Opened');
            else if(result.event === 'loaded') console.log('Loaded');
            else if(result.event === 'closed') console.log('Closed');
          },
          (error: any) => console.error(error)
        );

      } else {
        console.log("================2");
        // use fallback browser, example InAppBrowser
      }
    }
  );
           // window1.open('itms-apps://itunes.apple.com/in/app/formulahr-mobile/id1206429350?mt=8', '_blank', 'location=no,closebuttoncaption=Close');
  
            this.MobileAppLoad();
          }
        }],
        enableBackdropDismiss: false // <- Here! :)
      });
  
      alert.present();
    }

    if(alertcode == 3)
    {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        buttons: [
        {
          text: 'Update',
          handler: () => {
            this.safariViewController.isAvailable()
  .then((available: boolean) => {
      if (available) {

        this.safariViewController.show({
          url: 'itms-apps://itunes.apple.com/in/app/formulahr-mobile/id1206429350?mt=8',
          hidden: false,
          animated: false,
          transition: 'curl',
          enterReaderModeIfAvailable: true,
          tintColor: '#ff0000'
        })
        .subscribe((result: any) => {
            if(result.event === 'opened') console.log('Opened');
            else if(result.event === 'loaded') console.log('Loaded');
            else if(result.event === 'closed') console.log('Closed');
          },
          (error: any) => console.error(error)
        );

      } else {
        console.log("================2");
        // use fallback browser, example InAppBrowser
      }
    }
  );
            
            //window1.open('itms-apps://itunes.apple.com/in/app/formulahr-mobile/id1206429350?mt=8', '_blank', 'location=no,closebuttoncaption=Close');
           
            this.MobileAppLoad();
          }
        }],
        enableBackdropDismiss: false // <- Here! :)
      });
  
      alert.present();
    }

    if(alertcode == 4)
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
              this.showAlert("Internet not available","Cross check your internet connectivity and try again.",4);
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


  //showing Toast
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


    //show loading
    showLoading(){
      this.loading = this.loadingCtrl.create({
       content: 'Please wait...'
     });
   
     this.loading.present();
   }

   //hide loading
   hideLoading(){
     this.loading.dismiss();
   }

   //MobileAppLoad webservice call
   MobileAppLoad()
   {
    this.showLoading();
    this.mobileapploaddata={
        "RegistrationId": window.localStorage.getItem('Token'),
        "VersionName":window.localStorage.getItem('buildVersion'),
        "Size1":"0",
        "Size2":"0"
    }

    console.log(this.mobileapploaddata);
    if(this.network.type == 'none')
    {
      this.hideLoading();
     this.showToast('Please check your internet connection. And try again');
    }
    else
    {
    //alert(JSON.stringify(this.mobileapploaddata));
    this.authservice.mobileAppLoad(this.mobileapploaddata)
    .then(data => {
      this.res = data;
     console.log(JSON.stringify(this.res.d));
     if(this.res.d.ErrFlag == 1)
     {
      this.hideLoading();
      this.showToast(this.res.d.ErrMessage);
     }
     else if(this.res.d.ErrFlag == 2)
     {
       this.hideLoading();
      this.showAlert("","Upgrade now and enjoy the best version yet!",2);
     }
     else if(this.res.d.ErrFlag == 3)
     {
       this.hideLoading();
       this.showAlert("","Upgrade now and enjoy the best version yet!",3);
     }
     else
     {
      this.hideLoading();
      window.localStorage.setItem('homeButName',this.res.d.Home);
     
      window.localStorage.setItem('clientLogo',"data:image/png;base64,"+ this.res.d.FHRONTHEGO_IOS);
      
   //window.localStorage.setItem(('BGlogo',"data:image/png;base64,"+ this.res.d.FHRBG);
   
     }

    });
  }
    
   }


   //Remind me later function
   RemindMeLater()
   {
     this.showLoading();
this.remindmelaterdata={
  "RegistrationId": window.localStorage.getItem('Token'),
  "VersionName":window.localStorage.getItem('buildVersion')
}
if(this.network.type == 'none')
{
  this.hideLoading();
 this.showToast('Please check your internet connection. And try again');
}
else
{
    this.authservice.remindmelater(JSON.stringify(this.remindmelaterdata))
    .then(data => {
      this.res = data;
      if(this.res.d.ErrFlag == 0)
      {
        this.hideLoading();
      }
      else
      {
        this.hideLoading();
        this.MobileAppLoad();
        
       
      }
                                                       	                
    });
  }
   }

  //Pin verification button click 
  pinverify()
  {
     
  if(this.pin.length != 5)
  {
    if(this.pin.length == 0)
    {
      this.showToast("Please enter your PIN")
    }
    else
    {
      this.showToast("PIN should be 5 digit");
    }
  }
  else 
  {
    
    this.showLoading();
    this.validatepindata={
      "RegistrationId": window.localStorage.getItem('Token'),
      "MobilePIN":this.pin
    }
    if(this.network.type == 'none')
{
  this.hideLoading();
 this.showToast('Please check your internet connection. And try again');
}
else
{
    this.authservice.MobilePinNumberValidate(JSON.stringify(this.validatepindata))
    .then(data => {
      this.res = data;
      console.log(JSON.stringify(this.res));
      if(this.res.d.ErrFlag == 0)
      {
      
        this.hideLoading();
        console.log(JSON.stringify(this.res));
        sessionStorage.setItem('ispinavailable','1');
        sessionStorage.setItem('mPin',this.pin);
        this.navCtrl.push(HomePage,{"JsonData":this.res.d});
        if( window.localStorage.getItem('clickNotification') == '1'){
          this.notifyClick()
          }
        
      }
      else
      {
        this.hideLoading();
        this.displaypin="";
        this.pin="";
        this.showToast(this.res.d.ErrMessage+" Your Attempt is "+this.res.d.MobilePINWrongAttemptsCount+" of "+this.res.d.PwdLockMaxTry)
      }
      
    });
  }
  
}
  }

  //Numbers button click
  handleinput(pin: string)
  {
    
    if(pin ==='clear')
    {
      this.pin=this.pin.substring(0, this.pin.length-1);
      this.displaypin=this.displaypin.substring(0, this.displaypin.length-1);
      return;
    }

    if(this.pin.length === 5)
    {
 return;
    }
    
    this.displaypin=this.displaypin+"*";
    this.pin+=pin;
   
  }
  
  
  
  

//presentPrompt
ForgotpinPrompt() {
  let alert = this.alertCtrl.create({
    title: 'Enter your Mobile number',
    inputs: [
      {
        name: 'Mobile',
        placeholder: 'Mobile',
        type: 'number'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          //console.log('Cancel clicked');
        }
      },
      {
        text: 'Verify',
        handler: data => {
          this.data = data;
          if(data.Mobile == null || data.Mobile == '')
          {
         this.showToast("Please enter Mobile Number");
         return false;
          }
          else if(data.Mobile.length != 10)
          {
            this.showToast("Mobile number should be 10 digit");
            
          }

          else
          {
            this.showLoading();
           
            let forgotpindata ={
              "RegistrationID":window.localStorage.getItem('Token'),
                "MobileNumber":data.Mobile
            }
            console.log(JSON.stringify(forgotpindata));
            if(this.network.type == 'none')
{
  this.hideLoading();
 this.showToast('Please check your internet connection. And try again');
}
else
{
            this.authservice.forgotpin(JSON.stringify(forgotpindata))
            .then(data => {
              this.res = data;
              this.hideLoading();
              if(this.res.d.ErrFlag == 0)
              {
               
                  window.localStorage.setItem('isotpverifyed','0'); 
                  window.localStorage.setItem('ispinupdated','0');
                  window.localStorage.setItem('isOTPexpired','0');
                  this.navCtrl.push(OtpverifyPage);
                
                
                // sessionStorage.setItem('mPin',this.data.NewPin);
                // this.showToast("Successfully Pin changed.");
               
              //this.showToast(JSON.stringify(res));
              return true;
              }
              else
              {
                this.showToast(this.res.d.ErrMessage);
              }
            });
             
          }
          }
        }
      }
    ],
    enableBackdropDismiss: false // <- Here! :)
  });
  alert.present();
}

  Forgotpin()
  {
      this.ForgotpinPrompt();
  }



  notifyClick()
  {
    this.showLoading();
      let res:any;
    
    this.pin=Crypto.SHA256(sessionStorage.getItem('mPin')).toString(Crypto.enc.Hex);
    window.localStorage.setItem('clickNotification','0');

    let notificationclickiosdata ={
      "RegistrationId":window.localStorage.getItem('Token'),
      "MobilePIN":this.pin
    }
    if(this.network.type == 'none')
{
  this.hideLoading();
 this.showToast('Please check your internet connection. And try again');
}
else
{
    this.authservice.notificationClick(JSON.stringify(notificationclickiosdata))
    .then(data => {
      res = data;
      if(res.d.ErrFlag == 0)
      {
        this.hideLoading();
        let notificationWebURL = window.localStorage.getItem('clientURL')+res.d.PageName+"?SessionKey="+res.d.SessionKey+"&MobilePin="+ this.pin+"&param1="+ window.localStorage.getItem('notificationParam');
        this.safariViewController.isAvailable()
        .then((available: boolean) => {
            if (available) {
      
              this.safariViewController.show({
                url: notificationWebURL,
                hidden: false,
                animated: false,
                transition: 'curl',
                enterReaderModeIfAvailable: true,
                tintColor: '#ff0000'
              })
              .subscribe((result: any) => {
                  if(result.event === 'opened') console.log('Opened');
                  else if(result.event === 'loaded') console.log('Loaded');
                  else if(result.event === 'closed') console.log('Closed');
                },
                (error: any) => console.error(error)
              );
      
            } else {
              console.log("================2");
              // use fallback browser, example InAppBrowser
            }
          }
        );
        //  window1.open(notificationWebURL, '_blank', 'location=yes,closebuttoncaption=Close,EnableViewPortScale=yes');

      }
      else
      {
        this.hideLoading();
        this.showToast(res.d.ErrMessage);
      }
     
    }).catch(error=>{
      this.hideLoading();
      this.showToast(error.toString());
    });
  }
    
  }

  UnregisteriOS()
  {
    this.showLoading();
            let res:any;
            let unregisterdata ={
              "RegistrationId":window.localStorage.getItem('Token'),
              "MobilePIN":Crypto.SHA256(window.sessionStorage.getItem('mPin')).toString(Crypto.enc.Hex)
            }
            if(this.network.type == 'none')
{
  this.hideLoading();
 this.showToast('Please check your internet connection. And try again');
}
else
{
            this.authservice.UnregisterIOS(JSON.stringify(unregisterdata))
            .then(data => {
              res = data;
              if(res.d.ErrFlag==0)
              {
                this.hideLoading();
                sessionStorage.setItem('ispinavailable','0');                                                              
                sessionStorage.setItem('mPin',"");
                window.localStorage.setItem('isOTPexpired','0');
                window.localStorage.setItem('isregistered','0');
                window.localStorage.setItem('isotpverifyed','0');
                window.localStorage.setItem('ispinupdated','0');
                sessionStorage.setItem('isunregister','0');
                this.navCtrl.push(RegisterPage);
                //$state.go('register')
              }
              else
              {
                this.hideLoading();
                this.showToast(res.d.ErrMessage);
              }
            });
          }
  }
}
