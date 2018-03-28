/*!
 * WPMU DEV Shared UI
 * Copyright 2018 Incsub (https://incsub.com)
 * Licensed under GPL v2 (http://www.gnu.org/licenses/gpl-2.0.html)
 */
/* global NodeList, Element, define */

(function (global) {
  'use strict';

  var FOCUSABLE_ELEMENTS = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];
  var TAB_KEY = 9;
  var ESCAPE_KEY = 27;
  var focusedBeforeDialog;

  /**
   * Define the constructor to instantiate a dialog
   *
   * @constructor
   * @param {Element} node
   * @param {(NodeList | Element | string)} targets
   */
  function A11yDialog (node, targets) {
    // Prebind the functions that will be bound in addEventListener and
    // removeEventListener to avoid losing references
    this._show = this.show.bind(this);
    this._hide = this.hide.bind(this);
    this._maintainFocus = this._maintainFocus.bind(this);
    this._bindKeypress = this._bindKeypress.bind(this);

    // Keep a reference of the node on the instance
    this.node = node;

    // Keep an object of listener types mapped to callback functions
    this._listeners = {};

    // Initialise everything needed for the dialog to work properly
    this.create(targets);
  }

  /**
   * Set up everything necessary for the dialog to be functioning
   *
   * @param {(NodeList | Element | string)} targets
   * @return {this}
   */
  A11yDialog.prototype.create = function (targets) {
    // Keep a collection of nodes to disable/enable when toggling the dialog
    this._targets = this._targets || collect(targets) || getSiblings(this.node);

    // Make sure the dialog element is disabled on load, and that the `shown`
    // property is synced with its value
    this.node.setAttribute('aria-hidden', true);
    this.shown = false;

    // Keep a collection of dialog openers, each of which will be bound a click
    // event listener to open the dialog
    this._openers = $$('[data-a11y-dialog-show="' + this.node.id + '"]');
    this._openers.forEach(function (opener) {
      opener.addEventListener('click', this._show);
    }.bind(this));

    // Keep a collection of dialog closers, each of which will be bound a click
    // event listener to close the dialog
    this._closers = $$('[data-a11y-dialog-hide]', this.node)
      .concat($$('[data-a11y-dialog-hide="' + this.node.id + '"]'));
    this._closers.forEach(function (closer) {
      closer.addEventListener('click', this._hide);
    }.bind(this));

    // Execute all callbacks registered for the `create` event
    this._fire('create');

    return this;
  };

  /**
   * Show the dialog element, disable all the targets (siblings), trap the
   * current focus within it, listen for some specific key presses and fire all
   * registered callbacks for `show` event
   *
   * @param {Event} event
   * @return {this}
   */
  A11yDialog.prototype.show = function (event) {
    // If the dialog is already open, abort
    if (this.shown) {
      return this;
    }

    var overlay = this.node.getElementsByClassName('sui-dialog-overlay');
    var content = this.node.getElementsByClassName('sui-dialog-content');
    content[0].className = 'sui-dialog-content sui-bounce-in';
    overlay[0].className = 'sui-dialog-overlay sui-fade-in';

    this.shown = true;
    this.node.removeAttribute('aria-hidden');

    // Iterate over the targets to disable them by setting their `aria-hidden`
    // attribute to `true`; in case they already have this attribute, keep a
    // reference of their original value to be able to restore it later
    this._targets.forEach(function (target) {
      var original = target.getAttribute('aria-hidden');

      if (original) {
        target.setAttribute('data-a11y-dialog-original', original);
      }

      target.setAttribute('aria-hidden', 'true');
    });

    // Keep a reference to the currently focused element to be able to restore
    // it later, then set the focus to the first focusable child of the dialog
    // element
    focusedBeforeDialog = document.activeElement;
    setFocusToFirstItem(this.node);

    // Bind a focus event listener to the body element to make sure the focus
    // stays trapped inside the dialog while open, and start listening for some
    // specific key presses (TAB and ESC)
    document.body.addEventListener('focus', this._maintainFocus, true);
    document.addEventListener('keydown', this._bindKeypress);

    // Execute all callbacks registered for the `show` event
    this._fire('show', event);

    return this;
  };

  /**
   * Hide the dialog element, enable all the targets (siblings), restore the
   * focus to the previously active element, stop listening for some specific
   * key presses and fire all registered callbacks for `hide` event
   *
   * @param {Event} event
   * @return {this}
   */
  A11yDialog.prototype.hide = function (event) {
    // If the dialog is already closed, abort
    if (!this.shown) {
      return this;
    }


    var overlay = this.node.getElementsByClassName('sui-dialog-overlay');

    var content = this.node.getElementsByClassName('sui-dialog-content');

    content[0].className = 'sui-dialog-content sui-bounce-out';

    overlay[0].className = 'sui-dialog-overlay sui-fade-out';

    this.shown = false;
    // This has been set so there is enough time for the animation to show
    var timeout_node = this.node;
    setTimeout(function () {
		timeout_node.setAttribute('aria-hidden', 'true');
	}, 300);

    // Iterate over the targets to enable them by remove their `aria-hidden`
    // attribute or resetting them to their initial value
    this._targets.forEach(function (target) {
      var original = target.getAttribute('data-a11y-dialog-original');


      if (original) {
        target.setAttribute('aria-hidden', original);
        target.removeAttribute('data-a11y-dialog-original');
      } else {
        target.removeAttribute('aria-hidden');
      }
    });

    // If their was a focused element before the dialog was opened, restore the
    // focus back to it
    if (focusedBeforeDialog) {
      focusedBeforeDialog.focus();
    }

    // Remove the focus event listener to the body element and stop listening
    // for specific key presses
    document.body.removeEventListener('focus', this._maintainFocus, true);
    document.removeEventListener('keydown', this._bindKeypress);

    // Execute all callbacks registered for the `hide` event
    this._fire('hide', event);

    return this;
  };

  /**
   * Destroy the current instance (after making sure the dialog has been hidden)
   * and remove all associated listeners from dialog openers and closers
   *
   * @return {this}
   */
  A11yDialog.prototype.destroy = function () {
    // Hide the dialog to avoid destroying an open instance
    this.hide();

    // Remove the click event listener from all dialog openers
    this._openers.forEach(function (opener) {
      opener.removeEventListener('click', this._show);
    }.bind(this));

    // Remove the click event listener from all dialog closers
    this._closers.forEach(function (closer) {
      closer.removeEventListener('click', this._hide);
    }.bind(this));

    // Execute all callbacks registered for the `destroy` event
    this._fire('destroy');

    // Keep an object of listener types mapped to callback functions
    this._listeners = {};

    return this;
  };

  /**
   * Register a new callback for the given event type
   *
   * @param {string} type
   * @param {Function} handler
   */
  A11yDialog.prototype.on = function (type, handler) {
    if (typeof this._listeners[type] === 'undefined') {
      this._listeners[type] = [];
    }

    this._listeners[type].push(handler);

    return this;
  };

  /**
   * Unregister an existing callback for the given event type
   *
   * @param {string} type
   * @param {Function} handler
   */
  A11yDialog.prototype.off = function (type, handler) {
    var index = this._listeners[type].indexOf(handler);

    if (index > -1) {
      this._listeners[type].splice(index, 1);
    }

    return this;
  };

  /**
   * Iterate over all registered handlers for given type and call them all with
   * the dialog element as first argument, event as second argument (if any).
   *
   * @access private
   * @param {string} type
   * @param {Event} event
   */
  A11yDialog.prototype._fire = function (type, event) {
    var listeners = this._listeners[type] || [];

    listeners.forEach(function (listener) {
      listener(this.node, event);
    }.bind(this));
  };

  /**
   * Private event handler used when listening to some specific key presses
   * (namely ESCAPE and TAB)
   *
   * @access private
   * @param {Event} event
   */
  A11yDialog.prototype._bindKeypress = function (event) {
    // If the dialog is shown and the ESCAPE key is being pressed, prevent any
    // further effects from the ESCAPE key and hide the dialog
    if (this.shown && event.which === ESCAPE_KEY) {
      event.preventDefault();
      this.hide();
    }

    // If the dialog is shown and the TAB key is being pressed, make sure the
    // focus stays trapped within the dialog element
    if (this.shown && event.which === TAB_KEY) {
      trapTabKey(this.node, event);
    }
  };

  /**
   * Private event handler used when making sure the focus stays within the
   * currently open dialog
   *
   * @access private
   * @param {Event} event
   */
  A11yDialog.prototype._maintainFocus = function (event) {
    // If the dialog is shown and the focus is not within the dialog element,
    // move it back to its first focusable child
    if (this.shown && !this.node.contains(event.target)) {
      setFocusToFirstItem(this.node);
    }
  };

  /**
   * Convert a NodeList into an array
   *
   * @param {NodeList} collection
   * @return {Array<Element>}
   */
  function toArray (collection) {
    return Array.prototype.slice.call(collection);
  }

  /**
   * Query the DOM for nodes matching the given selector, scoped to context (or
   * the whole document)
   *
   * @param {String} selector
   * @param {Element} [context = document]
   * @return {Array<Element>}
   */
  function $$ (selector, context) {
    return toArray((context || document).querySelectorAll(selector));
  }

  /**
   * Return an array of Element based on given argument (NodeList, Element or
   * string representing a selector)
   *
   * @param {(NodeList | Element | string)} target
   * @return {Array<Element>}
   */
  function collect (target) {
    if (NodeList.prototype.isPrototypeOf(target)) {
      return toArray(target);
    }

    if (Element.prototype.isPrototypeOf(target)) {
      return [target];
    }

    if (typeof target === 'string') {
      return $$(target);
    }
  }

  /**
   * Set the focus to the first focusable child of the given element
   *
   * @param {Element} node
   */
  function setFocusToFirstItem (node) {
    var focusableChildren = getFocusableChildren(node);

    if (focusableChildren.length) {
      focusableChildren[0].focus();
    }
  }

  /**
   * Get the focusable children of the given element
   *
   * @param {Element} node
   * @return {Array<Element>}
   */
  function getFocusableChildren (node) {
    return $$(FOCUSABLE_ELEMENTS.join(','), node).filter(function (child) {
      return !!(child.offsetWidth || child.offsetHeight || child.getClientRects().length);
    });
  }

  /**
   * Trap the focus inside the given element
   *
   * @param {Element} node
   * @param {Event} event
   */
  function trapTabKey (node, event) {
    var focusableChildren = getFocusableChildren(node);
    var focusedItemIndex = focusableChildren.indexOf(document.activeElement);

    // If the SHIFT key is being pressed while tabbing (moving backwards) and
    // the currently focused item is the first one, move the focus to the last
    // focusable item from the dialog element
    if (event.shiftKey && focusedItemIndex === 0) {
      focusableChildren[focusableChildren.length - 1].focus();
      event.preventDefault();
    // If the SHIFT key is not being pressed (moving forwards) and the currently
    // focused item is the last one, move the focus to the first focusable item
    // from the dialog element
    } else if (!event.shiftKey && focusedItemIndex === focusableChildren.length - 1) {
      focusableChildren[0].focus();
      event.preventDefault();
    }
  }

  /**
   * Retrieve siblings from given element
   *
   * @param {Element} node
   * @return {Array<Element>}
   */
  function getSiblings (node) {
    var nodes = toArray(node.parentNode.childNodes);
    var siblings = nodes.filter(function (node) {
      return node.nodeType === 1;
    });

    siblings.splice(siblings.indexOf(node), 1);

    return siblings;
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = A11yDialog;
  } else if (typeof define === 'function' && define.amd) {
    define('A11yDialog', [], function () {
      return A11yDialog;
    });
  } else if (typeof global === 'object') {
    global.A11yDialog = A11yDialog;
  }
}(typeof global !== 'undefined' ? global : window));

