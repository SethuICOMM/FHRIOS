import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SplashPage } from '../pages/splash/splash';
import { RegisterPage } from '../pages/register/register';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpClientModule } from '@angular/common/http'; 
import { Toast } from '@ionic-native/toast/ngx';
import { OtpverifyPage } from '../pages/otpverify/otpverify';
import { UpdatepinPage } from '../pages/updatepin/updatepin';
import { Network } from '@ionic-native/network';
import { LoginPage } from '../pages/login/login';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Globalization } from '@ionic-native/globalization';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { FCM } from '@ionic-native/fcm';
import { Keyboard } from '@ionic-native/keyboard';
import { SafariViewController } from '@ionic-native/safari-view-controller';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SplashPage,
    RegisterPage,
    OtpverifyPage,UpdatepinPage,LoginPage
  ],
  imports: [
    BrowserModule,HttpClientModule,
    IonicModule.forRoot(MyApp)

    
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SplashPage,
    RegisterPage,OtpverifyPage,UpdatepinPage,LoginPage
  ],
  providers: [LocationAccuracy,
    Globalization,
    FCM,
    Keyboard,
    Push,
    NativeGeocoder,
    Geolocation,
    StatusBar,
    SplashScreen,
    AppVersion,
    Device,
    Toast,
    Network,
    Diagnostic,Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    SafariViewController
  ]
})
export class AppModule {}
