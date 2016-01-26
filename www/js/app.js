'use strict';
// Ionic trinibiz App

angular.module('trinibiz', [
  'ionic',
  'ionic-toast',
  'ionic.rating',
  'trinibiz.controllers',
  'trinibiz.directives',
  'trinibiz.services',
  'trinibiz.routes',
  'jett.ionic.filter.bar',
  'ngCordova',
  'ngMessages',
  'mm.acl'
])

.constant("AUTH_EVENTS", {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})
.constant("GUEST_USER",{role: 'guest',user: null})
.constant("USER_ROLES", {
    user: 'regular',
    guest: 'guest',
    owner: 'owner',
    sprovider: 'service provider',
})
.constant('$ionicLoadingConfig', {
  template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>',
  duration: 100
})
.value('AppName', 'TriniBiz')


.run(['$ionicPlatform','$rootScope','USER_ROLES', 'GUEST_USER','AclService','RolesPermissions','UserService' , (function($ionicPlatform,$rootScope,USER_ROLES, GUEST_USER,AclService,RolesPermissions,UserService) {

Parse.initialize("QjbA9I9QfG8ezwEpWjGgyh4xxGJGMQzzo0HISCtZ","vELvekFTQGbDksDZWaoDudqPnZYc7ILyPFhNVmmA");

AclService.setAbilities(RolesPermissions);

AclService.attachRole(USER_ROLES.guest);

// $sessionStorage["allBusinesses"] = [];
// $sessionStorage["categoryBusinesses"] = {};
//$sessionStorage["ownerBusinesses"] = [];


var user = Parse.User.current();

if(!angular.equals(user,{})&& user !== null && user !== undefined){
  UserService.initialiseSession(user);
}
else{
  $rootScope.sessionUser = GUEST_USER;
}

  if(!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())){
      window.fbAsyncInit = function() {
        Parse.FacebookUtils.init({
            appId      : '{529786353842979}',
            status     : true,
            cookie     : true,
            xfbml      : true,
            version    : 'v2.3'
        });
      };

      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
  }

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
})
])
