# cordova-facebook-connect-plugin 

## Use the phonegap-facebook-connect-plugin in Browser based development.  

[![Build Status](https://travis-ci.org/patnolanireland/cordova-facebook-connect-plugin.svg)](https://travis-ci.org/patnolanireland/cordova-facebook-connect-plugin) ![Bower](https://img.shields.io/badge/bower-cordova--facebook--connect--plugin-blue.svg)
---

##Overview

This code is only used when developing in the Browser and is not used when deployed to the device.  It has been created to fulfill the use case of Developing with
Ionic Framework.

## Usage

1. Install

        bower install cordova-facebook-connect-plugin 

2. Ensure that the cordova-facebook-connect-plugin.js file is included (not necessary if wiredep is used) 
        <script src="bower_components/moment/moment.js></script>
        <script src="bower_components/angular/angular.js></script>
        <script src="bower_components/cordova-facebook-connect-plugin/lib/cordova-facebook-connect-plugin.js></script>

3. If used in conjunction with ngCordova and $cordovaFacebook you should configure the app as follows:

		.config(function($cordovaFacebookProvider) {
			ionic.Platform.ready(function() {
				if(!window.cordova || window.cordova && window.cordova.platformId === 'browser') {
					$cordovaFacebookProvider.browserInit(/*your facebook APP_ID here*/, 'v2.0');
				}
			});
		})
 
## Licence

cordova-facebook-connect-plugin is licensed under the MIT Open Source license. For more information, see the LICENSE file in this
repository.

## Copywrite

Credit goes to the original copywrite holder and is copied directly from the original file

		/*
		* @author Ally Ogilvie
		* @copyright Wizcorp Inc. [ Incorporated Wizards ] 2014
		* @file - facebookConnectPlugin.js
		* @about - JavaScript interface for PhoneGap bridge to Facebook Connect SDK
		*
		*
		*/
