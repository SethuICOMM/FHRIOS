webpackJsonp([4],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdatepinPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_crypto_js__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the UpdatepinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UpdatepinPage = /** @class */ (function () {
    function UpdatepinPage(alertCtrl, network, navCtrl, navParams, toastCtrl, loadingCtrl, authservice) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.network = network;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.authservice = authservice;
        this.updatePINForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({ newpininput: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](), confirmpininput: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]() });
        this.navCtrl.swipeBackEnabled = false;
        var disconnectSubscription = this.network.onDisconnect().subscribe(function () {
            var toast = _this.toastCtrl.create({
                message: 'Please check your internet connection. And try again',
                duration: 3000,
                position: 'bottom'
            });
            toast.onDidDismiss(function () {
                console.log('Dismissed toast');
            });
            toast.present();
        });
        // watch network for a connection
        var connectSubscription = this.network.onConnect().subscribe(function () {
            var toast = _this.toastCtrl.create({
                message: 'Internet connected!',
                duration: 3000,
                position: 'bottom'
            });
            toast.onDidDismiss(function () {
                console.log('Dismissed toast');
            });
            toast.present();
        });
    }
    UpdatepinPage.prototype.showAlert = function (title, subtitle, alertcode) {
        var _this = this;
        if (alertcode == 1) {
            var alert_1 = this.alertCtrl.create({
                title: title,
                subTitle: subtitle,
                buttons: [
                    {
                        text: 'Retry',
                        handler: function () {
                            if (_this.authservice.checkNetwork()) {
                                _this.navCtrl.push(_this.navCtrl.getActive().component);
                            }
                            else {
                                _this.showAlert("Internet not available", "Cross check your internet connectivity and try again.", 1);
                            }
                            // this.navCtrl.swipeBackEnabled = false;
                            // this.MobileAppLoad();
                        }
                    }
                ],
                enableBackdropDismiss: false // <- Here! :)
            });
            alert_1.present();
        }
    };
    UpdatepinPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    UpdatepinPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    UpdatepinPage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    UpdatepinPage.prototype.updatePINSubmit = function () {
        var _this = this;
        if (this.updatePINForm.value.newpininput == null || this.updatePINForm.value.newpininput == '') {
            this.showToast("Please enter new pin");
        }
        else if (this.updatePINForm.value.newpininput.length != 5) {
            this.showToast("Pin should be 5 digit");
        }
        else if (this.updatePINForm.value.confirmpininput == null || this.updatePINForm.value.confirmpininput == '') {
            this.showToast("Please enter confirm pin");
        }
        else if (this.updatePINForm.value.confirmpininput.length != 5) {
            this.showToast("Pin should be 5 digit");
        }
        else if (this.updatePINForm.value.newpininput != this.updatePINForm.value.confirmpininput) {
            this.showToast("New pin and confirm pin mismatched.");
        }
        else {
            this.showLoading();
            var hash = __WEBPACK_IMPORTED_MODULE_4_crypto_js___default.a.SHA256(this.updatePINForm.value.newpininput).toString(__WEBPACK_IMPORTED_MODULE_4_crypto_js___default.a.enc.Hex);
            //alert(hash);
            this.updatepindata = {
                RegistrationId: window.localStorage.getItem('Token'),
                NewMobilePIN: __WEBPACK_IMPORTED_MODULE_4_crypto_js___default.a.SHA256(this.updatePINForm.value.newpininput).toString(__WEBPACK_IMPORTED_MODULE_4_crypto_js___default.a.enc.Hex),
                ConMobilePIN: __WEBPACK_IMPORTED_MODULE_4_crypto_js___default.a.SHA256(this.updatePINForm.value.confirmpininput).toString(__WEBPACK_IMPORTED_MODULE_4_crypto_js___default.a.enc.Hex)
            };
            //alert(JSON.stringify(this.updatepindata));
            if (this.network.type == 'none') {
                this.hideLoading();
                this.showToast('Please check your internet connection. And try again');
            }
            else {
                this.authservice.updatePIN(JSON.stringify(this.updatepindata))
                    .then(function (data) {
                    _this.res = data;
                    if (_this.res.d.ErrFlag == 0) {
                        // this.hideLoading();
                        // this.navCtrl.push(UpdatepinPage);
                        // window.localStorage.setItem('isotpverifyed','1');
                        _this.hideLoading();
                        window.localStorage.setItem('ispinupdated', '1');
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
                    }
                    else {
                        _this.hideLoading();
                        _this.showToast(_this.res.d.ErrMessage);
                    }
                });
            }
        }
    };
    UpdatepinPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-updatepin',template:/*ion-inline-start:"/Users/icommmac/Desktop/Rajesh/FHRIOS/src/pages/updatepin/updatepin.html"*/'<!--\n  Generated template for the UpdatepinPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n \n</ion-header>\n\n<ion-content >\n  <ion-item>\n    <img  src="assets/imgs/fhr_onthegologored.png"  id="imgPlacement"  style="width: 90%;height: 100px;border-width: 02px;\n    border-style: solid;padding: 10px; margin-left: 10px;margin-top: 20px; border-color:gray;display: block;border-radius: 10px;">\n    </ion-item>\n    <p text-center>Please generate your PIN.(Pin Should be 5 digit)</p>\n    <form [formGroup]="updatePINForm"  class="input-border">\n        \n    <ion-item style="width:80%;margin-left:10%;">\n        <ion-label color="ligh-grey" floating>New PIN</ion-label>\n        <ion-input formControlName="newpininput" maxlength="5" type="number" pattern="[0-9]*"  required></ion-input> \n    </ion-item>\n    <ion-item style="width:80%;margin-left:10%;">\n      <ion-label color="ligh-grey" floating>Confirm PIN</ion-label>\n      <ion-input formControlName="confirmpininput" maxlength="5" type="number" pattern="[0-9]*"  required></ion-input> \n  </ion-item>\n    <ion-item no-lines style="width:80%;margin-left:10%;">\n        <ion-buttons>\n            <button ion-button full  type="submit"  (click)="updatePINSubmit()">Submit</button>\n        </ion-buttons>\n        </ion-item>\n    </form>\n</ion-content>\n'/*ion-inline-end:"/Users/icommmac/Desktop/Rajesh/FHRIOS/src/pages/updatepin/updatepin.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], UpdatepinPage);
    return UpdatepinPage;
}());

