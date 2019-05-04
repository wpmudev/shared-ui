( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
        window.SUI = {};
	}

	SUI.treeButton = function( element ) {

		var button = $( element );

		button.on( 'click', function() {

			var button = $( this ),
				leaf   = button.closest( 'li[role="treeitem"]' ),
				branch = leaf.find( '> ul[role="group"]' )
				;

			branch.slideToggle( 250 );

			if ( 'true' === leaf.attr( 'aria-expanded' ) ) {
				leaf.attr( 'aria-expanded', 'false' );
			} else {
				leaf.attr( 'aria-expanded', 'true' );
			}
		});
	};

	SUI.treeCheckbox = function( element ) {

		var checkbox = $( element );

		checkbox.on( 'click', function() {

			var checkbox  = $( this ),
				leaf      = checkbox.closest( 'li[role="treeitem"]' ),
				branches  = leaf.find( 'ul[role="group"]' ),
				leafs     = branches.find( '> li[role="treeitem"]' ),
				topBranch = leaf.parent( 'ul' ),
				topLeaf   = topBranch.parent( 'li' )
				;

			var	countIndex = 0,
				countTopBranches = ( topLeaf.parents( 'ul' ).length - 1 )
				;

			if ( 'true' === leaf.attr( 'aria-selected' ) ) {

				// Unselect current leaf
				leaf.attr( 'aria-selected', 'false' );

				// Unselect child leafs
				if ( 0 !== branches.length ) {
					leafs.attr( 'aria-selected', 'false' );
				}

				// Unselect branch(es) when not all leafs are selected
				if ( leaf.parent().is( 'ul' ) && 'group' === leaf.parent().attr( 'role' ) ) {

					leaf.parents( 'ul' ).each( function() {

						var branch = $( this ),
							leaf   = branch.parent( 'li' )
							;

						if ( 'treeitem' === leaf.attr( 'role' ) ) {
							leaf.attr( 'aria-selected', 'false' );
						}
					});
				}
			} else {

				// Select current leaf
				leaf.attr( 'aria-selected', 'true' );

				// Select child leafs
				if ( 0 !== branches.length ) {
					leafs.attr( 'aria-selected', 'true' );
				}

				// Select top branch(es) when all leafs are selected
				if ( 0 === topLeaf.find( 'li[aria-selected="false"]' ).length ) {

					topLeaf.attr( 'aria-selected', 'true' );

					for ( countIndex = 0; countTopBranches >= countIndex; countIndex++ ) {

						topLeaf.parent( 'ul' ).eq( countIndex ).each( function() {

							var branch    = $( this ),
								leafFalse = branch.find( '> li[aria-selected="false"]' )
								;

							if ( 0 === leafFalse.length ) {
								branch.parent( 'li' ).attr( 'aria-selected', 'true' );
							}
						});
					}
				}
			}
		});
	};

	SUI.suiTree = function( element ) {

		var tree = $( element );

		if ( ! tree.hasClass( 'sui-tree' ) || typeof undefined === tree.attr( 'data-tree' ) ) {
			return;
		}

		function reset() {

			var leaf   = tree.find( 'li[role="treeitem"]' ),
				branch = leaf.find( '> ul[role="group"]' )
				;

			// Hide sub-groups
			branch.slideUp();

			leaf.each( function() {

				var leaf      = $( this ),
					openLeaf  = leaf.attr( 'aria-expanded' ),
					checkLeaf = leaf.attr( 'aria-selected' ),
					node      = leaf.find( '> span.sui-tree-node' ),
					button    = node.find( '> span[role="button"]' ),
					icon      = node.find( '> span[aria-hidden]' ),
					branch    = leaf.find( '> ul[role="group"]' ),
					innerLeaf = branch.find( '> li[role="treeitem"]' )
					;

				// FIX: Remove unnecessary elements for leafs
				if ( 0 !== icon.length && 'selector' === tree.data( 'tree' ) ) {
					button.remove();
				}

				if ( typeof undefined !== typeof openLeaf && false !== openLeaf ) {

					// Open sub-groups
					if ( 'true' === openLeaf ) {
						branch.slideDown();
					}
				} else {

					if ( branch.length ) {
						leaf.attr( 'aria-expanded', 'false' );
					} else {

						// FIX: Remove unnecessary elements for leafs
						if ( 0 !== icon.length && 'selector' === tree.data( 'tree' ) ) {
							button.remove();
						}
					}
				}

				if ( typeof undefined !== typeof checkLeaf && false !== checkLeaf ) {

					// Checked leafs
					if ( 'true' === checkLeaf && 0 < branch.length ) {
						innerLeaf.attr( 'aria-selected', 'true' );
					}
				} else {

					// Unchecked leafs
					leaf.attr( 'aria-selected', 'false' );
				}
			});
		}

		function button() {

			var leaf   = tree.find( 'li[role="treeitem"]' ),
				node   = leaf.find( '> span.sui-tree-node' ),
				button = node.find( '> span[role="button"]' )
				;

			button.each( function() {

				var button = $( this );

				SUI.treeButton( button );

			});
		}

		function checkbox() {

			var leaf     = tree.find( 'li[role="treeitem"]' ),
				node     = leaf.find( '> span.sui-tree-node' ),
				checkbox = node.find( '> span[role="checkbox"]' )
				;

			checkbox.each( function() {

				var checkbox = $( this );

				SUI.treeCheckbox( checkbox );

			});
		}

		function init() {

			if ( 'selector' === tree.data( 'tree' ) || 'directory' === tree.data( 'tree' ) ) {

				// Initial setup
				reset();

				// Expand action
				button();

				// Select action
				checkbox();

			}
		}

		init();

		return this;
	};

	if ( 0 !== $( 'SUI_BODY_CLASS .sui-tree' ) ) {

		$( 'SUI_BODY_CLASS .sui-tree' ).each( function() {
			SUI.suiTree( this );
		});
	}

}( jQuery ) );
