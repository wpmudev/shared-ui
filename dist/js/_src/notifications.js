function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

(function ($) {
  // Enable strict mode.
  'use strict'; // Define global SUI object if it does not exist.

  var _this = this;

  if ('object' !== _typeof(window.SUI)) {
    window.SUI = {};
  }
  /**
   * @desc Notifications function to show when alert.
   *
   * Assumptions: The element serving as the alert container is present in the
   * DOM and hidden. The alert container has role='alert'.
   *
   * @param noticeId
   * The ID of the element serving as the alert container.
   *
   * @param noticeMessage
   * The content to be printed when the alert shows up. It accepts HTML.
   *
   * @param noticeOptions
   * An object with different paramethers to modify the alert appearance.
   */


  SUI.openNotice = function (noticeId, noticeMessage, noticeOptions) {
    // Get notification node by ID.
    var noticeNode = $('#' + noticeId);
    var nodeWrapper = noticeNode.parent(); // Check if element ID exists.

    if (null === typeof noticeNode || 'undefined' === typeof noticeNode) {
      throw new Error('No element found with id="' + noticeId + '".');
    } // Check if element has correct attribute.


    if ('alert' !== noticeNode.attr('role')) {
      throw new Error('Notice requires a DOM element with ARIA role of alert.');
    } // Check if notice message is empty.


    if (null === typeof noticeMessage || 'undefined' === typeof noticeMessage || '' === noticeMessage) {
      throw new Error('Notice requires a message to print.');
    }

    var utils = utils || {};
    /**
     * @desc Allowed types for notification.
     */

    utils.allowedNotices = ['info', 'blue', 'green', 'success', 'yellow', 'warning', 'red', 'error', 'purple', 'upsell'];
    /**
     * @desc Verify if property is an array.
     */

    utils.isObject = function (obj) {
      if ((null !== obj || 'undefined' !== obj) && $.isPlainObject(obj)) {
        return true;
      }

      return false;
    };
    /**
     * @desc Deep merge two objects.
     * Watch out for infinite recursion on circular references.
     */


    utils.deepMerge = function (target) {
      for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
      }

      if (!sources.length) {
        return target;
      }

      var source = sources.shift();

      if (utils.isObject(target) && utils.isObject(source)) {
        for (var key in source) {
          if (utils.isObject(source[key])) {
            if (!target[key]) {
              Object.assign(target, _defineProperty({}, key, {}));
            }

            utils.deepMerge(target[key], source[key]);
          } else {
            Object.assign(target, _defineProperty({}, key, source[key]));
          }
        }
      }

      return utils.deepMerge.apply(utils, [target].concat(sources));
    };
    /**
     * @desc Declare default styling options for notifications.
     */


    utils.setProperties = function () {
      var incomingOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      utils.options = [];
      var defaults = {
        type: 'default',
        icon: 'info',
        dismiss: {
          show: false,
          label: 'Close this notice',
          tooltip: ''
        },
        autoclose: {
          show: true,
          timeout: 3000
        }
      };
      utils.options[0] = utils.deepMerge(defaults, incomingOptions);
    };

    utils.setProperties(noticeOptions);
    /**
     * @desc Build notice dismiss.
     */

    utils.buildDismiss = function () {
      var html = '';
      var dismiss = utils.options[0].dismiss;

      if (true === dismiss.show) {
        html = document.createElement('div');
        html.className = 'sui-notice-actions';
        var innerHTML = '';

        if ('' !== dismiss.tooltip) {
          if (nodeWrapper.hasClass('sui-floating-notices')) {
            innerHTML += '<div class="sui-tooltip sui-tooltip-bottom" data-tooltip="' + dismiss.tooltip + '">';
          } else {
            innerHTML += '<div class="sui-tooltip" data-tooltip="' + dismiss.tooltip + '">';
          }
        }

        innerHTML += '<button class="sui-button-icon">';
        innerHTML += '<span class="sui-icon-check" aria-hidden="true"></span>';

        if ('' !== dismiss.label) {
          innerHTML += '<span class="sui-screen-reader-text">' + dismiss.label + '</span>';
        }

        innerHTML += '</button>';

        if ('' !== dismiss.tooltip) {
          innerHTML += '</div>';
        }

        html.innerHTML = innerHTML;
      }

      return html;
    };
    /**
     * @desc Build notice icon.
     */


    utils.buildIcon = function () {
      var html = '';
      var icon = utils.options[0].icon;

      if ('' !== icon || 'undefined' !== typeof icon || null !== typeof icon) {
        html = document.createElement('span');
        html.className += 'sui-notice-icon sui-icon-' + icon + ' sui-md';
        html.setAttribute('aria-hidden', true);

        if ('loader' === icon) {
          html.classList.add('sui-loading');
        }
      }

      return html;
    };
    /**
     * @desc Build notice message.
     */


    utils.buildMessage = function () {
      var html = document.createElement('div');
      html.className = 'sui-notice-message';
      html.innerHTML = noticeMessage;
      html.prepend(utils.buildIcon());
      return html;
    };
    /**
     * @desc Build notice markup.
     */


    utils.buildNotice = function () {
      var html = document.createElement('div');
      html.className = 'sui-notice-content';
      html.append(utils.buildMessage(), utils.buildDismiss());
      return html;
    };
    /**
     * @desc Show notification message.
     */


    utils.showNotice = function (animation) {
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
      var type = utils.options[0].type;
      var dismiss = utils.options[0].dismiss;
      var autoclose = utils.options[0].autoclose; // Add active class.

      noticeNode.addClass('sui-active'); // Check for allowed notification types.

      $.each(utils.allowedNotices, function (key, value) {
        if (value === type) {
          noticeNode.addClass('sui-notice-' + value);
        }
      }); // Remove tabindex.

      noticeNode.removeAttr('tabindex'); // Print notification message.

      noticeNode.html(utils.buildNotice()); // Show animation.

      if ('slide' === animation) {
        noticeNode.slideDown(timeout, function () {
          // Check if dismiss button enabled.
          if (true === dismiss.show) {
            // Focus dismiss button.
            noticeNode.find('.sui-notice-actions button').trigger('focus'); // Dismiss button.

            noticeNode.find('.sui-notice-actions button').on('click', function () {
              SUI.closeNotice(noticeId);
            });
          } else {
            // Check if notice auto-closes.
            if (true === autoclose.show) {
              setTimeout(function () {
                return SUI.closeNotice(noticeId);
              }, parseInt(autoclose.timeout));
            }
          }
        });
      } else if ('fade' === animation) {
        noticeNode.fadeIn(timeout, function () {
          // Check if dismiss button enabled.
          if (true === dismiss.show) {
            // Focus dismiss button.
            noticeNode.find('.sui-notice-actions button').trigger('focus'); // Dismiss button.

            noticeNode.find('.sui-notice-actions button').on('click', function () {
              SUI.closeNotice(noticeId);
            });
          } else {
            // Check if notice auto-closes.
            if (true === autoclose.show) {
              setTimeout(function () {
                return SUI.closeNotice(noticeId);
              }, parseInt(autoclose.timeout));
            }
          }
        });
      } else {
        noticeNode.show(timeout, function () {
          // Check if dismiss button enabled.
          if (true === dismiss.show) {
            // Focus dismiss button.
            noticeNode.find('.sui-notice-actions button').trigger('focus'); // Dismiss button.

            noticeNode.find('.sui-notice-actions button').on('click', function () {
              SUI.closeNotice(noticeId);
            });
          } else {
            // Check if notice auto-closes.
            if (true === autoclose.show) {
              setTimeout(function () {
                return SUI.closeNotice(noticeId);
              }, parseInt(autoclose.timeout));
            }
          }
        });
      }
    };
    /**
     * @desc Open notification message.
     */


    utils.openNotice = function (animation) {
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

      if (noticeNode.hasClass('sui-active')) {
        if ('slide' === animation) {
          noticeNode.slideUp(timeout, function () {
            utils.showNotice('slide', timeout);
          });
        } else if ('fade' === animation) {
          noticeNode.fadeOut(timeout, function () {
            utils.showNotice('fade', timeout);
          });
        } else {
          noticeNode.hide(timeout, function () {
            utils.showNotice(null, timeout);
          });
        }
      } else {
        // Show notice.
        utils.showNotice(animation, timeout);
      }
    };
    /**
     * @desc Initialize function.
     */


    var init = function init() {
      /**
       * When notice should float, it needs to be wrapped inside:
       * <div class="sui-floating-notices"></div>
       *
       * IMPORTANT: This wrapper goes before "sui-wrap" closing tag
       * and after modals markup.
       */
      if (nodeWrapper.hasClass('sui-floating-notices')) {
        utils.openNotice('slide');
      } else {
        utils.openNotice('fade');
      }
    };

    init();
    return _this;
  };
  /**
   * @desc Close and clear the alert.
   *
   * Assumptions: The element that will trigger this function is part of alert content.
   *
   * @param noticeId
   * The ID of the element serving as the alert container.
   *
   */


  SUI.closeNotice = function (noticeId) {
    // Get notification node by ID.
    var noticeNode = $('#' + noticeId);
    var nodeWrapper = noticeNode.parent(); // Check if element ID exists.

    if (null === typeof noticeNode || 'undefined' === typeof noticeNode) {
      throw new Error('No element found with id="' + noticeId + '".');
    }

    var utils = utils || {};
    /**
     * @desc Allowed types for notification.
     */

    utils.allowedNotices = ['info', 'blue', 'green', 'success', 'yellow', 'warning', 'red', 'error', 'purple', 'upsell'];
    /**
     * @desc Destroy notification.
     */

    utils.hideNotice = function () {
      // Remove active class.
      noticeNode.removeClass('sui-active'); // Remove styling classes.

      $.each(utils.allowedNotices, function (key, value) {
        noticeNode.removeClass('sui-notice-' + value);
      }); // Prevent TAB key from accessing the element.

      noticeNode.attr('tabindex', '-1'); // Remove all content from notification.

      noticeNode.empty();
    };
    /**
     * @desc Close notification message.
     */


    utils.closeNotice = function (animation) {
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

      // Close animation.
      if ('slide' === animation) {
        noticeNode.slideUp(timeout, function () {
          return utils.hideNotice();
        });
      } else if ('fade' === animation) {
        noticeNode.fadeOut(timeout, function () {
          return utils.hideNotice();
        });
      } else {
        noticeNode.hide(timeout, function () {
          return utils.hideNotice();
        });
      }
    };
    /**
     * @desc Initialize function.
     */


    var init = function init() {
      /**
       * When notice should float, it needs to be wrapped inside:
       * <div class="sui-floating-notices"></div>
       *
       * IMPORTANT: This wrapper goes before "sui-wrap" closing tag
       * and after modals markup.
       */
      if (nodeWrapper.hasClass('sui-floating-notices')) {
        utils.closeNotice('slide');
      } else {
        utils.closeNotice('fade');
      }
    };

    init();
    return _this;
  };
  /**
   * @desc Trigger open and close alert notification functions through element attributes.
   *
   * Assumptions: Elements in charge of triggering the actions will be a button or a non-hyperlink element.
   *
   */


  SUI.notice = function () {
    var notice = notice || {};
    notice.Utils = notice.Utils || {};
    /**
     * @desc Click an element to open a notification.
     */

    notice.Utils.Open = function (element) {
      element.on('click', function () {
        self = $(this); // Define main variables for open function.

        var noticeId = self.attr('data-notice-open');
        var noticeMessage = '';
        var noticeOptions = {}; // Define index to use on for loops.

        var i; // Define maximum number of paragraphs.

        var numbLines = 4; // Check if `data-notice-message` exists.

        if (self.is('[data-notice-message]') && '' !== self.attr('data-notice-message')) {
          noticeMessage += self.attr('data-notice-message'); // If `data-notice-message` doesn't exists, look for `data-notice-paragraph-[i]` attributes.
        } else {
          for (i = 0; i < numbLines; i++) {
            var index = i + 1;
            var paragraph = 'data-notice-paragraph-' + index;

            if (self.is('[' + paragraph + ']') && '' !== self.attr(paragraph)) {
              noticeMessage += '<p>' + self.attr(paragraph) + '</p>';
            }
          }
        } // Check if `data-notice-type` exists.


        if (self.is('[data-notice-type]') && '' !== self.attr('data-notice-dismiss-type')) {
          noticeOptions.type = self.attr('data-notice-type');
        } // Check if `data-notice-icon` exists.


        if (self.is('[data-notice-icon]')) {
          noticeOptions.icon = self.attr('data-notice-icon');
        } // Check if `data-notice-dismiss` exists.


        if (self.is('[data-notice-dismiss]')) {
          noticeOptions.dismiss = {};

          if ('true' === self.attr('data-notice-dismiss')) {
            noticeOptions.dismiss.show = true;
          } else if ('false' === self.attr('data-notice-dismiss')) {
            noticeOptions.dismiss.show = false;
          }
        } // Check if `data-notice-dismiss-label` exists.


        if (self.is('[data-notice-dismiss-label]') && '' !== self.attr('data-notice-dismiss-label')) {
          noticeOptions.dismiss.label = self.attr('data-notice-dismiss-label');
        } // Check if `data-notice-dismiss-label` exists.


        if (self.is('[data-notice-dismiss-tooltip]') && '' !== self.attr('data-notice-dismiss-tooltip')) {
          noticeOptions.dismiss.tooltip = self.attr('data-notice-dismiss-tooltip');
        } // Check if `data-notice-autoclose` exists.


        if (self.is('[data-notice-autoclose]')) {
          noticeOptions.autoclose = {};

          if ('true' === self.attr('data-notice-autoclose')) {
            noticeOptions.autoclose.show = true;
          } else if ('false' === self.attr('data-notice-autoclose')) {
            noticeOptions.autoclose.show = false;
          }
        } // Check if `data-notice-autoclose-timeout` exists.


        if (self.is('[data-notice-autoclose-timeout]')) {
          noticeOptions.autoclose = noticeOptions.autoclose || {};
          noticeOptions.autoclose.timeout = parseInt(self.attr('data-notice-autoclose-timeout'));
        }

        SUI.openNotice(noticeId, noticeMessage, noticeOptions);
      });
    };
    /**
     * @desc Close a notification.
     */


    notice.Utils.Close = function (element) {
      element.on('click', function () {
        self = $(this);
        var noticeId;

        if (self.is('[data-notice-close]')) {
          noticeId = self.closest('.sui-notice').attr('id');

          if ('' !== self.attr('[data-notice-close]')) {
            noticeId = self.attr('data-notice-close');
          }

          SUI.closeNotice(noticeId);
        }
      });
    };

    var init = function init() {
      // Open a notification.
      var btnOpen = $('[data-notice-open]');
      notice.Utils.Open(btnOpen); // Close a notification.

      var btnClose = $('[data-notice-close]');
      notice.Utils.Close(btnClose);
    };

    init();
    return _this;
  };

  SUI.notice();
})(jQuery);