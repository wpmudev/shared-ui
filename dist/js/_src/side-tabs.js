function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function ($) {
  // Enable strict mode
  'use strict'; // Define global SUI object if it doesn't exist

  if ('object' !== _typeof(window.SUI)) {
    window.SUI = {};
  }

  SUI.sideTabs = function (element) {
    var $this = $(element),
        $label = $this.parent('label'),
        $data = $this.data('tab-menu'),
        $wrapper = $this.closest('.sui-side-tabs'),
        $alllabels = $wrapper.find('>.sui-tabs-menu .sui-tab-item'),
        $allinputs = $alllabels.find('input'),
        newContent;
    $this.on('click', function (e) {
      $alllabels.removeClass('active');
      $allinputs.removeAttr('checked');
      $wrapper.find('.sui-tabs-content>div[data-tab-content]').removeClass('active');
      $label.addClass('active');
      $this.attr('checked', 'checked');
      newContent = $wrapper.find('.sui-tabs-content div[data-tab-content="' + $data + '"]');

      if (newContent.length) {
        newContent.addClass('active');
      }
    });
  };

  $('.sui-2-5-2 .sui-side-tabs label.sui-tab-item input').each(function () {
    SUI.sideTabs(this);
  });
})(jQuery);