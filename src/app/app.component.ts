import { Component } from '@angular/core';
import { Platform ,AlertController,Events,ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device/';
import { SplashPage } from '../pages/splash/splash';
import { AppVersion } from '@ionic-native/app-version';
import { Network } from '@ionic-native/network';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import Crypto from 'crypto-js'; 
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SplashPage;
  pin:any;
buildversion:any;
  constructor(private keyboard: Keyboard,private toastCtrl: ToastController,public authservice: AuthServiceProvider,private push: Push,public network: Network,private alertCtrl: AlertController,platform: Platform,device:Device, statusBar: StatusBar,private appVersion: AppVersion, splashScreen: SplashScreen) {
    platform.ready().then(() => {
    // to initialize push notifications


// to initialize push notifications

const options: PushOptions = {
  android: {
    senderID: "1078039065494"
  },
  ios: {
    alert: true,
    badge: true,
    sound: true,
    fcmSandbox:true,
    clearBadge: true,
    "categories": {
    "invite": {
    "yes": {
    "callback": "app.accept", "title": "Accept", "foreground": true, "destructive": false
    },
    "no": {
    "callback": "app.reject", "title": "Reject", "foreground": true, "destructive": false
    },
    "maybe": {
    "callback": "app.maybe", "title": "Maybe", "foreground": true, "destructive": false
    }
    },
    "delete": {
    "yes": {
    "callback": "app.doDelete", "title": "Delete", "foreground": true, "destructive": true
    },
    "no": {
    "callback": "app.cancel", "title": "Cancel", "foreground": true, "destructive": false
    }
    }
    }
  },
  windows: {},
  browser: {
      pushServiceURL: ''
  }
};

const pushObject: PushObject = this.push.init(options);


pushObject.on('notification').subscribe((notification: any) => 
{console.log('Received a notification', JSON.stringify(notification))
              let notificationParam = notification.additionalData.param1;
             let checkNotifiForegrnd = notification.additionalData.foreground;
             console.log(checkNotifiForegrnd);
             window.localStorage.setItem('notificationParam', notificationParam);
             if(checkNotifiForegrnd == true){
              //clickNotification = 0;
              window.localStorage.setItem('clickNotification','0');
              if(window.localStorage.getItem('isregistered') === '1')
            {
             
              if(sessionStorage.getItem('mPin') === null)
              {
                window.localStorage.setItem('clickNotification','1');
                let toast = this.toastCtrl.create({
                  message: notification.message,
                  duration: 3000,
                  position: 'top'
                });
              
                toast.onDidDismiss(() => {
                  console.log('Dismissed toast');
                });
              
                toast.present();
              }
              else
              {
                let alert = this.alertCtrl.create({
                  title: '',
                  subTitle: notification.message,
                  buttons: [
                    {
                      text: 'Cancel',
                      handler: () => {
                       
                      }
                    },
                   {
                    text: 'View',
                    handler: () => {
                     
                     //this.showLoading();
                      //this.showLoading();
                      let res:any;
                   
                      this.pin=Crypto.SHA256(sessionStorage.getItem('mPin')).toString(Crypto.enc.Hex);
                      window.localStorage.setItem('clickNotification','0');
                  
                      let notificationclickiosdata ={
                        "RegistrationId":window.localStorage.getItem('Token'),
                        "MobilePIN":this.pin
                      }
                      this.authservice.notificationClick(JSON.stringify(notificationclickiosdata))
                      .then(data => {
                        res = data;
                        if(res.d.ErrFlag == 0)
                        {
                         // this.hideLoading();
                          let notificationWebURL = window.localStorage.getItem('clientURL')+res.d.PageName+"?SessionKey="+res.d.SessionKey+"&MobilePin="+ this.pin+"&param1="+ window.localStorage.getItem('notificationParam');
                           window.open(notificationWebURL, '_blank', 'location=yes,closebuttoncaption=Close,EnableViewPortScale=yes');
                  
                        }
                        else
                        {
                        //  this.hideLoading();
                         // this.showToast(res.d.ErrMessage);
                        }
                       
                      }).catch(error=>{
                        //this.hideLoading();
                        //this.showToast(error.toString());
                      });
                    
                    
                    
                    }
                  }],
                  enableBackdropDismiss: false // <- Here! :)
                });
            
                alert.present();
              }
            }
          }
          else
             {
              //clickNotification = 1;
              window.localStorage.setItem('clickNotification','1');
              
             }
});

pushObject.on('registration').subscribe((registration: any) => {
  //alert('Device registered'+ JSON.stringify(registration.registrationId));
  window.localStorage.setItem('Token',registration.registrationId);
    
});

pushObject.on('error').subscribe(error => 
  {
    alert('Error with Push plugin'+ JSON.stringify(error));
  });

  //alert(sessionStorage.getItem('mPin'));
      //let status bar overlay webview
      statusBar.overlaysWebView(false);
      keyboard.hideFormAccessoryBar(false);
      // set status bar to white
      statusBar.backgroundColorByHexString('#ffffff');
      splashScreen.hide();
      this.appVersion.getVersionNumber().then(version=>{
        //alert(version);
        window.localStorage.setItem('buildVersion',version);
      });
      
      
    });
  }



}

