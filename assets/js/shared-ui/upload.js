( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	SUI.upload = function() {

		$( 'SUI_BODY_CLASS .sui-upload-group input[type="file"]' ).on( 'change', function( e ) {
			var file = $( this )[0].files[0],
				message = $( this ).find( '~ .sui-upload-message' );

			if ( file ) {
				message.text( file.name );
			}

		});

		// This will trigger on click of upload button
		$('.sui-upload-button').on('click', function(){
			var parent = $(this).parent();
			var file = parent.find('input[type="file"]');
			// This will open browser file explorer
			file.trigger('click');
		})

		// This will trigger after selecting file for upload. 
		$('.sui-upload input[type="file"]').on( 'change', function() {
			var parent = $(this).parent();
			var filename = $(this).val();
			var imageContainer = parent.find('.sui-upload-image');
			var lastIndex = filename.lastIndexOf("\\");
			if (lastIndex >= 0) {
				filename = filename.substring(lastIndex + 1);
			}
			// To show uploaded file preview.
			if(imageContainer.length){
				var reader = new FileReader();
				var imagePreview = imageContainer.find('.sui-image-preview');
				reader.onload = function (e) {
					imagePreview.attr('style', 'background-image: url('+e.target.result+');');
				}
				reader.readAsDataURL($(this)[0].files[0]);
			}
			parent.find('.sui-upload-file > span').text(filename);
			parent.addClass('sui-has_file');
		});

	};

	SUI.upload();

}( jQuery ) );