( function( $ ) {

	var accordionTable = $( '.sui-2-0-20 .sui-accordion' );

	accordionTable.on( 'click', '.sui-accordion-item', function() {

		var getParentItem = $( this ).closest( '.sui-accordion-item' ),
			getNextAdditionalContentRow = getParentItem.nextUntil( '.sui-accordion-item' );

		getNextAdditionalContentRow.toggleClass( 'sui-accordion-item--open' );

		if ( getNextAdditionalContentRow.hasClass( 'sui-accordion-item--open' ) ) {
			getParentItem.addClass( 'sui-accordion-item--open' );
		} else {
			getParentItem.removeClass( 'sui-accordion-item--open' );
		}

	});

}( jQuery ) );

/**
 * clipboard.js v1.7.1
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ClipboardJS = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
	var proto = Element.prototype;

	proto.matches = proto.matchesSelector ||
					proto.mozMatchesSelector ||
					proto.msMatchesSelector ||
					proto.oMatchesSelector ||
					proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest(element, selector) {
	while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
		if (typeof element.matches === 'function' &&
			element.matches(selector)) {
			return element;
		}
		element = element.parentNode;
	}
}

module.exports = closest;

},{}],2:[function(require,module,exports){
var closest = require('./closest');

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(element, selector, type, callback, useCapture) {
	var listenerFn = listener.apply(this, arguments);

	element.addEventListener(type, listenerFn, useCapture);

	return {
		destroy: function() {
			element.removeEventListener(type, listenerFn, useCapture);
		}
	}
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
	return function(e) {
		e.delegateTarget = closest(e.target, selector);

		if (e.delegateTarget) {
			callback.call(element, e);
		}
	}
}

module.exports = delegate;

},{"./closest":1}],3:[function(require,module,exports){
/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
	return value !== undefined
		&& value instanceof HTMLElement
		&& value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
	var type = Object.prototype.toString.call(value);

	return value !== undefined
		&& (type === '[object NodeList]' || type === '[object HTMLCollection]')
		&& ('length' in value)
		&& (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
	return typeof value === 'string'
		|| value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
	var type = Object.prototype.toString.call(value);

	return type === '[object Function]';
};

},{}],4:[function(require,module,exports){
var is = require('./is');
var delegate = require('delegate');

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
	if (!target && !type && !callback) {
		throw new Error('Missing required arguments');
	}

	if (!is.string(type)) {
		throw new TypeError('Second argument must be a String');
	}

	if (!is.fn(callback)) {
		throw new TypeError('Third argument must be a Function');
	}

	if (is.node(target)) {
		return listenNode(target, type, callback);
	}
	else if (is.nodeList(target)) {
		return listenNodeList(target, type, callback);
	}
	else if (is.string(target)) {
		return listenSelector(target, type, callback);
	}
	else {
		throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
	}
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
	node.addEventListener(type, callback);

	return {
		destroy: function() {
			node.removeEventListener(type, callback);
		}
	}
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
	Array.prototype.forEach.call(nodeList, function(node) {
		node.addEventListener(type, callback);
	});

	return {
		destroy: function() {
			Array.prototype.forEach.call(nodeList, function(node) {
				node.removeEventListener(type, callback);
			});
		}
	}
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
	return delegate(document.body, selector, type, callback);
}

module.exports = listen;

},{"./is":3,"delegate":2}],5:[function(require,module,exports){
function select(element) {
	var selectedText;

	if (element.nodeName === 'SELECT') {
		element.focus();

		selectedText = element.value;
	}
	else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
		var isReadOnly = element.hasAttribute('readonly');

		if (!isReadOnly) {
			element.setAttribute('readonly', '');
		}

		element.select();
		element.setSelectionRange(0, element.value.length);

		if (!isReadOnly) {
			element.removeAttribute('readonly');
		}

		selectedText = element.value;
	}
	else {
		if (element.hasAttribute('contenteditable')) {
			element.focus();
		}

		var selection = window.getSelection();
		var range = document.createRange();

		range.selectNodeContents(element);
		selection.removeAllRanges();
		selection.addRange(range);

		selectedText = selection.toString();
	}

	return selectedText;
}

module.exports = select;

},{}],6:[function(require,module,exports){
function E () {
	// Keep this empty so it's easier to inherit from
	// (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
	on: function (name, callback, ctx) {
	var e = this.e || (this.e = {});

	(e[name] || (e[name] = [])).push({
		fn: callback,
		ctx: ctx
	});

	return this;
	},

	once: function (name, callback, ctx) {
	var self = this;
	function listener () {
		self.off(name, listener);
		callback.apply(ctx, arguments);
	};

	listener._ = callback
	return this.on(name, listener, ctx);
	},

	emit: function (name) {
	var data = [].slice.call(arguments, 1);
	var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
	var i = 0;
	var len = evtArr.length;

	for (i; i < len; i++) {
		evtArr[i].fn.apply(evtArr[i].ctx, data);
	}

	return this;
	},

	off: function (name, callback) {
	var e = this.e || (this.e = {});
	var evts = e[name];
	var liveEvents = [];

	if (evts && callback) {
		for (var i = 0, len = evts.length; i < len; i++) {
		if (evts[i].fn !== callback && evts[i].fn._ !== callback)
			liveEvents.push(evts[i]);
		}
	}

	// Remove event from queue to prevent memory leak
	// Suggested by https://github.com/lazd
	// Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

	(liveEvents.length)
		? e[name] = liveEvents
		: delete e[name];

	return this;
	}
};

module.exports = E;

},{}],7:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['module', 'select'], factory);
	} else if (typeof exports !== "undefined") {
		factory(module, require('select'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod, global.select);
		global.clipboardAction = mod.exports;
	}
})(this, function (module, _select) {
	'use strict';

	var _select2 = _interopRequireDefault(_select);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	var ClipboardJSAction = function () {
		/**
		 * @param {Object} options
		 */
		function ClipboardJSAction(options) {
			_classCallCheck(this, ClipboardJSAction);

			this.resolveOptions(options);
			this.initSelection();
		}

		/**
		 * Defines base properties passed from constructor.
		 * @param {Object} options
		 */


		_createClass(ClipboardJSAction, [{
			key: 'resolveOptions',
			value: function resolveOptions() {
				var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				this.action = options.action;
				this.container = options.container;
				this.emitter = options.emitter;
				this.target = options.target;
				this.text = options.text;
				this.trigger = options.trigger;

				this.selectedText = '';
			}
		}, {
			key: 'initSelection',
			value: function initSelection() {
				if (this.text) {
					this.selectFake();
				} else if (this.target) {
					this.selectTarget();
				}
			}
		}, {
			key: 'selectFake',
			value: function selectFake() {
				var _this = this;

				var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

				this.removeFake();

				this.fakeHandlerCallback = function () {
					return _this.removeFake();
				};
				this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;

				this.fakeElem = document.createElement('textarea');
				// Prevent zooming on iOS
				this.fakeElem.style.fontSize = '12pt';
				// Reset box model
				this.fakeElem.style.border = '0';
				this.fakeElem.style.padding = '0';
				this.fakeElem.style.margin = '0';
				// Move element out of screen horizontally
				this.fakeElem.style.position = 'absolute';
				this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
				// Move element to the same position vertically
				var yPosition = window.pageYOffset || document.documentElement.scrollTop;
				this.fakeElem.style.top = yPosition + 'px';

				this.fakeElem.setAttribute('readonly', '');
				this.fakeElem.value = this.text;

				this.container.appendChild(this.fakeElem);

				this.selectedText = (0, _select2.default)(this.fakeElem);
				this.copyText();
			}
		}, {
			key: 'removeFake',
			value: function removeFake() {
				if (this.fakeHandler) {
					this.container.removeEventListener('click', this.fakeHandlerCallback);
					this.fakeHandler = null;
					this.fakeHandlerCallback = null;
				}

				if (this.fakeElem) {
					this.container.removeChild(this.fakeElem);
					this.fakeElem = null;
				}
			}
		}, {
			key: 'selectTarget',
			value: function selectTarget() {
				this.selectedText = (0, _select2.default)(this.target);
				this.copyText();
			}
		}, {
			key: 'copyText',
			value: function copyText() {
				var succeeded = void 0;

				try {
					succeeded = document.execCommand(this.action);
				} catch (err) {
					succeeded = false;
				}

				this.handleResult(succeeded);
			}
		}, {
			key: 'handleResult',
			value: function handleResult(succeeded) {
				this.emitter.emit(succeeded ? 'success' : 'error', {
					action: this.action,
					text: this.selectedText,
					trigger: this.trigger,
					clearSelection: this.clearSelection.bind(this)
				});
			}
		}, {
			key: 'clearSelection',
			value: function clearSelection() {
				if (this.trigger) {
					this.trigger.focus();
				}

				window.getSelection().removeAllRanges();
			}
		}, {
			key: 'destroy',
			value: function destroy() {
				this.removeFake();
			}
		}, {
			key: 'action',
			set: function set() {
				var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

				this._action = action;

				if (this._action !== 'copy' && this._action !== 'cut') {
					throw new Error('Invalid "action" value, use either "copy" or "cut"');
				}
			},
			get: function get() {
				return this._action;
			}
		}, {
			key: 'target',
			set: function set(target) {
				if (target !== undefined) {
					if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
						if (this.action === 'copy' && target.hasAttribute('disabled')) {
							throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
						}

						if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
							throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
						}

						this._target = target;
					} else {
						throw new Error('Invalid "target" value, use a valid Element');
					}
				}
			},
			get: function get() {
				return this._target;
			}
		}]);

		return ClipboardJSAction;
	}();

	module.exports = ClipboardJSAction;
});

},{"select":5}],8:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['module', './clipboard-action', 'tiny-emitter', 'good-listener'], factory);
	} else if (typeof exports !== "undefined") {
		factory(module, require('./clipboard-action'), require('tiny-emitter'), require('good-listener'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod, global.clipboardAction, global.tinyEmitter, global.goodListener);
		global.clipboard = mod.exports;
	}
})(this, function (module, _clipboardAction, _tinyEmitter, _goodListener) {
	'use strict';

	var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

	var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

	var _goodListener2 = _interopRequireDefault(_goodListener);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var ClipboardJS = function (_Emitter) {
		_inherits(ClipboardJS, _Emitter);

		/**
		 * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
		 * @param {Object} options
		 */
		function ClipboardJS(trigger, options) {
			_classCallCheck(this, ClipboardJS);

			var _this = _possibleConstructorReturn(this, (ClipboardJS.__proto__ || Object.getPrototypeOf(ClipboardJS)).call(this));

			_this.resolveOptions(options);
			_this.listenClick(trigger);
			return _this;
		}

		/**
		 * Defines if attributes would be resolved using internal setter functions
		 * or custom functions that were passed in the constructor.
		 * @param {Object} options
		 */


		_createClass(ClipboardJS, [{
			key: 'resolveOptions',
			value: function resolveOptions() {
				var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
				this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
				this.text = typeof options.text === 'function' ? options.text : this.defaultText;
				this.container = _typeof(options.container) === 'object' ? options.container : document.body;
			}
		}, {
			key: 'listenClick',
			value: function listenClick(trigger) {
				var _this2 = this;

				this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
					return _this2.onClick(e);
				});
			}
		}, {
			key: 'onClick',
			value: function onClick(e) {
				var trigger = e.delegateTarget || e.currentTarget;

				if (this.clipboardAction) {
					this.clipboardAction = null;
				}

				this.clipboardAction = new _clipboardAction2.default({
					action: this.action(trigger),
					target: this.target(trigger),
					text: this.text(trigger),
					container: this.container,
					trigger: trigger,
					emitter: this
				});
			}
		}, {
			key: 'defaultAction',
			value: function defaultAction(trigger) {
				return getAttributeValue('action', trigger);
			}
		}, {
			key: 'defaultTarget',
			value: function defaultTarget(trigger) {
				var selector = getAttributeValue('target', trigger);

				if (selector) {
					return document.querySelector(selector);
				}
			}
		}, {
			key: 'defaultText',
			value: function defaultText(trigger) {
				return getAttributeValue('text', trigger);
			}
		}, {
			key: 'destroy',
			value: function destroy() {
				this.listener.destroy();

				if (this.clipboardAction) {
					this.clipboardAction.destroy();
					this.clipboardAction = null;
				}
			}
		}], [{
			key: 'isSupported',
			value: function isSupported() {
				var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];

				var actions = typeof action === 'string' ? [action] : action;
				var support = !!document.queryCommandSupported;

				actions.forEach(function (action) {
					support = support && !!document.queryCommandSupported(action);
				});

				return support;
			}
		}]);

		return ClipboardJS;
	}(_tinyEmitter2.default);

	/**
	 * Helper function to retrieve attribute value.
	 * @param {String} suffix
	 * @param {Element} element
	 */
	function getAttributeValue(suffix, element) {
		var attribute = 'data-clipboard-' + suffix;

		if (!element.hasAttribute(attribute)) {
			return;
		}

		return element.getAttribute(attribute);
	}

	module.exports = ClipboardJS;
});

},{"./clipboard-action":7,"good-listener":4,"tiny-emitter":6}]},{},[8])(8)
});

