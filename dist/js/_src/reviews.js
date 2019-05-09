( function( $ ) {

    var endpoint = 'https://api.reviews.co.uk/merchant/reviews?store=wpmudev-org';

    // Update the reviews with the live stats.
    $( '.sui-2-3-26 .sui-reviews' ).each( function() {
        var review = $( this );
        $.get( endpoint, function( data ) {
            var stars = Math.round( data.stats.average_rating );
            var starsBlock = review.find( '.sui-reviews__stars' )[ 0 ];
            var i;
            for ( i = 0; i < stars; i++ ) {
                starsBlock.innerHTML += '<i class="sui-icon-star" aria-hidden="true"></i> ';
            }
            review.find( '.sui-reviews-rating' )[ 0 ].innerHTML = data.stats.average_rating;
            review.find( '.sui-reviews-customer-count' )[ 0 ].innerHTML = data.stats.total_reviews;
        });
    });

}( jQuery ) );
