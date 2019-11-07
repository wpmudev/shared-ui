( function( $ ) {

	$( 'body' ).ready( function() {

		// Load admin menu
		$( '#adminmenumain' ).load( 'templates/wpadmin-menu.html', function() {

			var main = $( this ),
				menu = main.find( '#adminmenu' ),
				item = menu.find( 'li' ),
				body = $( 'body' ).data( 'page' )
				;

			item.removeClass( 'current' );

			if (  -1 < window.location.href.indexOf( body ) ) {

				if ( 'index' === body ) {
					item.find( 'a[href="/' + body + '.html"]' ).parents().addClass( 'current' );
				} else {
					item.find( 'a[href="/page-' + body + '.html"]' ).parents().addClass( 'current' );
				}
			} else {
				item.find( 'a[href="/' + body + '.html"]' ).parents().addClass( 'current' );
			}
		});

		// Load admin bar
		$( '#wpadminbar' ).load( 'templates/wpadmin-bar.html', function() {

			var bar       = $( this ),
				body      = $( 'body' ),
				suiWrap   = body.find( '.sui-wrap' ),
				main      = bar.find( '#wp-admin-bar-root-default' ),
				secondary = bar.find( '#wp-admin-bar-top-secondary' )
				;

			var btnRtl   = main.find( '#wp-lang-mode--rtl' ),
				btnColor = main.find( '#wp-accessibility-mode--color' )
				;

			btnRtl.on( 'click', function() {

				var button = $( this );

				if ( button.hasClass( 'active' ) ) {

					button.removeClass( 'active' );
					body.removeAttr( 'dir' );

				} else {

					button.addClass( 'active' );
					body.attr( 'dir', 'rtl' );

				}
			});

			btnColor.on( 'click', function() {

				var button = $( this );

				if ( button.hasClass( 'active' ) ) {

					button.removeClass( 'active' );
					suiWrap.removeClass( 'sui-color-accessible' );

				} else {

					button.addClass( 'active' );

					if ( 0 !== suiWrap.length ) {
						suiWrap.addClass( 'sui-color-accessible' );
					}
				}
			});
		});

	});

}( jQuery ) );

