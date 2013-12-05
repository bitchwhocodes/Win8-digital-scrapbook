
define([],
  function () {
      return {
          url: 'http://localhost:8888/photography/wordpress/?wpapi=get_posts&dev=1',
          useWordPress:true,
          // local would be url: "ms-appx:///data/data.json",         
          privacy: 'http://localhost:8888/photography/privacy',
          about:'http://localhost:8888/photography/about',
          animationType: 'fade',/*fade*/
          animationTime: 1000,
          pauseTime: 8000,
          showCaptions: true,
          mainTitle: 'Images<span class="itl">of</span>New York',
          subTitle: 'Stacey Mulcahy',
          instagramUserId: '',
          instagramClientId:'',
          instagramTag:''
      };
  });