
define([
	'backbone',
    'slidemodel',
    'config',
    'underscore',
    'instagram'
], function (Backbone, SlideModel, Config,_,Instagram) {
    var SlideCollection = Backbone.Collection.extend({
        model:SlideModel,
        url: Config.url,
        local: false,
        useInstagram: false,
        useTags:false,
        initialize: function () {
            this.local = (Config.url && Config.url.indexOf('ms-appx') !== -1) ? true : false;
            this.useInstagram = ((Config.instagramClientId.length)) ? true : false;
            // Assuming you used tags or didn't.
            if (this.useInstagram) {
                this.useTags = ((Config.instagramTag.length)) ? true : false;
            }
        },

        /*
            Need to redo this entirely , not scalable at all. Hackilicous. 
        */
        fetch: function (options) {

            if (Config.useWordPress == true) {
                return Backbone.Collection.prototype.fetch.call(this, options);
            }
            var dfd = new jQuery.Deferred();
            var that = this;
            if (this.local === true)
            {
                var url = new Windows.Foundation.Uri(Config.url);
                Windows.Storage.StorageFile.getFileFromApplicationUriAsync(url).then(function (file) {
                    Windows.Storage.FileIO.readTextAsync(file).then(function (text) {
                        var parsedObject = JSON.parse(text);
                        that.reset(parsedObject)
                    });
                });
                return (dfd.promise());
            }

            else if (this.useInstagram === true) {
                Instagram.initialize(Config.instagramClientId);
                if (this.useTags) {
                    Instagram.getRecentMediaByTag(Config.instagramTag).done(function (results) {
                        var data = that.parseInstagram(results);
                        that.reset(data);
                        dfd.resolve();
                    }, function (err) {
                        dfd.reject(err);
                    });
                } else {

                    Instagram.getRecentMediaByUser(Config.instagramUserId).done(function (results) {
                        var data = that.parseInstagram(results);
                        that.reset(data);
                        dfd.resolve();
                    }, function (err) {
                        dfd.reject(err);
                    });
                }
            }

            return (dfd.promise());
         
        },

        parseInstagram:function(response)
        {
            var items = response.data;
            var returnObject = {};
            returnObject.posts = [];
            var len = items.length;
            for (var i = 0; i < len; i++) {
                console.log(len);
                var item = {};
                var obj = items[i];
              
                item.title = (obj.caption != undefined) ? obj.caption.text : "";
                var image = obj.images.standard_resolution;
                item['images'] = { src: image.url, width: image.width, height: image.height };
                returnObject.posts.push(item);
            }
            console.log("return");
            return (returnObject.posts);
        
        },


        parse: function (response) {
            
            /*We are returning just the posts here*/
            if (this.local || this.useInstagram == true) {
               
                return response.posts;
            }
            var posts = _.filter(response.posts, function(obj){ return obj['type'] == 'post'});
            return posts;
        },
    });

    return SlideCollection;
});