( function( $ ) {

	$( '.sui-2-0-20 .sui-code-snippet:not(.sui-no-copy)' ).each( function( i ) {
		var id = 'sui-code-snippet-' + i,
			button = '<button class="sui-button" data-clipboard-target="#' + id + '">Copy</button>';

		$( this ).wrap( '<div class="sui-code-snippet-wrapper"></div>' );
		$( this ).attr( 'id', id ).after( button );
	});

	$( document ).ready( function() {
		var btns = $( '[data-clipboard-target]' );
		var clipboard = new ClipboardJS( '[data-clipboard-target]' );

		if ( btns.length ) {

			clipboard.on( 'success', function( e ) {
				e.clearSelection();
				showTooltip( e.trigger, 'Copied!' );
			});

			btns.mouseleave( function() {
				$( this ).removeClass( 'sui-tooltip' );
				$( this ).removeAttr( 'aria-label' );
				$( this ).removeAttr( 'data-tooltip' );
			});

			function showTooltip( e, msg ) {
				$( e ).addClass( 'sui-tooltip' );
				$( e ).attr( 'aria-label', msg );
				$( e ).attr( 'data-tooltip', msg );
			}

		}

	});

}( jQuery ) );

( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	SUI.linkDropdown = function() {

		function closeAllDropdowns( $except ) {
			var $dropdowns = $( '.sui-2-0-20 .sui-dropdown' );

			if ( $except ) {
				$dropdowns = $dropdowns.not( $except );
			}

			$dropdowns.removeClass( 'open' );
		}

		$( 'body' ).click( function( e ) {
			var $this = $( e.target ),
				$el = $this.closest( '.sui-dropdown' );

			if ( 0 == $el.length ) {
				closeAllDropdowns();
			} else if ( $this.is( 'a' ) ) {
				e.preventDefault();

				closeAllDropdowns( $el );

				$el.toggleClass( 'open' );
			}

		});

	};

	SUI.linkDropdown();

}( jQuery ) );

( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	document.addEventListener( 'DOMContentLoaded', function() {
		var mainEl = $( '.sui-wrap' );

		// Init the dialog elements.
		$( '.sui-dialog' ).each( function() {
			new A11yDialog( this, mainEl );
		});

	});

}( jQuery ) );

( function( $ ) {

	$( '.sui-2-0-20 .sui-notice-top:not(.sui-cant-dismiss)' ).delay( 3000 ).slideUp( 'slow' );

	$( '.sui-2-0-20 .sui-notice-dismiss' ).click( function( e ) {
		e.preventDefault();

		$( this ).parent( '.sui-notice' ).stop().slideUp( 'slow' );

		return false;
	});

}( jQuery ) );

( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	SUI.showHidePassword = function() {

		$( '.sui-2-0-20 .sui-password-group' ).each( function() {
			var $this = $( this ),
				$input = $this.find( 'input[type="password"]' ),
				$button = $this.find( '.sui-password-toggle' );

			$button.on( 'click', function() {
				var $inputType = '',
					$repInput = '';

				$( this ).toggleClass( 'is-visible' );

				if ( $input.hasClass( 'is-visible' ) ) {
					$input.removeClass( 'is-visible' ).addClass( 'is-hidden' );
					$inputType = 'password';
					$button.find( '> .sui-screen-reader-text' ).text( 'Show Password' );
					$button.find( '> i' ).removeClass( 'sui-ico-eye-hide' ).addClass( 'sui-ico-eye' );
				} else {
					$input.removeClass( 'is-hidden' ).addClass( 'is-visible' );
					$inputType = 'text';
					$button.find( '> .sui-screen-reader-text' ).text( 'Hide Password' );
					$button.find( '> i' ).removeClass( 'sui-ico-eye' ).addClass( 'sui-ico-eye-hide' );
				}

				$repInput = $( '<input type=' + $inputType + ' />' )
					.attr( 'id', $input.attr( 'id' ) )
					.attr( 'name', $input.attr( 'name' ) )
					.attr( 'class', $input.attr( 'class' ) )
					.val( $input.val() )
					.insertBefore( $input );

				$input.remove();
				$input = $repInput;
				$input.focus();

			});

		});

	};

	SUI.showHidePassword();

}( jQuery ) );

