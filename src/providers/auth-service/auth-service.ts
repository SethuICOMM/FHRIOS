import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthServiceProvider {
   header:any;
   intervel:any
  apiUrl = 'http://fhrv14.formulahr.com/Services/MobileRegistration.asmx/';
  constructor(public http: HttpClient,public network:Network) {
    console.log('Hello AuthServiceProvider Provider');
   
  }
  addUser(userdata:any) {
   
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'UserRegistration',userdata,{ headers: new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8')}).subscribe(data => {
      resolve(data);}, 
      err => {
      console.log(err);
      });
      });

  }

  otpVerification(otpvalidatedata:any)
  {
    
    
    return new Promise(resolve => {
      this.http.post(window.localStorage.getItem('clientURL')+'services/AppUserRegistrationAuthentication.asmx/OTPNumberValidate',otpvalidatedata,{ headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
      resolve(data);}, 
      err => {
      console.log(err);
      });
      });
  }

  resendOTP(resendOTPdata:any)
  {
    return new Promise(resolve => {
      this.http.post(window.localStorage.getItem('clientURL')+'services/AppUserRegistrationAuthentication.asmx/ResendOTP',resendOTPdata,{ headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
      resolve(data);}, 
      err => {
      console.log(err);
      });
      });
   
  }

  updatePIN(updatepindata:any)
  {
    
    return new Promise(resolve => {
      this.http.post(window.localStorage.getItem('clientURL')+'services/AppUserRegistrationAuthentication.asmx/MobileRegistrationPinUpdateIOS',updatepindata,{ headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
      resolve(data);}, 
      err => {
      console.log(err);
      });
      });
  }

  mobileAppLoad(mobileapploaddata:any)
  {
    return new Promise(resolve => {
      this.http.post(window.localStorage.getItem('clientURL')+'services/AppUserRegistrationAuthentication.asmx/MobileAppLoad',mobileapploaddata,{ headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
      resolve(data);}, 
      err => {
      console.log(err);
      });
      });
  }

remindmelater(remindmelaterdata:any)
{
  
  return new Promise(resolve => {
    this.http.post(window.localStorage.getItem('clientURL')+'services/AppUserRegistrationAuthentication.asmx/MobileRemindMeLater',remindmelaterdata,{ headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
    resolve(data);}, 
    err => {
    console.log(err);
    });
    });
}


MobilePinNumberValidate(pinnumbervalidate:any)
{
  return new Promise(resolve => {
    this.http.post(window.localStorage.getItem('clientURL')+'services/AppUserRegistrationAuthentication.asmx/MobilePinNumberValidate',pinnumbervalidate,{ headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
    resolve(data);}, 
    err => {
    console.log(err);
    });
    });
}


HomeClick(homeclickdate:any)
{
  return new Promise(resolve => {
    this.http.post(window.localStorage.getItem('clientURL')+'services/AppUserRegistrationAuthentication.asmx/HomeClickIOS',homeclickdate,{ headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
    resolve(data);}, 
    err => {
    console.log(err);
    });
    });
}


MobilePInChangeIOS(Changepindata:any)
{
  return new Promise(resolve => {
    this.http.post(window.localStorage.getItem('clientURL')+'services/AppUserRegistrationAuthentication.asmx/MobilePInChangeIOS',Changepindata,{ headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
    resolve(data);}, 
    err => {
    console.log(err);
    });
    });
}


UnregisterIOS(unregisterdata:any)
{
  return new Promise(resolve => {
    this.http.post(window.localStorage.getItem('clientURL')+'services/AppUserRegistrationAuthentication.asmx/UnRegisterUserIOS',unregisterdata,{ headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
    resolve(data);}, 
    err => {
    console.log(err);
    });
    });
}

GetLattitudeAndLongtitueIOS(getlattitudeandlongtitueiosdata:any)
{
  return new Promise(resolve => {
    this.http.post(window.localStorage.getItem('clientURL')+'services/AppUserRegistrationAuthentication.asmx/GetLattitudeAndLongtitueIOS',getlattitudeandlongtitueiosdata,{ headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
    resolve(data);}, 
    err => {
    console.log(err);
    });
    });
}

CheckInAndCheckoutIOS(checkinandcheckoutdata:any)
{
  return new Promise(resolve => {
    this.http.post(window.localStorage.getItem('clientURL')+'services/AppUserRegistrationAuthentication.asmx/CheckInAndCheckoutIOS',checkinandcheckoutdata,{ headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
    resolve(data);}, 
    err => {
      //alert(JSON.stringify(err));
    console.log(err);
    });
    });
}

CheckInAndCheckoutImageProcessing(checkinandcheckoutimagedata:any)
{
  return new Promise(resolve => {
    this.http.post(window.localStorage.getItem('clientURL')+'services/AppUserRegistrationAuthentication.asmx/CheckInAndCheckoutImageProcessingIOS',checkinandcheckoutimagedata,{ headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
    resolve(data);}, 
    err => {
    console.log(err);
    });
    });
}


checkNetwork() {
  if (this.network.type != "none") {
      return true;
  }
  else {
      return false;
  }
}

startInterver()
  {
    this.intervel = setInterval(() => { 
      if(this.checkNetwork())
      {
        console.log(window.sessionStorage.getItem('networkstate'));
      } 
      else
      {
        
        
        clearInterval(this.intervel);
        
      }// Now the "this" still references the component
   }, 1000);
  
  }


  forgotpin(forgotpindata:any)
  {
    return new Promise(resolve => {
      this.http.post(window.localStorage.getItem('clientURL')+'services/AppUserRegistrationAuthentication.asmx/ForgetPin',forgotpindata,{ headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
      resolve(data);}, 
      err => {
      console.log(err);
      });
      });
  }


  notificationClick(notificationclickiosdata:any)
  {
    return new Promise(resolve => {
      this.http.post(window.localStorage.getItem('clientURL')+'services/AppUserRegistrationAuthentication.asmx/NotificationClickIOS',notificationclickiosdata,{ headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
      resolve(data);
    }, 
      err => {
      console.log(err);
      });
      });
  }

  CheckRegularize(checkreulrizeddata:any)
    {
      return new Promise(resolve => {
        this.http.post(window.localStorage.getItem('clientURL')+'services/AppUserRegistrationAuthentication.asmx/CheckRegularize',checkreulrizeddata,{ headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
        resolve(data);
      }, 
        err => {
        console.log(err);
        });
        });
    }

    OfficeCheckInOut()
    {
      return new Promise(resolve => {
        this.http.post(window.localStorage.getItem('clientURL')+'services/AppUserRegistrationAuthentication.asmx/OfficeInOutList','',{ headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
        resolve(data);
      }, 
        err => {
        console.log(err);
        });
        });
    }
}
