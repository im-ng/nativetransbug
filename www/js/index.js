//
// index.js
// Native transition landscape issue
//
// demo application to explain the issue
// Created by ng on 22-04-2015
//
'use strict';
var serviceLocator;
var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    console.log('Received Event: ' + id);
    //post device ready event
    //trigger actual view handlers of the pages
    serviceLocator = new LoginHandler();
  },
  onBackKeyDown: function() {
    navigator.notification.confirm(
      'Do you really want to exit?',
      exitApp,
      'Exit',
      'Cancel,OK'
    );
  },
  exitApp: function() {
    console.log("Using navigator.App.exitApp().");
    navigator.app.exitApp();
  }
};

app.initialize();

var LoginHandler = function() {
  var self = this;
  self.menuView = undefined;
  self.initializeView = function() {
    //lockScreenOrientation
    self.lockScreenOrientation();
    //load service handlers
    self.menuView = new menuHandler();
    //load defaults if any
    self.signInBtn = $('#signin');
    //update renderview
    self.renderView();
  };

  self.renderView = function() {
    //control handlers and other views
    self.signInBtn.on('click', function() {
      //post authentication and redirect to menu
      self.loadMenuHandlerView();
    });
  };

  self.loadMenuHandlerView = function() {
    self.menuView.initializeView();
  };

  self.signoutFromView  = function() {
      window.location = "index.html";
  };

  self.lockScreenOrientation = function() {
    self.screenlock = cordova.plugins.screenorientation;
    if (self.screenlock !== undefined) {
      //lock screen in portrait
      self.screenlock.setOrientation("portrait-primary");
    }
  };

  self.initializeView();
};
