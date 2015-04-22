//
// menu.js
// Native transition landscape issue
//
// demo application to explain the issue
// Created by ng on 22-04-2015
//
'use strict';

var menuHandler = function() {
  var self = this;

  self.initializeView = function(data) {
    //load if any defaults
    self.containerView = $('#topContainerView');

    //register document ready event
    self.registerDeviceReady();

    //lock screen orientations
    self.lockScreenOrientation();

    //load default view
    self.loadDefaultView();

    //update renderview
    self.renderView();
  };

  self.renderView = function(data) {
    self.containerView.html(self.menuContainerViewWrapper());
    var options = {
      "direction": "left",
      "duration": 900,
      "slowdownfactor": 4,
      "iosdelay": 0,
      "androiddelay": 0,
      "winphonedelay": 0,
      "href": null
    };
    window.plugins.nativepagetransitions.slide(
      options,
      function(msg) {
        self.signout  = $('#signout');
        self.signout.on('click', function() {
            self.moveToSignoutView();
        });
      },
      function(msg) {
        navigator.notification.alert('Sorry, unable to transition on this page', function(){}, 'Error', 'Ok');
      }
    );
  };

  self.menuContainerViewWrapper = function() {
    return Handlebars.compile($('#mainmenuViewWrapper').html());
  };

  self.lockScreenOrientation = function() {
    self.screenlock = cordova.plugins.screenorientation;
    if (self.screenlock !== undefined) {
      //lock screen in portrait
      self.screenlock.setOrientation("portrait-primary");
    }
  };

  self.loadDefaultView = function() {
    self.containerView.html('');
  };

  self.moveToSignoutView  = function() {
      serviceLocator.signoutFromView();
  };

  self.registerDeviceReady = function(data) {
    document.addEventListener("deviceready", self.onDeviceReady, false);
  };

  self.onDeviceReady = function(data) {
    document.addEventListener("backbutton", self.onBackKeyDown, false);
  };

  self.onBackKeyDown = function() {
    navigator.notification.confirm(
      'Are you sure you want to leave so soon?',
      serviceLocator.signoutFromView,
      'Exit', ['Cancel', 'Ok']
    );
  };

  self.exitApp = function(results) {
    if (results !== undefined && results == 2) {
      navigator.app.exitApp();
    }
  };

  self.lockScreenOrientation = function() {
    self.screenlock = cordova.plugins.screenorientation;
    if (self.screenlock !== undefined) {
      //lock screen in portrait
      self.screenlock.setOrientation("landscape-primary");
    }
  };
};