( function( $ ) {

	loadCircleScore = function( el ) {
		var dial          = $( el ).find( 'svg circle:last-child' ),
			score         = $( el ).data( 'score' ),
			radius        = 42,
			circumference = 2 * Math.PI * radius,
			dashLength    = ( circumference / 100 ) * score,
			gapLength     = dashLength * 100 - score,
			svg           =
				'<svg viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n' +
					'<circle stroke-width="16" cx="50" cy="50" r="42" />\n' +
					'<circle stroke-width="16" cx="50" cy="50" r="42" stroke-dasharray="0,' + gapLength + '" />\n' +
				'</svg>\n' +
				'<span class="sui-circle-score-label">' + score + '</span>\n';

		// Add svg to score element, add loaded class, & change stroke-dasharray to represent target score/percentage.
		$( el ).prepend( svg ).addClass( 'loaded' ).find( 'circle:last-child' ).css( 'animation', 'sui' + score + ' 3s forwards' );
	};

	$( '.sui-2-0-20 .sui-circle-score' ).each( function() {
		loadCircleScore( this );
	});

}( jQuery ) );

( function( $ ) {

	suiSelect = function( el ) {
		var jq = $( el ),
			wrap, handle, list, value, items;

		if ( ! jq.is( 'select' ) ) {
			return;
		}

		if ( jq.closest( '.select-container' ).length || jq.data( 'select2' ) || jq.is( '.none-sui' ) ) {
			return;
		}

		// Add the DOM elements to style the select list.
		function setupElement() {
			jq.wrap( '<div class="select-container">' );
			jq.hide();

			wrap = jq.parent();
			handle = $( '<span class="dropdown-handle"><i class="sui-icon-chevron-down" aria-hidden="true"></i></span>' ).prependTo( wrap );
			list = $( '<div class="select-list-container"></div>' ).appendTo( wrap );
			value = $( '<div class="list-value">&nbsp;</div>' ).appendTo( list );
			items = $( '<ul class="list-results"></ul>' ).appendTo( list );

			wrap.addClass( jq.attr( 'class' ) );
		}

		// When changing selection using JS, you need to trigger a 'sui:change' event
		// eg: $('select').val('4').trigger('sui:change')
		function handleSelectionChange() {
			jq.on( 'sui:change', function() {

				// We need to re-populateList to handle dynamic select options added via JS/ajax.
				populateList();
				items.find( 'li' ).not( '.optgroup-label' ).on( 'click', function onItemClick( ev ) {
					var opt = $( ev.target );
					selectItem( opt, false );
					handleValue();
				});
			});
		}

		// Add all the options to the new DOM elements.
		function populateList() {
			items.empty();
			if ( jq.find( 'optgroup' ).length ) {
				jq.find( 'optgroup' ).each( function() {
					var optgroup = $( this ),
						optGroupItem;
					optGroupItem = $( '<ul></ul>' ).appendTo( items );
					$label = $( '<li class="optgroup-label"></li>' ).text( optgroup.prop( 'label' ) );

					optGroupItem.html( $label );
					optGroupItem.addClass( 'optgroup' );

					optgroup.find( 'option' ).each( function onPopulateLoop() {
						var opt = $( this ),
							item;
						item = $( '<li></li>' ).appendTo( optGroupItem );
						item.text( opt.text() );
						item.data( 'value', opt.val() );

						if ( opt.val() == jq.val() ) {
							selectItem( item );
						}
					});
				});
			} else {
				jq.find( 'option' ).each( function onPopulateLoop() {
					var opt = $( this ),
						item;
					item = $( '<li></li>' ).appendTo( items );
					item.text( opt.text() );
					item.data( 'value', opt.val() );

					if ( opt.val() == jq.val() ) {
						selectItem( item, true );
					}
				});
			}

		}

		// Checks the option value for a link.
		function handleValue() {
			var val = jq[0].value;

			// If option is link, navigate to it.
			if ( val.match( '^https?:\/\/|#' ) ) {
				window.location.href = val;
			}
		}

		// Toggle the dropdown state between open/closed.
		function stateToggle() {
			if ( wrap.find( 'select' ).is( ':disabled' ) ) {
				return;
			}
			if ( ! wrap.hasClass( 'active' ) ) {
				stateOpen();
			} else {
				stateClose();
			}
		}

		// Close the dropdown list.
		function stateClose( item ) {
			if ( ! item ) {
				item = wrap;
			}

			item.removeClass( 'active' );
			item.closest( 'tr' ).removeClass( 'select-open' );
		}

		// Open the dropdown list.
		function stateOpen() {
			$( '.select-container.active' ).each( function() {
				stateClose( $( this ) );
			});

			wrap.addClass( 'active' );
			wrap.closest( 'tr' ).addClass( 'select-open' );
		}

		// Visually mark the specified option as "selected".
		function selectItem( opt, isInit ) {
			isInit = 'undefined' === typeof isInit ? false : isInit;
			value.text( opt.text() );
			$( '.current', items ).removeClass( 'current' );
			opt.addClass( 'current' );
			stateClose();

			// Also update the select list value.
			jq.val( opt.data( 'value' ) );

			if ( ! isInit ) {
				jq.trigger( 'change' );
			}

		}

		// Element constructor.
		function init() {
			var selectID;

			setupElement();
			populateList();
			handleSelectionChange();

			items.find( 'li' ).not( '.optgroup-label' ).on( 'click', function onItemClick( ev ) {
				var opt = $( ev.target );
				selectItem( opt, false );
				handleValue();
			});

			handle.on( 'click', stateToggle );
			value.on( 'click', stateToggle );
			jq.on( 'focus', stateOpen );

			$( document ).click( function onOutsideClick( ev ) {
				var jq = $( ev.target ),
					selectID;

				if ( jq.closest( '.select-container' ).length ) {
					return;
				}

				if ( jq.is( 'label' ) && jq.attr( 'for' ) ) {
					selectID = jq.attr( 'for' );

					if ( $( 'select#' + selectID ).length ) {
						return;
					}
				}

				stateClose();
			});

			selectID = jq.attr( 'id' );

			if ( selectID ) {
				$( 'label[for=' + selectID + ']' ).on( 'click', stateOpen );
			}

			jq.addClass( 'sui-styled' );
		}

		init();

		return this;
	};

	// Convert all select lists to fancy sui Select lists.
	$( '.sui-2-0-20 select' ).each( function() {
		suiSelect( this );
	});

}( jQuery ) );

