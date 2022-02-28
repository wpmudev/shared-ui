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

		// check whether element exist then execute js
		if($( 'SUI_BODY_CLASS .sui-file-upload' ).length){
			// This will trigger on file change. 
			$( 'SUI_BODY_CLASS .sui-file-browser input[type="file"]' ).on( 'change', function() {
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
			$( 'SUI_BODY_CLASS .sui-file-browser .sui-upload-button' ).on( 'click', function(){
				selectFile($( this ));
			});

			// This will trigger when user wants to remove the selected upload file
			$( 'SUI_BODY_CLASS .sui-file-upload [aria-label="Remove file"]' ).on( 'click', function(){
				removeFile($( this ));
			});

			// This will trigger reupload of file
			$( 'SUI_BODY_CLASS .sui-file-browser .sui-upload-image' ).on( 'click', function(){
				selectFile($( this ));
			});

			// upload drag and drop functionality
			var isAdvancedUpload = function() {
				var div = document.createElement('div');
				return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
			}();

			var uploadArea = $( 'SUI_BODY_CLASS .sui-upload-button' );

			if(isAdvancedUpload){
				var droppedFiles = false;

				uploadArea.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
					e.preventDefault();
					e.stopPropagation();
				})
				.on('dragover dragenter', function() {
					uploadArea.addClass('sui-is-dragover');
				})
				.on('dragleave dragend drop', function() {
					uploadArea.removeClass('sui-is-dragover');
				})
				.on('drop', function(e) {
					droppedFiles = e.originalEvent.dataTransfer.files;
					uploadedFile( $( this ), droppedFiles[0], droppedFiles[0].name);
				});
			}

			// function to set uploaded file
			const uploadedFile = function (element, file, filename){
				var parent = element.closest( '.sui-upload' );
				var imageContainer = parent.find( '.sui-upload-image' );
				if(filename) {
					if( imageContainer.length ){
						var reader = new FileReader();
						var imagePreview = imageContainer.find( '.sui-image-preview' );
						reader.onload = function ( e ) {
							imagePreview.attr( 'style', 'background-image: url('+e.target.result+' );' );
						}
						reader.readAsDataURL(file);
					}
					parent.find( '.sui-upload-file > span' ).text(filename);
					parent.addClass( 'sui-has_file' );
				}
			}

			// function to open browser file explorer for selecting file
			const selectFile = function(element) {
				var parent = element.closest( '.sui-upload' );
				var file = parent.find( 'input[type="file"]' );
				file.trigger( 'click' );
			}

			// function to remove file
			const removeFile = function(element) {
				var parent = element.closest( '.sui-upload' );
				var file = parent.find( 'input[type="file"]' );
				file.val('').change();
			}
		}

	};

	SUI.upload();

}( jQuery ) );
