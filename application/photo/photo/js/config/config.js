// Filename: config.js
define([],
  function () {
      // put your url here for config - it should be your wordpress 
      return {
          url: 'http://localhost:8888/photography/wordpress/?wpapi=get_posts&dev=1',
          privacy: 'http://localhost:8888/photography/privacy',
          about:'http://localhost:8888/photography/about',
          animationType: 'fade',/*fade*/
          animationTime: 1000,
          pauseTime: 8000,
          showCaptions: true,
          backgroundColor:'#000000'
      };
  });