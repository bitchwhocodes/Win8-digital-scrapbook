// Filename: app.js
define([
  'mainview',
  'slidermodel',
  'winapp'
], 
  function (MainView, SliderModel,WinApp) {
      var initialize = function () {
         
        WinApp.initialize();
  	    var slideModel = new SliderModel();
  	    var mainView = new MainView({ model: slideModel });
  	};

      return { 
      initialize: initialize
    };
});