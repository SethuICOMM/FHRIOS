import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { OtpverifyPage } from '../otpverify/otpverify';
import { UpdatepinPage } from '../updatepin/updatepin';
import { LoginPage } from '../login/login';
import { Network } from '@ionic-native/network';
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage {
  connectSubscription:any;
  disconnectSubscription:any;
  clientLogo:any;
  constructor(public navCtrl: NavController,public network:Network) {

    if(window.localStorage.getItem('clientLogo') == '')
    {
      this.clientLogo ="assets/imgs/fhr_onthegologored.png";
    }
    else
    {
      this.clientLogo = window.localStorage.getItem('clientLogo') ;
    }

    if(window.localStorage.getItem('isregistered') === '1')
    {
     if(window.localStorage.getItem('isotpverifyed') == '1')
        {
                   if(window.localStorage.getItem('ispinupdated') === '1')
                   {
                            setTimeout(() => {      
                              this.navCtrl.push(LoginPage);
                              //you can call function here
                        },5000);
                       
    
                   }
                   else{
                    setTimeout(() => {      
                      this.navCtrl.push(UpdatepinPage);
                      //you can call function here
                },5000);
              }
               
        }
        else
        {
          setTimeout(() => {      
            this.navCtrl.push(OtpverifyPage);
            //you can call function here
      },5000);
            // $timeout(function() {
            // $state.go('otp')
            // }, 3000);
        }
    }
    else
    {
          //   $timeout(function() {
    
    //     $state.go('register')
    // }, 3000);
    setTimeout(() => {      
      this.navCtrl.push(RegisterPage);
     

      //you can call function here
},5000);
    
    }
    
  }

  
  ionViewCanEnter()
  {
    
  }



}
