
// Filename: app.js
    define([
      'config'
    ],
      function (Config) {


          var initialize = function () {
              WinJS.Binding.optimizeBindingReferences = true;
              var app = WinJS.Application;
              var activation = Windows.ApplicationModel.Activation;
              WinJS.Application.onsettings = function (e) {
                  e.detail.applicationcommands = {
                      "aboutSettings": { title: "About", href: Config.about },
                      "privacySettings": { title: "Privacy Policy", href: Config.privacy }
                  };
                  WinJS.UI.SettingsFlyout.populateSettings(e);
              };

              WinJS.Application.start();
          };
      return {
          initialize: initialize
      };
  });



