import { Component } from '@angular/core';
import { NavController,NavParams,LoadingController,ToastController, AlertController,Platform } from 'ionic-angular';
import Crypto from 'crypto-js'; 
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RegisterPage } from '../register/register';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import { getParentInjectorLocation } from '@angular/core/src/render3/di';
import { Globalization } from '@ionic-native/globalization';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Network } from '@ionic-native/network';
import { LoginPage } from '../login/login';

import { NativeGeocoder,NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
logindata:any;
Name:string="";
PFP:any;
AmsSwipeData:any;
IsCheckIn:any; 
IsCheckOut:any; 
Radious:any; 
Premises : any;
IsEnableGPS:any; 
IsEnableGetAddressBtn:any;
clientLogo:any;
loading:any;
SessionKey:any;
PageName:any;
CheckInAddress:string='';
CheckOutAddress:string='';
Photo:any;
CheckinDisabled:any;
CheckoutDisabled:any;
checkin_hide:any;
checkout_hide:any;
CheckInTime:string="";
CheckOutTime:string="";
pin:any;
data:any;
browser:any;
checkinstate:any;
curlatitude:any;
curlongitude:any;
       //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  curAddress:string='';
  TimeZoneOffset:string="";

  constructor(public network: Network,private camera: Camera,private globalization: Globalization,private nativeGeocoder: NativeGeocoder,private geolocation: Geolocation,public platform: Platform,private diagnostic: Diagnostic,public navCtrl: NavController,public navParams: NavParams,public loadingCtrl: LoadingController,private toastCtrl: ToastController,private alertCtrl: AlertController,public authservice: AuthServiceProvider) {
    this.logindata=navParams.get("JsonData");
    this.Name = this.logindata.Name;
    this.Premises = 0;
    
    //alert(JSON.stringify(this.logindata));
    if(this.logindata.PFN == '')
    {
      this.PFP ='assets/imgs/user.png';
    }
    else
    {
      this.PFP = 'data:image/JPEG;base64,'+this.logindata.PFN;
    }
   
    if(window.localStorage.getItem('clientLogo') == '')
    {
      this.clientLogo ="assets/imgs/fhr_onthegologored.png";
    }
    else
    {
      //alert(window.localStorage.getItem('clientLogo'));
      this.clientLogo = window.localStorage.getItem('clientLogo') ;
    }
    
    this.navCtrl.swipeBackEnabled = false;
    //alert(this.PFP);
    this.LoadPinValidate();
    this.getTimezone();
    
  }

  ExitApp()
  {
    this.platform.ready().then(() => {
      this.platform.exitApp();
    });
    
  }
  

  Checkin()
  {
   

   this.showLoading();
   
     if(this.logindata.Radious == true)
    {
      
      this.hideLoading();
      this.diagnostic.isLocationAuthorized().then(enabled=>{
       
        if(enabled == false)
        {
         
          this.diagnostic.getLocationAuthorizationStatus().then(status=>{
            alert("status "+status);
            if(status=="denied")
            {
              this.diagnostic.requestLocationAuthorization();
            }
            if(status == "not_determined")
               {
                this.diagnostic.requestLocationAuthorization();
               }
          });
        }
        else
        {
          this.RadiousBaseCheckin();
         
        }
      });
      
    }
    else
    {
      
      if(this.logindata.EnableGPS == true )
      {
        if(this.logindata.OfficeInOutFlag == true)
        {
          
          this.hideLoading();
          this.getAddress();
          
          this.CheckRegularize();
        }
        else
        {
          this.hideLoading();
          this.diagnostic.isLocationAuthorized().then(enabled=>{
         
            if(enabled == false)
            {
             
              this.diagnostic.getLocationAuthorizationStatus().then(status=>{
                //alert("status "+status);
                if(status=="denied")
                {
                  this.diagnostic.requestLocationAuthorization();
                }
                if(status == "not_determined")
                   {
                    this.diagnostic.requestLocationAuthorization();
                   }
              });
            }
            else
            {
              this.geolocation.getCurrentPosition().then((resp) => {
                this.curlatitude = resp.coords.latitude;
                this.curlongitude = resp.coords.longitude;
                this.getGeoencoder(this.curlatitude,this.curlongitude);
            
                this.CheckCapturePhoto();
                
           }).catch((error) => {
            alert('Error getting location'+ error);
           });
             
            }
          });
         
         
          
          
        }
       

      }
      else
      {
        this.hideLoading();
        if(this.CheckInTime == "")
        {
          this.checkinstate = 'I';
        }
        else
        {
          this.checkinstate = 'O';
        }
        
        this.curlatitude = 0;
        this.curlongitude = 0;
        
       this.TimeZoneOffset ='0';
        this.Premises =0;
        this.curAddress = null;

        this.CheckInCheckOutWS();
      }
     
    }
  
    

  }
  CheckRegularize() {
    this.showLoading();
    let res:any;
    let checkreulrizeddata ={
      "RegistrationId":window.localStorage.getItem('Token')
    }
      if(this.network.type == 'none')
      {
        this.hideLoading();
        this.showToast('Please check your internet connection. And try again');
      }
      else
      {
        this.authservice.CheckRegularize(JSON.stringify(checkreulrizeddata))
        .then(data => {
          res = data;
          //alert(res.d.ErrFlag);
          if(res.d.ErrFlag==0)
          {
            this.hideLoading();
            this.getAddress();
            this.OfficeInOutWS();
          }
          else{
            this.hideLoading();
            this.showToast(res.d.ErrMessage);
          }
        });
      }
  }
  OfficeInOutWS() {
    this.showLoading();
    let res:any;
    let PremisesData = new Array(); 

    if(this.network.type == 'none')
    {
        this.hideLoading();
        this.showToast('Please check your internet connection. And try again');
    }
    else
    {
      this.authservice.OfficeCheckInOut()
      .then(data => {
        res = data;
        
        for (let i = 0; i < res.d.length; i++) {
          PremisesData.push({type:'radio',label:res.d[i]["OfficeInOutName"],value:res.d[i]["OfficeInOutCode"]});
        
        }
        //alert(PremisesData);
          this.hideLoading();
        
          
          let prompt = this.alertCtrl.create({
            title: 'Choose your Permises',
            inputs : PremisesData,
            buttons : [
            {
                text: "OK",
                handler: data => {
                this.Premises = data;
                //alert(this.Premises);
                if(this.Premises == undefined)
                {
                  this.showToast("Kindly choose any one option.")
                }
                else
                {
                  this.showLoading();
                  this.getAddress();
                  this.CheckCapturePhoto();
                }
                }
            }]});
            prompt.present();
      
      });
    }
  }

  //Check Photo Flag Enabled
  CheckCapturePhoto() {
    if(this.logindata.Photo == true)
          {
            this.hideLoading();
            this.diagnostic.isCameraAuthorized().then(enabled=>{
             
              if(enabled == false)
              {
               
                this.diagnostic.getCameraAuthorizationStatus().then(status=>{
                  
                  if(status=="denied")
                  {
                    this.diagnostic.requestCameraAuthorization();
                  }
                  if(status == "not_determined")
                     {
                      this.diagnostic.requestCameraAuthorization();
                     }
                });
              }
              else
              {
                this.capturePhoto();
               
              }
            });
           
          }
          else
          {
            this.hideLoading();
        this.diagnostic.isLocationAuthorized().then(enabled=>{
         
          if(enabled == false)
          {
           
            this.diagnostic.getLocationAuthorizationStatus().then(status=>{
              //alert("status "+status);
              if(status=="denied")
              {
                this.diagnostic.requestLocationAuthorization();
              }
              if(status == "not_determined")
                 {
                  this.diagnostic.requestLocationAuthorization();
                 }
            });
          }
          else
          {
            this.GPSBaseCheckin();
           
          }
        });
          }
  }

  //Showing alert popup
  showAlert(title:string,subtitle:string,alertcode:any)
  {
   
    if(alertcode == 1)
    {

    
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
             
            }
          },
         {
          text: 'OK',
          handler: () => {
            // sessionStorage.setItem('isunregister','1');
            // this.navCtrl.push(LoginPage);
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
        }],
        enableBackdropDismiss: false // <- Here! :)
      });
  
      alert.present();
    }
    else
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
              this.showAlert("Internet not available","Cross check your internet connectivity and try again.",2);
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

  //presentPrompt
    ChangepinPrompt() {
      let alert = this.alertCtrl.create({
        title: 'Are you sure want change your pin number?',
        inputs: [
          {
            name: 'OldPin',
            placeholder: 'OldPin',
            type: 'number'
          },
          {
            name: 'NewPin',
            placeholder: 'NewPin',
            type: 'number'
          },
          {
            name: 'ConfirmPin',
            placeholder: 'ConfirmPin',
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
            text: 'Change',
            handler: data => {
              this.data = data;
              if(data.OldPin == null || data.OldPin == '')
              {
             this.showToast("Please enter old pin");
             return false;
              }
              else if(data.OldPin.length != 5)
              {
                this.showToast("Pin should be 5 digit");
                
              }
              else if(data.NewPin == null || data.NewPin == '')
              {
                
                this.showToast("Please enter new pin");
                return false;
              }
              else if(data.NewPin.length != 5)
              {
               
                this.showToast("Pin should be 5 digit");
                return false;
              }
              else if(data.ConfirmPin == null || data.ConfirmPin == '')
              {
                
                this.showToast("Please enter new pin");
                return false;
              }
              else if(data.ConfirmPin.length != 5)
              {
                
                this.showToast("Pin should be 5 digit");
                return false;
              } 
              else if( data.NewPin != data.ConfirmPin)
              {
                
                this.showToast("New pin and confirm pin mismatched.");
                return false;
              }
              
              else
              {
                this.showLoading();
                let oldpin:any;
                let newpin:any;
                let confirmpin:any;
                let res:any;

                oldpin = Crypto.SHA256(data.OldPin).toString(Crypto.enc.Hex);
                newpin = Crypto.SHA256(data.NewPin).toString(Crypto.enc.Hex);
                confirmpin = Crypto.SHA256(data.ConfirmPin).toString(Crypto.enc.Hex);
                let changepindata ={
                  "RegistrationId":window.localStorage.getItem('Token'),
                    "OldMobilePIN":oldpin,
                    "NewMobilePIN":newpin,
                    "ConMobilePIN":confirmpin
                }
                if(this.network.type == 'none')
                {
                  this.hideLoading();
                  this.showToast('Please check your internet connection. And try again');
                }
                else
                {
                    this.authservice.MobilePInChangeIOS(JSON.stringify(changepindata))
                    .then(data => {
                      res = data;
                      this.hideLoading();
                      if(res.d.ErrFlag == 0)
                      {
                        sessionStorage.setItem('mPin',this.data.NewPin);
                        this.showToast("Successfully Pin changed.");
                      }
                      else
                      {
                        this.showToast(res.d.ErrMessage);
                      }
                      //this.showToast(JSON.stringify(res));
                      return true;
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

  LoadPinValidate()
  {
     //this.showLoading();
     if(this.logindata.ErrFlag==0)
     {
        if(this.logindata.AmsSwipeData==false)
        {
          if(this.logindata.IsCheckIn == false && this.logindata.IsCheckOut == false)
          {
          
             this.checkin_hide=true;
             this.CheckinDisabled=true;

          }
          else if(this.logindata.IsCheckIn == true && this.logindata.IsCheckOut == false)
          {
            this.checkin_hide=true;
             this.CheckinDisabled=false;
             this.CheckInTime = this.logindata.CheckIn;
             this.CheckInAddress = this.logindata.CheckInAddress;
             this.checkout_hide=true;
             this.CheckoutDisabled=true;
          }
          else if(this.logindata.IsCheckIn == true && this.logindata.IsCheckOut == true){
            this.checkin_hide=true;
            this.CheckinDisabled=false;
            this.CheckInTime =this.logindata.CheckIn;
            this.CheckInAddress = this.logindata.CheckInAddress;
            this.checkout_hide=true;
            this.CheckoutDisabled=false;
            this.CheckOutTime=this.logindata.CheckOut;
            this.CheckOutAddress = this.logindata.CheckOutAddress;
          }
        }
        else
        {
          this.checkin_hide=false;
            this.CheckinDisabled=false;
            this.CheckInTime ="";
            this.CheckInAddress ="";
            this.checkout_hide=false;
            this.CheckoutDisabled=false;
            this.CheckOutTime="";
            this.CheckOutAddress="";
        }
     }
  }


  //HomeClick
  homeclick()
  {
    if( window.localStorage.getItem('clickNotification') == '1'){
      this.notifyClick()
      }
      else
      {

     
    this.showLoading();
    let res:any;
    this.pin=Crypto.SHA256(sessionStorage.getItem('mPin')).toString(Crypto.enc.Hex);
    let mobileapploaddata ={
      "RegistrationId":window.localStorage.getItem('Token'),
        "MobilePIN":this.pin,
    }
    
      if(this.network.type == 'none')
      {
        this.hideLoading();
        this.showToast('Please check your internet connection. And try again');
      }
      else
      {
          //alert(this.pin);
          this.authservice.HomeClick(JSON.stringify(mobileapploaddata))
          .then(data => {
            res = data;
            //{"d":{"__type":"MobileHome","SessionKey":"fc8846f9-198a-4a12-b96d-6178cc1bb48f","PageName":"MobileAppLogin.aspx","ErrFlag":0,"ErrMessage":"","PwdLockMaxTry":5,"MobilePINWrongAttemptsCount":0}}
            //alert(res.d.ErrFlag);
            if(res.d.ErrFlag==0)
            {
              this.hideLoading();
              let mainURL = window.localStorage.getItem('clientURL')+res.d.PageName+"?SessionKey="+res.d.SessionKey+"&MobilePin="+this.pin;
              window.open(mainURL, '_blank', 'location=no,closebuttoncaption=Close');
            //   let target : string = '_self',
            //     opts   : string = 'clearcache=yes,clearsessioncache=yes,toolbar=yes,location=yes';

            // this.iab.create(mainURL, target, opts);
            }
            else{
              this.hideLoading();
              this.showToast(res.d.ErrMessage);
            }
          });
      }
  }
  }


  //ChangePin
  ChangePin()
  {
    this.ChangepinPrompt();
  }

  //Unregister App
  Unregister()
  {

    this.showAlert("App Unregister","Are you sure want remove your account register?",1);
  }



 //GPS base Checkin checkout function
 GPSBaseCheckin()
 {
  if(this.CheckInTime == "")
        {
          this.checkinstate = 'I';
        }
        else
        {
          this.checkinstate = 'O';
        }
   
    this.geolocation.getCurrentPosition().then((resp) => {
    this.curlatitude = resp.coords.latitude;
    this.curlongitude = resp.coords.longitude;
    console.log(this.curlatitude ,this.curlongitude);
    this.getTimezone();
    this.getGeoencoder(this.curlatitude,this.curlongitude);
    
   
      this.AddressPopup();
    
   
}).catch((error) => {
alert('Error getting location'+ error);
});
 }



  //Radious base checkin checkout function
  RadiousBaseCheckin()
  {
    
    if(this.CheckInTime == "")
    {
      this.checkinstate = 'I';
    }
    else
    {
      this.checkinstate = 'O';
    }
         
          this.geolocation.getCurrentPosition().then((resp) => {
          this.curlatitude = resp.coords.latitude;
          this.curlongitude = resp.coords.longitude;
          console.log(this.curlatitude ,this.curlongitude);
          this.getGeoencoder(this.curlatitude,this.curlongitude);
          
          if(this.curAddress != "")
          {
            this.GetLat_GetLon();
          }
          else{
            this.showToast("Unable to find the address please try again.")
          }
         
         
     }).catch((error) => {
      alert('Error getting location'+ error);
     });
          
  }
  getAddress(){
    this.getLocation();
    this.getGeoencoder(this.curlatitude,this.curlongitude);
  }
  getLocation()
  {
    this.diagnostic.isLocationAuthorized().then(enabled=>{
         
      if(enabled == false)
      {
       
        this.diagnostic.getLocationAuthorizationStatus().then(status=>{
          //alert("status "+status);
          if(status=="denied")
          {
            this.diagnostic.requestLocationAuthorization();
          }
          if(status == "not_determined")
             {
              this.diagnostic.requestLocationAuthorization();
             }
        });
      }
      else
      {
        this.geolocation.getCurrentPosition().then((resp) => {
          this.curlatitude = resp.coords.latitude;
          this.curlongitude = resp.coords.longitude;
         
          
     }).catch((error) => {
      alert('Error getting location'+ error);
     });
       
      }
    });
    
     
  }
  

  //Get Target coords
  GetLat_GetLon()
  {
    this.showLoading();
    let res:any;
    
    //alert(this.curAddress);
   
    this.pin=Crypto.SHA256(sessionStorage.getItem('mPin')).toString(Crypto.enc.Hex);
    
    let getlattitudeandlongtitueiosdata ={
        "RegistrationId":window.localStorage.getItem('Token'),
        "MobilePIN":this.pin,
        "CheckInOrOut":this.checkinstate,
        "Lattitude":this.curlatitude,
        "Longtitue":this.curlongitude,
        "Address":this.curAddress
    }
   console.log(JSON.stringify(getlattitudeandlongtitueiosdata));
      if(this.network.type == 'none')
      {
        this.hideLoading();
        this.showToast('Please check your internet connection. And try again');
      }
      else
      {
        this.authservice.GetLattitudeAndLongtitueIOS(JSON.stringify(getlattitudeandlongtitueiosdata))
        .then(data => {
          res = data;
          this.hideLoading();
          //alert(JSON.stringify(res.d));
          if(res.d.ErrFlag == 0)
          {
            if(this.calculateDistance(this.curlatitude,this.curlongitude,res.d.Lattitude,res.d.Longtitue) < res.d.Distance)
            {
              this.CheckInCheckOutWS();
            }
            else
            {
              this.showToast("You are in out of location");
            }
          }
          else
          {
            this.showToast(res.d.ErrMessage);
          }
          
        
        });
    }
  }


  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude:any,longitude:any){
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
  .then((result: NativeGeocoderReverseResult[]) => {
    this.curAddress=this.generateAddress(result[0]).toString();
    //alert(this.curAddress);
  })
  .catch((error: any) => console.log(error));
 
  }

  //Return Comma saperated address
  generateAddress(addressObj){
      let obj = [];
       let address:string='';
       console.log(JSON.stringify(addressObj));
       obj.push(addressObj['subThoroughfare']);
       obj.push(addressObj['thoroughfare']);
       obj.push(addressObj['subLocality']);
       obj.push(addressObj['locality']);
       obj.push(addressObj['postalCode']);
       obj.push(addressObj['administrativeArea']);
       obj.push(addressObj['countryName']);
      // for (let key in addressObj) {
      //   if(key!='latitude' && key!='longitude')
      //   {
      //     if(key == 'subThoroughfare' || key =='thoroughfare' || key=='subLocalityValue' || key=='locality' || key=='postalCode' || key=='administrativeArea' || key=='countryName')
      //     {
      //       obj.push(addressObj[key]);
      //       console.log("key"+key+"Value"+addressObj[key]);
      //     }
          
      //     //obj.push(addressObj[key]);
      //   }
       
      // }
      //obj.reverse();
      for (let val in obj) {
        //if(obj[val].length)
        address += obj[val]+', ';
      }
    return address.slice(0, -2);
  }
 

  


  calculateDistance(lat1:any, lon1:any, lat2:any, lon2:any) 
    {
      let R = 6371; // km
      let dLat = this.toRad(lat2-lat1);
      let dLon = this.toRad(lon2-lon1);
      lat1 = this.toRad(lat1);
      lat2 = this.toRad(lat2);

      let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return Math.floor(d*1000);
    }

    // Converts numeric degrees to radians
    toRad(Value:any) 
    {
        return Value * Math.PI / 180;
    }


    getTimezone()
    {
      this.globalization.getDatePattern( { formatLength: 'long', selector: 'date and time'})
  .then(res => {
    console.log(res)
    this.TimeZoneOffset = res.utc_offset.toString();
    console.log('Timwzone'+this.TimeZoneOffset);
  })
  .catch(e => {console.log(e)
  });
    }


    //checkin checkout webmethod calling
    CheckInCheckOutWS()
    {
      this.showLoading();
    let res:any;
    this.pin=Crypto.SHA256(sessionStorage.getItem('mPin')).toString(Crypto.enc.Hex);
   
    let checkinandcheckoutdata ={
        "RegistrationId":window.localStorage.getItem('Token'),
        "MobilePIN":this.pin,
        "CheckInOrOut":this.checkinstate,
        "Lattitude":this.curlatitude,
        "Longtitue":this.curlongitude,
        "Address":this.curAddress,
        "TimeZone":this.TimeZoneOffset,
        "OfficeInOutCode":this.Premises
    }
    //alert(JSON.stringify(checkinandcheckoutdata));
      if(this.network.type == 'none')
      {
        this.hideLoading();
        this.showToast('Please check your internet connection. And try again');
      }
      else
      {
        this.authservice.CheckInAndCheckoutIOS(JSON.stringify(checkinandcheckoutdata))
        .then(data => {
          res = data;
     //alert(JSON.stringify(res));
          if(res.d.ErrFlag == 0)
          {
            //alert("0");
           
            if(this.CheckInTime == "")
            {
              this.hideLoading();
              this.CheckInTime = res.d.CheckedTime;
              this.CheckInAddress = res.d.CheckedAddress;
              this.checkin_hide=true;
              this.CheckinDisabled=false;
              this.checkout_hide=true;
              this.CheckoutDisabled=true;
              
              
            }
            else
            {
              this.hideLoading();
              this.CheckOutTime=res.d.CheckedTime;
              this.CheckOutAddress = res.d.CheckedAddress;
              this.checkin_hide=true;
              this.CheckinDisabled=false;
              this.checkout_hide=true;
              this.CheckoutDisabled=false;
            
            
              
            }
          
          }
          else
          {
            //alert("1");
            this.hideLoading();
              this.showToast(res.d.ErrMessage);
          }
        });

    }
    }

    

    //Capture Image
    capturePhoto()
    {
     
      this.showLoading();
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      
      if(this.CheckInTime == "")
      {
        this.checkinstate = 'I';
      }
      else
      {
        this.checkinstate = 'O';
      }
        
          
            this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
       
            //Call Checkin image process
            this.hideLoading();
            this.getAddress();
            this.CheckinImageWS(imageData);
 
          }, (err) => {
          // Handle 
          this.hideLoading();
          });
          
    }
   
   
    CheckinImageWS(imageData:any)
    {
     this.showLoading();
      let res:any;
    
      this.pin=Crypto.SHA256(sessionStorage.getItem('mPin')).toString(Crypto.enc.Hex);
      
      let checkinandcheckoutimagedata ={
          "RegistrationId":window.localStorage.getItem('Token'),
          "MobilePIN":this.pin,
          "CheckInOrOut":this.checkinstate,
          "Data":imageData
          
      }
     
      if(this.network.type == 'none')
      {
        this.hideLoading();
        this.showToast('Please check your internet connection. And try again');
      }
      else
      {
          this.authservice.CheckInAndCheckoutImageProcessing(JSON.stringify(checkinandcheckoutimagedata))
          .then(data => {
            res = data;
            if(res.d.ErrFlag == 0)
            {
              this.hideLoading();
              this.AddressPopup();
                
            }
            else
            {

              this.hideLoading();
             
              this.showToast(res.d.ErrMessage);
            }
          
          }).catch(err=>{
            this.hideLoading();
            this.showToast(err.toString());
          });
      }
    }


    ionViewWillEnter()
  {
    
 
  }
  
  ionViewWillLeave(){
   }


   AddressPopup()
   {
     
     //alert(this.logindata.GetAddressBtnFlag);
    if(this.logindata.GetAddressBtnFlag == true)
    {
      this.nativeGeocoder.reverseGeocode(this.curlatitude, this.curlongitude, this.geoencoderOptions)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.curAddress=this.generateAddress(result[0]).toString();

      let alert = this.alertCtrl.create({
        title: 'You are At',
        subTitle:'[Lat: '+this.curlatitude+' Long: '+this.curlongitude+' ]\n'+'Address: '+this.curAddress ,
        buttons: [
          {
            text: 'Get Address',
            handler: () => {
              alert.dismiss();
              this.getLocation();
              this.getGeoencoder(this.curlatitude,this.curlongitude);
              this.AddressPopup();
            }
          },
        {
          text: 'Mark attendance',
          handler: () => {
            this.CheckInCheckOutWS();
            }
        }],
        enableBackdropDismiss: false // <- Here! :)
      });
  
      alert.present();
    })
    .catch((error: any) => console.log(error));
    }
    else{
      
      this.nativeGeocoder.reverseGeocode(this.curlatitude, this.curlongitude, this.geoencoderOptions)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.curAddress=this.generateAddress(result[0]).toString();
        //alert(this.curAddress);
        let alert = this.alertCtrl.create({
          title: 'You are At',
          subTitle:'[Lat: '+this.curlatitude+' Long: '+this.curlongitude+' ]\n'+'Address: '+this.curAddress ,
          buttons: [
          {
            text: 'Mark attendance',
            handler: () => {
              this.CheckInCheckOutWS();
              }
          }],
          enableBackdropDismiss: false // <- Here! :)
        });
    
        alert.present();
      })
      .catch((error: any) => console.log(error));

      
    }
    
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
            window.open(notificationWebURL, '_blank', 'location=yes,closebuttoncaption=Close,EnableViewPortScale=yes');

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

 
  
}
