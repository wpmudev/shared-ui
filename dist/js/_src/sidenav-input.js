function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

(function ($) {
  // Enable strict mode.
  'use strict'; // Define global SUI object if it doesn't exist.

  if ('object' !== _typeof(window.SUI)) {
    window.SUI = {};
  }

  SUI.floatInput = function () {
    $('body').ready(function () {
      var $moduleName = $('.sui-sidenav .sui-with-floating-input'),
          $pageHeader = $('.sui-header-inline'),
          $pageTitle = $pageHeader.find('.sui-header-title');
      var $titleWidth = $pageTitle.width(),
          $navWidth = $pageHeader.next().find('.sui-sidenav').width();

      if ($titleWidth > $navWidth) {
        $moduleName.each(function () {
          $(this).css({
            'left': $titleWidth + 20 + 'px'
          });
        });
      }
    });
  };

  SUI.floatInput();
})(jQuery);