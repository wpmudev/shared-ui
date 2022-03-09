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
		createVersion( tbody, row );

		// Create the "utilities" row.
		const hasUtilitiesPage = row.hasAttribute( 'utilities-page' );
		const getUtilitiesPage = row.getAttribute( 'utilities-page' );
		const checkUtilitiesPage = hasUtilitiesPage && 'string' === typeof getUtilitiesPage && '' !== getUtilitiesPage;
		const showUtilitiesDescription = checkUtilitiesPage ?
			`This will tell you if the element supports the modifier classes listed on <a href="${ row.getAttribute( 'utilities-page' ) }"><strong>Utilities</strong></a> page.` :
			'This will tell you if the element supports the modifier classes listed on <strong>Utilities</strong> page.';

		createSupport(
			tbody,
			row,
			{
				id: 'utilities',
				title: 'Utilities',
				description: showUtilitiesDescription
			}
		);

		// Create the "monochrome" row.
		createSupport(
			tbody,
			row,
			{
				id: 'monochrome',
				title: 'Monochrome',
				description: 'This will tell you if the element supports the Colour Accessible option found on our plugins\' Settings page.'
			}
		);

		// Create the "RTL" row.
		createSupport(
			tbody,
			row,
			{
				id: 'rtl-lang',
				title: 'RTL Language',
				description: 'This will tell you if the element supports right-to-left langues.'
			}
		);

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

	const createVersion = ( tbody, row ) => {
		const hasVersion = row.hasAttribute( 'version' );
		const getVersion = row.getAttribute( 'version' );
		const checkVersion = hasVersion && 'string' === typeof getVersion && '' !== getVersion;

		tbody.appendChild(
			createVersionRow(
				checkVersion ? getVersion : '2.0.0'
			)
		);

		return tbody;
	};

	const createSupportRow = ( titleName, status = false, descriptionText ) => {
		const row = document.createElement( 'tr' );

		const title = document.createElement( 'th' );
		title.setAttribute( 'scope', 'row' );
		title.innerHTML = titleName;

		row.appendChild( title );

		const support = document.createElement( 'td' );
		support.style.fontWeight = '500';

		let supportIcon = 'sui-icon-pause';
		let supportLabel = 'Not Apply';

		if ( 'boolean' === typeof status ) {
			if ( status ) {
				supportIcon = 'sui-icon-check sui-success';
				supportLabel = 'Supported';
			} else {
				supportIcon = 'sui-icon-close sui-error';
				supportLabel = 'Unsupported';
			}

			support.style.color = status ? '#1ABC9C' : '#FF6D6D';
		}

		support.innerHTML =
			'<span class="' + supportIcon + ' sui-md" style="position: relative; top: 2px; margin-right: 0;" aria-hidden="true"></span> ' + supportLabel;

		row.appendChild( support );

		const description = document.createElement( 'td' );
		description.setAttribute( 'colspan', '3' );
		description.innerHTML = descriptionText;

		row.appendChild( description );

		return row;
	};

	const createSupport = ( tbody, row, mode ) => {
		const source = Object.assign(
			{
				id: 'undefined',
				title: 'Undefined',
				description: ''
			},
			mode
		);

		const hasMode = row.hasAttribute( source.id );
		const getMode = row.getAttribute( source.id );
		const checkMode = hasMode && 'string' === typeof getMode && '' !== getMode;

		let support = null;

		if ( checkMode ) {
			if ( 'true' === getMode ) {
				support = true;
			} else if ( 'false' === getMode ) {
				support = false;
			}
		}

		tbody.appendChild(
			createSupportRow(
				source.title,
				support,
				source.description
			)
		);

		return tbody;
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
