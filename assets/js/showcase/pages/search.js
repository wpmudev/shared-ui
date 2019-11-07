( function() {

	function displaySearchResults( results, store ) {

		var searchResults = document.getElementById( 'search-results' );

		if ( results.length ) { // Are there any results?

			let appendString = '';

			for ( let i = 0; i < results.length; i++ ) {  // Iterate over the results
				let item = store[results[i].ref];
				appendString += '<div class="sui-box">';
					appendString += '<div class="sui-box-body">';
						appendString += '<h4 style="margin-top: 0; margin-bottom: 0;"><a href="' + item.url + '"><strong>' + item.title + '</strong></a></h3>';
						appendString += '<p>' + item.content.substring( 0, 150 ) + '...</p>';
					appendString += '</div>';
				appendString += '</div>';
			}

			searchResults.innerHTML = appendString;
		} else {
			searchResults.innerHTML = '<li>No results found</li>';
		}
	}

	function getQueryVariable( variable ) {
		let query = window.location.search.substring( 1 );
		let vars = query.split( '&' );

		for ( let i = 0; i < vars.length; i++ ) {
			let pair = vars[i].split( '=' );

			if ( pair[0] === variable ) {
				return decodeURIComponent( pair[1].replace( /\+/g, '%20' ) );
			}
		}
	}

	let searchTerm = getQueryVariable( 'query' );

	if ( searchTerm ) {

		document.getElementById( 'search-box' ).setAttribute( 'value', searchTerm );

		// Initalize lunr with the fields it will be searching on. I've given title
		// a boost of 10 to indicate matches on this field are more important.
		let idx = lunr( function() {
			this.ref( 'id' );
			this.field( 'title', { boost: 10 });
			this.field( 'content' );
		});

		for ( let key in window.store ) { // Add the data to lunr

			idx.add({
				'id': key,
				'title': window.store[key].title,
				'content': window.store[key].content
			});

			let results = idx.search( searchTerm ); // Get lunr to perform a search

			displaySearchResults( results, window.store ); // We'll write this in the next section

		}
	}
}() );