/*
( function( $ ) {

	var btns            = $( '.demo-icon' ),
		clipboard       = new ClipboardJS( '.demo-icon' ),
		navbutton       = $( '.sui-vertical-tab a' ),
		toggleAccordion = $( 'div.sui-accordion-item-header .sui-toggle, tr.sui-accordion-item .sui-toggle' ),
		demoPagFilter   = $( '#demo--open-pagination-filter' ),
		sideTabItem     = $( '#demo-side-tabs-options .sui-tab-item' ),
		migrateData     = $( '#demo-dialog--onboard-migrate-start' ),
		newFormBuild    = $( '#demo-dialog--newform-name-build' ),
		newFormInput    = $( '#newform-name-input' ),
		demoHubToggle   = $( '#demo-dialog--sample-hubspot-ticket-toggle' ),
		demoHubActive   = $( '#demo-dialog--sample-hubspot-ticket-activate' ),
		demoHumRunTest  = $( '#demo-dialog--sample-hummingbird-test' )
		;

	// Offset scroll for showcase sidenav.
	function offsetAnchor() {
		if ( 0 !== location.hash.length ) {
			window.scrollTo( window.scrollX, window.scrollY - 60 );
		}
	}
	$( document ).on( 'click', '#adminmenu a[href^="#"], .demo-internal-link[href^="#"]', function( event ) {
		window.setTimeout( function() {
			offsetAnchor();
		}, 0 );
	});
	window.setTimeout( offsetAnchor, 0 );

	// Initialize highlight js for demo code blocks.
	$( '.demo-code-block .sui-code-snippet' ).each( function( i, block ) {
		hljs.highlightBlock( block );
	});

	$( '.demo-icons i' ).each( function( i, block ) {
		var classes = block.className.split( /\s+/ );
		var iconName = classes[0].replace( 'sui-icon-', '' );
		$( this ).wrap( '<div class="sui-col-md-3 sui-col-sm-4"><button role="button" data-clipboard-text="&lt;i class=&quot;sui-icon-' + iconName + '&quot; aria-hidden=&quot;true&quot;&gt;&lt;/i&gt;" class="demo-icon"></button></div>' ).after( '<span class="demo-icon-name"><span class="sui-screen-reader-text">Example of </span>' + iconName + '</span>' );
	});

	$( '.sui-date .sui-form-control' ).datepicker({
		beforeShow: function( input, inst ) {
			$( '#ui-datepicker-div' ).addClass( 'sui-calendar' );
		},
		'dateFormat': 'd MM yy'
	});

	clipboard.on( 'success', function( e ) {
		console.info( 'Copied:', e.text );
		showTooltip( e.trigger, 'Copied Icon!' );
		e.clearSelection();
	});

	btns.mouseleave( function() {
		$( this ).removeClass( 'sui-tooltip' );
		$( this ).removeAttr( 'aria-label' );
		$( this ).removeAttr( 'data-tooltip' );
	});

	function showTooltip( e, msg ) {
		$( e ).addClass( 'sui-tooltip' );
		$( e ).attr( 'aria-label', msg );
		$( e ).attr( 'data-tooltip', msg );
	}

	// Side navigation
	navbutton.on( 'click', function( e ) {
		currentNav( e.target );
		e.preventDefault();
		e.stopPropagation();
	});

	function currentNav( e ) {
		var navButton  = $( e ),
			navParent  = navButton.closest( '.sui-vertical-tabs' ),
			navWrapper = navButton.closest( '.sui-row-with-sidenav' ),
			navBox     = navWrapper.find( '> div[data-tab]' )
			;

		var navData = $( e ).data( 'tab' ),
			boxData = navWrapper.find( 'div[data-tab="' + navData + '"]' )
			;

		navParent.find( 'li' ).removeClass( 'current' );
		navButton.parent().addClass( 'current' );

		navBox.hide();
		boxData.show();
	}

	// Accordion
	toggleAccordion.each( function() {

		var toggle       = $( this ),
			toggleInput  = toggle.find( 'input' )
			;

		// Disable item if toggle is unchecked on load.
		if ( toggleInput.is( ':checked' ) ) {
			toggle.closest( '.sui-accordion-item' ).removeClass( 'sui-accordion-item--disabled' );
		} else {
			toggle.closest( '.sui-accordion-item' ).addClass( 'sui-accordion-item--disabled' );
		}
	});

	toggleAccordion.on( 'click', function( e ) {
		toggleStatus( e.target );
	});

	function toggleStatus( e ) {
		var toggle       = $( e ),
			toggleId     = toggle.attr( 'id' ),
			toggleInput  = $( 'input#' + toggleId ),
			toggleParent = toggleInput.closest( '.sui-accordion-item' )
			;

		if ( toggleInput.is( ':checked' ) ) {
			toggleInput.attr( 'checked', 'checked' );
			toggleInput.checked = true;
			toggleParent.removeClass( 'sui-accordion-item--disabled' );
		} else {
			toggleInput.attr( 'checked', '' );
			toggleInput.removeAttr( 'checked' );
			toggleInput.checked = false;
			toggleParent.addClass( 'sui-accordion-item--disabled' );
			toggleParent.removeClass( 'sui-accordion-item--open' );
		}
	}

	// Pagination filter
	demoPagFilter.on( 'click', function( e ) {
		openFilter( e.target );
		e.preventDefault();
		e.stopPropagation();
	});

	function openFilter( e ) {
		var pagButton  = $( e ),
			pagWrapper = pagButton.closest( '.sui-pagination-wrap' ),
			pagFilter  = pagWrapper.next( '.sui-pagination-filter' )
			;

		pagButton.toggleClass( 'sui-active' );
		pagFilter.toggleClass( 'sui-open' );
	}

	migrateData.on( 'click', function() {

		var button = $( this ),
			suiBox = button.closest( '.sui-box' ),
			title  = suiBox.find( '.sui-box-header .sui-box-title' ),
			desc   = suiBox.find( '.sui-box-header .sui-description' ),
			footer = suiBox.find( '.sui-box-footer:not([aria-hidden])' )
			;

		// Remove button.
		button.remove();

		// Change dialog description.
		desc.text( 'Data migration is in progress. It can take anywhere from a few seconds to a couple of hours depending upon the data of your existing modules and traffic on your site.' );

		footer
			.removeClass( 'sui-box-footer' ) // Remove footer class.
			.removeClass( 'sui-content-center' ) // Remove center-align content class.
			.addClass( 'sui-box-body sui-spacing-sides--lg' ) // Add content class.
			.html(
				'<div class="sui-progress-block">' +
					'<div class="sui-progress">' +
						'<span class="sui-progress-icon" aria-hidden="true">' +
							'<i class="sui-icon-loader sui-loading"></i>' +
						'</span>' +
						'<span class="sui-progress-text">' +
							'<span>50%</span>' +
						'</span>' +
						'<div class="sui-progress-bar" aria-hidden="true">' +
							'<span style="width: 50%"></span>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="sui-progress-state">' +
					'<span>Rows migrated: 1024/2100</span>' +
				'</div>'
			) // Add progress bar.
			;

		setTimeout( function() {
			suiBox.find( '.sui-progress-bar span' ).css( 'width', '100%' );
			suiBox.find( '.sui-progress-text span' ).text( '100%' );
		}, 800 );

		setTimeout( function() {
			title.text( 'Migration Complete' );
			desc.text( 'We\'ve successfully migrated data of your existing modules. You\re good to continue using Hustle!' );
			suiBox.find( '.sui-box-body' )
				.removeClass( 'sui-box-body' )
				.addClass( 'sui-box-footer' )
				.addClass( 'sui-content-center' )
				.html(
					'<button class="sui-button" data-modal-replace="demo-dialog--onboard-create">' +
						'Continue' +
					'</button>'
				)
				;

			suiBox.find( '.sui-button' ).on( 'click', function() {
				SUI.replaceModal( 'demo-dialog--onboard-create', this );
			});
		}, 1200 );
	});

	newFormBuild.on( 'click', function() {

		var self   = this,
			button = $( this ),
			suiBox = button.closest( '.sui-box' ),
			input  = suiBox.find( 'input' ),
			error  = suiBox.find( '.sui-error-message' )
			;

		// Disable all elements.
		suiBox.find( 'input, button' ).attr( 'disabled', true );

		// Set on-load status for create button.
		button.addClass( 'sui-button-onload' );

		setTimeout( function() {

			// Throw error if input is empty.
			if ( ! input.val() ) {

				// Add error class to field.
				input.closest( '.sui-form-field' ).addClass( 'sui-form-field-error' );

				// Add error message.
				error.text( 'Form cannot be empty.' );

				// Show error message.
				error.show();
				error.removeAttr( 'hidden' );

				// Enable all elements.
				suiBox.find( 'input, button' ).removeAttr( 'disabled' );

				// Remove on-load status.
				button.removeClass( 'sui-button-onload' );

				// Focus input.
				input.focus();

			// Remove errors and successfully close modal.
			} else {

				// Remove field error class.
				input.closest( '.sui-form-field' ).removeClass( 'sui-form-field-error' );

				// Remove error message.
				error.empty();

				// Hide error message.
				error.hide();
				error.attr( 'hidden', true );

				// Remove on-load status
				button.removeClass( 'sui-button-onload' );

				// Close modal.
				SUI.closeModal( self );
			}
		}, 1000 );

		setTimeout( function() {

			// Clear input value.
			input.val( '' );

			// Enable all elements.
			suiBox.find( 'input, button' ).removeAttr( 'disabled' );

		}, 1500 );
	});

	newFormInput.on( 'change paste keyup', function() {

		var input  = $( this ),
			suiBox = input.closest( '.sui-box' ),
			error  = suiBox.find( '.sui-error-message' )
			;

		if ( '' !== input.val() ) {

			// Remove field error class.
			input.closest( '.sui-form-field' ).removeClass( 'sui-form-field-error' );

			// Remove error message.
			error.empty();

			// Hide error message.
			error.hide();
			error.attr( 'hidden', true );

		} else {

			// Show field error class.
			input.closest( '.sui-form-field' ).addClass( 'sui-form-field-error' );

			// Remove error message.
			error.text( 'Form cannot be empty.' );

			// Hide error message.
			error.show();
			error.removeAttr( 'hidden' );

		}
	});

	demoHubToggle.on( 'click', function() {

		var checkbox = $( this ),
			suiBox   = checkbox.closest( '.sui-box' ),
			content  = suiBox.find( '.sui-box-body' ),
			footer   = suiBox.find( '.sui-box-footer' )
			;

		// Check if toggle is checked.
		if ( checkbox.is( ':checked' ) ) {
			content.removeClass( 'sui-hidden' );
			content.removeAttr( 'aria-hidden' );
			content.removeAttr( 'tabindex' );
			footer.removeClass( 'sui-spacing-top--30' );

		// Check if toggle is un-checked.
		} else {
			content.addClass( 'sui-hidden' );
			content.attr( 'aria-hidden', true );
			content.attr( 'tabindex', '-1' );
			footer.addClass( 'sui-spacing-top--30' );
		}
	});

	demoHubActive.on( 'click', function() {

		var self   = this,
			button = $( this ),
			suiBox = button.closest( '.sui-box' )
			;

		button.addClass( 'sui-button-onload' );
		suiBox.find( 'input, textarea, select, button' ).attr( 'disabled', true );

		setTimeout( function() {
			SUI.closeModal( self );
		}, 1000 );

		setTimeout( function() {
			button.removeClass( 'sui-button-onload' );
			suiBox.find( 'input, textarea, select, button' ).attr( 'disabled', false );
			suiBox.find( 'input, textarea, select, button' ).removeAttr( 'disabled' );
		}, 1500 );
	});

	demoHumRunTest.on( 'click', function() {

		var self     = this,
			button   = $( this ),
			suiBox   = button.closest( '.sui-box' ),
			boxTitle = suiBox.find( '.sui-box-title' ),
			boxSkip  = suiBox.find( '.sui-box-header button' ),
			boxMsg   = suiBox.find( '#demo-dialog--sample-hummingbird-message' ),
			boxPrg   = suiBox.find( '#demo-dialog--sample-hummingbird-progress' )
			;

		var newTitle = 'Test in progress...',
			oldTitle = 'Get Started'
			;

		// Assign new title.
		boxTitle.text( newTitle );

		// Disable "skip" button.
		boxSkip.attr( 'disabled', true );

		// Hide message.
		boxMsg
			.attr( 'aria-hidden', true )
			.attr( 'tabindex', '-1' )
			.addClass( 'sui-hidden' )
			;

		// Show progress.
		boxPrg
			.removeAttr( 'aria-hidden' )
			.removeAttr( 'tabindex' )
			.removeClass( 'sui-hidden' )
			;

		setTimeout( function() {
			boxPrg.find( '.sui-progress-text span' ).text( '40%' );
			boxPrg.find( '.sui-progress-bar span' ).css({ 'width': '40%' });
			boxPrg.find( '.sui-progress-state span' ).text( 'Testing performance' );
		}, 800 );

		setTimeout( function() {
			boxPrg.find( '.sui-progress-text span' ).text( '80%' );
			boxPrg.find( '.sui-progress-bar span' ).css({ 'width': '80%' });
		}, 1600 );

		setTimeout( function() {
			boxPrg.find( '.sui-progress-text span' ).text( '100%' );
			boxPrg.find( '.sui-progress-bar span' ).css({ 'width': '100%' });
			boxPrg.find( '.sui-progress-state span' ).text( 'Test completed' );
		}, 2000 );

		setTimeout( function() {
			SUI.closeModal( self );
		}, 2800 );

		setTimeout( function() {

			// Assign old title.
			boxTitle.text( oldTitle );

			// Enable "skip" button.
			boxSkip.removeAttr( 'disabled' );

			// Show message.
			boxMsg
				.removeAttr( 'aria-hidden' )
				.removeAttr( 'tabindex' )
				.removeClass( 'sui-hidden' )
				;

			// Hide progress.
			boxPrg
				.attr( 'aria-hidden', true )
				.attr( 'tabindex', '-1' )
				.addClass( 'sui-hidden' )
				;

			// Reset progress values.
			boxPrg.find( '.sui-progress-text span' ).text( '0%' );
			boxPrg.find( '.sui-progress-bar span' ).css({ 'width': '0%' });
			boxPrg.find( '.sui-progress-state span' ).empty();

		}, 3200 );

	});

	$( '#demo-dialog--sample-beehive-onboard-google-access-connect' ).on( 'click', function() {

		var button = $( this ),
			input  = $( '#demo-dialog--sample-beehive-onboard-google-access' ),
			auth   = $( '#demo-dialog--sample-beehive-onboard-google-access-auth' )
			;

		// Hide "Connect with Google" button.
		button.addClass( 'sui-hidden' );

		// Add incorrect authorization code.
		input.val( '4br7skqeyXJgga7AqOStCyNC' );

		// Click authorization button.
		auth.trigger( 'click' );

	});

	$( '#demo-dialog--sample-beehive-onboard-google-access-auth' ).on( 'click', function( e ) {

		var button = $( this ),
			input  = $( '#demo-dialog--sample-beehive-onboard-google-access' ),
			field  = input.closest( '.sui-form-field' ),
			notice = $( '#demo-dialog--sample-beehive-onboard-google-access-notice' ),
			gconct = $( '#demo-dialog--sample-beehive-onboard-google-access-connect' )
			;

		var errorWrong = '<p>It appears the access code you used was invalid. Please get your access code again by clicking the “Connect with Google” button below and pasting it again. If you run into further issues you can <a href="https://premium.wpmudev.org/" target="_blank" rel="nofollow">contact our Support</a> team for help.</p>';

		// Add loading state to button.
		button.attr( 'disabled', true );
		button.addClass( 'sui-button-onload' );

		setTimeout( function() {

			// Wrong code.
			if ( '' === input.val() || '4br7skqeyXJgga7AqOStCyNC' === input.val() ) {

				// Show error message.
				notice.html( errorWrong );
				notice.show();

				// Add error class.
				field.addClass( 'sui-form-field-error' );

				// Focus input.
				input.focus();

			// Right code.
			} else {

				// Remove error message.
				notice.empty();
				notice.hide();

				// Remove error class.
				field.removeClass( 'sui-form-field-error' );

				// Show "Connect with Google" button.
				gconct.removeClass( 'sui-hidden' );

				// Move to next slide.
				SUI.slideModal(
					'demo-dialog--sample-beehive-onboard-slide-2', // newSlideId
					'', // slideNewFocus
					'next' // newSlideEntrance
				);
			}

			// Remove button loading state.
			button.removeAttr( 'disabled' );
			button.removeClass( 'sui-button-onload' );

		}, 1000 );

		e.preventDefault();

	});

	$( '#demo-dialog--sample-beehive-onboard-api-auth' ).on( 'click', function( e ) {

		var button   = $( this ),
			clientId = $( '#demo-dialog--sample-beehive-onboard-api-id' ),
			clientSe = $( '#demo-dialog--sample-beehive-onboard-api-secret' )
			;

		var errorId     = 'Please input valid Client ID',
			errorSecret = 'Please input valid Client Secret'
			;

		// Add loading state to button.
		button.attr( 'disabled', true );
		button.addClass( 'sui-button-onload' );

		setTimeout( function() {

			// Right code.
			if ( '' !== clientId.val() && '' !== clientSe.val() ) {

				clientId.closest( '.sui-form-field' ).removeClass( 'sui-form-field-error' );
				clientId.closest( '.sui-form-field' ).find( '.sui-error-message' ).empty();
				clientId.closest( '.sui-form-field' ).find( '.sui-error-message' ).addClass( 'sui-hidden' );

				clientSe.closest( '.sui-form-field' ).removeClass( 'sui-form-field-error' );
				clientSe.closest( '.sui-form-field' ).find( '.sui-error-message' ).empty();
				clientSe.closest( '.sui-form-field' ).find( '.sui-error-message' ).addClass( 'sui-hidden' );

				// Move to next slide.
				SUI.slideModal(
					'demo-dialog--sample-beehive-onboard-slide-2', // newSlideId
					'demo-dialog--sample-beehive-onboard-profile', // slideNewFocus
					'next' // newSlideEntrance
				);

			// Empty code.
			} else {

				// Error class for "Client Id".
				if ( '' === clientId.val() ) {
					clientId.closest( '.sui-form-field' ).addClass( 'sui-form-field-error' );
					clientId.closest( '.sui-form-field' ).find( '.sui-error-message' ).text( errorId );
					clientId.closest( '.sui-form-field' ).find( '.sui-error-message' ).removeClass( 'sui-hidden' );
				} else {
					clientId.closest( '.sui-form-field' ).removeClass( 'sui-form-field-error' );
					clientId.closest( '.sui-form-field' ).find( '.sui-error-message' ).empty();
					clientId.closest( '.sui-form-field' ).find( '.sui-error-message' ).addClass( 'sui-hidden' );
				}

				// Error class for "Client Secret".
				if ( '' === clientSe.val() ) {
					clientSe.closest( '.sui-form-field' ).addClass( 'sui-form-field-error' );
					clientSe.closest( '.sui-form-field' ).find( '.sui-error-message' ).text( errorSecret );
					clientSe.closest( '.sui-form-field' ).find( '.sui-error-message' ).removeClass( 'sui-hidden' );
				} else {
					clientSe.closest( '.sui-form-field' ).removeClass( 'sui-form-field-error' );
					clientSe.closest( '.sui-form-field' ).find( '.sui-error-message' ).empty();
					clientSe.closest( '.sui-form-field' ).find( '.sui-error-message' ).addClass( 'sui-hidden' );
				}

				// Focus error field.
				if ( '' === clientId.val() && '' === clientSe.val() ) {
					clientId.focus();
				} else if ( '' === clientId.val() && '' !== clientSe.val() ) {
					clientId.focus();
				} else if ( '' !== clientId.val() && '' === clientSe.val() ) {
					clientSe.focus();
				}
			}

			// Remove button loading state.
			button.removeAttr( 'disabled' );
			button.removeClass( 'sui-button-onload' );

		}, 1000 );

		e.preventDefault();

	});

	$( '#demo-dialog--sample-beehive-onboard-tracking' ).on( 'click', function() {

		SUI.replaceModal(
			'demo-dialog--sample-beehive-tracking',
			'demo-dialog--sample-beehive-onboard-trigger-button',
			'demo-dialog--sample-beehive-tracking-input',
			false
		);

	});

	$( '#demo-dialog--sample-beehive-tracking-input' ).on( 'change focus focusin focusout blur keyup keydown', function( e ) {

		var input  = $( this ),
			error  = $( '#demo-dialog--sample-beehive-tracking-error' ),
			box    = input.closest( '.sui-box' ),
			body   = box.find( '.sui-box-body' ),
			footer = box.find( '.sui-box-footer' )
			;

		if ( '' === input.val() ) {
			body.addClass( 'sui-spacing-bottom--50' );
			footer.hide();
			footer.attr( 'hidden', true );
		} else {

			// Right code.
			if ( 14 === input.val().length ) {

				error.hide();
				error.attr( 'hidden', true );
				error.text( 'Tracking code added is valid. Please, click save code button below to continue.' );
				error.closest( '.sui-form-field' ).removeClass( 'sui-form-field-error' );

				footer.find( 'button' ).removeAttr( 'disabled' );

			// Wrong code.
			} else {

				error.closest( '.sui-form-field' ).addClass( 'sui-form-field-error' );
				error.text( 'Please input valid tracking code' );
				error.removeAttr( 'hidden' );
				error.show();

				footer.find( 'button' ).stop( true, true );
				footer.find( 'button' ).attr( 'disabled', true );

			}

			body.removeClass( 'sui-spacing-bottom--50' );
			footer.show();
			footer.removeAttr( 'hidden' );
		}

		e.stopPropagation();

	});

	$( '#demo-dialog--sample-beehive-tracking-save' ).on( 'click', function( e ) {

		var button = $( this );

		button.addClass( 'sui-button-onload' );
		button.attr( 'disabled', true );

		setTimeout( function() {

			button.removeAttr( 'disabled' );
			button.removeClass( 'sui-button-onload' );

			SUI.replaceModal(
				'demo-dialog--sample-beehive-onboard', // newModalId
				'demo-dialog--sample-beehive-onboard-trigger-button', // newFocusAfterClosed
				'demo-dialog--sample-beehive-onboard-profile', // newFocusFirst
				false // hasOverlayMask
			);

			SUI.slideModal(
				'demo-dialog--sample-beehive-onboard-slide-2', // newSlideId
				'demo-dialog--sample-beehive-onboard-profile' // slideNewFocus
			);

		}, 1000 );

		e.preventDefault();

	});

	$( '#demo-dialog--sample-beehive-onboard-profile-setup' ).on( 'click', function( e ) {

		var self = $( this );

		SUI.replaceModal(
			'demo-dialog--sample-beehive-setup', // newModalId
			'demo-dialog--sample-beehive-onboard-trigger-button', // newFocusAfterClosed
			'demo-dialog--sample-beehive-setup', // newFocusFirst
			false // hasOverlayMask
		);

		setTimeout( function() {
			SUI.closeModal();
		}, 1500 );

		e.preventDefault();

	});

	$( '.demo-dialog--sample-beehive-onboard-reset' ).on( 'click', function( e ) {

		var button = $( this ),
			modal  = button.closest( '.sui-modal-content' )
			;

		modal.find( '.demo-modal-button-google' ).removeClass( 'sui-hidden' );
		modal.find( '.sui-form-field' ).removeClass( 'sui-form-field-error' );
		modal.find( '.sui-error-message' ).addClass( 'sui-hidden' );
		modal.find( 'input, textarea' ).val( '' );
		modal.find( '.sui-button' ).stop( true, true );
		modal.find( '.sui-button' ).removeClass( 'sui-button-onload' );
		modal.find( '.sui-button' ).removeAttr( 'disabled' );
		modal.closest( '.sui-box-body' ).find( '[role="alert"]' ).hide();
		modal.closest( '.sui-box-body' ).find( '[role="alert"]' ).empty();

		SUI.closeModal();

	});

	SUI.tabs({
		callback: function( tab, panel ) {

			if ( panel.closest( '.sui-modal-content' ).is( '#demo-dialog--sample-beehive-onboard' ) ) {
				panel.find( '.demo-modal-button-google' ).removeClass( 'sui-hidden' );
				panel.find( '.sui-form-field' ).removeClass( 'sui-form-field-error' );
				panel.find( '.sui-error-message' ).addClass( 'sui-hidden' );
				panel.find( 'input, textarea' ).val( '' );
				panel.find( '.sui-button' ).stop( true, true );
				panel.find( '.sui-button' ).removeClass( 'sui-button-onload' );
				panel.find( '.sui-button' ).removeAttr( 'disabled' );
				panel.closest( '.sui-box-body' ).find( '[role="alert"]' ).hide();
				panel.closest( '.sui-box-body' ).find( '[role="alert"]' ).empty();
			}

		}
	});

}( jQuery ) );


// Chartjs Demo
( function( $ ) {

	var demoChartPublished = document.getElementById( 'demo-accordion-chart-published' ),
		demoChartDrafted   = document.getElementById( 'demo-accordion-chart-drafted' )
		;

	var monthDays = [
		'Aug 12 2018', 'Aug 13 2018', 'Aug 14 2018', 'Aug 15 2018', 'Aug 16 2018', 'Aug 17 2018', 'Aug 18 2018', 'Aug 19 2018', 'Aug 20 2018', 'Aug 21 2018',
		'Aug 22 2018', 'Aug 23 2018', 'Aug 24 2018', 'Aug 25 2018', 'Aug 26 2018', 'Aug 27 2018', 'Aug 28 2018', 'Aug 29 2018', 'Aug 30 2018', 'Aug 31, 2018',
		'Sep 1, 2018', 'Sep 2, 2018', 'Sep 3, 2018', 'Sep 4, 2018', 'Sep 5, 2018', 'Sep 6, 2018', 'Sep 7, 2018', 'Sep 8, 2018', 'Sep 9, 2018', 'Sep 10, 2018'
	];

	var views = [
		300, 310, 305, 315, 300, 290, 270, 280, 275, 295,
		320, 315, 310, 305, 310, 305, 310, 320, 330, 340,
		330, 320, 315, 320, 325, 320, 315, 310, 305, 310
	];

	var viewsDraft = [
		300, 310, 305, 315, 300, 290, 270, 280, 275, 295,
		320, 315, 310, 305, 310, 305, 310, 320, 330, 340,
		330, 320, 315, 320, 325, 320, 100, 10, 0, 0
	];

	var submissions = [
		220, 230, 220, 225, 215, 230, 200, 210, 205, 195,
		190, 150, 160, 155, 165, 170, 180, 160, 200, 180,
		205, 210, 215, 220, 205, 210, 205, 210, 220, 230
	];

	var submissionsDraft = [
		220, 230, 220, 225, 215, 230, 200, 210, 205, 195,
		190, 150, 160, 155, 165, 170, 180, 160, 200, 180,
		205, 210, 215, 220, 205, 210, 0, 0, 0, 0
	];

	var chartData = {
		labels: monthDays,
		datasets: [
			{
				label: 'Submissions',
				data: submissions,
				backgroundColor: [
					'#E1F6FF'
				],
				borderColor: [
					'#17A8E3'
				],
				borderWidth: 2,
				pointHoverRadius: 5,
				pointHoverBorderColor: '#17A8E3',
				pointHoverBackgroundColor: '#17A8E3'
			},
			{
				label: 'Views',
				data: views,
				backgroundColor: [
					'#F8F8F8'
				],
				borderColor: [
					'#DDDDDD'
				],
				borderWidth: 2,
				pointHoverRadius: 5,
				pointHoverBorderColor: '#DDDDDD',
				pointHoverBackgroundColor: '#DDDDDD'
			}
		]
	};

	var chartDataDraft = {
		labels: monthDays,
		datasets: [
			{
				label: 'Submissions',
				data: submissionsDraft,
				backgroundColor: [
					'#E1F6FF'
				],
				borderColor: [
					'#17A8E3'
				],
				borderWidth: 2,
				pointHoverRadius: 5,
				pointHoverBorderColor: '#17A8E3',
				pointHoverBackgroundColor: '#17A8E3'
			},
			{
				label: 'Views',
				data: viewsDraft,
				backgroundColor: [
					'#F8F8F8'
				],
				borderColor: [
					'#DDDDDD'
				],
				borderWidth: 2,
				pointHoverRadius: 5,
				pointHoverBorderColor: '#DDDDDD',
				pointHoverBackgroundColor: '#DDDDDD'
			}
		]
	};

	var chartOptions = {
		maintainAspectRatio: false,
		legend: {
			display: false
		},
		scales: {
			xAxes: [
				{
					display: false,
					gridLines: {
						color: 'rgba(0, 0, 0, 0)'
					}
				}
			],
			yAxes: [
				{
					display: false,
					gridLines: {
						color: 'rgba(0, 0, 0, 0)'
					},
					ticks: {
						beginAtZero: false,
						min: 0,
						max: 350,
						stepSize: 1
					}
				}
			]
		},
		elements: {
			line: {
				tension: 0
			},
			point: {
				radius: 0
			}
		},
		tooltips: {
			custom: function( tooltip ) {

				if ( ! tooltip ) {
					return;
				}

				// Disable displaying the color box
				tooltip.displayColors = false;
			},
			callbacks: {
				title: function( tooltipItem, data ) {
					if ( 0 === tooltipItem[0].datasetIndex ) {
						return tooltipItem[0].yLabel + ' Submissions';
					} else if ( 1 === tooltipItem[0].datasetIndex ) {
						return tooltipItem[0].yLabel + ' Views';
					}
				},
				label: function( tooltipItem, data ) {
					return tooltipItem.xLabel;
				},

				// Set label text color
                labelTextColor: function( tooltipItem, chart ) {
                    return '#AAAAAA';
                }
            }
		}
	};

	var myChart = new Chart( demoChartPublished, {
		type: 'line',
		fill: 'start',
		data: chartData,
		options: chartOptions
	});

	var myChart = new Chart( demoChartDrafted, {
		type: 'line',
		fill: 'start',
		data: chartDataDraft,
		options: chartOptions
	});

}( jQuery ) );
*/
