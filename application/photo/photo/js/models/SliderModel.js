define([
	'backbone',
    'config',
    'slidecollection'
], function(Backbone,Config,SliderCollection) {
    var SliderModel = Backbone.Model.extend({
        defaults: {
       
            animationTime: 1000,
            animationType: 'fade',
            slideDirection:'left',
            pauseTime: 4000,
            collection: null,
            selectedIndex: 0,
            privacy: '',
            about: '',
            url: '',
            showCaptions:false
        },
        initialize: function () {
            this.collection = new SliderCollection();
            this.set({ 'animationTime': (Config.animationTime != null) ? Config.animationTime : this.get('animationTime') });
            this.set({ 'animationType':(Config.animationType != null) ? Config.animationType : this.get('animationType')});
            this.set({ 'pauseTime': (Config.pauseTime != null) ? Config.pauseTime : this.get('pauseTime') });
            this.set({ 'showCaptions': (Config.showCaptions != null) ? Config.showCaptions : this.get('showCaptions') });
            this.set({ 'backgroundColor': (Config.backgroundColor != null) ? Config.backgroundColor : this.get('backgroundColor') });

        },
        goNext: function () {
            var len = this.collection.length;
            var index = this.get('selectedIndex');
            var next = (index < len - 1) ? index + 1 : 0;
            this.set({ 'selectedIndex': next });
        },

        goPrevious: function () {
            var index = this.get('selectedIndex');
            var previous = (index > 0) ? index - 1 : this.collection.length - 1;
            this.set({ 'selectedIndex': previous })
        }
       

});

return SliderModel;
});