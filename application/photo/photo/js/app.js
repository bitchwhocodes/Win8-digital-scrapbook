// Filename: app.js
define([
  'mainview',
  'slidermodel',
], 
  function (MainView, SliderModel) {
  	var initialize = function() {
  	    var slideModel = new SliderModel();
        var mainView = new MainView({model: slideModel});
  	};
    return { 
      initialize: initialize
    };
});