//# sourceMappingURL=updatepin.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__otpverify_otpverify__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_crypto_js__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__register_register__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_safari_view_controller__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(safariViewController, network, navCtrl, navParams, loadingCtrl, toastCtrl, alertCtrl, modalcontroller, appVersion, authservice) {
        var _this = this;
        this.safariViewController = safariViewController;
        this.network = network;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.modalcontroller = modalcontroller;
        this.appVersion = appVersion;
        this.authservice = authservice;
        this.pin = "";
        this.displaypin = "";
        this.size1 = 0;
        this.size2 = 0;
        //this.showAlert();
        this.navCtrl.swipeBackEnabled = false;
        //network
        var disconnectSubscription = this.network.onDisconnect().subscribe(function () {
            var toast = _this.toastCtrl.create({
                message: 'Please check your internet connection. And try again',
                duration: 3000,
                position: 'bottom'
            });
            toast.onDidDismiss(function () {
                console.log('Dismissed toast');
            });
            toast.present();
        });
        // watch network for a connection
        var connectSubscription = this.network.onConnect().subscribe(function () {
            var toast = _this.toastCtrl.create({
                message: 'Internet connected!',
                duration: 3000,
                position: 'bottom'
            });
            toast.onDidDismiss(function () {
                console.log('Dismissed toast');
            });
            toast.present();
        });
        this.MobileAppLoad();
    }
    //Showing alert popup
    LoginPage.prototype.showAlert = function (title, subtitle, alertcode) {
        var _this = this;
        if (alertcode == 2) {
            var alert_1 = this.alertCtrl.create({
                title: title,
                subTitle: subtitle,
                buttons: [{
                        text: 'Remind me later',
                        handler: function () {
                            _this.RemindMeLater();
                        }
                    },
                    {
                        text: 'Update',
                        handler: function () {
                            _this.safariViewController.isAvailable()
                                .then(function (available) {
                                if (available) {
                                    _this.safariViewController.show({
                                        url: 'itms-apps://itunes.apple.com/in/app/formulahr-mobile/id1206429350?mt=8',
                                        hidden: false,
                                        animated: false,
                                        transition: 'curl',
                                        enterReaderModeIfAvailable: true,
                                        tintColor: '#ff0000'
                                    })
                                        .subscribe(function (result) {
                                        if (result.event === 'opened')
                                            console.log('Opened');
                                        else if (result.event === 'loaded')
                                            console.log('Loaded');
                                        else if (result.event === 'closed')
                                            console.log('Closed');
                                    }, function (error) { return console.error(error); });
                                }
                                else {
                                    console.log("================2");
                                    // use fallback browser, example InAppBrowser
                                }
                            });
                            // window1.open('itms-apps://itunes.apple.com/in/app/formulahr-mobile/id1206429350?mt=8', '_blank', 'location=no,closebuttoncaption=Close');
                            _this.MobileAppLoad();
                        }
                    }],
                enableBackdropDismiss: false // <- Here! :)
            });
            alert_1.present();
        }
        if (alertcode == 3) {
            var alert_2 = this.alertCtrl.create({
                title: title,
                subTitle: subtitle,
                buttons: [
                    {
                        text: 'Update',
                        handler: function () {
                            _this.safariViewController.isAvailable()
                                .then(function (available) {
                                if (available) {
                                    _this.safariViewController.show({
                                        url: 'itms-apps://itunes.apple.com/in/app/formulahr-mobile/id1206429350?mt=8',
                                        hidden: false,
                                        animated: false,
                                        transition: 'curl',
                                        enterReaderModeIfAvailable: true,
                                        tintColor: '#ff0000'
                                    })
                                        .subscribe(function (result) {
                                        if (result.event === 'opened')
                                            console.log('Opened');
                                        else if (result.event === 'loaded')
                                            console.log('Loaded');
                                        else if (result.event === 'closed')
                                            console.log('Closed');
                                    }, function (error) { return console.error(error); });
                                }
                                else {
                                    console.log("================2");
                                    // use fallback browser, example InAppBrowser
                                }
                            });
                            //window1.open('itms-apps://itunes.apple.com/in/app/formulahr-mobile/id1206429350?mt=8', '_blank', 'location=no,closebuttoncaption=Close');
                            _this.MobileAppLoad();
                        }
                    }
                ],
                enableBackdropDismiss: false // <- Here! :)
            });
            alert_2.present();
        }
        if (alertcode == 4) {
            var alert_3 = this.alertCtrl.create({
                title: title,
                subTitle: subtitle,
                buttons: [
                    {
                        text: 'Retry',
                        handler: function () {
                            if (_this.authservice.checkNetwork()) {
                                _this.navCtrl.push(_this.navCtrl.getActive().component);
                            }
                            else {
                                _this.showAlert("Internet not available", "Cross check your internet connectivity and try again.", 4);
                            }
                            // this.navCtrl.swipeBackEnabled = false;
                            // this.MobileAppLoad();
                        }
                    }
                ],
                enableBackdropDismiss: false // <- Here! :)
            });
            alert_3.present();
        }
    };
    //showing Toast
    LoginPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    //show loading
    LoginPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    //hide loading
    LoginPage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    //MobileAppLoad webservice call
    LoginPage.prototype.MobileAppLoad = function () {
        var _this = this;
        this.showLoading();
        this.mobileapploaddata = {
            "RegistrationId": window.localStorage.getItem('Token'),
            "VersionName": window.localStorage.getItem('buildVersion'),
            "Size1": "0",
            "Size2": "0"
        };
        console.log(this.mobileapploaddata);
        if (this.network.type == 'none') {
            this.hideLoading();
            this.showToast('Please check your internet connection. And try again');
        }
        else {
            //alert(JSON.stringify(this.mobileapploaddata));
            this.authservice.mobileAppLoad(this.mobileapploaddata)
                .then(function (data) {
                _this.res = data;
                console.log(JSON.stringify(_this.res.d));
                if (_this.res.d.ErrFlag == 1) {
                    _this.hideLoading();
                    _this.showToast(_this.res.d.ErrMessage);
                }
                else if (_this.res.d.ErrFlag == 2) {
                    _this.hideLoading();
                    _this.showAlert("", "Upgrade now and enjoy the best version yet!", 2);
                }
                else if (_this.res.d.ErrFlag == 3) {
                    _this.hideLoading();
                    _this.showAlert("", "Upgrade now and enjoy the best version yet!", 3);
                }
                else {
                    _this.hideLoading();
                    window.localStorage.setItem('homeButName', _this.res.d.Home);
                    window.localStorage.setItem('clientLogo', "data:image/png;base64," + _this.res.d.FHRONTHEGO_IOS);
                    //window.localStorage.setItem(('BGlogo',"data:image/png;base64,"+ this.res.d.FHRBG);
                }
            });
        }
    };
    //Remind me later function
    LoginPage.prototype.RemindMeLater = function () {
        var _this = this;
        this.showLoading();
        this.remindmelaterdata = {
            "RegistrationId": window.localStorage.getItem('Token'),
            "VersionName": window.localStorage.getItem('buildVersion')
        };
        if (this.network.type == 'none') {
            this.hideLoading();
            this.showToast('Please check your internet connection. And try again');
        }
        else {
            this.authservice.remindmelater(JSON.stringify(this.remindmelaterdata))
                .then(function (data) {
                _this.res = data;
                if (_this.res.d.ErrFlag == 0) {
                    _this.hideLoading();
                }
                else {
                    _this.hideLoading();
                    _this.MobileAppLoad();
                }
            });
        }
    };
    //Pin verification button click 
    LoginPage.prototype.pinverify = function () {
        var _this = this;
        if (this.pin.length != 5) {
            if (this.pin.length == 0) {
                this.showToast("Please enter your PIN");
            }
            else {
                this.showToast("PIN should be 5 digit");
            }
        }
        else {
            this.showLoading();
            this.validatepindata = {
                "RegistrationId": window.localStorage.getItem('Token'),
                "MobilePIN": this.pin
            };
            if (this.network.type == 'none') {
                this.hideLoading();
                this.showToast('Please check your internet connection. And try again');
            }
            else {
                this.authservice.MobilePinNumberValidate(JSON.stringify(this.validatepindata))
                    .then(function (data) {
                    _this.res = data;
                    console.log(JSON.stringify(_this.res));
                    if (_this.res.d.ErrFlag == 0) {
                        _this.hideLoading();
                        console.log(JSON.stringify(_this.res));
                        sessionStorage.setItem('ispinavailable', '1');
                        sessionStorage.setItem('mPin', _this.pin);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */], { "JsonData": _this.res.d });
                        if (window.localStorage.getItem('clickNotification') == '1') {
                            _this.notifyClick();
                        }
                    }
                    else {
                        _this.hideLoading();
                        _this.displaypin = "";
                        _this.pin = "";
                        _this.showToast(_this.res.d.ErrMessage + " Your Attempt is " + _this.res.d.MobilePINWrongAttemptsCount + " of " + _this.res.d.PwdLockMaxTry);
                    }
                });
            }
        }
    };
    //Numbers button click
    LoginPage.prototype.handleinput = function (pin) {
        if (pin === 'clear') {
            this.pin = this.pin.substring(0, this.pin.length - 1);
            this.displaypin = this.displaypin.substring(0, this.displaypin.length - 1);
            return;
        }
        if (this.pin.length === 5) {
            return;
        }
        this.displaypin = this.displaypin + "*";
        this.pin += pin;
    };
    //presentPrompt
    LoginPage.prototype.ForgotpinPrompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        //console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Verify',
                    handler: function (data) {
                        _this.data = data;
                        if (data.Mobile == null || data.Mobile == '') {
                            _this.showToast("Please enter Mobile Number");
                            return false;
                        }
                        else if (data.Mobile.length != 10) {
                            _this.showToast("Mobile number should be 10 digit");
                        }
                        else {
                            _this.showLoading();
                            var forgotpindata = {
                                "RegistrationID": window.localStorage.getItem('Token'),
                                "MobileNumber": data.Mobile
                            };
                            console.log(JSON.stringify(forgotpindata));
                            if (_this.network.type == 'none') {
                                _this.hideLoading();
                                _this.showToast('Please check your internet connection. And try again');
                            }
                            else {
                                _this.authservice.forgotpin(JSON.stringify(forgotpindata))
                                    .then(function (data) {
                                    _this.res = data;
                                    _this.hideLoading();
                                    if (_this.res.d.ErrFlag == 0) {
                                        window.localStorage.setItem('isotpverifyed', '0');
                                        window.localStorage.setItem('ispinupdated', '0');
                                        window.localStorage.setItem('isOTPexpired', '0');
                                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__otpverify_otpverify__["a" /* OtpverifyPage */]);
                                        // sessionStorage.setItem('mPin',this.data.NewPin);
                                        // this.showToast("Successfully Pin changed.");
                                        //this.showToast(JSON.stringify(res));
                                        return true;
                                    }
                                    else {
                                        _this.showToast(_this.res.d.ErrMessage);
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
    };
    LoginPage.prototype.Forgotpin = function () {
        this.ForgotpinPrompt();
    };
    LoginPage.prototype.notifyClick = function () {
        var _this = this;
        this.showLoading();
        var res;
        this.pin = __WEBPACK_IMPORTED_MODULE_7_crypto_js___default.a.SHA256(sessionStorage.getItem('mPin')).toString(__WEBPACK_IMPORTED_MODULE_7_crypto_js___default.a.enc.Hex);
        window.localStorage.setItem('clickNotification', '0');
        var notificationclickiosdata = {
            "RegistrationId": window.localStorage.getItem('Token'),
            "MobilePIN": this.pin
        };
        if (this.network.type == 'none') {
            this.hideLoading();
            this.showToast('Please check your internet connection. And try again');
        }
        else {
            this.authservice.notificationClick(JSON.stringify(notificationclickiosdata))
                .then(function (data) {
                res = data;
                if (res.d.ErrFlag == 0) {
                    _this.hideLoading();
                    var notificationWebURL_1 = window.localStorage.getItem('clientURL') + res.d.PageName + "?SessionKey=" + res.d.SessionKey + "&MobilePin=" + _this.pin + "&param1=" + window.localStorage.getItem('notificationParam');
                    _this.safariViewController.isAvailable()
                        .then(function (available) {
                        if (available) {
                            _this.safariViewController.show({
                                url: notificationWebURL_1,
                                hidden: false,
                                animated: false,
                                transition: 'curl',
                                enterReaderModeIfAvailable: true,
                                tintColor: '#ff0000'
                            })
                                .subscribe(function (result) {
                                if (result.event === 'opened')
                                    console.log('Opened');
                                else if (result.event === 'loaded')
                                    console.log('Loaded');
                                else if (result.event === 'closed')
                                    console.log('Closed');
                            }, function (error) { return console.error(error); });
                        }
                        else {
                            console.log("================2");
                            // use fallback browser, example InAppBrowser
                        }
                    });
                    //  window1.open(notificationWebURL, '_blank', 'location=yes,closebuttoncaption=Close,EnableViewPortScale=yes');
                }
                else {
                    _this.hideLoading();
                    _this.showToast(res.d.ErrMessage);
                }
            }).catch(function (error) {
                _this.hideLoading();
                _this.showToast(error.toString());
            });
        }
    };
    LoginPage.prototype.UnregisteriOS = function () {
        var _this = this;
        this.showLoading();
        var res;
        var unregisterdata = {
            "RegistrationId": window.localStorage.getItem('Token'),
            "MobilePIN": __WEBPACK_IMPORTED_MODULE_7_crypto_js___default.a.SHA256(window.sessionStorage.getItem('mPin')).toString(__WEBPACK_IMPORTED_MODULE_7_crypto_js___default.a.enc.Hex)
        };
        if (this.network.type == 'none') {
            this.hideLoading();
            this.showToast('Please check your internet connection. And try again');
        }
        else {
            this.authservice.UnregisterIOS(JSON.stringify(unregisterdata))
                .then(function (data) {
                res = data;
                if (res.d.ErrFlag == 0) {
                    _this.hideLoading();
                    sessionStorage.setItem('ispinavailable', '0');
                    sessionStorage.setItem('mPin', "");
                    window.localStorage.setItem('isOTPexpired', '0');
                    window.localStorage.setItem('isregistered', '0');
                    window.localStorage.setItem('isotpverifyed', '0');
                    window.localStorage.setItem('ispinupdated', '0');
                    sessionStorage.setItem('isunregister', '0');
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__register_register__["a" /* RegisterPage */]);
                    //$state.go('register')
                }
                else {
                    _this.hideLoading();
                    _this.showToast(res.d.ErrMessage);
                }
            });
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/icommmac/Desktop/Rajesh/FHRIOS/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  \n</ion-header>\n\n<ion-content padding>\n <!-- Generated template for the PinComponent component -->\n<ion-grid>\n    <ion-row>\n        <p style="margin-left: 10px">Please Enter your 5 digit pin</p>\n    </ion-row>\n  <ion-row>\n      <ion-item style="width:90%;margin-left:10%;">\n         \n          <label text-center type="password" style="letter-spacing: 20px;margin-left: 20px;font-weight: bold;"  *ngIf="displaypin">{{displaypin}}</label>\n      </ion-item>\n  </ion-row>\n<ion-row>\n  <ion-col>\n    <button ion-button round large outline (click)="handleinput(\'1\')">1</button>\n  </ion-col>\n  <ion-col>\n      <button ion-button round large outline (click)="handleinput(\'2\')">2</button>\n    </ion-col>\n    <ion-col>\n        <button ion-button round large outline (click)="handleinput(\'3\')">3</button>\n      </ion-col>\n</ion-row>\n<ion-row>\n    <ion-col>\n      <button ion-button round large outline (click)="handleinput(\'4\')">4</button>\n    </ion-col>\n    <ion-col>\n        <button ion-button round large outline (click)="handleinput(\'5\')">5</button>\n      </ion-col>\n      <ion-col>\n          <button ion-button round large outline (click)="handleinput(\'6\')">6</button>\n        </ion-col>\n  </ion-row>\n  <ion-row>\n      <ion-col>\n        <button ion-button round large outline (click)="handleinput(\'7\')">7</button>\n      </ion-col>\n      <ion-col>\n          <button ion-button round large outline (click)="handleinput(\'8\')">8</button>\n        </ion-col>\n        <ion-col>\n            <button ion-button round large outline (click)="handleinput(\'9\')">9</button>\n          </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col>\n         \n        </ion-col>\n        <ion-col>\n            <button ion-button round large outline (click)="handleinput(\'0\')">0</button>\n          </ion-col>\n          <ion-col>\n             \n            </ion-col>\n      </ion-row>\n      <ion-row>\n            <ion-col>\n                <button ion-button clear large no-padding (click)="handleinput(\'clear\')">Clear</button>\n            </ion-col>\n            <ion-col>\n             \n            </ion-col>\n            <ion-col>\n                <button ion-button clear large  (click)="pinverify()">OK</button>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col>\n               \n            </ion-col>\n            <ion-col>\n                <button ion-button clear large  (click)="Forgotpin()">Forgot Pin</button>\n            </ion-col>\n            <ion-col>\n               \n            </ion-col>\n        </ion-row>\n</ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/icommmac/Desktop/Rajesh/FHRIOS/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__ionic_native_safari_view_controller__["a" /* SafariViewController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version__["a" /* AppVersion */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 212:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 212;

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/login/login.module": [
		733,
		3
	],
	"../pages/otpverify/otpverify.module": [
		730,
		2
	],
	"../pages/register/register.module": [
		731,
		1
	],
	"../pages/updatepin/updatepin.module": [
		732,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 255;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_crypto_js__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_diagnostic__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_globalization__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_safari_view_controller__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_geocoder__ = __webpack_require__(273);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var HomePage = /** @class */ (function () {
    function HomePage(safariViewController, network, camera, globalization, nativeGeocoder, geolocation, platform, diagnostic, navCtrl, navParams, loadingCtrl, toastCtrl, alertCtrl, authservice) {
        this.safariViewController = safariViewController;
        this.network = network;
        this.camera = camera;
        this.globalization = globalization;
        this.nativeGeocoder = nativeGeocoder;
        this.geolocation = geolocation;
        this.platform = platform;
        this.diagnostic = diagnostic;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.authservice = authservice;
        this.Name = "";
        this.CheckInAddress = '';
        this.CheckOutAddress = '';
        this.CheckInTime = "";
        this.CheckOutTime = "";
        //Geocoder configuration
        this.geoencoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        this.curAddress = '';
        this.TimeZoneOffset = "";
        this.logindata = navParams.get("JsonData");
        this.Name = this.logindata.Name;
        this.Premises = 0;
        //alert(JSON.stringify(this.logindata));
        if (this.logindata.PFN == '') {
            this.PFP = 'assets/imgs/user.png';
        }
        else {
            this.PFP = 'data:image/JPEG;base64,' + this.logindata.PFN;
        }
        if (window.localStorage.getItem('clientLogo') == '') {
            this.clientLogo = "assets/imgs/fhr_onthegologored.png";
        }
        else {
            //alert(window.localStorage.getItem('clientLogo'));
            this.clientLogo = window.localStorage.getItem('clientLogo');
        }
        this.navCtrl.swipeBackEnabled = false;
        //alert(this.PFP);
        this.LoadPinValidate();
        this.getTimezone();
    }
    HomePage.prototype.ExitApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.platform.exitApp();
        });
    };
    HomePage.prototype.Checkin = function () {
        var _this = this;
        this.showLoading();
        if (this.logindata.Radious == true) {
            this.hideLoading();
            this.diagnostic.isLocationAuthorized().then(function (enabled) {
                if (enabled == false) {
                    _this.diagnostic.getLocationAuthorizationStatus().then(function (status) {
                        alert("status " + status);
                        if (status == "denied") {
                            _this.diagnostic.requestLocationAuthorization();
                        }
                        if (status == "not_determined") {
                            _this.diagnostic.requestLocationAuthorization();
                        }
                    });
                }
                else {
                    _this.RadiousBaseCheckin();
                }
            });
        }
        else {
            if (this.logindata.EnableGPS == true) {
                if (this.logindata.OfficeInOutFlag == true) {
                    this.hideLoading();
                    this.getAddress();
                    this.CheckRegularize();
                }
                else {
                    this.hideLoading();
                    this.diagnostic.isLocationAuthorized().then(function (enabled) {
                        if (enabled == false) {
                            _this.diagnostic.getLocationAuthorizationStatus().then(function (status) {
                                //alert("status "+status);
                                if (status == "denied") {
                                    _this.diagnostic.requestLocationAuthorization();
                                }
                                if (status == "not_determined") {
                                    _this.diagnostic.requestLocationAuthorization();
                                }
                            });
                        }
                        else {
                            _this.geolocation.getCurrentPosition().then(function (resp) {
                                _this.curlatitude = resp.coords.latitude;
                                _this.curlongitude = resp.coords.longitude;
                                _this.getGeoencoder(_this.curlatitude, _this.curlongitude);
                                _this.CheckCapturePhoto();
                            }).catch(function (error) {
                                alert('Error getting location' + error);
                            });
                        }
                    });
                }
            }
            else {
                this.hideLoading();
                if (this.CheckInTime == "") {
                    this.checkinstate = 'I';
                }
                else {
                    this.checkinstate = 'O';
                }
                this.curlatitude = 0;
                this.curlongitude = 0;
                this.TimeZoneOffset = '0';
                this.Premises = 0;
                this.curAddress = null;
                this.CheckInCheckOutWS();
            }
        }
    };
    HomePage.prototype.CheckRegularize = function () {
        var _this = this;
        this.showLoading();
        var res;
        var checkreulrizeddata = {
            "RegistrationId": window.localStorage.getItem('Token')
        };
        if (this.network.type == 'none') {
            this.hideLoading();
            this.showToast('Please check your internet connection. And try again');
        }
        else {
            this.authservice.CheckRegularize(JSON.stringify(checkreulrizeddata))
                .then(function (data) {
                res = data;
                //alert(res.d.ErrFlag);
                if (res.d.ErrFlag == 0) {
                    _this.hideLoading();
                    _this.getAddress();
                    _this.OfficeInOutWS();
                }
                else {
                    _this.hideLoading();
                    _this.showToast(res.d.ErrMessage);
                }
            });
        }
    };
    HomePage.prototype.OfficeInOutWS = function () {
        var _this = this;
        this.showLoading();
        var res;
        var PremisesData = new Array();
        if (this.network.type == 'none') {
            this.hideLoading();
            this.showToast('Please check your internet connection. And try again');
        }
        else {
            this.authservice.OfficeCheckInOut()
                .then(function (data) {
                res = data;
                for (var i = 0; i < res.d.length; i++) {
                    PremisesData.push({ type: 'radio', label: res.d[i]["OfficeInOutName"], value: res.d[i]["OfficeInOutCode"] });
                }
                //alert(PremisesData);
                _this.hideLoading();
                var prompt = _this.alertCtrl.create({
                    title: 'Choose your Permises',
                    inputs: PremisesData,
                    buttons: [
                        {
                            text: "OK",
                            handler: function (data) {
                                _this.Premises = data;
                                //alert(this.Premises);
                                if (_this.Premises == undefined) {
                                    _this.showToast("Kindly choose any one option.");
                                }
                                else {
                                    _this.showLoading();
                                    _this.getAddress();
                                    _this.CheckCapturePhoto();
                                }
                            }
                        }
                    ]
                });
                prompt.present();
            });
        }
    };
    //Check Photo Flag Enabled
    HomePage.prototype.CheckCapturePhoto = function () {
        var _this = this;
        if (this.logindata.Photo == true) {
            this.hideLoading();
            this.diagnostic.isCameraAuthorized().then(function (enabled) {
                if (enabled == false) {
                    _this.diagnostic.getCameraAuthorizationStatus().then(function (status) {
                        if (status == "denied") {
                            _this.diagnostic.requestCameraAuthorization();
                        }
                        if (status == "not_determined") {
                            _this.diagnostic.requestCameraAuthorization();
                        }
                    });
                }
                else {
                    _this.capturePhoto();
                }
            });
        }
        else {
            this.hideLoading();
            this.diagnostic.isLocationAuthorized().then(function (enabled) {
                if (enabled == false) {
                    _this.diagnostic.getLocationAuthorizationStatus().then(function (status) {
                        //alert("status "+status);
                        if (status == "denied") {
                            _this.diagnostic.requestLocationAuthorization();
                        }
                        if (status == "not_determined") {
                            _this.diagnostic.requestLocationAuthorization();
                        }
                    });
                }
                else {
                    _this.GPSBaseCheckin();
                }
            });
        }
    };
    //Showing alert popup
    HomePage.prototype.showAlert = function (title, subtitle, alertcode) {
        var _this = this;
        if (alertcode == 1) {
            var alert_1 = this.alertCtrl.create({
                title: title,
                subTitle: subtitle,
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function () {
                        }
                    },
                    {
                        text: 'OK',
                        handler: function () {
                            // sessionStorage.setItem('isunregister','1');
                            // this.navCtrl.push(LoginPage);
                            _this.showLoading();
                            var res;
                            var unregisterdata = {
                                "RegistrationId": window.localStorage.getItem('Token'),
                                "MobilePIN": __WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.SHA256(window.sessionStorage.getItem('mPin')).toString(__WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.enc.Hex)
                            };
                            if (_this.network.type == 'none') {
                                _this.hideLoading();
                                _this.showToast('Please check your internet connection. And try again');
                            }
                            else {
                                _this.authservice.UnregisterIOS(JSON.stringify(unregisterdata))
                                    .then(function (data) {
                                    res = data;
                                    if (res.d.ErrFlag == 0) {
                                        _this.hideLoading();
                                        sessionStorage.setItem('ispinavailable', '0');
                                        sessionStorage.setItem('mPin', "");
                                        window.localStorage.setItem('isOTPexpired', '0');
                                        window.localStorage.setItem('isregistered', '0');
                                        window.localStorage.setItem('isotpverifyed', '0');
                                        window.localStorage.setItem('ispinupdated', '0');
                                        sessionStorage.setItem('isunregister', '0');
                                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__register_register__["a" /* RegisterPage */]);
                                        //$state.go('register')
                                    }
                                    else {
                                        _this.hideLoading();
                                        _this.showToast(res.d.ErrMessage);
                                    }
                                });
                            }
                        }
                    }
                ],
                enableBackdropDismiss: false // <- Here! :)
            });
            alert_1.present();
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: title,
                subTitle: subtitle,
                buttons: [
                    {
                        text: 'Retry',
                        handler: function () {
                            if (_this.authservice.checkNetwork()) {
                                _this.navCtrl.push(_this.navCtrl.getActive().component);
                            }
                            else {
                                _this.showAlert("Internet not available", "Cross check your internet connectivity and try again.", 2);
                            }
                            // this.navCtrl.swipeBackEnabled = false;
                            // this.MobileAppLoad();
                        }
                    }
                ],
                enableBackdropDismiss: false // <- Here! :)
            });
            alert_2.present();
        }
    };
    //presentPrompt
    HomePage.prototype.ChangepinPrompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
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
                    handler: function (data) {
                        //console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Change',
                    handler: function (data) {
                        _this.data = data;
                        if (data.OldPin == null || data.OldPin == '') {
                            _this.showToast("Please enter old pin");
                            return false;
                        }
                        else if (data.OldPin.length != 5) {
                            _this.showToast("Pin should be 5 digit");
                        }
                        else if (data.NewPin == null || data.NewPin == '') {
                            _this.showToast("Please enter new pin");
                            return false;
                        }
                        else if (data.NewPin.length != 5) {
                            _this.showToast("Pin should be 5 digit");
                            return false;
                        }
                        else if (data.ConfirmPin == null || data.ConfirmPin == '') {
                            _this.showToast("Please enter new pin");
                            return false;
                        }
                        else if (data.ConfirmPin.length != 5) {
                            _this.showToast("Pin should be 5 digit");
                            return false;
                        }
                        else if (data.NewPin != data.ConfirmPin) {
                            _this.showToast("New pin and confirm pin mismatched.");
                            return false;
                        }
                        else {
                            _this.showLoading();
                            var oldpin = void 0;
                            var newpin = void 0;
                            var confirmpin = void 0;
                            var res_1;
                            oldpin = __WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.SHA256(data.OldPin).toString(__WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.enc.Hex);
                            newpin = __WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.SHA256(data.NewPin).toString(__WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.enc.Hex);
                            confirmpin = __WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.SHA256(data.ConfirmPin).toString(__WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.enc.Hex);
                            var changepindata = {
                                "RegistrationId": window.localStorage.getItem('Token'),
                                "OldMobilePIN": oldpin,
                                "NewMobilePIN": newpin,
                                "ConMobilePIN": confirmpin
                            };
                            if (_this.network.type == 'none') {
                                _this.hideLoading();
                                _this.showToast('Please check your internet connection. And try again');
                            }
                            else {
                                _this.authservice.MobilePInChangeIOS(JSON.stringify(changepindata))
                                    .then(function (data) {
                                    res_1 = data;
                                    _this.hideLoading();
                                    if (res_1.d.ErrFlag == 0) {
                                        sessionStorage.setItem('mPin', _this.data.NewPin);
                                        _this.showToast("Successfully Pin changed.");
                                    }
                                    else {
                                        _this.showToast(res_1.d.ErrMessage);
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
    };
    //showing Toast
    HomePage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    //show loading
    HomePage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    //hide loading
    HomePage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    HomePage.prototype.LoadPinValidate = function () {
        //this.showLoading();
        if (this.logindata.ErrFlag == 0) {
            if (this.logindata.AmsSwipeData == false) {
                if (this.logindata.IsCheckIn == false && this.logindata.IsCheckOut == false) {
                    this.checkin_hide = true;
                    this.CheckinDisabled = true;
                }
                else if (this.logindata.IsCheckIn == true && this.logindata.IsCheckOut == false) {
                    this.checkin_hide = true;
                    this.CheckinDisabled = false;
                    this.CheckInTime = this.logindata.CheckIn;
                    this.CheckInAddress = this.logindata.CheckInAddress;
                    this.checkout_hide = true;
                    this.CheckoutDisabled = true;
                }
                else if (this.logindata.IsCheckIn == true && this.logindata.IsCheckOut == true) {
                    this.checkin_hide = true;
                    this.CheckinDisabled = false;
                    this.CheckInTime = this.logindata.CheckIn;
                    this.CheckInAddress = this.logindata.CheckInAddress;
                    this.checkout_hide = true;
                    this.CheckoutDisabled = false;
                    this.CheckOutTime = this.logindata.CheckOut;
                    this.CheckOutAddress = this.logindata.CheckOutAddress;
                }
            }
            else {
                this.checkin_hide = false;
                this.CheckinDisabled = false;
                this.CheckInTime = "";
                this.CheckInAddress = "";
                this.checkout_hide = false;
                this.CheckoutDisabled = false;
                this.CheckOutTime = "";
                this.CheckOutAddress = "";
            }
        }
    };
    //HomeClick
    HomePage.prototype.homeclick = function () {
        var _this = this;
        if (window.localStorage.getItem('clickNotification') == '1') {
            this.notifyClick();
        }
        else {
            this.showLoading();
            var res_2;
            this.pin = __WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.SHA256(sessionStorage.getItem('mPin')).toString(__WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.enc.Hex);
            var mobileapploaddata = {
                "RegistrationId": window.localStorage.getItem('Token'),
                "MobilePIN": this.pin,
            };
            if (this.network.type == 'none') {
                this.hideLoading();
                this.showToast('Please check your internet connection. And try again');
            }
            else {
                //alert(this.pin);
                this.authservice.HomeClick(JSON.stringify(mobileapploaddata))
                    .then(function (data) {
                    res_2 = data;
                    //{"d":{"__type":"MobileHome","SessionKey":"fc8846f9-198a-4a12-b96d-6178cc1bb48f","PageName":"MobileAppLogin.aspx","ErrFlag":0,"ErrMessage":"","PwdLockMaxTry":5,"MobilePINWrongAttemptsCount":0}}
                    //alert(res.d.ErrFlag);
                    if (res_2.d.ErrFlag == 0) {
                        _this.hideLoading();
                        var mainURL_1 = window.localStorage.getItem('clientURL') + res_2.d.PageName + "?SessionKey=" + res_2.d.SessionKey + "&MobilePin=" + _this.pin;
                        _this.safariViewController.isAvailable()
                            .then(function (available) {
                            if (available) {
                                _this.safariViewController.show({
                                    url: mainURL_1,
                                    hidden: false,
                                    animated: false,
                                    transition: 'curl',
                                    enterReaderModeIfAvailable: true,
                                    tintColor: '#ff0000'
                                })
                                    .subscribe(function (result) {
                                    if (result.event === 'opened')
                                        console.log('Opened');
                                    else if (result.event === 'loaded')
                                        console.log('Loaded');
                                    else if (result.event === 'closed')
                                        console.log('Closed');
                                }, function (error) { return console.error(error); });
                            }
                            else {
                                console.log("================2");
                                // use fallback browser, example InAppBrowser
                            }
                        });
                        //window1.open(mainURL, '_blank', 'location=no,closebuttoncaption=Close');
                        //   let target : string = '_self',
                        //     opts   : string = 'clearcache=yes,clearsessioncache=yes,toolbar=yes,location=yes';
                        // this.iab.create(mainURL, target, opts);
                    }
                    else {
                        _this.hideLoading();
                        _this.showToast(res_2.d.ErrMessage);
                    }
                });
            }
        }
    };
    //ChangePin
    HomePage.prototype.ChangePin = function () {
        this.ChangepinPrompt();
    };
    //Unregister App
    HomePage.prototype.Unregister = function () {
        this.showAlert("App Unregister", "Are you sure want remove your account register?", 1);
    };
    //GPS base Checkin checkout function
    HomePage.prototype.GPSBaseCheckin = function () {
        var _this = this;
        if (this.CheckInTime == "") {
            this.checkinstate = 'I';
        }
        else {
            this.checkinstate = 'O';
        }
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.curlatitude = resp.coords.latitude;
            _this.curlongitude = resp.coords.longitude;
            console.log(_this.curlatitude, _this.curlongitude);
            _this.getTimezone();
            _this.getGeoencoder(_this.curlatitude, _this.curlongitude);
            _this.AddressPopup();
        }).catch(function (error) {
            alert('Error getting location' + error);
        });
    };
    //Radious base checkin checkout function
    HomePage.prototype.RadiousBaseCheckin = function () {
        var _this = this;
        if (this.CheckInTime == "") {
            this.checkinstate = 'I';
        }
        else {
            this.checkinstate = 'O';
        }
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.curlatitude = resp.coords.latitude;
            _this.curlongitude = resp.coords.longitude;
            console.log(_this.curlatitude, _this.curlongitude);
            _this.getGeoencoder(_this.curlatitude, _this.curlongitude);
            if (_this.curAddress != "") {
                _this.GetLat_GetLon();
            }
            else {
                _this.showToast("Unable to find the address please try again.");
            }
        }).catch(function (error) {
            alert('Error getting location' + error);
        });
    };
    HomePage.prototype.getAddress = function () {
        this.getLocation();
        this.getGeoencoder(this.curlatitude, this.curlongitude);
    };
    HomePage.prototype.getLocation = function () {
        var _this = this;
        this.diagnostic.isLocationAuthorized().then(function (enabled) {
            if (enabled == false) {
                _this.diagnostic.getLocationAuthorizationStatus().then(function (status) {
                    //alert("status "+status);
                    if (status == "denied") {
                        _this.diagnostic.requestLocationAuthorization();
                    }
                    if (status == "not_determined") {
                        _this.diagnostic.requestLocationAuthorization();
                    }
                });
            }
            else {
                _this.geolocation.getCurrentPosition().then(function (resp) {
                    _this.curlatitude = resp.coords.latitude;
                    _this.curlongitude = resp.coords.longitude;
                }).catch(function (error) {
                    alert('Error getting location' + error);
                });
            }
        });
    };
    //Get Target coords
    HomePage.prototype.GetLat_GetLon = function () {
        var _this = this;
        this.showLoading();
        var res;
        //alert(this.curAddress);
        this.pin = __WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.SHA256(sessionStorage.getItem('mPin')).toString(__WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.enc.Hex);
        var getlattitudeandlongtitueiosdata = {
            "RegistrationId": window.localStorage.getItem('Token'),
            "MobilePIN": this.pin,
            "CheckInOrOut": this.checkinstate,
            "Lattitude": this.curlatitude,
            "Longtitue": this.curlongitude,
            "Address": this.curAddress
        };
        console.log(JSON.stringify(getlattitudeandlongtitueiosdata));
        if (this.network.type == 'none') {
            this.hideLoading();
            this.showToast('Please check your internet connection. And try again');
        }
        else {
            this.authservice.GetLattitudeAndLongtitueIOS(JSON.stringify(getlattitudeandlongtitueiosdata))
                .then(function (data) {
                res = data;
                _this.hideLoading();
                //alert(JSON.stringify(res.d));
                if (res.d.ErrFlag == 0) {
                    if (_this.calculateDistance(_this.curlatitude, _this.curlongitude, res.d.Lattitude, res.d.Longtitue) < res.d.Distance) {
                        _this.CheckInCheckOutWS();
                    }
                    else {
                        _this.showToast("You are in out of location");
                    }
                }
                else {
                    _this.showToast(res.d.ErrMessage);
                }
            });
        }
    };
    //geocoder method to fetch address from coordinates passed as arguments
    HomePage.prototype.getGeoencoder = function (latitude, longitude) {
        var _this = this;
        this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
            .then(function (result) {
            _this.curAddress = _this.generateAddress(result[0]).toString();
            //alert(this.curAddress);
        })
            .catch(function (error) { return console.log(error); });
    };
    //Return Comma saperated address
    HomePage.prototype.generateAddress = function (addressObj) {
        var obj = [];
        var address = '';
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
        for (var val in obj) {
            //if(obj[val].length)
            address += obj[val] + ', ';
        }
        return address.slice(0, -2);
    };
    HomePage.prototype.calculateDistance = function (lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = this.toRad(lat2 - lat1);
        var dLon = this.toRad(lon2 - lon1);
        lat1 = this.toRad(lat1);
        lat2 = this.toRad(lat2);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return Math.floor(d * 1000);
    };
    // Converts numeric degrees to radians
    HomePage.prototype.toRad = function (Value) {
        return Value * Math.PI / 180;
    };
    HomePage.prototype.getTimezone = function () {
        var _this = this;
        this.globalization.getDatePattern({ formatLength: 'long', selector: 'date and time' })
            .then(function (res) {
            console.log(res);
            _this.TimeZoneOffset = res.utc_offset.toString();
            console.log('Timwzone' + _this.TimeZoneOffset);
        })
            .catch(function (e) {
            console.log(e);
        });
    };
    //checkin checkout webmethod calling
    HomePage.prototype.CheckInCheckOutWS = function () {
        var _this = this;
        this.showLoading();
        var res;
        this.pin = __WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.SHA256(sessionStorage.getItem('mPin')).toString(__WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.enc.Hex);
        var checkinandcheckoutdata = {
            "RegistrationId": window.localStorage.getItem('Token'),
            "MobilePIN": this.pin,
            "CheckInOrOut": this.checkinstate,
            "Lattitude": this.curlatitude,
            "Longtitue": this.curlongitude,
            "Address": this.curAddress,
            "TimeZone": this.TimeZoneOffset,
            "OfficeInOutCode": this.Premises
        };
        //alert(JSON.stringify(checkinandcheckoutdata));
        if (this.network.type == 'none') {
            this.hideLoading();
            this.showToast('Please check your internet connection. And try again');
        }
        else {
            this.authservice.CheckInAndCheckoutIOS(JSON.stringify(checkinandcheckoutdata))
                .then(function (data) {
                res = data;
                //alert(JSON.stringify(res));
                if (res.d.ErrFlag == 0) {
                    //alert("0");
                    if (_this.CheckInTime == "") {
                        _this.hideLoading();
                        _this.CheckInTime = res.d.CheckedTime;
                        _this.CheckInAddress = res.d.CheckedAddress;
                        _this.checkin_hide = true;
                        _this.CheckinDisabled = false;
                        _this.checkout_hide = true;
                        _this.CheckoutDisabled = true;
                    }
                    else {
                        _this.hideLoading();
                        _this.CheckOutTime = res.d.CheckedTime;
                        _this.CheckOutAddress = res.d.CheckedAddress;
                        _this.checkin_hide = true;
                        _this.CheckinDisabled = false;
                        _this.checkout_hide = true;
                        _this.CheckoutDisabled = false;
                    }
                }
                else {
                    //alert("1");
                    _this.hideLoading();
                    _this.showToast(res.d.ErrMessage);
                }
            });
        }
    };
    //Capture Image
    HomePage.prototype.capturePhoto = function () {
        var _this = this;
        this.showLoading();
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        if (this.CheckInTime == "") {
            this.checkinstate = 'I';
        }
        else {
            this.checkinstate = 'O';
        }
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            //Call Checkin image process
            _this.hideLoading();
            _this.getAddress();
            _this.CheckinImageWS(imageData);
        }, function (err) {
            // Handle 
            _this.hideLoading();
        });
    };
    HomePage.prototype.CheckinImageWS = function (imageData) {
        var _this = this;
        this.showLoading();
        var res;
        this.pin = __WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.SHA256(sessionStorage.getItem('mPin')).toString(__WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.enc.Hex);
        var checkinandcheckoutimagedata = {
            "RegistrationId": window.localStorage.getItem('Token'),
            "MobilePIN": this.pin,
            "CheckInOrOut": this.checkinstate,
            "Data": imageData
        };
        if (this.network.type == 'none') {
            this.hideLoading();
            this.showToast('Please check your internet connection. And try again');
        }
        else {
            this.authservice.CheckInAndCheckoutImageProcessing(JSON.stringify(checkinandcheckoutimagedata))
                .then(function (data) {
                res = data;
                if (res.d.ErrFlag == 0) {
                    _this.hideLoading();
                    _this.AddressPopup();
                }
                else {
                    _this.hideLoading();
                    _this.showToast(res.d.ErrMessage);
                }
            }).catch(function (err) {
                _this.hideLoading();
                _this.showToast(err.toString());
            });
        }
    };
    HomePage.prototype.ionViewWillEnter = function () {
    };
    HomePage.prototype.ionViewWillLeave = function () {
    };
    HomePage.prototype.AddressPopup = function () {
        var _this = this;
        //alert(this.logindata.GetAddressBtnFlag);
        if (this.logindata.GetAddressBtnFlag == true) {
            this.nativeGeocoder.reverseGeocode(this.curlatitude, this.curlongitude, this.geoencoderOptions)
                .then(function (result) {
                _this.curAddress = _this.generateAddress(result[0]).toString();
                var alert = _this.alertCtrl.create({
                    title: 'You are At',
                    subTitle: '[Lat: ' + _this.curlatitude + ' Long: ' + _this.curlongitude + ' ]\n' + 'Address: ' + _this.curAddress,
                    buttons: [
                        {
                            text: 'Get Address',
                            handler: function () {
                                alert.dismiss();
                                _this.getLocation();
                                _this.getGeoencoder(_this.curlatitude, _this.curlongitude);
                                _this.AddressPopup();
                            }
                        },
                        {
                            text: 'Mark attendance',
                            handler: function () {
                                _this.CheckInCheckOutWS();
                            }
                        }
                    ],
                    enableBackdropDismiss: false // <- Here! :)
                });
                alert.present();
            })
                .catch(function (error) { return console.log(error); });
        }
        else {
            this.nativeGeocoder.reverseGeocode(this.curlatitude, this.curlongitude, this.geoencoderOptions)
                .then(function (result) {
                _this.curAddress = _this.generateAddress(result[0]).toString();
                //alert(this.curAddress);
                var alert = _this.alertCtrl.create({
                    title: 'You are At',
                    subTitle: '[Lat: ' + _this.curlatitude + ' Long: ' + _this.curlongitude + ' ]\n' + 'Address: ' + _this.curAddress,
                    buttons: [
                        {
                            text: 'Mark attendance',
                            handler: function () {
                                _this.CheckInCheckOutWS();
                            }
                        }
                    ],
                    enableBackdropDismiss: false // <- Here! :)
                });
                alert.present();
            })
                .catch(function (error) { return console.log(error); });
        }
    };
    HomePage.prototype.notifyClick = function () {
        var _this = this;
        this.showLoading();
        var res;
        this.pin = __WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.SHA256(sessionStorage.getItem('mPin')).toString(__WEBPACK_IMPORTED_MODULE_2_crypto_js___default.a.enc.Hex);
        window.localStorage.setItem('clickNotification', '0');
        var notificationclickiosdata = {
            "RegistrationId": window.localStorage.getItem('Token'),
            "MobilePIN": this.pin
        };
        if (this.network.type == 'none') {
            this.hideLoading();
            this.showToast('Please check your internet connection. And try again');
        }
        else {
            this.authservice.notificationClick(JSON.stringify(notificationclickiosdata))
                .then(function (data) {
                res = data;
                if (res.d.ErrFlag == 0) {
                    _this.hideLoading();
                    var notificationWebURL_1 = window.localStorage.getItem('clientURL') + res.d.PageName + "?SessionKey=" + res.d.SessionKey + "&MobilePin=" + _this.pin + "&param1=" + window.localStorage.getItem('notificationParam');
                    _this.safariViewController.isAvailable()
                        .then(function (available) {
                        if (available) {
                            _this.safariViewController.show({
                                url: notificationWebURL_1,
                                hidden: false,
                                animated: false,
                                transition: 'curl',
                                enterReaderModeIfAvailable: true,
                                tintColor: '#ff0000'
                            })
                                .subscribe(function (result) {
                                if (result.event === 'opened')
                                    console.log('Opened');
                                else if (result.event === 'loaded')
                                    console.log('Loaded');
                                else if (result.event === 'closed')
                                    console.log('Closed');
                            }, function (error) { return console.error(error); });
                        }
                        else {
                            console.log("===============3");
                            // use fallback browser, example InAppBrowser
                        }
                    });
                    //     window1.open(notificationWebURL, '_blank', 'location=yes,closebuttoncaption=Close,EnableViewPortScale=yes');
                }
                else {
                    _this.hideLoading();
                    _this.showToast(res.d.ErrMessage);
                }
            }).catch(function (error) {
                _this.hideLoading();
                _this.showToast(error.toString());
            });
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/icommmac/Desktop/Rajesh/FHRIOS/src/pages/home/home.html"*/'<ion-header>\n  \n</ion-header>\n\n<ion-content>\n  <ion-item>\n      <div *ngIf="clientLogo">\n    <img  src="{{clientLogo}}"  id="imgPlacement"  style="width: 100%;border-width: 02px;\n    border-style: solid;padding: 10px; margin-left: 10px;margin-top: 20px; border-color:gray;display: block;border-radius: 10px;">\n   </div>  \n  </ion-item>\n\n    \n<ion-item>\n      <div class=\'container2\'>\n        <div class="left">\n            <div *ngIf="PFP">\n                <img style="border-radius: 50%;" src="{{PFP}}" class=\'iconDetails\'>\n            </div>\n                    \n                 \n                     <div style="margin-left: 20px; margin-bottom: 20px;">\n                       <h4 style="font-weight: bold;">Welcome</h4>\n                       <h4 style="font-weight: bold;" *ngIf="Name">{{Name}}</h4>\n                     </div>\n          \n        </div>	\n    </div>\n  </ion-item>\n  <ion-grid >\n    \n    <ion-row>\n      <ion-col >\n          <button [disabled]="!CheckinDisabled" [hidden]="!checkin_hide" (click)="Checkin()" style="width:40px;\n          height: 40px;\n          background-color:#69B31F;\n          border-radius: 50%;\n          font-size: 20px !important;text-align:center;"> <ion-icon class="light center" name="log-in"></ion-icon> </button>\n          \n      </ion-col>\n      <ion-col>\n          <h6  style="font-size:10px;" *ngIf="CheckInTime" >{{CheckInTime}}</h6>\n         \n      </ion-col>\n      <ion-col>\n          <h6  style="font-size:10px;" *ngIf="CheckInAddress">{{CheckInAddress}}</h6>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col>\n        <button [disabled]="!CheckoutDisabled" [hidden]="!checkout_hide" (click)="Checkin()" style="width:40px;\n        height: 40px;\n        background-color:#F64747;\n        font-size: 20px !important;\n        border-radius: 50%;\n        margin-top:5px; text-align:center;"> <ion-icon class="light center" name="log-out"></ion-icon></button>\n      \n      </ion-col>\n      <ion-col>\n          <h6  style="font-size:10px;" *ngIf="CheckOutTime">{{CheckOutTime}}</h6>\n         \n      </ion-col>\n      <ion-col>\n          <h6  style="font-size:10px;" *ngIf="CheckOutAddress">{{CheckOutAddress}}</h6>\n        </ion-col>\n    </ion-row>\n    </ion-grid>\n\n    <ion-buttons style="padding-left: 50px; padding-right: 80px;" >\n        \n        <button  ion-button full  type="submit"  (click)="homeclick()"><ion-icon name="home"></ion-icon>  Home</button>\n    </ion-buttons>\n\n\n    <ion-fab right bottom>\n        <button ion-fab color="primary"><ion-icon name="construct"></ion-icon></button>\n        <ion-fab-list side="top">\n            <button ion-fab color="primary" (click)="ChangePin()"><ion-icon ios="ios-key" md="md-key"></ion-icon> <ion-label>Change Pin</ion-label></button>\n            <button ion-fab color="primary" (click)="Unregister()"><ion-icon ios="ios-trash" md="md-trash"></ion-icon> <ion-label>Unregister</ion-label></button>\n          \n         <!-- <button ion-fab color="primary" (click)="ChangePin()"><ion-icon ios="ios-key" md="md-key"></ion-icon></button>\n          <button ion-fab color="primary" (click)="Unregister()"><ion-icon ios="ios-trash" md="md-trash"></ion-icon></button> -->\n        </ion-fab-list>\n      </ion-fab>\n  \n\n\n  \n   \n</ion-content>\n'/*ion-inline-end:"/Users/icommmac/Desktop/Rajesh/FHRIOS/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_10__ionic_native_safari_view_controller__["a" /* SafariViewController */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_globalization__["a" /* Globalization */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_geocoder__["a" /* NativeGeocoder */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_register__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__otpverify_otpverify__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__updatepin_updatepin__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SplashPage = /** @class */ (function () {
    function SplashPage(navCtrl, network) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.network = network;
        if (window.localStorage.getItem('clientLogo') == '') {
            this.clientLogo = "assets/imgs/fhr_onthegologored.png";
        }
        else {
            this.clientLogo = window.localStorage.getItem('clientLogo');
        }
        if (window.localStorage.getItem('isregistered') === '1') {
            if (window.localStorage.getItem('isotpverifyed') == '1') {
                if (window.localStorage.getItem('ispinupdated') === '1') {
                    setTimeout(function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
                        //you can call function here
                    }, 5000);
                }
                else {
                    setTimeout(function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__updatepin_updatepin__["a" /* UpdatepinPage */]);
                        //you can call function here
                    }, 5000);
                }
            }
            else {
                setTimeout(function () {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__otpverify_otpverify__["a" /* OtpverifyPage */]);
                    //you can call function here
                }, 5000);
                // $timeout(function() {
                // $state.go('otp')
                // }, 3000);
            }
        }
        else {
            //   $timeout(function() {
            //     $state.go('register')
            // }, 3000);
            setTimeout(function () {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__register_register__["a" /* RegisterPage */]);
                //you can call function here
            }, 5000);
        }
    }
    SplashPage.prototype.ionViewCanEnter = function () {
    };
    SplashPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-splash',template:/*ion-inline-start:"/Users/icommmac/Desktop/Rajesh/FHRIOS/src/pages/splash/splash.html"*/'\n  <ion-content>\n      <div *ngIf="clientLogo">\n          <img src="{{clientLogo}}"   id="imgPlacement"  style="align-items: center; width:100%; margin-top:50%">\n         </div> \n    \n    <img src="assets/imgs/loading.gif"    style="align-items: center; width:20%; height:20%; margin-top:0%;margin-left:40%">\n  </ion-content>\n\n'/*ion-inline-end:"/Users/icommmac/Desktop/Rajesh/FHRIOS/src/pages/splash/splash.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__["a" /* Network */]])
    ], SplashPage);
    return SplashPage;
}());

