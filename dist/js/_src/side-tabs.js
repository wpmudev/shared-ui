function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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
      $allinputs.attr('checked', false);
      $allinputs.attr('aria-selected', false);
      $wrapper.find('> .sui-tabs-content > div[data-tab-content]').removeClass('active');
      $label.addClass('active');
      $this.attr('checked', true);
      $this.attr('aria-selected', true);
      newContent = $wrapper.find('.sui-tabs-content div[data-tab-content="' + $data + '"]');

      if (newContent.length) {
        newContent.addClass('active');
      }
    });
  };

  $('.sui-2-12-23 .sui-side-tabs label.sui-tab-item input').each(function () {
    SUI.sideTabs(this);
  });
})(jQuery);