( function( $ ) {

	// Enable strict mode.
	'use strict';

    var _$stickies = [].slice.call(document.querySelectorAll('.sui-box-sticky'));

    _$stickies.forEach(function(_$sticky){
        if (CSS.supports && CSS.supports('position', 'sticky')) {
            apply_sticky_class(_$sticky);

            window.addEventListener('scroll', function(){
                apply_sticky_class(_$sticky);
            })
        }
    });

    function apply_sticky_class(_$sticky){
        var currentOffset = _$sticky.getBoundingClientRect().top;
        var stickyOffset = parseInt( getComputedStyle(_$sticky).top.replace('px','') );
        var isStuck = currentOffset <= stickyOffset;

        if (isStuck) {
            _$sticky.classList.add('sui-is-sticky');
        } else {
            _$sticky.classList.remove('sui-is-sticky');
        }
    }
}( jQuery ) );
