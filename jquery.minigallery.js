(function( $ ) {

	$.fn.minigallery = function( params ) {
		
		var pager = "-pager";
		
		var containerStyles = {
			"position": "relative",
			"overflow": "hidden"
		};
		
		var options = $.extend( {
			"path": "images",
			"prefix": "small_",
			"extension": "jpg",
			"image_width": 500,
			"image_height": 500,
			"btn_prev": "#prev",
			"btn_next": "#next",
			"active_image": "active"
		}, params);	
		
		this.css(containerStyles).css({'width':options.image_width, 'height':options.image_height});
		
		thumbnails = this.attr('id') + pager;
		$thumbnails = $("#" + thumbnails);

		var bigImages = prepareImages($thumbnails, options.prefix, options.extension);
		
		this.append( drawImage(bigImages[0], options.path, options.image_width, options.image_height) );
		$thumbnails.find('img').first().addClass(options.active_image);
	
		var that = this;
		
		$thumbnails.find('img').on('click', function(){
			if ($(this).hasClass(options.active_image)) return;

			var old_index = findOldIndex($thumbnails, options.active_image);
			$thumbnails.find('img').removeClass();
			$(this).addClass(options.active_image);			

			var index = $(this).index();
			if (index > old_index) {
				var direction = 'left';
			} else {
				var direction = 'right';
			}			

			var imgUrl = $(this).attr('src');
			var img = options.path + '/' + getImageUrl(imgUrl, options.prefix, options.extension);
			loadImage(img, that, direction, options.image_width, options.image_height, options.loader);
		});
		
		$(options.btn_next).on('click', function(e){
			e.preventDefault();
			var old_index = findOldIndex($thumbnails, options.active_image);
			var newIndex = old_index + 1;
			
			if (newIndex > bigImages.length-1) {
				newIndex = 0;
				$thumbnails.find('.'+options.active_image).removeClass();
				$thumbnails.find('img').first().addClass(options.active_image);
			} else {
				$thumbnails.find('.'+options.active_image).removeClass().next('img').addClass(options.active_image);
			}
			
			var img = options.path + "/" + bigImages[newIndex];
			loadImage(img, that, 'left', options.image_width, options.image_height, options.loader);
		});
		
		$(options.btn_prev).on('click', function(e){
			e.preventDefault();
			var old_index = findOldIndex($thumbnails, options.active_image);
			var newIndex = old_index - 1;
			
			if (newIndex < 0) {
				newIndex = bigImages.length-1;
				$thumbnails.find('.'+options.active_image).removeClass();
				$thumbnails.find('img').last().addClass(options.active_image);
			} else {
				$thumbnails.find('.'+options.active_image).removeClass().prev('img').addClass(options.active_image);
			}
			
			var img = options.path + "/" + bigImages[newIndex];
			loadImage(img, that, 'right', options.image_width, options.image_height, options.loader);
		});
		
		document.onkeydown = function (e) {
			e = e || window.event;
			var keyCode = e.keyCode || e.which;
			var arrow = {left: 37, right: 39};
			if (e.ctrlKey) {
				switch (keyCode) {
				  case arrow.left:
					  $(options.btn_prev).click();
					  break;
				  case arrow.right:
					  $(options.btn_next).click();
					  break;
				}
			}						
		};
		
		return this;

	};
	
	var dFunc = {
		initialOffset_left: function() { return ''; },
		initialOffset_right: function() { return '-'; },
		addImage_left: function(el, template) { el.append(template); },
		addImage_right: function(el, template) { el.prepend(template); },
		move_left: function() { return '-'; },
		move_right: function() { return '+'; },
		remove_left: function(el) { el.find('img').first().remove(); },
		remove_right: function(el) { el.find('img').last().remove(); }						
	}
	
	loadImage = function(img, el, direction, w, h, loader) {
		if (checkLoader(loader)) {
			$(loader).show();
		}
		var image = new Image();
		image.src = img;
		image.onload = function(){
			var offset = el.find('img').first().width();
			var template = drawNewImage(image.src, direction, w, h, offset);
			dFunc['addImage_'+direction](el, template);
			el.find('img').animate({
				left: dFunc['move_'+direction]() + "=" + offset
				}, 500, function(){
					if (el.find('img').length > 1) {
						dFunc['remove_'+direction](el);
					}						
				}
			);
			if (checkLoader(loader)) {
				$(loader).hide();
			}
		};				
	}	
	
	prepareImages = function($thumbnails, prefix, extension) {
		var bigImages = [];
		var images = $thumbnails.find('img');
		$.each(images, function(i, image){
			var url = $(image).attr('src');
			var filename = getImageUrl(url, prefix, extension);
			bigImages.push(filename);
		});
		return bigImages;
	}
	
	drawImage = function(file, path, w, h) {
		return "<img src='" + path + "/" + file + "' width=" + w + " height=" + h + " />";
	}
	
	drawNewImage = function(src, direction, w, h, offset) {
		return "<img style='left:" + dFunc['initialOffset_'+direction]() + offset + "px' src='" + src + "' width=" + w + " height=" + h + " />";
	}
	
	getImageUrl = function(url, prefix, extension) {
		var filename = url.match(/([^\/]+)(?=\.\w+$)/)[0];
		filename = filename.replace(prefix, '') + "." + extension;
		return filename;
	}
	
	findOldIndex = function($els, active) {
		return $els.find('.' + active).index();
	}	
	
	checkLoader = function(loader) {
		if (undefined != loader) {
			return true;
		} else {
			return false;
		}
	}

})(jQuery);
