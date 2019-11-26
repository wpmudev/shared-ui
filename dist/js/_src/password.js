function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function ($) {
  // Enable strict mode.
  'use strict'; // Define global SUI object if it doesn't exist.

  if ('object' !== _typeof(window.SUI)) {
    window.SUI = {};
  }

  SUI.showHidePassword = function () {
    $('.sui-2-5-2 .sui-form-field').each(function () {
      var $this = $(this);

      if (0 !== $this.find('input[type="password"]').length) {
        $this.find('[class*="sui-button"], .sui-password-toggle').off('click.toggle-password').on('click.toggle-password', function () {
          var $button = $(this),
              $input = $button.parent().find('input'),
              $icon = $button.find('i');
          $button.parent().toggleClass('sui-password-visible');
          $button.find('.sui-password-text').toggleClass('sui-hidden');

          if ($button.parent().hasClass('sui-password-visible')) {
            $input.prop('type', 'text');
            $icon.removeClass('sui-icon-eye').addClass('sui-icon-eye-hide');
          } else {
            $input.prop('type', 'password');
            $icon.removeClass('sui-icon-eye-hide').addClass('sui-icon-eye');
          }
        });
      }
    });
  };

  SUI.showHidePassword();
})(jQuery);