//# sourceMappingURL=splash.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(420);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(726);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_splash_splash__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_register_register__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_app_version__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_device__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_auth_service_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common_http__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_toast_ngx__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_otpverify_otpverify__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_updatepin_updatepin__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_network__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_login_login__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_diagnostic__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_location_accuracy_ngx__ = __webpack_require__(728);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_geolocation__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_native_geocoder__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_globalization__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_camera__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_push__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_fcm__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_keyboard__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_safari_view_controller__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_otpverify_otpverify__["a" /* OtpverifyPage */], __WEBPACK_IMPORTED_MODULE_15__pages_updatepin_updatepin__["a" /* UpdatepinPage */], __WEBPACK_IMPORTED_MODULE_17__pages_login_login__["a" /* LoginPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_12__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/otpverify/otpverify.module#OtpverifyPageModule', name: 'OtpverifyPage', segment: 'otpverify', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/updatepin/updatepin.module#UpdatepinPageModule', name: 'UpdatepinPage', segment: 'updatepin', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_register_register__["a" /* RegisterPage */], __WEBPACK_IMPORTED_MODULE_14__pages_otpverify_otpverify__["a" /* OtpverifyPage */], __WEBPACK_IMPORTED_MODULE_15__pages_updatepin_updatepin__["a" /* UpdatepinPage */], __WEBPACK_IMPORTED_MODULE_17__pages_login_login__["a" /* LoginPage */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_19__ionic_native_location_accuracy_ngx__["a" /* LocationAccuracy */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_globalization__["a" /* Globalization */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_fcm__["a" /* FCM */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_keyboard__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_push__["a" /* Push */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_app_version__["a" /* AppVersion */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_toast_ngx__["a" /* Toast */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_23__ionic_native_camera__["a" /* Camera */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_safari_view_controller__["a" /* SafariViewController */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(685);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthServiceProvider = /** @class */ (function () {
    function AuthServiceProvider(http, network) {
        this.http = http;
        this.network = network;
        this.apiUrl = 'http://fhrv14.formulahr.com/Services/MobileRegistration.asmx/';
        console.log('Hello AuthServiceProvider Provider');
    }
    AuthServiceProvider.prototype.addUser = function (userdata) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.apiUrl + 'UserRegistration', userdata, { headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json;charset=utf-8') }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AuthServiceProvider.prototype.otpVerification = function (otpvalidatedata) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(window.localStorage.getItem('clientURL') + 'services/AppUserRegistrationAuthentication.asmx/OTPNumberValidate', otpvalidatedata, { headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json') }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AuthServiceProvider.prototype.resendOTP = function (resendOTPdata) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(window.localStorage.getItem('clientURL') + 'services/AppUserRegistrationAuthentication.asmx/ResendOTP', resendOTPdata, { headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json') }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AuthServiceProvider.prototype.updatePIN = function (updatepindata) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(window.localStorage.getItem('clientURL') + 'services/AppUserRegistrationAuthentication.asmx/MobileRegistrationPinUpdateIOS', updatepindata, { headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json') }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AuthServiceProvider.prototype.mobileAppLoad = function (mobileapploaddata) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(window.localStorage.getItem('clientURL') + 'services/AppUserRegistrationAuthentication.asmx/MobileAppLoad', mobileapploaddata, { headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json') }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AuthServiceProvider.prototype.remindmelater = function (remindmelaterdata) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(window.localStorage.getItem('clientURL') + 'services/AppUserRegistrationAuthentication.asmx/MobileRemindMeLater', remindmelaterdata, { headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json') }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AuthServiceProvider.prototype.MobilePinNumberValidate = function (pinnumbervalidate) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(window.localStorage.getItem('clientURL') + 'services/AppUserRegistrationAuthentication.asmx/MobilePinNumberValidate', pinnumbervalidate, { headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json') }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AuthServiceProvider.prototype.HomeClick = function (homeclickdate) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(window.localStorage.getItem('clientURL') + 'services/AppUserRegistrationAuthentication.asmx/HomeClickIOS', homeclickdate, { headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json') }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AuthServiceProvider.prototype.MobilePInChangeIOS = function (Changepindata) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(window.localStorage.getItem('clientURL') + 'services/AppUserRegistrationAuthentication.asmx/MobilePInChangeIOS', Changepindata, { headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json') }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AuthServiceProvider.prototype.UnregisterIOS = function (unregisterdata) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(window.localStorage.getItem('clientURL') + 'services/AppUserRegistrationAuthentication.asmx/UnRegisterUserIOS', unregisterdata, { headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json') }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AuthServiceProvider.prototype.GetLattitudeAndLongtitueIOS = function (getlattitudeandlongtitueiosdata) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(window.localStorage.getItem('clientURL') + 'services/AppUserRegistrationAuthentication.asmx/GetLattitudeAndLongtitueIOS', getlattitudeandlongtitueiosdata, { headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json') }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AuthServiceProvider.prototype.CheckInAndCheckoutIOS = function (checkinandcheckoutdata) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(window.localStorage.getItem('clientURL') + 'services/AppUserRegistrationAuthentication.asmx/CheckInAndCheckoutIOS', checkinandcheckoutdata, { headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json') }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                //alert(JSON.stringify(err));
                console.log(err);
            });
        });
    };
    AuthServiceProvider.prototype.CheckInAndCheckoutImageProcessing = function (checkinandcheckoutimagedata) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(window.localStorage.getItem('clientURL') + 'services/AppUserRegistrationAuthentication.asmx/CheckInAndCheckoutImageProcessingIOS', checkinandcheckoutimagedata, { headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json') }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AuthServiceProvider.prototype.checkNetwork = function () {
        if (this.network.type != "none") {
            return true;
        }
        else {
            return false;
        }
    };
    AuthServiceProvider.prototype.startInterver = function () {
        var _this = this;
        this.intervel = setInterval(function () {
            if (_this.checkNetwork()) {
                console.log(window.sessionStorage.getItem('networkstate'));
            }
            else {
                clearInterval(_this.intervel);
            } // Now the "this" still references the component
        }, 1000);
    };
    AuthServiceProvider.prototype.forgotpin = function (forgotpindata) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(window.localStorage.getItem('clientURL') + 'services/AppUserRegistrationAuthentication.asmx/ForgetPin', forgotpindata, { headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json') }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AuthServiceProvider.prototype.notificationClick = function (notificationclickiosdata) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(window.localStorage.getItem('clientURL') + 'services/AppUserRegistrationAuthentication.asmx/NotificationClickIOS', notificationclickiosdata, { headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json') }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AuthServiceProvider.prototype.CheckRegularize = function (checkreulrizeddata) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(window.localStorage.getItem('clientURL') + 'services/AppUserRegistrationAuthentication.asmx/CheckRegularize', checkreulrizeddata, { headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json') }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AuthServiceProvider.prototype.OfficeCheckInOut = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(window.localStorage.getItem('clientURL') + 'services/AppUserRegistrationAuthentication.asmx/OfficeInOutList', '', { headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json') }).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AuthServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_network__["a" /* Network */]])
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 726:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_device___ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_splash_splash__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_version__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_network__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_push__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_crypto_js__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_auth_service_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_keyboard__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_safari_view_controller__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var MyApp = /** @class */ (function () {
    function MyApp(safariViewController, keyboard, toastCtrl, authservice, push, network, alertCtrl, platform, device, statusBar, appVersion, splashScreen) {
        var _this = this;
        this.safariViewController = safariViewController;
        this.keyboard = keyboard;
        this.toastCtrl = toastCtrl;
        this.authservice = authservice;
        this.push = push;
        this.network = network;
        this.alertCtrl = alertCtrl;
        this.appVersion = appVersion;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_splash_splash__["a" /* SplashPage */];
        platform.ready().then(function () {
            // to initialize push notifications
            // to initialize push notifications
            var options = {
                android: {
                    senderID: "1078039065494"
                },
                ios: {
                    alert: true,
                    badge: true,
                    sound: true,
                    fcmSandbox: true,
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
            var pushObject = _this.push.init(options);
            pushObject.on('notification').subscribe(function (notification) {
                console.log('Received a notification', JSON.stringify(notification));
                var notificationParam = notification.additionalData.param1;
                var checkNotifiForegrnd = notification.additionalData.foreground;
                console.log(checkNotifiForegrnd);
                window.localStorage.setItem('notificationParam', notificationParam);
                if (checkNotifiForegrnd == true) {
                    //clickNotification = 0;
                    window.localStorage.setItem('clickNotification', '0');
                    if (window.localStorage.getItem('isregistered') === '1') {
                        if (sessionStorage.getItem('mPin') === null) {
                            window.localStorage.setItem('clickNotification', '1');
                            var toast = _this.toastCtrl.create({
                                message: notification.message,
                                duration: 3000,
                                position: 'top'
                            });
                            toast.onDidDismiss(function () {
                                console.log('Dismissed toast');
                            });
                            toast.present();
                        }
                        else {
                            var alert_1 = _this.alertCtrl.create({
                                title: '',
                                subTitle: notification.message,
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        handler: function () {
                                        }
                                    },
                                    {
                                        text: 'View',
                                        handler: function () {
                                            //this.showLoading();
                                            //this.showLoading();
                                            var res;
                                            _this.pin = __WEBPACK_IMPORTED_MODULE_9_crypto_js___default.a.SHA256(sessionStorage.getItem('mPin')).toString(__WEBPACK_IMPORTED_MODULE_9_crypto_js___default.a.enc.Hex);
                                            window.localStorage.setItem('clickNotification', '0');
                                            var notificationclickiosdata = {
                                                "RegistrationId": window.localStorage.getItem('Token'),
                                                "MobilePIN": _this.pin
                                            };
                                            _this.authservice.notificationClick(JSON.stringify(notificationclickiosdata))
                                                .then(function (data) {
                                                res = data;
                                                if (res.d.ErrFlag == 0) {
                                                    // this.hideLoading();
                                                    var notificationWebURL_1 = window.localStorage.getItem('clientURL') + res.d.PageName + "?SessionKey=" + res.d.SessionKey + "&MobilePin=" + _this.pin + "&param1=" + window.localStorage.getItem('notificationParam');
                                                    _this.safariViewController.isAvailable()
                                                        .then(function (available) {
                                                        if (available) {
                                                            _this.safariViewController.show({
                                                                url: notificationWebURL_1,
                                                                hidden: false,
                                                                animated: false,
                                                                transition: 'curl',
                                                                enterReaderModeIfAvailable: true,
                                                                tintColor: '#ff0000'
                                                            })
                                                                .subscribe(function (result) {
                                                                if (result.event === 'opened')
                                                                    console.log('Opened');
                                                                else if (result.event === 'loaded')
                                                                    console.log('Loaded');
                                                                else if (result.event === 'closed')
                                                                    console.log('Closed');
                                                            }, function (error) { return console.error(error); });
                                                        }
                                                        else {
                                                            console.log("==================== 1 ");
                                                            // use fallback browser, example InAppBrowser
                                                            // window1.open(notificationWebURL, '_blank', 'location=yes,closebuttoncaption=Close,EnableViewPortScale=yes');
                                                        }
                                                    });
                                                }
                                                else {
                                                    //  this.hideLoading();
                                                    // this.showToast(res.d.ErrMessage);
                                                }
                                            }).catch(function (error) {
                                                //this.hideLoading();
                                                //this.showToast(error.toString());
                                            });
                                        }
                                    }
                                ],
                                enableBackdropDismiss: false // <- Here! :)
                            });
                            alert_1.present();
                        }
                    }
                }
                else {
                    //clickNotification = 1;
                    window.localStorage.setItem('clickNotification', '1');
                }
            });
            pushObject.on('registration').subscribe(function (registration) {
                //alert('Device registered'+ JSON.stringify(registration.registrationId));
                window.localStorage.setItem('Token', registration.registrationId);
            });
            pushObject.on('error').subscribe(function (error) {
                alert('Error with Push plugin' + JSON.stringify(error));
            });
            //alert(sessionStorage.getItem('mPin'));
            //let status bar overlay webview
            statusBar.overlaysWebView(false);
            keyboard.hideFormAccessoryBar(false);
            // set status bar to white
            statusBar.backgroundColorByHexString('#ffffff');
            splashScreen.hide();
            _this.appVersion.getVersionNumber().then(function (version) {
                //alert(version);
                window.localStorage.setItem('buildVersion', version);
            });
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/icommmac/Desktop/Rajesh/FHRIOS/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/icommmac/Desktop/Rajesh/FHRIOS/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_12__ionic_native_safari_view_controller__["a" /* SafariViewController */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_10__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_push__["a" /* Push */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_device___["a" /* Device */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_version__["a" /* AppVersion */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtpverifyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__updatepin_updatepin__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the OtpverifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OtpverifyPage = /** @class */ (function () {
    function OtpverifyPage(alertCtrl, navCtrl, network, toastCtrl, loadingCtrl, elementRef, navParams, authservice) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.network = network;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.elementRef = elementRef;
        this.navParams = navParams;
        this.authservice = authservice;
        this.otpForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({ otpinput: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]() });
        this.navCtrl.swipeBackEnabled = false;
        var disconnectSubscription = this.network.onDisconnect().subscribe(function () {
            var toast = _this.toastCtrl.create({
                message: 'Please check your internet connection. And try again',
                duration: 3000,
                position: 'bottom'
            });
            toast.onDidDismiss(function () {
                console.log('Dismissed toast');
            });
            toast.present();
        });
        // watch network for a connection
        var connectSubscription = this.network.onConnect().subscribe(function () {
            var toast = _this.toastCtrl.create({
                message: 'Internet connected!',
                duration: 3000,
                position: 'bottom'
            });
            toast.onDidDismiss(function () {
                console.log('Dismissed toast');
            });
            toast.present();
        });
    }
    OtpverifyPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    OtpverifyPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    OtpverifyPage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    OtpverifyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OtpverifyPage');
    };
    OtpverifyPage.prototype.ionViewDidPause = function () {
    };
    OtpverifyPage.prototype.otpSubmit = function () {
        var _this = this;
        if (this.otpForm.value.otpinput == null || this.otpForm.value.otpinput == '') {
            this.showToast('Please enter OTP');
        }
        else {
            if (this.otpForm.value.otpinput.length == 5) {
                this.showLoading();
                this.otpvalidatedata = {
                    RegistrationId: window.localStorage.getItem('Token'),
                    OTP: this.otpForm.value.otpinput
                };
                if (this.network.type == 'none') {
                    this.hideLoading();
                    this.showToast('Please check your internet connection. And try again');
                }
                else {
                    this.authservice.otpVerification(JSON.stringify(this.otpvalidatedata))
                        .then(function (data) {
                        _this.res = data;
                        if (_this.res.d.ErrFlag == 0) {
                            _this.hideLoading();
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__updatepin_updatepin__["a" /* UpdatepinPage */]);
                            window.localStorage.setItem('isotpverifyed', '1');
                        }
                        else {
                            _this.hideLoading();
                            _this.showToast(_this.res.d.ErrMessage);
                        }
                    });
                }
            }
            else {
                this.hideLoading();
                this.showToast('OTP should be 5 digit');
            }
        }
    };
    OtpverifyPage.prototype.resendSubmit = function () {
        var _this = this;
        window.localStorage.setItem('isOTPexpired', '0');
        this.ngOnInit();
        this.resendOTPdata = {
            RegistrationId: window.localStorage.getItem('Token')
        };
        if (this.network.type == 'none') {
            this.hideLoading();
            this.showToast('Please check your internet connection. And try again');
        }
        else {
            this.authservice.resendOTP(JSON.stringify(this.resendOTPdata))
                .then(function (data) {
                _this.res = data;
                //alert(this.res);
            });
        }
    };
    //Alert
    OtpverifyPage.prototype.showAlert = function (title, subtitle, alertcode) {
        var _this = this;
        if (alertcode == 1) {
            var alert_1 = this.alertCtrl.create({
                title: title,
                subTitle: subtitle,
                buttons: [
                    {
                        text: 'Retry',
                        handler: function () {
                            if (_this.authservice.checkNetwork()) {
                                _this.navCtrl.push(_this.navCtrl.getActive().component);
                            }
                            else {
                                _this.showAlert("Internet not available", "Cross check your internet connectivity and try again.", 1);
                            }
                            // this.navCtrl.swipeBackEnabled = false;
                            // this.MobileAppLoad();
                        }
                    }
                ],
                enableBackdropDismiss: false // <- Here! :)
            });
            alert_1.present();
        }
    };
    OtpverifyPage.prototype.ngOnInit = function () {
        var callDuration = this.elementRef.nativeElement.querySelector('#time');
        if (window.localStorage.getItem('isOTPexpired') === '1') {
            this.shouldHide = true;
            this.otpsubmitbtn = false;
            this.otpresendbtn = true;
        }
        else {
            this.otpsubmitbtn = true;
            this.otpresendbtn = false;
            this.shouldHide = false;
            this.startTimer(callDuration);
        }
    };
    OtpverifyPage.prototype.startTimer = function (display) {
        var _this = this;
        var timer = 60;
        var minutes;
        var seconds;
        var subscribetion = __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].interval(1000).subscribe(function (x) {
            minutes = Math.floor(timer / 60);
            seconds = Math.floor(timer % 60);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ":" + seconds;
            if (display.textContent == "00:00") {
                window.localStorage.setItem('isOTPexpired', '1');
                _this.shouldHide = true;
                _this.otpsubmitbtn = false;
                _this.otpresendbtn = true;
                subscribetion.unsubscribe();
            }
            --timer;
        });
    };
    OtpverifyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-otpverify',template:/*ion-inline-start:"/Users/icommmac/Desktop/Rajesh/FHRIOS/src/pages/otpverify/otpverify.html"*/'<!--\n  Generated template for the OtpverifyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  \n</ion-header>\n\n<ion-content >\n  <ion-item>\n  <img  src="assets/imgs/fhr_onthegologored.png"  id="imgPlacement"  style="width: 90%;height: 100px;border-width: 02px;\n  border-style: solid;padding: 10px; margin-left: 10px;margin-top: 20px; border-color:gray;display: block;border-radius: 10px;">\n  </ion-item>\n  <p text-center>Please Enter the OTP below to verify your mobile number</p>\n  <form [formGroup]="otpForm"  class="input-border">\n      \n  <ion-item style="width:70%;margin-left:15%;">\n      <ion-label color="ligh-grey" floating>Enter OTP</ion-label>\n      <ion-input formControlName="otpinput" maxlength="5" type="number"  required></ion-input> \n  </ion-item>\n  <ion-item style="width:70%;margin-left:15%;">\n      <ion-buttons>\n          <button ion-button full  type="submit" [disabled]="!otpsubmitbtn" (click)="otpSubmit()">Submit</button>\n      </ion-buttons>\n      </ion-item>\n  </form>\n  \n  <h5 style="text-align: center"><span   id="time" [hidden]="shouldHide"  class="text-primary">01:00</span></h5>\n\n  <ion-buttons text-center>\n      <button ion-button  type="submit" [hidden]="!otpresendbtn" (click)="resendSubmit()">Resend</button>\n  </ion-buttons>\n</ion-content>\n'/*ion-inline-end:"/Users/icommmac/Desktop/Rajesh/FHRIOS/src/pages/otpverify/otpverify.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], OtpverifyPage);
    return OtpverifyPage;
}());

//# sourceMappingURL=otpverify.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__otpverify_otpverify__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_network__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_safari_view_controller__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = /** @class */ (function () {
    function RegisterPage(safariViewController, alertCtrl, network, device, navCtrl, toastCtrl, authservice, loadingCtrl, navParams, appVersion) {
        var _this = this;
        this.safariViewController = safariViewController;
        this.alertCtrl = alertCtrl;
        this.network = network;
        this.device = device;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.authservice = authservice;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.appVersion = appVersion;
        this.type = 'password';
        this.showPass = false;
        //console.log('Device model is: ' + this.device.model);
        this.registrationForm = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormGroup */]({
            clientID: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required]),
            userName: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required]),
            password: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required]),
            mobile: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].maxLength(12)]),
            isTosRead: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormControl */](false, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].requiredTrue])
        });
        //console.log(this.registrationForm.value.clientID);
        console.log(this.registrationForm);
        this.navCtrl.swipeBackEnabled = false;
        //network
        var disconnectSubscription = this.network.onDisconnect().subscribe(function () {
            var toast = _this.toastCtrl.create({
                message: 'Please check your internet connection. And try again',
                duration: 3000,
                position: 'bottom'
            });
            toast.onDidDismiss(function () {
                console.log('Dismissed toast');
            });
            toast.present();
        });
        // watch network for a connection
        var connectSubscription = this.network.onConnect().subscribe(function () {
            var toast = _this.toastCtrl.create({
                message: 'Internet connected!',
                duration: 3000,
                position: 'bottom'
            });
            toast.onDidDismiss(function () {
                console.log('Dismissed toast');
            });
            toast.present();
        });
    }
    RegisterPage.prototype.showAlert = function (title, subtitle, alertcode) {
        var _this = this;
        if (alertcode == 1) {
            var alert_1 = this.alertCtrl.create({
                title: title,
                subTitle: subtitle,
                buttons: [
                    {
                        text: 'Retry',
                        handler: function () {
                            if (_this.authservice.checkNetwork()) {
                                _this.navCtrl.push(_this.navCtrl.getActive().component);
                            }
                            else {
                                _this.showAlert("Internet not available", "Cross check your internet connectivity and try again.", 1);
                            }
                            // this.navCtrl.swipeBackEnabled = false;
                            // this.MobileAppLoad();
                        }
                    }
                ],
                enableBackdropDismiss: false // <- Here! :)
            });
            alert_1.present();
        }
    };
    RegisterPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    RegisterPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    RegisterPage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    RegisterPage.prototype.showPassword = function () {
        this.showPass = !this.showPass;
        if (this.showPass) {
            this.type = 'text';
        }
        else {
            this.type = 'password';
        }
    };
    RegisterPage.prototype.regForm = function () {
        var _this = this;
        if (this.network.type == 'none') {
            this.showToast('Please check your internet connection. And try again');
        }
        else {
            this.showLoading();
            this.userdata = {
                CompanyId: this.registrationForm.value.clientID,
                UserName: this.registrationForm.value.userName,
                Password: this.registrationForm.value.password,
                MobileNumber: this.registrationForm.value.mobile,
                RegistrationId: window.localStorage.getItem('Token'),
                VersionName: window.localStorage.getItem('buildVersion'),
                DeviceName: 'iOS',
                ModalName: 'iOS',
                DeviceUniqueID: this.device.uuid
            };
            console.log(JSON.stringify(this.userdata));
            //alert(this.registrationForm.value.clientID);
            //this.showLoading();
            //alert(JSON.stringify(this.userdata));
            this.authservice.addUser(JSON.stringify(this.userdata))
                .then(function (data) {
                _this.res = data;
                if (_this.res.d.ErrFlag == 0) {
                    _this.hideLoading();
                    window.localStorage.setItem('isregistered', '1');
                    window.localStorage.setItem('clientURL', _this.res.d.URL);
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__otpverify_otpverify__["a" /* OtpverifyPage */]);
                }
                else {
                    _this.hideLoading();
                    _this.showToast(_this.res.d.ErrMessage);
                }
                //alert(JSON.stringify(this.res.d));
                console.log(JSON.stringify(_this.res.d));
            });
        }
    };
    RegisterPage.prototype.OpenPolicy = function () {
        var _this = this;
        this.safariViewController.isAvailable()
            .then(function (available) {
            if (available) {
                _this.safariViewController.show({
                    url: 'http://www.formulahr.com/privacy_policy.html',
                    hidden: false,
                    animated: false,
                    transition: 'curl',
                    enterReaderModeIfAvailable: true,
                    tintColor: '#ff0000'
                })
                    .subscribe(function (result) {
                    if (result.event === 'opened')
                        console.log('Opened');
                    else if (result.event === 'loaded')
                        console.log('Loaded');
                    else if (result.event === 'closed')
                        console.log('Closed');
                }, function (error) { return console.error(error); });
            }
            else {
                console.log("================2 register");
                // use fallback browser, example InAppBrowser
            }
        });
        //window1.open('http://www.formulahr.com/privacy_policy.html','_blank','location=no,closebuttoncaption=Close');
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/icommmac/Desktop/Rajesh/FHRIOS/src/pages/register/register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- <ion-header>\n  <ion-navbar>\n    <ion-title>register</ion-title>\n \n</ion-header> -->\n\n\n<ion-content >\n  <ion-item>\n    <img  src="assets/imgs/fhr_onthegologored.png"  id="imgPlacement"  style="width: 90%;height: 100px;border-width: 02px;\n    border-style: solid;padding: 10px; margin-left: 10px;margin-top: 20px; border-color:gray;display: block;border-radius: 10px;">\n    </ion-item>\n  <!-- <img  src="assets/imgs/fhr_onthegologored.png"  id="imgPlacement"  style="width: 70%;height: 100px;border-width: 02px;\n  border-style: solid;padding: 10px; margin-left: 20px;margin-top: 10px; border-color:gray;display: block;border-radius: 10px;">\n   -->\n     <p text-center>Please login to begin using FormulaHR On the Go.</p>\n  \n    \n    <ion-list class="items-middle" text-center>\n      \n      <!-- use the [formGroup] directive to tell Angular that we want to use the registrationForm as the "FormGroup" for this form: -->\n      <form [formGroup]="registrationForm" class="input-border">\n             \n          <ion-item >\n              <ion-label color="ligh-grey" floating>Client ID</ion-label>\n              <ion-input  formControlName="clientID" type="text"  required></ion-input>\n              \n          </ion-item>\n        \n          <ion-item>\n              <ion-label color="ligh-grey" floating>User Name</ion-label>\n              <ion-input  formControlName="userName" type="text"  required></ion-input>\n          </ion-item>\n\n          <ion-item>\n              <ion-label color="ligh-grey" floating>Password</ion-label>\n              <ion-input  formControlName="password" type="{{type}}"  required></ion-input>\n              <button *ngIf="!showPass" ion-button clear color="dark" type="button" item-right (click)="showPassword()"> <ion-icon name="ios-eye-off-outline"></ion-icon></button>\n              <button *ngIf="showPass" ion-button clear color="dark" type="button" item-right (click)="showPassword()"> <ion-icon name="ios-eye-outline"></ion-icon></button> \n          </ion-item>\n          \n         <ion-item>\n                <ion-label color="ligh-grey" floating>Mobile Number</ion-label>\n                <ion-input  formControlName="mobile" type="number" pattern="[0-9]*"  required></ion-input>\n         </ion-item>\n\n          <ion-item>\n            <input type="checkbox" formControlName="isTosRead"><a href="#" (click)="OpenPolicy()"> Terms & condition </a>\n          </ion-item>\n          <!-- We can check if our form is valid: -->\n          \n      </form>\n      <ion-buttons style="padding-left:10px;padding-right:10px;">\n        <button ion-button full  type="submit" [disabled]="!registrationForm.valid" (click)="regForm()">Register</button>\n    </ion-buttons>\n  </ion-list>\n  \n\n</ion-content>\n'/*ion-inline-end:"/Users/icommmac/Desktop/Rajesh/FHRIOS/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__ionic_native_safari_view_controller__["a" /* SafariViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version__["a" /* AppVersion */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ })

},[318]);
//# sourceMappingURL=main.js.map