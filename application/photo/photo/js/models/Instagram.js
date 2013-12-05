// Filename: app.js
define([
  'jquery',
], 
  function ($) {
      var clientId='';
      var baseUrl = 'https://api.instagram.com/v1';
      var initialize = function (client_Id) {
          clientId = client_Id;
      };

      var endPoints = {
          'getRecentMediaByTag': '/tags/{tag}/media/recent',
          'getPopularMedia': '/media/popular',
          'getMediaInLonLat': '/media/search',
          'getLocations': '/locations/search',
          'getMediaByLocationId': '/locations/{location-id}/media/recent',
          'searchTagsByName': '/tags/search',
          'getRecentMediaByUser':'/users/{user-id}/media/recent'
  }


    var getRecentMediaByTag = function (tag, options) {
        if (!options) {
            options = {};
        }
        var url = endPoints['getRecentMediaByTag']
        var newUrl = url.replace('{tag}', tag);
        return (makeJSONRequest(newUrl, options));
    }

  var getRecentMediaByUser = function (id, options) {
      if (!options) {
          options = {};
      }

      var url = endPoints['getRecentMediaByUser']
      var newUrl = url.replace('{user-id}', id);
      return (makeJSONRequest(newUrl, options));
  }


  var getPopularMedia = function () {
      var url = endPoints['getPopularMedia']
      return (makeJSONRequest(url));
  }


  var getMediaInLonLat = function (options) {
      var url = endPoints['getMediaInLonLat']
      var data = { 'lng': options.lng, 'lat': options.lat };
      return (makeJSONRequest(url, data));
  }
  var getLocations = function (options) {
      // needs to be sorted
      var url = endPoints['getLocations']
      var data = { 'lng': options.lng, 'lat': options.lat };
      return (makeJSONRequest(url, data));
  }
  var getMediaByLocationId = function (location_id, options) {
      if (!options) {
          options = {};
      }
      var url = endPoints['getMediaByLocationId']
      var newUrl = url.replace('{location-id}', location_id);
      return (makeJSONRequest(newUrl, options));
  }
  var searchTagsByName = function (name) {
      var url = endPoints['searchTagsByName']
      var data = { 'q': name };
      return (makeJSONRequest(url, data));
  }

  var getNextUrl = function (url) {
      var jqxhr = $.getJSON(url);
      return (jqxhr);
  }

  var makeJSONRequest = function (url, data) {
      var self = this;
      if (!data) { data = {} }
      var modUrl = baseUrl + url;
      console.log(modUrl);
      data.client_id = clientId;
      var jqxhr = $.getJSON(modUrl, data);
      return (jqxhr);

  }




  return {
      // public properties
      initialize: initialize,
      searchTagsByName: searchTagsByName,
      getMediaInLonLat: getMediaInLonLat,
      getPopularMedia: getPopularMedia,
      getRecentMediaByTag: getRecentMediaByTag,
      getLocations: getLocations,
      getMediaByLocationId: getMediaByLocationId,
      getNextUrl: getNextUrl,
      getRecentMediaByUser: getRecentMediaByUser

  }

   
  });



