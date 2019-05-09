( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
        window.SUI = {};
	}

	SUI.treeOnLoad = function( element ) {

		var tree     = $( element ),
			leaf     = tree.find( 'li[role="treeitem"]' ),
			node     = leaf.find( '> .sui-tree-node' ),
			checkbox = node. find( '> .sui-node-checkbox input' ),
			branch   = leaf.find( '> ul[role="group"]' )
			;

		// Hide sub-groups
		branch.slideUp();

		// Uncheck item
		if ( 0 !== checkbox.length ) {
			checkbox.prop( 'checked', false );
		}

		leaf.each( function() {

			var leaf       = $( this ),
				openLeaf   = leaf.attr( 'aria-expanded' ),
				checkLeaf  = leaf.attr( 'aria-selected' ),
				node       = leaf.find( '> .sui-tree-node' ),
				checkbox   = node.find( '> .sui-node-checkbox' ),
				button     = node.find( '> span[role="button"], > button' ),
				icon       = node.find( '> span[aria-hidden]' ),
				branch     = leaf.find( '> ul[role="group"]' ),
				innerLeaf  = branch.find( '> li[role="treeitem"]' ),
				innerCheck = innerLeaf.find( '> .sui-tree-node > .sui-node-checkbox' )
				;

			// FIX: Remove unnecessary elements for leafs
			if ( ( 'selector' === tree.data( 'tree' ) || 'selector' === tree.attr( 'data-tree' ) ) && 0 !== icon.length ) {
				button.remove();
			}

			if ( typeof undefined !== typeof openLeaf && false !== openLeaf ) {

				// Open sub-groups
				if ( 'true' === openLeaf ) {
					branch.slideDown();
				}
			} else {

				if ( 0 !== branch.length ) {
					leaf.attr( 'aria-expanded', 'false' );
				} else {

					// FIX: Remove unnecessary elements for leafs
					if ( 0 !== button.length ) {
						button.remove();
					}
				}
			}

			if ( typeof undefined !== typeof checkLeaf && false !== checkLeaf ) {

				// Checked leafs
				if ( 'true' === checkLeaf && 0 < branch.length ) {

					innerLeaf.attr( 'aria-selected', 'true' );

					if ( 0 !== checkbox.length && checkbox.is( 'label' ) ) {
						checkbox.find( 'input' ).prop( 'checked', true );
					}

					if ( 0 !== innerCheck.length && innerCheck.is( 'label' ) ) {
						innerCheck.find( 'input' ).prop( 'checked', true );
					}
				}
			} else {

				// Unchecked leafs
				leaf.attr( 'aria-selected', 'false' );

				if ( 0 !== checkbox.length && checkbox.is( 'label' ) ) {
					checkbox.find( 'input' ).prop( 'checked', false );
				}
			}
		});
	};

	SUI.treeButton = function( element ) {

		var button = $( element );

		button.on( 'click', function( e ) {

			var button = $( this ),
				leaf   = button.closest( 'li[role="treeitem"]' ),
				branch = leaf.find( '> ul[role="group"]' )
				;

			if ( 0 !== branch.length ) {

				branch.slideToggle( 250 );

				if ( 'true' === leaf.attr( 'aria-expanded' ) ) {
					leaf.attr( 'aria-expanded', 'false' );
				} else {
					leaf.attr( 'aria-expanded', 'true' );
				}
			}

			e.preventDefault();

		});
	};

	SUI.treeCheckbox = function( element ) {

		var checkbox = $( element );

		checkbox.on( 'click', function() {

			var checkbox  = $( this ),
				leaf      = checkbox.closest( 'li[role="treeitem"]' ),
				branches  = leaf.find( 'ul[role="group"]' ),
				leafs     = branches.find( '> li[role="treeitem"]' ),
				checks    = leafs.find( '> .sui-tree-node > .sui-node-checkbox input' ),
				topBranch = leaf.parent( 'ul' ),
				topLeaf   = topBranch.parent( 'li' )
				;

			var	countIndex = 0,
				countTopBranches = ( topLeaf.parents( 'ul' ).length - 1 )
				;

			if ( 'true' === leaf.attr( 'aria-selected' ) ) {

				// Unselect current leaf
				leaf.attr( 'aria-selected', 'false' );

				// Unselect current checkbox
				if ( checkbox.is( 'input' ) ) {
					checkbox.prop( 'checked', false );
				}

				// Unselect child leafs
				if ( 0 !== branches.length ) {
					leafs.attr( 'aria-selected', 'false' );
				}

				// Unselect child checkboxes
				if ( 0 !== checks.length ) {
					checks.prop( 'checked', false );
				}

				// Unselect branch(es) when not all leafs are selected
				if ( leaf.parent().is( 'ul' ) && 'group' === leaf.parent().attr( 'role' ) ) {

					leaf.parents( 'ul' ).each( function() {

						var branch = $( this ),
							leaf   = branch.parent( 'li' ),
							check  = leaf.find( '> .sui-tree-node > .sui-node-checkbox input' )
							;

						if ( 'treeitem' === leaf.attr( 'role' ) ) {

							leaf.attr( 'aria-selected', 'false' );

							if ( 0 !== check.length ) {
								check.prop( 'checked', false );
							}
						}
					});
				}
			} else {

				// Select current leaf
				leaf.attr( 'aria-selected', 'true' );

				// Select current checkbox
				if ( checkbox.is( 'input' ) ) {
					checkbox.prop( 'checked', true );
				}

				// Select child leafs
				if ( 0 !== branches.length ) {
					leafs.attr( 'aria-selected', 'true' );
				}

				// Select child checkboxes
				if ( 0 !== checks.length ) {
					checks.prop( 'checked', true );
				}

				// Select top branch(es) when all leafs are selected
				if ( 0 === topLeaf.find( 'li[aria-selected="false"]' ).length ) {

					topLeaf.attr( 'aria-selected', 'true' );

					for ( countIndex = 0; countTopBranches >= countIndex; countIndex++ ) {

						topLeaf.parent( 'ul' ).eq( countIndex ).each( function() {

							var branch     = $( this ),
								leafFalse  = branch.find( '> li[aria-selected="false"]' )
								;

							if ( 0 === leafFalse.length ) {
								branch.parent( 'li' ).attr( 'aria-selected', 'true' );
								branch.parent( 'li' ).find( '> .sui-tree-node > .sui-node-checkbox input' ).prop( 'checked', true );
							}
						});
					}
				}
			}
		});
	};

	SUI.treeForm = function( element ) {

		var button = $( element );

		if ( 'add' === button.attr( 'data-button' ) ) {

			button.on( 'click', function() {

				var button  = $( this ),
					leaf    = button.closest( 'li[role="treeitem"]' ),
					node    = leaf.find( '> .sui-tree-node' ),
					expand  = node.find( 'span[data-button="expander"]' ),
					branch  = leaf.find( '> ul[role="group"]' ),
					content = branch.find( '> span[role="contentinfo"]' )
					;

				if ( 0 !== content.length ) {

					// Hide button
					button.hide();
					button.removeAttr( 'tabindex' );
					button.attr( 'aria-hidden', 'true' );

					// Show content
					content.addClass( 'sui-show' );
					content.removeAttr( 'aria-hidden' );

					// FIX: Open tree if it's closed
					if ( 'true' !== leaf.attr( 'aria-expanded' ) ) {
						expand.click();
					}

					// Focus content
					content.focus();
					content.attr( 'tabindex', '-1' );

				}
			});
		}

		if ( 'remove' === button.attr( 'data-button' ) ) {

			button.on( 'click', function() {

				var button  = $( this ),
					content = button.closest( 'span[role="contentinfo"]' ),
					leaf    = content.closest( 'li[role="treeitem"]' ),
					node    = leaf.find( '> .sui-tree-node' ),
					btnAdd  = node.find( '> span[data-button="add"]' )
					;

				// Hide content
				content.removeClass( 'sui-show' );
				content.removeAttr( 'tabindex' );
				content.attr( 'aria-hidden', 'true' );

				// Show button
				btnAdd.show();
				btnAdd.removeAttr( 'aria-hidden' );
				btnAdd.focus();
				btnAdd.attr( 'tabindex', '-1' );

			});
		}
	};

	SUI.suiTree = function( element, dynamic ) {

		var tree = $( element );

		if ( ! tree.hasClass( 'sui-tree' ) || typeof undefined === tree.attr( 'data-tree' ) ) {
			return;
		}

		function button() {

			var leaf   = tree.find( 'li[role="treeitem"]' ),
				node   = leaf.find( '> .sui-tree-node' ),
				button = node.find( '> [data-button="expander"]' ),
				label  = node.find( '> span.sui-node-text' )
				;

			button.each( function() {
				var button = $( this );
				SUI.treeButton( button );
			});

			label.each( function() {
				var label = $( this );
				SUI.treeButton( label );
			});
		}

		function checkbox() {

			var leaf     = tree.find( 'li[role="treeitem"]' ),
				node     = leaf.find( '> .sui-tree-node' ),
				checkbox = node.find( '> .sui-node-checkbox' )
				;

			checkbox.each( function() {

				var checkbox = ( $( this ).is( 'label' ) ) ? $( this ).find( 'input' ) : $( this );

				SUI.treeCheckbox( checkbox );

			});
		}

		function add() {

			var leaf   = tree.find( 'li[role="treeitem"]' ),
				node   = leaf.find( '> .sui-tree-node' ),
				button = node.find( '> [data-button="add"]' )
				;

			button.each( function() {

				var button = $( this );

				SUI.treeForm( button );

			});
		}

		function remove() {

			var button = tree.find( '[data-button="remove"]' );

			button.each( function() {

				var button = $( this );

				SUI.treeForm( button );

			});
		}

		function init() {

			if (
				'selector' === tree.data( 'tree' ) ||
				'directory' === tree.data( 'tree' ) ||
				'selector' === tree.attr( 'data-tree' ) ||
				'directory' === tree.atrr( 'data-tree' )
			) {

				// Initial setup
				SUI.treeOnLoad( tree );

				// Expand action
				button();

				// Select action
				checkbox();

				// Add folder action
				if ( true === dynamic || 'true' === dynamic ) {
					add();
					remove();
				}
			}
		}

		init();

		return this;
	};

	if ( 0 !== $( '.sui-2-3-26 .sui-tree' ).length ) {

		$( '.sui-2-3-26 .sui-tree' ).each( function() {
			SUI.suiTree( $( this ), true );
		});
	}

}( jQuery ) );
