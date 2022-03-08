( function( $ ) {

	// Enable strict mode.
    'use strict';

	let specs = specs || {};
	specs.Utils = specs.Utils || {};

	specs.Utils.createLeftColumn = () => {
		const column = document.createElement( 'div' );
		column.classList.add( 'sui-box-settings-col-1' );
		column.innerHTML = '<h3 class="sui-settings-label">Specifications</h3>';

		return column;
	};

	specs.Utils.createRightColumn = ( row, hasTitle = false ) => {
		const column = document.createElement( 'div' );
		column.classList.add( 'sui-box-settings-col-2' );

		const title = document.createElement( 'h3' );
		title.classList.add( 'sui-settings-label', 'sui-dark' );
		title.textContent = 'Specifications';

		if ( hasTitle ) {
			column.appendChild( title );
		}

		// Append table to right column.
		column.appendChild( createTable( row, title ) );

		return column;
	};

	const createTable = ( row ) => {
		const table = document.createElement( 'table' );
		const tbody = document.createElement( 'tbody' );
		table.classList.add( 'sui-table' );
		table.style.maxWidth = '720px';

		// Create the "version" row.
		const hasVersion = row.hasAttribute( 'version' );
		const getVersion = row.getAttribute( 'version' );
		const checkVersion = hasVersion && 'string' === typeof getVersion && '' !== getVersion;

		if ( checkVersion ) {
			tbody.appendChild(
				createVersionRow( getVersion )
			);
		}

		// Create the "utilities" row.
		const hasUtilities = row.hasAttribute( 'utilities' );
		const getUtilities = row.getAttribute( 'utilities' );
		const checkUtilities = hasUtilities && 'string' === typeof getUtilities && '' !== getUtilities;
		const isUtilitiesSupported = 'supported' === getUtilities;

		const hasUtilitiesPage = row.hasAttribute( 'utilities-page' );
		const getUtilitiesPage = row.getAttribute( 'utilities-page' );
		const checkUtilitiesPage = hasUtilitiesPage && 'string' === typeof getUtilitiesPage && '' !== getUtilitiesPage;
		const showUtilitiesDescription = checkUtilitiesPage ?
			`This will tell you if the element supports the modifier classes listed on <a href="${ row.getAttribute( 'utilities-page' ) }"><strong>Utilities</strong></a> page.` :
			'This will tell you if the element supports the modifier classes listed on <strong>Utilities</strong> page.';

		if ( checkUtilities ) {
			tbody.appendChild(
				createSupportRow(
					'Utilities',
					isUtilitiesSupported ? true : false,
					showUtilitiesDescription
				)
			);
		}

		// Create the "monochrome" row.
		const hasMonochrome = row.hasAttribute( 'monochrome' );
		const getMonochrome = row.getAttribute( 'monochrome' );
		const checkMonochrome = hasMonochrome && 'string' === typeof getMonochrome && '' !== getMonochrome;
		const isMonochromeSupported = 'supported' === getMonochrome;

		if ( checkMonochrome ) {
			tbody.appendChild(
				createSupportRow(
					'Monochrome',
					isMonochromeSupported ? true : false,
					'This will tell you if the element supports the Colour Accessible option found on our plugins\' Settings page.'
				)
			);
		}

		// Create the "RTL" row.
		const hasRTL = row.hasAttribute( 'rtl-lang' );
		const getRTL = row.getAttribute( 'rtl-lang' );
		const checkRTL = hasRTL && 'string' === typeof getRTL && '' !== getRTL;
		const isRTLSupported = 'supported' === getRTL;

		if ( checkRTL ) {
			tbody.appendChild(
				createSupportRow(
					'RTL Language',
					isRTLSupported ? true : false,
					'This will tell you if the element supports right-to-left langues.'
				)
			);
		}

		// Append table body.
		table.appendChild( tbody );

		return table;
	};

	const createVersionRow = ( minVersion ) => {
		const row = document.createElement( 'tr' );

		const title = document.createElement( 'th' );
		title.setAttribute( 'scope', 'row' );
		title.innerHTML = 'Version';

		row.appendChild( title );

		const version = document.createElement( 'td' );
		version.innerHTML = `<span class="sui-tag sui-tag-yellow">^${ minVersion }</span>`;

		row.appendChild( version );

		const description = document.createElement( 'td' );
		description.setAttribute( 'colspan', '3' );
		description.innerHTML = 'This is the minimum required version of SUI to use with this element in order for it to work properly.';

		row.appendChild( description );

		return row;
	};

	const createSupportRow = ( titleName, supportStatus = false, descriptionText ) => {
		const row = document.createElement( 'tr' );

		const title = document.createElement( 'th' );
		title.setAttribute( 'scope', 'row' );
		title.innerHTML = titleName;

		row.appendChild( title );

		const support = document.createElement( 'td' );
		const supportIcon = supportStatus ? 'sui-icon-check sui-success' : 'sui-icon-close sui-error';
		const supportLabel = supportStatus ? 'Supported' : 'Unsupported';
		support.style.color = supportStatus ? '#1ABC9C' : '#FF6D6D';
		support.style.fontWeight = '500';
		support.innerHTML = '<span class="' + supportIcon + ' sui-md" style="position: relative; top: 2px; margin-right: 0;" aria-hidden="true"></span> ' + supportLabel;

		row.appendChild( support );

		const description = document.createElement( 'td' );
		description.setAttribute( 'colspan', '3' );
		description.innerHTML = descriptionText;

		row.appendChild( description );

		return row;
	};

	const loadSpecifications = ( elementId ) => {

		// Get element.
		const row = document.getElementById( elementId );

		// Check if element exists.
		if ( 'undefined' === typeof row || null === row ) {
			return;
		}

		if ( row.hasAttribute( 'single-column' ) ) {
			row.appendChild( specs.Utils.createRightColumn( row, true ) );
		} else {
			row.appendChild( specs.Utils.createLeftColumn() );
			row.appendChild( specs.Utils.createRightColumn( row ) );
		}

		row.classList.add( 'sui-box-settings-row' );

	};

	loadSpecifications( 'showcase-specs' );

}( jQuery ) );
