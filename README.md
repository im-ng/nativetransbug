
This repo given to show case the problem with NativePageTransition cordova plugin. Do clone this repository, follow the reproduce step on iOS8 device or simulator.

##Problem
When I am trying to navigate from portrait view page (page1) to landscape page view (page2), page view shrank and black screen seen.

##Reproduce
  // add ios platform to code

    cordova platform add ios

  // add screen orientation plugin

    cordova plugin add net.yoik.cordova.plugins.screenorientation

  // add page transition plugin

    cordova plugin add com.telerik.plugins.nativepagetransitions

  // prepare final project

    cordova prepare


  // Now run the project on any iOS 8 device or simulator.

  // Navigate from login page (portrait view) to menu list page(landscape view)

  // Bingo, the black screen will seen with shrunken display view
