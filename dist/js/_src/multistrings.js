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

    function insertStringOnLoad(textarea, uniqid) {
      var html = '',
          $mainWrapper = textarea.closest('.sui-multistrings-wrap'),
          $entriesList = $mainWrapper.find('.sui-multistrings-list'),
          valueToClear = textarea.val().trim(); // Convert default commas into new lines.

      if (valueToClear.includes(',')) {
        valueToClear = valueToClear.replace(/(?!^),/gm, '\n');
      }

      var removeForbidden = cleanTextarea(valueToClear, true);
      var splitStrings = removeForbidden.split(/[\r\n]/gm); // Clean-up textarea value.

      textarea.val(removeForbidden); // Add currently available strings.

      if (0 !== removeForbidden.length) {
        for (var i = 0; i < splitStrings.length; i++) {
          html += buildItem(splitStrings[i]);
        }
      } // Build input to insert strings.


      html += buildInput(textarea, uniqid);
      $entriesList.append(html);
      bindRemoveTag($mainWrapper);
    }

    function handleInsertTags($mainWrapper) {
      var $tagInput = $mainWrapper.find('.sui-multistrings-input input');
      $tagInput.on('keydown', function (e) {
        var textarea = $mainWrapper.find('textarea.sui-multistrings'),
            isEnter = 13 === e.keyCode,
            isSpace = 32 === e.keyCode,
            isComma = 188 === e.keyCode; // Do nothing on space or comma.

        if (isSpace || isComma) {
          e.preventDefault();
          return;
        }

        var input = $(this),
            oldValue = textarea.val(),
            newValue = input.val(); // Get rid of empty spaces, new lines, and commas from the newly entered value.

        var newTrim = newValue.replace(/[\r\n,\s]+/gm, ''); // If there's no value to add, don't insert any new value.

        if (0 !== newTrim.length) {
          if (isEnter) {
            e.preventDefault();
            e.stopPropagation();
            var newTextareaValue = oldValue.length ? "".concat(oldValue, "\n").concat(newTrim) : newTrim; // Print new value on textarea.

            textarea.val(newTextareaValue); // Print new value on the list.

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

    function handleTextareaChange($mainWrapper) {
      var textarea = $mainWrapper.find('textarea.sui-multistrings');
      var oldValue = textarea.val(),
          isTabTrapped = true; // Keep tab trapped when focusing on the textarea.

      textarea.on('focus', function () {
        return isTabTrapped = true;
      });
      textarea.on('keydown', function (e) {
        var isSpace = 32 === e.keyCode,
            isComma = 188 === e.keyCode; // Do nothing on space or comma.

        if (isSpace || isComma) {
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


        var cleanedCurrentValue = cleanTextarea(currentValue); // Set the current value as the old one for future iterations.

        textarea.val(cleanedCurrentValue);
        oldValue = cleanedCurrentValue;
        var textboxValues = textarea.val().split(/[\r\n\s]+/gm).filter(function (el) {
          return el.length;
        }),
            tags = $mainWrapper.find('.sui-multistrings-list li:not(.sui-multistrings-input)'),
            tagsTitles = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var tag = _step.value;
            tagsTitles.push($(tag).attr('title'));
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

        var areEqual = compareArrays(textboxValues, tagsTitles); // The existing elements changed, update the existing tags.

        if (!areEqual) {
          $mainWrapper.find('.sui-multistrings-list li:not(.sui-multistrings-input)').remove();
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = textboxValues[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var value = _step2.value;

              if (value.length) {
                // Print new value on the list.
                var html = buildItem(value);
                $(html).insertBefore($mainWrapper.find('.sui-multistrings-input'));
              }
            } // Bind the event to remove the tags.

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

    function cleanTextarea(string) {
      var isLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var clearedString = string.replace(/[^\S\r\n]+|[,]+|((\r\n|\n|\r)$)|^\s*$/gm, '');

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
          insertStringOnLoad(multistrings, uniqueId);
          var $mainWrapper = multistrings.closest('.sui-multistrings-wrap');
          handleInsertTags($mainWrapper);
          handleTextareaChange($mainWrapper);
          bindFocus($mainWrapper);
        });
      }
    }

    init();
    return this;
  };

  SUI.multistrings();
})(jQuery);