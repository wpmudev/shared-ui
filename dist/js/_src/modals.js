function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function ($) {
  // Enable strict mode.
  'use strict'; // Define global SUI object if it doesn't exist.

  if ('object' !== _typeof(window.SUI)) {
    window.SUI = {};
  }

  document.addEventListener('DOMContentLoaded', function () {
    var mainEl = $('.sui-wrap');

    if (undefined === SUI.dialogs) {
      SUI.dialogs = {};
    }

    $('.sui-2-5-2 .sui-dialog').each(function () {
      if (!SUI.dialogs.hasOwnProperty(this.id)) {
        SUI.dialogs[this.id] = new A11yDialog(this, mainEl);
      }
    });
  });
})(jQuery);