( function( $ ) {

	suiTabs = function( el ) {
		var jq = $( el ).closest( '.sui-tabs' );

		if ( ! jq.length ) {
			return;
		}

		// Resize the tab-area after short delay.
		function resizeArea() {
			window.setTimeout( resizeAreaHandler, 20 );
		}

		// Resize the tab area to match the current tab.
		function resizeAreaHandler() {
			var current = jq.find( '.sui-tab > input:checked' ).parent(),
				content = current.find( '.sui-tab-content' );

			jq.height( content.outerHeight() + current.outerHeight() - 6 );
		}

		// Updates the URL hash to keep tab open during page refresh
		function updateHash() {
			var current = jq.find( '.sui-tab > input:checked' );

			jq.find( '.sui-tab label.active' ).removeClass( 'active' );
			current.parent().find( 'label' ).addClass( 'active' );

			resizeArea();
		}

		// Open the tab that is specified in window URL hash
		function switchTab() {
			var curTab,
				route = window.location.hash.replace( /[^\w-_]/g, '' );

			if ( route ) {
				curTab = jq.find( 'input#' + route );

				if ( curTab.parent().find( 'label' ).length ) {
					jq.find( '.sui-tab label.active' ).removeClass( 'active' );
					curTab.parent().find( 'label' ).addClass( 'active' );

					if ( curTab.length && ! curTab.prop( 'checked' ) ) {
						curTab.prop( 'checked', true );

						scrollWindow();
					}

				}

			}

		}

		// Scroll the window to top of the tab list.
		function scrollWindow() {
			resizeArea();

			$( 'html, body' ).scrollTop(
				jq.offset().top -
				parseInt( $( 'html' ).css( 'paddingTop' ) ) -
				20
			);
		}

		// Constructor.
		function init() {
			var current = jq.find( '.sui-tab > input:checked' );

			jq.on( 'click', '.sui-tab > input[type=radio]', updateHash );
			$( window ).on( 'hashchange', switchTab );
			current.parent().find( 'label' ).addClass( 'active' );

			resizeArea();
			switchTab();
		}

		init();

		$( window ).resize( function() {
			resizeArea();
		});

		return this;
	};

	// Initialize all tab-areas.
	$( '.sui-2-0-20 .sui-tabs' ).each( function() {
		suiTabs( this );
	});

}( jQuery ) );

( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it doesn't exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	SUI.upload = function() {

		$( '.sui-2-0-20 .sui-upload-group input[type="file"]' ).on( 'change', function( e ) {
			var file = $( this )[0].files[0],
				message = $( this ).find( '~ .sui-upload-message' );

			if ( file ) {
				message.text( file.name );
			}

		});

	};

	SUI.upload();

}( jQuery ) );
