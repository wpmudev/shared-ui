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

		// This will trigger on file change. 
		$( '.sui-file-upload input[type="file"]' ).on( 'change', function() {
			var parent = $( this ).parent();
			var filename = $( this ).val();
			var imageContainer = parent.find( '.sui-upload-image' );
			if(filename) {
				var lastIndex = filename.lastIndexOf( "\\" );
				if ( lastIndex >= 0 ) {
					filename = filename.substring(lastIndex + 1);
					// To show uploaded file preview.
					if( imageContainer.length ){
						var reader = new FileReader();
						var imagePreview = imageContainer.find( '.sui-image-preview' );
						reader.onload = function ( e ) {
							imagePreview.attr( 'style', 'background-image: url('+e.target.result+' );' );
						}
						reader.readAsDataURL($( this )[0].files[0]);
					}
					parent.find( '.sui-upload-file > span' ).text(filename);
					parent.addClass( 'sui-has_file' );
				}
			} else {
				if( imageContainer.length ){
					var imagePreview = imageContainer.find( '.sui-image-preview' );
					imagePreview.attr( 'style', 'background-image: url();' );
				}
				parent.find( '.sui-upload-file > span' ).text( '' );
				parent.removeClass( 'sui-has_file' );
			}		
		});

		// This will trigger on click of upload button
		$( '.sui-file-upload .sui-upload-button' ).on( 'click', function(){
			selectFile($( this ));
		});

		// This will trigger when user wants to remove the selected upload file
		$( '.sui-file-upload [aria-label="Remove file"]' ).on( 'click', function(){
			removeFile($( this ));
		});

		// This will trigger reupload of file
		$( '.sui-file-upload .sui-upload-image' ).on( 'click', function(){
			selectFile($( this ));
		});

		// function to open browser file explorer for selecting file
		function selectFile(element) {
			var parent = element.closest( '.sui-upload' );
			var file = parent.find( 'input[type="file"]' );
			file.trigger( 'click' );
		}

		// function to remove file
		function removeFile(element) {
			var parent = element.closest( '.sui-upload' );
			var file = parent.find( 'input[type="file"]' );
			file.val('').change();
		}

	};

	SUI.upload();

}( jQuery ) );
