
define([
	'backbone',
    'slidemodel',
    'config',
    'underscore',
], function (Backbone, SlideModel, Config,_) {
    var SlideCollection = Backbone.Collection.extend({
        model:SlideModel,
        url: Config.url,
        parse: function (response) {
            /*We are returning just the posts here*/
            var posts = _.filter(response.posts, function(obj){ return obj['type'] == 'post'});
            return posts;
        },
    });

    return SlideCollection;
});