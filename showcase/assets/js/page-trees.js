( function( $ ) {

	// Use strict mode
	'use strict';

	// Define global DEMO object if it does not exist
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.pageTrees = function( page ) {

		var body = $( 'body' );

		if ( page !== body.data( 'page' ) || page !== body.attr( 'data-page' ) ) {
			return;
		}

		function loadFancySelector( element ) {

			$( element ).fancytree({
				checkbox: true,
				selectMode: 3,
				source: [
					{ title: 'Parent / Group', expanded: true, children: [
						{ title: 'Child / Group', children: [
							{ title: 'Sub Child Item' },
							{ title: 'Sub Child Item' }
						]},
						{ title: 'Child / Group', expanded: true, children: [
							{ title: 'Sub Child Item' },
							{ title: 'Sub Child Item' }
						]},
						{ title: 'Child / Group', children: [
							{ title: 'Sub Child Item' },
							{ title: 'Sub Child Item' }
						]},
						{ title: 'Child / Single' },
						{ title: 'Child / Single' }
					]},
					{ title: 'Parent / Group', children: [
						{ title: 'Sub Child Item' },
						{ title: 'Sub Child Item' },
						{ title: 'Sub Child Item' },
						{ title: 'Sub Child Item' }
					]},
					{ title: 'Parent / Single' },
					{ title: 'Parent / Single (Disabled)', unselectable: true },
					{ title: 'Parent / Group (Disabled)', unselectable: true, children: [
						{ title: 'Sub Child Item' },
						{ title: 'Sub Child Item' },
						{ title: 'Sub Child Item' },
						{ title: 'Sub Child Item' }
					]}
				],
				icon: false,
				lazyLoad: function( event, data ) {
					data.result = {
						url: 'https://cdn.rawgit.com/mar10/fancytree/72e03685/demo/ajax-sub2.json'
					};
				}
			});
		}

		function loadFancyDirectory( element ) {

			$( element ).fancytree({
				checkbox: true,
				selectMode: 3,
				source: [
					{ title: 'wp-admin', folder: true, unselectable: true, children: [
						{ title: 'file.php' },
						{ title: 'file.php' },
						{ title: 'file.php' },
						{ title: 'file.php' }
					]},
					{ title: 'wp-content', expanded: true, folder: true, children: [
						{ title: 'plugins', folder: true, children: [
							{ title: 'Defender', icon: 'sui-icon-defender' },
							{ title: 'Forminator', icon: 'sui-icon-forminator' },
							{ title: 'Hummingbird', icon: 'sui-icon-hummingbird' },
							{ title: 'Hustle', icon: 'sui-icon-hustle' },
							{ title: 'Shipper', icon: 'sui-icon-shipper-anchor' },
							{ title: 'Smartcrawl', icon: 'sui-icon-smart-crawl' },
							{ title: 'Smush', icon: 'sui-icon-smush' },
							{ title: 'Snapshot', icon: 'sui-icon-snapshot' }
						]},
						{ title: 'themes', expanded: true, folder: true, children: [
							{ title: 'divi', expanded: true, folder: true, children: [
								{ title: 'assets', expanded: true, folder: true, children: [
									{ title: 'image.jpg', icon: 'sui-icon-photo-picture' },
									{ title: 'image.jpg', icon: 'sui-icon-photo-picture' },
									{ title: 'image.jpg', icon: 'sui-icon-photo-picture' },
									{ title: 'image.jpg', icon: 'sui-icon-photo-picture' }
								]},
								{ title: 'styles', folder: true, children: [
									{ title: 'styles.min.css' },
									{ title: 'styles.min.css' },
									{ title: 'styles.min.css' },
									{ title: 'styles.min.css' }
								]},
								{ title: 'js', folder: true, children: [
									{ title: 'scripts.min.css' },
									{ title: 'scripts.min.css' },
									{ title: 'scripts.min.css' },
									{ title: 'scripts.min.css' }
								]},
								{ title: 'fonts', folder: true, children: [
									{ title: 'divi-font.eot' },
									{ title: 'divi-font.svg' },
									{ title: 'divi-font.ttf' },
									{ title: 'divi-font.woff' },
									{ title: 'divi-font.woff2' }
								]}
							]},
							{ title: 'twentynineteen', folder: true, children: [
								{ title: '404.php' },
								{ title: 'archive.php' },
								{ title: 'classes', folder: true },
								{ title: 'comments.php' },
								{ title: 'fonts', folder: true },
								{ title: 'footer.php' },
								{ title: 'functions.php' },
								{ title: 'header.php' },
								{ title: 'image.php' },
								{ title: 'inc', folder: true },
								{ title: 'index.php' },
								{ title: 'js', folder: true },
								{ title: 'package-lock.json' },
								{ title: 'package.json' },
								{ title: 'page.php' },
								{ title: 'postcss.config.js' },
								{ title: 'print.css' },
								{ title: 'print.scss' },
								{ title: 'readme.txt' },
								{ title: 'sass', folder: true },
								{ title: 'screenshot.png' },
								{ title: 'search.php' },
								{ title: 'single.php' },
								{ title: 'style-editor-customizer.css' },
								{ title: 'style-editor-customizer.scss' },
								{ title: 'style-editor.css' },
								{ title: 'style-editor.scss' },
								{ title: 'style-rtl.css' },
								{ title: 'style.css' },
								{ title: 'style.css.map' },
								{ title: 'style.scss' },
								{ title: 'template-parts', folder: true }
							]}
						]},
						{ title: 'uploads', folder: true, children: [
							{ title: '2015', folder: true },
							{ title: '2016', folder: true },
							{ title: '2017', folder: true },
							{ title: '2018', folder: true },
							{ title: '2019', folder: true }
						]}
					]},
					{ title: 'wp-includes', folder: true, unselectable: true, children: [
						{ title: 'file.php' },
						{ title: 'file.php' },
						{ title: 'file.php' },
						{ title: 'file.php' }
					]}
				],
				icon: function( event, data ) {

					if ( data.node.isFolder() ) {
						return 'sui-icon-folder';
					}
				},
				lazyLoad: function( event, data ) {

					data.result = {
						url: 'https://cdn.rawgit.com/mar10/fancytree/72e03685/demo/ajax-sub2.json'
					};
				}
			});
		}

		function init() {

			var selector = $( '#sample-fancytree-selector' ),
				directory = $( '#sample-fancytree-directory' )
				;

			loadFancySelector( selector );
			loadFancyDirectory( directory );

		}

		init();

		return this;

	};

	$( 'body' ).ready( function() {

		DEMO.pageTrees( 'trees' );

	});

}( jQuery ) );
