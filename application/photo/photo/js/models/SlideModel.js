define([
	'backbone',
    'config'
	], function(Backbone,Config) {
		var SlideModel = Backbone.Model.extend({
		    defaults: {
		        title: '',
                description:''
		    }
		});

		return SlideModel;
});