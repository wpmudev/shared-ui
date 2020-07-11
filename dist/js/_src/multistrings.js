function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function ($) {
  // Enable strict mode.
  'use strict'; // Define global SUI object if it doesn't exists.

  if ('object' !== _typeof(window.SUI)) {
    window.SUI = {};
  }

  SUI.multistrings = function () {
    function buildWrapper(textarea, uniqid) {
      var parent = textarea.parent(),
          label = parent.find('> .sui-label'),
          description = parent.find('> .sui-description');
      /**
       * Build main wrapper for the whole multistring element.
       */

      parent.wrap('<div class="sui-multistrings-wrap"></div>');
      /**
       * Build ARIA-ready element.
       */
      // Hide field.

      parent.addClass('sui-multistrings-aria').removeClass('sui-form-field');
      /**
       * Build visual-ready element.
       */
      // Build a new field.

      $('<div class="sui-form-field sui-multistrings" tabindex="-1" aria-hidden="true" />').insertAfter(parent);
      var newParent = parent.next('.sui-multistrings');

      if (label.length) {
        newParent.append(label.clone());

        if ('' !== newParent.find('.sui-label').attr('for')) {
          newParent.find('.sui-label').attr('for', newParent.find('.sui-label').attr('for') + '-input-multistrings');
        }

        if ('' !== newParent.find('.sui-label').attr('id')) {
          newParent.find('.sui-label').attr('id', newParent.find('.sui-label').attr('id') + '-input-multistrings');
        }
      }

      newParent.append('<ul class="sui-multistrings-list" />');

      if (description.length) {
        newParent.append(description.clone());
        var $childDescription = newParent.find('.sui-description');

        if ('' !== $childDescription.attr('id')) {
          var newId = $childDescription.attr('id') + '-input-multistrings';
          $childDescription.attr('id', newId);
        }
      }
    }

    function bindFocus($mainWrapper) {
      var $listWrapper = $mainWrapper.find('.sui-multistrings');
      $listWrapper.on('click', function (e) {
        var $this = $(e.target);

        if ('sui-multistrings-list' !== $this.attr('class')) {
          return;
        }

        $listWrapper.find('.sui-multistrings-input input').focus();
      });
      var $input = $listWrapper.find('.sui-multistrings-input input'),
          $textarea = $mainWrapper.find('textarea'),
          $stringList = $mainWrapper.find('.sui-multistrings-list');

      var addSuiFocus = function addSuiFocus($element) {
        $element.on('focus', function () {
          $stringList.addClass('sui-focus');
          $element.off('blur').on('blur', function () {
            $stringList.removeClass('sui-focus');
          });
        });
      };

      addSuiFocus($input);
      addSuiFocus($textarea);
    }

    function buildInput(textarea, uniqid) {
      var html = '',
          placeholder = '',
          ariaLabel = '',
          ariaDescription = '';

      if ('undefined' !== typeof textarea.attr('placeholder') && '' !== textarea.attr('placeholder')) {
        placeholder = ' placeholder="' + textarea.attr('placeholder') + '"';
      }

      if ('undefinded' !== typeof textarea.attr('data-field-label') && '' !== textarea.attr('data-field-label')) {
        ariaLabel = ' aria-labelledby="' + uniqid + '-label"';
        textarea.attr('aria-labelledby', uniqid + '-label');
      } else {
        if (textarea.closest('.sui-form-field').find('.sui-label').length) {
          ariaLabel = ' aria-labelledby="' + uniqid + '-label"';
        }

        textarea.attr('aria-labelledby', uniqid + '-label');
      }

      if ('undefinded' !== typeof textarea.attr('data-field-label') && '' !== textarea.attr('data-field-label')) {
        ariaDescription = ' aria-describedby="' + uniqid + '-description"';
      } else {
        if (textarea.closest('.sui-form-field').find('.sui-label').length) {
          ariaDescription = ' aria-ariaDescription="' + uniqid + '-description"';
        }
      }

      html += '<li class="sui-multistrings-input">';
      html += '<input type="text" autocomplete="off"' + placeholder + ' id="' + uniqid + '"' + ariaLabel + ariaDescription + ' aria-autocomplete="none" />';
      html += '</li>';
      return html;
    }

    function buildItem(itemName) {
      var html = '';
      html += '<li title="' + itemName + '">';
      html += '<i class="sui-icon-page sui-sm" aria-hidden="true"></i>';
      html += itemName;
      html += '<button class="sui-button-close">';
      html += '<i class="sui-icon-close" aria-hidden="true"></i>';
      html += '<span class="sui-screen-reader-text">Delete</span>';
      html += '</button>';
      html += '</li>';
      return html;
    }

    function bindRemoveTag($mainWrapper) {
      var $removeButtons = $mainWrapper.find('.sui-multistrings-list .sui-button-close');
      $removeButtons.off('click').on('click', removeTag);
    }

    function insertStringOnLoad(textarea, uniqid, disallowedCharsArray) {
      var html = '',
          $mainWrapper = textarea.closest('.sui-multistrings-wrap'),
          $entriesList = $mainWrapper.find('.sui-multistrings-list'),
          forbiddenRemoved = cleanTextarea(textarea.val(), disallowedCharsArray, true); // Split lines for inserting the tags and cleaning the new textarea value.

      var splitStrings = forbiddenRemoved.split(/[\r\n]/gm),
          cleanStringsArray = []; // Insert the tags and add clean values to the cleanStringsArray.

      for (var i = 0; i < splitStrings.length; i++) {
        var stringLine = splitStrings[i].trim();

        if (0 === stringLine.length) {
          continue;
        }

        html += buildItem(stringLine);
        cleanStringsArray.push(stringLine);
      } // Clean-up textarea value with the cleanStringsArray joined by newlines.


      var newTextareaValue = cleanStringsArray.join('\n');
      textarea.val(newTextareaValue); // Build input to insert strings.

      html += buildInput(textarea, uniqid);
      $entriesList.append(html);
      bindRemoveTag($mainWrapper);
    }

    function getDisallowedChars($mainWrapper) {
      var $textarea = $mainWrapper.find('textarea.sui-multistrings'),
          disallowedCharsArray = [];
      var customDisallowedKeys = $textarea.data('disallowedKeys');

      if (customDisallowedKeys) {
        if ('number' === typeof customDisallowedKeys) {
          customDisallowedKeys = customDisallowedKeys.toString();
        } // Make an array from the user defined keys.


        var customKeysArray = customDisallowedKeys.split(',');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = customKeysArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;
            // Convert to integer.
            var intKey = parseInt(key, 10); // And filter out any NaN.

            if (!isNaN(intKey)) {
              // Convert ascii code to character.
              disallowedCharsArray.push(String.fromCharCode(intKey));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return disallowedCharsArray;
    }

    function getRegexPatternForDisallowedChars(disallowedCharsArray) {
      // Regex for removing the disallowed keys from the inserted strings.
      var escapeRegExp = function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      },
          disallowedPattern = escapeRegExp(disallowedCharsArray.join(''));

      return disallowedPattern;
    }

    function handleInsertTags($mainWrapper, disallowedCharsArray) {
      var $tagInput = $mainWrapper.find('.sui-multistrings-input input'),
          $textarea = $mainWrapper.find('textarea.sui-multistrings'),
          disallowedString = getRegexPatternForDisallowedChars(disallowedCharsArray),
          regex = new RegExp("[\r\n".concat(disallowedString, "]"), 'gm'); // Sanitize the values on keydown.

      $tagInput.on('keydown', function (e) {
        // Do nothing if the key is from the disallowed ones.
        if (disallowedCharsArray.includes(e.key)) {
          e.preventDefault();
          return;
        }

        var input = $(this),
            oldValue = $textarea.val(),
            newValue = input.val(); // Get rid of new lines, commas, and any chars passed by the admin from the newly entered value.

        var newTrim = newValue.replace(regex, ''),
            isEnter = 13 === e.keyCode;

        if (isEnter) {
          e.preventDefault();
          e.stopPropagation();
        } // If there's no value to add, don't insert any new value.


        if (0 !== newTrim.length && 0 !== newTrim.trim().length) {
          if (isEnter) {
            var newTextareaValue = oldValue.length ? "".concat(oldValue, "\n").concat(newTrim) : newTrim; // Print new value on textarea.

            $textarea.val(newTextareaValue); // Print new value on the list.

            var html = buildItem(newTrim);
            $(html).insertBefore($mainWrapper.find('.sui-multistrings-input')); // Clear input value.

            input.val(''); // Bid the event to remove the tags.

            bindRemoveTag($mainWrapper);
          } else {
            input.val(newTrim);
          }
        } else {
          input.val('');
        }
      });
    }

    function handleTextareaChange($mainWrapper, disallowedCharsArray) {
      var textarea = $mainWrapper.find('textarea.sui-multistrings');
      var oldValue = textarea.val(),
          isTabTrapped = true; // Keep tab trapped when focusing on the textarea.

      textarea.on('focus', function () {
        return isTabTrapped = true;
      });
      textarea.on('keydown', function (e) {
        // Do nothing if the key is from the disallowed ones.
        if (disallowedCharsArray.includes(e.key)) {
          e.preventDefault();
          return;
        } // If it's tab...


        if (9 === e.keyCode) {
          // Add a new line if it's trapped.
          if (isTabTrapped) {
            e.preventDefault();
            var start = this.selectionStart,
                end = this.selectionEnd; // Insert a new line where the caret is.

            $(this).val($(this).val().substring(0, start) + '\n' + $(this).val().substring(end)); // Put caret at right position again.

            this.selectionStart = start + 1;
            this.selectionEnd = this.selectionStart;
          } // Release the tab.

        } else if (27 === e.keyCode) {
          isTabTrapped = false;
        }
      }).on('keyup change', function (e) {
        var currentValue = textarea.val(); // Nothing has changed, do nothing.

        if (currentValue === oldValue) {
          return;
        } // Clear up the content.


        var cleanedCurrentValue = cleanTextarea(currentValue, disallowedCharsArray); // Set the current value as the old one for future iterations.

        textarea.val(cleanedCurrentValue);
        oldValue = cleanedCurrentValue;
        var textboxValuesArray = cleanedCurrentValue.split(/[\r\n]+/gm),
            tags = $mainWrapper.find('.sui-multistrings-list li:not(.sui-multistrings-input)'),
            tagsTitles = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = tags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var tag = _step2.value;
            tagsTitles.push($(tag).attr('title'));
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        var areEqual = compareArrays(textboxValuesArray, tagsTitles); // The existing elements changed, update the existing tags.

        if (!areEqual) {
          $mainWrapper.find('.sui-multistrings-list li:not(.sui-multistrings-input)').remove();
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = textboxValuesArray[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var value = _step3.value;
              value = value.trim();

              if (value.length) {
                // Print new value on the list.
                var html = buildItem(value);
                $(html).insertBefore($mainWrapper.find('.sui-multistrings-input'));
              }
            } // Bind the event to remove the tags.

          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          bindRemoveTag($mainWrapper);
        }
      });
    }

    function compareArrays(firstArray, secondArray) {
      if (!Array.isArray(firstArray) || !Array.isArray(secondArray)) {
        return false;
      }

      if (firstArray.length !== secondArray.length) {
        return false;
      }

      return firstArray.every(function (value, index) {
        return value === secondArray[index];
      });
    }

    function cleanTextarea(string, disallowedCharsArray) {
      var isLoad = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var disallowedString = getRegexPatternForDisallowedChars(disallowedCharsArray),
          regex = new RegExp("[".concat(disallowedString, "]+|((\\r\\n|\\n|\\r)$)|^\\s*$"), 'gm');
      var clearedString = string.replace(regex, '');

      if (!isLoad) {
        // Avoid removing the last newline if it existed.
        var endsInNewline = string.match(/\n$/);

        if (endsInNewline) {
          clearedString += '\n';
        }
      }

      return clearedString;
    }

    function removeTag(e) {
      var $removeButton = $(e.currentTarget),
          $tag = $removeButton.closest('li');
      var $hiddenTextarea = $removeButton.closest('.sui-multistrings-wrap').find('textarea.sui-multistrings'),
          textareaValue = $hiddenTextarea.val(),
          removedTag = $tag.attr('title'),
          escapedRemovedTag = removedTag.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
          regex = new RegExp("^".concat(escapedRemovedTag, "\\s|^").concat(escapedRemovedTag, "$"), 'm'),
          newTextareaValue = textareaValue.replace(regex, ''); // Remove the string from the hidden textarea.

      $hiddenTextarea.val(newTextareaValue);
      $hiddenTextarea.trigger('change'); // Remove the tag the close button belongs to.

      $tag.remove();
    }

    function init() {
      var multistrings = $('.sui-multistrings');

      if (0 !== multistrings.length) {
        multistrings.each(function () {
          multistrings = $(this);
          var uniqueId = '';
          var hasUniqueId = 'undefined' !== typeof multistrings.attr('id') && '' !== multistrings.attr('id');
          var isTextarea = multistrings.is('textarea');
          var isWrapped = multistrings.parent().hasClass('sui-form-field');

          if (!hasUniqueId) {
            throw new Error('Multistrings field require an ID attribute.');
          } else {
            uniqueId = multistrings.attr('id') + '-strings';
          }

          if (!isTextarea) {
            throw new Error('Multistrings field with id="' + multistrings.attr('id') + '" needs to be "textarea".');
          }

          if (!isWrapped) {
            throw new Error('Multistrings field needs to be wrapped inside "sui-form-field" div.');
          }

          buildWrapper(multistrings, uniqueId);
          var $mainWrapper = multistrings.closest('.sui-multistrings-wrap'),
              disallowedCharsArray = getDisallowedChars($mainWrapper);
          insertStringOnLoad(multistrings, uniqueId, disallowedCharsArray);
          handleInsertTags($mainWrapper, disallowedCharsArray);
          handleTextareaChange($mainWrapper, disallowedCharsArray);
          bindFocus($mainWrapper);
        });
      }
    }

    init();
    return this;
  };

  SUI.multistrings();
})(jQuery);