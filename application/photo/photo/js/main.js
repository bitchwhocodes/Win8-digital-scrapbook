require.config({
    paths: {
        'underscore': '/js/libs/underscore/underscore-min',
        'jquery': '/js/libs/jquery/jquery',
        'backbone': '/js/libs/backbone/backbone-min',
        'slidemodel': '/js/models/SlideModel',
        'slidermodel': '/js/models/SliderModel',
        'mainview': '/js/views/MainView',
        'hammer':'/js/libs/superslides/hammer.min',
        'slidecollection':'/js/models/SlideCollection',
        'config': '/js/config/config',
        'jqueryeasing': '/js/libs/jquery/jquery.easing',
    }
});

require([
  // Load our app module and pass it to our definition function
 'app',

], function (App) {
  App.initialize();
});