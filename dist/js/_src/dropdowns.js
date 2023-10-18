function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

(function ($) {
  // Enable strict mode.
  'use strict'; // Define global SUI object if it doesn't exist.

  if ('object' !== _typeof(window.SUI)) {
    window.SUI = {};
  }

  SUI.linkDropdown = function () {
    function closeAllDropdowns($except) {
      var $dropdowns = $('.sui-2-12-23 .sui-dropdown');

      if ($except) {
        $dropdowns = $dropdowns.not($except);
      }

      $dropdowns.removeClass('open');
    }

    $('body').on('click', '.sui-dropdown-anchor', function (e) {
      var $button = $(this),
          $parent = $button.parent();
      closeAllDropdowns($parent);

      if ($parent.hasClass('sui-dropdown')) {
        $parent.toggleClass('open');
      }

      e.preventDefault();
    });
    $('body').on('mouseup', function (e) {
      var $anchor = $('.sui-2-12-23 .sui-dropdown-anchor');

      if (!$anchor.is(e.target) && 0 === $anchor.has(e.target).length) {
        closeAllDropdowns();
      }
    });
  };

  SUI.linkDropdown();
})(jQuery);