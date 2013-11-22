define([
	'jquery',
    'underscore',
	'backbone',
	'slidecollection',
    'jqueryeasing',

    'config',
    'slidermodel',
    'hammer'
 

],
	function ($, _, Backbone, SlideCollection, Jeasing,config,slidermodel,hammer) {
	    
	    var MainView = Backbone.View.extend({
	        
	        // set the element
            el:$('body'),
            template: _.template($('#slide-template').html()),
            prevElement: null,
            currentItem:null,
            slider: $('.slides-container'),
            intervalId:null,
       
	        initialize: function (options) {
	            var that = this;
	            this.model = options.model;
	            this.model.on('change:selectedIndex', $.proxy(this.handleIndexChange, this));
	            this.model.initialize();
	            this.model.collection.fetch({ success: $.proxy(that.render, that),error:$.proxy(that.handleError,that) });

	         
	     
	            var element = document.getElementById('slidelist');
	            var hammertime = Hammer(element, { swipe: true }).on("swipeleft", function (event) {
	                that.model.set({ 'slideDirection': 'left' });
	                that.goNext();

	            });

	            var hammertime = Hammer(element, { swipe: true }).on("swiperight", function (event) {
	                that.model.set({ 'slideDirection': 'right' });
	                that.goPrevious();
	            });

        
                
	        },

	        handleError:function(obj,data)
	        {
	            $('.status').text("Oops! There was a problem getting the data.").fadeIn(1000);
	        },
	        handleIndexChange:function()
	        {
	           
	            var that = this;
	            var selectedIndex = this.model.get('selectedIndex');
	            var li = $(this.slider).find('li');
	            this.currentItem = $(this.slider).find('li').get(selectedIndex);
	            this.prevElement = $(this.slider).find('.active');
	            $(this.prevElement).removeClass('active');
	            $(this.currentItem).addClass('active');

                
	            var animationType = this.model.get('animationType');
	            if (animationType == "fade")
	            {
	                $(this.currentItem).fadeIn(this.model.animationTime, function () { that.itemFinished(this) });
	                $(this.prevElement).fadeOut(this.model.animationTime);
	               
	            }

	            if (animationType == "slide")
	            {
	                // need to determine direction
	                var direction = this.model.get('slideDirection');
	                var multiplier = (direction == "left") ? 1 : -1;
	                $(this.currentItem).css({ 'left': $(this.currentItem).width()*multiplier}).show();
	                $(this.currentItem).animate({ 'left': 0 }, this.model.animationTime, function () { that.itemFinished(this) })
	                $(this.prevElement).animate({ 'left': (multiplier*-1) * ($(this.prevElement).width()) }, this.model.animationTime);

	            }
	            
	        },

	      

	        goNext: function () {
	            this.pause();
	            this.model.goNext();

	        },
	        goPrevious: function () {

	            this.pause();
	            this.model.goPrevious();

	        },
	        getActiveSlide: function () { },
	        setActiveSlide: function () { },
	       

	        transitionItems:function()
	        {
	            
	            var that = this;
                // if there is no starting element
	            if (!this.currentElement)
	            {
	                this.currentElement = this.slider.find('li')[0];
	                $(this.currentElement).addClass('active');
	            }

	            if (!this.prevElement) {
	    
	                $(this.currentElement).fadeIn(this.model.get('animationTime'), function () { that.itemFinished(this) });
	            } 

	        },

	        pause: function () {
	            clearInterval(this.intervalId);
	        },

	        itemFinished:function(item)
	        {
	            if(this.model.get('showCaptions'))
	            {
	                $(item).find('.title').show().animate({ 'bottom': 0 }, 500);
	                var title = $(this.prevElement).find('.title')
	              
	                $(title).css({'bottom':(-1*$(title).height())})
	            }
	            this.intervalId = setInterval($.proxy(this.complete,this), this.model.get('pauseTime'), this);
	        },

	        complete: function (item) {
	       
	            // check if we show captions
                
	            clearInterval(this.intervalId);
	            this.model.goNext();
	        },


            /* images loaded */
	        onImageLoaded:function(img,len,index)
	        {
                
	            $('.status').text('Loaded ' + index + ' of ' + len + ' images');
	            if (len == index) {
	                var that = this;
	              
	                $('#intro').fadeOut(this.model.get('animationTime'), function () {
	                    that.transitionItems();
	                });
	            }
	        },

	        render: function () {
	            
	            var height = $(document).height();
	          
	            var that = this;
	            var len = this.model.collection.length;
	            var items = 0;
	            var html = '';
	            for (var i = 0; i < len; i++)
	            {
	                var m = this.model.collection.at(i);
	               
	                html += (this.template(m.toJSON()));
	                if (m.get('type') == 'post') {
	                    
	                    items++;
	                } 
	            }
	            var count = 0;

	            $('.status').show();
	            $(this.el).find('.slides-container').html(html);
	            var color = this.model.get('backgroundColor');
	            $(this.el).find('.slides-container li')
                    .css({
                        'background-color': color,
                        height: $(window).height()
                    });

	            $(this.el).find('.slides-container').find('img').load(function () {
	                that.onImageLoaded(this, items, ++count);
	                that.resizeImage(this);
	            });
	          //  this.transitionItems();
                
	        },
	        resizeImage: function (img)
	        {
	            var sw = parseInt($(img).width());
	            var sh = parseInt($(img).height());
	            var winWidth = parseInt($(window).width());
	            var winHeight = parseInt($(window).height());
	            var mw = (sw < winWidth) ? sw : winWidth;
	            var mh = (sh < winHeight) ? sh : winHeight;
	     

	            var value = this.calculateAspectRatioFit(sw, sh, mw, mh);
	
	            $(img).css({
	                'height': Math.round(value.height),
	                'width': Math.round(value.width),
	                'position': 'absolute',
	                'left':(winWidth-value.width)/2,
	                'top':((winHeight - value.height) / 2)
	            });
	        },
	       calculateAspectRatioFit:function (srcWidth, srcHeight, maxWidth, maxHeight) {
	        
	            var ratio = [maxWidth / srcWidth, maxHeight / srcHeight ];
	            ratio = Math.min(ratio[0], ratio[1]);
	            return { width:srcWidth*ratio, height:srcHeight*ratio };
	}

	    });

	    return MainView;
	});