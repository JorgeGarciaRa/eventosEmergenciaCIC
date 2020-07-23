/*!
  * CoreUI v3.0.0 (https://coreui.io)
  * Copyright 2020 Łukasz Holeczek
  * Licensed under MIT (https://coreui.io)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.coreui = factory());
}(this, (function () { 'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000;
  var TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  var toType = function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var getUID = function getUID(prefix) {
    do {
      prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
    } while (document.getElementById(prefix));

    return prefix;
  };

  var getSelector = function getSelector(element) {
    var selector = element.getAttribute('data-target');

    if (!selector || selector === '#') {
      var hrefAttr = element.getAttribute('href');
      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
    }

    return selector;
  };

  var getSelectorFromElement = function getSelectorFromElement(element) {
    var selector = getSelector(element);

    if (selector) {
      return document.querySelector(selector) ? selector : null;
    }

    return null;
  };

  var getElementFromSelector = function getElementFromSelector(element) {
    var selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };

  var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    var _window$getComputedSt = window.getComputedStyle(element),
        transitionDuration = _window$getComputedSt.transitionDuration,
        transitionDelay = _window$getComputedSt.transitionDelay;

    var floatTransitionDuration = parseFloat(transitionDuration);
    var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  var triggerTransitionEnd = function triggerTransitionEnd(element) {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent(TRANSITION_END, true, true);
    element.dispatchEvent(evt);
  };

  var isElement = function isElement(obj) {
    return (obj[0] || obj).nodeType;
  };

  var emulateTransitionEnd = function emulateTransitionEnd(element, duration) {
    var called = false;
    var durationPadding = 5;
    var emulatedDuration = duration + durationPadding;

    function listener() {
      called = true;
      element.removeEventListener(TRANSITION_END, listener);
    }

    element.addEventListener(TRANSITION_END, listener);
    setTimeout(function () {
      if (!called) {
        triggerTransitionEnd(element);
      }
    }, emulatedDuration);
  };

  var typeCheckConfig = function typeCheckConfig(componentName, config, configTypes) {
    Object.keys(configTypes).forEach(function (property) {
      var expectedTypes = configTypes[property];
      var value = config[property];
      var valueType = value && isElement(value) ? 'element' : toType(value);

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
      }
    });
  };

  var makeArray = function makeArray(nodeList) {
    if (!nodeList) {
      return [];
    }

    return [].slice.call(nodeList);
  };

  var isVisible = function isVisible(element) {
    if (!element) {
      return false;
    }

    if (element.style && element.parentNode && element.parentNode.style) {
      var elementStyle = getComputedStyle(element);
      var parentNodeStyle = getComputedStyle(element.parentNode);
      return elementStyle.display !== 'none' && parentNodeStyle.display !== 'none' && elementStyle.visibility !== 'hidden';
    }

    return false;
  };

  var findShadowRoot = function findShadowRoot(element) {
    if (!document.documentElement.attachShadow) {
      return null;
    } // Can find the shadow root otherwise it'll return the document


    if (typeof element.getRootNode === 'function') {
      var root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }

    if (element instanceof ShadowRoot) {
      return element;
    } // when we don't find a shadow root


    if (!element.parentNode) {
      return null;
    }

    return findShadowRoot(element.parentNode);
  };

  var noop = function noop() {
    return function () {};
  };

  var reflow = function reflow(element) {
    return element.offsetHeight;
  };

  var getjQuery = function getjQuery() {
    var _window = window,
        jQuery = _window.jQuery;

    if (jQuery && !document.body.hasAttribute('data-no-jquery')) {
      return jQuery;
    }

    return null;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var mapData = function () {
    var storeData = {};
    var id = 1;
    return {
      set: function set(element, key, data) {
        if (typeof element.key === 'undefined') {
          element.key = {
            key: key,
            id: id
          };
          id++;
        }

        storeData[element.key.id] = data;
      },
      get: function get(element, key) {
        if (!element || typeof element.key === 'undefined') {
          return null;
        }

        var keyProperties = element.key;

        if (keyProperties.key === key) {
          return storeData[keyProperties.id];
        }

        return null;
      },
      delete: function _delete(element, key) {
        if (typeof element.key === 'undefined') {
          return;
        }

        var keyProperties = element.key;

        if (keyProperties.key === key) {
          delete storeData[keyProperties.id];
          delete element.key;
        }
      }
    };
  }();

  var Data = {
    setData: function setData(instance, key, data) {
      mapData.set(instance, key, data);
    },
    getData: function getData(instance, key) {
      return mapData.get(instance, key);
    },
    removeData: function removeData(instance, key) {
      mapData.delete(instance, key);
    }
  };

  /* istanbul ignore file */
  var _Element$prototype = Element.prototype,
      matches = _Element$prototype.matches,
      closest = _Element$prototype.closest;
  var find = Element.prototype.querySelectorAll;
  var findOne = Element.prototype.querySelector;

  var createCustomEvent = function createCustomEvent(eventName, params) {
    var cEvent = new CustomEvent(eventName, params);
    return cEvent;
  };

  if (typeof window.CustomEvent !== 'function') {
    createCustomEvent = function createCustomEvent(eventName, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: null
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(eventName, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
  }

  var workingDefaultPrevented = function () {
    var e = document.createEvent('CustomEvent');
    e.initEvent('Bootstrap', true, true);
    e.preventDefault();
    return e.defaultPrevented;
  }();

  if (!workingDefaultPrevented) {
    var origPreventDefault = Event.prototype.preventDefault;

    Event.prototype.preventDefault = function () {
      if (!this.cancelable) {
        return;
      }

      origPreventDefault.call(this);
      Object.defineProperty(this, 'defaultPrevented', {
        get: function get() {
          return true;
        },
        configurable: true
      });
    };
  } // MSEdge resets defaultPrevented flag upon dispatchEvent call if at least one listener is attached


  var defaultPreventedPreservedOnDispatch = function () {
    var e = createCustomEvent('Bootstrap', {
      cancelable: true
    });
    var element = document.createElement('div');
    element.addEventListener('Bootstrap', function () {
      return null;
    });
    e.preventDefault();
    element.dispatchEvent(e);
    return e.defaultPrevented;
  }();

  if (!matches) {
    matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  if (!closest) {
    closest = function closest(selector) {
      var element = this;

      do {
        if (matches.call(element, selector)) {
          return element;
        }

        element = element.parentElement || element.parentNode;
      } while (element !== null && element.nodeType === 1);

      return null;
    };
  }

  var scopeSelectorRegex = /:scope\b/;

  var supportScopeQuery = function () {
    var element = document.createElement('div');

    try {
      element.querySelectorAll(':scope *');
    } catch (_) {
      return false;
    }

    return true;
  }();

  if (!supportScopeQuery) {
    find = function find(selector) {
      if (!scopeSelectorRegex.test(selector)) {
        return this.querySelectorAll(selector);
      }

      var hasId = Boolean(this.id);

      if (!hasId) {
        this.id = getUID('scope');
      }

      var nodeList = null;

      try {
        selector = selector.replace(scopeSelectorRegex, "#" + this.id);
        nodeList = this.querySelectorAll(selector);
      } finally {
        if (!hasId) {
          this.removeAttribute('id');
        }
      }

      return nodeList;
    };

    findOne = function findOne(selector) {
      if (!scopeSelectorRegex.test(selector)) {
        return this.querySelector(selector);
      }

      var matches = find.call(this, selector);

      if (typeof matches[0] !== 'undefined') {
        return matches[0];
      }

      return null;
    };
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var $ = getjQuery();
  var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  var stripNameRegex = /\..*/;
  var keyEventRegex = /^key/;
  var stripUidRegex = /::\d+$/;
  var eventRegistry = {}; // Events storage

  var uidEvent = 1;
  var customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  var nativeEvents = ['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll'];
  /**
   * ------------------------------------------------------------------------
   * Private methods
   * ------------------------------------------------------------------------
   */

  function getUidEvent(element, uid) {
    return uid && uid + "::" + uidEvent++ || element.uidEvent || uidEvent++;
  }

  function getEvent(element) {
    var uid = getUidEvent(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }

  function fixEvent(event, element) {
    // Add which for key events
    if (event.which === null && keyEventRegex.test(event.type)) {
      event.which = event.charCode === null ? event.keyCode : event.charCode;
    }

    event.delegateTarget = element;
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      fixEvent(event, element);

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event]);
    };
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      var domElements = element.querySelectorAll(selector);

      for (var target = event.target; target && target !== this; target = target.parentNode) {
        for (var i = domElements.length; i--;) {
          if (domElements[i] === target) {
            fixEvent(event, target);

            if (handler.oneOff) {
              EventHandler.off(element, event.type, fn);
            }

            return fn.apply(target, [event]);
          }
        }
      } // To please ESLint


      return null;
    };
  }

  function findHandler(events, handler, delegationSelector) {
    if (delegationSelector === void 0) {
      delegationSelector = null;
    }

    var uidEventList = Object.keys(events);

    for (var i = 0, len = uidEventList.length; i < len; i++) {
      var event = events[uidEventList[i]];

      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
        return event;
      }
    }

    return null;
  }

  function normalizeParams(originalTypeEvent, handler, delegationFn) {
    var delegation = typeof handler === 'string';
    var originalHandler = delegation ? delegationFn : handler; // allow to get the native events from namespaced events ('click.bs.button' --> 'click')

    var typeEvent = originalTypeEvent.replace(stripNameRegex, '');
    var custom = customEvents[typeEvent];

    if (custom) {
      typeEvent = custom;
    }

    var isNative = nativeEvents.indexOf(typeEvent) > -1;

    if (!isNative) {
      typeEvent = originalTypeEvent;
    }

    return [delegation, originalHandler, typeEvent];
  }

  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    if (!handler) {
      handler = delegationFn;
      delegationFn = null;
    }

    var _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn),
        delegation = _normalizeParams[0],
        originalHandler = _normalizeParams[1],
        typeEvent = _normalizeParams[2];

    var events = getEvent(element);
    var handlers = events[typeEvent] || (events[typeEvent] = {});
    var previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

    if (previousFn) {
      previousFn.oneOff = previousFn.oneOff && oneOff;
      return;
    }

    var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
    var fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
    fn.delegationSelector = delegation ? handler : null;
    fn.originalHandler = originalHandler;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, delegation);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    var fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    var storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(function (handlerKey) {
      if (handlerKey.indexOf(namespace) > -1) {
        var event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  }

  var EventHandler = {
    on: function on(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, false);
    },
    one: function one(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, true);
    },
    off: function off(element, originalTypeEvent, handler, delegationFn) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }

      var _normalizeParams2 = normalizeParams(originalTypeEvent, handler, delegationFn),
          delegation = _normalizeParams2[0],
          originalHandler = _normalizeParams2[1],
          typeEvent = _normalizeParams2[2];

      var inNamespace = typeEvent !== originalTypeEvent;
      var events = getEvent(element);
      var isNamespace = originalTypeEvent.charAt(0) === '.';

      if (typeof originalHandler !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!events || !events[typeEvent]) {
          return;
        }

        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
        return;
      }

      if (isNamespace) {
        Object.keys(events).forEach(function (elementEvent) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        });
      }

      var storeElementEvent = events[typeEvent] || {};
      Object.keys(storeElementEvent).forEach(function (keyHandlers) {
        var handlerKey = keyHandlers.replace(stripUidRegex, '');

        if (!inNamespace || originalTypeEvent.indexOf(handlerKey) > -1) {
          var event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
        }
      });
    },
    trigger: function trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }

      var typeEvent = event.replace(stripNameRegex, '');
      var inNamespace = event !== typeEvent;
      var isNative = nativeEvents.indexOf(typeEvent) > -1;
      var jQueryEvent;
      var bubbles = true;
      var nativeDispatch = true;
      var defaultPrevented = false;
      var evt = null;

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      if (isNative) {
        evt = document.createEvent('HTMLEvents');
        evt.initEvent(typeEvent, bubbles, true);
      } else {
        evt = createCustomEvent(event, {
          bubbles: bubbles,
          cancelable: true
        });
      } // merge custom informations in our event


      if (typeof args !== 'undefined') {
        Object.keys(args).forEach(function (key) {
          Object.defineProperty(evt, key, {
            get: function get() {
              return args[key];
            }
          });
        });
      }

      if (defaultPrevented) {
        evt.preventDefault();

        if (!defaultPreventedPreservedOnDispatch) {
          Object.defineProperty(evt, 'defaultPrevented', {
            get: function get() {
              return true;
            }
          });
        }
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
        jQueryEvent.preventDefault();
      }

      return evt;
    }
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'asyncLoad';
  var VERSION = '3.0.0-rc.4';
  var DATA_KEY = 'coreui.asyncLoad';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var ClassName = {
    ACTIVE: 'c-active',
    NAV_DROPDOWN_TOGGLE: 'c-sidebar-nav-dropdown-toggle',
    SHOW: 'c-show',
    VIEW_SCRIPT: 'view-script'
  };
  var Event$1 = {
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    XHR_STATUS: 'xhr'
  };
  var Selector = {
    NAV_DROPDOWN: '.c-sidebar-nav-dropdown',
    NAV_LINK: '.c-xhr-link, .c-sidebar-nav-link',
    NAV_ITEM: '.c-sidebar-nav-item',
    VIEW_SCRIPT: '.view-script'
  };
  var Default = {
    defaultPage: 'main.html',
    errorPage: '404.html',
    subpagesDirectory: 'views/'
  };

  var AsyncLoad =
  /*#__PURE__*/
  function () {
    function AsyncLoad(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      var url = location.hash.replace(/^#/, ''); // eslint-disable-next-line no-negated-condition

      if (url !== '') {
        this._setUpUrl(url);
      } else {
        this._setUpUrl(this._config.defaultPage);
      }

      this._addEventListeners();
    } // Getters


    var _proto = AsyncLoad.prototype;

    // Private
    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default, {}, config);
      return config;
    };

    _proto._loadPage = function _loadPage(url) {
      var _this = this;

      var element = this._element;
      var config = this._config;

      var loadScripts = function loadScripts(src, element) {
        if (element === void 0) {
          element = 0;
        }

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src[element];
        script.className = ClassName.VIEW_SCRIPT; // eslint-disable-next-line no-multi-assign, unicorn/prefer-add-event-listener

        script.onload = script.onreadystatechange = function () {
          if (!_this.readyState || _this.readyState === 'complete') {
            if (src.length > element + 1) {
              loadScripts(src, element + 1);
            }
          }
        };

        var body = document.getElementsByTagName('body')[0];
        body.appendChild(script);
      };

      var removeScripts = function removeScripts() {
        var oldScripts = document.querySelectorAll(Selector.VIEW_SCRIPT);

        if (oldScripts.length) {
          oldScripts.forEach(function (oldScript) {
            oldScript.remove();
          });
        }
      };

      var xhr = new XMLHttpRequest();
      xhr.open('GET', config.subpagesDirectory + url);
      var event = new CustomEvent(Event$1.XHR_STATUS, {
        detail: {
          url: url,
          status: xhr.status
        }
      });
      element.dispatchEvent(event); // eslint-disable-next-line unicorn/prefer-add-event-listener

      xhr.onload = function (result) {
        if (xhr.status === 200) {
          event = new CustomEvent(Event$1.XHR_STATUS, {
            detail: {
              url: url,
              status: xhr.status
            }
          });
          element.dispatchEvent(event);
          var wrapper = document.createElement('div');
          wrapper.innerHTML = result.target.response; // eslint-disable-next-line unicorn/prefer-spread

          var scripts = Array.from(wrapper.querySelectorAll('script')).map(function (script) {
            return script.attributes.getNamedItem('src').nodeValue;
          });
          wrapper.querySelectorAll('script').forEach(function (script) {
            return script.remove(script);
          });
          window.scrollTo(0, 0);
          element.innerHTML = '';
          element.appendChild(wrapper);
          removeScripts();

          if (scripts.length) {
            loadScripts(scripts);
          }

          window.location.hash = url;
        } else {
          window.location.href = config.errorPage;
        }
      };

      xhr.send();
    };

    _proto._setUpUrl = function _setUpUrl(url) {
      url = url.replace(/^\//, '').split('?')[0]; // eslint-disable-next-line unicorn/prefer-spread

      Array.from(document.querySelectorAll(Selector.NAV_LINK)).forEach(function (element) {
        element.classList.remove(ClassName.ACTIVE);
      }); // eslint-disable-next-line unicorn/prefer-spread

      Array.from(document.querySelectorAll(Selector.NAV_LINK)).forEach(function (element) {
        element.classList.remove(ClassName.ACTIVE);
      }); // eslint-disable-next-line unicorn/prefer-spread

      Array.from(document.querySelectorAll(Selector.NAV_DROPDOWN)).forEach(function (element) {
        element.classList.remove(ClassName.SHOW);
      }); // eslint-disable-next-line unicorn/prefer-spread

      Array.from(document.querySelectorAll(Selector.NAV_DROPDOWN)).forEach(function (element) {
        // eslint-disable-next-line unicorn/prefer-spread
        if (Array.from(element.querySelectorAll("a[href*=\"" + url + "\"]")).length > 0) {
          element.classList.add(ClassName.SHOW);
        }
      }); // eslint-disable-next-line unicorn/prefer-spread

      Array.from(document.querySelectorAll(Selector.NAV_ITEM + " a[href*=\"" + url + "\"]")).forEach(function (element) {
        element.classList.add(ClassName.ACTIVE);
      });

      this._loadPage(url);
    };

    _proto._loadBlank = function _loadBlank(url) {
      window.open(url);
    };

    _proto._loadTop = function _loadTop(url) {
      window.location = url;
    };

    _proto._update = function _update(link) {
      if (link.href !== '#') {
        if (typeof link.dataset.toggle === 'undefined' || link.dataset.toggle === 'null') {
          if (link.target === '_top') {
            this._loadTop(link.href);
          } else if (link.target === '_blank') {
            this._loadBlank(link.href);
          } else {
            this._setUpUrl(link.getAttribute('href'));
          }
        }
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      EventHandler.on(document, Event$1.CLICK_DATA_API, Selector.NAV_LINK, function (event) {
        event.preventDefault();
        var link = event.target;

        if (!link.classList.contains(ClassName.NAV_LINK)) {
          link = link.closest(Selector.NAV_LINK);
        }

        if (!link.classList.contains(ClassName.NAV_DROPDOWN_TOGGLE) && link.getAttribute('href') !== '#') {
          _this2._update(link);
        }
      });
    } // Static
    ;

    AsyncLoad._asyncLoadInterface = function _asyncLoadInterface(element, config) {
      var data = Data.getData(element, DATA_KEY);

      var _config = typeof config === 'object' && config;

      if (!data) {
        data = new AsyncLoad(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    };

    AsyncLoad.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        AsyncLoad._asyncLoadInterface(this, config);
      });
    };

    _createClass(AsyncLoad, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return AsyncLoad;
  }();

  var $$1 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .asyncLoad to jQuery only if jQuery is present
   */

  if ($$1) {
    var JQUERY_NO_CONFLICT = $$1.fn[NAME];
    $$1.fn[NAME] = AsyncLoad.jQueryInterface;
    $$1.fn[NAME].Constructor = AsyncLoad;

    $$1.fn[NAME].noConflict = function () {
      $$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return AsyncLoad.jQueryInterface;
    };
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NODE_TEXT = 3;
  var SelectorEngine = {
    matches: function matches$1(element, selector) {
      return matches.call(element, selector);
    },
    find: function find$1(selector, element) {
      if (element === void 0) {
        element = document.documentElement;
      }

      return find.call(element, selector);
    },
    findOne: function findOne$1(selector, element) {
      if (element === void 0) {
        element = document.documentElement;
      }

      return findOne.call(element, selector);
    },
    children: function children(element, selector) {
      var _this = this;

      var children = makeArray(element.children);
      return children.filter(function (child) {
        return _this.matches(child, selector);
      });
    },
    parents: function parents(element, selector) {
      var parents = [];
      var ancestor = element.parentNode;

      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (this.matches(ancestor, selector)) {
          parents.push(ancestor);
        }

        ancestor = ancestor.parentNode;
      }

      return parents;
    },
    closest: function closest$1(element, selector) {
      return closest.call(element, selector);
    },
    prev: function prev(element, selector) {
      var siblings = [];
      var previous = element.previousSibling;

      while (previous && previous.nodeType === Node.ELEMENT_NODE && previous.nodeType !== NODE_TEXT) {
        if (this.matches(previous, selector)) {
          siblings.push(previous);
        }

        previous = previous.previousSibling;
      }

      return siblings;
    }
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'alert';
  var VERSION$1 = '3.0.0-rc.4';
  var DATA_KEY$1 = 'coreui.alert';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var Selector$1 = {
    DISMISS: '[data-dismiss="alert"]'
  };
  var Event$2 = {
    CLOSE: "close" + EVENT_KEY$1,
    CLOSED: "closed" + EVENT_KEY$1,
    CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1
  };
  var ClassName$1 = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert =
  /*#__PURE__*/
  function () {
    function Alert(element) {
      this._element = element;

      if (this._element) {
        Data.setData(element, DATA_KEY$1, this);
      }
    } // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent === null || customEvent.defaultPrevented) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var parent = getElementFromSelector(element);

      if (!parent) {
        parent = SelectorEngine.closest(element, "." + ClassName$1.ALERT);
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      return EventHandler.trigger(element, Event$2.CLOSE);
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      element.classList.remove(ClassName$1.SHOW);

      if (!element.classList.contains(ClassName$1.FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = getTransitionDurationFromElement(element);
      EventHandler.one(element, TRANSITION_END, function () {
        return _this._destroyElement(element);
      });
      emulateTransitionEnd(element, transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }

      EventHandler.trigger(element, Event$2.CLOSED);
    } // Static
    ;

    Alert.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$1);

        if (!data) {
          data = new Alert(this);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert.handleDismiss = function handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    Alert.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$1);
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, Event$2.CLICK_DATA_API, Selector$1.DISMISS, Alert.handleDismiss(new Alert()));
  var $$2 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .alert to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$2) {
    var JQUERY_NO_CONFLICT$1 = $$2.fn[NAME$1];
    $$2.fn[NAME$1] = Alert.jQueryInterface;
    $$2.fn[NAME$1].Constructor = Alert;

    $$2.fn[NAME$1].noConflict = function () {
      $$2.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
      return Alert.jQueryInterface;
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'button';
  var VERSION$2 = '3.0.0-rc.4';
  var DATA_KEY$2 = 'coreui.button';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var ClassName$2 = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };
  var Selector$2 = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input:not([type="hidden"])',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };
  var Event$3 = {
    CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2,
    FOCUS_DATA_API: "focus" + EVENT_KEY$2 + DATA_API_KEY$2,
    BLUR_DATA_API: "blur" + EVENT_KEY$2 + DATA_API_KEY$2
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button =
  /*#__PURE__*/
  function () {
    function Button(element) {
      this._element = element;
      Data.setData(element, DATA_KEY$2, this);
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = SelectorEngine.closest(this._element, Selector$2.DATA_TOGGLE);

      if (rootElement) {
        var input = SelectorEngine.findOne(Selector$2.INPUT, this._element);

        if (input && input.type === 'radio') {
          if (input.checked && this._element.classList.contains(ClassName$2.ACTIVE)) {
            triggerChangeEvent = false;
          } else {
            var activeElement = SelectorEngine.findOne(Selector$2.ACTIVE, rootElement);

            if (activeElement) {
              activeElement.classList.remove(ClassName$2.ACTIVE);
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
              return;
            }

            input.checked = !this._element.classList.contains(ClassName$2.ACTIVE);
            EventHandler.trigger(input, 'change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (addAriaPressed) {
        this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$2.ACTIVE));
      }

      if (triggerChangeEvent) {
        this._element.classList.toggle(ClassName$2.ACTIVE);
      }
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$2);
      this._element = null;
    } // Static
    ;

    Button.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$2);

        if (!data) {
          data = new Button(this);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    Button.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$2);
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, Event$3.CLICK_DATA_API, Selector$2.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();
    var button = event.target;

    if (!button.classList.contains(ClassName$2.BUTTON)) {
      button = SelectorEngine.closest(button, Selector$2.BUTTON);
    }

    var data = Data.getData(button, DATA_KEY$2);

    if (!data) {
      data = new Button(button);
    }

    data.toggle();
  });
  EventHandler.on(document, Event$3.FOCUS_DATA_API, Selector$2.DATA_TOGGLE_CARROT, function (event) {
    var button = SelectorEngine.closest(event.target, Selector$2.BUTTON);

    if (button) {
      button.classList.add(ClassName$2.FOCUS);
    }
  });
  EventHandler.on(document, Event$3.BLUR_DATA_API, Selector$2.DATA_TOGGLE_CARROT, function (event) {
    var button = SelectorEngine.closest(event.target, Selector$2.BUTTON);

    if (button) {
      button.classList.remove(ClassName$2.FOCUS);
    }
  });
  var $$3 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .button to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$3) {
    var JQUERY_NO_CONFLICT$2 = $$3.fn[NAME$2];
    $$3.fn[NAME$2] = Button.jQueryInterface;
    $$3.fn[NAME$2].Constructor = Button;

    $$3.fn[NAME$2].noConflict = function () {
      $$3.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
      return Button.jQueryInterface;
    };
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  function normalizeData(val) {
    if (val === 'true') {
      return true;
    }

    if (val === 'false') {
      return false;
    }

    if (val === Number(val).toString()) {
      return Number(val);
    }

    if (val === '' || val === 'null') {
      return null;
    }

    return val;
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, function (chr) {
      return "-" + chr.toLowerCase();
    });
  }

  var Manipulator = {
    setDataAttribute: function setDataAttribute(element, key, value) {
      element.setAttribute("data-" + normalizeDataKey(key), value);
    },
    removeDataAttribute: function removeDataAttribute(element, key) {
      element.removeAttribute("data-" + normalizeDataKey(key));
    },
    getDataAttributes: function getDataAttributes(element) {
      if (!element) {
        return {};
      }

      var attributes = _objectSpread2({}, element.dataset);

      Object.keys(attributes).forEach(function (key) {
        attributes[key] = normalizeData(attributes[key]);
      });
      return attributes;
    },
    getDataAttribute: function getDataAttribute(element, key) {
      return normalizeData(element.getAttribute("data-" + normalizeDataKey(key)));
    },
    offset: function offset(element) {
      var rect = element.getBoundingClientRect();
      return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      };
    },
    position: function position(element) {
      return {
        top: element.offsetTop,
        left: element.offsetLeft
      };
    },
    toggleClass: function toggleClass(element, className) {
      if (!element) {
        return;
      }

      if (element.classList.contains(className)) {
        element.classList.remove(className);
      } else {
        element.classList.add(className);
      }
    }
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'carousel';
  var VERSION$3 = '3.0.0-rc.4';
  var DATA_KEY$3 = 'coreui.carousel';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default$1 = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };
  var Event$4 = {
    SLIDE: "slide" + EVENT_KEY$3,
    SLID: "slid" + EVENT_KEY$3,
    KEYDOWN: "keydown" + EVENT_KEY$3,
    MOUSEENTER: "mouseenter" + EVENT_KEY$3,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$3,
    TOUCHSTART: "touchstart" + EVENT_KEY$3,
    TOUCHMOVE: "touchmove" + EVENT_KEY$3,
    TOUCHEND: "touchend" + EVENT_KEY$3,
    POINTERDOWN: "pointerdown" + EVENT_KEY$3,
    POINTERUP: "pointerup" + EVENT_KEY$3,
    DRAG_START: "dragstart" + EVENT_KEY$3,
    LOAD_DATA_API: "load" + EVENT_KEY$3 + DATA_API_KEY$3,
    CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
  };
  var ClassName$3 = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item',
    POINTER_EVENT: 'pointer-event'
  };
  var Selector$3 = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    ITEM_IMG: '.carousel-item img',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel =
  /*#__PURE__*/
  function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = SelectorEngine.findOne(Selector$3.INDICATORS, this._element);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();

      Data.setData(element, DATA_KEY$3, this);
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (SelectorEngine.findOne(Selector$3.NEXT_PREV, this._element)) {
        triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config && this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = SelectorEngine.findOne(Selector$3.ACTIVE_ITEM, this._element);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        EventHandler.one(this._element, Event$4.SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      EventHandler.off(this._element, EVENT_KEY$3);
      Data.removeData(this._element, DATA_KEY$3);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default$1, {}, config);
      typeCheckConfig(NAME$3, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        EventHandler.on(this._element, Event$4.KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, Event$4.MOUSEENTER, function (event) {
          return _this2.pause(event);
        });
        EventHandler.on(this._element, Event$4.MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch && this._touchSupported) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.touches && event.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      makeArray(SelectorEngine.find(Selector$3.ITEM_IMG, this._element)).forEach(function (itemImg) {
        EventHandler.on(itemImg, Event$4.DRAG_START, function (e) {
          return e.preventDefault();
        });
      });

      if (this._pointerEvent) {
        EventHandler.on(this._element, Event$4.POINTERDOWN, function (event) {
          return start(event);
        });
        EventHandler.on(this._element, Event$4.POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(ClassName$3.POINTER_EVENT);
      } else {
        EventHandler.on(this._element, Event$4.TOUCHSTART, function (event) {
          return start(event);
        });
        EventHandler.on(this._element, Event$4.TOUCHMOVE, function (event) {
          return move(event);
        });
        EventHandler.on(this._element, Event$4.TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? makeArray(SelectorEngine.find(Selector$3.ITEM, element.parentNode)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(SelectorEngine.findOne(Selector$3.ACTIVE_ITEM, this._element));

      return EventHandler.trigger(this._element, Event$4.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = SelectorEngine.find(Selector$3.ACTIVE, this._indicatorsElement);

        for (var i = 0; i < indicators.length; i++) {
          indicators[i].classList.remove(ClassName$3.ACTIVE);
        }

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          nextIndicator.classList.add(ClassName$3.ACTIVE);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = SelectorEngine.findOne(Selector$3.ACTIVE_ITEM, this._element);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName$3.LEFT;
        orderClassName = ClassName$3.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName$3.RIGHT;
        orderClassName = ClassName$3.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && nextElement.classList.contains(ClassName$3.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.defaultPrevented) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      if (this._element.classList.contains(ClassName$3.SLIDE)) {
        nextElement.classList.add(orderClassName);
        reflow(nextElement);
        activeElement.classList.add(directionalClassName);
        nextElement.classList.add(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        var transitionDuration = getTransitionDurationFromElement(activeElement);
        EventHandler.one(activeElement, TRANSITION_END, function () {
          nextElement.classList.remove(directionalClassName);
          nextElement.classList.remove(orderClassName);
          nextElement.classList.add(ClassName$3.ACTIVE);
          activeElement.classList.remove(ClassName$3.ACTIVE);
          activeElement.classList.remove(orderClassName);
          activeElement.classList.remove(directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            EventHandler.trigger(_this4._element, Event$4.SLID, {
              relatedTarget: nextElement,
              direction: eventDirectionName,
              from: activeElementIndex,
              to: nextElementIndex
            });
          }, 0);
        });
        emulateTransitionEnd(activeElement, transitionDuration);
      } else {
        activeElement.classList.remove(ClassName$3.ACTIVE);
        nextElement.classList.add(ClassName$3.ACTIVE);
        this._isSliding = false;
        EventHandler.trigger(this._element, Event$4.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel.carouselInterface = function carouselInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$3);

      var _config = _objectSpread2({}, Default$1, {}, Manipulator.getDataAttributes(element));

      if (typeof config === 'object') {
        _config = _objectSpread2({}, _config, {}, config);
      }

      var action = typeof config === 'string' ? config : _config.slide;

      if (!data) {
        data = new Carousel(element, _config);
      }

      if (typeof config === 'number') {
        data.to(config);
      } else if (typeof action === 'string') {
        if (typeof data[action] === 'undefined') {
          throw new TypeError("No method named \"" + action + "\"");
        }

        data[action]();
      } else if (_config.interval && _config.ride) {
        data.pause();
        data.cycle();
      }
    };

    Carousel.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        Carousel.carouselInterface(this, config);
      });
    };

    Carousel.dataApiClickHandler = function dataApiClickHandler(event) {
      var target = getElementFromSelector(this);

      if (!target || !target.classList.contains(ClassName$3.CAROUSEL)) {
        return;
      }

      var config = _objectSpread2({}, Manipulator.getDataAttributes(target), {}, Manipulator.getDataAttributes(this));

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel.carouselInterface(target, config);

      if (slideIndex) {
        Data.getData(target, DATA_KEY$3).to(slideIndex);
      }

      event.preventDefault();
    };

    Carousel.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$3);
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, Event$4.CLICK_DATA_API, Selector$3.DATA_SLIDE, Carousel.dataApiClickHandler);
  EventHandler.on(window, Event$4.LOAD_DATA_API, function () {
    var carousels = makeArray(SelectorEngine.find(Selector$3.DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      Carousel.carouselInterface(carousels[i], Data.getData(carousels[i], DATA_KEY$3));
    }
  });
  var $$4 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .carousel to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$4) {
    var JQUERY_NO_CONFLICT$3 = $$4.fn[NAME$3];
    $$4.fn[NAME$3] = Carousel.jQueryInterface;
    $$4.fn[NAME$3].Constructor = Carousel;

    $$4.fn[NAME$3].noConflict = function () {
      $$4.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
      return Carousel.jQueryInterface;
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'class-toggler';
  var VERSION$4 = '3.0.0-rc.4';
  var DATA_KEY$4 = 'coreui.class-toggler';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var Default$2 = {
    breakpoints: '-sm,-md,-lg,-xl',
    postfix: '-show',
    responsive: false,
    target: 'body'
  };
  var ClassName$4 = {
    CLASS_TOGGLER: 'c-class-toggler'
  };
  var Event$5 = {
    CLASS_TOGGLE: 'classtoggle',
    CLICK_DATA_API: "click" + EVENT_KEY$4 + DATA_API_KEY$4
  };
  var Selector$4 = {
    CLASS_TOGGLER: '.c-class-toggler'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ClassToggler =
  /*#__PURE__*/
  function () {
    function ClassToggler(element) {
      this._element = element;
    } // Getters


    var _proto = ClassToggler.prototype;

    // Public
    _proto.toggle = function toggle() {
      var _this = this;

      this._getElementDataAttributes(this._element).forEach(function (dataAttributes) {
        var element;
        var target = dataAttributes.target,
            toggle = dataAttributes.toggle;

        if (target === '_parent' || target === 'parent') {
          element = _this._element.parentNode;
        } else {
          element = document.querySelector(target);
        }

        toggle.forEach(function (object) {
          var className = object.className,
              responsive = object.responsive,
              postfix = object.postfix;
          var breakpoints = typeof object.breakpoints === 'undefined' || object.breakpoints === null ? null : _this._arrayFromString(object.breakpoints); // eslint-disable-next-line no-negated-condition

          if (!responsive) {
            var add = element.classList.toggle(className);
            var event = new CustomEvent(Event$5.CLASS_TOGGLE, {
              detail: {
                target: target,
                add: add,
                className: className
              }
            });
            element.dispatchEvent(event);
          } else {
            var currentBreakpoint;
            breakpoints.forEach(function (breakpoint) {
              if (className.includes(breakpoint)) {
                currentBreakpoint = breakpoint;
              }
            });
            var responsiveClassNames = [];

            if (typeof currentBreakpoint === 'undefined') {
              responsiveClassNames.push(className);
            } else {
              responsiveClassNames.push(className.replace("" + currentBreakpoint + postfix, postfix));
              breakpoints.splice(0, breakpoints.indexOf(currentBreakpoint) + 1).forEach(function (breakpoint) {
                responsiveClassNames.push(className.replace("" + currentBreakpoint + postfix, "" + breakpoint + postfix));
              });
            }

            var addResponsiveClasses = false;
            responsiveClassNames.forEach(function (responsiveClassName) {
              if (element.classList.contains(responsiveClassName)) {
                addResponsiveClasses = true;
              }
            });

            if (addResponsiveClasses) {
              responsiveClassNames.forEach(function (responsiveClassName) {
                element.classList.remove(responsiveClassName);
                var event = new CustomEvent(Event$5.CLASS_TOGGLE, {
                  detail: {
                    target: target,
                    add: false,
                    className: responsiveClassName
                  }
                });
                element.dispatchEvent(event);
              });
            } else {
              element.classList.add(className);

              var _event = new CustomEvent(Event$5.CLASS_TOGGLE, {
                detail: {
                  target: target,
                  add: true,
                  className: className
                }
              });

              element.dispatchEvent(_event);
            }
          }
        });
      });
    } // Private
    ;

    _proto._arrayFromString = function _arrayFromString(string) {
      return string.replace(/ /g, '').split(',');
    };

    _proto._isArray = function _isArray(array) {
      try {
        JSON.parse(array.replace(/'/g, '"'));
        return true;
      } catch (_unused) {
        return false;
      }
    };

    _proto._convertToArray = function _convertToArray(array) {
      return JSON.parse(array.replace(/'/g, '"'));
    };

    _proto._getDataAttributes = function _getDataAttributes(data, attribute) {
      var dataAttribute = data[attribute];
      return this._isArray(dataAttribute) ? this._convertToArray(dataAttribute) : dataAttribute;
    };

    _proto._getToggleDetails = function _getToggleDetails(classNames, responsive, breakpoints, postfix) {
      var ToggleDetails = // eslint-disable-next-line default-param-last
      function ToggleDetails(className, responsive, breakpoints, postfix) {
        if (responsive === void 0) {
          responsive = Default$2.responsive;
        }

        this.className = className;
        this.responsive = responsive;
        this.breakpoints = breakpoints;
        this.postfix = postfix;
      };

      var toggle = [];

      if (Array.isArray(classNames)) {
        classNames.forEach(function (className, index) {
          responsive = Array.isArray(responsive) ? responsive[index] : responsive;
          breakpoints = responsive ? Array.isArray(breakpoints) ? breakpoints[index] : breakpoints : null;
          postfix = responsive ? Array.isArray(postfix) ? postfix[index] : postfix : null;
          toggle.push(new ToggleDetails(className, responsive, breakpoints, postfix));
        });
      } else {
        breakpoints = responsive ? breakpoints : null;
        postfix = responsive ? postfix : null;
        toggle.push(new ToggleDetails(classNames, responsive, breakpoints, postfix));
      }

      return toggle;
    };

    _proto._ifArray = function _ifArray(array, index) {
      return Array.isArray(array) ? array[index] : array;
    };

    _proto._getElementDataAttributes = function _getElementDataAttributes(element) {
      var _this2 = this;

      var data = element.dataset;
      var targets = typeof data.target === 'undefined' ? Default$2.target : this._getDataAttributes(data, 'target');
      var classNames = typeof data.class === 'undefined' ? 'undefined' : this._getDataAttributes(data, 'class');
      var responsive = typeof data.responsive === 'undefined' ? Default$2.responsive : this._getDataAttributes(data, 'responsive');
      var breakpoints = typeof data.breakpoints === 'undefined' ? Default$2.breakpoints : this._getDataAttributes(data, 'breakpoints');
      var postfix = typeof data.postfix === 'undefined' ? Default$2.postfix : this._getDataAttributes(data, 'postfix');
      var toggle = [];

      var TargetDetails = function TargetDetails(target, toggle) {
        this.target = target;
        this.toggle = toggle;
      };

      if (Array.isArray(targets)) {
        targets.forEach(function (target, index) {
          toggle.push(new TargetDetails(target, _this2._getToggleDetails(_this2._ifArray(classNames, index), _this2._ifArray(responsive, index), _this2._ifArray(breakpoints, index), _this2._ifArray(postfix, index))));
        });
      } else {
        toggle.push(new TargetDetails(targets, this._getToggleDetails(classNames, responsive, breakpoints, postfix)));
      }

      return toggle;
    } // Static
    ;

    ClassToggler._classTogglerInterface = function _classTogglerInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$4);

      var _config = typeof config === 'object' && config;

      if (!data) {
        data = new ClassToggler(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    };

    ClassToggler.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        ClassToggler._classTogglerInterface(this, config);
      });
    };

    _createClass(ClassToggler, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }]);

    return ClassToggler;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, Event$5.CLICK_DATA_API, Selector$4.CLASS_TOGGLER, function (event) {
    event.preventDefault();
    var toggler = event.target;

    if (!toggler.classList.contains(ClassName$4.CLASS_TOGGLER)) {
      toggler = toggler.closest(Selector$4.CLASS_TOGGLER);
    }

    ClassToggler._classTogglerInterface(toggler, 'toggle');
  });
  var $$5 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .c-class-toggler to jQuery only if jQuery is present
   */

  if ($$5) {
    var JQUERY_NO_CONFLICT$4 = $$5.fn[NAME$4];
    $$5.fn[NAME$4] = ClassToggler.jQueryInterface;
    $$5.fn[NAME$4].Constructor = ClassToggler;

    $$5.fn[NAME$4].noConflict = function () {
      $$5.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
      return ClassToggler.jQueryInterface;
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'collapse';
  var VERSION$5 = '3.0.0-rc.4';
  var DATA_KEY$5 = 'coreui.collapse';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var Default$3 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var Event$6 = {
    SHOW: "show" + EVENT_KEY$5,
    SHOWN: "shown" + EVENT_KEY$5,
    HIDE: "hide" + EVENT_KEY$5,
    HIDDEN: "hidden" + EVENT_KEY$5,
    CLICK_DATA_API: "click" + EVENT_KEY$5 + DATA_API_KEY$5
  };
  var ClassName$5 = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };
  var Selector$5 = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse =
  /*#__PURE__*/
  function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = makeArray(SelectorEngine.find("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = makeArray(SelectorEngine.find(Selector$5.DATA_TOGGLE));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = getSelectorFromElement(elem);
        var filterElement = makeArray(SelectorEngine.find(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }

      Data.setData(element, DATA_KEY$5, this);
    } // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.classList.contains(ClassName$5.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || this._element.classList.contains(ClassName$5.SHOW)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = makeArray(SelectorEngine.find(Selector$5.ACTIVES, this._parent)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(ClassName$5.COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      var container = SelectorEngine.findOne(this._selector);

      if (actives) {
        var tempActiveData = actives.filter(function (elem) {
          return container !== elem;
        });
        activesData = tempActiveData[0] ? Data.getData(tempActiveData[0], DATA_KEY$5) : null;

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = EventHandler.trigger(this._element, Event$6.SHOW);

      if (startEvent.defaultPrevented) {
        return;
      }

      if (actives) {
        actives.forEach(function (elemActive) {
          if (container !== elemActive) {
            Collapse.collapseInterface(elemActive, 'hide');
          }

          if (!activesData) {
            Data.setData(elemActive, DATA_KEY$5, null);
          }
        });
      }

      var dimension = this._getDimension();

      this._element.classList.remove(ClassName$5.COLLAPSE);

      this._element.classList.add(ClassName$5.COLLAPSING);

      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        this._triggerArray.forEach(function (element) {
          element.classList.remove(ClassName$5.COLLAPSED);
          element.setAttribute('aria-expanded', true);
        });
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this._element.classList.remove(ClassName$5.COLLAPSING);

        _this._element.classList.add(ClassName$5.COLLAPSE);

        _this._element.classList.add(ClassName$5.SHOW);

        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        EventHandler.trigger(_this._element, Event$6.SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = getTransitionDurationFromElement(this._element);
      EventHandler.one(this._element, TRANSITION_END, complete);
      emulateTransitionEnd(this._element, transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !this._element.classList.contains(ClassName$5.SHOW)) {
        return;
      }

      var startEvent = EventHandler.trigger(this._element, Event$6.HIDE);

      if (startEvent.defaultPrevented) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      reflow(this._element);

      this._element.classList.add(ClassName$5.COLLAPSING);

      this._element.classList.remove(ClassName$5.COLLAPSE);

      this._element.classList.remove(ClassName$5.SHOW);

      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var elem = getElementFromSelector(trigger);

          if (elem && !elem.classList.contains(ClassName$5.SHOW)) {
            trigger.classList.add(ClassName$5.COLLAPSED);
            trigger.setAttribute('aria-expanded', false);
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        _this2._element.classList.remove(ClassName$5.COLLAPSING);

        _this2._element.classList.add(ClassName$5.COLLAPSE);

        EventHandler.trigger(_this2._element, Event$6.HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = getTransitionDurationFromElement(this._element);
      EventHandler.one(this._element, TRANSITION_END, complete);
      emulateTransitionEnd(this._element, transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default$3, {}, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      typeCheckConfig(NAME$5, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = this._element.classList.contains(Dimension.WIDTH);

      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent = this._config.parent;

      if (isElement(parent)) {
        // it's a jQuery object
        if (typeof parent.jquery !== 'undefined' || typeof parent[0] !== 'undefined') {
          parent = parent[0];
        }
      } else {
        parent = SelectorEngine.findOne(parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + parent + "\"]";
      makeArray(SelectorEngine.find(selector, parent)).forEach(function (element) {
        var selected = getElementFromSelector(element);

        _this3._addAriaAndCollapsedClass(selected, [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (element) {
        var isOpen = element.classList.contains(ClassName$5.SHOW);

        if (triggerArray.length) {
          triggerArray.forEach(function (elem) {
            if (isOpen) {
              elem.classList.remove(ClassName$5.COLLAPSED);
            } else {
              elem.classList.add(ClassName$5.COLLAPSED);
            }

            elem.setAttribute('aria-expanded', isOpen);
          });
        }
      }
    } // Static
    ;

    Collapse.collapseInterface = function collapseInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$5);

      var _config = _objectSpread2({}, Default$3, {}, Manipulator.getDataAttributes(element), {}, typeof config === 'object' && config ? config : {});

      if (!data && _config.toggle && /show|hide/.test(config)) {
        _config.toggle = false;
      }

      if (!data) {
        data = new Collapse(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    };

    Collapse.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        Collapse.collapseInterface(this, config);
      });
    };

    Collapse.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$5);
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, Event$6.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A') {
      event.preventDefault();
    }

    var triggerData = Manipulator.getDataAttributes(this);
    var selector = getSelectorFromElement(this);
    var selectorElements = makeArray(SelectorEngine.find(selector));
    selectorElements.forEach(function (element) {
      var data = Data.getData(element, DATA_KEY$5);
      var config;

      if (data) {
        // update parent attribute
        if (data._parent === null && typeof triggerData.parent === 'string') {
          data._config.parent = triggerData.parent;
          data._parent = data._getParent();
        }

        config = 'toggle';
      } else {
        config = triggerData;
      }

      Collapse.collapseInterface(element, config);
    });
  });
  var $$6 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .collapse to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$6) {
    var JQUERY_NO_CONFLICT$5 = $$6.fn[NAME$5];
    $$6.fn[NAME$5] = Collapse.jQueryInterface;
    $$6.fn[NAME$5].Constructor = Collapse;

    $$6.fn[NAME$5].noConflict = function () {
      $$6.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
      return Collapse.jQueryInterface;
    };
  }

  function getBoundingClientRect(element) {
    var rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      x: rect.left,
      y: rect.top
    };
  }

  /*:: import type { Window } from '../types'; */

  /*:: declare function getWindow(node: Node | Window): Window; */
  function getWindow(node) {
    if (node.toString() !== '[object Window]') {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView : window;
    }

    return node;
  }

  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    };
  }

  /*:: declare function isElement(node: mixed): boolean %checks(node instanceof
    Element); */

  function isElement$1(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement;
  }
  /*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
    HTMLElement); */


  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement;
  }

  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }

  function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
  }

  function getDocumentElement(element) {
    // $FlowFixMe: assume body is always available
    return (isElement$1(element) ? element.ownerDocument : element.document).documentElement;
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }

  // Composite means it takes into account transforms as well as layout.

  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }

    var documentElement;
    var rect = getBoundingClientRect(elementOrVirtualElement);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };

    if (!isFixed) {
      if (getNodeName(offsetParent) !== 'body') {
        scroll = getNodeScroll(offsetParent);
      }

      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement = getDocumentElement(offsetParent)) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }

    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  // Returns the layout rect of an element relative to its offsetParent. Layout
  // means it doesn't take into account transforms.
  function getLayoutRect(element) {
    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }

  function getParentNode(element) {
    if (getNodeName(element) === 'html') {
      return element;
    }

    return element.parentNode || // DOM Element detected
    // $FlowFixMe: need a better way to handle this...
    element.host || // ShadowRoot detected
    document.ownerDocument || // Fallback to ownerDocument if available
    document.documentElement // Or to documentElement if everything else fails
    ;
  }

  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function getScrollParent(node) {
    if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
      // $FlowFixMe: assume body is always available
      return node.ownerDocument.body;
    }

    if (isHTMLElement(node)) {
      // Firefox wants us to check `-x` and `-y` variations as well
      var _getComputedStyle = getComputedStyle$1(node),
          overflow = _getComputedStyle.overflow,
          overflowX = _getComputedStyle.overflowX,
          overflowY = _getComputedStyle.overflowY;

      if (/auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX)) {
        return node;
      }
    }

    return getScrollParent(getParentNode(node));
  }

  function listScrollParents(element, list) {
    if (list === void 0) {
      list = [];
    }

    var scrollParent = getScrollParent(element);
    var isBody = getNodeName(scrollParent) === 'body';
    var target = isBody ? getWindow(scrollParent) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : // $FlowFixMe: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)));
  }

  function isTableElement(element) {
    return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
  }

  var isFirefox = function isFirefox() {
    return typeof window.InstallTrigger !== 'undefined';
  };

  function getTrueOffsetParent(element) {
    var offsetParent;

    if (!isHTMLElement(element) || !(offsetParent = element.offsetParent) || // https://github.com/popperjs/popper-core/issues/837
    isFirefox() && getComputedStyle$1(offsetParent).position === 'fixed') {
      return null;
    }

    return offsetParent;
  }

  function getOffsetParent(element) {
    var window = getWindow(element);
    var offsetParent = getTrueOffsetParent(element); // Find the nearest non-table offsetParent

    while (offsetParent && isTableElement(offsetParent)) {
      offsetParent = getTrueOffsetParent(offsetParent);
    }

    if (offsetParent && getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static') {
      return window;
    }

    return offsetParent || window;
  }

  var top = 'top';
  var bottom = 'bottom';
  var right = 'right';
  var left = 'left';
  var auto = 'auto';
  var basePlacements = [top, bottom, right, left];
  var start = 'start';
  var end = 'end';
  var clippingParents = 'clippingParents';
  var viewport = 'viewport';
  var popper = 'popper';
  var reference = 'reference';
  var variationPlacements =
  /*#__PURE__*/
  basePlacements.reduce(function (acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements =
  /*#__PURE__*/
  [].concat(basePlacements, [auto]).reduce(function (acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []); // modifiers that need to read the DOM

  var beforeRead = 'beforeRead';
  var read = 'read';
  var afterRead = 'afterRead'; // pure-logic modifiers

  var beforeMain = 'beforeMain';
  var main = 'main';
  var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

  var beforeWrite = 'beforeWrite';
  var write = 'write';
  var afterWrite = 'afterWrite';
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function (modifier) {
      map.set(modifier.name, modifier);
    }); // On visiting object, check for its dependencies and visit them recursively

    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function (dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);

          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }

    modifiers.forEach(function (modifier) {
      if (!visited.has(modifier.name)) {
        // check for visited object
        sort(modifier);
      }
    });
    return result;
  }

  function orderModifiers(modifiers) {
    // order based on dependencies
    var orderedModifiers = order(modifiers); // order based on phase

    return modifierPhases.reduce(function (acc, phase) {
      return acc.concat(orderedModifiers.filter(function (modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }

  function debounce(fn) {
    var pending;
    return function () {
      if (!pending) {
        pending = new Promise(function (resolve) {
          Promise.resolve().then(function () {
            pending = undefined;
            resolve(fn());
          });
        });
      }

      return pending;
    };
  }

  function getBasePlacement(placement) {
    return placement.split('-')[0];
  }

  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function (merged, current) {
      var existing = merged[current.name];
      merged[current.name] = existing ? Object.assign({}, existing, {}, current, {
        options: Object.assign({}, existing.options, {}, current.options),
        data: Object.assign({}, existing.data, {}, current.data)
      }) : current;
      return merged;
    }, {}); // IE11 does not support Object.values

    return Object.keys(merged).map(function (key) {
      return merged[key];
    });
  }

  var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
  };

  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !args.some(function (element) {
      return !(element && typeof element.getBoundingClientRect === 'function');
    });
  }

  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }

    var _generatorOptions = generatorOptions,
        _generatorOptions$def = _generatorOptions.defaultModifiers,
        defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
        _generatorOptions$def2 = _generatorOptions.defaultOptions,
        defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference, popper, options) {
      if (options === void 0) {
        options = defaultOptions;
      }

      var state = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, {}, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference,
          popper: popper
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state: state,
        setOptions: function setOptions(options) {
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, {}, state.options, {}, options);
          state.scrollParents = {
            reference: isElement$1(reference) ? listScrollParents(reference) : [],
            popper: listScrollParents(popper)
          }; // Orders the modifiers based on their dependencies and `phase`
          // properties

          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

          state.orderedModifiers = orderedModifiers.filter(function (m) {
            return m.enabled;
          }); // Validate the provided modifiers so that the consumer will get warned

          runModifierEffects();
          return instance.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }

          var _state$elements = state.elements,
              reference = _state$elements.reference,
              popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
          // anymore

          if (!areValidElements(reference, popper)) {

            return;
          } // Store the reference and popper rects to be read by modifiers


          state.rects = {
            reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
            popper: getLayoutRect(popper)
          }; // Modifiers have the ability to reset the current update cycle. The
          // most common use case for this is the `flip` modifier changing the
          // placement, which then needs to re-run all the modifiers, because the
          // logic was previously ran for the previous placement and is therefore
          // stale/incorrect

          state.reset = false;
          state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
          // is filled with the initial data specified by the modifier. This means
          // it doesn't persist and is fresh on each update.
          // To ensure persistent data, use `${name}#persistent`

          state.orderedModifiers.forEach(function (modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });

          for (var index = 0; index < state.orderedModifiers.length; index++) {

            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }

            var _state$orderedModifie = state.orderedModifiers[index],
                fn = _state$orderedModifie.fn,
                _state$orderedModifie2 = _state$orderedModifie.options,
                _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                name = _state$orderedModifie.name;

            if (typeof fn === 'function') {
              state = fn({
                state: state,
                options: _options,
                name: name,
                instance: instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function () {
          return new Promise(function (resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };

      if (!areValidElements(reference, popper)) {

        return instance;
      }

      instance.setOptions(options).then(function (state) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state);
        }
      }); // Modifiers have the ability to execute arbitrary code before the first
      // update cycle runs. They will be executed in the same order as the update
      // cycle. This is useful when a modifier adds some persistent data that
      // other modifiers need to use, but the modifier is run after the dependent
      // one.

      function runModifierEffects() {
        state.orderedModifiers.forEach(function (_ref3) {
          var name = _ref3.name,
              _ref3$options = _ref3.options,
              options = _ref3$options === void 0 ? {} : _ref3$options,
              effect = _ref3.effect;

          if (typeof effect === 'function') {
            var cleanupFn = effect({
              state: state,
              name: name,
              instance: instance,
              options: options
            });

            var noopFn = function noopFn() {};

            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }

      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function (fn) {
          return fn();
        });
        effectCleanupFns = [];
      }

      return instance;
    };
  }

  var passive = {
    passive: true
  };

  function effect(_ref) {
    var state = _ref.state,
        instance = _ref.instance,
        options = _ref.options;
    var _options$scroll = options.scroll,
        scroll = _options$scroll === void 0 ? true : _options$scroll,
        _options$resize = options.resize,
        resize = _options$resize === void 0 ? true : _options$resize;
    var window = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.addEventListener('resize', instance.update, passive);
    }

    return function () {
      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.removeEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.removeEventListener('resize', instance.update, passive);
      }
    };
  }

  var eventListeners = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {},
    effect: effect,
    data: {}
  };

  function getVariation(placement) {
    return placement.split('-')[1];
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
  }

  function computeOffsets(_ref) {
    var reference = _ref.reference,
        element = _ref.element,
        placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;

    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference.y - element.height
        };
        break;

      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;

      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;

      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY
        };
        break;

      default:
        offsets = {
          x: reference.x,
          y: reference.y
        };
    }

    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

    if (mainAxis != null) {
      var len = mainAxis === 'y' ? 'height' : 'width';

      switch (variation) {
        case start:
          offsets[mainAxis] = Math.floor(offsets[mainAxis]) - Math.floor(reference[len] / 2 - element[len] / 2);
          break;

        case end:
          offsets[mainAxis] = Math.floor(offsets[mainAxis]) + Math.ceil(reference[len] / 2 - element[len] / 2);
          break;
      }
    }

    return offsets;
  }

  function popperOffsets(_ref) {
    var state = _ref.state,
        name = _ref.name;
    // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: 'absolute',
      placement: state.placement
    });
  }

  var popperOffsets$1 = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {}
  };

  var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
  }; // Round the offsets to the nearest suitable subpixel based on the DPR.
  // Zooming can change the DPR, but it seems to report a value that will
  // cleanly divide the values into the appropriate subpixels.

  function roundOffsets(_ref) {
    var x = _ref.x,
        y = _ref.y;
    var win = window;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: Math.round(x * dpr) / dpr || 0,
      y: Math.round(y * dpr) / dpr || 0
    };
  }

  function mapToStyles(_ref2) {
    var _Object$assign2;

    var popper = _ref2.popper,
        popperRect = _ref2.popperRect,
        placement = _ref2.placement,
        offsets = _ref2.offsets,
        position = _ref2.position,
        gpuAcceleration = _ref2.gpuAcceleration,
        adaptive = _ref2.adaptive;

    var _roundOffsets = roundOffsets(offsets),
        x = _roundOffsets.x,
        y = _roundOffsets.y;

    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = left;
    var sideY = top;
    var win = window;

    if (adaptive) {
      var offsetParent = getOffsetParent(popper);

      if (offsetParent === getWindow(popper)) {
        offsetParent = getDocumentElement(popper);
      } // $FlowFixMe: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

      /*:: offsetParent = (offsetParent: Element); */


      if (placement === top) {
        sideY = bottom;
        y -= offsetParent.clientHeight - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }

      if (placement === left) {
        sideX = right;
        x -= offsetParent.clientWidth - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }

    var commonStyles = Object.assign({
      position: position
    }, adaptive && unsetSides);

    if (gpuAcceleration) {
      var _Object$assign;

      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }

    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
  }

  function computeStyles(_ref3) {
    var state = _ref3.state,
        options = _ref3.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
        gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
        _options$adaptive = options.adaptive,
        adaptive = _options$adaptive === void 0 ? true : _options$adaptive;

    var commonStyles = {
      placement: getBasePlacement(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration: gpuAcceleration
    }; // popper offsets are always available

    state.styles.popper = Object.assign({}, state.styles.popper, {}, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive
    }))); // arrow offsets may not be available

    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, {}, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false
      })));
    }

    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-placement': state.placement
    });
  }

  var computeStyles$1 = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
  };

  // and applies them to the HTMLElements such as popper and arrow

  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function (name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name]; // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (name) {
        var value = attributes[name];

        if (value === false) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, value === true ? '' : value);
        }
      });
    });
  }

  function effect$1(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: 'absolute',
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }

    return function () {
      Object.keys(state.elements).forEach(function (name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

        var style = styleProperties.reduce(function (style, property) {
          style[property] = '';
          return style;
        }, {}); // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        } // Flow doesn't support to extend this property, but it's the most
        // effective way to apply styles to an HTMLElement
        // $FlowFixMe


        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  }

  var applyStyles$1 = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect$1,
    requires: ['computeStyles']
  };

  function distanceAndSkiddingToXY(placement, rects, offset) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

    var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
        skidding = _ref[0],
        distance = _ref[1];

    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }

  function offset(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$offset = options.offset,
        offset = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function (acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement],
        x = _data$state$placement.x,
        y = _data$state$placement.y;
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
    state.modifiersData[name] = data;
  }

  var offset$1 = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset
  };

  var hash = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }

  var hash$1 = {
    start: 'end',
    end: 'start'
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function (matched) {
      return hash$1[matched];
    });
  }

  function getViewportRect(element) {
    var win = getWindow(element);
    return {
      width: win.innerWidth,
      height: win.innerHeight,
      x: 0,
      y: 0
    };
  }

  function getDocumentRect(element) {
    var win = getWindow(element);
    var winScroll = getWindowScroll(element);
    var documentRect = getCompositeRect(getDocumentElement(element), win);
    documentRect.height = Math.max(documentRect.height, win.innerHeight);
    documentRect.width = Math.max(documentRect.width, win.innerWidth);
    documentRect.x = -winScroll.scrollLeft;
    documentRect.y = -winScroll.scrollTop;
    return documentRect;
  }

  function toNumber(cssValue) {
    return parseFloat(cssValue) || 0;
  }

  function getBorders(element) {
    var computedStyle = isHTMLElement(element) ? getComputedStyle$1(element) : {};
    return {
      top: toNumber(computedStyle.borderTopWidth),
      right: toNumber(computedStyle.borderRightWidth),
      bottom: toNumber(computedStyle.borderBottomWidth),
      left: toNumber(computedStyle.borderLeftWidth)
    };
  }

  function getDecorations(element) {
    var win = getWindow(element);
    var borders = getBorders(element);
    var isHTML = getNodeName(element) === 'html';
    var winScrollBarX = getWindowScrollBarX(element);
    var x = element.clientWidth + borders.right;
    var y = element.clientHeight + borders.bottom; // HACK:
    // document.documentElement.clientHeight on iOS reports the height of the
    // viewport including the bottom bar, even if the bottom bar isn't visible.
    // If the difference between window innerHeight and html clientHeight is more
    // than 50, we assume it's a mobile bottom bar and ignore scrollbars.
    // * A 50px thick scrollbar is likely non-existent (macOS is 15px and Windows
    //   is about 17px)
    // * The mobile bar is 114px tall

    if (isHTML && win.innerHeight - element.clientHeight > 50) {
      y = win.innerHeight - borders.bottom;
    }

    return {
      top: isHTML ? 0 : element.clientTop,
      right: // RTL scrollbar (scrolling containers only)
      element.clientLeft > borders.left ? borders.right : // LTR scrollbar
      isHTML ? win.innerWidth - x - winScrollBarX : element.offsetWidth - x,
      bottom: isHTML ? win.innerHeight - y : element.offsetHeight - y,
      left: isHTML ? winScrollBarX : element.clientLeft
    };
  }

  function contains(parent, child) {
    // $FlowFixMe: hasOwnProperty doesn't seem to work in tests
    var isShadow = Boolean(child.getRootNode && child.getRootNode().host); // First, attempt with faster native method

    if (parent.contains(child)) {
      return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (isShadow) {
        var next = child;

        do {
          if (next && parent.isSameNode(next)) {
            return true;
          } // $FlowFixMe: need a better way to handle this...


          next = next.parentNode || next.host;
        } while (next);
      } // Give up, the result is false


    return false;
  }

  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }

  function getClientRectFromMixedType(element, clippingParent) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  } // A "clipping parent" is an overflowable container with the characteristic of
  // clipping (or hiding) overflowing elements with a position different from
  // `initial`


  function getClippingParents(element) {
    var clippingParents = listScrollParents(element);
    var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

    if (!isElement$1(clipperElement)) {
      return [];
    } // $FlowFixMe: https://github.com/facebook/flow/issues/1414


    return clippingParents.filter(function (clippingParent) {
      return isElement$1(clippingParent) && contains(clippingParent, clipperElement);
    });
  } // Gets the maximum area that the element is visible in due to any number of
  // clipping parents


  function getClippingRect(element, boundary, rootBoundary) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent);
      var decorations = getDecorations(isHTMLElement(clippingParent) ? clippingParent : getDocumentElement(element));
      accRect.top = Math.max(rect.top + decorations.top, accRect.top);
      accRect.right = Math.min(rect.right - decorations.right, accRect.right);
      accRect.bottom = Math.min(rect.bottom - decorations.bottom, accRect.bottom);
      accRect.left = Math.max(rect.left + decorations.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), {}, paddingObject);
  }

  function expandToHashMap(value, keys) {
    return keys.reduce(function (hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }

  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$placement = _options.placement,
        placement = _options$placement === void 0 ? state.placement : _options$placement,
        _options$boundary = _options.boundary,
        boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
        _options$rootBoundary = _options.rootBoundary,
        rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
        _options$elementConte = _options.elementContext,
        elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
        _options$altBoundary = _options.altBoundary,
        altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
        _options$padding = _options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var referenceElement = state.elements.reference;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement$1(element) ? element : getDocumentElement(state.elements.popper), boundary, rootBoundary);
    var referenceClientRect = getBoundingClientRect(referenceElement);
    var popperOffsets = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: 'absolute',
      placement: placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, {}, popperOffsets));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect

    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

    if (elementContext === popper && offsetData) {
      var offset = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function (key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
        overflowOffsets[key] += offset[axis] * multiply;
      });
    }

    return overflowOffsets;
  }

  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        placement = _options.placement,
        boundary = _options.boundary,
        rootBoundary = _options.rootBoundary,
        padding = _options.padding,
        flipVariations = _options.flipVariations;
    var variation = getVariation(placement);
    var placements = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
      return getVariation(placement) === variation;
    }) : basePlacements; // $FlowFixMe: Flow seems to have problems with two array unions...

    var overflows = placements.reduce(function (acc, placement) {
      acc[placement] = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding
      })[getBasePlacement(placement)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function (a, b) {
      return overflows[a] - overflows[b];
    });
  }

  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }

    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }

  function flip(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;

    if (state.modifiersData[name]._skip) {
      return;
    }

    var specifiedFallbackPlacements = options.fallbackPlacements,
        padding = options.padding,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        _options$flipVariatio = options.flipVariations,
        flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
      return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        flipVariations: flipVariations
      }) : placement);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];

    for (var i = 0; i < placements.length; i++) {
      var placement = placements[i];

      var _basePlacement = getBasePlacement(placement);

      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? 'width' : 'height';
      var overflow = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }

      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [overflow[_basePlacement] <= 0, overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0];

      if (checks.every(function (check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }

      checksMap.set(placement, checks);
    }

    if (makeFallbackChecks) {
      // `2` may be desired in some cases – research later
      var numberOfChecks = flipVariations ? 3 : 1;

      var _loop = function _loop(_i) {
        var fittingPlacement = placements.find(function (placement) {
          var checks = checksMap.get(placement);

          if (checks) {
            return checks.slice(0, _i).every(function (check) {
              return check;
            });
          }
        });

        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };

      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);

        if (_ret === "break") break;
      }
    }

    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  }

  var flip$1 = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: ['offset'],
    data: {
      _skip: false
    }
  };

  function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  function within(min, value, max) {
    return Math.max(min, Math.min(value, max));
  }

  function preventOverflow(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        padding = options.padding,
        _options$tether = options.tether,
        tether = _options$tether === void 0 ? true : _options$tether,
        _options$tetherOffset = options.tetherOffset,
        tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var data = {
      x: 0,
      y: 0
    };

    if (checkMainAxis) {
      var mainSide = mainAxis === 'y' ? top : left;
      var altSide = mainAxis === 'y' ? bottom : right;
      var len = mainAxis === 'y' ? 'height' : 'width';
      var offset = popperOffsets[mainAxis];
      var min = popperOffsets[mainAxis] + overflow[mainSide];
      var max = popperOffsets[mainAxis] - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
      // outside the reference bounds

      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
      // to include its full size in the calculation. If the reference is small
      // and near the edge of a boundary, the popper can overflow even if the
      // reference is not overflowing as well (e.g. virtual elements with no
      // width or height)

      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
      var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
      var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue;
      var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? Math.min(min, tetherMin) : min, offset, tether ? Math.max(max, tetherMax) : max);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _mainSide = mainAxis === 'x' ? top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var _preventedOffset = within(_min, _offset, _max);

      state.modifiersData.popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }

    state.modifiersData[name] = data;
  }

  var preventOverflow$1 = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: ['offset']
  };

  function arrow(_ref) {
    var _state$modifiersData$;

    var state = _ref.state,
        name = _ref.name;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? 'height' : 'width';

    if (!arrowElement) {
      return;
    }

    var paddingObject = state.modifiersData[name + "#persistent"].padding;
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === 'y' ? top : left;
    var maxProp = axis === 'y' ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
    // outside of the popper bounds

    var center = within(paddingObject[minProp], state.rects.popper[len] / 2 - arrowRect[len] / 2 + centerToReference, state.rects.popper[len] - arrowRect[len] - paddingObject[maxProp]); // Prevents breaking syntax highlighting...

    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = center, _state$modifiersData$);
  }

  function effect$2(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$element = options.element,
        arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element,
        _options$padding = options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding; // CSS selector

    if (typeof arrowElement === 'string') {
      arrowElement = state.elements.popper.querySelector(arrowElement);

      if (!arrowElement) {
        return;
      }
    }

    if (!contains(state.elements.popper, arrowElement)) {

      return;
    }

    state.elements.arrow = arrowElement;
    state.modifiersData[name + "#persistent"] = {
      padding: mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements))
    };
  }

  var arrow$1 = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect: effect$2,
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow']
  };

  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }

    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }

  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function (side) {
      return overflow[side] >= 0;
    });
  }

  function hide(_ref) {
    var state = _ref.state,
        name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: 'reference'
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets: referenceClippingOffsets,
      popperEscapeOffsets: popperEscapeOffsets,
      isReferenceHidden: isReferenceHidden,
      hasPopperEscaped: hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-reference-hidden': isReferenceHidden,
      'data-popper-escaped': hasPopperEscaped
    });
  }

  var hide$1 = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn: hide
  };

  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper =
  /*#__PURE__*/
  popperGenerator({
    defaultModifiers: defaultModifiers
  }); // eslint-disable-next-line import/no-unused-modules

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$6 = 'dropdown';
  var VERSION$6 = '3.0.0-rc.4';
  var DATA_KEY$6 = 'coreui.dropdown';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var DATA_API_KEY$6 = '.data-api';
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var Event$7 = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    CLICK_DATA_API: "click" + EVENT_KEY$6 + DATA_API_KEY$6,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY$6 + DATA_API_KEY$6,
    KEYUP_DATA_API: "keyup" + EVENT_KEY$6 + DATA_API_KEY$6
  };
  var ClassName$6 = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    DROPRIGHT: 'dropright',
    DROPLEFT: 'dropleft',
    MENURIGHT: 'dropdown-menu-right',
    POSITION_STATIC: 'position-static'
  };
  var Selector$6 = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    HEADER_NAV: '.c-header-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
  };
  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end'
  };
  var Default$4 = {
    offset: [0, 0],
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  };
  var DefaultType$2 = {
    offset: '(array|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown =
  /*#__PURE__*/
  function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();
      this._inHeader = this._detectHeader();

      this._addEventListeners();

      Data.setData(element, DATA_KEY$6, this);
    } // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.disabled || this._element.classList.contains(ClassName$6.DISABLED)) {
        return;
      }

      var isActive = this._menu.classList.contains(ClassName$6.SHOW);

      Dropdown.clearMenus();

      if (isActive) {
        return;
      }

      this.show();
    };

    _proto.show = function show() {
      if (this._element.disabled || this._element.classList.contains(ClassName$6.DISABLED) || this._menu.classList.contains(ClassName$6.SHOW)) {
        return;
      }

      var parent = Dropdown.getParentFromElement(this._element);
      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = EventHandler.trigger(parent, Event$7.SHOW, relatedTarget);

      if (showEvent.defaultPrevented) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar && !this._inHeader) {
        if (typeof createPopper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          parent.classList.add(ClassName$6.POSITION_STATIC);
        }

        this._popper = createPopper(referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && !makeArray(SelectorEngine.closest(parent, Selector$6.NAVBAR_NAV)).length) {
        makeArray(document.body.children).forEach(function (elem) {
          return EventHandler.on(elem, 'mouseover', null, noop());
        });
      }

      if ('ontouchstart' in document.documentElement && !makeArray(SelectorEngine.closest(parent, Selector$6.HEADER_NAV)).length) {
        makeArray(document.body.children).forEach(function (elem) {
          return EventHandler.on(elem, 'mouseover', null, noop());
        });
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      Manipulator.toggleClass(this._menu, ClassName$6.SHOW);
      Manipulator.toggleClass(parent, ClassName$6.SHOW);
      EventHandler.trigger(parent, Event$7.SHOWN, relatedTarget);
    };

    _proto.hide = function hide() {
      if (this._element.disabled || this._element.classList.contains(ClassName$6.DISABLED) || !this._menu.classList.contains(ClassName$6.SHOW)) {
        return;
      }

      var parent = Dropdown.getParentFromElement(this._element);
      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = EventHandler.trigger(parent, Event$7.HIDE, relatedTarget);

      if (hideEvent.defaultPrevented) {
        return;
      }

      if (this._popper) {
        this._popper.destroy();
      }

      Manipulator.toggleClass(this._menu, ClassName$6.SHOW);
      Manipulator.toggleClass(parent, ClassName$6.SHOW);
      EventHandler.trigger(parent, Event$7.HIDDEN, relatedTarget);
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$6);
      EventHandler.off(this._element, EVENT_KEY$6);
      this._element = null;
      this._menu = null;

      if (this._popper) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();
      this._inHeader = this._detectHeader();

      if (this._popper) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      EventHandler.on(this._element, Event$7.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, this.constructor.Default, {}, Manipulator.getDataAttributes(this._element), {}, config);
      typeCheckConfig(NAME$6, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      var parent = Dropdown.getParentFromElement(this._element);
      return SelectorEngine.findOne(Selector$6.MENU, parent);
    };

    _proto._getPlacement = function _getPlacement() {
      var parentDropdown = this._element.parentNode;
      var placement = AttachmentMap.BOTTOM; // Handle dropup

      if (parentDropdown.classList.contains(ClassName$6.DROPUP)) {
        placement = AttachmentMap.TOP;

        if (this._menu.classList.contains(ClassName$6.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if (parentDropdown.classList.contains(ClassName$6.DROPRIGHT)) {
        placement = AttachmentMap.RIGHT;
      } else if (parentDropdown.classList.contains(ClassName$6.DROPLEFT)) {
        placement = AttachmentMap.LEFT;
      } else if (this._menu.classList.contains(ClassName$6.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return Boolean(SelectorEngine.closest(this._element, '.navbar'));
    };

    _proto._detectHeader = function _detectHeader() {
      return Boolean(SelectorEngine.closest(this._element, '.c-header'));
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = [];

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread2({}, data.offsets, {}, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }, {
          name: 'flip',
          enabled: this._config.flip
        }, {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }]
      }; // Disable Popper.js if we have a static display

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return _objectSpread2({}, popperConfig, {}, this._config.popperConfig);
    } // Static
    ;

    Dropdown.dropdownInterface = function dropdownInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$6);

      var _config = typeof config === 'object' ? config : null;

      if (!data) {
        data = new Dropdown(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    };

    Dropdown.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        Dropdown.dropdownInterface(this, config);
      });
    };

    Dropdown.clearMenus = function clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = makeArray(SelectorEngine.find(Selector$6.DATA_TOGGLE));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown.getParentFromElement(toggles[i]);
        var context = Data.getData(toggles[i], DATA_KEY$6);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!parent.classList.contains(ClassName$6.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && parent.contains(event.target)) {
          continue;
        }

        var hideEvent = EventHandler.trigger(parent, Event$7.HIDE, relatedTarget);

        if (hideEvent.defaultPrevented) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          makeArray(document.body.children).forEach(function (elem) {
            return EventHandler.off(elem, 'mouseover', null, noop());
          });
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        if (context._popper) {
          context._popper.destroy();
        }

        dropdownMenu.classList.remove(ClassName$6.SHOW);
        parent.classList.remove(ClassName$6.SHOW);
        EventHandler.trigger(parent, Event$7.HIDDEN, relatedTarget);
      }
    };

    Dropdown.getParentFromElement = function getParentFromElement(element) {
      return getElementFromSelector(element) || element.parentNode;
    };

    Dropdown.dataApiKeydownHandler = function dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || SelectorEngine.closest(event.target, Selector$6.MENU)) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || this.classList.contains(ClassName$6.DISABLED)) {
        return;
      }

      var parent = Dropdown.getParentFromElement(this);
      var isActive = parent.classList.contains(ClassName$6.SHOW);

      if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE) {
          SelectorEngine.findOne(Selector$6.DATA_TOGGLE, parent).focus();
        }

        Dropdown.clearMenus();
        return;
      }

      var items = makeArray(SelectorEngine.find(Selector$6.VISIBLE_ITEMS, parent)).filter(isVisible);

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    Dropdown.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$6);
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, Event$7.KEYDOWN_DATA_API, Selector$6.DATA_TOGGLE, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, Event$7.KEYDOWN_DATA_API, Selector$6.MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, Event$7.CLICK_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, Event$7.KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, Event$7.CLICK_DATA_API, Selector$6.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();
    Dropdown.dropdownInterface(this, 'toggle');
  });
  EventHandler.on(document, Event$7.CLICK_DATA_API, Selector$6.FORM_CHILD, function (e) {
    return e.stopPropagation();
  });
  var $$7 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .dropdown to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$7) {
    var JQUERY_NO_CONFLICT$6 = $$7.fn[NAME$6];
    $$7.fn[NAME$6] = Dropdown.jQueryInterface;
    $$7.fn[NAME$6].Constructor = Dropdown;

    $$7.fn[NAME$6].noConflict = function () {
      $$7.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
      return Dropdown.jQueryInterface;
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$7 = 'modal';
  var VERSION$7 = '3.0.0-rc.4';
  var DATA_KEY$7 = 'coreui.modal';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var DATA_API_KEY$7 = '.data-api';
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default$5 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var Event$8 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDE_PREVENTED: "hidePrevented" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    RESIZE: "resize" + EVENT_KEY$7,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$7,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY$7,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$7,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$7,
    CLICK_DATA_API: "click" + EVENT_KEY$7 + DATA_API_KEY$7
  };
  var ClassName$7 = {
    SCROLLABLE: 'modal-dialog-scrollable',
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show',
    STATIC: 'modal-static'
  };
  var Selector$7 = {
    DIALOG: '.modal-dialog',
    MODAL_BODY: '.modal-body',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal =
  /*#__PURE__*/
  function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = SelectorEngine.findOne(Selector$7.DIALOG, element);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
      Data.setData(element, DATA_KEY$7, this);
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if (this._element.classList.contains(ClassName$7.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = EventHandler.trigger(this._element, Event$8.SHOW, {
        relatedTarget: relatedTarget
      });

      if (this._isShown || showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      EventHandler.on(this._element, Event$8.CLICK_DISMISS, Selector$7.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      EventHandler.on(this._dialog, Event$8.MOUSEDOWN_DISMISS, function () {
        EventHandler.one(_this._element, Event$8.MOUSEUP_DISMISS, function (event) {
          if (event.target === _this._element) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = EventHandler.trigger(this._element, Event$8.HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._isShown = false;

      var transition = this._element.classList.contains(ClassName$7.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      EventHandler.off(document, Event$8.FOCUSIN);

      this._element.classList.remove(ClassName$7.SHOW);

      EventHandler.off(this._element, Event$8.CLICK_DISMISS);
      EventHandler.off(this._dialog, Event$8.MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        });
        emulateTransitionEnd(this._element, transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return EventHandler.off(htmlElement, EVENT_KEY$7);
      });
      /**
       * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `Event.CLICK_DATA_API` event that should remain
       */

      EventHandler.off(document, Event$8.FOCUSIN);
      Data.removeData(this._element, DATA_KEY$7);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default$5, {}, config);
      typeCheckConfig(NAME$7, config, DefaultType$3);
      return config;
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = this._element.classList.contains(ClassName$7.FADE);

      var modalBody = SelectorEngine.findOne(Selector$7.MODAL_BODY, this._dialog);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      if (this._dialog.classList.contains(ClassName$7.SCROLLABLE) && modalBody) {
        modalBody.scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        reflow(this._element);
      }

      this._element.classList.add(ClassName$7.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }

        _this3._isTransitioning = false;
        EventHandler.trigger(_this3._element, Event$8.SHOWN, {
          relatedTarget: relatedTarget
        });
      };

      if (transition) {
        var transitionDuration = getTransitionDurationFromElement(this._dialog);
        EventHandler.one(this._dialog, TRANSITION_END, transitionComplete);
        emulateTransitionEnd(this._dialog, transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this4 = this;

      EventHandler.off(document, Event$8.FOCUSIN); // guard against infinite focus loop

      EventHandler.on(document, Event$8.FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && !_this4._element.contains(event.target)) {
          _this4._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown && this._config.keyboard) {
        EventHandler.on(this._element, Event$8.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE$1) {
            _this5._triggerBackdropTransition();
          }
        });
      } else {
        EventHandler.off(this._element, Event$8.KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this6 = this;

      if (this._isShown) {
        EventHandler.on(window, Event$8.RESIZE, function () {
          return _this6._adjustDialog();
        });
      } else {
        EventHandler.off(window, Event$8.RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this7 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        document.body.classList.remove(ClassName$7.OPEN);

        _this7._resetAdjustments();

        _this7._resetScrollbar();

        EventHandler.trigger(_this7._element, Event$8.HIDDEN);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      this._backdrop.parentNode.removeChild(this._backdrop);

      this._backdrop = null;
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this8 = this;

      var animate = this._element.classList.contains(ClassName$7.FADE) ? ClassName$7.FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName$7.BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        document.body.appendChild(this._backdrop);
        EventHandler.on(this._element, Event$8.CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          _this8._triggerBackdropTransition();
        });

        if (animate) {
          reflow(this._backdrop);
        }

        this._backdrop.classList.add(ClassName$7.SHOW);

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);
        EventHandler.one(this._backdrop, TRANSITION_END, callback);
        emulateTransitionEnd(this._backdrop, backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        this._backdrop.classList.remove(ClassName$7.SHOW);

        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();

          callback();
        };

        if (this._element.classList.contains(ClassName$7.FADE)) {
          var _backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);

          EventHandler.one(this._backdrop, TRANSITION_END, callbackRemove);
          emulateTransitionEnd(this._backdrop, _backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else {
        callback();
      }
    };

    _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
      var _this9 = this;

      if (this._config.backdrop === 'static') {
        var hideEvent = EventHandler.trigger(this._element, Event$8.HIDE_PREVENTED);

        if (hideEvent.defaultPrevented) {
          return;
        }

        this._element.classList.add(ClassName$7.STATIC);

        var modalTransitionDuration = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, function () {
          _this9._element.classList.remove(ClassName$7.STATIC);
        });
        emulateTransitionEnd(this._element, modalTransitionDuration);

        this._element.focus();
      } else {
        this.hide();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this10 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        // Adjust fixed content padding
        makeArray(SelectorEngine.find(Selector$7.FIXED_CONTENT)).forEach(function (element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = window.getComputedStyle(element)['padding-right'];
          Manipulator.setDataAttribute(element, 'padding-right', actualPadding);
          element.style.paddingRight = parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px";
        }); // Adjust sticky content margin

        makeArray(SelectorEngine.find(Selector$7.STICKY_CONTENT)).forEach(function (element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = window.getComputedStyle(element)['margin-right'];
          Manipulator.setDataAttribute(element, 'margin-right', actualMargin);
          element.style.marginRight = parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px";
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = window.getComputedStyle(document.body)['padding-right'];
        Manipulator.setDataAttribute(document.body, 'padding-right', actualPadding);
        document.body.style.paddingRight = parseFloat(calculatedPadding) + this._scrollbarWidth + "px";
      }

      document.body.classList.add(ClassName$7.OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      makeArray(SelectorEngine.find(Selector$7.FIXED_CONTENT)).forEach(function (element) {
        var padding = Manipulator.getDataAttribute(element, 'padding-right');

        if (typeof padding !== 'undefined') {
          Manipulator.removeDataAttribute(element, 'padding-right');
          element.style.paddingRight = padding;
        }
      }); // Restore sticky content and navbar-toggler margin

      makeArray(SelectorEngine.find("" + Selector$7.STICKY_CONTENT)).forEach(function (element) {
        var margin = Manipulator.getDataAttribute(element, 'margin-right');

        if (typeof margin !== 'undefined') {
          Manipulator.removeDataAttribute(element, 'margin-right');
          element.style.marginRight = margin;
        }
      }); // Restore body padding

      var padding = Manipulator.getDataAttribute(document.body, 'padding-right');

      if (typeof padding === 'undefined') {
        document.body.style.paddingRight = '';
      } else {
        Manipulator.removeDataAttribute(document.body, 'padding-right');
        document.body.style.paddingRight = padding;
      }
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName$7.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal.jQueryInterface = function jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$7);

        var _config = _objectSpread2({}, Default$5, {}, Manipulator.getDataAttributes(this), {}, typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    Modal.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$7);
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, Event$8.CLICK_DATA_API, Selector$7.DATA_TOGGLE, function (event) {
    var _this11 = this;

    var target = getElementFromSelector(this);

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    EventHandler.one(target, Event$8.SHOW, function (showEvent) {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      EventHandler.one(target, Event$8.HIDDEN, function () {
        if (isVisible(_this11)) {
          _this11.focus();
        }
      });
    });
    var data = Data.getData(target, DATA_KEY$7);

    if (!data) {
      var config = _objectSpread2({}, Manipulator.getDataAttributes(target), {}, Manipulator.getDataAttributes(this));

      data = new Modal(target, config);
    }

    data.show(this);
  });
  var $$8 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .modal to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$8) {
    var JQUERY_NO_CONFLICT$7 = $$8.fn[NAME$7];
    $$8.fn[NAME$7] = Modal.jQueryInterface;
    $$8.fn[NAME$7].Constructor = Modal;

    $$8.fn[NAME$7].noConflict = function () {
      $$8.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
      return Modal.jQueryInterface;
    };
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

  var allowedAttribute = function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  };

  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = makeArray(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(elName) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = makeArray(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'tooltip';
  var VERSION$8 = '3.0.0-rc.4';
  var DATA_KEY$8 = 'coreui.tooltip';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object',
    popperConfig: '(null|object)'
  };
  var AttachmentMap$1 = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$6 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: ['top', 'right', 'bottom', 'left'],
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist,
    popperConfig: null
  };
  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };
  var Event$9 = {
    HIDE: "hide" + EVENT_KEY$8,
    HIDDEN: "hidden" + EVENT_KEY$8,
    SHOW: "show" + EVENT_KEY$8,
    SHOWN: "shown" + EVENT_KEY$8,
    INSERTED: "inserted" + EVENT_KEY$8,
    CLICK: "click" + EVENT_KEY$8,
    FOCUSIN: "focusin" + EVENT_KEY$8,
    FOCUSOUT: "focusout" + EVENT_KEY$8,
    MOUSEENTER: "mouseenter" + EVENT_KEY$8,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$8
  };
  var ClassName$8 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$8 = {
    TOOLTIP_INNER: '.tooltip-inner'
  };
  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip =
  /*#__PURE__*/
  function () {
    function Tooltip(element, config) {
      if (typeof createPopper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();

      Data.setData(element, this.constructor.DATA_KEY, this);
    } // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = Data.getData(event.delegateTarget, dataKey);

        if (!context) {
          context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
          Data.setData(event.delegateTarget, dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if (this.getTipElement().classList.contains(ClassName$8.SHOW)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      Data.removeData(this.element, this.constructor.DATA_KEY);
      EventHandler.off(this.element, this.constructor.EVENT_KEY);
      EventHandler.off(SelectorEngine.closest(this.element, '.modal'), 'hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        this.tip.parentNode.removeChild(this.tip);
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if (this.element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }

      if (this.isWithContent() && this._isEnabled) {
        var showEvent = EventHandler.trigger(this.element, this.constructor.Event.SHOW);
        var shadowRoot = findShadowRoot(this.element);
        var isInTheDom = shadowRoot === null ? this.element.ownerDocument.documentElement.contains(this.element) : shadowRoot.contains(this.element);

        if (showEvent.defaultPrevented || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          tip.classList.add(ClassName$8.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this._addAttachmentClass(attachment);

        var container = this._getContainer();

        Data.setData(tip, this.constructor.DATA_KEY, this);

        if (!this.element.ownerDocument.documentElement.contains(this.tip)) {
          container.appendChild(tip);
        }

        EventHandler.trigger(this.element, this.constructor.Event.INSERTED);
        this._popper = createPopper(this.element, tip, this._getPopperConfig(attachment));
        tip.classList.add(ClassName$8.SHOW); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          makeArray(document.body.children).forEach(function (element) {
            EventHandler.on(element, 'mouseover', noop());
          });
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          EventHandler.trigger(_this.element, _this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          }
        };

        if (this.tip.classList.contains(ClassName$8.FADE)) {
          var transitionDuration = getTransitionDurationFromElement(this.tip);
          EventHandler.one(this.tip, TRANSITION_END, complete);
          emulateTransitionEnd(this.tip, transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide() {
      var _this2 = this;

      var tip = this.getTipElement();

      var complete = function complete() {
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        EventHandler.trigger(_this2.element, _this2.constructor.Event.HIDDEN);

        _this2._popper.destroy();
      };

      var hideEvent = EventHandler.trigger(this.element, this.constructor.Event.HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      tip.classList.remove(ClassName$8.SHOW); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        makeArray(document.body.children).forEach(function (element) {
          return EventHandler.off(element, 'mouseover', noop);
        });
      }

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if (this.tip.classList.contains(ClassName$8.FADE)) {
        var transitionDuration = getTransitionDurationFromElement(tip);
        EventHandler.one(tip, TRANSITION_END, complete);
        emulateTransitionEnd(tip, transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.getTipElement = function getTipElement() {
      if (this.tip) {
        return this.tip;
      }

      var element = document.createElement('div');
      element.innerHTML = this.config.template;
      this.tip = element.children[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent(SelectorEngine.findOne(Selector$8.TOOLTIP_INNER, tip), this.getTitle());
      tip.classList.remove(ClassName$8.FADE);
      tip.classList.remove(ClassName$8.SHOW);
    };

    _proto.setElementContent = function setElementContent(element, content) {
      if (element === null) {
        return;
      }

      if (typeof content === 'object' && isElement(content)) {
        if (content.jquery) {
          content = content[0];
        } // content is a DOM node or a jQuery


        if (this.config.html) {
          if (content.parentNode !== element) {
            element.innerHTML = '';
            element.appendChild(content);
          }
        } else {
          element.innerText = content.textContent;
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        element.innerHTML = content;
      } else {
        element.innerText = content;
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getPopperConfig = function _getPopperConfig(attachment) {
      var _this3 = this;

      var defaultBsConfig = {
        placement: attachment,
        modifiers: [{
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }, {
          name: 'flip',
          options: {
            fallbackPlacements: this.config.fallbackPlacement
          }
        }, {
          name: 'arrow',
          options: {
            element: "." + this.constructor.NAME + "-arrow"
          }
        }, {
          name: 'preventOverflow',
          options: {
            boundary: this.config.boundary
          }
        }],
        onCreate: function onCreate(data) {
          if (data.originalPlacement !== data.placement) {
            _this3._handlePopperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          return _this3._handlePopperPlacementChange(data);
        }
      };
      return _objectSpread2({}, defaultBsConfig, {}, this.config.popperConfig);
    };

    _proto._addAttachmentClass = function _addAttachmentClass(attachment) {
      this.getTipElement().classList.add(CLASS_PREFIX + "-" + attachment);
    };

    _proto._getOffset = function _getOffset() {
      var _this4 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread2({}, data.offsets, {}, _this4.config.offset(data.offsets, _this4.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (isElement(this.config.container)) {
        return this.config.container;
      }

      return SelectorEngine.findOne(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap$1[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this5 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          EventHandler.on(_this5.element, _this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
            return _this5.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
          EventHandler.on(_this5.element, eventIn, _this5.config.selector, function (event) {
            return _this5._enter(event);
          });
          EventHandler.on(_this5.element, eventOut, _this5.config.selector, function (event) {
            return _this5._leave(event);
          });
        }
      });

      this._hideModalHandler = function () {
        if (_this5.element) {
          _this5.hide();
        }
      };

      EventHandler.on(SelectorEngine.closest(this.element, '.modal'), 'hide.bs.modal', this._hideModalHandler);

      if (this.config.selector) {
        this.config = _objectSpread2({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || Data.getData(event.delegateTarget, dataKey);

      if (!context) {
        context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
        Data.setData(event.delegateTarget, dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if (context.getTipElement().classList.contains(ClassName$8.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || Data.getData(event.delegateTarget, dataKey);

      if (!context) {
        context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
        Data.setData(event.delegateTarget, dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = Manipulator.getDataAttributes(this.element);
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });

      if (config && typeof config.container === 'object' && config.container.jquery) {
        config.container = config.container[0];
      }

      config = _objectSpread2({}, this.constructor.Default, {}, dataAttributes, {}, typeof config === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      typeCheckConfig(NAME$8, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var tip = this.getTipElement();
      var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length) {
        tabClass.map(function (token) {
          return token.trim();
        }).forEach(function (tClass) {
          return tip.classList.remove(tClass);
        });
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      var popperInstance = popperData.instance;
      this.tip = popperInstance.popper;

      this._cleanTipClass();

      this._addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      tip.classList.remove(ClassName$8.FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$8);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Tooltip.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$8);
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$8;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$8;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$9;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$8;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);

    return Tooltip;
  }();

  var $$9 = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .tooltip to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$9) {
    var JQUERY_NO_CONFLICT$8 = $$9.fn[NAME$8];
    $$9.fn[NAME$8] = Tooltip.jQueryInterface;
    $$9.fn[NAME$8].Constructor = Tooltip;

    $$9.fn[NAME$8].noConflict = function () {
      $$9.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
      return Tooltip.jQueryInterface;
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'popover';
  var VERSION$9 = '3.0.0-rc.4';
  var DATA_KEY$9 = 'coreui.popover';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$7 = _objectSpread2({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$5 = _objectSpread2({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName$9 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$9 = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };
  var Event$a = {
    HIDE: "hide" + EVENT_KEY$9,
    HIDDEN: "hidden" + EVENT_KEY$9,
    SHOW: "show" + EVENT_KEY$9,
    SHOWN: "shown" + EVENT_KEY$9,
    INSERTED: "inserted" + EVENT_KEY$9,
    CLICK: "click" + EVENT_KEY$9,
    FOCUSIN: "focusin" + EVENT_KEY$9,
    FOCUSOUT: "focusout" + EVENT_KEY$9,
    MOUSEENTER: "mouseenter" + EVENT_KEY$9,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$9
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover =
  /*#__PURE__*/
  function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement(); // we use append for html objects to maintain js events

      this.setElementContent(SelectorEngine.findOne(Selector$9.TITLE, tip), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent(SelectorEngine.findOne(Selector$9.CONTENT, tip), content);
      tip.classList.remove(ClassName$9.FADE);
      tip.classList.remove(ClassName$9.SHOW);
    };

    _proto._addAttachmentClass = function _addAttachmentClass(attachment) {
      this.getTipElement().classList.add(CLASS_PREFIX$1 + "-" + attachment);
    } // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var tip = this.getTipElement();
      var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        tabClass.map(function (token) {
          return token.trim();
        }).forEach(function (tClass) {
          return tip.classList.remove(tClass);
        });
      }
    } // Static
    ;

    Popover.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$9);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          Data.setData(this, DATA_KEY$9, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Popover.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$9);
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$9;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$9;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$9;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$a;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$9;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Popover;
  }(Tooltip);

  var $$a = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  /* istanbul ignore if */

  if ($$a) {
    var JQUERY_NO_CONFLICT$9 = $$a.fn[NAME$9];
    $$a.fn[NAME$9] = Popover.jQueryInterface;
    $$a.fn[NAME$9].Constructor = Popover;

    $$a.fn[NAME$9].noConflict = function () {
      $$a.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
      return Popover.jQueryInterface;
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'scrollspy';
  var VERSION$a = '3.0.0-rc.4';
  var DATA_KEY$a = 'coreui.scrollspy';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var DATA_API_KEY$8 = '.data-api';
  var Default$8 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var Event$b = {
    ACTIVATE: "activate" + EVENT_KEY$a,
    SCROLL: "scroll" + EVENT_KEY$a,
    LOAD_DATA_API: "load" + EVENT_KEY$a + DATA_API_KEY$8
  };
  var ClassName$a = {
    DROPDOWN_ITEM: 'dropdown-item',
    ACTIVE: 'active'
  };
  var Selector$a = {
    DATA_SPY: '[data-spy="scroll"]',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    NAV_ITEMS: '.nav-item',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };
  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy =
  /*#__PURE__*/
  function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + Selector$a.NAV_LINKS + "," + (this._config.target + " " + Selector$a.LIST_ITEMS + ",") + (this._config.target + " ." + ClassName$a.DROPDOWN_ITEM);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      EventHandler.on(this._scrollElement, Event$b.SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();

      Data.setData(element, DATA_KEY$a, this);
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = makeArray(SelectorEngine.find(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = getSelectorFromElement(element);

        if (targetSelector) {
          target = SelectorEngine.findOne(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$a);
      EventHandler.off(this._scrollElement, EVENT_KEY$a);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default$8, {}, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string') {
        var id = config.target.id;

        if (!id) {
          id = getUID(NAME$a);
          config.target.id = id;
        }

        config.target = "#" + id;
      }

      typeCheckConfig(NAME$a, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      var offsetLength = this._offsets.length;

      for (var i = offsetLength; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var link = SelectorEngine.findOne(queries.join(','));

      if (link.classList.contains(ClassName$a.DROPDOWN_ITEM)) {
        SelectorEngine.findOne(Selector$a.DROPDOWN_TOGGLE, SelectorEngine.closest(link, Selector$a.DROPDOWN)).classList.add(ClassName$a.ACTIVE);
        link.classList.add(ClassName$a.ACTIVE);
      } else {
        // Set triggered link as active
        link.classList.add(ClassName$a.ACTIVE);
        SelectorEngine.parents(link, Selector$a.NAV_LIST_GROUP).forEach(function (listGroup) {
          // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
          SelectorEngine.prev(listGroup, Selector$a.NAV_LINKS + ", " + Selector$a.LIST_ITEMS).forEach(function (item) {
            return item.classList.add(ClassName$a.ACTIVE);
          }); // Handle special case when .nav-link is inside .nav-item

          SelectorEngine.prev(listGroup, Selector$a.NAV_ITEMS).forEach(function (navItem) {
            SelectorEngine.children(navItem, Selector$a.NAV_LINKS).forEach(function (item) {
              return item.classList.add(ClassName$a.ACTIVE);
            });
          });
        });
      }

      EventHandler.trigger(this._scrollElement, Event$b.ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      makeArray(SelectorEngine.find(this._selector)).filter(function (node) {
        return node.classList.contains(ClassName$a.ACTIVE);
      }).forEach(function (node) {
        return node.classList.remove(ClassName$a.ACTIVE);
      });
    } // Static
    ;

    ScrollSpy.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$a);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    ScrollSpy.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$a);
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$8;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(window, Event$b.LOAD_DATA_API, function () {
    makeArray(SelectorEngine.find(Selector$a.DATA_SPY)).forEach(function (spy) {
      return new ScrollSpy(spy, Manipulator.getDataAttributes(spy));
    });
  });
  var $$b = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  /* istanbul ignore if */

  if ($$b) {
    var JQUERY_NO_CONFLICT$a = $$b.fn[NAME$a];
    $$b.fn[NAME$a] = ScrollSpy.jQueryInterface;
    $$b.fn[NAME$a].Constructor = ScrollSpy;

    $$b.fn[NAME$a].noConflict = function () {
      $$b.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
      return ScrollSpy.jQueryInterface;
    };
  }

  /*!
   * perfect-scrollbar v1.5.0
   * Copyright 2020 Hyunje Jun, MDBootstrap and Contributors
   * Licensed under MIT
   */

  function get(element) {
    return getComputedStyle(element);
  }

  function set(element, obj) {
    for (var key in obj) {
      var val = obj[key];
      if (typeof val === 'number') {
        val = val + "px";
      }
      element.style[key] = val;
    }
    return element;
  }

  function div(className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
  }

  var elMatches =
    typeof Element !== 'undefined' &&
    (Element.prototype.matches ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector);

  function matches$1(element, query) {
    if (!elMatches) {
      throw new Error('No element matching method supported');
    }

    return elMatches.call(element, query);
  }

  function remove(element) {
    if (element.remove) {
      element.remove();
    } else {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }

  function queryChildren(element, selector) {
    return Array.prototype.filter.call(element.children, function (child) { return matches$1(child, selector); }
    );
  }

  var cls = {
    main: 'ps',
    rtl: 'ps__rtl',
    element: {
      thumb: function (x) { return ("ps__thumb-" + x); },
      rail: function (x) { return ("ps__rail-" + x); },
      consuming: 'ps__child--consume',
    },
    state: {
      focus: 'ps--focus',
      clicking: 'ps--clicking',
      active: function (x) { return ("ps--active-" + x); },
      scrolling: function (x) { return ("ps--scrolling-" + x); },
    },
  };

  /*
   * Helper methods
   */
  var scrollingClassTimeout = { x: null, y: null };

  function addScrollingClass(i, x) {
    var classList = i.element.classList;
    var className = cls.state.scrolling(x);

    if (classList.contains(className)) {
      clearTimeout(scrollingClassTimeout[x]);
    } else {
      classList.add(className);
    }
  }

  function removeScrollingClass(i, x) {
    scrollingClassTimeout[x] = setTimeout(
      function () { return i.isAlive && i.element.classList.remove(cls.state.scrolling(x)); },
      i.settings.scrollingThreshold
    );
  }

  function setScrollingClassInstantly(i, x) {
    addScrollingClass(i, x);
    removeScrollingClass(i, x);
  }

  var EventElement = function EventElement(element) {
    this.element = element;
    this.handlers = {};
  };

  var prototypeAccessors = { isEmpty: { configurable: true } };

  EventElement.prototype.bind = function bind (eventName, handler) {
    if (typeof this.handlers[eventName] === 'undefined') {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
    this.element.addEventListener(eventName, handler, false);
  };

  EventElement.prototype.unbind = function unbind (eventName, target) {
      var this$1 = this;

    this.handlers[eventName] = this.handlers[eventName].filter(function (handler) {
      if (target && handler !== target) {
        return true;
      }
      this$1.element.removeEventListener(eventName, handler, false);
      return false;
    });
  };

  EventElement.prototype.unbindAll = function unbindAll () {
    for (var name in this.handlers) {
      this.unbind(name);
    }
  };

  prototypeAccessors.isEmpty.get = function () {
      var this$1 = this;

    return Object.keys(this.handlers).every(
      function (key) { return this$1.handlers[key].length === 0; }
    );
  };

  Object.defineProperties( EventElement.prototype, prototypeAccessors );

  var EventManager = function EventManager() {
    this.eventElements = [];
  };

  EventManager.prototype.eventElement = function eventElement (element) {
    var ee = this.eventElements.filter(function (ee) { return ee.element === element; })[0];
    if (!ee) {
      ee = new EventElement(element);
      this.eventElements.push(ee);
    }
    return ee;
  };

  EventManager.prototype.bind = function bind (element, eventName, handler) {
    this.eventElement(element).bind(eventName, handler);
  };

  EventManager.prototype.unbind = function unbind (element, eventName, handler) {
    var ee = this.eventElement(element);
    ee.unbind(eventName, handler);

    if (ee.isEmpty) {
      // remove
      this.eventElements.splice(this.eventElements.indexOf(ee), 1);
    }
  };

  EventManager.prototype.unbindAll = function unbindAll () {
    this.eventElements.forEach(function (e) { return e.unbindAll(); });
    this.eventElements = [];
  };

  EventManager.prototype.once = function once (element, eventName, handler) {
    var ee = this.eventElement(element);
    var onceHandler = function (evt) {
      ee.unbind(eventName, onceHandler);
      handler(evt);
    };
    ee.bind(eventName, onceHandler);
  };

  function createEvent(name) {
    if (typeof window.CustomEvent === 'function') {
      return new CustomEvent(name);
    } else {
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(name, false, false, undefined);
      return evt;
    }
  }

  function processScrollDiff(
    i,
    axis,
    diff,
    useScrollingClass,
    forceFireReachEvent
  ) {
    if ( useScrollingClass === void 0 ) useScrollingClass = true;
    if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

    var fields;
    if (axis === 'top') {
      fields = [
        'contentHeight',
        'containerHeight',
        'scrollTop',
        'y',
        'up',
        'down' ];
    } else if (axis === 'left') {
      fields = [
        'contentWidth',
        'containerWidth',
        'scrollLeft',
        'x',
        'left',
        'right' ];
    } else {
      throw new Error('A proper axis should be provided');
    }

    processScrollDiff$1(i, diff, fields, useScrollingClass, forceFireReachEvent);
  }

  function processScrollDiff$1(
    i,
    diff,
    ref,
    useScrollingClass,
    forceFireReachEvent
  ) {
    var contentHeight = ref[0];
    var containerHeight = ref[1];
    var scrollTop = ref[2];
    var y = ref[3];
    var up = ref[4];
    var down = ref[5];
    if ( useScrollingClass === void 0 ) useScrollingClass = true;
    if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

    var element = i.element;

    // reset reach
    i.reach[y] = null;

    // 1 for subpixel rounding
    if (element[scrollTop] < 1) {
      i.reach[y] = 'start';
    }

    // 1 for subpixel rounding
    if (element[scrollTop] > i[contentHeight] - i[containerHeight] - 1) {
      i.reach[y] = 'end';
    }

    if (diff) {
      element.dispatchEvent(createEvent(("ps-scroll-" + y)));

      if (diff < 0) {
        element.dispatchEvent(createEvent(("ps-scroll-" + up)));
      } else if (diff > 0) {
        element.dispatchEvent(createEvent(("ps-scroll-" + down)));
      }

      if (useScrollingClass) {
        setScrollingClassInstantly(i, y);
      }
    }

    if (i.reach[y] && (diff || forceFireReachEvent)) {
      element.dispatchEvent(createEvent(("ps-" + y + "-reach-" + (i.reach[y]))));
    }
  }

  function toInt(x) {
    return parseInt(x, 10) || 0;
  }

  function isEditable(el) {
    return (
      matches$1(el, 'input,[contenteditable]') ||
      matches$1(el, 'select,[contenteditable]') ||
      matches$1(el, 'textarea,[contenteditable]') ||
      matches$1(el, 'button,[contenteditable]')
    );
  }

  function outerWidth(element) {
    var styles = get(element);
    return (
      toInt(styles.width) +
      toInt(styles.paddingLeft) +
      toInt(styles.paddingRight) +
      toInt(styles.borderLeftWidth) +
      toInt(styles.borderRightWidth)
    );
  }

  var env = {
    isWebKit:
      typeof document !== 'undefined' &&
      'WebkitAppearance' in document.documentElement.style,
    supportsTouch:
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        ('maxTouchPoints' in window.navigator &&
          window.navigator.maxTouchPoints > 0) ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
    supportsIePointer:
      typeof navigator !== 'undefined' && navigator.msMaxTouchPoints,
    isChrome:
      typeof navigator !== 'undefined' &&
      /Chrome/i.test(navigator && navigator.userAgent),
  };

  function updateGeometry(i) {
    var element = i.element;
    var roundedScrollTop = Math.floor(element.scrollTop);
    var rect = element.getBoundingClientRect();

    i.containerWidth = Math.ceil(rect.width);
    i.containerHeight = Math.ceil(rect.height);
    i.contentWidth = element.scrollWidth;
    i.contentHeight = element.scrollHeight;

    if (!element.contains(i.scrollbarXRail)) {
      // clean up and append
      queryChildren(element, cls.element.rail('x')).forEach(function (el) { return remove(el); }
      );
      element.appendChild(i.scrollbarXRail);
    }
    if (!element.contains(i.scrollbarYRail)) {
      // clean up and append
      queryChildren(element, cls.element.rail('y')).forEach(function (el) { return remove(el); }
      );
      element.appendChild(i.scrollbarYRail);
    }

    if (
      !i.settings.suppressScrollX &&
      i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth
    ) {
      i.scrollbarXActive = true;
      i.railXWidth = i.containerWidth - i.railXMarginWidth;
      i.railXRatio = i.containerWidth / i.railXWidth;
      i.scrollbarXWidth = getThumbSize(
        i,
        toInt((i.railXWidth * i.containerWidth) / i.contentWidth)
      );
      i.scrollbarXLeft = toInt(
        ((i.negativeScrollAdjustment + element.scrollLeft) *
          (i.railXWidth - i.scrollbarXWidth)) /
          (i.contentWidth - i.containerWidth)
      );
    } else {
      i.scrollbarXActive = false;
    }

    if (
      !i.settings.suppressScrollY &&
      i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight
    ) {
      i.scrollbarYActive = true;
      i.railYHeight = i.containerHeight - i.railYMarginHeight;
      i.railYRatio = i.containerHeight / i.railYHeight;
      i.scrollbarYHeight = getThumbSize(
        i,
        toInt((i.railYHeight * i.containerHeight) / i.contentHeight)
      );
      i.scrollbarYTop = toInt(
        (roundedScrollTop * (i.railYHeight - i.scrollbarYHeight)) /
          (i.contentHeight - i.containerHeight)
      );
    } else {
      i.scrollbarYActive = false;
    }

    if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
      i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
    }
    if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
      i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
    }

    updateCss(element, i);

    if (i.scrollbarXActive) {
      element.classList.add(cls.state.active('x'));
    } else {
      element.classList.remove(cls.state.active('x'));
      i.scrollbarXWidth = 0;
      i.scrollbarXLeft = 0;
      element.scrollLeft = i.isRtl === true ? i.contentWidth : 0;
    }
    if (i.scrollbarYActive) {
      element.classList.add(cls.state.active('y'));
    } else {
      element.classList.remove(cls.state.active('y'));
      i.scrollbarYHeight = 0;
      i.scrollbarYTop = 0;
      element.scrollTop = 0;
    }
  }

  function getThumbSize(i, thumbSize) {
    if (i.settings.minScrollbarLength) {
      thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
    }
    if (i.settings.maxScrollbarLength) {
      thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
    }
    return thumbSize;
  }

  function updateCss(element, i) {
    var xRailOffset = { width: i.railXWidth };
    var roundedScrollTop = Math.floor(element.scrollTop);

    if (i.isRtl) {
      xRailOffset.left =
        i.negativeScrollAdjustment +
        element.scrollLeft +
        i.containerWidth -
        i.contentWidth;
    } else {
      xRailOffset.left = element.scrollLeft;
    }
    if (i.isScrollbarXUsingBottom) {
      xRailOffset.bottom = i.scrollbarXBottom - roundedScrollTop;
    } else {
      xRailOffset.top = i.scrollbarXTop + roundedScrollTop;
    }
    set(i.scrollbarXRail, xRailOffset);

    var yRailOffset = { top: roundedScrollTop, height: i.railYHeight };
    if (i.isScrollbarYUsingRight) {
      if (i.isRtl) {
        yRailOffset.right =
          i.contentWidth -
          (i.negativeScrollAdjustment + element.scrollLeft) -
          i.scrollbarYRight -
          i.scrollbarYOuterWidth -
          9;
      } else {
        yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
      }
    } else {
      if (i.isRtl) {
        yRailOffset.left =
          i.negativeScrollAdjustment +
          element.scrollLeft +
          i.containerWidth * 2 -
          i.contentWidth -
          i.scrollbarYLeft -
          i.scrollbarYOuterWidth;
      } else {
        yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
      }
    }
    set(i.scrollbarYRail, yRailOffset);

    set(i.scrollbarX, {
      left: i.scrollbarXLeft,
      width: i.scrollbarXWidth - i.railBorderXWidth,
    });
    set(i.scrollbarY, {
      top: i.scrollbarYTop,
      height: i.scrollbarYHeight - i.railBorderYWidth,
    });
  }

  function clickRail(i) {
    var element = i.element;

    i.event.bind(i.scrollbarY, 'mousedown', function (e) { return e.stopPropagation(); });
    i.event.bind(i.scrollbarYRail, 'mousedown', function (e) {
      var positionTop =
        e.pageY -
        window.pageYOffset -
        i.scrollbarYRail.getBoundingClientRect().top;
      var direction = positionTop > i.scrollbarYTop ? 1 : -1;

      i.element.scrollTop += direction * i.containerHeight;
      updateGeometry(i);

      e.stopPropagation();
    });

    i.event.bind(i.scrollbarX, 'mousedown', function (e) { return e.stopPropagation(); });
    i.event.bind(i.scrollbarXRail, 'mousedown', function (e) {
      var positionLeft =
        e.pageX -
        window.pageXOffset -
        i.scrollbarXRail.getBoundingClientRect().left;
      var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

      i.element.scrollLeft += direction * i.containerWidth;
      updateGeometry(i);

      e.stopPropagation();
    });
  }

  function dragThumb(i) {
    bindMouseScrollHandler(i, [
      'containerWidth',
      'contentWidth',
      'pageX',
      'railXWidth',
      'scrollbarX',
      'scrollbarXWidth',
      'scrollLeft',
      'x',
      'scrollbarXRail' ]);
    bindMouseScrollHandler(i, [
      'containerHeight',
      'contentHeight',
      'pageY',
      'railYHeight',
      'scrollbarY',
      'scrollbarYHeight',
      'scrollTop',
      'y',
      'scrollbarYRail' ]);
  }

  function bindMouseScrollHandler(
    i,
    ref
  ) {
    var containerHeight = ref[0];
    var contentHeight = ref[1];
    var pageY = ref[2];
    var railYHeight = ref[3];
    var scrollbarY = ref[4];
    var scrollbarYHeight = ref[5];
    var scrollTop = ref[6];
    var y = ref[7];
    var scrollbarYRail = ref[8];

    var element = i.element;

    var startingScrollTop = null;
    var startingMousePageY = null;
    var scrollBy = null;

    function mouseMoveHandler(e) {
      if (e.touches && e.touches[0]) {
        e[pageY] = e.touches[0].pageY;
      }
      element[scrollTop] =
        startingScrollTop + scrollBy * (e[pageY] - startingMousePageY);
      addScrollingClass(i, y);
      updateGeometry(i);

      e.stopPropagation();
      e.preventDefault();
    }

    function mouseUpHandler() {
      removeScrollingClass(i, y);
      i[scrollbarYRail].classList.remove(cls.state.clicking);
      i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    }

    function bindMoves(e, touchMode) {
      startingScrollTop = element[scrollTop];
      if (touchMode && e.touches) {
        e[pageY] = e.touches[0].pageY;
      }
      startingMousePageY = e[pageY];
      scrollBy =
        (i[contentHeight] - i[containerHeight]) /
        (i[railYHeight] - i[scrollbarYHeight]);
      if (!touchMode) {
        i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
        i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);
        e.preventDefault();
      } else {
        i.event.bind(i.ownerDocument, 'touchmove', mouseMoveHandler);
      }

      i[scrollbarYRail].classList.add(cls.state.clicking);

      e.stopPropagation();
    }

    i.event.bind(i[scrollbarY], 'mousedown', function (e) {
      bindMoves(e);
    });
    i.event.bind(i[scrollbarY], 'touchstart', function (e) {
      bindMoves(e, true);
    });
  }

  function keyboard(i) {
    var element = i.element;

    var elementHovered = function () { return matches$1(element, ':hover'); };
    var scrollbarFocused = function () { return matches$1(i.scrollbarX, ':focus') || matches$1(i.scrollbarY, ':focus'); };

    function shouldPreventDefault(deltaX, deltaY) {
      var scrollTop = Math.floor(element.scrollTop);
      if (deltaX === 0) {
        if (!i.scrollbarYActive) {
          return false;
        }
        if (
          (scrollTop === 0 && deltaY > 0) ||
          (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)
        ) {
          return !i.settings.wheelPropagation;
        }
      }

      var scrollLeft = element.scrollLeft;
      if (deltaY === 0) {
        if (!i.scrollbarXActive) {
          return false;
        }
        if (
          (scrollLeft === 0 && deltaX < 0) ||
          (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)
        ) {
          return !i.settings.wheelPropagation;
        }
      }
      return true;
    }

    i.event.bind(i.ownerDocument, 'keydown', function (e) {
      if (
        (e.isDefaultPrevented && e.isDefaultPrevented()) ||
        e.defaultPrevented
      ) {
        return;
      }

      if (!elementHovered() && !scrollbarFocused()) {
        return;
      }

      var activeElement = document.activeElement
        ? document.activeElement
        : i.ownerDocument.activeElement;
      if (activeElement) {
        if (activeElement.tagName === 'IFRAME') {
          activeElement = activeElement.contentDocument.activeElement;
        } else {
          // go deeper if element is a webcomponent
          while (activeElement.shadowRoot) {
            activeElement = activeElement.shadowRoot.activeElement;
          }
        }
        if (isEditable(activeElement)) {
          return;
        }
      }

      var deltaX = 0;
      var deltaY = 0;

      switch (e.which) {
        case 37: // left
          if (e.metaKey) {
            deltaX = -i.contentWidth;
          } else if (e.altKey) {
            deltaX = -i.containerWidth;
          } else {
            deltaX = -30;
          }
          break;
        case 38: // up
          if (e.metaKey) {
            deltaY = i.contentHeight;
          } else if (e.altKey) {
            deltaY = i.containerHeight;
          } else {
            deltaY = 30;
          }
          break;
        case 39: // right
          if (e.metaKey) {
            deltaX = i.contentWidth;
          } else if (e.altKey) {
            deltaX = i.containerWidth;
          } else {
            deltaX = 30;
          }
          break;
        case 40: // down
          if (e.metaKey) {
            deltaY = -i.contentHeight;
          } else if (e.altKey) {
            deltaY = -i.containerHeight;
          } else {
            deltaY = -30;
          }
          break;
        case 32: // space bar
          if (e.shiftKey) {
            deltaY = i.containerHeight;
          } else {
            deltaY = -i.containerHeight;
          }
          break;
        case 33: // page up
          deltaY = i.containerHeight;
          break;
        case 34: // page down
          deltaY = -i.containerHeight;
          break;
        case 36: // home
          deltaY = i.contentHeight;
          break;
        case 35: // end
          deltaY = -i.contentHeight;
          break;
        default:
          return;
      }

      if (i.settings.suppressScrollX && deltaX !== 0) {
        return;
      }
      if (i.settings.suppressScrollY && deltaY !== 0) {
        return;
      }

      element.scrollTop -= deltaY;
      element.scrollLeft += deltaX;
      updateGeometry(i);

      if (shouldPreventDefault(deltaX, deltaY)) {
        e.preventDefault();
      }
    });
  }

  function wheel(i) {
    var element = i.element;

    function shouldPreventDefault(deltaX, deltaY) {
      var roundedScrollTop = Math.floor(element.scrollTop);
      var isTop = element.scrollTop === 0;
      var isBottom =
        roundedScrollTop + element.offsetHeight === element.scrollHeight;
      var isLeft = element.scrollLeft === 0;
      var isRight =
        element.scrollLeft + element.offsetWidth === element.scrollWidth;

      var hitsBound;

      // pick axis with primary direction
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        hitsBound = isTop || isBottom;
      } else {
        hitsBound = isLeft || isRight;
      }

      return hitsBound ? !i.settings.wheelPropagation : true;
    }

    function getDeltaFromEvent(e) {
      var deltaX = e.deltaX;
      var deltaY = -1 * e.deltaY;

      if (typeof deltaX === 'undefined' || typeof deltaY === 'undefined') {
        // OS X Safari
        deltaX = (-1 * e.wheelDeltaX) / 6;
        deltaY = e.wheelDeltaY / 6;
      }

      if (e.deltaMode && e.deltaMode === 1) {
        // Firefox in deltaMode 1: Line scrolling
        deltaX *= 10;
        deltaY *= 10;
      }

      if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */) {
        // IE in some mouse drivers
        deltaX = 0;
        deltaY = e.wheelDelta;
      }

      if (e.shiftKey) {
        // reverse axis with shift key
        return [-deltaY, -deltaX];
      }
      return [deltaX, deltaY];
    }

    function shouldBeConsumedByChild(target, deltaX, deltaY) {
      // FIXME: this is a workaround for <select> issue in FF and IE #571
      if (!env.isWebKit && element.querySelector('select:focus')) {
        return true;
      }

      if (!element.contains(target)) {
        return false;
      }

      var cursor = target;

      while (cursor && cursor !== element) {
        if (cursor.classList.contains(cls.element.consuming)) {
          return true;
        }

        var style = get(cursor);

        // if deltaY && vertical scrollable
        if (deltaY && style.overflowY.match(/(scroll|auto)/)) {
          var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
          if (maxScrollTop > 0) {
            if (
              (cursor.scrollTop > 0 && deltaY < 0) ||
              (cursor.scrollTop < maxScrollTop && deltaY > 0)
            ) {
              return true;
            }
          }
        }
        // if deltaX && horizontal scrollable
        if (deltaX && style.overflowX.match(/(scroll|auto)/)) {
          var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
          if (maxScrollLeft > 0) {
            if (
              (cursor.scrollLeft > 0 && deltaX < 0) ||
              (cursor.scrollLeft < maxScrollLeft && deltaX > 0)
            ) {
              return true;
            }
          }
        }

        cursor = cursor.parentNode;
      }

      return false;
    }

    function mousewheelHandler(e) {
      var ref = getDeltaFromEvent(e);
      var deltaX = ref[0];
      var deltaY = ref[1];

      if (shouldBeConsumedByChild(e.target, deltaX, deltaY)) {
        return;
      }

      var shouldPrevent = false;
      if (!i.settings.useBothWheelAxes) {
        // deltaX will only be used for horizontal scrolling and deltaY will
        // only be used for vertical scrolling - this is the default
        element.scrollTop -= deltaY * i.settings.wheelSpeed;
        element.scrollLeft += deltaX * i.settings.wheelSpeed;
      } else if (i.scrollbarYActive && !i.scrollbarXActive) {
        // only vertical scrollbar is active and useBothWheelAxes option is
        // active, so let's scroll vertical bar using both mouse wheel axes
        if (deltaY) {
          element.scrollTop -= deltaY * i.settings.wheelSpeed;
        } else {
          element.scrollTop += deltaX * i.settings.wheelSpeed;
        }
        shouldPrevent = true;
      } else if (i.scrollbarXActive && !i.scrollbarYActive) {
        // useBothWheelAxes and only horizontal bar is active, so use both
        // wheel axes for horizontal bar
        if (deltaX) {
          element.scrollLeft += deltaX * i.settings.wheelSpeed;
        } else {
          element.scrollLeft -= deltaY * i.settings.wheelSpeed;
        }
        shouldPrevent = true;
      }

      updateGeometry(i);

      shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);
      if (shouldPrevent && !e.ctrlKey) {
        e.stopPropagation();
        e.preventDefault();
      }
    }

    if (typeof window.onwheel !== 'undefined') {
      i.event.bind(element, 'wheel', mousewheelHandler);
    } else if (typeof window.onmousewheel !== 'undefined') {
      i.event.bind(element, 'mousewheel', mousewheelHandler);
    }
  }

  function touch(i) {
    if (!env.supportsTouch && !env.supportsIePointer) {
      return;
    }

    var element = i.element;

    function shouldPrevent(deltaX, deltaY) {
      var scrollTop = Math.floor(element.scrollTop);
      var scrollLeft = element.scrollLeft;
      var magnitudeX = Math.abs(deltaX);
      var magnitudeY = Math.abs(deltaY);

      if (magnitudeY > magnitudeX) {
        // user is perhaps trying to swipe up/down the page

        if (
          (deltaY < 0 && scrollTop === i.contentHeight - i.containerHeight) ||
          (deltaY > 0 && scrollTop === 0)
        ) {
          // set prevent for mobile Chrome refresh
          return window.scrollY === 0 && deltaY > 0 && env.isChrome;
        }
      } else if (magnitudeX > magnitudeY) {
        // user is perhaps trying to swipe left/right across the page

        if (
          (deltaX < 0 && scrollLeft === i.contentWidth - i.containerWidth) ||
          (deltaX > 0 && scrollLeft === 0)
        ) {
          return true;
        }
      }

      return true;
    }

    function applyTouchMove(differenceX, differenceY) {
      element.scrollTop -= differenceY;
      element.scrollLeft -= differenceX;

      updateGeometry(i);
    }

    var startOffset = {};
    var startTime = 0;
    var speed = {};
    var easingLoop = null;

    function getTouch(e) {
      if (e.targetTouches) {
        return e.targetTouches[0];
      } else {
        // Maybe IE pointer
        return e;
      }
    }

    function shouldHandle(e) {
      if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) {
        return false;
      }
      if (e.targetTouches && e.targetTouches.length === 1) {
        return true;
      }
      if (
        e.pointerType &&
        e.pointerType !== 'mouse' &&
        e.pointerType !== e.MSPOINTER_TYPE_MOUSE
      ) {
        return true;
      }
      return false;
    }

    function touchStart(e) {
      if (!shouldHandle(e)) {
        return;
      }

      var touch = getTouch(e);

      startOffset.pageX = touch.pageX;
      startOffset.pageY = touch.pageY;

      startTime = new Date().getTime();

      if (easingLoop !== null) {
        clearInterval(easingLoop);
      }
    }

    function shouldBeConsumedByChild(target, deltaX, deltaY) {
      if (!element.contains(target)) {
        return false;
      }

      var cursor = target;

      while (cursor && cursor !== element) {
        if (cursor.classList.contains(cls.element.consuming)) {
          return true;
        }

        var style = get(cursor);

        // if deltaY && vertical scrollable
        if (deltaY && style.overflowY.match(/(scroll|auto)/)) {
          var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
          if (maxScrollTop > 0) {
            if (
              (cursor.scrollTop > 0 && deltaY < 0) ||
              (cursor.scrollTop < maxScrollTop && deltaY > 0)
            ) {
              return true;
            }
          }
        }
        // if deltaX && horizontal scrollable
        if (deltaX && style.overflowX.match(/(scroll|auto)/)) {
          var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
          if (maxScrollLeft > 0) {
            if (
              (cursor.scrollLeft > 0 && deltaX < 0) ||
              (cursor.scrollLeft < maxScrollLeft && deltaX > 0)
            ) {
              return true;
            }
          }
        }

        cursor = cursor.parentNode;
      }

      return false;
    }

    function touchMove(e) {
      if (shouldHandle(e)) {
        var touch = getTouch(e);

        var currentOffset = { pageX: touch.pageX, pageY: touch.pageY };

        var differenceX = currentOffset.pageX - startOffset.pageX;
        var differenceY = currentOffset.pageY - startOffset.pageY;

        if (shouldBeConsumedByChild(e.target, differenceX, differenceY)) {
          return;
        }

        applyTouchMove(differenceX, differenceY);
        startOffset = currentOffset;

        var currentTime = new Date().getTime();

        var timeGap = currentTime - startTime;
        if (timeGap > 0) {
          speed.x = differenceX / timeGap;
          speed.y = differenceY / timeGap;
          startTime = currentTime;
        }

        if (shouldPrevent(differenceX, differenceY)) {
          e.preventDefault();
        }
      }
    }
    function touchEnd() {
      if (i.settings.swipeEasing) {
        clearInterval(easingLoop);
        easingLoop = setInterval(function() {
          if (i.isInitialized) {
            clearInterval(easingLoop);
            return;
          }

          if (!speed.x && !speed.y) {
            clearInterval(easingLoop);
            return;
          }

          if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
            clearInterval(easingLoop);
            return;
          }

          applyTouchMove(speed.x * 30, speed.y * 30);

          speed.x *= 0.8;
          speed.y *= 0.8;
        }, 10);
      }
    }

    if (env.supportsTouch) {
      i.event.bind(element, 'touchstart', touchStart);
      i.event.bind(element, 'touchmove', touchMove);
      i.event.bind(element, 'touchend', touchEnd);
    } else if (env.supportsIePointer) {
      if (window.PointerEvent) {
        i.event.bind(element, 'pointerdown', touchStart);
        i.event.bind(element, 'pointermove', touchMove);
        i.event.bind(element, 'pointerup', touchEnd);
      } else if (window.MSPointerEvent) {
        i.event.bind(element, 'MSPointerDown', touchStart);
        i.event.bind(element, 'MSPointerMove', touchMove);
        i.event.bind(element, 'MSPointerUp', touchEnd);
      }
    }
  }

  var defaultSettings = function () { return ({
    handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
    maxScrollbarLength: null,
    minScrollbarLength: null,
    scrollingThreshold: 1000,
    scrollXMarginOffset: 0,
    scrollYMarginOffset: 0,
    suppressScrollX: false,
    suppressScrollY: false,
    swipeEasing: true,
    useBothWheelAxes: false,
    wheelPropagation: true,
    wheelSpeed: 1,
  }); };

  var handlers = {
    'click-rail': clickRail,
    'drag-thumb': dragThumb,
    keyboard: keyboard,
    wheel: wheel,
    touch: touch,
  };

  var PerfectScrollbar = function PerfectScrollbar(element, userSettings) {
    var this$1 = this;
    if ( userSettings === void 0 ) userSettings = {};

    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    if (!element || !element.nodeName) {
      throw new Error('no element is specified to initialize PerfectScrollbar');
    }

    this.element = element;

    element.classList.add(cls.main);

    this.settings = defaultSettings();
    for (var key in userSettings) {
      this.settings[key] = userSettings[key];
    }

    this.containerWidth = null;
    this.containerHeight = null;
    this.contentWidth = null;
    this.contentHeight = null;

    var focus = function () { return element.classList.add(cls.state.focus); };
    var blur = function () { return element.classList.remove(cls.state.focus); };

    this.isRtl = get(element).direction === 'rtl';
    if (this.isRtl === true) {
      element.classList.add(cls.rtl);
    }
    this.isNegativeScroll = (function () {
      var originalScrollLeft = element.scrollLeft;
      var result = null;
      element.scrollLeft = -1;
      result = element.scrollLeft < 0;
      element.scrollLeft = originalScrollLeft;
      return result;
    })();
    this.negativeScrollAdjustment = this.isNegativeScroll
      ? element.scrollWidth - element.clientWidth
      : 0;
    this.event = new EventManager();
    this.ownerDocument = element.ownerDocument || document;

    this.scrollbarXRail = div(cls.element.rail('x'));
    element.appendChild(this.scrollbarXRail);
    this.scrollbarX = div(cls.element.thumb('x'));
    this.scrollbarXRail.appendChild(this.scrollbarX);
    this.scrollbarX.setAttribute('tabindex', 0);
    this.event.bind(this.scrollbarX, 'focus', focus);
    this.event.bind(this.scrollbarX, 'blur', blur);
    this.scrollbarXActive = null;
    this.scrollbarXWidth = null;
    this.scrollbarXLeft = null;
    var railXStyle = get(this.scrollbarXRail);
    this.scrollbarXBottom = parseInt(railXStyle.bottom, 10);
    if (isNaN(this.scrollbarXBottom)) {
      this.isScrollbarXUsingBottom = false;
      this.scrollbarXTop = toInt(railXStyle.top);
    } else {
      this.isScrollbarXUsingBottom = true;
    }
    this.railBorderXWidth =
      toInt(railXStyle.borderLeftWidth) + toInt(railXStyle.borderRightWidth);
    // Set rail to display:block to calculate margins
    set(this.scrollbarXRail, { display: 'block' });
    this.railXMarginWidth =
      toInt(railXStyle.marginLeft) + toInt(railXStyle.marginRight);
    set(this.scrollbarXRail, { display: '' });
    this.railXWidth = null;
    this.railXRatio = null;

    this.scrollbarYRail = div(cls.element.rail('y'));
    element.appendChild(this.scrollbarYRail);
    this.scrollbarY = div(cls.element.thumb('y'));
    this.scrollbarYRail.appendChild(this.scrollbarY);
    this.scrollbarY.setAttribute('tabindex', 0);
    this.event.bind(this.scrollbarY, 'focus', focus);
    this.event.bind(this.scrollbarY, 'blur', blur);
    this.scrollbarYActive = null;
    this.scrollbarYHeight = null;
    this.scrollbarYTop = null;
    var railYStyle = get(this.scrollbarYRail);
    this.scrollbarYRight = parseInt(railYStyle.right, 10);
    if (isNaN(this.scrollbarYRight)) {
      this.isScrollbarYUsingRight = false;
      this.scrollbarYLeft = toInt(railYStyle.left);
    } else {
      this.isScrollbarYUsingRight = true;
    }
    this.scrollbarYOuterWidth = this.isRtl ? outerWidth(this.scrollbarY) : null;
    this.railBorderYWidth =
      toInt(railYStyle.borderTopWidth) + toInt(railYStyle.borderBottomWidth);
    set(this.scrollbarYRail, { display: 'block' });
    this.railYMarginHeight =
      toInt(railYStyle.marginTop) + toInt(railYStyle.marginBottom);
    set(this.scrollbarYRail, { display: '' });
    this.railYHeight = null;
    this.railYRatio = null;

    this.reach = {
      x:
        element.scrollLeft <= 0
          ? 'start'
          : element.scrollLeft >= this.contentWidth - this.containerWidth
          ? 'end'
          : null,
      y:
        element.scrollTop <= 0
          ? 'start'
          : element.scrollTop >= this.contentHeight - this.containerHeight
          ? 'end'
          : null,
    };

    this.isAlive = true;

    this.settings.handlers.forEach(function (handlerName) { return handlers[handlerName](this$1); });

    this.lastScrollTop = Math.floor(element.scrollTop); // for onScroll only
    this.lastScrollLeft = element.scrollLeft; // for onScroll only
    this.event.bind(this.element, 'scroll', function (e) { return this$1.onScroll(e); });
    updateGeometry(this);
  };

  PerfectScrollbar.prototype.update = function update () {
    if (!this.isAlive) {
      return;
    }

    // Recalcuate negative scrollLeft adjustment
    this.negativeScrollAdjustment = this.isNegativeScroll
      ? this.element.scrollWidth - this.element.clientWidth
      : 0;

    // Recalculate rail margins
    set(this.scrollbarXRail, { display: 'block' });
    set(this.scrollbarYRail, { display: 'block' });
    this.railXMarginWidth =
      toInt(get(this.scrollbarXRail).marginLeft) +
      toInt(get(this.scrollbarXRail).marginRight);
    this.railYMarginHeight =
      toInt(get(this.scrollbarYRail).marginTop) +
      toInt(get(this.scrollbarYRail).marginBottom);

    // Hide scrollbars not to affect scrollWidth and scrollHeight
    set(this.scrollbarXRail, { display: 'none' });
    set(this.scrollbarYRail, { display: 'none' });

    updateGeometry(this);

    processScrollDiff(this, 'top', 0, false, true);
    processScrollDiff(this, 'left', 0, false, true);

    set(this.scrollbarXRail, { display: '' });
    set(this.scrollbarYRail, { display: '' });
  };

  PerfectScrollbar.prototype.onScroll = function onScroll (e) {
    if (!this.isAlive) {
      return;
    }

    updateGeometry(this);
    processScrollDiff(this, 'top', this.element.scrollTop - this.lastScrollTop);
    processScrollDiff(
      this,
      'left',
      this.element.scrollLeft - this.lastScrollLeft
    );

    this.lastScrollTop = Math.floor(this.element.scrollTop);
    this.lastScrollLeft = this.element.scrollLeft;
  };

  PerfectScrollbar.prototype.destroy = function destroy () {
    if (!this.isAlive) {
      return;
    }

    this.event.unbindAll();
    remove(this.scrollbarX);
    remove(this.scrollbarY);
    remove(this.scrollbarXRail);
    remove(this.scrollbarYRail);
    this.removePsClasses();

    // unset elements
    this.element = null;
    this.scrollbarX = null;
    this.scrollbarY = null;
    this.scrollbarXRail = null;
    this.scrollbarYRail = null;

    this.isAlive = false;
  };

  PerfectScrollbar.prototype.removePsClasses = function removePsClasses () {
    this.element.className = this.element.className
      .split(' ')
      .filter(function (name) { return !name.match(/^ps([-_].+|)$/); })
      .join(' ');
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$b = 'sidebar';
  var VERSION$b = '3.0.0-rc.4';
  var DATA_KEY$b = 'coreui.sidebar';
  var EVENT_KEY$b = "." + DATA_KEY$b;
  var DATA_API_KEY$9 = '.data-api';
  var Default$9 = {
    breakpoints: {
      xs: 'c-sidebar-show',
      sm: 'c-sidebar-sm-show',
      md: 'c-sidebar-md-show',
      lg: 'c-sidebar-lg-show',
      xl: 'c-sidebar-xl-show'
    },
    dropdownAccordion: true
  };
  var DefaultType$7 = {
    breakpoints: 'object',
    dropdownAccordion: '(string|boolean)'
  };
  var ClassName$b = {
    ACTIVE: 'c-active',
    BACKDROP: 'c-sidebar-backdrop',
    FADE: 'c-fade',
    NAV_DROPDOWN: 'c-sidebar-nav-dropdown',
    NAV_DROPDOWN_TOGGLE: 'c-sidebar-nav-dropdown-toggle',
    SHOW: 'c-show',
    SIDEBAR_MINIMIZED: 'c-sidebar-minimized',
    SIDEBAR_OVERLAID: 'c-sidebar-overlaid',
    SIDEBAR_SHOW: 'c-sidebar-show',
    SIDEBAR_UNFOLDABLE: 'c-sidebar-unfoldable'
  };
  var Event$c = {
    CLASS_TOGGLE: 'classtoggle',
    CLICK_DATA_API: "click" + EVENT_KEY$b + DATA_API_KEY$9,
    CLOSE: "close" + EVENT_KEY$b,
    CLOSED: "closed" + EVENT_KEY$b,
    LOAD_DATA_API: "load" + EVENT_KEY$b + DATA_API_KEY$9,
    OPEN: "open" + EVENT_KEY$b,
    OPENED: "opened" + EVENT_KEY$b
  };
  var Selector$b = {
    NAV_DROPDOWN_TOGGLE: '.c-sidebar-nav-dropdown-toggle',
    NAV_DROPDOWN: '.c-sidebar-nav-dropdown',
    NAV_LINK: '.c-sidebar-nav-link',
    NAVIGATION_CONTAINER: '.c-sidebar-nav',
    NAVIGATION_DROPDOWN_ITEMS: '.c-sidebar-nav-dropdown-items',
    SIDEBAR: '.c-sidebar'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Sidebar =
  /*#__PURE__*/
  function () {
    function Sidebar(element, config) {
      if (typeof PerfectScrollbar === 'undefined') {
        throw new TypeError('CoreUI\'s sidebar require Perfect Scrollbar');
      }

      this._element = element;
      this._config = this._getConfig(config);
      this._open = this._isVisible();
      this._mobile = this._isMobile();
      this._overlaid = this._isOverlaid();
      this._minimize = this._isMinimized();
      this._unfoldable = this._isUnfoldable();

      this._setActiveLink();

      this._ps = null;
      this._backdrop = null;

      this._psInit();

      this._addEventListeners();

      Data.setData(element, DATA_KEY$b, this);
    } // Getters


    var _proto = Sidebar.prototype;

    // Public
    _proto.open = function open(breakpoint) {
      var _this = this;

      EventHandler.trigger(this._element, Event$c.OPEN);

      if (this._isMobile()) {
        this._addClassName(this._firstBreakpointClassName());

        this._showBackdrop();

        EventHandler.one(this._element, TRANSITION_END, function () {
          _this._addClickOutListener();
        });
      } else if (breakpoint) {
        this._addClassName(this._getBreakpointClassName(breakpoint));
      } else {
        this._addClassName(this._firstBreakpointClassName());
      }

      var complete = function complete() {
        if (_this._isVisible() === true) {
          _this._open = true;
          EventHandler.trigger(_this._element, Event$c.OPENED);
        }
      };

      EventHandler.one(this._element, TRANSITION_END, complete);
    };

    _proto.close = function close(breakpoint) {
      var _this2 = this;

      EventHandler.trigger(this._element, Event$c.CLOSE);

      if (this._isMobile()) {
        this._element.classList.remove(this._firstBreakpointClassName());

        this._removeBackdrop();

        this._removeClickOutListener();
      } else if (breakpoint) {
        this._element.classList.remove(this._getBreakpointClassName(breakpoint));
      } else {
        this._element.classList.remove(this._firstBreakpointClassName());
      }

      var complete = function complete() {
        if (_this2._isVisible() === false) {
          _this2._open = false;
          EventHandler.trigger(_this2._element, Event$c.CLOSED);
        }
      };

      EventHandler.one(this._element, TRANSITION_END, complete);
    };

    _proto.toggle = function toggle(breakpoint) {
      if (this._open) {
        this.close(breakpoint);
      } else {
        this.open(breakpoint);
      }
    };

    _proto.minimize = function minimize() {
      if (!this._isMobile()) {
        this._addClassName(ClassName$b.SIDEBAR_MINIMIZED);

        this._minimize = true;

        this._psDestroy();
      }
    };

    _proto.unfoldable = function unfoldable() {
      if (!this._isMobile()) {
        this._addClassName(ClassName$b.SIDEBAR_UNFOLDABLE);

        this._unfoldable = true;
      }
    };

    _proto.reset = function reset() {
      if (this._element.classList.contains(ClassName$b.SIDEBAR_MINIMIZED)) {
        this._element.classList.remove(ClassName$b.SIDEBAR_MINIMIZED);

        this._minimize = false;
        EventHandler.one(this._element, TRANSITION_END, this._psInit());
      }

      if (this._element.classList.contains(ClassName$b.SIDEBAR_UNFOLDABLE)) {
        this._element.classList.remove(ClassName$b.SIDEBAR_UNFOLDABLE);

        this._unfoldable = false;
      }
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, this.constructor.Default, {}, Manipulator.getDataAttributes(this._element), {}, config);
      typeCheckConfig(NAME$b, config, this.constructor.DefaultType);
      return config;
    };

    _proto._isMobile = function _isMobile() {
      return Boolean(window.getComputedStyle(this._element, null).getPropertyValue('--is-mobile'));
    };

    _proto._isMinimized = function _isMinimized() {
      return this._element.classList.contains(ClassName$b.SIDEBAR_MINIMIZED);
    };

    _proto._isOverlaid = function _isOverlaid() {
      return this._element.classList.contains(ClassName$b.SIDEBAR_OVERLAID);
    };

    _proto._isUnfoldable = function _isUnfoldable() {
      return this._element.classList.contains(ClassName$b.SIDEBAR_UNFOLDABLE);
    };

    _proto._isVisible = function _isVisible() {
      var rect = this._element.getBoundingClientRect();

      return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      /* or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      /* or $(window).width() */
      ;
    };

    _proto._addClassName = function _addClassName(className) {
      this._element.classList.add(className);
    };

    _proto._firstBreakpointClassName = function _firstBreakpointClassName() {
      return Object.keys(Default$9.breakpoints).map(function (key) {
        return Default$9.breakpoints[key];
      })[0];
    };

    _proto._getBreakpointClassName = function _getBreakpointClassName(breakpoint) {
      return Default$9.breakpoints[breakpoint];
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        this._backdrop.parentNode.removeChild(this._backdrop);

        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop() {
      if (!this._backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName$b.BACKDROP;

        this._backdrop.classList.add(ClassName$b.FADE);

        document.body.appendChild(this._backdrop);
        reflow(this._backdrop);

        this._backdrop.classList.add(ClassName$b.SHOW);
      }
    };

    _proto._clickOutListener = function _clickOutListener(event, sidebar) {
      if (event.target.closest(Selector$b.SIDEBAR) === null) {
        // or use:
        event.preventDefault();
        event.stopPropagation();
        sidebar.close();
      }
    };

    _proto._addClickOutListener = function _addClickOutListener() {
      var _this3 = this;

      EventHandler.on(document, Event$c.CLICK_DATA_API, function (event) {
        _this3._clickOutListener(event, _this3);
      });
    };

    _proto._removeClickOutListener = function _removeClickOutListener() {
      EventHandler.off(document, Event$c.CLICK_DATA_API);
    } // Sidebar navigation
    ;

    _proto._getAllSiblings = function _getAllSiblings(element, filter) {
      var siblings = [];
      element = element.parentNode.firstChild;

      do {
        if (element.nodeType === 3) {
          continue; // text node
        }

        if (!filter || filter(element)) {
          siblings.push(element);
        } // eslint-disable-next-line no-cond-assign

      } while (element = element.nextSibling);

      return siblings;
    };

    _proto._toggleDropdown = function _toggleDropdown(event, sidebar) {
      var toggler = event.target;

      if (!toggler.classList.contains(ClassName$b.NAV_DROPDOWN_TOGGLE)) {
        toggler = toggler.closest(Selector$b.NAV_DROPDOWN_TOGGLE);
      }

      var dataAttributes = toggler.closest(Selector$b.NAVIGATION_CONTAINER).dataset;

      if (typeof dataAttributes.dropdownAccordion !== 'undefined') {
        Default$9.dropdownAccordion = JSON.parse(dataAttributes.dropdownAccordion);
      } // TODO: find better solution


      if (Default$9.dropdownAccordion === true) {
        this._getAllSiblings(toggler.parentElement).forEach(function (element) {
          if (element !== toggler.parentNode) {
            if (element.classList.contains(ClassName$b.NAV_DROPDOWN)) {
              element.classList.remove(ClassName$b.SHOW);
            }
          }
        });
      }

      toggler.parentNode.classList.toggle(ClassName$b.SHOW); // TODO: Set the toggler's position near to cursor after the click.
      // TODO: add transition end

      sidebar._psUpdate();
    } // PerfectScrollbar
    ;

    _proto._psInit = function _psInit() {
      if (this._element.querySelector(Selector$b.NAVIGATION_CONTAINER)) {
        this._ps = new PerfectScrollbar(this._element.querySelector(Selector$b.NAVIGATION_CONTAINER), {
          suppressScrollX: true
        });
      }
    };

    _proto._psUpdate = function _psUpdate() {
      if (this._ps) {
        this._ps.update();
      }
    };

    _proto._psDestroy = function _psDestroy() {
      if (this._ps) {
        this._ps.destroy();

        this._ps = null;
      }
    };

    _proto._getParents = function _getParents(element, selector) {
      // Setup parents array
      var parents = []; // Get matching parent elements

      for (; element && element !== document; element = element.parentNode) {
        // Add matching parents to array
        if (selector) {
          if (element.matches(selector)) {
            parents.push(element);
          }
        } else {
          parents.push(element);
        }
      }

      return parents;
    };

    _proto._setActiveLink = function _setActiveLink() {
      var _this4 = this;

      // eslint-disable-next-line unicorn/prefer-spread
      Array.from(this._element.querySelectorAll(Selector$b.NAV_LINK)).forEach(function (element) {
        var currentUrl;
        var urlHasParams = /\\?.*=/;
        var urlHasQueryString = /\\?./;
        var urlHasHash = /#./;

        if (urlHasParams.test(String(window.location)) || urlHasQueryString.test(String(window.location))) {
          currentUrl = String(window.location).split('?')[0];
        } else if (urlHasHash.test(String(window.location))) {
          currentUrl = String(window.location).split('#')[0];
        } else {
          currentUrl = String(window.location);
        }

        if (currentUrl.slice(-1) === '#') {
          currentUrl = currentUrl.slice(0, -1);
        }

        if (element.href === currentUrl) {
          element.classList.add(ClassName$b.ACTIVE); // eslint-disable-next-line unicorn/prefer-spread

          Array.from(_this4._getParents(element, Selector$b.NAV_DROPDOWN)).forEach(function (element) {
            element.classList.add(ClassName$b.SHOW);
          });
        }
      });
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this5 = this;

      if (this._mobile && this._open) {
        this._addClickOutListener();
      }

      if (this._overlaid && this._open) {
        this._addClickOutListener();
      }

      EventHandler.on(this._element, Event$c.CLASS_TOGGLE, function (event) {
        if (event.detail.className === ClassName$b.SIDEBAR_MINIMIZED) {
          if (_this5._element.classList.contains(ClassName$b.SIDEBAR_MINIMIZED)) {
            _this5.minimize();
          } else {
            _this5.reset();
          }
        }

        if (event.detail.className === ClassName$b.SIDEBAR_UNFOLDABLE) {
          if (_this5._element.classList.contains(ClassName$b.SIDEBAR_UNFOLDABLE)) {
            _this5.unfoldable();
          } else {
            _this5.reset();
          }
        }

        if (typeof Object.keys(Default$9.breakpoints).find(function (key) {
          return Default$9.breakpoints[key] === event.detail.className;
        }) !== 'undefined') {
          var className = event.detail.className;
          var breakpoint = Object.keys(Default$9.breakpoints).find(function (key) {
            return Default$9.breakpoints[key] === className;
          });

          if (event.detail.add) {
            _this5.open(breakpoint);
          } else {
            _this5.close(breakpoint);
          }
        }
      });
      EventHandler.on(this._element, Event$c.CLICK_DATA_API, Selector$b.NAV_DROPDOWN_TOGGLE, function (event) {
        event.preventDefault();

        _this5._toggleDropdown(event, _this5);
      });
      EventHandler.on(this._element, Event$c.CLICK_DATA_API, Selector$b.NAV_LINK, function () {
        if (_this5._isMobile()) {
          _this5.close();
        }
      });
    } // Static
    ;

    Sidebar._sidebarInterface = function _sidebarInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$b);

      var _config = typeof config === 'object' && config;

      if (!data) {
        data = new Sidebar(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    };

    Sidebar.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        Sidebar._sidebarInterface(this, config);
      });
    };

    Sidebar.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$b);
    };

    _createClass(Sidebar, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$b;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$9;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }]);

    return Sidebar;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(window, Event$c.LOAD_DATA_API, function () {
    // eslint-disable-next-line unicorn/prefer-spread
    Array.from(document.querySelectorAll(Selector$b.SIDEBAR)).forEach(function (element) {
      Sidebar._sidebarInterface(element);
    });
  });
  var $$c = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  if ($$c) {
    var JQUERY_NO_CONFLICT$b = $$c.fn[NAME$b];
    $$c.fn[NAME$b] = Sidebar.jQueryInterface;
    $$c.fn[NAME$b].Constructor = Sidebar;

    $$c.fn[NAME$b].noConflict = function () {
      $$c.fn[NAME$b] = JQUERY_NO_CONFLICT$b;
      return Sidebar.jQueryInterface;
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$c = 'tab';
  var VERSION$c = '3.0.0-rc.4';
  var DATA_KEY$c = 'coreui.tab';
  var EVENT_KEY$c = "." + DATA_KEY$c;
  var DATA_API_KEY$a = '.data-api';
  var Event$d = {
    HIDE: "hide" + EVENT_KEY$c,
    HIDDEN: "hidden" + EVENT_KEY$c,
    SHOW: "show" + EVENT_KEY$c,
    SHOWN: "shown" + EVENT_KEY$c,
    CLICK_DATA_API: "click" + EVENT_KEY$c + DATA_API_KEY$a
  };
  var ClassName$c = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$c = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: ':scope > li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: ':scope > .dropdown-menu .active'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab =
  /*#__PURE__*/
  function () {
    function Tab(element) {
      this._element = element;
      Data.setData(this._element, DATA_KEY$c, this);
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(ClassName$c.ACTIVE) || this._element.classList.contains(ClassName$c.DISABLED)) {
        return;
      }

      var previous;
      var target = getElementFromSelector(this._element);
      var listElement = SelectorEngine.closest(this._element, Selector$c.NAV_LIST_GROUP);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$c.ACTIVE_UL : Selector$c.ACTIVE;
        previous = makeArray(SelectorEngine.find(itemSelector, listElement));
        previous = previous[previous.length - 1];
      }

      var hideEvent = null;

      if (previous) {
        hideEvent = EventHandler.trigger(previous, Event$d.HIDE, {
          relatedTarget: this._element
        });
      }

      var showEvent = EventHandler.trigger(this._element, Event$d.SHOW, {
        relatedTarget: previous
      });

      if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
        return;
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        EventHandler.trigger(previous, Event$d.HIDDEN, {
          relatedTarget: _this._element
        });
        EventHandler.trigger(_this._element, Event$d.SHOWN, {
          relatedTarget: previous
        });
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$c);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(Selector$c.ACTIVE_UL, container) : SelectorEngine.children(container, Selector$c.ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && active.classList.contains(ClassName$c.FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = getTransitionDurationFromElement(active);
        active.classList.remove(ClassName$c.SHOW);
        EventHandler.one(active, TRANSITION_END, complete);
        emulateTransitionEnd(active, transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        active.classList.remove(ClassName$c.ACTIVE);
        var dropdownChild = SelectorEngine.findOne(Selector$c.DROPDOWN_ACTIVE_CHILD, active.parentNode);

        if (dropdownChild) {
          dropdownChild.classList.remove(ClassName$c.ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      element.classList.add(ClassName$c.ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      reflow(element);

      if (element.classList.contains(ClassName$c.FADE)) {
        element.classList.add(ClassName$c.SHOW);
      }

      if (element.parentNode && element.parentNode.classList.contains(ClassName$c.DROPDOWN_MENU)) {
        var dropdownElement = SelectorEngine.closest(element, Selector$c.DROPDOWN);

        if (dropdownElement) {
          makeArray(SelectorEngine.find(Selector$c.DROPDOWN_TOGGLE)).forEach(function (dropdown) {
            return dropdown.classList.add(ClassName$c.ACTIVE);
          });
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$c) || new Tab(this);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Tab.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$c);
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$c;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, Event$d.CLICK_DATA_API, Selector$c.DATA_TOGGLE, function (event) {
    event.preventDefault();
    var data = Data.getData(this, DATA_KEY$c) || new Tab(this);
    data.show();
  });
  var $$d = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .tab to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$d) {
    var JQUERY_NO_CONFLICT$c = $$d.fn[NAME$c];
    $$d.fn[NAME$c] = Tab.jQueryInterface;
    $$d.fn[NAME$c].Constructor = Tab;

    $$d.fn[NAME$c].noConflict = function () {
      $$d.fn[NAME$c] = JQUERY_NO_CONFLICT$c;
      return Tab.jQueryInterface;
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$d = 'toast';
  var VERSION$d = '3.0.0-rc.4';
  var DATA_KEY$d = 'coreui.toast';
  var EVENT_KEY$d = "." + DATA_KEY$d;
  var Event$e = {
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$d,
    HIDE: "hide" + EVENT_KEY$d,
    HIDDEN: "hidden" + EVENT_KEY$d,
    SHOW: "show" + EVENT_KEY$d,
    SHOWN: "shown" + EVENT_KEY$d
  };
  var ClassName$d = {
    FADE: 'fade',
    HIDE: 'hide',
    SHOW: 'show',
    SHOWING: 'showing'
  };
  var DefaultType$8 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$a = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var Selector$d = {
    DATA_DISMISS: '[data-dismiss="toast"]'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Toast =
  /*#__PURE__*/
  function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();

      Data.setData(element, DATA_KEY$d, this);
    } // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      var showEvent = EventHandler.trigger(this._element, Event$e.SHOW);

      if (showEvent.defaultPrevented) {
        return;
      }

      if (this._config.animation) {
        this._element.classList.add(ClassName$d.FADE);
      }

      var complete = function complete() {
        _this._element.classList.remove(ClassName$d.SHOWING);

        _this._element.classList.add(ClassName$d.SHOW);

        EventHandler.trigger(_this._element, Event$e.SHOWN);

        if (_this._config.autohide) {
          _this._timeout = setTimeout(function () {
            _this.hide();
          }, _this._config.delay);
        }
      };

      this._element.classList.remove(ClassName$d.HIDE);

      reflow(this._element);

      this._element.classList.add(ClassName$d.SHOWING);

      if (this._config.animation) {
        var transitionDuration = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, complete);
        emulateTransitionEnd(this._element, transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (!this._element.classList.contains(ClassName$d.SHOW)) {
        return;
      }

      var hideEvent = EventHandler.trigger(this._element, Event$e.HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      var complete = function complete() {
        _this2._element.classList.add(ClassName$d.HIDE);

        EventHandler.trigger(_this2._element, Event$e.HIDDEN);
      };

      this._element.classList.remove(ClassName$d.SHOW);

      if (this._config.animation) {
        var transitionDuration = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, complete);
        emulateTransitionEnd(this._element, transitionDuration);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      this._timeout = null;

      if (this._element.classList.contains(ClassName$d.SHOW)) {
        this._element.classList.remove(ClassName$d.SHOW);
      }

      EventHandler.off(this._element, Event$e.CLICK_DISMISS);
      Data.removeData(this._element, DATA_KEY$d);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default$a, {}, Manipulator.getDataAttributes(this._element), {}, typeof config === 'object' && config ? config : {});
      typeCheckConfig(NAME$d, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this3 = this;

      EventHandler.on(this._element, Event$e.CLICK_DISMISS, Selector$d.DATA_DISMISS, function () {
        return _this3.hide();
      });
    } // Static
    ;

    Toast.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$d);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    Toast.getInstance = function getInstance(element) {
      return Data.getData(element, DATA_KEY$d);
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$d;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$a;
      }
    }]);

    return Toast;
  }();

  var $$e = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   *  add .toast to jQuery only if jQuery is present
   */

  /* istanbul ignore if */

  if ($$e) {
    var JQUERY_NO_CONFLICT$d = $$e.fn[NAME$d];
    $$e.fn[NAME$d] = Toast.jQueryInterface;
    $$e.fn[NAME$d].Constructor = Toast;

    $$e.fn[NAME$d].noConflict = function () {
      $$e.fn[NAME$d] = JQUERY_NO_CONFLICT$d;
      return Toast.jQueryInterface;
    };
  }

  /* eslint-disable */
  // Production steps of ECMA-262, Edition 6, 22.1.2.1
  // Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
  if (!Array.from) {
    Array.from = function () {
      var toStr = Object.prototype.toString;

      var isCallable = function isCallable(fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };

      var toInteger = function toInteger(value) {
        var number = Number(value);

        if (isNaN(number)) {
          return 0;
        }

        if (number === 0 || !isFinite(number)) {
          return number;
        }

        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };

      var maxSafeInteger = Math.pow(2, 53) - 1;

      var toLength = function toLength(value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      }; // The length property of the from method is 1.


      return function from(arrayLike
      /*, mapFn, thisArg */
      ) {
        // 1. Let C be the this value.
        var C = this; // 2. Let items be ToObject(arrayLike).

        var items = Object(arrayLike); // 3. ReturnIfAbrupt(items).

        if (arrayLike == null) {
          throw new TypeError("Array.from requires an array-like object - not null or undefined");
        } // 4. If mapfn is undefined, then let mapping be false.


        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;

        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          } // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.


          if (arguments.length > 2) {
            T = arguments[2];
          }
        } // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).


        var len = toLength(items.length); // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).

        var A = isCallable(C) ? Object(new C(len)) : new Array(len); // 16. Let k be 0.

        var k = 0; // 17. Repeat, while k < len… (also steps a - h)

        var kValue;

        while (k < len) {
          kValue = items[k];

          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }

          k += 1;
        } // 18. Let putStatus be Put(A, "length", len, true).


        A.length = len; // 20. Return A.

        return A;
      };
    }();
  }

  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var el = this;

      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);

      return null;
    };
  }

  (function () {
    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: null
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }

    window.CustomEvent = CustomEvent;
  })();

  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s);
      var i = matches.length; // eslint-disable-next-line no-empty

      while (--i >= 0 && matches.item(i) !== this) {}

      return i > -1;
    };
  } // https://tc39.github.io/ecma262/#sec-array.prototype.find


  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      value: function value(predicate) {
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

        var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


        var thisArg = arguments[1]; // 5. Let k be 0.

        var k = 0; // 6. Repeat, while k < len

        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return kValue.
          var kValue = o[k];

          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
          } // e. Increase k by 1.


          k++;
        } // 7. Return undefined.


        return undefined;
      }
    });
  }

  /**
   * --------------------------------------------------------------------------
   * CoreUI (v3.0.0): index.umd.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */
  var index_umd = {
    AsyncLoad: AsyncLoad,
    Alert: Alert,
    Button: Button,
    Carousel: Carousel,
    ClassToggler: ClassToggler,
    Collapse: Collapse,
    Dropdown: Dropdown,
    Modal: Modal,
    Popover: Popover,
    Scrollspy: ScrollSpy,
    Sidebar: Sidebar,
    Tab: Tab,
    Toast: Toast,
    Tooltip: Tooltip
  };

  return index_umd;

})));
//# sourceMappingURL=coreui.bundle.js.map

!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Utils=t():(e.coreui=e.coreui||{},e.coreui.Utils=t())}(this,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);var n=function e(t,r){for(var n=0,o=Object.keys(r);n<o.length;n++){var c=o[n];r[c]instanceof Object&&Object.assign(r[c],e(t[c],r[c]))}return Object.assign(t||{},r),t},o=function(){for(var e={},t=document.styleSheets,r="",n=t.length-1;n>-1;n--){for(var o=t[n].cssRules,c=o.length-1;c>-1;c--)if(".ie-custom-properties"===o[c].selectorText){r=o[c].cssText;break}if(r)break}return(r=r.substring(r.lastIndexOf("{")+1,r.lastIndexOf("}"))).split(";").forEach((function(t){if(t){var r=t.split(": ")[0],n=t.split(": ")[1];r&&n&&(e["--".concat(r.trim())]=n.trim())}})),e},c=function(){return Boolean(document.documentMode)&&document.documentMode>=10},i=function(e){return e.match(/^--.*/i)},a=function(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;if(i(e)&&c()){var n=o();t=n[e]}else t=window.getComputedStyle(r,null).getPropertyValue(e).replace(/^\s/,"");return t},s=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body,r="--".concat(e),n=a(r,t);return n||e},u=function(e){if(void 0===e)throw new TypeError("Hex color is not defined");var t,r,n;if(!e.match(/^#(?:[0-9a-f]{3}){1,2}$/i))throw new Error("".concat(e," is not a valid hex color"));return 7===e.length?(t=parseInt(e.slice(1,3),16),r=parseInt(e.slice(3,5),16),n=parseInt(e.slice(5,7),16)):(t=parseInt(e.slice(1,2),16),r=parseInt(e.slice(2,3),16),n=parseInt(e.slice(3,5),16)),"rgba(".concat(t,", ").concat(r,", ").concat(n,")")},l=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;if(void 0===e)throw new TypeError("Hex color is not defined");var r,n,o,c=e.match(/^#(?:[0-9a-f]{3}){1,2}$/i);if(!c)throw new Error("".concat(e," is not a valid hex color"));return 7===e.length?(r=parseInt(e.slice(1,3),16),n=parseInt(e.slice(3,5),16),o=parseInt(e.slice(5,7),16)):(r=parseInt(e.slice(1,2),16),n=parseInt(e.slice(2,3),16),o=parseInt(e.slice(3,5),16)),"rgba(".concat(r,", ").concat(n,", ").concat(o,", ").concat(t/100,")")},f=function(){return"uid-"+Math.random().toString(36).substr(2)},d=function(e,t){for(var r={},n=0;n<t.length;n++)r[t[n]]=e[t[n]];return r},p=function(e){if(void 0===e)throw new TypeError("Hex color is not defined");if("transparent"===e)return"#00000000";var t=e.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);if(!t)throw new Error("".concat(e," is not a valid rgb color"));var r="0".concat(parseInt(t[1],10).toString(16)),n="0".concat(parseInt(t[2],10).toString(16)),o="0".concat(parseInt(t[3],10).toString(16));return"#".concat(r.slice(-2)).concat(n.slice(-2)).concat(o.slice(-2))};t.default={deepObjectsMerge:n,getColor:s,getStyle:a,hexToRgb:u,hexToRgba:l,makeUid:f,pickByKeys:d,rgbToHex:p}}]).default}));
/*!
  * CoreUI Plugins - Chart.js for CoreUI 3 v2.0.0 (https://coreui.io)
  * Copyright 2020 creativeLabs Łukasz Holeczek
  * Licensed under MIT (https://coreui.io/license/)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, (global.coreui = global.coreui || {}, global.coreui.ChartJS = factory()));
}(this, (function () { 'use strict';

	/*!
	 * Chart.js v2.9.2
	 * https://www.chartjs.org
	 * (c) 2019 Chart.js Contributors
	 * Released under the MIT License
	 */
	(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(function() { try { return require('moment'); } catch(e) { } }()) :
	typeof define === 'function' && define.amd ? define(['require'], function(require) { return factory(function() { try { return require('moment'); } catch(e) { } }()); }) :
	(global = global || self, global.Chart = factory(global.moment));
	}(undefined, (function (moment) {
	moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	function getCjsExportFromNamespace (n) {
		return n && n['default'] || n;
	}

	var colorName = {
		"aliceblue": [240, 248, 255],
		"antiquewhite": [250, 235, 215],
		"aqua": [0, 255, 255],
		"aquamarine": [127, 255, 212],
		"azure": [240, 255, 255],
		"beige": [245, 245, 220],
		"bisque": [255, 228, 196],
		"black": [0, 0, 0],
		"blanchedalmond": [255, 235, 205],
		"blue": [0, 0, 255],
		"blueviolet": [138, 43, 226],
		"brown": [165, 42, 42],
		"burlywood": [222, 184, 135],
		"cadetblue": [95, 158, 160],
		"chartreuse": [127, 255, 0],
		"chocolate": [210, 105, 30],
		"coral": [255, 127, 80],
		"cornflowerblue": [100, 149, 237],
		"cornsilk": [255, 248, 220],
		"crimson": [220, 20, 60],
		"cyan": [0, 255, 255],
		"darkblue": [0, 0, 139],
		"darkcyan": [0, 139, 139],
		"darkgoldenrod": [184, 134, 11],
		"darkgray": [169, 169, 169],
		"darkgreen": [0, 100, 0],
		"darkgrey": [169, 169, 169],
		"darkkhaki": [189, 183, 107],
		"darkmagenta": [139, 0, 139],
		"darkolivegreen": [85, 107, 47],
		"darkorange": [255, 140, 0],
		"darkorchid": [153, 50, 204],
		"darkred": [139, 0, 0],
		"darksalmon": [233, 150, 122],
		"darkseagreen": [143, 188, 143],
		"darkslateblue": [72, 61, 139],
		"darkslategray": [47, 79, 79],
		"darkslategrey": [47, 79, 79],
		"darkturquoise": [0, 206, 209],
		"darkviolet": [148, 0, 211],
		"deeppink": [255, 20, 147],
		"deepskyblue": [0, 191, 255],
		"dimgray": [105, 105, 105],
		"dimgrey": [105, 105, 105],
		"dodgerblue": [30, 144, 255],
		"firebrick": [178, 34, 34],
		"floralwhite": [255, 250, 240],
		"forestgreen": [34, 139, 34],
		"fuchsia": [255, 0, 255],
		"gainsboro": [220, 220, 220],
		"ghostwhite": [248, 248, 255],
		"gold": [255, 215, 0],
		"goldenrod": [218, 165, 32],
		"gray": [128, 128, 128],
		"green": [0, 128, 0],
		"greenyellow": [173, 255, 47],
		"grey": [128, 128, 128],
		"honeydew": [240, 255, 240],
		"hotpink": [255, 105, 180],
		"indianred": [205, 92, 92],
		"indigo": [75, 0, 130],
		"ivory": [255, 255, 240],
		"khaki": [240, 230, 140],
		"lavender": [230, 230, 250],
		"lavenderblush": [255, 240, 245],
		"lawngreen": [124, 252, 0],
		"lemonchiffon": [255, 250, 205],
		"lightblue": [173, 216, 230],
		"lightcoral": [240, 128, 128],
		"lightcyan": [224, 255, 255],
		"lightgoldenrodyellow": [250, 250, 210],
		"lightgray": [211, 211, 211],
		"lightgreen": [144, 238, 144],
		"lightgrey": [211, 211, 211],
		"lightpink": [255, 182, 193],
		"lightsalmon": [255, 160, 122],
		"lightseagreen": [32, 178, 170],
		"lightskyblue": [135, 206, 250],
		"lightslategray": [119, 136, 153],
		"lightslategrey": [119, 136, 153],
		"lightsteelblue": [176, 196, 222],
		"lightyellow": [255, 255, 224],
		"lime": [0, 255, 0],
		"limegreen": [50, 205, 50],
		"linen": [250, 240, 230],
		"magenta": [255, 0, 255],
		"maroon": [128, 0, 0],
		"mediumaquamarine": [102, 205, 170],
		"mediumblue": [0, 0, 205],
		"mediumorchid": [186, 85, 211],
		"mediumpurple": [147, 112, 219],
		"mediumseagreen": [60, 179, 113],
		"mediumslateblue": [123, 104, 238],
		"mediumspringgreen": [0, 250, 154],
		"mediumturquoise": [72, 209, 204],
		"mediumvioletred": [199, 21, 133],
		"midnightblue": [25, 25, 112],
		"mintcream": [245, 255, 250],
		"mistyrose": [255, 228, 225],
		"moccasin": [255, 228, 181],
		"navajowhite": [255, 222, 173],
		"navy": [0, 0, 128],
		"oldlace": [253, 245, 230],
		"olive": [128, 128, 0],
		"olivedrab": [107, 142, 35],
		"orange": [255, 165, 0],
		"orangered": [255, 69, 0],
		"orchid": [218, 112, 214],
		"palegoldenrod": [238, 232, 170],
		"palegreen": [152, 251, 152],
		"paleturquoise": [175, 238, 238],
		"palevioletred": [219, 112, 147],
		"papayawhip": [255, 239, 213],
		"peachpuff": [255, 218, 185],
		"peru": [205, 133, 63],
		"pink": [255, 192, 203],
		"plum": [221, 160, 221],
		"powderblue": [176, 224, 230],
		"purple": [128, 0, 128],
		"rebeccapurple": [102, 51, 153],
		"red": [255, 0, 0],
		"rosybrown": [188, 143, 143],
		"royalblue": [65, 105, 225],
		"saddlebrown": [139, 69, 19],
		"salmon": [250, 128, 114],
		"sandybrown": [244, 164, 96],
		"seagreen": [46, 139, 87],
		"seashell": [255, 245, 238],
		"sienna": [160, 82, 45],
		"silver": [192, 192, 192],
		"skyblue": [135, 206, 235],
		"slateblue": [106, 90, 205],
		"slategray": [112, 128, 144],
		"slategrey": [112, 128, 144],
		"snow": [255, 250, 250],
		"springgreen": [0, 255, 127],
		"steelblue": [70, 130, 180],
		"tan": [210, 180, 140],
		"teal": [0, 128, 128],
		"thistle": [216, 191, 216],
		"tomato": [255, 99, 71],
		"turquoise": [64, 224, 208],
		"violet": [238, 130, 238],
		"wheat": [245, 222, 179],
		"white": [255, 255, 255],
		"whitesmoke": [245, 245, 245],
		"yellow": [255, 255, 0],
		"yellowgreen": [154, 205, 50]
	};

	var conversions = createCommonjsModule(function (module) {
	/* MIT license */


	// NOTE: conversions should only return primitive values (i.e. arrays, or
	//       values that give correct `typeof` results).
	//       do not use box values types (i.e. Number(), String(), etc.)

	var reverseKeywords = {};
	for (var key in colorName) {
		if (colorName.hasOwnProperty(key)) {
			reverseKeywords[colorName[key]] = key;
		}
	}

	var convert = module.exports = {
		rgb: {channels: 3, labels: 'rgb'},
		hsl: {channels: 3, labels: 'hsl'},
		hsv: {channels: 3, labels: 'hsv'},
		hwb: {channels: 3, labels: 'hwb'},
		cmyk: {channels: 4, labels: 'cmyk'},
		xyz: {channels: 3, labels: 'xyz'},
		lab: {channels: 3, labels: 'lab'},
		lch: {channels: 3, labels: 'lch'},
		hex: {channels: 1, labels: ['hex']},
		keyword: {channels: 1, labels: ['keyword']},
		ansi16: {channels: 1, labels: ['ansi16']},
		ansi256: {channels: 1, labels: ['ansi256']},
		hcg: {channels: 3, labels: ['h', 'c', 'g']},
		apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
		gray: {channels: 1, labels: ['gray']}
	};

	// hide .channels and .labels properties
	for (var model in convert) {
		if (convert.hasOwnProperty(model)) {
			if (!('channels' in convert[model])) {
				throw new Error('missing channels property: ' + model);
			}

			if (!('labels' in convert[model])) {
				throw new Error('missing channel labels property: ' + model);
			}

			if (convert[model].labels.length !== convert[model].channels) {
				throw new Error('channel and label counts mismatch: ' + model);
			}

			var channels = convert[model].channels;
			var labels = convert[model].labels;
			delete convert[model].channels;
			delete convert[model].labels;
			Object.defineProperty(convert[model], 'channels', {value: channels});
			Object.defineProperty(convert[model], 'labels', {value: labels});
		}
	}

	convert.rgb.hsl = function (rgb) {
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;
		var min = Math.min(r, g, b);
		var max = Math.max(r, g, b);
		var delta = max - min;
		var h;
		var s;
		var l;

		if (max === min) {
			h = 0;
		} else if (r === max) {
			h = (g - b) / delta;
		} else if (g === max) {
			h = 2 + (b - r) / delta;
		} else if (b === max) {
			h = 4 + (r - g) / delta;
		}

		h = Math.min(h * 60, 360);

		if (h < 0) {
			h += 360;
		}

		l = (min + max) / 2;

		if (max === min) {
			s = 0;
		} else if (l <= 0.5) {
			s = delta / (max + min);
		} else {
			s = delta / (2 - max - min);
		}

		return [h, s * 100, l * 100];
	};

	convert.rgb.hsv = function (rgb) {
		var rdif;
		var gdif;
		var bdif;
		var h;
		var s;

		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;
		var v = Math.max(r, g, b);
		var diff = v - Math.min(r, g, b);
		var diffc = function (c) {
			return (v - c) / 6 / diff + 1 / 2;
		};

		if (diff === 0) {
			h = s = 0;
		} else {
			s = diff / v;
			rdif = diffc(r);
			gdif = diffc(g);
			bdif = diffc(b);

			if (r === v) {
				h = bdif - gdif;
			} else if (g === v) {
				h = (1 / 3) + rdif - bdif;
			} else if (b === v) {
				h = (2 / 3) + gdif - rdif;
			}
			if (h < 0) {
				h += 1;
			} else if (h > 1) {
				h -= 1;
			}
		}

		return [
			h * 360,
			s * 100,
			v * 100
		];
	};

	convert.rgb.hwb = function (rgb) {
		var r = rgb[0];
		var g = rgb[1];
		var b = rgb[2];
		var h = convert.rgb.hsl(rgb)[0];
		var w = 1 / 255 * Math.min(r, Math.min(g, b));

		b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

		return [h, w * 100, b * 100];
	};

	convert.rgb.cmyk = function (rgb) {
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;
		var c;
		var m;
		var y;
		var k;

		k = Math.min(1 - r, 1 - g, 1 - b);
		c = (1 - r - k) / (1 - k) || 0;
		m = (1 - g - k) / (1 - k) || 0;
		y = (1 - b - k) / (1 - k) || 0;

		return [c * 100, m * 100, y * 100, k * 100];
	};

	/**
	 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	 * */
	function comparativeDistance(x, y) {
		return (
			Math.pow(x[0] - y[0], 2) +
			Math.pow(x[1] - y[1], 2) +
			Math.pow(x[2] - y[2], 2)
		);
	}

	convert.rgb.keyword = function (rgb) {
		var reversed = reverseKeywords[rgb];
		if (reversed) {
			return reversed;
		}

		var currentClosestDistance = Infinity;
		var currentClosestKeyword;

		for (var keyword in colorName) {
			if (colorName.hasOwnProperty(keyword)) {
				var value = colorName[keyword];

				// Compute comparative distance
				var distance = comparativeDistance(rgb, value);

				// Check if its less, if so set as closest
				if (distance < currentClosestDistance) {
					currentClosestDistance = distance;
					currentClosestKeyword = keyword;
				}
			}
		}

		return currentClosestKeyword;
	};

	convert.keyword.rgb = function (keyword) {
		return colorName[keyword];
	};

	convert.rgb.xyz = function (rgb) {
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;

		// assume sRGB
		r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
		g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
		b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

		var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
		var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
		var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

		return [x * 100, y * 100, z * 100];
	};

	convert.rgb.lab = function (rgb) {
		var xyz = convert.rgb.xyz(rgb);
		var x = xyz[0];
		var y = xyz[1];
		var z = xyz[2];
		var l;
		var a;
		var b;

		x /= 95.047;
		y /= 100;
		z /= 108.883;

		x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
		y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
		z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

		l = (116 * y) - 16;
		a = 500 * (x - y);
		b = 200 * (y - z);

		return [l, a, b];
	};

	convert.hsl.rgb = function (hsl) {
		var h = hsl[0] / 360;
		var s = hsl[1] / 100;
		var l = hsl[2] / 100;
		var t1;
		var t2;
		var t3;
		var rgb;
		var val;

		if (s === 0) {
			val = l * 255;
			return [val, val, val];
		}

		if (l < 0.5) {
			t2 = l * (1 + s);
		} else {
			t2 = l + s - l * s;
		}

		t1 = 2 * l - t2;

		rgb = [0, 0, 0];
		for (var i = 0; i < 3; i++) {
			t3 = h + 1 / 3 * -(i - 1);
			if (t3 < 0) {
				t3++;
			}
			if (t3 > 1) {
				t3--;
			}

			if (6 * t3 < 1) {
				val = t1 + (t2 - t1) * 6 * t3;
			} else if (2 * t3 < 1) {
				val = t2;
			} else if (3 * t3 < 2) {
				val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
			} else {
				val = t1;
			}

			rgb[i] = val * 255;
		}

		return rgb;
	};

	convert.hsl.hsv = function (hsl) {
		var h = hsl[0];
		var s = hsl[1] / 100;
		var l = hsl[2] / 100;
		var smin = s;
		var lmin = Math.max(l, 0.01);
		var sv;
		var v;

		l *= 2;
		s *= (l <= 1) ? l : 2 - l;
		smin *= lmin <= 1 ? lmin : 2 - lmin;
		v = (l + s) / 2;
		sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

		return [h, sv * 100, v * 100];
	};

	convert.hsv.rgb = function (hsv) {
		var h = hsv[0] / 60;
		var s = hsv[1] / 100;
		var v = hsv[2] / 100;
		var hi = Math.floor(h) % 6;

		var f = h - Math.floor(h);
		var p = 255 * v * (1 - s);
		var q = 255 * v * (1 - (s * f));
		var t = 255 * v * (1 - (s * (1 - f)));
		v *= 255;

		switch (hi) {
			case 0:
				return [v, t, p];
			case 1:
				return [q, v, p];
			case 2:
				return [p, v, t];
			case 3:
				return [p, q, v];
			case 4:
				return [t, p, v];
			case 5:
				return [v, p, q];
		}
	};

	convert.hsv.hsl = function (hsv) {
		var h = hsv[0];
		var s = hsv[1] / 100;
		var v = hsv[2] / 100;
		var vmin = Math.max(v, 0.01);
		var lmin;
		var sl;
		var l;

		l = (2 - s) * v;
		lmin = (2 - s) * vmin;
		sl = s * vmin;
		sl /= (lmin <= 1) ? lmin : 2 - lmin;
		sl = sl || 0;
		l /= 2;

		return [h, sl * 100, l * 100];
	};

	// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
	convert.hwb.rgb = function (hwb) {
		var h = hwb[0] / 360;
		var wh = hwb[1] / 100;
		var bl = hwb[2] / 100;
		var ratio = wh + bl;
		var i;
		var v;
		var f;
		var n;

		// wh + bl cant be > 1
		if (ratio > 1) {
			wh /= ratio;
			bl /= ratio;
		}

		i = Math.floor(6 * h);
		v = 1 - bl;
		f = 6 * h - i;

		if ((i & 0x01) !== 0) {
			f = 1 - f;
		}

		n = wh + f * (v - wh); // linear interpolation

		var r;
		var g;
		var b;
		switch (i) {
			default:
			case 6:
			case 0: r = v; g = n; b = wh; break;
			case 1: r = n; g = v; b = wh; break;
			case 2: r = wh; g = v; b = n; break;
			case 3: r = wh; g = n; b = v; break;
			case 4: r = n; g = wh; b = v; break;
			case 5: r = v; g = wh; b = n; break;
		}

		return [r * 255, g * 255, b * 255];
	};

	convert.cmyk.rgb = function (cmyk) {
		var c = cmyk[0] / 100;
		var m = cmyk[1] / 100;
		var y = cmyk[2] / 100;
		var k = cmyk[3] / 100;
		var r;
		var g;
		var b;

		r = 1 - Math.min(1, c * (1 - k) + k);
		g = 1 - Math.min(1, m * (1 - k) + k);
		b = 1 - Math.min(1, y * (1 - k) + k);

		return [r * 255, g * 255, b * 255];
	};

	convert.xyz.rgb = function (xyz) {
		var x = xyz[0] / 100;
		var y = xyz[1] / 100;
		var z = xyz[2] / 100;
		var r;
		var g;
		var b;

		r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
		g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
		b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

		// assume sRGB
		r = r > 0.0031308
			? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
			: r * 12.92;

		g = g > 0.0031308
			? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
			: g * 12.92;

		b = b > 0.0031308
			? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
			: b * 12.92;

		r = Math.min(Math.max(0, r), 1);
		g = Math.min(Math.max(0, g), 1);
		b = Math.min(Math.max(0, b), 1);

		return [r * 255, g * 255, b * 255];
	};

	convert.xyz.lab = function (xyz) {
		var x = xyz[0];
		var y = xyz[1];
		var z = xyz[2];
		var l;
		var a;
		var b;

		x /= 95.047;
		y /= 100;
		z /= 108.883;

		x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
		y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
		z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

		l = (116 * y) - 16;
		a = 500 * (x - y);
		b = 200 * (y - z);

		return [l, a, b];
	};

	convert.lab.xyz = function (lab) {
		var l = lab[0];
		var a = lab[1];
		var b = lab[2];
		var x;
		var y;
		var z;

		y = (l + 16) / 116;
		x = a / 500 + y;
		z = y - b / 200;

		var y2 = Math.pow(y, 3);
		var x2 = Math.pow(x, 3);
		var z2 = Math.pow(z, 3);
		y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
		x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
		z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

		x *= 95.047;
		y *= 100;
		z *= 108.883;

		return [x, y, z];
	};

	convert.lab.lch = function (lab) {
		var l = lab[0];
		var a = lab[1];
		var b = lab[2];
		var hr;
		var h;
		var c;

		hr = Math.atan2(b, a);
		h = hr * 360 / 2 / Math.PI;

		if (h < 0) {
			h += 360;
		}

		c = Math.sqrt(a * a + b * b);

		return [l, c, h];
	};

	convert.lch.lab = function (lch) {
		var l = lch[0];
		var c = lch[1];
		var h = lch[2];
		var a;
		var b;
		var hr;

		hr = h / 360 * 2 * Math.PI;
		a = c * Math.cos(hr);
		b = c * Math.sin(hr);

		return [l, a, b];
	};

	convert.rgb.ansi16 = function (args) {
		var r = args[0];
		var g = args[1];
		var b = args[2];
		var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

		value = Math.round(value / 50);

		if (value === 0) {
			return 30;
		}

		var ansi = 30
			+ ((Math.round(b / 255) << 2)
			| (Math.round(g / 255) << 1)
			| Math.round(r / 255));

		if (value === 2) {
			ansi += 60;
		}

		return ansi;
	};

	convert.hsv.ansi16 = function (args) {
		// optimization here; we already know the value and don't need to get
		// it converted for us.
		return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
	};

	convert.rgb.ansi256 = function (args) {
		var r = args[0];
		var g = args[1];
		var b = args[2];

		// we use the extended greyscale palette here, with the exception of
		// black and white. normal palette only has 4 greyscale shades.
		if (r === g && g === b) {
			if (r < 8) {
				return 16;
			}

			if (r > 248) {
				return 231;
			}

			return Math.round(((r - 8) / 247) * 24) + 232;
		}

		var ansi = 16
			+ (36 * Math.round(r / 255 * 5))
			+ (6 * Math.round(g / 255 * 5))
			+ Math.round(b / 255 * 5);

		return ansi;
	};

	convert.ansi16.rgb = function (args) {
		var color = args % 10;

		// handle greyscale
		if (color === 0 || color === 7) {
			if (args > 50) {
				color += 3.5;
			}

			color = color / 10.5 * 255;

			return [color, color, color];
		}

		var mult = (~~(args > 50) + 1) * 0.5;
		var r = ((color & 1) * mult) * 255;
		var g = (((color >> 1) & 1) * mult) * 255;
		var b = (((color >> 2) & 1) * mult) * 255;

		return [r, g, b];
	};

	convert.ansi256.rgb = function (args) {
		// handle greyscale
		if (args >= 232) {
			var c = (args - 232) * 10 + 8;
			return [c, c, c];
		}

		args -= 16;

		var rem;
		var r = Math.floor(args / 36) / 5 * 255;
		var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
		var b = (rem % 6) / 5 * 255;

		return [r, g, b];
	};

	convert.rgb.hex = function (args) {
		var integer = ((Math.round(args[0]) & 0xFF) << 16)
			+ ((Math.round(args[1]) & 0xFF) << 8)
			+ (Math.round(args[2]) & 0xFF);

		var string = integer.toString(16).toUpperCase();
		return '000000'.substring(string.length) + string;
	};

	convert.hex.rgb = function (args) {
		var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
		if (!match) {
			return [0, 0, 0];
		}

		var colorString = match[0];

		if (match[0].length === 3) {
			colorString = colorString.split('').map(function (char) {
				return char + char;
			}).join('');
		}

		var integer = parseInt(colorString, 16);
		var r = (integer >> 16) & 0xFF;
		var g = (integer >> 8) & 0xFF;
		var b = integer & 0xFF;

		return [r, g, b];
	};

	convert.rgb.hcg = function (rgb) {
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;
		var max = Math.max(Math.max(r, g), b);
		var min = Math.min(Math.min(r, g), b);
		var chroma = (max - min);
		var grayscale;
		var hue;

		if (chroma < 1) {
			grayscale = min / (1 - chroma);
		} else {
			grayscale = 0;
		}

		if (chroma <= 0) {
			hue = 0;
		} else
		if (max === r) {
			hue = ((g - b) / chroma) % 6;
		} else
		if (max === g) {
			hue = 2 + (b - r) / chroma;
		} else {
			hue = 4 + (r - g) / chroma + 4;
		}

		hue /= 6;
		hue %= 1;

		return [hue * 360, chroma * 100, grayscale * 100];
	};

	convert.hsl.hcg = function (hsl) {
		var s = hsl[1] / 100;
		var l = hsl[2] / 100;
		var c = 1;
		var f = 0;

		if (l < 0.5) {
			c = 2.0 * s * l;
		} else {
			c = 2.0 * s * (1.0 - l);
		}

		if (c < 1.0) {
			f = (l - 0.5 * c) / (1.0 - c);
		}

		return [hsl[0], c * 100, f * 100];
	};

	convert.hsv.hcg = function (hsv) {
		var s = hsv[1] / 100;
		var v = hsv[2] / 100;

		var c = s * v;
		var f = 0;

		if (c < 1.0) {
			f = (v - c) / (1 - c);
		}

		return [hsv[0], c * 100, f * 100];
	};

	convert.hcg.rgb = function (hcg) {
		var h = hcg[0] / 360;
		var c = hcg[1] / 100;
		var g = hcg[2] / 100;

		if (c === 0.0) {
			return [g * 255, g * 255, g * 255];
		}

		var pure = [0, 0, 0];
		var hi = (h % 1) * 6;
		var v = hi % 1;
		var w = 1 - v;
		var mg = 0;

		switch (Math.floor(hi)) {
			case 0:
				pure[0] = 1; pure[1] = v; pure[2] = 0; break;
			case 1:
				pure[0] = w; pure[1] = 1; pure[2] = 0; break;
			case 2:
				pure[0] = 0; pure[1] = 1; pure[2] = v; break;
			case 3:
				pure[0] = 0; pure[1] = w; pure[2] = 1; break;
			case 4:
				pure[0] = v; pure[1] = 0; pure[2] = 1; break;
			default:
				pure[0] = 1; pure[1] = 0; pure[2] = w;
		}

		mg = (1.0 - c) * g;

		return [
			(c * pure[0] + mg) * 255,
			(c * pure[1] + mg) * 255,
			(c * pure[2] + mg) * 255
		];
	};

	convert.hcg.hsv = function (hcg) {
		var c = hcg[1] / 100;
		var g = hcg[2] / 100;

		var v = c + g * (1.0 - c);
		var f = 0;

		if (v > 0.0) {
			f = c / v;
		}

		return [hcg[0], f * 100, v * 100];
	};

	convert.hcg.hsl = function (hcg) {
		var c = hcg[1] / 100;
		var g = hcg[2] / 100;

		var l = g * (1.0 - c) + 0.5 * c;
		var s = 0;

		if (l > 0.0 && l < 0.5) {
			s = c / (2 * l);
		} else
		if (l >= 0.5 && l < 1.0) {
			s = c / (2 * (1 - l));
		}

		return [hcg[0], s * 100, l * 100];
	};

	convert.hcg.hwb = function (hcg) {
		var c = hcg[1] / 100;
		var g = hcg[2] / 100;
		var v = c + g * (1.0 - c);
		return [hcg[0], (v - c) * 100, (1 - v) * 100];
	};

	convert.hwb.hcg = function (hwb) {
		var w = hwb[1] / 100;
		var b = hwb[2] / 100;
		var v = 1 - b;
		var c = v - w;
		var g = 0;

		if (c < 1) {
			g = (v - c) / (1 - c);
		}

		return [hwb[0], c * 100, g * 100];
	};

	convert.apple.rgb = function (apple) {
		return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
	};

	convert.rgb.apple = function (rgb) {
		return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
	};

	convert.gray.rgb = function (args) {
		return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
	};

	convert.gray.hsl = convert.gray.hsv = function (args) {
		return [0, 0, args[0]];
	};

	convert.gray.hwb = function (gray) {
		return [0, 100, gray[0]];
	};

	convert.gray.cmyk = function (gray) {
		return [0, 0, 0, gray[0]];
	};

	convert.gray.lab = function (gray) {
		return [gray[0], 0, 0];
	};

	convert.gray.hex = function (gray) {
		var val = Math.round(gray[0] / 100 * 255) & 0xFF;
		var integer = (val << 16) + (val << 8) + val;

		var string = integer.toString(16).toUpperCase();
		return '000000'.substring(string.length) + string;
	};

	convert.rgb.gray = function (rgb) {
		var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
		return [val / 255 * 100];
	};
	});
	var conversions_1 = conversions.rgb;
	var conversions_2 = conversions.hsl;
	var conversions_3 = conversions.hsv;
	var conversions_4 = conversions.hwb;
	var conversions_5 = conversions.cmyk;
	var conversions_6 = conversions.xyz;
	var conversions_7 = conversions.lab;
	var conversions_8 = conversions.lch;
	var conversions_9 = conversions.hex;
	var conversions_10 = conversions.keyword;
	var conversions_11 = conversions.ansi16;
	var conversions_12 = conversions.ansi256;
	var conversions_13 = conversions.hcg;
	var conversions_14 = conversions.apple;
	var conversions_15 = conversions.gray;

	/*
		this function routes a model to all other models.

		all functions that are routed have a property `.conversion` attached
		to the returned synthetic function. This property is an array
		of strings, each with the steps in between the 'from' and 'to'
		color models (inclusive).

		conversions that are not possible simply are not included.
	*/

	function buildGraph() {
		var graph = {};
		// https://jsperf.com/object-keys-vs-for-in-with-closure/3
		var models = Object.keys(conversions);

		for (var len = models.length, i = 0; i < len; i++) {
			graph[models[i]] = {
				// http://jsperf.com/1-vs-infinity
				// micro-opt, but this is simple.
				distance: -1,
				parent: null
			};
		}

		return graph;
	}

	// https://en.wikipedia.org/wiki/Breadth-first_search
	function deriveBFS(fromModel) {
		var graph = buildGraph();
		var queue = [fromModel]; // unshift -> queue -> pop

		graph[fromModel].distance = 0;

		while (queue.length) {
			var current = queue.pop();
			var adjacents = Object.keys(conversions[current]);

			for (var len = adjacents.length, i = 0; i < len; i++) {
				var adjacent = adjacents[i];
				var node = graph[adjacent];

				if (node.distance === -1) {
					node.distance = graph[current].distance + 1;
					node.parent = current;
					queue.unshift(adjacent);
				}
			}
		}

		return graph;
	}

	function link(from, to) {
		return function (args) {
			return to(from(args));
		};
	}

	function wrapConversion(toModel, graph) {
		var path = [graph[toModel].parent, toModel];
		var fn = conversions[graph[toModel].parent][toModel];

		var cur = graph[toModel].parent;
		while (graph[cur].parent) {
			path.unshift(graph[cur].parent);
			fn = link(conversions[graph[cur].parent][cur], fn);
			cur = graph[cur].parent;
		}

		fn.conversion = path;
		return fn;
	}

	var route = function (fromModel) {
		var graph = deriveBFS(fromModel);
		var conversion = {};

		var models = Object.keys(graph);
		for (var len = models.length, i = 0; i < len; i++) {
			var toModel = models[i];
			var node = graph[toModel];

			if (node.parent === null) {
				// no possible conversion, or this node is the source model.
				continue;
			}

			conversion[toModel] = wrapConversion(toModel, graph);
		}

		return conversion;
	};

	var convert = {};

	var models = Object.keys(conversions);

	function wrapRaw(fn) {
		var wrappedFn = function (args) {
			if (args === undefined || args === null) {
				return args;
			}

			if (arguments.length > 1) {
				args = Array.prototype.slice.call(arguments);
			}

			return fn(args);
		};

		// preserve .conversion property if there is one
		if ('conversion' in fn) {
			wrappedFn.conversion = fn.conversion;
		}

		return wrappedFn;
	}

	function wrapRounded(fn) {
		var wrappedFn = function (args) {
			if (args === undefined || args === null) {
				return args;
			}

			if (arguments.length > 1) {
				args = Array.prototype.slice.call(arguments);
			}

			var result = fn(args);

			// we're assuming the result is an array here.
			// see notice in conversions.js; don't use box types
			// in conversion functions.
			if (typeof result === 'object') {
				for (var len = result.length, i = 0; i < len; i++) {
					result[i] = Math.round(result[i]);
				}
			}

			return result;
		};

		// preserve .conversion property if there is one
		if ('conversion' in fn) {
			wrappedFn.conversion = fn.conversion;
		}

		return wrappedFn;
	}

	models.forEach(function (fromModel) {
		convert[fromModel] = {};

		Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
		Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

		var routes = route(fromModel);
		var routeModels = Object.keys(routes);

		routeModels.forEach(function (toModel) {
			var fn = routes[toModel];

			convert[fromModel][toModel] = wrapRounded(fn);
			convert[fromModel][toModel].raw = wrapRaw(fn);
		});
	});

	var colorConvert = convert;

	var colorName$1 = {
		"aliceblue": [240, 248, 255],
		"antiquewhite": [250, 235, 215],
		"aqua": [0, 255, 255],
		"aquamarine": [127, 255, 212],
		"azure": [240, 255, 255],
		"beige": [245, 245, 220],
		"bisque": [255, 228, 196],
		"black": [0, 0, 0],
		"blanchedalmond": [255, 235, 205],
		"blue": [0, 0, 255],
		"blueviolet": [138, 43, 226],
		"brown": [165, 42, 42],
		"burlywood": [222, 184, 135],
		"cadetblue": [95, 158, 160],
		"chartreuse": [127, 255, 0],
		"chocolate": [210, 105, 30],
		"coral": [255, 127, 80],
		"cornflowerblue": [100, 149, 237],
		"cornsilk": [255, 248, 220],
		"crimson": [220, 20, 60],
		"cyan": [0, 255, 255],
		"darkblue": [0, 0, 139],
		"darkcyan": [0, 139, 139],
		"darkgoldenrod": [184, 134, 11],
		"darkgray": [169, 169, 169],
		"darkgreen": [0, 100, 0],
		"darkgrey": [169, 169, 169],
		"darkkhaki": [189, 183, 107],
		"darkmagenta": [139, 0, 139],
		"darkolivegreen": [85, 107, 47],
		"darkorange": [255, 140, 0],
		"darkorchid": [153, 50, 204],
		"darkred": [139, 0, 0],
		"darksalmon": [233, 150, 122],
		"darkseagreen": [143, 188, 143],
		"darkslateblue": [72, 61, 139],
		"darkslategray": [47, 79, 79],
		"darkslategrey": [47, 79, 79],
		"darkturquoise": [0, 206, 209],
		"darkviolet": [148, 0, 211],
		"deeppink": [255, 20, 147],
		"deepskyblue": [0, 191, 255],
		"dimgray": [105, 105, 105],
		"dimgrey": [105, 105, 105],
		"dodgerblue": [30, 144, 255],
		"firebrick": [178, 34, 34],
		"floralwhite": [255, 250, 240],
		"forestgreen": [34, 139, 34],
		"fuchsia": [255, 0, 255],
		"gainsboro": [220, 220, 220],
		"ghostwhite": [248, 248, 255],
		"gold": [255, 215, 0],
		"goldenrod": [218, 165, 32],
		"gray": [128, 128, 128],
		"green": [0, 128, 0],
		"greenyellow": [173, 255, 47],
		"grey": [128, 128, 128],
		"honeydew": [240, 255, 240],
		"hotpink": [255, 105, 180],
		"indianred": [205, 92, 92],
		"indigo": [75, 0, 130],
		"ivory": [255, 255, 240],
		"khaki": [240, 230, 140],
		"lavender": [230, 230, 250],
		"lavenderblush": [255, 240, 245],
		"lawngreen": [124, 252, 0],
		"lemonchiffon": [255, 250, 205],
		"lightblue": [173, 216, 230],
		"lightcoral": [240, 128, 128],
		"lightcyan": [224, 255, 255],
		"lightgoldenrodyellow": [250, 250, 210],
		"lightgray": [211, 211, 211],
		"lightgreen": [144, 238, 144],
		"lightgrey": [211, 211, 211],
		"lightpink": [255, 182, 193],
		"lightsalmon": [255, 160, 122],
		"lightseagreen": [32, 178, 170],
		"lightskyblue": [135, 206, 250],
		"lightslategray": [119, 136, 153],
		"lightslategrey": [119, 136, 153],
		"lightsteelblue": [176, 196, 222],
		"lightyellow": [255, 255, 224],
		"lime": [0, 255, 0],
		"limegreen": [50, 205, 50],
		"linen": [250, 240, 230],
		"magenta": [255, 0, 255],
		"maroon": [128, 0, 0],
		"mediumaquamarine": [102, 205, 170],
		"mediumblue": [0, 0, 205],
		"mediumorchid": [186, 85, 211],
		"mediumpurple": [147, 112, 219],
		"mediumseagreen": [60, 179, 113],
		"mediumslateblue": [123, 104, 238],
		"mediumspringgreen": [0, 250, 154],
		"mediumturquoise": [72, 209, 204],
		"mediumvioletred": [199, 21, 133],
		"midnightblue": [25, 25, 112],
		"mintcream": [245, 255, 250],
		"mistyrose": [255, 228, 225],
		"moccasin": [255, 228, 181],
		"navajowhite": [255, 222, 173],
		"navy": [0, 0, 128],
		"oldlace": [253, 245, 230],
		"olive": [128, 128, 0],
		"olivedrab": [107, 142, 35],
		"orange": [255, 165, 0],
		"orangered": [255, 69, 0],
		"orchid": [218, 112, 214],
		"palegoldenrod": [238, 232, 170],
		"palegreen": [152, 251, 152],
		"paleturquoise": [175, 238, 238],
		"palevioletred": [219, 112, 147],
		"papayawhip": [255, 239, 213],
		"peachpuff": [255, 218, 185],
		"peru": [205, 133, 63],
		"pink": [255, 192, 203],
		"plum": [221, 160, 221],
		"powderblue": [176, 224, 230],
		"purple": [128, 0, 128],
		"rebeccapurple": [102, 51, 153],
		"red": [255, 0, 0],
		"rosybrown": [188, 143, 143],
		"royalblue": [65, 105, 225],
		"saddlebrown": [139, 69, 19],
		"salmon": [250, 128, 114],
		"sandybrown": [244, 164, 96],
		"seagreen": [46, 139, 87],
		"seashell": [255, 245, 238],
		"sienna": [160, 82, 45],
		"silver": [192, 192, 192],
		"skyblue": [135, 206, 235],
		"slateblue": [106, 90, 205],
		"slategray": [112, 128, 144],
		"slategrey": [112, 128, 144],
		"snow": [255, 250, 250],
		"springgreen": [0, 255, 127],
		"steelblue": [70, 130, 180],
		"tan": [210, 180, 140],
		"teal": [0, 128, 128],
		"thistle": [216, 191, 216],
		"tomato": [255, 99, 71],
		"turquoise": [64, 224, 208],
		"violet": [238, 130, 238],
		"wheat": [245, 222, 179],
		"white": [255, 255, 255],
		"whitesmoke": [245, 245, 245],
		"yellow": [255, 255, 0],
		"yellowgreen": [154, 205, 50]
	};

	/* MIT license */


	var colorString = {
	   getRgba: getRgba,
	   getHsla: getHsla,
	   getRgb: getRgb,
	   getHsl: getHsl,
	   getHwb: getHwb,
	   getAlpha: getAlpha,

	   hexString: hexString,
	   rgbString: rgbString,
	   rgbaString: rgbaString,
	   percentString: percentString,
	   percentaString: percentaString,
	   hslString: hslString,
	   hslaString: hslaString,
	   hwbString: hwbString,
	   keyword: keyword
	};

	function getRgba(string) {
	   if (!string) {
	      return;
	   }
	   var abbr =  /^#([a-fA-F0-9]{3,4})$/i,
	       hex =  /^#([a-fA-F0-9]{6}([a-fA-F0-9]{2})?)$/i,
	       rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
	       per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
	       keyword = /(\w+)/;

	   var rgb = [0, 0, 0],
	       a = 1,
	       match = string.match(abbr),
	       hexAlpha = "";
	   if (match) {
	      match = match[1];
	      hexAlpha = match[3];
	      for (var i = 0; i < rgb.length; i++) {
	         rgb[i] = parseInt(match[i] + match[i], 16);
	      }
	      if (hexAlpha) {
	         a = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
	      }
	   }
	   else if (match = string.match(hex)) {
	      hexAlpha = match[2];
	      match = match[1];
	      for (var i = 0; i < rgb.length; i++) {
	         rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
	      }
	      if (hexAlpha) {
	         a = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
	      }
	   }
	   else if (match = string.match(rgba)) {
	      for (var i = 0; i < rgb.length; i++) {
	         rgb[i] = parseInt(match[i + 1]);
	      }
	      a = parseFloat(match[4]);
	   }
	   else if (match = string.match(per)) {
	      for (var i = 0; i < rgb.length; i++) {
	         rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
	      }
	      a = parseFloat(match[4]);
	   }
	   else if (match = string.match(keyword)) {
	      if (match[1] == "transparent") {
	         return [0, 0, 0, 0];
	      }
	      rgb = colorName$1[match[1]];
	      if (!rgb) {
	         return;
	      }
	   }

	   for (var i = 0; i < rgb.length; i++) {
	      rgb[i] = scale(rgb[i], 0, 255);
	   }
	   if (!a && a != 0) {
	      a = 1;
	   }
	   else {
	      a = scale(a, 0, 1);
	   }
	   rgb[3] = a;
	   return rgb;
	}

	function getHsla(string) {
	   if (!string) {
	      return;
	   }
	   var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
	   var match = string.match(hsl);
	   if (match) {
	      var alpha = parseFloat(match[4]);
	      var h = scale(parseInt(match[1]), 0, 360),
	          s = scale(parseFloat(match[2]), 0, 100),
	          l = scale(parseFloat(match[3]), 0, 100),
	          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
	      return [h, s, l, a];
	   }
	}

	function getHwb(string) {
	   if (!string) {
	      return;
	   }
	   var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
	   var match = string.match(hwb);
	   if (match) {
	    var alpha = parseFloat(match[4]);
	      var h = scale(parseInt(match[1]), 0, 360),
	          w = scale(parseFloat(match[2]), 0, 100),
	          b = scale(parseFloat(match[3]), 0, 100),
	          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
	      return [h, w, b, a];
	   }
	}

	function getRgb(string) {
	   var rgba = getRgba(string);
	   return rgba && rgba.slice(0, 3);
	}

	function getHsl(string) {
	  var hsla = getHsla(string);
	  return hsla && hsla.slice(0, 3);
	}

	function getAlpha(string) {
	   var vals = getRgba(string);
	   if (vals) {
	      return vals[3];
	   }
	   else if (vals = getHsla(string)) {
	      return vals[3];
	   }
	   else if (vals = getHwb(string)) {
	      return vals[3];
	   }
	}

	// generators
	function hexString(rgba, a) {
	   var a = (a !== undefined && rgba.length === 3) ? a : rgba[3];
	   return "#" + hexDouble(rgba[0]) 
	              + hexDouble(rgba[1])
	              + hexDouble(rgba[2])
	              + (
	                 (a >= 0 && a < 1)
	                 ? hexDouble(Math.round(a * 255))
	                 : ""
	              );
	}

	function rgbString(rgba, alpha) {
	   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
	      return rgbaString(rgba, alpha);
	   }
	   return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
	}

	function rgbaString(rgba, alpha) {
	   if (alpha === undefined) {
	      alpha = (rgba[3] !== undefined ? rgba[3] : 1);
	   }
	   return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2]
	           + ", " + alpha + ")";
	}

	function percentString(rgba, alpha) {
	   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
	      return percentaString(rgba, alpha);
	   }
	   var r = Math.round(rgba[0]/255 * 100),
	       g = Math.round(rgba[1]/255 * 100),
	       b = Math.round(rgba[2]/255 * 100);

	   return "rgb(" + r + "%, " + g + "%, " + b + "%)";
	}

	function percentaString(rgba, alpha) {
	   var r = Math.round(rgba[0]/255 * 100),
	       g = Math.round(rgba[1]/255 * 100),
	       b = Math.round(rgba[2]/255 * 100);
	   return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
	}

	function hslString(hsla, alpha) {
	   if (alpha < 1 || (hsla[3] && hsla[3] < 1)) {
	      return hslaString(hsla, alpha);
	   }
	   return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
	}

	function hslaString(hsla, alpha) {
	   if (alpha === undefined) {
	      alpha = (hsla[3] !== undefined ? hsla[3] : 1);
	   }
	   return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, "
	           + alpha + ")";
	}

	// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
	// (hwb have alpha optional & 1 is default value)
	function hwbString(hwb, alpha) {
	   if (alpha === undefined) {
	      alpha = (hwb[3] !== undefined ? hwb[3] : 1);
	   }
	   return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%"
	           + (alpha !== undefined && alpha !== 1 ? ", " + alpha : "") + ")";
	}

	function keyword(rgb) {
	  return reverseNames[rgb.slice(0, 3)];
	}

	// helpers
	function scale(num, min, max) {
	   return Math.min(Math.max(min, num), max);
	}

	function hexDouble(num) {
	  var str = num.toString(16).toUpperCase();
	  return (str.length < 2) ? "0" + str : str;
	}


	//create a list of reverse color names
	var reverseNames = {};
	for (var name in colorName$1) {
	   reverseNames[colorName$1[name]] = name;
	}

	/* MIT license */



	var Color = function (obj) {
		if (obj instanceof Color) {
			return obj;
		}
		if (!(this instanceof Color)) {
			return new Color(obj);
		}

		this.valid = false;
		this.values = {
			rgb: [0, 0, 0],
			hsl: [0, 0, 0],
			hsv: [0, 0, 0],
			hwb: [0, 0, 0],
			cmyk: [0, 0, 0, 0],
			alpha: 1
		};

		// parse Color() argument
		var vals;
		if (typeof obj === 'string') {
			vals = colorString.getRgba(obj);
			if (vals) {
				this.setValues('rgb', vals);
			} else if (vals = colorString.getHsla(obj)) {
				this.setValues('hsl', vals);
			} else if (vals = colorString.getHwb(obj)) {
				this.setValues('hwb', vals);
			}
		} else if (typeof obj === 'object') {
			vals = obj;
			if (vals.r !== undefined || vals.red !== undefined) {
				this.setValues('rgb', vals);
			} else if (vals.l !== undefined || vals.lightness !== undefined) {
				this.setValues('hsl', vals);
			} else if (vals.v !== undefined || vals.value !== undefined) {
				this.setValues('hsv', vals);
			} else if (vals.w !== undefined || vals.whiteness !== undefined) {
				this.setValues('hwb', vals);
			} else if (vals.c !== undefined || vals.cyan !== undefined) {
				this.setValues('cmyk', vals);
			}
		}
	};

	Color.prototype = {
		isValid: function () {
			return this.valid;
		},
		rgb: function () {
			return this.setSpace('rgb', arguments);
		},
		hsl: function () {
			return this.setSpace('hsl', arguments);
		},
		hsv: function () {
			return this.setSpace('hsv', arguments);
		},
		hwb: function () {
			return this.setSpace('hwb', arguments);
		},
		cmyk: function () {
			return this.setSpace('cmyk', arguments);
		},

		rgbArray: function () {
			return this.values.rgb;
		},
		hslArray: function () {
			return this.values.hsl;
		},
		hsvArray: function () {
			return this.values.hsv;
		},
		hwbArray: function () {
			var values = this.values;
			if (values.alpha !== 1) {
				return values.hwb.concat([values.alpha]);
			}
			return values.hwb;
		},
		cmykArray: function () {
			return this.values.cmyk;
		},
		rgbaArray: function () {
			var values = this.values;
			return values.rgb.concat([values.alpha]);
		},
		hslaArray: function () {
			var values = this.values;
			return values.hsl.concat([values.alpha]);
		},
		alpha: function (val) {
			if (val === undefined) {
				return this.values.alpha;
			}
			this.setValues('alpha', val);
			return this;
		},

		red: function (val) {
			return this.setChannel('rgb', 0, val);
		},
		green: function (val) {
			return this.setChannel('rgb', 1, val);
		},
		blue: function (val) {
			return this.setChannel('rgb', 2, val);
		},
		hue: function (val) {
			if (val) {
				val %= 360;
				val = val < 0 ? 360 + val : val;
			}
			return this.setChannel('hsl', 0, val);
		},
		saturation: function (val) {
			return this.setChannel('hsl', 1, val);
		},
		lightness: function (val) {
			return this.setChannel('hsl', 2, val);
		},
		saturationv: function (val) {
			return this.setChannel('hsv', 1, val);
		},
		whiteness: function (val) {
			return this.setChannel('hwb', 1, val);
		},
		blackness: function (val) {
			return this.setChannel('hwb', 2, val);
		},
		value: function (val) {
			return this.setChannel('hsv', 2, val);
		},
		cyan: function (val) {
			return this.setChannel('cmyk', 0, val);
		},
		magenta: function (val) {
			return this.setChannel('cmyk', 1, val);
		},
		yellow: function (val) {
			return this.setChannel('cmyk', 2, val);
		},
		black: function (val) {
			return this.setChannel('cmyk', 3, val);
		},

		hexString: function () {
			return colorString.hexString(this.values.rgb);
		},
		rgbString: function () {
			return colorString.rgbString(this.values.rgb, this.values.alpha);
		},
		rgbaString: function () {
			return colorString.rgbaString(this.values.rgb, this.values.alpha);
		},
		percentString: function () {
			return colorString.percentString(this.values.rgb, this.values.alpha);
		},
		hslString: function () {
			return colorString.hslString(this.values.hsl, this.values.alpha);
		},
		hslaString: function () {
			return colorString.hslaString(this.values.hsl, this.values.alpha);
		},
		hwbString: function () {
			return colorString.hwbString(this.values.hwb, this.values.alpha);
		},
		keyword: function () {
			return colorString.keyword(this.values.rgb, this.values.alpha);
		},

		rgbNumber: function () {
			var rgb = this.values.rgb;
			return (rgb[0] << 16) | (rgb[1] << 8) | rgb[2];
		},

		luminosity: function () {
			// http://www.w3.org/TR/WCAG20/#relativeluminancedef
			var rgb = this.values.rgb;
			var lum = [];
			for (var i = 0; i < rgb.length; i++) {
				var chan = rgb[i] / 255;
				lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
			}
			return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
		},

		contrast: function (color2) {
			// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
			var lum1 = this.luminosity();
			var lum2 = color2.luminosity();
			if (lum1 > lum2) {
				return (lum1 + 0.05) / (lum2 + 0.05);
			}
			return (lum2 + 0.05) / (lum1 + 0.05);
		},

		level: function (color2) {
			var contrastRatio = this.contrast(color2);
			if (contrastRatio >= 7.1) {
				return 'AAA';
			}

			return (contrastRatio >= 4.5) ? 'AA' : '';
		},

		dark: function () {
			// YIQ equation from http://24ways.org/2010/calculating-color-contrast
			var rgb = this.values.rgb;
			var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
			return yiq < 128;
		},

		light: function () {
			return !this.dark();
		},

		negate: function () {
			var rgb = [];
			for (var i = 0; i < 3; i++) {
				rgb[i] = 255 - this.values.rgb[i];
			}
			this.setValues('rgb', rgb);
			return this;
		},

		lighten: function (ratio) {
			var hsl = this.values.hsl;
			hsl[2] += hsl[2] * ratio;
			this.setValues('hsl', hsl);
			return this;
		},

		darken: function (ratio) {
			var hsl = this.values.hsl;
			hsl[2] -= hsl[2] * ratio;
			this.setValues('hsl', hsl);
			return this;
		},

		saturate: function (ratio) {
			var hsl = this.values.hsl;
			hsl[1] += hsl[1] * ratio;
			this.setValues('hsl', hsl);
			return this;
		},

		desaturate: function (ratio) {
			var hsl = this.values.hsl;
			hsl[1] -= hsl[1] * ratio;
			this.setValues('hsl', hsl);
			return this;
		},

		whiten: function (ratio) {
			var hwb = this.values.hwb;
			hwb[1] += hwb[1] * ratio;
			this.setValues('hwb', hwb);
			return this;
		},

		blacken: function (ratio) {
			var hwb = this.values.hwb;
			hwb[2] += hwb[2] * ratio;
			this.setValues('hwb', hwb);
			return this;
		},

		greyscale: function () {
			var rgb = this.values.rgb;
			// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
			var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
			this.setValues('rgb', [val, val, val]);
			return this;
		},

		clearer: function (ratio) {
			var alpha = this.values.alpha;
			this.setValues('alpha', alpha - (alpha * ratio));
			return this;
		},

		opaquer: function (ratio) {
			var alpha = this.values.alpha;
			this.setValues('alpha', alpha + (alpha * ratio));
			return this;
		},

		rotate: function (degrees) {
			var hsl = this.values.hsl;
			var hue = (hsl[0] + degrees) % 360;
			hsl[0] = hue < 0 ? 360 + hue : hue;
			this.setValues('hsl', hsl);
			return this;
		},

		/**
		 * Ported from sass implementation in C
		 * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
		 */
		mix: function (mixinColor, weight) {
			var color1 = this;
			var color2 = mixinColor;
			var p = weight === undefined ? 0.5 : weight;

			var w = 2 * p - 1;
			var a = color1.alpha() - color2.alpha();

			var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
			var w2 = 1 - w1;

			return this
				.rgb(
					w1 * color1.red() + w2 * color2.red(),
					w1 * color1.green() + w2 * color2.green(),
					w1 * color1.blue() + w2 * color2.blue()
				)
				.alpha(color1.alpha() * p + color2.alpha() * (1 - p));
		},

		toJSON: function () {
			return this.rgb();
		},

		clone: function () {
			// NOTE(SB): using node-clone creates a dependency to Buffer when using browserify,
			// making the final build way to big to embed in Chart.js. So let's do it manually,
			// assuming that values to clone are 1 dimension arrays containing only numbers,
			// except 'alpha' which is a number.
			var result = new Color();
			var source = this.values;
			var target = result.values;
			var value, type;

			for (var prop in source) {
				if (source.hasOwnProperty(prop)) {
					value = source[prop];
					type = ({}).toString.call(value);
					if (type === '[object Array]') {
						target[prop] = value.slice(0);
					} else if (type === '[object Number]') {
						target[prop] = value;
					} else {
						console.error('unexpected color value:', value);
					}
				}
			}

			return result;
		}
	};

	Color.prototype.spaces = {
		rgb: ['red', 'green', 'blue'],
		hsl: ['hue', 'saturation', 'lightness'],
		hsv: ['hue', 'saturation', 'value'],
		hwb: ['hue', 'whiteness', 'blackness'],
		cmyk: ['cyan', 'magenta', 'yellow', 'black']
	};

	Color.prototype.maxes = {
		rgb: [255, 255, 255],
		hsl: [360, 100, 100],
		hsv: [360, 100, 100],
		hwb: [360, 100, 100],
		cmyk: [100, 100, 100, 100]
	};

	Color.prototype.getValues = function (space) {
		var values = this.values;
		var vals = {};

		for (var i = 0; i < space.length; i++) {
			vals[space.charAt(i)] = values[space][i];
		}

		if (values.alpha !== 1) {
			vals.a = values.alpha;
		}

		// {r: 255, g: 255, b: 255, a: 0.4}
		return vals;
	};

	Color.prototype.setValues = function (space, vals) {
		var values = this.values;
		var spaces = this.spaces;
		var maxes = this.maxes;
		var alpha = 1;
		var i;

		this.valid = true;

		if (space === 'alpha') {
			alpha = vals;
		} else if (vals.length) {
			// [10, 10, 10]
			values[space] = vals.slice(0, space.length);
			alpha = vals[space.length];
		} else if (vals[space.charAt(0)] !== undefined) {
			// {r: 10, g: 10, b: 10}
			for (i = 0; i < space.length; i++) {
				values[space][i] = vals[space.charAt(i)];
			}

			alpha = vals.a;
		} else if (vals[spaces[space][0]] !== undefined) {
			// {red: 10, green: 10, blue: 10}
			var chans = spaces[space];

			for (i = 0; i < space.length; i++) {
				values[space][i] = vals[chans[i]];
			}

			alpha = vals.alpha;
		}

		values.alpha = Math.max(0, Math.min(1, (alpha === undefined ? values.alpha : alpha)));

		if (space === 'alpha') {
			return false;
		}

		var capped;

		// cap values of the space prior converting all values
		for (i = 0; i < space.length; i++) {
			capped = Math.max(0, Math.min(maxes[space][i], values[space][i]));
			values[space][i] = Math.round(capped);
		}

		// convert to all the other color spaces
		for (var sname in spaces) {
			if (sname !== space) {
				values[sname] = colorConvert[space][sname](values[space]);
			}
		}

		return true;
	};

	Color.prototype.setSpace = function (space, args) {
		var vals = args[0];

		if (vals === undefined) {
			// color.rgb()
			return this.getValues(space);
		}

		// color.rgb(10, 10, 10)
		if (typeof vals === 'number') {
			vals = Array.prototype.slice.call(args);
		}

		this.setValues(space, vals);
		return this;
	};

	Color.prototype.setChannel = function (space, index, val) {
		var svalues = this.values[space];
		if (val === undefined) {
			// color.red()
			return svalues[index];
		} else if (val === svalues[index]) {
			// color.red(color.red())
			return this;
		}

		// color.red(100)
		svalues[index] = val;
		this.setValues(space, svalues);

		return this;
	};

	if (typeof window !== 'undefined') {
		window.Color = Color;
	}

	var chartjsColor = Color;

	/**
	 * @namespace Chart.helpers
	 */
	var helpers = {
		/**
		 * An empty function that can be used, for example, for optional callback.
		 */
		noop: function() {},

		/**
		 * Returns a unique id, sequentially generated from a global variable.
		 * @returns {number}
		 * @function
		 */
		uid: (function() {
			var id = 0;
			return function() {
				return id++;
			};
		}()),

		/**
		 * Returns true if `value` is neither null nor undefined, else returns false.
		 * @param {*} value - The value to test.
		 * @returns {boolean}
		 * @since 2.7.0
		 */
		isNullOrUndef: function(value) {
			return value === null || typeof value === 'undefined';
		},

		/**
		 * Returns true if `value` is an array (including typed arrays), else returns false.
		 * @param {*} value - The value to test.
		 * @returns {boolean}
		 * @function
		 */
		isArray: function(value) {
			if (Array.isArray && Array.isArray(value)) {
				return true;
			}
			var type = Object.prototype.toString.call(value);
			if (type.substr(0, 7) === '[object' && type.substr(-6) === 'Array]') {
				return true;
			}
			return false;
		},

		/**
		 * Returns true if `value` is an object (excluding null), else returns false.
		 * @param {*} value - The value to test.
		 * @returns {boolean}
		 * @since 2.7.0
		 */
		isObject: function(value) {
			return value !== null && Object.prototype.toString.call(value) === '[object Object]';
		},

		/**
		 * Returns true if `value` is a finite number, else returns false
		 * @param {*} value  - The value to test.
		 * @returns {boolean}
		 */
		isFinite: function(value) {
			return (typeof value === 'number' || value instanceof Number) && isFinite(value);
		},

		/**
		 * Returns `value` if defined, else returns `defaultValue`.
		 * @param {*} value - The value to return if defined.
		 * @param {*} defaultValue - The value to return if `value` is undefined.
		 * @returns {*}
		 */
		valueOrDefault: function(value, defaultValue) {
			return typeof value === 'undefined' ? defaultValue : value;
		},

		/**
		 * Returns value at the given `index` in array if defined, else returns `defaultValue`.
		 * @param {Array} value - The array to lookup for value at `index`.
		 * @param {number} index - The index in `value` to lookup for value.
		 * @param {*} defaultValue - The value to return if `value[index]` is undefined.
		 * @returns {*}
		 */
		valueAtIndexOrDefault: function(value, index, defaultValue) {
			return helpers.valueOrDefault(helpers.isArray(value) ? value[index] : value, defaultValue);
		},

		/**
		 * Calls `fn` with the given `args` in the scope defined by `thisArg` and returns the
		 * value returned by `fn`. If `fn` is not a function, this method returns undefined.
		 * @param {function} fn - The function to call.
		 * @param {Array|undefined|null} args - The arguments with which `fn` should be called.
		 * @param {object} [thisArg] - The value of `this` provided for the call to `fn`.
		 * @returns {*}
		 */
		callback: function(fn, args, thisArg) {
			if (fn && typeof fn.call === 'function') {
				return fn.apply(thisArg, args);
			}
		},

		/**
		 * Note(SB) for performance sake, this method should only be used when loopable type
		 * is unknown or in none intensive code (not called often and small loopable). Else
		 * it's preferable to use a regular for() loop and save extra function calls.
		 * @param {object|Array} loopable - The object or array to be iterated.
		 * @param {function} fn - The function to call for each item.
		 * @param {object} [thisArg] - The value of `this` provided for the call to `fn`.
		 * @param {boolean} [reverse] - If true, iterates backward on the loopable.
		 */
		each: function(loopable, fn, thisArg, reverse) {
			var i, len, keys;
			if (helpers.isArray(loopable)) {
				len = loopable.length;
				if (reverse) {
					for (i = len - 1; i >= 0; i--) {
						fn.call(thisArg, loopable[i], i);
					}
				} else {
					for (i = 0; i < len; i++) {
						fn.call(thisArg, loopable[i], i);
					}
				}
			} else if (helpers.isObject(loopable)) {
				keys = Object.keys(loopable);
				len = keys.length;
				for (i = 0; i < len; i++) {
					fn.call(thisArg, loopable[keys[i]], keys[i]);
				}
			}
		},

		/**
		 * Returns true if the `a0` and `a1` arrays have the same content, else returns false.
		 * @see https://stackoverflow.com/a/14853974
		 * @param {Array} a0 - The array to compare
		 * @param {Array} a1 - The array to compare
		 * @returns {boolean}
		 */
		arrayEquals: function(a0, a1) {
			var i, ilen, v0, v1;

			if (!a0 || !a1 || a0.length !== a1.length) {
				return false;
			}

			for (i = 0, ilen = a0.length; i < ilen; ++i) {
				v0 = a0[i];
				v1 = a1[i];

				if (v0 instanceof Array && v1 instanceof Array) {
					if (!helpers.arrayEquals(v0, v1)) {
						return false;
					}
				} else if (v0 !== v1) {
					// NOTE: two different object instances will never be equal: {x:20} != {x:20}
					return false;
				}
			}

			return true;
		},

		/**
		 * Returns a deep copy of `source` without keeping references on objects and arrays.
		 * @param {*} source - The value to clone.
		 * @returns {*}
		 */
		clone: function(source) {
			if (helpers.isArray(source)) {
				return source.map(helpers.clone);
			}

			if (helpers.isObject(source)) {
				var target = {};
				var keys = Object.keys(source);
				var klen = keys.length;
				var k = 0;

				for (; k < klen; ++k) {
					target[keys[k]] = helpers.clone(source[keys[k]]);
				}

				return target;
			}

			return source;
		},

		/**
		 * The default merger when Chart.helpers.merge is called without merger option.
		 * Note(SB): also used by mergeConfig and mergeScaleConfig as fallback.
		 * @private
		 */
		_merger: function(key, target, source, options) {
			var tval = target[key];
			var sval = source[key];

			if (helpers.isObject(tval) && helpers.isObject(sval)) {
				helpers.merge(tval, sval, options);
			} else {
				target[key] = helpers.clone(sval);
			}
		},

		/**
		 * Merges source[key] in target[key] only if target[key] is undefined.
		 * @private
		 */
		_mergerIf: function(key, target, source) {
			var tval = target[key];
			var sval = source[key];

			if (helpers.isObject(tval) && helpers.isObject(sval)) {
				helpers.mergeIf(tval, sval);
			} else if (!target.hasOwnProperty(key)) {
				target[key] = helpers.clone(sval);
			}
		},

		/**
		 * Recursively deep copies `source` properties into `target` with the given `options`.
		 * IMPORTANT: `target` is not cloned and will be updated with `source` properties.
		 * @param {object} target - The target object in which all sources are merged into.
		 * @param {object|object[]} source - Object(s) to merge into `target`.
		 * @param {object} [options] - Merging options:
		 * @param {function} [options.merger] - The merge method (key, target, source, options)
		 * @returns {object} The `target` object.
		 */
		merge: function(target, source, options) {
			var sources = helpers.isArray(source) ? source : [source];
			var ilen = sources.length;
			var merge, i, keys, klen, k;

			if (!helpers.isObject(target)) {
				return target;
			}

			options = options || {};
			merge = options.merger || helpers._merger;

			for (i = 0; i < ilen; ++i) {
				source = sources[i];
				if (!helpers.isObject(source)) {
					continue;
				}

				keys = Object.keys(source);
				for (k = 0, klen = keys.length; k < klen; ++k) {
					merge(keys[k], target, source, options);
				}
			}

			return target;
		},

		/**
		 * Recursively deep copies `source` properties into `target` *only* if not defined in target.
		 * IMPORTANT: `target` is not cloned and will be updated with `source` properties.
		 * @param {object} target - The target object in which all sources are merged into.
		 * @param {object|object[]} source - Object(s) to merge into `target`.
		 * @returns {object} The `target` object.
		 */
		mergeIf: function(target, source) {
			return helpers.merge(target, source, {merger: helpers._mergerIf});
		},

		/**
		 * Applies the contents of two or more objects together into the first object.
		 * @param {object} target - The target object in which all objects are merged into.
		 * @param {object} arg1 - Object containing additional properties to merge in target.
		 * @param {object} argN - Additional objects containing properties to merge in target.
		 * @returns {object} The `target` object.
		 */
		extend: Object.assign || function(target) {
			return helpers.merge(target, [].slice.call(arguments, 1), {
				merger: function(key, dst, src) {
					dst[key] = src[key];
				}
			});
		},

		/**
		 * Basic javascript inheritance based on the model created in Backbone.js
		 */
		inherits: function(extensions) {
			var me = this;
			var ChartElement = (extensions && extensions.hasOwnProperty('constructor')) ? extensions.constructor : function() {
				return me.apply(this, arguments);
			};

			var Surrogate = function() {
				this.constructor = ChartElement;
			};

			Surrogate.prototype = me.prototype;
			ChartElement.prototype = new Surrogate();
			ChartElement.extend = helpers.inherits;

			if (extensions) {
				helpers.extend(ChartElement.prototype, extensions);
			}

			ChartElement.__super__ = me.prototype;
			return ChartElement;
		},

		_deprecated: function(scope, value, previous, current) {
			if (value !== undefined) {
				console.warn(scope + ': "' + previous +
					'" is deprecated. Please use "' + current + '" instead');
			}
		}
	};

	var helpers_core = helpers;

	// DEPRECATIONS

	/**
	 * Provided for backward compatibility, use Chart.helpers.callback instead.
	 * @function Chart.helpers.callCallback
	 * @deprecated since version 2.6.0
	 * @todo remove at version 3
	 * @private
	 */
	helpers.callCallback = helpers.callback;

	/**
	 * Provided for backward compatibility, use Array.prototype.indexOf instead.
	 * Array.prototype.indexOf compatibility: Chrome, Opera, Safari, FF1.5+, IE9+
	 * @function Chart.helpers.indexOf
	 * @deprecated since version 2.7.0
	 * @todo remove at version 3
	 * @private
	 */
	helpers.indexOf = function(array, item, fromIndex) {
		return Array.prototype.indexOf.call(array, item, fromIndex);
	};

	/**
	 * Provided for backward compatibility, use Chart.helpers.valueOrDefault instead.
	 * @function Chart.helpers.getValueOrDefault
	 * @deprecated since version 2.7.0
	 * @todo remove at version 3
	 * @private
	 */
	helpers.getValueOrDefault = helpers.valueOrDefault;

	/**
	 * Provided for backward compatibility, use Chart.helpers.valueAtIndexOrDefault instead.
	 * @function Chart.helpers.getValueAtIndexOrDefault
	 * @deprecated since version 2.7.0
	 * @todo remove at version 3
	 * @private
	 */
	helpers.getValueAtIndexOrDefault = helpers.valueAtIndexOrDefault;

	/**
	 * Easing functions adapted from Robert Penner's easing equations.
	 * @namespace Chart.helpers.easingEffects
	 * @see http://www.robertpenner.com/easing/
	 */
	var effects = {
		linear: function(t) {
			return t;
		},

		easeInQuad: function(t) {
			return t * t;
		},

		easeOutQuad: function(t) {
			return -t * (t - 2);
		},

		easeInOutQuad: function(t) {
			if ((t /= 0.5) < 1) {
				return 0.5 * t * t;
			}
			return -0.5 * ((--t) * (t - 2) - 1);
		},

		easeInCubic: function(t) {
			return t * t * t;
		},

		easeOutCubic: function(t) {
			return (t = t - 1) * t * t + 1;
		},

		easeInOutCubic: function(t) {
			if ((t /= 0.5) < 1) {
				return 0.5 * t * t * t;
			}
			return 0.5 * ((t -= 2) * t * t + 2);
		},

		easeInQuart: function(t) {
			return t * t * t * t;
		},

		easeOutQuart: function(t) {
			return -((t = t - 1) * t * t * t - 1);
		},

		easeInOutQuart: function(t) {
			if ((t /= 0.5) < 1) {
				return 0.5 * t * t * t * t;
			}
			return -0.5 * ((t -= 2) * t * t * t - 2);
		},

		easeInQuint: function(t) {
			return t * t * t * t * t;
		},

		easeOutQuint: function(t) {
			return (t = t - 1) * t * t * t * t + 1;
		},

		easeInOutQuint: function(t) {
			if ((t /= 0.5) < 1) {
				return 0.5 * t * t * t * t * t;
			}
			return 0.5 * ((t -= 2) * t * t * t * t + 2);
		},

		easeInSine: function(t) {
			return -Math.cos(t * (Math.PI / 2)) + 1;
		},

		easeOutSine: function(t) {
			return Math.sin(t * (Math.PI / 2));
		},

		easeInOutSine: function(t) {
			return -0.5 * (Math.cos(Math.PI * t) - 1);
		},

		easeInExpo: function(t) {
			return (t === 0) ? 0 : Math.pow(2, 10 * (t - 1));
		},

		easeOutExpo: function(t) {
			return (t === 1) ? 1 : -Math.pow(2, -10 * t) + 1;
		},

		easeInOutExpo: function(t) {
			if (t === 0) {
				return 0;
			}
			if (t === 1) {
				return 1;
			}
			if ((t /= 0.5) < 1) {
				return 0.5 * Math.pow(2, 10 * (t - 1));
			}
			return 0.5 * (-Math.pow(2, -10 * --t) + 2);
		},

		easeInCirc: function(t) {
			if (t >= 1) {
				return t;
			}
			return -(Math.sqrt(1 - t * t) - 1);
		},

		easeOutCirc: function(t) {
			return Math.sqrt(1 - (t = t - 1) * t);
		},

		easeInOutCirc: function(t) {
			if ((t /= 0.5) < 1) {
				return -0.5 * (Math.sqrt(1 - t * t) - 1);
			}
			return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
		},

		easeInElastic: function(t) {
			var s = 1.70158;
			var p = 0;
			var a = 1;
			if (t === 0) {
				return 0;
			}
			if (t === 1) {
				return 1;
			}
			if (!p) {
				p = 0.3;
			}
			if (a < 1) {
				a = 1;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(1 / a);
			}
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
		},

		easeOutElastic: function(t) {
			var s = 1.70158;
			var p = 0;
			var a = 1;
			if (t === 0) {
				return 0;
			}
			if (t === 1) {
				return 1;
			}
			if (!p) {
				p = 0.3;
			}
			if (a < 1) {
				a = 1;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(1 / a);
			}
			return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
		},

		easeInOutElastic: function(t) {
			var s = 1.70158;
			var p = 0;
			var a = 1;
			if (t === 0) {
				return 0;
			}
			if ((t /= 0.5) === 2) {
				return 1;
			}
			if (!p) {
				p = 0.45;
			}
			if (a < 1) {
				a = 1;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(1 / a);
			}
			if (t < 1) {
				return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
			}
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
		},
		easeInBack: function(t) {
			var s = 1.70158;
			return t * t * ((s + 1) * t - s);
		},

		easeOutBack: function(t) {
			var s = 1.70158;
			return (t = t - 1) * t * ((s + 1) * t + s) + 1;
		},

		easeInOutBack: function(t) {
			var s = 1.70158;
			if ((t /= 0.5) < 1) {
				return 0.5 * (t * t * (((s *= (1.525)) + 1) * t - s));
			}
			return 0.5 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
		},

		easeInBounce: function(t) {
			return 1 - effects.easeOutBounce(1 - t);
		},

		easeOutBounce: function(t) {
			if (t < (1 / 2.75)) {
				return 7.5625 * t * t;
			}
			if (t < (2 / 2.75)) {
				return 7.5625 * (t -= (1.5 / 2.75)) * t + 0.75;
			}
			if (t < (2.5 / 2.75)) {
				return 7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375;
			}
			return 7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375;
		},

		easeInOutBounce: function(t) {
			if (t < 0.5) {
				return effects.easeInBounce(t * 2) * 0.5;
			}
			return effects.easeOutBounce(t * 2 - 1) * 0.5 + 0.5;
		}
	};

	var helpers_easing = {
		effects: effects
	};

	// DEPRECATIONS

	/**
	 * Provided for backward compatibility, use Chart.helpers.easing.effects instead.
	 * @function Chart.helpers.easingEffects
	 * @deprecated since version 2.7.0
	 * @todo remove at version 3
	 * @private
	 */
	helpers_core.easingEffects = effects;

	var PI = Math.PI;
	var RAD_PER_DEG = PI / 180;
	var DOUBLE_PI = PI * 2;
	var HALF_PI = PI / 2;
	var QUARTER_PI = PI / 4;
	var TWO_THIRDS_PI = PI * 2 / 3;

	/**
	 * @namespace Chart.helpers.canvas
	 */
	var exports$1 = {
		/**
		 * Clears the entire canvas associated to the given `chart`.
		 * @param {Chart} chart - The chart for which to clear the canvas.
		 */
		clear: function(chart) {
			chart.ctx.clearRect(0, 0, chart.width, chart.height);
		},

		/**
		 * Creates a "path" for a rectangle with rounded corners at position (x, y) with a
		 * given size (width, height) and the same `radius` for all corners.
		 * @param {CanvasRenderingContext2D} ctx - The canvas 2D Context.
		 * @param {number} x - The x axis of the coordinate for the rectangle starting point.
		 * @param {number} y - The y axis of the coordinate for the rectangle starting point.
		 * @param {number} width - The rectangle's width.
		 * @param {number} height - The rectangle's height.
		 * @param {number} radius - The rounded amount (in pixels) for the four corners.
		 * @todo handle `radius` as top-left, top-right, bottom-right, bottom-left array/object?
		 */
		roundedRect: function(ctx, x, y, width, height, radius) {
			if (radius) {
				var r = Math.min(radius, height / 2, width / 2);
				var left = x + r;
				var top = y + r;
				var right = x + width - r;
				var bottom = y + height - r;

				ctx.moveTo(x, top);
				if (left < right && top < bottom) {
					ctx.arc(left, top, r, -PI, -HALF_PI);
					ctx.arc(right, top, r, -HALF_PI, 0);
					ctx.arc(right, bottom, r, 0, HALF_PI);
					ctx.arc(left, bottom, r, HALF_PI, PI);
				} else if (left < right) {
					ctx.moveTo(left, y);
					ctx.arc(right, top, r, -HALF_PI, HALF_PI);
					ctx.arc(left, top, r, HALF_PI, PI + HALF_PI);
				} else if (top < bottom) {
					ctx.arc(left, top, r, -PI, 0);
					ctx.arc(left, bottom, r, 0, PI);
				} else {
					ctx.arc(left, top, r, -PI, PI);
				}
				ctx.closePath();
				ctx.moveTo(x, y);
			} else {
				ctx.rect(x, y, width, height);
			}
		},

		drawPoint: function(ctx, style, radius, x, y, rotation) {
			var type, xOffset, yOffset, size, cornerRadius;
			var rad = (rotation || 0) * RAD_PER_DEG;

			if (style && typeof style === 'object') {
				type = style.toString();
				if (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]') {
					ctx.save();
					ctx.translate(x, y);
					ctx.rotate(rad);
					ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
					ctx.restore();
					return;
				}
			}

			if (isNaN(radius) || radius <= 0) {
				return;
			}

			ctx.beginPath();

			switch (style) {
			// Default includes circle
			default:
				ctx.arc(x, y, radius, 0, DOUBLE_PI);
				ctx.closePath();
				break;
			case 'triangle':
				ctx.moveTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
				rad += TWO_THIRDS_PI;
				ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
				rad += TWO_THIRDS_PI;
				ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
				ctx.closePath();
				break;
			case 'rectRounded':
				// NOTE: the rounded rect implementation changed to use `arc` instead of
				// `quadraticCurveTo` since it generates better results when rect is
				// almost a circle. 0.516 (instead of 0.5) produces results with visually
				// closer proportion to the previous impl and it is inscribed in the
				// circle with `radius`. For more details, see the following PRs:
				// https://github.com/chartjs/Chart.js/issues/5597
				// https://github.com/chartjs/Chart.js/issues/5858
				cornerRadius = radius * 0.516;
				size = radius - cornerRadius;
				xOffset = Math.cos(rad + QUARTER_PI) * size;
				yOffset = Math.sin(rad + QUARTER_PI) * size;
				ctx.arc(x - xOffset, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
				ctx.arc(x + yOffset, y - xOffset, cornerRadius, rad - HALF_PI, rad);
				ctx.arc(x + xOffset, y + yOffset, cornerRadius, rad, rad + HALF_PI);
				ctx.arc(x - yOffset, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
				ctx.closePath();
				break;
			case 'rect':
				if (!rotation) {
					size = Math.SQRT1_2 * radius;
					ctx.rect(x - size, y - size, 2 * size, 2 * size);
					break;
				}
				rad += QUARTER_PI;
				/* falls through */
			case 'rectRot':
				xOffset = Math.cos(rad) * radius;
				yOffset = Math.sin(rad) * radius;
				ctx.moveTo(x - xOffset, y - yOffset);
				ctx.lineTo(x + yOffset, y - xOffset);
				ctx.lineTo(x + xOffset, y + yOffset);
				ctx.lineTo(x - yOffset, y + xOffset);
				ctx.closePath();
				break;
			case 'crossRot':
				rad += QUARTER_PI;
				/* falls through */
			case 'cross':
				xOffset = Math.cos(rad) * radius;
				yOffset = Math.sin(rad) * radius;
				ctx.moveTo(x - xOffset, y - yOffset);
				ctx.lineTo(x + xOffset, y + yOffset);
				ctx.moveTo(x + yOffset, y - xOffset);
				ctx.lineTo(x - yOffset, y + xOffset);
				break;
			case 'star':
				xOffset = Math.cos(rad) * radius;
				yOffset = Math.sin(rad) * radius;
				ctx.moveTo(x - xOffset, y - yOffset);
				ctx.lineTo(x + xOffset, y + yOffset);
				ctx.moveTo(x + yOffset, y - xOffset);
				ctx.lineTo(x - yOffset, y + xOffset);
				rad += QUARTER_PI;
				xOffset = Math.cos(rad) * radius;
				yOffset = Math.sin(rad) * radius;
				ctx.moveTo(x - xOffset, y - yOffset);
				ctx.lineTo(x + xOffset, y + yOffset);
				ctx.moveTo(x + yOffset, y - xOffset);
				ctx.lineTo(x - yOffset, y + xOffset);
				break;
			case 'line':
				xOffset = Math.cos(rad) * radius;
				yOffset = Math.sin(rad) * radius;
				ctx.moveTo(x - xOffset, y - yOffset);
				ctx.lineTo(x + xOffset, y + yOffset);
				break;
			case 'dash':
				ctx.moveTo(x, y);
				ctx.lineTo(x + Math.cos(rad) * radius, y + Math.sin(rad) * radius);
				break;
			}

			ctx.fill();
			ctx.stroke();
		},

		/**
		 * Returns true if the point is inside the rectangle
		 * @param {object} point - The point to test
		 * @param {object} area - The rectangle
		 * @returns {boolean}
		 * @private
		 */
		_isPointInArea: function(point, area) {
			var epsilon = 1e-6; // 1e-6 is margin in pixels for accumulated error.

			return point.x > area.left - epsilon && point.x < area.right + epsilon &&
				point.y > area.top - epsilon && point.y < area.bottom + epsilon;
		},

		clipArea: function(ctx, area) {
			ctx.save();
			ctx.beginPath();
			ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
			ctx.clip();
		},

		unclipArea: function(ctx) {
			ctx.restore();
		},

		lineTo: function(ctx, previous, target, flip) {
			var stepped = target.steppedLine;
			if (stepped) {
				if (stepped === 'middle') {
					var midpoint = (previous.x + target.x) / 2.0;
					ctx.lineTo(midpoint, flip ? target.y : previous.y);
					ctx.lineTo(midpoint, flip ? previous.y : target.y);
				} else if ((stepped === 'after' && !flip) || (stepped !== 'after' && flip)) {
					ctx.lineTo(previous.x, target.y);
				} else {
					ctx.lineTo(target.x, previous.y);
				}
				ctx.lineTo(target.x, target.y);
				return;
			}

			if (!target.tension) {
				ctx.lineTo(target.x, target.y);
				return;
			}

			ctx.bezierCurveTo(
				flip ? previous.controlPointPreviousX : previous.controlPointNextX,
				flip ? previous.controlPointPreviousY : previous.controlPointNextY,
				flip ? target.controlPointNextX : target.controlPointPreviousX,
				flip ? target.controlPointNextY : target.controlPointPreviousY,
				target.x,
				target.y);
		}
	};

	var helpers_canvas = exports$1;

	// DEPRECATIONS

	/**
	 * Provided for backward compatibility, use Chart.helpers.canvas.clear instead.
	 * @namespace Chart.helpers.clear
	 * @deprecated since version 2.7.0
	 * @todo remove at version 3
	 * @private
	 */
	helpers_core.clear = exports$1.clear;

	/**
	 * Provided for backward compatibility, use Chart.helpers.canvas.roundedRect instead.
	 * @namespace Chart.helpers.drawRoundedRectangle
	 * @deprecated since version 2.7.0
	 * @todo remove at version 3
	 * @private
	 */
	helpers_core.drawRoundedRectangle = function(ctx) {
		ctx.beginPath();
		exports$1.roundedRect.apply(exports$1, arguments);
	};

	var defaults = {
		/**
		 * @private
		 */
		_set: function(scope, values) {
			return helpers_core.merge(this[scope] || (this[scope] = {}), values);
		}
	};

	// TODO(v3): remove 'global' from namespace.  all default are global and
	// there's inconsistency around which options are under 'global'
	defaults._set('global', {
		defaultColor: 'rgba(0,0,0,0.1)',
		defaultFontColor: '#666',
		defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
		defaultFontSize: 12,
		defaultFontStyle: 'normal',
		defaultLineHeight: 1.2,
		showLines: true
	});

	var core_defaults = defaults;

	var valueOrDefault = helpers_core.valueOrDefault;

	/**
	 * Converts the given font object into a CSS font string.
	 * @param {object} font - A font object.
	 * @return {string} The CSS font string. See https://developer.mozilla.org/en-US/docs/Web/CSS/font
	 * @private
	 */
	function toFontString(font) {
		if (!font || helpers_core.isNullOrUndef(font.size) || helpers_core.isNullOrUndef(font.family)) {
			return null;
		}

		return (font.style ? font.style + ' ' : '')
			+ (font.weight ? font.weight + ' ' : '')
			+ font.size + 'px '
			+ font.family;
	}

	/**
	 * @alias Chart.helpers.options
	 * @namespace
	 */
	var helpers_options = {
		/**
		 * Converts the given line height `value` in pixels for a specific font `size`.
		 * @param {number|string} value - The lineHeight to parse (eg. 1.6, '14px', '75%', '1.6em').
		 * @param {number} size - The font size (in pixels) used to resolve relative `value`.
		 * @returns {number} The effective line height in pixels (size * 1.2 if value is invalid).
		 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
		 * @since 2.7.0
		 */
		toLineHeight: function(value, size) {
			var matches = ('' + value).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
			if (!matches || matches[1] === 'normal') {
				return size * 1.2;
			}

			value = +matches[2];

			switch (matches[3]) {
			case 'px':
				return value;
			case '%':
				value /= 100;
				break;
			}

			return size * value;
		},

		/**
		 * Converts the given value into a padding object with pre-computed width/height.
		 * @param {number|object} value - If a number, set the value to all TRBL component,
		 *  else, if and object, use defined properties and sets undefined ones to 0.
		 * @returns {object} The padding values (top, right, bottom, left, width, height)
		 * @since 2.7.0
		 */
		toPadding: function(value) {
			var t, r, b, l;

			if (helpers_core.isObject(value)) {
				t = +value.top || 0;
				r = +value.right || 0;
				b = +value.bottom || 0;
				l = +value.left || 0;
			} else {
				t = r = b = l = +value || 0;
			}

			return {
				top: t,
				right: r,
				bottom: b,
				left: l,
				height: t + b,
				width: l + r
			};
		},

		/**
		 * Parses font options and returns the font object.
		 * @param {object} options - A object that contains font options to be parsed.
		 * @return {object} The font object.
		 * @todo Support font.* options and renamed to toFont().
		 * @private
		 */
		_parseFont: function(options) {
			var globalDefaults = core_defaults.global;
			var size = valueOrDefault(options.fontSize, globalDefaults.defaultFontSize);
			var font = {
				family: valueOrDefault(options.fontFamily, globalDefaults.defaultFontFamily),
				lineHeight: helpers_core.options.toLineHeight(valueOrDefault(options.lineHeight, globalDefaults.defaultLineHeight), size),
				size: size,
				style: valueOrDefault(options.fontStyle, globalDefaults.defaultFontStyle),
				weight: null,
				string: ''
			};

			font.string = toFontString(font);
			return font;
		},

		/**
		 * Evaluates the given `inputs` sequentially and returns the first defined value.
		 * @param {Array} inputs - An array of values, falling back to the last value.
		 * @param {object} [context] - If defined and the current value is a function, the value
		 * is called with `context` as first argument and the result becomes the new input.
		 * @param {number} [index] - If defined and the current value is an array, the value
		 * at `index` become the new input.
		 * @param {object} [info] - object to return information about resolution in
		 * @param {boolean} [info.cacheable] - Will be set to `false` if option is not cacheable.
		 * @since 2.7.0
		 */
		resolve: function(inputs, context, index, info) {
			var cacheable = true;
			var i, ilen, value;

			for (i = 0, ilen = inputs.length; i < ilen; ++i) {
				value = inputs[i];
				if (value === undefined) {
					continue;
				}
				if (context !== undefined && typeof value === 'function') {
					value = value(context);
					cacheable = false;
				}
				if (index !== undefined && helpers_core.isArray(value)) {
					value = value[index];
					cacheable = false;
				}
				if (value !== undefined) {
					if (info && !cacheable) {
						info.cacheable = false;
					}
					return value;
				}
			}
		}
	};

	/**
	 * @alias Chart.helpers.math
	 * @namespace
	 */
	var exports$2 = {
		/**
		 * Returns an array of factors sorted from 1 to sqrt(value)
		 * @private
		 */
		_factorize: function(value) {
			var result = [];
			var sqrt = Math.sqrt(value);
			var i;

			for (i = 1; i < sqrt; i++) {
				if (value % i === 0) {
					result.push(i);
					result.push(value / i);
				}
			}
			if (sqrt === (sqrt | 0)) { // if value is a square number
				result.push(sqrt);
			}

			result.sort(function(a, b) {
				return a - b;
			}).pop();
			return result;
		},

		log10: Math.log10 || function(x) {
			var exponent = Math.log(x) * Math.LOG10E; // Math.LOG10E = 1 / Math.LN10.
			// Check for whole powers of 10,
			// which due to floating point rounding error should be corrected.
			var powerOf10 = Math.round(exponent);
			var isPowerOf10 = x === Math.pow(10, powerOf10);

			return isPowerOf10 ? powerOf10 : exponent;
		}
	};

	var helpers_math = exports$2;

	// DEPRECATIONS

	/**
	 * Provided for backward compatibility, use Chart.helpers.math.log10 instead.
	 * @namespace Chart.helpers.log10
	 * @deprecated since version 2.9.0
	 * @todo remove at version 3
	 * @private
	 */
	helpers_core.log10 = exports$2.log10;

	var getRtlAdapter = function(rectX, width) {
		return {
			x: function(x) {
				return rectX + rectX + width - x;
			},
			setWidth: function(w) {
				width = w;
			},
			textAlign: function(align) {
				if (align === 'center') {
					return align;
				}
				return align === 'right' ? 'left' : 'right';
			},
			xPlus: function(x, value) {
				return x - value;
			},
			leftForLtr: function(x, itemWidth) {
				return x - itemWidth;
			},
		};
	};

	var getLtrAdapter = function() {
		return {
			x: function(x) {
				return x;
			},
			setWidth: function(w) { // eslint-disable-line no-unused-vars
			},
			textAlign: function(align) {
				return align;
			},
			xPlus: function(x, value) {
				return x + value;
			},
			leftForLtr: function(x, _itemWidth) { // eslint-disable-line no-unused-vars
				return x;
			},
		};
	};

	var getAdapter = function(rtl, rectX, width) {
		return rtl ? getRtlAdapter(rectX, width) : getLtrAdapter();
	};

	var overrideTextDirection = function(ctx, direction) {
		var style, original;
		if (direction === 'ltr' || direction === 'rtl') {
			style = ctx.canvas.style;
			original = [
				style.getPropertyValue('direction'),
				style.getPropertyPriority('direction'),
			];

			style.setProperty('direction', direction, 'important');
			ctx.prevTextDirection = original;
		}
	};

	var restoreTextDirection = function(ctx) {
		var original = ctx.prevTextDirection;
		if (original !== undefined) {
			delete ctx.prevTextDirection;
			ctx.canvas.style.setProperty('direction', original[0], original[1]);
		}
	};

	var helpers_rtl = {
		getRtlAdapter: getAdapter,
		overrideTextDirection: overrideTextDirection,
		restoreTextDirection: restoreTextDirection,
	};

	var helpers$1 = helpers_core;
	var easing = helpers_easing;
	var canvas = helpers_canvas;
	var options = helpers_options;
	var math = helpers_math;
	var rtl = helpers_rtl;
	helpers$1.easing = easing;
	helpers$1.canvas = canvas;
	helpers$1.options = options;
	helpers$1.math = math;
	helpers$1.rtl = rtl;

	function interpolate(start, view, model, ease) {
		var keys = Object.keys(model);
		var i, ilen, key, actual, origin, target, type, c0, c1;

		for (i = 0, ilen = keys.length; i < ilen; ++i) {
			key = keys[i];

			target = model[key];

			// if a value is added to the model after pivot() has been called, the view
			// doesn't contain it, so let's initialize the view to the target value.
			if (!view.hasOwnProperty(key)) {
				view[key] = target;
			}

			actual = view[key];

			if (actual === target || key[0] === '_') {
				continue;
			}

			if (!start.hasOwnProperty(key)) {
				start[key] = actual;
			}

			origin = start[key];

			type = typeof target;

			if (type === typeof origin) {
				if (type === 'string') {
					c0 = chartjsColor(origin);
					if (c0.valid) {
						c1 = chartjsColor(target);
						if (c1.valid) {
							view[key] = c1.mix(c0, ease).rgbString();
							continue;
						}
					}
				} else if (helpers$1.isFinite(origin) && helpers$1.isFinite(target)) {
					view[key] = origin + (target - origin) * ease;
					continue;
				}
			}

			view[key] = target;
		}
	}

	var Element = function(configuration) {
		helpers$1.extend(this, configuration);
		this.initialize.apply(this, arguments);
	};

	helpers$1.extend(Element.prototype, {
		_type: undefined,

		initialize: function() {
			this.hidden = false;
		},

		pivot: function() {
			var me = this;
			if (!me._view) {
				me._view = helpers$1.extend({}, me._model);
			}
			me._start = {};
			return me;
		},

		transition: function(ease) {
			var me = this;
			var model = me._model;
			var start = me._start;
			var view = me._view;

			// No animation -> No Transition
			if (!model || ease === 1) {
				me._view = helpers$1.extend({}, model);
				me._start = null;
				return me;
			}

			if (!view) {
				view = me._view = {};
			}

			if (!start) {
				start = me._start = {};
			}

			interpolate(start, view, model, ease);

			return me;
		},

		tooltipPosition: function() {
			return {
				x: this._model.x,
				y: this._model.y
			};
		},

		hasValue: function() {
			return helpers$1.isNumber(this._model.x) && helpers$1.isNumber(this._model.y);
		}
	});

	Element.extend = helpers$1.inherits;

	var core_element = Element;

	var exports$3 = core_element.extend({
		chart: null, // the animation associated chart instance
		currentStep: 0, // the current animation step
		numSteps: 60, // default number of steps
		easing: '', // the easing to use for this animation
		render: null, // render function used by the animation service

		onAnimationProgress: null, // user specified callback to fire on each step of the animation
		onAnimationComplete: null, // user specified callback to fire when the animation finishes
	});

	var core_animation = exports$3;

	// DEPRECATIONS

	/**
	 * Provided for backward compatibility, use Chart.Animation instead
	 * @prop Chart.Animation#animationObject
	 * @deprecated since version 2.6.0
	 * @todo remove at version 3
	 */
	Object.defineProperty(exports$3.prototype, 'animationObject', {
		get: function() {
			return this;
		}
	});

	/**
	 * Provided for backward compatibility, use Chart.Animation#chart instead
	 * @prop Chart.Animation#chartInstance
	 * @deprecated since version 2.6.0
	 * @todo remove at version 3
	 */
	Object.defineProperty(exports$3.prototype, 'chartInstance', {
		get: function() {
			return this.chart;
		},
		set: function(value) {
			this.chart = value;
		}
	});

	core_defaults._set('global', {
		animation: {
			duration: 1000,
			easing: 'easeOutQuart',
			onProgress: helpers$1.noop,
			onComplete: helpers$1.noop
		}
	});

	var core_animations = {
		animations: [],
		request: null,

		/**
		 * @param {Chart} chart - The chart to animate.
		 * @param {Chart.Animation} animation - The animation that we will animate.
		 * @param {number} duration - The animation duration in ms.
		 * @param {boolean} lazy - if true, the chart is not marked as animating to enable more responsive interactions
		 */
		addAnimation: function(chart, animation, duration, lazy) {
			var animations = this.animations;
			var i, ilen;

			animation.chart = chart;
			animation.startTime = Date.now();
			animation.duration = duration;

			if (!lazy) {
				chart.animating = true;
			}

			for (i = 0, ilen = animations.length; i < ilen; ++i) {
				if (animations[i].chart === chart) {
					animations[i] = animation;
					return;
				}
			}

			animations.push(animation);

			// If there are no animations queued, manually kickstart a digest, for lack of a better word
			if (animations.length === 1) {
				this.requestAnimationFrame();
			}
		},

		cancelAnimation: function(chart) {
			var index = helpers$1.findIndex(this.animations, function(animation) {
				return animation.chart === chart;
			});

			if (index !== -1) {
				this.animations.splice(index, 1);
				chart.animating = false;
			}
		},

		requestAnimationFrame: function() {
			var me = this;
			if (me.request === null) {
				// Skip animation frame requests until the active one is executed.
				// This can happen when processing mouse events, e.g. 'mousemove'
				// and 'mouseout' events will trigger multiple renders.
				me.request = helpers$1.requestAnimFrame.call(window, function() {
					me.request = null;
					me.startDigest();
				});
			}
		},

		/**
		 * @private
		 */
		startDigest: function() {
			var me = this;

			me.advance();

			// Do we have more stuff to animate?
			if (me.animations.length > 0) {
				me.requestAnimationFrame();
			}
		},

		/**
		 * @private
		 */
		advance: function() {
			var animations = this.animations;
			var animation, chart, numSteps, nextStep;
			var i = 0;

			// 1 animation per chart, so we are looping charts here
			while (i < animations.length) {
				animation = animations[i];
				chart = animation.chart;
				numSteps = animation.numSteps;

				// Make sure that currentStep starts at 1
				// https://github.com/chartjs/Chart.js/issues/6104
				nextStep = Math.floor((Date.now() - animation.startTime) / animation.duration * numSteps) + 1;
				animation.currentStep = Math.min(nextStep, numSteps);

				helpers$1.callback(animation.render, [chart, animation], chart);
				helpers$1.callback(animation.onAnimationProgress, [animation], chart);

				if (animation.currentStep >= numSteps) {
					helpers$1.callback(animation.onAnimationComplete, [animation], chart);
					chart.animating = false;
					animations.splice(i, 1);
				} else {
					++i;
				}
			}
		}
	};

	var resolve = helpers$1.options.resolve;

	var arrayEvents = ['push', 'pop', 'shift', 'splice', 'unshift'];

	/**
	 * Hooks the array methods that add or remove values ('push', pop', 'shift', 'splice',
	 * 'unshift') and notify the listener AFTER the array has been altered. Listeners are
	 * called on the 'onData*' callbacks (e.g. onDataPush, etc.) with same arguments.
	 */
	function listenArrayEvents(array, listener) {
		if (array._chartjs) {
			array._chartjs.listeners.push(listener);
			return;
		}

		Object.defineProperty(array, '_chartjs', {
			configurable: true,
			enumerable: false,
			value: {
				listeners: [listener]
			}
		});

		arrayEvents.forEach(function(key) {
			var method = 'onData' + key.charAt(0).toUpperCase() + key.slice(1);
			var base = array[key];

			Object.defineProperty(array, key, {
				configurable: true,
				enumerable: false,
				value: function() {
					var args = Array.prototype.slice.call(arguments);
					var res = base.apply(this, args);

					helpers$1.each(array._chartjs.listeners, function(object) {
						if (typeof object[method] === 'function') {
							object[method].apply(object, args);
						}
					});

					return res;
				}
			});
		});
	}

	/**
	 * Removes the given array event listener and cleanup extra attached properties (such as
	 * the _chartjs stub and overridden methods) if array doesn't have any more listeners.
	 */
	function unlistenArrayEvents(array, listener) {
		var stub = array._chartjs;
		if (!stub) {
			return;
		}

		var listeners = stub.listeners;
		var index = listeners.indexOf(listener);
		if (index !== -1) {
			listeners.splice(index, 1);
		}

		if (listeners.length > 0) {
			return;
		}

		arrayEvents.forEach(function(key) {
			delete array[key];
		});

		delete array._chartjs;
	}

	// Base class for all dataset controllers (line, bar, etc)
	var DatasetController = function(chart, datasetIndex) {
		this.initialize(chart, datasetIndex);
	};

	helpers$1.extend(DatasetController.prototype, {

		/**
		 * Element type used to generate a meta dataset (e.g. Chart.element.Line).
		 * @type {Chart.core.element}
		 */
		datasetElementType: null,

		/**
		 * Element type used to generate a meta data (e.g. Chart.element.Point).
		 * @type {Chart.core.element}
		 */
		dataElementType: null,

		/**
		 * Dataset element option keys to be resolved in _resolveDatasetElementOptions.
		 * A derived controller may override this to resolve controller-specific options.
		 * The keys defined here are for backward compatibility for legend styles.
		 * @private
		 */
		_datasetElementOptions: [
			'backgroundColor',
			'borderCapStyle',
			'borderColor',
			'borderDash',
			'borderDashOffset',
			'borderJoinStyle',
			'borderWidth'
		],

		/**
		 * Data element option keys to be resolved in _resolveDataElementOptions.
		 * A derived controller may override this to resolve controller-specific options.
		 * The keys defined here are for backward compatibility for legend styles.
		 * @private
		 */
		_dataElementOptions: [
			'backgroundColor',
			'borderColor',
			'borderWidth',
			'pointStyle'
		],

		initialize: function(chart, datasetIndex) {
			var me = this;
			me.chart = chart;
			me.index = datasetIndex;
			me.linkScales();
			me.addElements();
			me._type = me.getMeta().type;
		},

		updateIndex: function(datasetIndex) {
			this.index = datasetIndex;
		},

		linkScales: function() {
			var me = this;
			var meta = me.getMeta();
			var chart = me.chart;
			var scales = chart.scales;
			var dataset = me.getDataset();
			var scalesOpts = chart.options.scales;

			if (meta.xAxisID === null || !(meta.xAxisID in scales) || dataset.xAxisID) {
				meta.xAxisID = dataset.xAxisID || scalesOpts.xAxes[0].id;
			}
			if (meta.yAxisID === null || !(meta.yAxisID in scales) || dataset.yAxisID) {
				meta.yAxisID = dataset.yAxisID || scalesOpts.yAxes[0].id;
			}
		},

		getDataset: function() {
			return this.chart.data.datasets[this.index];
		},

		getMeta: function() {
			return this.chart.getDatasetMeta(this.index);
		},

		getScaleForId: function(scaleID) {
			return this.chart.scales[scaleID];
		},

		/**
		 * @private
		 */
		_getValueScaleId: function() {
			return this.getMeta().yAxisID;
		},

		/**
		 * @private
		 */
		_getIndexScaleId: function() {
			return this.getMeta().xAxisID;
		},

		/**
		 * @private
		 */
		_getValueScale: function() {
			return this.getScaleForId(this._getValueScaleId());
		},

		/**
		 * @private
		 */
		_getIndexScale: function() {
			return this.getScaleForId(this._getIndexScaleId());
		},

		reset: function() {
			this._update(true);
		},

		/**
		 * @private
		 */
		destroy: function() {
			if (this._data) {
				unlistenArrayEvents(this._data, this);
			}
		},

		createMetaDataset: function() {
			var me = this;
			var type = me.datasetElementType;
			return type && new type({
				_chart: me.chart,
				_datasetIndex: me.index
			});
		},

		createMetaData: function(index) {
			var me = this;
			var type = me.dataElementType;
			return type && new type({
				_chart: me.chart,
				_datasetIndex: me.index,
				_index: index
			});
		},

		addElements: function() {
			var me = this;
			var meta = me.getMeta();
			var data = me.getDataset().data || [];
			var metaData = meta.data;
			var i, ilen;

			for (i = 0, ilen = data.length; i < ilen; ++i) {
				metaData[i] = metaData[i] || me.createMetaData(i);
			}

			meta.dataset = meta.dataset || me.createMetaDataset();
		},

		addElementAndReset: function(index) {
			var element = this.createMetaData(index);
			this.getMeta().data.splice(index, 0, element);
			this.updateElement(element, index, true);
		},

		buildOrUpdateElements: function() {
			var me = this;
			var dataset = me.getDataset();
			var data = dataset.data || (dataset.data = []);

			// In order to correctly handle data addition/deletion animation (an thus simulate
			// real-time charts), we need to monitor these data modifications and synchronize
			// the internal meta data accordingly.
			if (me._data !== data) {
				if (me._data) {
					// This case happens when the user replaced the data array instance.
					unlistenArrayEvents(me._data, me);
				}

				if (data && Object.isExtensible(data)) {
					listenArrayEvents(data, me);
				}
				me._data = data;
			}

			// Re-sync meta data in case the user replaced the data array or if we missed
			// any updates and so make sure that we handle number of datapoints changing.
			me.resyncElements();
		},

		/**
		 * Returns the merged user-supplied and default dataset-level options
		 * @private
		 */
		_configure: function() {
			var me = this;
			me._config = helpers$1.merge({}, [
				me.chart.options.datasets[me._type],
				me.getDataset(),
			], {
				merger: function(key, target, source) {
					if (key !== '_meta' && key !== 'data') {
						helpers$1._merger(key, target, source);
					}
				}
			});
		},

		_update: function(reset) {
			var me = this;
			me._configure();
			me._cachedDataOpts = null;
			me.update(reset);
		},

		update: helpers$1.noop,

		transition: function(easingValue) {
			var meta = this.getMeta();
			var elements = meta.data || [];
			var ilen = elements.length;
			var i = 0;

			for (; i < ilen; ++i) {
				elements[i].transition(easingValue);
			}

			if (meta.dataset) {
				meta.dataset.transition(easingValue);
			}
		},

		draw: function() {
			var meta = this.getMeta();
			var elements = meta.data || [];
			var ilen = elements.length;
			var i = 0;

			if (meta.dataset) {
				meta.dataset.draw();
			}

			for (; i < ilen; ++i) {
				elements[i].draw();
			}
		},

		/**
		 * Returns a set of predefined style properties that should be used to represent the dataset
		 * or the data if the index is specified
		 * @param {number} index - data index
		 * @return {IStyleInterface} style object
		 */
		getStyle: function(index) {
			var me = this;
			var meta = me.getMeta();
			var dataset = meta.dataset;
			var style;

			me._configure();
			if (dataset && index === undefined) {
				style = me._resolveDatasetElementOptions(dataset || {});
			} else {
				index = index || 0;
				style = me._resolveDataElementOptions(meta.data[index] || {}, index);
			}

			if (style.fill === false || style.fill === null) {
				style.backgroundColor = 'rgba(0,0,0,0)';
			}

			return style;
		},

		/**
		 * @private
		 */
		_resolveDatasetElementOptions: function(element, hover) {
			var me = this;
			var chart = me.chart;
			var datasetOpts = me._config;
			var custom = element.custom || {};
			var options = chart.options.elements[me.datasetElementType.prototype._type] || {};
			var elementOptions = me._datasetElementOptions;
			var values = {};
			var i, ilen, key, readKey;

			// Scriptable options
			var context = {
				chart: chart,
				dataset: me.getDataset(),
				datasetIndex: me.index,
				hover: hover
			};

			for (i = 0, ilen = elementOptions.length; i < ilen; ++i) {
				key = elementOptions[i];
				readKey = hover ? 'hover' + key.charAt(0).toUpperCase() + key.slice(1) : key;
				values[key] = resolve([
					custom[readKey],
					datasetOpts[readKey],
					options[readKey]
				], context);
			}

			return values;
		},

		/**
		 * @private
		 */
		_resolveDataElementOptions: function(element, index) {
			var me = this;
			var custom = element && element.custom;
			var cached = me._cachedDataOpts;
			if (cached && !custom) {
				return cached;
			}
			var chart = me.chart;
			var datasetOpts = me._config;
			var options = chart.options.elements[me.dataElementType.prototype._type] || {};
			var elementOptions = me._dataElementOptions;
			var values = {};

			// Scriptable options
			var context = {
				chart: chart,
				dataIndex: index,
				dataset: me.getDataset(),
				datasetIndex: me.index
			};

			// `resolve` sets cacheable to `false` if any option is indexed or scripted
			var info = {cacheable: !custom};

			var keys, i, ilen, key;

			custom = custom || {};

			if (helpers$1.isArray(elementOptions)) {
				for (i = 0, ilen = elementOptions.length; i < ilen; ++i) {
					key = elementOptions[i];
					values[key] = resolve([
						custom[key],
						datasetOpts[key],
						options[key]
					], context, index, info);
				}
			} else {
				keys = Object.keys(elementOptions);
				for (i = 0, ilen = keys.length; i < ilen; ++i) {
					key = keys[i];
					values[key] = resolve([
						custom[key],
						datasetOpts[elementOptions[key]],
						datasetOpts[key],
						options[key]
					], context, index, info);
				}
			}

			if (info.cacheable) {
				me._cachedDataOpts = Object.freeze(values);
			}

			return values;
		},

		removeHoverStyle: function(element) {
			helpers$1.merge(element._model, element.$previousStyle || {});
			delete element.$previousStyle;
		},

		setHoverStyle: function(element) {
			var dataset = this.chart.data.datasets[element._datasetIndex];
			var index = element._index;
			var custom = element.custom || {};
			var model = element._model;
			var getHoverColor = helpers$1.getHoverColor;

			element.$previousStyle = {
				backgroundColor: model.backgroundColor,
				borderColor: model.borderColor,
				borderWidth: model.borderWidth
			};

			model.backgroundColor = resolve([custom.hoverBackgroundColor, dataset.hoverBackgroundColor, getHoverColor(model.backgroundColor)], undefined, index);
			model.borderColor = resolve([custom.hoverBorderColor, dataset.hoverBorderColor, getHoverColor(model.borderColor)], undefined, index);
			model.borderWidth = resolve([custom.hoverBorderWidth, dataset.hoverBorderWidth, model.borderWidth], undefined, index);
		},

		/**
		 * @private
		 */
		_removeDatasetHoverStyle: function() {
			var element = this.getMeta().dataset;

			if (element) {
				this.removeHoverStyle(element);
			}
		},

		/**
		 * @private
		 */
		_setDatasetHoverStyle: function() {
			var element = this.getMeta().dataset;
			var prev = {};
			var i, ilen, key, keys, hoverOptions, model;

			if (!element) {
				return;
			}

			model = element._model;
			hoverOptions = this._resolveDatasetElementOptions(element, true);

			keys = Object.keys(hoverOptions);
			for (i = 0, ilen = keys.length; i < ilen; ++i) {
				key = keys[i];
				prev[key] = model[key];
				model[key] = hoverOptions[key];
			}

			element.$previousStyle = prev;
		},

		/**
		 * @private
		 */
		resyncElements: function() {
			var me = this;
			var meta = me.getMeta();
			var data = me.getDataset().data;
			var numMeta = meta.data.length;
			var numData = data.length;

			if (numData < numMeta) {
				meta.data.splice(numData, numMeta - numData);
			} else if (numData > numMeta) {
				me.insertElements(numMeta, numData - numMeta);
			}
		},

		/**
		 * @private
		 */
		insertElements: function(start, count) {
			for (var i = 0; i < count; ++i) {
				this.addElementAndReset(start + i);
			}
		},

		/**
		 * @private
		 */
		onDataPush: function() {
			var count = arguments.length;
			this.insertElements(this.getDataset().data.length - count, count);
		},

		/**
		 * @private
		 */
		onDataPop: function() {
			this.getMeta().data.pop();
		},

		/**
		 * @private
		 */
		onDataShift: function() {
			this.getMeta().data.shift();
		},

		/**
		 * @private
		 */
		onDataSplice: function(start, count) {
			this.getMeta().data.splice(start, count);
			this.insertElements(start, arguments.length - 2);
		},

		/**
		 * @private
		 */
		onDataUnshift: function() {
			this.insertElements(0, arguments.length);
		}
	});

	DatasetController.extend = helpers$1.inherits;

	var core_datasetController = DatasetController;

	var TAU = Math.PI * 2;

	core_defaults._set('global', {
		elements: {
			arc: {
				backgroundColor: core_defaults.global.defaultColor,
				borderColor: '#fff',
				borderWidth: 2,
				borderAlign: 'center'
			}
		}
	});

	function clipArc(ctx, arc) {
		var startAngle = arc.startAngle;
		var endAngle = arc.endAngle;
		var pixelMargin = arc.pixelMargin;
		var angleMargin = pixelMargin / arc.outerRadius;
		var x = arc.x;
		var y = arc.y;

		// Draw an inner border by cliping the arc and drawing a double-width border
		// Enlarge the clipping arc by 0.33 pixels to eliminate glitches between borders
		ctx.beginPath();
		ctx.arc(x, y, arc.outerRadius, startAngle - angleMargin, endAngle + angleMargin);
		if (arc.innerRadius > pixelMargin) {
			angleMargin = pixelMargin / arc.innerRadius;
			ctx.arc(x, y, arc.innerRadius - pixelMargin, endAngle + angleMargin, startAngle - angleMargin, true);
		} else {
			ctx.arc(x, y, pixelMargin, endAngle + Math.PI / 2, startAngle - Math.PI / 2);
		}
		ctx.closePath();
		ctx.clip();
	}

	function drawFullCircleBorders(ctx, vm, arc, inner) {
		var endAngle = arc.endAngle;
		var i;

		if (inner) {
			arc.endAngle = arc.startAngle + TAU;
			clipArc(ctx, arc);
			arc.endAngle = endAngle;
			if (arc.endAngle === arc.startAngle && arc.fullCircles) {
				arc.endAngle += TAU;
				arc.fullCircles--;
			}
		}

		ctx.beginPath();
		ctx.arc(arc.x, arc.y, arc.innerRadius, arc.startAngle + TAU, arc.startAngle, true);
		for (i = 0; i < arc.fullCircles; ++i) {
			ctx.stroke();
		}

		ctx.beginPath();
		ctx.arc(arc.x, arc.y, vm.outerRadius, arc.startAngle, arc.startAngle + TAU);
		for (i = 0; i < arc.fullCircles; ++i) {
			ctx.stroke();
		}
	}

	function drawBorder(ctx, vm, arc) {
		var inner = vm.borderAlign === 'inner';

		if (inner) {
			ctx.lineWidth = vm.borderWidth * 2;
			ctx.lineJoin = 'round';
		} else {
			ctx.lineWidth = vm.borderWidth;
			ctx.lineJoin = 'bevel';
		}

		if (arc.fullCircles) {
			drawFullCircleBorders(ctx, vm, arc, inner);
		}

		if (inner) {
			clipArc(ctx, arc);
		}

		ctx.beginPath();
		ctx.arc(arc.x, arc.y, vm.outerRadius, arc.startAngle, arc.endAngle);
		ctx.arc(arc.x, arc.y, arc.innerRadius, arc.endAngle, arc.startAngle, true);
		ctx.closePath();
		ctx.stroke();
	}

	var element_arc = core_element.extend({
		_type: 'arc',

		inLabelRange: function(mouseX) {
			var vm = this._view;

			if (vm) {
				return (Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hoverRadius, 2));
			}
			return false;
		},

		inRange: function(chartX, chartY) {
			var vm = this._view;

			if (vm) {
				var pointRelativePosition = helpers$1.getAngleFromPoint(vm, {x: chartX, y: chartY});
				var angle = pointRelativePosition.angle;
				var distance = pointRelativePosition.distance;

				// Sanitise angle range
				var startAngle = vm.startAngle;
				var endAngle = vm.endAngle;
				while (endAngle < startAngle) {
					endAngle += TAU;
				}
				while (angle > endAngle) {
					angle -= TAU;
				}
				while (angle < startAngle) {
					angle += TAU;
				}

				// Check if within the range of the open/close angle
				var betweenAngles = (angle >= startAngle && angle <= endAngle);
				var withinRadius = (distance >= vm.innerRadius && distance <= vm.outerRadius);

				return (betweenAngles && withinRadius);
			}
			return false;
		},

		getCenterPoint: function() {
			var vm = this._view;
			var halfAngle = (vm.startAngle + vm.endAngle) / 2;
			var halfRadius = (vm.innerRadius + vm.outerRadius) / 2;
			return {
				x: vm.x + Math.cos(halfAngle) * halfRadius,
				y: vm.y + Math.sin(halfAngle) * halfRadius
			};
		},

		getArea: function() {
			var vm = this._view;
			return Math.PI * ((vm.endAngle - vm.startAngle) / (2 * Math.PI)) * (Math.pow(vm.outerRadius, 2) - Math.pow(vm.innerRadius, 2));
		},

		tooltipPosition: function() {
			var vm = this._view;
			var centreAngle = vm.startAngle + ((vm.endAngle - vm.startAngle) / 2);
			var rangeFromCentre = (vm.outerRadius - vm.innerRadius) / 2 + vm.innerRadius;

			return {
				x: vm.x + (Math.cos(centreAngle) * rangeFromCentre),
				y: vm.y + (Math.sin(centreAngle) * rangeFromCentre)
			};
		},

		draw: function() {
			var ctx = this._chart.ctx;
			var vm = this._view;
			var pixelMargin = (vm.borderAlign === 'inner') ? 0.33 : 0;
			var arc = {
				x: vm.x,
				y: vm.y,
				innerRadius: vm.innerRadius,
				outerRadius: Math.max(vm.outerRadius - pixelMargin, 0),
				pixelMargin: pixelMargin,
				startAngle: vm.startAngle,
				endAngle: vm.endAngle,
				fullCircles: Math.floor(vm.circumference / TAU)
			};
			var i;

			ctx.save();

			ctx.fillStyle = vm.backgroundColor;
			ctx.strokeStyle = vm.borderColor;

			if (arc.fullCircles) {
				arc.endAngle = arc.startAngle + TAU;
				ctx.beginPath();
				ctx.arc(arc.x, arc.y, arc.outerRadius, arc.startAngle, arc.endAngle);
				ctx.arc(arc.x, arc.y, arc.innerRadius, arc.endAngle, arc.startAngle, true);
				ctx.closePath();
				for (i = 0; i < arc.fullCircles; ++i) {
					ctx.fill();
				}
				arc.endAngle = arc.startAngle + vm.circumference % TAU;
			}

			ctx.beginPath();
			ctx.arc(arc.x, arc.y, arc.outerRadius, arc.startAngle, arc.endAngle);
			ctx.arc(arc.x, arc.y, arc.innerRadius, arc.endAngle, arc.startAngle, true);
			ctx.closePath();
			ctx.fill();

			if (vm.borderWidth) {
				drawBorder(ctx, vm, arc);
			}

			ctx.restore();
		}
	});

	var valueOrDefault$1 = helpers$1.valueOrDefault;

	var defaultColor = core_defaults.global.defaultColor;

	core_defaults._set('global', {
		elements: {
			line: {
				tension: 0.4,
				backgroundColor: defaultColor,
				borderWidth: 3,
				borderColor: defaultColor,
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				capBezierPoints: true,
				fill: true, // do we fill in the area between the line and its base axis
			}
		}
	});

	var element_line = core_element.extend({
		_type: 'line',

		draw: function() {
			var me = this;
			var vm = me._view;
			var ctx = me._chart.ctx;
			var spanGaps = vm.spanGaps;
			var points = me._children.slice(); // clone array
			var globalDefaults = core_defaults.global;
			var globalOptionLineElements = globalDefaults.elements.line;
			var lastDrawnIndex = -1;
			var closePath = me._loop;
			var index, previous, currentVM;

			if (!points.length) {
				return;
			}

			if (me._loop) {
				for (index = 0; index < points.length; ++index) {
					previous = helpers$1.previousItem(points, index);
					// If the line has an open path, shift the point array
					if (!points[index]._view.skip && previous._view.skip) {
						points = points.slice(index).concat(points.slice(0, index));
						closePath = spanGaps;
						break;
					}
				}
				// If the line has a close path, add the first point again
				if (closePath) {
					points.push(points[0]);
				}
			}

			ctx.save();

			// Stroke Line Options
			ctx.lineCap = vm.borderCapStyle || globalOptionLineElements.borderCapStyle;

			// IE 9 and 10 do not support line dash
			if (ctx.setLineDash) {
				ctx.setLineDash(vm.borderDash || globalOptionLineElements.borderDash);
			}

			ctx.lineDashOffset = valueOrDefault$1(vm.borderDashOffset, globalOptionLineElements.borderDashOffset);
			ctx.lineJoin = vm.borderJoinStyle || globalOptionLineElements.borderJoinStyle;
			ctx.lineWidth = valueOrDefault$1(vm.borderWidth, globalOptionLineElements.borderWidth);
			ctx.strokeStyle = vm.borderColor || globalDefaults.defaultColor;

			// Stroke Line
			ctx.beginPath();

			// First point moves to it's starting position no matter what
			currentVM = points[0]._view;
			if (!currentVM.skip) {
				ctx.moveTo(currentVM.x, currentVM.y);
				lastDrawnIndex = 0;
			}

			for (index = 1; index < points.length; ++index) {
				currentVM = points[index]._view;
				previous = lastDrawnIndex === -1 ? helpers$1.previousItem(points, index) : points[lastDrawnIndex];

				if (!currentVM.skip) {
					if ((lastDrawnIndex !== (index - 1) && !spanGaps) || lastDrawnIndex === -1) {
						// There was a gap and this is the first point after the gap
						ctx.moveTo(currentVM.x, currentVM.y);
					} else {
						// Line to next point
						helpers$1.canvas.lineTo(ctx, previous._view, currentVM);
					}
					lastDrawnIndex = index;
				}
			}

			if (closePath) {
				ctx.closePath();
			}

			ctx.stroke();
			ctx.restore();
		}
	});

	var valueOrDefault$2 = helpers$1.valueOrDefault;

	var defaultColor$1 = core_defaults.global.defaultColor;

	core_defaults._set('global', {
		elements: {
			point: {
				radius: 3,
				pointStyle: 'circle',
				backgroundColor: defaultColor$1,
				borderColor: defaultColor$1,
				borderWidth: 1,
				// Hover
				hitRadius: 1,
				hoverRadius: 4,
				hoverBorderWidth: 1
			}
		}
	});

	function xRange(mouseX) {
		var vm = this._view;
		return vm ? (Math.abs(mouseX - vm.x) < vm.radius + vm.hitRadius) : false;
	}

	function yRange(mouseY) {
		var vm = this._view;
		return vm ? (Math.abs(mouseY - vm.y) < vm.radius + vm.hitRadius) : false;
	}

	var element_point = core_element.extend({
		_type: 'point',

		inRange: function(mouseX, mouseY) {
			var vm = this._view;
			return vm ? ((Math.pow(mouseX - vm.x, 2) + Math.pow(mouseY - vm.y, 2)) < Math.pow(vm.hitRadius + vm.radius, 2)) : false;
		},

		inLabelRange: xRange,
		inXRange: xRange,
		inYRange: yRange,

		getCenterPoint: function() {
			var vm = this._view;
			return {
				x: vm.x,
				y: vm.y
			};
		},

		getArea: function() {
			return Math.PI * Math.pow(this._view.radius, 2);
		},

		tooltipPosition: function() {
			var vm = this._view;
			return {
				x: vm.x,
				y: vm.y,
				padding: vm.radius + vm.borderWidth
			};
		},

		draw: function(chartArea) {
			var vm = this._view;
			var ctx = this._chart.ctx;
			var pointStyle = vm.pointStyle;
			var rotation = vm.rotation;
			var radius = vm.radius;
			var x = vm.x;
			var y = vm.y;
			var globalDefaults = core_defaults.global;
			var defaultColor = globalDefaults.defaultColor; // eslint-disable-line no-shadow

			if (vm.skip) {
				return;
			}

			// Clipping for Points.
			if (chartArea === undefined || helpers$1.canvas._isPointInArea(vm, chartArea)) {
				ctx.strokeStyle = vm.borderColor || defaultColor;
				ctx.lineWidth = valueOrDefault$2(vm.borderWidth, globalDefaults.elements.point.borderWidth);
				ctx.fillStyle = vm.backgroundColor || defaultColor;
				helpers$1.canvas.drawPoint(ctx, pointStyle, radius, x, y, rotation);
			}
		}
	});

	var defaultColor$2 = core_defaults.global.defaultColor;

	core_defaults._set('global', {
		elements: {
			rectangle: {
				backgroundColor: defaultColor$2,
				borderColor: defaultColor$2,
				borderSkipped: 'bottom',
				borderWidth: 0
			}
		}
	});

	function isVertical(vm) {
		return vm && vm.width !== undefined;
	}

	/**
	 * Helper function to get the bounds of the bar regardless of the orientation
	 * @param bar {Chart.Element.Rectangle} the bar
	 * @return {Bounds} bounds of the bar
	 * @private
	 */
	function getBarBounds(vm) {
		var x1, x2, y1, y2, half;

		if (isVertical(vm)) {
			half = vm.width / 2;
			x1 = vm.x - half;
			x2 = vm.x + half;
			y1 = Math.min(vm.y, vm.base);
			y2 = Math.max(vm.y, vm.base);
		} else {
			half = vm.height / 2;
			x1 = Math.min(vm.x, vm.base);
			x2 = Math.max(vm.x, vm.base);
			y1 = vm.y - half;
			y2 = vm.y + half;
		}

		return {
			left: x1,
			top: y1,
			right: x2,
			bottom: y2
		};
	}

	function swap(orig, v1, v2) {
		return orig === v1 ? v2 : orig === v2 ? v1 : orig;
	}

	function parseBorderSkipped(vm) {
		var edge = vm.borderSkipped;
		var res = {};

		if (!edge) {
			return res;
		}

		if (vm.horizontal) {
			if (vm.base > vm.x) {
				edge = swap(edge, 'left', 'right');
			}
		} else if (vm.base < vm.y) {
			edge = swap(edge, 'bottom', 'top');
		}

		res[edge] = true;
		return res;
	}

	function parseBorderWidth(vm, maxW, maxH) {
		var value = vm.borderWidth;
		var skip = parseBorderSkipped(vm);
		var t, r, b, l;

		if (helpers$1.isObject(value)) {
			t = +value.top || 0;
			r = +value.right || 0;
			b = +value.bottom || 0;
			l = +value.left || 0;
		} else {
			t = r = b = l = +value || 0;
		}

		return {
			t: skip.top || (t < 0) ? 0 : t > maxH ? maxH : t,
			r: skip.right || (r < 0) ? 0 : r > maxW ? maxW : r,
			b: skip.bottom || (b < 0) ? 0 : b > maxH ? maxH : b,
			l: skip.left || (l < 0) ? 0 : l > maxW ? maxW : l
		};
	}

	function boundingRects(vm) {
		var bounds = getBarBounds(vm);
		var width = bounds.right - bounds.left;
		var height = bounds.bottom - bounds.top;
		var border = parseBorderWidth(vm, width / 2, height / 2);

		return {
			outer: {
				x: bounds.left,
				y: bounds.top,
				w: width,
				h: height
			},
			inner: {
				x: bounds.left + border.l,
				y: bounds.top + border.t,
				w: width - border.l - border.r,
				h: height - border.t - border.b
			}
		};
	}

	function inRange(vm, x, y) {
		var skipX = x === null;
		var skipY = y === null;
		var bounds = !vm || (skipX && skipY) ? false : getBarBounds(vm);

		return bounds
			&& (skipX || x >= bounds.left && x <= bounds.right)
			&& (skipY || y >= bounds.top && y <= bounds.bottom);
	}

	var element_rectangle = core_element.extend({
		_type: 'rectangle',

		draw: function() {
			var ctx = this._chart.ctx;
			var vm = this._view;
			var rects = boundingRects(vm);
			var outer = rects.outer;
			var inner = rects.inner;

			ctx.fillStyle = vm.backgroundColor;
			ctx.fillRect(outer.x, outer.y, outer.w, outer.h);

			if (outer.w === inner.w && outer.h === inner.h) {
				return;
			}

			ctx.save();
			ctx.beginPath();
			ctx.rect(outer.x, outer.y, outer.w, outer.h);
			ctx.clip();
			ctx.fillStyle = vm.borderColor;
			ctx.rect(inner.x, inner.y, inner.w, inner.h);
			ctx.fill('evenodd');
			ctx.restore();
		},

		height: function() {
			var vm = this._view;
			return vm.base - vm.y;
		},

		inRange: function(mouseX, mouseY) {
			return inRange(this._view, mouseX, mouseY);
		},

		inLabelRange: function(mouseX, mouseY) {
			var vm = this._view;
			return isVertical(vm)
				? inRange(vm, mouseX, null)
				: inRange(vm, null, mouseY);
		},

		inXRange: function(mouseX) {
			return inRange(this._view, mouseX, null);
		},

		inYRange: function(mouseY) {
			return inRange(this._view, null, mouseY);
		},

		getCenterPoint: function() {
			var vm = this._view;
			var x, y;
			if (isVertical(vm)) {
				x = vm.x;
				y = (vm.y + vm.base) / 2;
			} else {
				x = (vm.x + vm.base) / 2;
				y = vm.y;
			}

			return {x: x, y: y};
		},

		getArea: function() {
			var vm = this._view;

			return isVertical(vm)
				? vm.width * Math.abs(vm.y - vm.base)
				: vm.height * Math.abs(vm.x - vm.base);
		},

		tooltipPosition: function() {
			var vm = this._view;
			return {
				x: vm.x,
				y: vm.y
			};
		}
	});

	var elements = {};
	var Arc = element_arc;
	var Line = element_line;
	var Point = element_point;
	var Rectangle = element_rectangle;
	elements.Arc = Arc;
	elements.Line = Line;
	elements.Point = Point;
	elements.Rectangle = Rectangle;

	var deprecated = helpers$1._deprecated;
	var valueOrDefault$3 = helpers$1.valueOrDefault;

	core_defaults._set('bar', {
		hover: {
			mode: 'label'
		},

		scales: {
			xAxes: [{
				type: 'category',
				offset: true,
				gridLines: {
					offsetGridLines: true
				}
			}],

			yAxes: [{
				type: 'linear'
			}]
		}
	});

	core_defaults._set('global', {
		datasets: {
			bar: {
				categoryPercentage: 0.8,
				barPercentage: 0.9
			}
		}
	});

	/**
	 * Computes the "optimal" sample size to maintain bars equally sized while preventing overlap.
	 * @private
	 */
	function computeMinSampleSize(scale, pixels) {
		var min = scale._length;
		var prev, curr, i, ilen;

		for (i = 1, ilen = pixels.length; i < ilen; ++i) {
			min = Math.min(min, Math.abs(pixels[i] - pixels[i - 1]));
		}

		for (i = 0, ilen = scale.getTicks().length; i < ilen; ++i) {
			curr = scale.getPixelForTick(i);
			min = i > 0 ? Math.min(min, Math.abs(curr - prev)) : min;
			prev = curr;
		}

		return min;
	}

	/**
	 * Computes an "ideal" category based on the absolute bar thickness or, if undefined or null,
	 * uses the smallest interval (see computeMinSampleSize) that prevents bar overlapping. This
	 * mode currently always generates bars equally sized (until we introduce scriptable options?).
	 * @private
	 */
	function computeFitCategoryTraits(index, ruler, options) {
		var thickness = options.barThickness;
		var count = ruler.stackCount;
		var curr = ruler.pixels[index];
		var min = helpers$1.isNullOrUndef(thickness)
			? computeMinSampleSize(ruler.scale, ruler.pixels)
			: -1;
		var size, ratio;

		if (helpers$1.isNullOrUndef(thickness)) {
			size = min * options.categoryPercentage;
			ratio = options.barPercentage;
		} else {
			// When bar thickness is enforced, category and bar percentages are ignored.
			// Note(SB): we could add support for relative bar thickness (e.g. barThickness: '50%')
			// and deprecate barPercentage since this value is ignored when thickness is absolute.
			size = thickness * count;
			ratio = 1;
		}

		return {
			chunk: size / count,
			ratio: ratio,
			start: curr - (size / 2)
		};
	}

	/**
	 * Computes an "optimal" category that globally arranges bars side by side (no gap when
	 * percentage options are 1), based on the previous and following categories. This mode
	 * generates bars with different widths when data are not evenly spaced.
	 * @private
	 */
	function computeFlexCategoryTraits(index, ruler, options) {
		var pixels = ruler.pixels;
		var curr = pixels[index];
		var prev = index > 0 ? pixels[index - 1] : null;
		var next = index < pixels.length - 1 ? pixels[index + 1] : null;
		var percent = options.categoryPercentage;
		var start, size;

		if (prev === null) {
			// first data: its size is double based on the next point or,
			// if it's also the last data, we use the scale size.
			prev = curr - (next === null ? ruler.end - ruler.start : next - curr);
		}

		if (next === null) {
			// last data: its size is also double based on the previous point.
			next = curr + curr - prev;
		}

		start = curr - (curr - Math.min(prev, next)) / 2 * percent;
		size = Math.abs(next - prev) / 2 * percent;

		return {
			chunk: size / ruler.stackCount,
			ratio: options.barPercentage,
			start: start
		};
	}

	var controller_bar = core_datasetController.extend({

		dataElementType: elements.Rectangle,

		/**
		 * @private
		 */
		_dataElementOptions: [
			'backgroundColor',
			'borderColor',
			'borderSkipped',
			'borderWidth',
			'barPercentage',
			'barThickness',
			'categoryPercentage',
			'maxBarThickness',
			'minBarLength'
		],

		initialize: function() {
			var me = this;
			var meta, scaleOpts;

			core_datasetController.prototype.initialize.apply(me, arguments);

			meta = me.getMeta();
			meta.stack = me.getDataset().stack;
			meta.bar = true;

			scaleOpts = me._getIndexScale().options;
			deprecated('bar chart', scaleOpts.barPercentage, 'scales.[x/y]Axes.barPercentage', 'dataset.barPercentage');
			deprecated('bar chart', scaleOpts.barThickness, 'scales.[x/y]Axes.barThickness', 'dataset.barThickness');
			deprecated('bar chart', scaleOpts.categoryPercentage, 'scales.[x/y]Axes.categoryPercentage', 'dataset.categoryPercentage');
			deprecated('bar chart', me._getValueScale().options.minBarLength, 'scales.[x/y]Axes.minBarLength', 'dataset.minBarLength');
			deprecated('bar chart', scaleOpts.maxBarThickness, 'scales.[x/y]Axes.maxBarThickness', 'dataset.maxBarThickness');
		},

		update: function(reset) {
			var me = this;
			var rects = me.getMeta().data;
			var i, ilen;

			me._ruler = me.getRuler();

			for (i = 0, ilen = rects.length; i < ilen; ++i) {
				me.updateElement(rects[i], i, reset);
			}
		},

		updateElement: function(rectangle, index, reset) {
			var me = this;
			var meta = me.getMeta();
			var dataset = me.getDataset();
			var options = me._resolveDataElementOptions(rectangle, index);

			rectangle._xScale = me.getScaleForId(meta.xAxisID);
			rectangle._yScale = me.getScaleForId(meta.yAxisID);
			rectangle._datasetIndex = me.index;
			rectangle._index = index;
			rectangle._model = {
				backgroundColor: options.backgroundColor,
				borderColor: options.borderColor,
				borderSkipped: options.borderSkipped,
				borderWidth: options.borderWidth,
				datasetLabel: dataset.label,
				label: me.chart.data.labels[index]
			};

			if (helpers$1.isArray(dataset.data[index])) {
				rectangle._model.borderSkipped = null;
			}

			me._updateElementGeometry(rectangle, index, reset, options);

			rectangle.pivot();
		},

		/**
		 * @private
		 */
		_updateElementGeometry: function(rectangle, index, reset, options) {
			var me = this;
			var model = rectangle._model;
			var vscale = me._getValueScale();
			var base = vscale.getBasePixel();
			var horizontal = vscale.isHorizontal();
			var ruler = me._ruler || me.getRuler();
			var vpixels = me.calculateBarValuePixels(me.index, index, options);
			var ipixels = me.calculateBarIndexPixels(me.index, index, ruler, options);

			model.horizontal = horizontal;
			model.base = reset ? base : vpixels.base;
			model.x = horizontal ? reset ? base : vpixels.head : ipixels.center;
			model.y = horizontal ? ipixels.center : reset ? base : vpixels.head;
			model.height = horizontal ? ipixels.size : undefined;
			model.width = horizontal ? undefined : ipixels.size;
		},

		/**
		 * Returns the stacks based on groups and bar visibility.
		 * @param {number} [last] - The dataset index
		 * @returns {string[]} The list of stack IDs
		 * @private
		 */
		_getStacks: function(last) {
			var me = this;
			var scale = me._getIndexScale();
			var metasets = scale._getMatchingVisibleMetas(me._type);
			var stacked = scale.options.stacked;
			var ilen = metasets.length;
			var stacks = [];
			var i, meta;

			for (i = 0; i < ilen; ++i) {
				meta = metasets[i];
				// stacked   | meta.stack
				//           | found | not found | undefined
				// false     |   x   |     x     |     x
				// true      |       |     x     |
				// undefined |       |     x     |     x
				if (stacked === false || stacks.indexOf(meta.stack) === -1 ||
					(stacked === undefined && meta.stack === undefined)) {
					stacks.push(meta.stack);
				}
				if (meta.index === last) {
					break;
				}
			}

			return stacks;
		},

		/**
		 * Returns the effective number of stacks based on groups and bar visibility.
		 * @private
		 */
		getStackCount: function() {
			return this._getStacks().length;
		},

		/**
		 * Returns the stack index for the given dataset based on groups and bar visibility.
		 * @param {number} [datasetIndex] - The dataset index
		 * @param {string} [name] - The stack name to find
		 * @returns {number} The stack index
		 * @private
		 */
		getStackIndex: function(datasetIndex, name) {
			var stacks = this._getStacks(datasetIndex);
			var index = (name !== undefined)
				? stacks.indexOf(name)
				: -1; // indexOf returns -1 if element is not present

			return (index === -1)
				? stacks.length - 1
				: index;
		},

		/**
		 * @private
		 */
		getRuler: function() {
			var me = this;
			var scale = me._getIndexScale();
			var pixels = [];
			var i, ilen;

			for (i = 0, ilen = me.getMeta().data.length; i < ilen; ++i) {
				pixels.push(scale.getPixelForValue(null, i, me.index));
			}

			return {
				pixels: pixels,
				start: scale._startPixel,
				end: scale._endPixel,
				stackCount: me.getStackCount(),
				scale: scale
			};
		},

		/**
		 * Note: pixel values are not clamped to the scale area.
		 * @private
		 */
		calculateBarValuePixels: function(datasetIndex, index, options) {
			var me = this;
			var chart = me.chart;
			var scale = me._getValueScale();
			var isHorizontal = scale.isHorizontal();
			var datasets = chart.data.datasets;
			var metasets = scale._getMatchingVisibleMetas(me._type);
			var value = scale._parseValue(datasets[datasetIndex].data[index]);
			var minBarLength = options.minBarLength;
			var stacked = scale.options.stacked;
			var stack = me.getMeta().stack;
			var start = value.start === undefined ? 0 : value.max >= 0 && value.min >= 0 ? value.min : value.max;
			var length = value.start === undefined ? value.end : value.max >= 0 && value.min >= 0 ? value.max - value.min : value.min - value.max;
			var ilen = metasets.length;
			var i, imeta, ivalue, base, head, size, stackLength;

			if (stacked || (stacked === undefined && stack !== undefined)) {
				for (i = 0; i < ilen; ++i) {
					imeta = metasets[i];

					if (imeta.index === datasetIndex) {
						break;
					}

					if (imeta.stack === stack) {
						stackLength = scale._parseValue(datasets[imeta.index].data[index]);
						ivalue = stackLength.start === undefined ? stackLength.end : stackLength.min >= 0 && stackLength.max >= 0 ? stackLength.max : stackLength.min;

						if ((value.min < 0 && ivalue < 0) || (value.max >= 0 && ivalue > 0)) {
							start += ivalue;
						}
					}
				}
			}

			base = scale.getPixelForValue(start);
			head = scale.getPixelForValue(start + length);
			size = head - base;

			if (minBarLength !== undefined && Math.abs(size) < minBarLength) {
				size = minBarLength;
				if (length >= 0 && !isHorizontal || length < 0 && isHorizontal) {
					head = base - minBarLength;
				} else {
					head = base + minBarLength;
				}
			}

			return {
				size: size,
				base: base,
				head: head,
				center: head + size / 2
			};
		},

		/**
		 * @private
		 */
		calculateBarIndexPixels: function(datasetIndex, index, ruler, options) {
			var me = this;
			var range = options.barThickness === 'flex'
				? computeFlexCategoryTraits(index, ruler, options)
				: computeFitCategoryTraits(index, ruler, options);

			var stackIndex = me.getStackIndex(datasetIndex, me.getMeta().stack);
			var center = range.start + (range.chunk * stackIndex) + (range.chunk / 2);
			var size = Math.min(
				valueOrDefault$3(options.maxBarThickness, Infinity),
				range.chunk * range.ratio);

			return {
				base: center - size / 2,
				head: center + size / 2,
				center: center,
				size: size
			};
		},

		draw: function() {
			var me = this;
			var chart = me.chart;
			var scale = me._getValueScale();
			var rects = me.getMeta().data;
			var dataset = me.getDataset();
			var ilen = rects.length;
			var i = 0;

			helpers$1.canvas.clipArea(chart.ctx, chart.chartArea);

			for (; i < ilen; ++i) {
				var val = scale._parseValue(dataset.data[i]);
				if (!isNaN(val.min) && !isNaN(val.max)) {
					rects[i].draw();
				}
			}

			helpers$1.canvas.unclipArea(chart.ctx);
		},

		/**
		 * @private
		 */
		_resolveDataElementOptions: function() {
			var me = this;
			var values = helpers$1.extend({}, core_datasetController.prototype._resolveDataElementOptions.apply(me, arguments));
			var indexOpts = me._getIndexScale().options;
			var valueOpts = me._getValueScale().options;

			values.barPercentage = valueOrDefault$3(indexOpts.barPercentage, values.barPercentage);
			values.barThickness = valueOrDefault$3(indexOpts.barThickness, values.barThickness);
			values.categoryPercentage = valueOrDefault$3(indexOpts.categoryPercentage, values.categoryPercentage);
			values.maxBarThickness = valueOrDefault$3(indexOpts.maxBarThickness, values.maxBarThickness);
			values.minBarLength = valueOrDefault$3(valueOpts.minBarLength, values.minBarLength);

			return values;
		}

	});

	var valueOrDefault$4 = helpers$1.valueOrDefault;
	var resolve$1 = helpers$1.options.resolve;

	core_defaults._set('bubble', {
		hover: {
			mode: 'single'
		},

		scales: {
			xAxes: [{
				type: 'linear', // bubble should probably use a linear scale by default
				position: 'bottom',
				id: 'x-axis-0' // need an ID so datasets can reference the scale
			}],
			yAxes: [{
				type: 'linear',
				position: 'left',
				id: 'y-axis-0'
			}]
		},

		tooltips: {
			callbacks: {
				title: function() {
					// Title doesn't make sense for scatter since we format the data as a point
					return '';
				},
				label: function(item, data) {
					var datasetLabel = data.datasets[item.datasetIndex].label || '';
					var dataPoint = data.datasets[item.datasetIndex].data[item.index];
					return datasetLabel + ': (' + item.xLabel + ', ' + item.yLabel + ', ' + dataPoint.r + ')';
				}
			}
		}
	});

	var controller_bubble = core_datasetController.extend({
		/**
		 * @protected
		 */
		dataElementType: elements.Point,

		/**
		 * @private
		 */
		_dataElementOptions: [
			'backgroundColor',
			'borderColor',
			'borderWidth',
			'hoverBackgroundColor',
			'hoverBorderColor',
			'hoverBorderWidth',
			'hoverRadius',
			'hitRadius',
			'pointStyle',
			'rotation'
		],

		/**
		 * @protected
		 */
		update: function(reset) {
			var me = this;
			var meta = me.getMeta();
			var points = meta.data;

			// Update Points
			helpers$1.each(points, function(point, index) {
				me.updateElement(point, index, reset);
			});
		},

		/**
		 * @protected
		 */
		updateElement: function(point, index, reset) {
			var me = this;
			var meta = me.getMeta();
			var custom = point.custom || {};
			var xScale = me.getScaleForId(meta.xAxisID);
			var yScale = me.getScaleForId(meta.yAxisID);
			var options = me._resolveDataElementOptions(point, index);
			var data = me.getDataset().data[index];
			var dsIndex = me.index;

			var x = reset ? xScale.getPixelForDecimal(0.5) : xScale.getPixelForValue(typeof data === 'object' ? data : NaN, index, dsIndex);
			var y = reset ? yScale.getBasePixel() : yScale.getPixelForValue(data, index, dsIndex);

			point._xScale = xScale;
			point._yScale = yScale;
			point._options = options;
			point._datasetIndex = dsIndex;
			point._index = index;
			point._model = {
				backgroundColor: options.backgroundColor,
				borderColor: options.borderColor,
				borderWidth: options.borderWidth,
				hitRadius: options.hitRadius,
				pointStyle: options.pointStyle,
				rotation: options.rotation,
				radius: reset ? 0 : options.radius,
				skip: custom.skip || isNaN(x) || isNaN(y),
				x: x,
				y: y,
			};

			point.pivot();
		},

		/**
		 * @protected
		 */
		setHoverStyle: function(point) {
			var model = point._model;
			var options = point._options;
			var getHoverColor = helpers$1.getHoverColor;

			point.$previousStyle = {
				backgroundColor: model.backgroundColor,
				borderColor: model.borderColor,
				borderWidth: model.borderWidth,
				radius: model.radius
			};

			model.backgroundColor = valueOrDefault$4(options.hoverBackgroundColor, getHoverColor(options.backgroundColor));
			model.borderColor = valueOrDefault$4(options.hoverBorderColor, getHoverColor(options.borderColor));
			model.borderWidth = valueOrDefault$4(options.hoverBorderWidth, options.borderWidth);
			model.radius = options.radius + options.hoverRadius;
		},

		/**
		 * @private
		 */
		_resolveDataElementOptions: function(point, index) {
			var me = this;
			var chart = me.chart;
			var dataset = me.getDataset();
			var custom = point.custom || {};
			var data = dataset.data[index] || {};
			var values = core_datasetController.prototype._resolveDataElementOptions.apply(me, arguments);

			// Scriptable options
			var context = {
				chart: chart,
				dataIndex: index,
				dataset: dataset,
				datasetIndex: me.index
			};

			// In case values were cached (and thus frozen), we need to clone the values
			if (me._cachedDataOpts === values) {
				values = helpers$1.extend({}, values);
			}

			// Custom radius resolution
			values.radius = resolve$1([
				custom.radius,
				data.r,
				me._config.radius,
				chart.options.elements.point.radius
			], context, index);

			return values;
		}
	});

	var valueOrDefault$5 = helpers$1.valueOrDefault;

	var PI$1 = Math.PI;
	var DOUBLE_PI$1 = PI$1 * 2;
	var HALF_PI$1 = PI$1 / 2;

	core_defaults._set('doughnut', {
		animation: {
			// Boolean - Whether we animate the rotation of the Doughnut
			animateRotate: true,
			// Boolean - Whether we animate scaling the Doughnut from the centre
			animateScale: false
		},
		hover: {
			mode: 'single'
		},
		legendCallback: function(chart) {
			var list = document.createElement('ul');
			var data = chart.data;
			var datasets = data.datasets;
			var labels = data.labels;
			var i, ilen, listItem, listItemSpan;

			list.setAttribute('class', chart.id + '-legend');
			if (datasets.length) {
				for (i = 0, ilen = datasets[0].data.length; i < ilen; ++i) {
					listItem = list.appendChild(document.createElement('li'));
					listItemSpan = listItem.appendChild(document.createElement('span'));
					listItemSpan.style.backgroundColor = datasets[0].backgroundColor[i];
					if (labels[i]) {
						listItem.appendChild(document.createTextNode(labels[i]));
					}
				}
			}

			return list.outerHTML;
		},
		legend: {
			labels: {
				generateLabels: function(chart) {
					var data = chart.data;
					if (data.labels.length && data.datasets.length) {
						return data.labels.map(function(label, i) {
							var meta = chart.getDatasetMeta(0);
							var style = meta.controller.getStyle(i);

							return {
								text: label,
								fillStyle: style.backgroundColor,
								strokeStyle: style.borderColor,
								lineWidth: style.borderWidth,
								hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,

								// Extra data used for toggling the correct item
								index: i
							};
						});
					}
					return [];
				}
			},

			onClick: function(e, legendItem) {
				var index = legendItem.index;
				var chart = this.chart;
				var i, ilen, meta;

				for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
					meta = chart.getDatasetMeta(i);
					// toggle visibility of index if exists
					if (meta.data[index]) {
						meta.data[index].hidden = !meta.data[index].hidden;
					}
				}

				chart.update();
			}
		},

		// The percentage of the chart that we cut out of the middle.
		cutoutPercentage: 50,

		// The rotation of the chart, where the first data arc begins.
		rotation: -HALF_PI$1,

		// The total circumference of the chart.
		circumference: DOUBLE_PI$1,

		// Need to override these to give a nice default
		tooltips: {
			callbacks: {
				title: function() {
					return '';
				},
				label: function(tooltipItem, data) {
					var dataLabel = data.labels[tooltipItem.index];
					var value = ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

					if (helpers$1.isArray(dataLabel)) {
						// show value on first line of multiline label
						// need to clone because we are changing the value
						dataLabel = dataLabel.slice();
						dataLabel[0] += value;
					} else {
						dataLabel += value;
					}

					return dataLabel;
				}
			}
		}
	});

	var controller_doughnut = core_datasetController.extend({

		dataElementType: elements.Arc,

		linkScales: helpers$1.noop,

		/**
		 * @private
		 */
		_dataElementOptions: [
			'backgroundColor',
			'borderColor',
			'borderWidth',
			'borderAlign',
			'hoverBackgroundColor',
			'hoverBorderColor',
			'hoverBorderWidth',
		],

		// Get index of the dataset in relation to the visible datasets. This allows determining the inner and outer radius correctly
		getRingIndex: function(datasetIndex) {
			var ringIndex = 0;

			for (var j = 0; j < datasetIndex; ++j) {
				if (this.chart.isDatasetVisible(j)) {
					++ringIndex;
				}
			}

			return ringIndex;
		},

		update: function(reset) {
			var me = this;
			var chart = me.chart;
			var chartArea = chart.chartArea;
			var opts = chart.options;
			var ratioX = 1;
			var ratioY = 1;
			var offsetX = 0;
			var offsetY = 0;
			var meta = me.getMeta();
			var arcs = meta.data;
			var cutout = opts.cutoutPercentage / 100 || 0;
			var circumference = opts.circumference;
			var chartWeight = me._getRingWeight(me.index);
			var maxWidth, maxHeight, i, ilen;

			// If the chart's circumference isn't a full circle, calculate size as a ratio of the width/height of the arc
			if (circumference < DOUBLE_PI$1) {
				var startAngle = opts.rotation % DOUBLE_PI$1;
				startAngle += startAngle >= PI$1 ? -DOUBLE_PI$1 : startAngle < -PI$1 ? DOUBLE_PI$1 : 0;
				var endAngle = startAngle + circumference;
				var startX = Math.cos(startAngle);
				var startY = Math.sin(startAngle);
				var endX = Math.cos(endAngle);
				var endY = Math.sin(endAngle);
				var contains0 = (startAngle <= 0 && endAngle >= 0) || endAngle >= DOUBLE_PI$1;
				var contains90 = (startAngle <= HALF_PI$1 && endAngle >= HALF_PI$1) || endAngle >= DOUBLE_PI$1 + HALF_PI$1;
				var contains180 = startAngle === -PI$1 || endAngle >= PI$1;
				var contains270 = (startAngle <= -HALF_PI$1 && endAngle >= -HALF_PI$1) || endAngle >= PI$1 + HALF_PI$1;
				var minX = contains180 ? -1 : Math.min(startX, startX * cutout, endX, endX * cutout);
				var minY = contains270 ? -1 : Math.min(startY, startY * cutout, endY, endY * cutout);
				var maxX = contains0 ? 1 : Math.max(startX, startX * cutout, endX, endX * cutout);
				var maxY = contains90 ? 1 : Math.max(startY, startY * cutout, endY, endY * cutout);
				ratioX = (maxX - minX) / 2;
				ratioY = (maxY - minY) / 2;
				offsetX = -(maxX + minX) / 2;
				offsetY = -(maxY + minY) / 2;
			}

			for (i = 0, ilen = arcs.length; i < ilen; ++i) {
				arcs[i]._options = me._resolveDataElementOptions(arcs[i], i);
			}

			chart.borderWidth = me.getMaxBorderWidth();
			maxWidth = (chartArea.right - chartArea.left - chart.borderWidth) / ratioX;
			maxHeight = (chartArea.bottom - chartArea.top - chart.borderWidth) / ratioY;
			chart.outerRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
			chart.innerRadius = Math.max(chart.outerRadius * cutout, 0);
			chart.radiusLength = (chart.outerRadius - chart.innerRadius) / (me._getVisibleDatasetWeightTotal() || 1);
			chart.offsetX = offsetX * chart.outerRadius;
			chart.offsetY = offsetY * chart.outerRadius;

			meta.total = me.calculateTotal();

			me.outerRadius = chart.outerRadius - chart.radiusLength * me._getRingWeightOffset(me.index);
			me.innerRadius = Math.max(me.outerRadius - chart.radiusLength * chartWeight, 0);

			for (i = 0, ilen = arcs.length; i < ilen; ++i) {
				me.updateElement(arcs[i], i, reset);
			}
		},

		updateElement: function(arc, index, reset) {
			var me = this;
			var chart = me.chart;
			var chartArea = chart.chartArea;
			var opts = chart.options;
			var animationOpts = opts.animation;
			var centerX = (chartArea.left + chartArea.right) / 2;
			var centerY = (chartArea.top + chartArea.bottom) / 2;
			var startAngle = opts.rotation; // non reset case handled later
			var endAngle = opts.rotation; // non reset case handled later
			var dataset = me.getDataset();
			var circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : me.calculateCircumference(dataset.data[index]) * (opts.circumference / DOUBLE_PI$1);
			var innerRadius = reset && animationOpts.animateScale ? 0 : me.innerRadius;
			var outerRadius = reset && animationOpts.animateScale ? 0 : me.outerRadius;
			var options = arc._options || {};

			helpers$1.extend(arc, {
				// Utility
				_datasetIndex: me.index,
				_index: index,

				// Desired view properties
				_model: {
					backgroundColor: options.backgroundColor,
					borderColor: options.borderColor,
					borderWidth: options.borderWidth,
					borderAlign: options.borderAlign,
					x: centerX + chart.offsetX,
					y: centerY + chart.offsetY,
					startAngle: startAngle,
					endAngle: endAngle,
					circumference: circumference,
					outerRadius: outerRadius,
					innerRadius: innerRadius,
					label: helpers$1.valueAtIndexOrDefault(dataset.label, index, chart.data.labels[index])
				}
			});

			var model = arc._model;

			// Set correct angles if not resetting
			if (!reset || !animationOpts.animateRotate) {
				if (index === 0) {
					model.startAngle = opts.rotation;
				} else {
					model.startAngle = me.getMeta().data[index - 1]._model.endAngle;
				}

				model.endAngle = model.startAngle + model.circumference;
			}

			arc.pivot();
		},

		calculateTotal: function() {
			var dataset = this.getDataset();
			var meta = this.getMeta();
			var total = 0;
			var value;

			helpers$1.each(meta.data, function(element, index) {
				value = dataset.data[index];
				if (!isNaN(value) && !element.hidden) {
					total += Math.abs(value);
				}
			});

			/* if (total === 0) {
				total = NaN;
			}*/

			return total;
		},

		calculateCircumference: function(value) {
			var total = this.getMeta().total;
			if (total > 0 && !isNaN(value)) {
				return DOUBLE_PI$1 * (Math.abs(value) / total);
			}
			return 0;
		},

		// gets the max border or hover width to properly scale pie charts
		getMaxBorderWidth: function(arcs) {
			var me = this;
			var max = 0;
			var chart = me.chart;
			var i, ilen, meta, arc, controller, options, borderWidth, hoverWidth;

			if (!arcs) {
				// Find the outmost visible dataset
				for (i = 0, ilen = chart.data.datasets.length; i < ilen; ++i) {
					if (chart.isDatasetVisible(i)) {
						meta = chart.getDatasetMeta(i);
						arcs = meta.data;
						if (i !== me.index) {
							controller = meta.controller;
						}
						break;
					}
				}
			}

			if (!arcs) {
				return 0;
			}

			for (i = 0, ilen = arcs.length; i < ilen; ++i) {
				arc = arcs[i];
				if (controller) {
					controller._configure();
					options = controller._resolveDataElementOptions(arc, i);
				} else {
					options = arc._options;
				}
				if (options.borderAlign !== 'inner') {
					borderWidth = options.borderWidth;
					hoverWidth = options.hoverBorderWidth;

					max = borderWidth > max ? borderWidth : max;
					max = hoverWidth > max ? hoverWidth : max;
				}
			}
			return max;
		},

		/**
		 * @protected
		 */
		setHoverStyle: function(arc) {
			var model = arc._model;
			var options = arc._options;
			var getHoverColor = helpers$1.getHoverColor;

			arc.$previousStyle = {
				backgroundColor: model.backgroundColor,
				borderColor: model.borderColor,
				borderWidth: model.borderWidth,
			};

			model.backgroundColor = valueOrDefault$5(options.hoverBackgroundColor, getHoverColor(options.backgroundColor));
			model.borderColor = valueOrDefault$5(options.hoverBorderColor, getHoverColor(options.borderColor));
			model.borderWidth = valueOrDefault$5(options.hoverBorderWidth, options.borderWidth);
		},

		/**
		 * Get radius length offset of the dataset in relation to the visible datasets weights. This allows determining the inner and outer radius correctly
		 * @private
		 */
		_getRingWeightOffset: function(datasetIndex) {
			var ringWeightOffset = 0;

			for (var i = 0; i < datasetIndex; ++i) {
				if (this.chart.isDatasetVisible(i)) {
					ringWeightOffset += this._getRingWeight(i);
				}
			}

			return ringWeightOffset;
		},

		/**
		 * @private
		 */
		_getRingWeight: function(dataSetIndex) {
			return Math.max(valueOrDefault$5(this.chart.data.datasets[dataSetIndex].weight, 1), 0);
		},

		/**
		 * Returns the sum of all visibile data set weights.  This value can be 0.
		 * @private
		 */
		_getVisibleDatasetWeightTotal: function() {
			return this._getRingWeightOffset(this.chart.data.datasets.length);
		}
	});

	core_defaults._set('horizontalBar', {
		hover: {
			mode: 'index',
			axis: 'y'
		},

		scales: {
			xAxes: [{
				type: 'linear',
				position: 'bottom'
			}],

			yAxes: [{
				type: 'category',
				position: 'left',
				offset: true,
				gridLines: {
					offsetGridLines: true
				}
			}]
		},

		elements: {
			rectangle: {
				borderSkipped: 'left'
			}
		},

		tooltips: {
			mode: 'index',
			axis: 'y'
		}
	});

	core_defaults._set('global', {
		datasets: {
			horizontalBar: {
				categoryPercentage: 0.8,
				barPercentage: 0.9
			}
		}
	});

	var controller_horizontalBar = controller_bar.extend({
		/**
		 * @private
		 */
		_getValueScaleId: function() {
			return this.getMeta().xAxisID;
		},

		/**
		 * @private
		 */
		_getIndexScaleId: function() {
			return this.getMeta().yAxisID;
		}
	});

	var valueOrDefault$6 = helpers$1.valueOrDefault;
	var resolve$2 = helpers$1.options.resolve;
	var isPointInArea = helpers$1.canvas._isPointInArea;

	core_defaults._set('line', {
		showLines: true,
		spanGaps: false,

		hover: {
			mode: 'label'
		},

		scales: {
			xAxes: [{
				type: 'category',
				id: 'x-axis-0'
			}],
			yAxes: [{
				type: 'linear',
				id: 'y-axis-0'
			}]
		}
	});

	function scaleClip(scale, halfBorderWidth) {
		var tickOpts = scale && scale.options.ticks || {};
		var reverse = tickOpts.reverse;
		var min = tickOpts.min === undefined ? halfBorderWidth : 0;
		var max = tickOpts.max === undefined ? halfBorderWidth : 0;
		return {
			start: reverse ? max : min,
			end: reverse ? min : max
		};
	}

	function defaultClip(xScale, yScale, borderWidth) {
		var halfBorderWidth = borderWidth / 2;
		var x = scaleClip(xScale, halfBorderWidth);
		var y = scaleClip(yScale, halfBorderWidth);

		return {
			top: y.end,
			right: x.end,
			bottom: y.start,
			left: x.start
		};
	}

	function toClip(value) {
		var t, r, b, l;

		if (helpers$1.isObject(value)) {
			t = value.top;
			r = value.right;
			b = value.bottom;
			l = value.left;
		} else {
			t = r = b = l = value;
		}

		return {
			top: t,
			right: r,
			bottom: b,
			left: l
		};
	}


	var controller_line = core_datasetController.extend({

		datasetElementType: elements.Line,

		dataElementType: elements.Point,

		/**
		 * @private
		 */
		_datasetElementOptions: [
			'backgroundColor',
			'borderCapStyle',
			'borderColor',
			'borderDash',
			'borderDashOffset',
			'borderJoinStyle',
			'borderWidth',
			'cubicInterpolationMode',
			'fill'
		],

		/**
		 * @private
		 */
		_dataElementOptions: {
			backgroundColor: 'pointBackgroundColor',
			borderColor: 'pointBorderColor',
			borderWidth: 'pointBorderWidth',
			hitRadius: 'pointHitRadius',
			hoverBackgroundColor: 'pointHoverBackgroundColor',
			hoverBorderColor: 'pointHoverBorderColor',
			hoverBorderWidth: 'pointHoverBorderWidth',
			hoverRadius: 'pointHoverRadius',
			pointStyle: 'pointStyle',
			radius: 'pointRadius',
			rotation: 'pointRotation'
		},

		update: function(reset) {
			var me = this;
			var meta = me.getMeta();
			var line = meta.dataset;
			var points = meta.data || [];
			var options = me.chart.options;
			var config = me._config;
			var showLine = me._showLine = valueOrDefault$6(config.showLine, options.showLines);
			var i, ilen;

			me._xScale = me.getScaleForId(meta.xAxisID);
			me._yScale = me.getScaleForId(meta.yAxisID);

			// Update Line
			if (showLine) {
				// Compatibility: If the properties are defined with only the old name, use those values
				if (config.tension !== undefined && config.lineTension === undefined) {
					config.lineTension = config.tension;
				}

				// Utility
				line._scale = me._yScale;
				line._datasetIndex = me.index;
				// Data
				line._children = points;
				// Model
				line._model = me._resolveDatasetElementOptions(line);

				line.pivot();
			}

			// Update Points
			for (i = 0, ilen = points.length; i < ilen; ++i) {
				me.updateElement(points[i], i, reset);
			}

			if (showLine && line._model.tension !== 0) {
				me.updateBezierControlPoints();
			}

			// Now pivot the point for animation
			for (i = 0, ilen = points.length; i < ilen; ++i) {
				points[i].pivot();
			}
		},

		updateElement: function(point, index, reset) {
			var me = this;
			var meta = me.getMeta();
			var custom = point.custom || {};
			var dataset = me.getDataset();
			var datasetIndex = me.index;
			var value = dataset.data[index];
			var xScale = me._xScale;
			var yScale = me._yScale;
			var lineModel = meta.dataset._model;
			var x, y;

			var options = me._resolveDataElementOptions(point, index);

			x = xScale.getPixelForValue(typeof value === 'object' ? value : NaN, index, datasetIndex);
			y = reset ? yScale.getBasePixel() : me.calculatePointY(value, index, datasetIndex);

			// Utility
			point._xScale = xScale;
			point._yScale = yScale;
			point._options = options;
			point._datasetIndex = datasetIndex;
			point._index = index;

			// Desired view properties
			point._model = {
				x: x,
				y: y,
				skip: custom.skip || isNaN(x) || isNaN(y),
				// Appearance
				radius: options.radius,
				pointStyle: options.pointStyle,
				rotation: options.rotation,
				backgroundColor: options.backgroundColor,
				borderColor: options.borderColor,
				borderWidth: options.borderWidth,
				tension: valueOrDefault$6(custom.tension, lineModel ? lineModel.tension : 0),
				steppedLine: lineModel ? lineModel.steppedLine : false,
				// Tooltip
				hitRadius: options.hitRadius
			};
		},

		/**
		 * @private
		 */
		_resolveDatasetElementOptions: function(element) {
			var me = this;
			var config = me._config;
			var custom = element.custom || {};
			var options = me.chart.options;
			var lineOptions = options.elements.line;
			var values = core_datasetController.prototype._resolveDatasetElementOptions.apply(me, arguments);

			// The default behavior of lines is to break at null values, according
			// to https://github.com/chartjs/Chart.js/issues/2435#issuecomment-216718158
			// This option gives lines the ability to span gaps
			values.spanGaps = valueOrDefault$6(config.spanGaps, options.spanGaps);
			values.tension = valueOrDefault$6(config.lineTension, lineOptions.tension);
			values.steppedLine = resolve$2([custom.steppedLine, config.steppedLine, lineOptions.stepped]);
			values.clip = toClip(valueOrDefault$6(config.clip, defaultClip(me._xScale, me._yScale, values.borderWidth)));

			return values;
		},

		calculatePointY: function(value, index, datasetIndex) {
			var me = this;
			var chart = me.chart;
			var yScale = me._yScale;
			var sumPos = 0;
			var sumNeg = 0;
			var i, ds, dsMeta, stackedRightValue, rightValue, metasets, ilen;

			if (yScale.options.stacked) {
				rightValue = +yScale.getRightValue(value);
				metasets = chart._getSortedVisibleDatasetMetas();
				ilen = metasets.length;

				for (i = 0; i < ilen; ++i) {
					dsMeta = metasets[i];
					if (dsMeta.index === datasetIndex) {
						break;
					}

					ds = chart.data.datasets[dsMeta.index];
					if (dsMeta.type === 'line' && dsMeta.yAxisID === yScale.id) {
						stackedRightValue = +yScale.getRightValue(ds.data[index]);
						if (stackedRightValue < 0) {
							sumNeg += stackedRightValue || 0;
						} else {
							sumPos += stackedRightValue || 0;
						}
					}
				}

				if (rightValue < 0) {
					return yScale.getPixelForValue(sumNeg + rightValue);
				}
				return yScale.getPixelForValue(sumPos + rightValue);
			}
			return yScale.getPixelForValue(value);
		},

		updateBezierControlPoints: function() {
			var me = this;
			var chart = me.chart;
			var meta = me.getMeta();
			var lineModel = meta.dataset._model;
			var area = chart.chartArea;
			var points = meta.data || [];
			var i, ilen, model, controlPoints;

			// Only consider points that are drawn in case the spanGaps option is used
			if (lineModel.spanGaps) {
				points = points.filter(function(pt) {
					return !pt._model.skip;
				});
			}

			function capControlPoint(pt, min, max) {
				return Math.max(Math.min(pt, max), min);
			}

			if (lineModel.cubicInterpolationMode === 'monotone') {
				helpers$1.splineCurveMonotone(points);
			} else {
				for (i = 0, ilen = points.length; i < ilen; ++i) {
					model = points[i]._model;
					controlPoints = helpers$1.splineCurve(
						helpers$1.previousItem(points, i)._model,
						model,
						helpers$1.nextItem(points, i)._model,
						lineModel.tension
					);
					model.controlPointPreviousX = controlPoints.previous.x;
					model.controlPointPreviousY = controlPoints.previous.y;
					model.controlPointNextX = controlPoints.next.x;
					model.controlPointNextY = controlPoints.next.y;
				}
			}

			if (chart.options.elements.line.capBezierPoints) {
				for (i = 0, ilen = points.length; i < ilen; ++i) {
					model = points[i]._model;
					if (isPointInArea(model, area)) {
						if (i > 0 && isPointInArea(points[i - 1]._model, area)) {
							model.controlPointPreviousX = capControlPoint(model.controlPointPreviousX, area.left, area.right);
							model.controlPointPreviousY = capControlPoint(model.controlPointPreviousY, area.top, area.bottom);
						}
						if (i < points.length - 1 && isPointInArea(points[i + 1]._model, area)) {
							model.controlPointNextX = capControlPoint(model.controlPointNextX, area.left, area.right);
							model.controlPointNextY = capControlPoint(model.controlPointNextY, area.top, area.bottom);
						}
					}
				}
			}
		},

		draw: function() {
			var me = this;
			var chart = me.chart;
			var meta = me.getMeta();
			var points = meta.data || [];
			var area = chart.chartArea;
			var canvas = chart.canvas;
			var i = 0;
			var ilen = points.length;
			var clip;

			if (me._showLine) {
				clip = meta.dataset._model.clip;

				helpers$1.canvas.clipArea(chart.ctx, {
					left: clip.left === false ? 0 : area.left - clip.left,
					right: clip.right === false ? canvas.width : area.right + clip.right,
					top: clip.top === false ? 0 : area.top - clip.top,
					bottom: clip.bottom === false ? canvas.height : area.bottom + clip.bottom
				});

				meta.dataset.draw();

				helpers$1.canvas.unclipArea(chart.ctx);
			}

			// Draw the points
			for (; i < ilen; ++i) {
				points[i].draw(area);
			}
		},

		/**
		 * @protected
		 */
		setHoverStyle: function(point) {
			var model = point._model;
			var options = point._options;
			var getHoverColor = helpers$1.getHoverColor;

			point.$previousStyle = {
				backgroundColor: model.backgroundColor,
				borderColor: model.borderColor,
				borderWidth: model.borderWidth,
				radius: model.radius
			};

			model.backgroundColor = valueOrDefault$6(options.hoverBackgroundColor, getHoverColor(options.backgroundColor));
			model.borderColor = valueOrDefault$6(options.hoverBorderColor, getHoverColor(options.borderColor));
			model.borderWidth = valueOrDefault$6(options.hoverBorderWidth, options.borderWidth);
			model.radius = valueOrDefault$6(options.hoverRadius, options.radius);
		},
	});

	var resolve$3 = helpers$1.options.resolve;

	core_defaults._set('polarArea', {
		scale: {
			type: 'radialLinear',
			angleLines: {
				display: false
			},
			gridLines: {
				circular: true
			},
			pointLabels: {
				display: false
			},
			ticks: {
				beginAtZero: true
			}
		},

		// Boolean - Whether to animate the rotation of the chart
		animation: {
			animateRotate: true,
			animateScale: true
		},

		startAngle: -0.5 * Math.PI,
		legendCallback: function(chart) {
			var list = document.createElement('ul');
			var data = chart.data;
			var datasets = data.datasets;
			var labels = data.labels;
			var i, ilen, listItem, listItemSpan;

			list.setAttribute('class', chart.id + '-legend');
			if (datasets.length) {
				for (i = 0, ilen = datasets[0].data.length; i < ilen; ++i) {
					listItem = list.appendChild(document.createElement('li'));
					listItemSpan = listItem.appendChild(document.createElement('span'));
					listItemSpan.style.backgroundColor = datasets[0].backgroundColor[i];
					if (labels[i]) {
						listItem.appendChild(document.createTextNode(labels[i]));
					}
				}
			}

			return list.outerHTML;
		},
		legend: {
			labels: {
				generateLabels: function(chart) {
					var data = chart.data;
					if (data.labels.length && data.datasets.length) {
						return data.labels.map(function(label, i) {
							var meta = chart.getDatasetMeta(0);
							var style = meta.controller.getStyle(i);

							return {
								text: label,
								fillStyle: style.backgroundColor,
								strokeStyle: style.borderColor,
								lineWidth: style.borderWidth,
								hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,

								// Extra data used for toggling the correct item
								index: i
							};
						});
					}
					return [];
				}
			},

			onClick: function(e, legendItem) {
				var index = legendItem.index;
				var chart = this.chart;
				var i, ilen, meta;

				for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
					meta = chart.getDatasetMeta(i);
					meta.data[index].hidden = !meta.data[index].hidden;
				}

				chart.update();
			}
		},

		// Need to override these to give a nice default
		tooltips: {
			callbacks: {
				title: function() {
					return '';
				},
				label: function(item, data) {
					return data.labels[item.index] + ': ' + item.yLabel;
				}
			}
		}
	});

	var controller_polarArea = core_datasetController.extend({

		dataElementType: elements.Arc,

		linkScales: helpers$1.noop,

		/**
		 * @private
		 */
		_dataElementOptions: [
			'backgroundColor',
			'borderColor',
			'borderWidth',
			'borderAlign',
			'hoverBackgroundColor',
			'hoverBorderColor',
			'hoverBorderWidth',
		],

		/**
		 * @private
		 */
		_getIndexScaleId: function() {
			return this.chart.scale.id;
		},

		/**
		 * @private
		 */
		_getValueScaleId: function() {
			return this.chart.scale.id;
		},

		update: function(reset) {
			var me = this;
			var dataset = me.getDataset();
			var meta = me.getMeta();
			var start = me.chart.options.startAngle || 0;
			var starts = me._starts = [];
			var angles = me._angles = [];
			var arcs = meta.data;
			var i, ilen, angle;

			me._updateRadius();

			meta.count = me.countVisibleElements();

			for (i = 0, ilen = dataset.data.length; i < ilen; i++) {
				starts[i] = start;
				angle = me._computeAngle(i);
				angles[i] = angle;
				start += angle;
			}

			for (i = 0, ilen = arcs.length; i < ilen; ++i) {
				arcs[i]._options = me._resolveDataElementOptions(arcs[i], i);
				me.updateElement(arcs[i], i, reset);
			}
		},

		/**
		 * @private
		 */
		_updateRadius: function() {
			var me = this;
			var chart = me.chart;
			var chartArea = chart.chartArea;
			var opts = chart.options;
			var minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);

			chart.outerRadius = Math.max(minSize / 2, 0);
			chart.innerRadius = Math.max(opts.cutoutPercentage ? (chart.outerRadius / 100) * (opts.cutoutPercentage) : 1, 0);
			chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();

			me.outerRadius = chart.outerRadius - (chart.radiusLength * me.index);
			me.innerRadius = me.outerRadius - chart.radiusLength;
		},

		updateElement: function(arc, index, reset) {
			var me = this;
			var chart = me.chart;
			var dataset = me.getDataset();
			var opts = chart.options;
			var animationOpts = opts.animation;
			var scale = chart.scale;
			var labels = chart.data.labels;

			var centerX = scale.xCenter;
			var centerY = scale.yCenter;

			// var negHalfPI = -0.5 * Math.PI;
			var datasetStartAngle = opts.startAngle;
			var distance = arc.hidden ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);
			var startAngle = me._starts[index];
			var endAngle = startAngle + (arc.hidden ? 0 : me._angles[index]);

			var resetRadius = animationOpts.animateScale ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);
			var options = arc._options || {};

			helpers$1.extend(arc, {
				// Utility
				_datasetIndex: me.index,
				_index: index,
				_scale: scale,

				// Desired view properties
				_model: {
					backgroundColor: options.backgroundColor,
					borderColor: options.borderColor,
					borderWidth: options.borderWidth,
					borderAlign: options.borderAlign,
					x: centerX,
					y: centerY,
					innerRadius: 0,
					outerRadius: reset ? resetRadius : distance,
					startAngle: reset && animationOpts.animateRotate ? datasetStartAngle : startAngle,
					endAngle: reset && animationOpts.animateRotate ? datasetStartAngle : endAngle,
					label: helpers$1.valueAtIndexOrDefault(labels, index, labels[index])
				}
			});

			arc.pivot();
		},

		countVisibleElements: function() {
			var dataset = this.getDataset();
			var meta = this.getMeta();
			var count = 0;

			helpers$1.each(meta.data, function(element, index) {
				if (!isNaN(dataset.data[index]) && !element.hidden) {
					count++;
				}
			});

			return count;
		},

		/**
		 * @protected
		 */
		setHoverStyle: function(arc) {
			var model = arc._model;
			var options = arc._options;
			var getHoverColor = helpers$1.getHoverColor;
			var valueOrDefault = helpers$1.valueOrDefault;

			arc.$previousStyle = {
				backgroundColor: model.backgroundColor,
				borderColor: model.borderColor,
				borderWidth: model.borderWidth,
			};

			model.backgroundColor = valueOrDefault(options.hoverBackgroundColor, getHoverColor(options.backgroundColor));
			model.borderColor = valueOrDefault(options.hoverBorderColor, getHoverColor(options.borderColor));
			model.borderWidth = valueOrDefault(options.hoverBorderWidth, options.borderWidth);
		},

		/**
		 * @private
		 */
		_computeAngle: function(index) {
			var me = this;
			var count = this.getMeta().count;
			var dataset = me.getDataset();
			var meta = me.getMeta();

			if (isNaN(dataset.data[index]) || meta.data[index].hidden) {
				return 0;
			}

			// Scriptable options
			var context = {
				chart: me.chart,
				dataIndex: index,
				dataset: dataset,
				datasetIndex: me.index
			};

			return resolve$3([
				me.chart.options.elements.arc.angle,
				(2 * Math.PI) / count
			], context, index);
		}
	});

	core_defaults._set('pie', helpers$1.clone(core_defaults.doughnut));
	core_defaults._set('pie', {
		cutoutPercentage: 0
	});

	// Pie charts are Doughnut chart with different defaults
	var controller_pie = controller_doughnut;

	var valueOrDefault$7 = helpers$1.valueOrDefault;

	core_defaults._set('radar', {
		spanGaps: false,
		scale: {
			type: 'radialLinear'
		},
		elements: {
			line: {
				fill: 'start',
				tension: 0 // no bezier in radar
			}
		}
	});

	var controller_radar = core_datasetController.extend({
		datasetElementType: elements.Line,

		dataElementType: elements.Point,

		linkScales: helpers$1.noop,

		/**
		 * @private
		 */
		_datasetElementOptions: [
			'backgroundColor',
			'borderWidth',
			'borderColor',
			'borderCapStyle',
			'borderDash',
			'borderDashOffset',
			'borderJoinStyle',
			'fill'
		],

		/**
		 * @private
		 */
		_dataElementOptions: {
			backgroundColor: 'pointBackgroundColor',
			borderColor: 'pointBorderColor',
			borderWidth: 'pointBorderWidth',
			hitRadius: 'pointHitRadius',
			hoverBackgroundColor: 'pointHoverBackgroundColor',
			hoverBorderColor: 'pointHoverBorderColor',
			hoverBorderWidth: 'pointHoverBorderWidth',
			hoverRadius: 'pointHoverRadius',
			pointStyle: 'pointStyle',
			radius: 'pointRadius',
			rotation: 'pointRotation'
		},

		/**
		 * @private
		 */
		_getIndexScaleId: function() {
			return this.chart.scale.id;
		},

		/**
		 * @private
		 */
		_getValueScaleId: function() {
			return this.chart.scale.id;
		},

		update: function(reset) {
			var me = this;
			var meta = me.getMeta();
			var line = meta.dataset;
			var points = meta.data || [];
			var scale = me.chart.scale;
			var config = me._config;
			var i, ilen;

			// Compatibility: If the properties are defined with only the old name, use those values
			if (config.tension !== undefined && config.lineTension === undefined) {
				config.lineTension = config.tension;
			}

			// Utility
			line._scale = scale;
			line._datasetIndex = me.index;
			// Data
			line._children = points;
			line._loop = true;
			// Model
			line._model = me._resolveDatasetElementOptions(line);

			line.pivot();

			// Update Points
			for (i = 0, ilen = points.length; i < ilen; ++i) {
				me.updateElement(points[i], i, reset);
			}

			// Update bezier control points
			me.updateBezierControlPoints();

			// Now pivot the point for animation
			for (i = 0, ilen = points.length; i < ilen; ++i) {
				points[i].pivot();
			}
		},

		updateElement: function(point, index, reset) {
			var me = this;
			var custom = point.custom || {};
			var dataset = me.getDataset();
			var scale = me.chart.scale;
			var pointPosition = scale.getPointPositionForValue(index, dataset.data[index]);
			var options = me._resolveDataElementOptions(point, index);
			var lineModel = me.getMeta().dataset._model;
			var x = reset ? scale.xCenter : pointPosition.x;
			var y = reset ? scale.yCenter : pointPosition.y;

			// Utility
			point._scale = scale;
			point._options = options;
			point._datasetIndex = me.index;
			point._index = index;

			// Desired view properties
			point._model = {
				x: x, // value not used in dataset scale, but we want a consistent API between scales
				y: y,
				skip: custom.skip || isNaN(x) || isNaN(y),
				// Appearance
				radius: options.radius,
				pointStyle: options.pointStyle,
				rotation: options.rotation,
				backgroundColor: options.backgroundColor,
				borderColor: options.borderColor,
				borderWidth: options.borderWidth,
				tension: valueOrDefault$7(custom.tension, lineModel ? lineModel.tension : 0),

				// Tooltip
				hitRadius: options.hitRadius
			};
		},

		/**
		 * @private
		 */
		_resolveDatasetElementOptions: function() {
			var me = this;
			var config = me._config;
			var options = me.chart.options;
			var values = core_datasetController.prototype._resolveDatasetElementOptions.apply(me, arguments);

			values.spanGaps = valueOrDefault$7(config.spanGaps, options.spanGaps);
			values.tension = valueOrDefault$7(config.lineTension, options.elements.line.tension);

			return values;
		},

		updateBezierControlPoints: function() {
			var me = this;
			var meta = me.getMeta();
			var area = me.chart.chartArea;
			var points = meta.data || [];
			var i, ilen, model, controlPoints;

			// Only consider points that are drawn in case the spanGaps option is used
			if (meta.dataset._model.spanGaps) {
				points = points.filter(function(pt) {
					return !pt._model.skip;
				});
			}

			function capControlPoint(pt, min, max) {
				return Math.max(Math.min(pt, max), min);
			}

			for (i = 0, ilen = points.length; i < ilen; ++i) {
				model = points[i]._model;
				controlPoints = helpers$1.splineCurve(
					helpers$1.previousItem(points, i, true)._model,
					model,
					helpers$1.nextItem(points, i, true)._model,
					model.tension
				);

				// Prevent the bezier going outside of the bounds of the graph
				model.controlPointPreviousX = capControlPoint(controlPoints.previous.x, area.left, area.right);
				model.controlPointPreviousY = capControlPoint(controlPoints.previous.y, area.top, area.bottom);
				model.controlPointNextX = capControlPoint(controlPoints.next.x, area.left, area.right);
				model.controlPointNextY = capControlPoint(controlPoints.next.y, area.top, area.bottom);
			}
		},

		setHoverStyle: function(point) {
			var model = point._model;
			var options = point._options;
			var getHoverColor = helpers$1.getHoverColor;

			point.$previousStyle = {
				backgroundColor: model.backgroundColor,
				borderColor: model.borderColor,
				borderWidth: model.borderWidth,
				radius: model.radius
			};

			model.backgroundColor = valueOrDefault$7(options.hoverBackgroundColor, getHoverColor(options.backgroundColor));
			model.borderColor = valueOrDefault$7(options.hoverBorderColor, getHoverColor(options.borderColor));
			model.borderWidth = valueOrDefault$7(options.hoverBorderWidth, options.borderWidth);
			model.radius = valueOrDefault$7(options.hoverRadius, options.radius);
		}
	});

	core_defaults._set('scatter', {
		hover: {
			mode: 'single'
		},

		scales: {
			xAxes: [{
				id: 'x-axis-1',    // need an ID so datasets can reference the scale
				type: 'linear',    // scatter should not use a category axis
				position: 'bottom'
			}],
			yAxes: [{
				id: 'y-axis-1',
				type: 'linear',
				position: 'left'
			}]
		},

		tooltips: {
			callbacks: {
				title: function() {
					return '';     // doesn't make sense for scatter since data are formatted as a point
				},
				label: function(item) {
					return '(' + item.xLabel + ', ' + item.yLabel + ')';
				}
			}
		}
	});

	core_defaults._set('global', {
		datasets: {
			scatter: {
				showLine: false
			}
		}
	});

	// Scatter charts use line controllers
	var controller_scatter = controller_line;

	// NOTE export a map in which the key represents the controller type, not
	// the class, and so must be CamelCase in order to be correctly retrieved
	// by the controller in core.controller.js (`controllers[meta.type]`).

	var controllers = {
		bar: controller_bar,
		bubble: controller_bubble,
		doughnut: controller_doughnut,
		horizontalBar: controller_horizontalBar,
		line: controller_line,
		polarArea: controller_polarArea,
		pie: controller_pie,
		radar: controller_radar,
		scatter: controller_scatter
	};

	/**
	 * Helper function to get relative position for an event
	 * @param {Event|IEvent} event - The event to get the position for
	 * @param {Chart} chart - The chart
	 * @returns {object} the event position
	 */
	function getRelativePosition(e, chart) {
		if (e.native) {
			return {
				x: e.x,
				y: e.y
			};
		}

		return helpers$1.getRelativePosition(e, chart);
	}

	/**
	 * Helper function to traverse all of the visible elements in the chart
	 * @param {Chart} chart - the chart
	 * @param {function} handler - the callback to execute for each visible item
	 */
	function parseVisibleItems(chart, handler) {
		var metasets = chart._getSortedVisibleDatasetMetas();
		var metadata, i, j, ilen, jlen, element;

		for (i = 0, ilen = metasets.length; i < ilen; ++i) {
			metadata = metasets[i].data;
			for (j = 0, jlen = metadata.length; j < jlen; ++j) {
				element = metadata[j];
				if (!element._view.skip) {
					handler(element);
				}
			}
		}
	}

	/**
	 * Helper function to get the items that intersect the event position
	 * @param {ChartElement[]} items - elements to filter
	 * @param {object} position - the point to be nearest to
	 * @return {ChartElement[]} the nearest items
	 */
	function getIntersectItems(chart, position) {
		var elements = [];

		parseVisibleItems(chart, function(element) {
			if (element.inRange(position.x, position.y)) {
				elements.push(element);
			}
		});

		return elements;
	}

	/**
	 * Helper function to get the items nearest to the event position considering all visible items in teh chart
	 * @param {Chart} chart - the chart to look at elements from
	 * @param {object} position - the point to be nearest to
	 * @param {boolean} intersect - if true, only consider items that intersect the position
	 * @param {function} distanceMetric - function to provide the distance between points
	 * @return {ChartElement[]} the nearest items
	 */
	function getNearestItems(chart, position, intersect, distanceMetric) {
		var minDistance = Number.POSITIVE_INFINITY;
		var nearestItems = [];

		parseVisibleItems(chart, function(element) {
			if (intersect && !element.inRange(position.x, position.y)) {
				return;
			}

			var center = element.getCenterPoint();
			var distance = distanceMetric(position, center);
			if (distance < minDistance) {
				nearestItems = [element];
				minDistance = distance;
			} else if (distance === minDistance) {
				// Can have multiple items at the same distance in which case we sort by size
				nearestItems.push(element);
			}
		});

		return nearestItems;
	}

	/**
	 * Get a distance metric function for two points based on the
	 * axis mode setting
	 * @param {string} axis - the axis mode. x|y|xy
	 */
	function getDistanceMetricForAxis(axis) {
		var useX = axis.indexOf('x') !== -1;
		var useY = axis.indexOf('y') !== -1;

		return function(pt1, pt2) {
			var deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
			var deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
			return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
		};
	}

	function indexMode(chart, e, options) {
		var position = getRelativePosition(e, chart);
		// Default axis for index mode is 'x' to match old behaviour
		options.axis = options.axis || 'x';
		var distanceMetric = getDistanceMetricForAxis(options.axis);
		var items = options.intersect ? getIntersectItems(chart, position) : getNearestItems(chart, position, false, distanceMetric);
		var elements = [];

		if (!items.length) {
			return [];
		}

		chart._getSortedVisibleDatasetMetas().forEach(function(meta) {
			var element = meta.data[items[0]._index];

			// don't count items that are skipped (null data)
			if (element && !element._view.skip) {
				elements.push(element);
			}
		});

		return elements;
	}

	/**
	 * @interface IInteractionOptions
	 */
	/**
	 * If true, only consider items that intersect the point
	 * @name IInterfaceOptions#boolean
	 * @type Boolean
	 */

	/**
	 * Contains interaction related functions
	 * @namespace Chart.Interaction
	 */
	var core_interaction = {
		// Helper function for different modes
		modes: {
			single: function(chart, e) {
				var position = getRelativePosition(e, chart);
				var elements = [];

				parseVisibleItems(chart, function(element) {
					if (element.inRange(position.x, position.y)) {
						elements.push(element);
						return elements;
					}
				});

				return elements.slice(0, 1);
			},

			/**
			 * @function Chart.Interaction.modes.label
			 * @deprecated since version 2.4.0
			 * @todo remove at version 3
			 * @private
			 */
			label: indexMode,

			/**
			 * Returns items at the same index. If the options.intersect parameter is true, we only return items if we intersect something
			 * If the options.intersect mode is false, we find the nearest item and return the items at the same index as that item
			 * @function Chart.Interaction.modes.index
			 * @since v2.4.0
			 * @param {Chart} chart - the chart we are returning items from
			 * @param {Event} e - the event we are find things at
			 * @param {IInteractionOptions} options - options to use during interaction
			 * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
			 */
			index: indexMode,

			/**
			 * Returns items in the same dataset. If the options.intersect parameter is true, we only return items if we intersect something
			 * If the options.intersect is false, we find the nearest item and return the items in that dataset
			 * @function Chart.Interaction.modes.dataset
			 * @param {Chart} chart - the chart we are returning items from
			 * @param {Event} e - the event we are find things at
			 * @param {IInteractionOptions} options - options to use during interaction
			 * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
			 */
			dataset: function(chart, e, options) {
				var position = getRelativePosition(e, chart);
				options.axis = options.axis || 'xy';
				var distanceMetric = getDistanceMetricForAxis(options.axis);
				var items = options.intersect ? getIntersectItems(chart, position) : getNearestItems(chart, position, false, distanceMetric);

				if (items.length > 0) {
					items = chart.getDatasetMeta(items[0]._datasetIndex).data;
				}

				return items;
			},

			/**
			 * @function Chart.Interaction.modes.x-axis
			 * @deprecated since version 2.4.0. Use index mode and intersect == true
			 * @todo remove at version 3
			 * @private
			 */
			'x-axis': function(chart, e) {
				return indexMode(chart, e, {intersect: false});
			},

			/**
			 * Point mode returns all elements that hit test based on the event position
			 * of the event
			 * @function Chart.Interaction.modes.intersect
			 * @param {Chart} chart - the chart we are returning items from
			 * @param {Event} e - the event we are find things at
			 * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
			 */
			point: function(chart, e) {
				var position = getRelativePosition(e, chart);
				return getIntersectItems(chart, position);
			},

			/**
			 * nearest mode returns the element closest to the point
			 * @function Chart.Interaction.modes.intersect
			 * @param {Chart} chart - the chart we are returning items from
			 * @param {Event} e - the event we are find things at
			 * @param {IInteractionOptions} options - options to use
			 * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
			 */
			nearest: function(chart, e, options) {
				var position = getRelativePosition(e, chart);
				options.axis = options.axis || 'xy';
				var distanceMetric = getDistanceMetricForAxis(options.axis);
				return getNearestItems(chart, position, options.intersect, distanceMetric);
			},

			/**
			 * x mode returns the elements that hit-test at the current x coordinate
			 * @function Chart.Interaction.modes.x
			 * @param {Chart} chart - the chart we are returning items from
			 * @param {Event} e - the event we are find things at
			 * @param {IInteractionOptions} options - options to use
			 * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
			 */
			x: function(chart, e, options) {
				var position = getRelativePosition(e, chart);
				var items = [];
				var intersectsItem = false;

				parseVisibleItems(chart, function(element) {
					if (element.inXRange(position.x)) {
						items.push(element);
					}

					if (element.inRange(position.x, position.y)) {
						intersectsItem = true;
					}
				});

				// If we want to trigger on an intersect and we don't have any items
				// that intersect the position, return nothing
				if (options.intersect && !intersectsItem) {
					items = [];
				}
				return items;
			},

			/**
			 * y mode returns the elements that hit-test at the current y coordinate
			 * @function Chart.Interaction.modes.y
			 * @param {Chart} chart - the chart we are returning items from
			 * @param {Event} e - the event we are find things at
			 * @param {IInteractionOptions} options - options to use
			 * @return {Chart.Element[]} Array of elements that are under the point. If none are found, an empty array is returned
			 */
			y: function(chart, e, options) {
				var position = getRelativePosition(e, chart);
				var items = [];
				var intersectsItem = false;

				parseVisibleItems(chart, function(element) {
					if (element.inYRange(position.y)) {
						items.push(element);
					}

					if (element.inRange(position.x, position.y)) {
						intersectsItem = true;
					}
				});

				// If we want to trigger on an intersect and we don't have any items
				// that intersect the position, return nothing
				if (options.intersect && !intersectsItem) {
					items = [];
				}
				return items;
			}
		}
	};

	var extend = helpers$1.extend;

	function filterByPosition(array, position) {
		return helpers$1.where(array, function(v) {
			return v.pos === position;
		});
	}

	function sortByWeight(array, reverse) {
		return array.sort(function(a, b) {
			var v0 = reverse ? b : a;
			var v1 = reverse ? a : b;
			return v0.weight === v1.weight ?
				v0.index - v1.index :
				v0.weight - v1.weight;
		});
	}

	function wrapBoxes(boxes) {
		var layoutBoxes = [];
		var i, ilen, box;

		for (i = 0, ilen = (boxes || []).length; i < ilen; ++i) {
			box = boxes[i];
			layoutBoxes.push({
				index: i,
				box: box,
				pos: box.position,
				horizontal: box.isHorizontal(),
				weight: box.weight
			});
		}
		return layoutBoxes;
	}

	function setLayoutDims(layouts, params) {
		var i, ilen, layout;
		for (i = 0, ilen = layouts.length; i < ilen; ++i) {
			layout = layouts[i];
			// store width used instead of chartArea.w in fitBoxes
			layout.width = layout.horizontal
				? layout.box.fullWidth && params.availableWidth
				: params.vBoxMaxWidth;
			// store height used instead of chartArea.h in fitBoxes
			layout.height = layout.horizontal && params.hBoxMaxHeight;
		}
	}

	function buildLayoutBoxes(boxes) {
		var layoutBoxes = wrapBoxes(boxes);
		var left = sortByWeight(filterByPosition(layoutBoxes, 'left'), true);
		var right = sortByWeight(filterByPosition(layoutBoxes, 'right'));
		var top = sortByWeight(filterByPosition(layoutBoxes, 'top'), true);
		var bottom = sortByWeight(filterByPosition(layoutBoxes, 'bottom'));

		return {
			leftAndTop: left.concat(top),
			rightAndBottom: right.concat(bottom),
			chartArea: filterByPosition(layoutBoxes, 'chartArea'),
			vertical: left.concat(right),
			horizontal: top.concat(bottom)
		};
	}

	function getCombinedMax(maxPadding, chartArea, a, b) {
		return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
	}

	function updateDims(chartArea, params, layout) {
		var box = layout.box;
		var maxPadding = chartArea.maxPadding;
		var newWidth, newHeight;

		if (layout.size) {
			// this layout was already counted for, lets first reduce old size
			chartArea[layout.pos] -= layout.size;
		}
		layout.size = layout.horizontal ? box.height : box.width;
		chartArea[layout.pos] += layout.size;

		if (box.getPadding) {
			var boxPadding = box.getPadding();
			maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
			maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
			maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
			maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
		}

		newWidth = params.outerWidth - getCombinedMax(maxPadding, chartArea, 'left', 'right');
		newHeight = params.outerHeight - getCombinedMax(maxPadding, chartArea, 'top', 'bottom');

		if (newWidth !== chartArea.w || newHeight !== chartArea.h) {
			chartArea.w = newWidth;
			chartArea.h = newHeight;

			// return true if chart area changed in layout's direction
			return layout.horizontal ? newWidth !== chartArea.w : newHeight !== chartArea.h;
		}
	}

	function handleMaxPadding(chartArea) {
		var maxPadding = chartArea.maxPadding;

		function updatePos(pos) {
			var change = Math.max(maxPadding[pos] - chartArea[pos], 0);
			chartArea[pos] += change;
			return change;
		}
		chartArea.y += updatePos('top');
		chartArea.x += updatePos('left');
		updatePos('right');
		updatePos('bottom');
	}

	function getMargins(horizontal, chartArea) {
		var maxPadding = chartArea.maxPadding;

		function marginForPositions(positions) {
			var margin = {left: 0, top: 0, right: 0, bottom: 0};
			positions.forEach(function(pos) {
				margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
			});
			return margin;
		}

		return horizontal
			? marginForPositions(['left', 'right'])
			: marginForPositions(['top', 'bottom']);
	}

	function fitBoxes(boxes, chartArea, params) {
		var refitBoxes = [];
		var i, ilen, layout, box, refit, changed;

		for (i = 0, ilen = boxes.length; i < ilen; ++i) {
			layout = boxes[i];
			box = layout.box;

			box.update(
				layout.width || chartArea.w,
				layout.height || chartArea.h,
				getMargins(layout.horizontal, chartArea)
			);
			if (updateDims(chartArea, params, layout)) {
				changed = true;
				if (refitBoxes.length) {
					// Dimensions changed and there were non full width boxes before this
					// -> we have to refit those
					refit = true;
				}
			}
			if (!box.fullWidth) { // fullWidth boxes don't need to be re-fitted in any case
				refitBoxes.push(layout);
			}
		}

		return refit ? fitBoxes(refitBoxes, chartArea, params) || changed : changed;
	}

	function placeBoxes(boxes, chartArea, params) {
		var userPadding = params.padding;
		var x = chartArea.x;
		var y = chartArea.y;
		var i, ilen, layout, box;

		for (i = 0, ilen = boxes.length; i < ilen; ++i) {
			layout = boxes[i];
			box = layout.box;
			if (layout.horizontal) {
				box.left = box.fullWidth ? userPadding.left : chartArea.left;
				box.right = box.fullWidth ? params.outerWidth - userPadding.right : chartArea.left + chartArea.w;
				box.top = y;
				box.bottom = y + box.height;
				box.width = box.right - box.left;
				y = box.bottom;
			} else {
				box.left = x;
				box.right = x + box.width;
				box.top = chartArea.top;
				box.bottom = chartArea.top + chartArea.h;
				box.height = box.bottom - box.top;
				x = box.right;
			}
		}

		chartArea.x = x;
		chartArea.y = y;
	}

	core_defaults._set('global', {
		layout: {
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		}
	});

	/**
	 * @interface ILayoutItem
	 * @prop {string} position - The position of the item in the chart layout. Possible values are
	 * 'left', 'top', 'right', 'bottom', and 'chartArea'
	 * @prop {number} weight - The weight used to sort the item. Higher weights are further away from the chart area
	 * @prop {boolean} fullWidth - if true, and the item is horizontal, then push vertical boxes down
	 * @prop {function} isHorizontal - returns true if the layout item is horizontal (ie. top or bottom)
	 * @prop {function} update - Takes two parameters: width and height. Returns size of item
	 * @prop {function} getPadding -  Returns an object with padding on the edges
	 * @prop {number} width - Width of item. Must be valid after update()
	 * @prop {number} height - Height of item. Must be valid after update()
	 * @prop {number} left - Left edge of the item. Set by layout system and cannot be used in update
	 * @prop {number} top - Top edge of the item. Set by layout system and cannot be used in update
	 * @prop {number} right - Right edge of the item. Set by layout system and cannot be used in update
	 * @prop {number} bottom - Bottom edge of the item. Set by layout system and cannot be used in update
	 */

	// The layout service is very self explanatory.  It's responsible for the layout within a chart.
	// Scales, Legends and Plugins all rely on the layout service and can easily register to be placed anywhere they need
	// It is this service's responsibility of carrying out that layout.
	var core_layouts = {
		defaults: {},

		/**
		 * Register a box to a chart.
		 * A box is simply a reference to an object that requires layout. eg. Scales, Legend, Title.
		 * @param {Chart} chart - the chart to use
		 * @param {ILayoutItem} item - the item to add to be layed out
		 */
		addBox: function(chart, item) {
			if (!chart.boxes) {
				chart.boxes = [];
			}

			// initialize item with default values
			item.fullWidth = item.fullWidth || false;
			item.position = item.position || 'top';
			item.weight = item.weight || 0;
			item._layers = item._layers || function() {
				return [{
					z: 0,
					draw: function() {
						item.draw.apply(item, arguments);
					}
				}];
			};

			chart.boxes.push(item);
		},

		/**
		 * Remove a layoutItem from a chart
		 * @param {Chart} chart - the chart to remove the box from
		 * @param {ILayoutItem} layoutItem - the item to remove from the layout
		 */
		removeBox: function(chart, layoutItem) {
			var index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
			if (index !== -1) {
				chart.boxes.splice(index, 1);
			}
		},

		/**
		 * Sets (or updates) options on the given `item`.
		 * @param {Chart} chart - the chart in which the item lives (or will be added to)
		 * @param {ILayoutItem} item - the item to configure with the given options
		 * @param {object} options - the new item options.
		 */
		configure: function(chart, item, options) {
			var props = ['fullWidth', 'position', 'weight'];
			var ilen = props.length;
			var i = 0;
			var prop;

			for (; i < ilen; ++i) {
				prop = props[i];
				if (options.hasOwnProperty(prop)) {
					item[prop] = options[prop];
				}
			}
		},

		/**
		 * Fits boxes of the given chart into the given size by having each box measure itself
		 * then running a fitting algorithm
		 * @param {Chart} chart - the chart
		 * @param {number} width - the width to fit into
		 * @param {number} height - the height to fit into
		 */
		update: function(chart, width, height) {
			if (!chart) {
				return;
			}

			var layoutOptions = chart.options.layout || {};
			var padding = helpers$1.options.toPadding(layoutOptions.padding);

			var availableWidth = width - padding.width;
			var availableHeight = height - padding.height;
			var boxes = buildLayoutBoxes(chart.boxes);
			var verticalBoxes = boxes.vertical;
			var horizontalBoxes = boxes.horizontal;

			// Essentially we now have any number of boxes on each of the 4 sides.
			// Our canvas looks like the following.
			// The areas L1 and L2 are the left axes. R1 is the right axis, T1 is the top axis and
			// B1 is the bottom axis
			// There are also 4 quadrant-like locations (left to right instead of clockwise) reserved for chart overlays
			// These locations are single-box locations only, when trying to register a chartArea location that is already taken,
			// an error will be thrown.
			//
			// |----------------------------------------------------|
			// |                  T1 (Full Width)                   |
			// |----------------------------------------------------|
			// |    |    |                 T2                  |    |
			// |    |----|-------------------------------------|----|
			// |    |    | C1 |                           | C2 |    |
			// |    |    |----|                           |----|    |
			// |    |    |                                     |    |
			// | L1 | L2 |           ChartArea (C0)            | R1 |
			// |    |    |                                     |    |
			// |    |    |----|                           |----|    |
			// |    |    | C3 |                           | C4 |    |
			// |    |----|-------------------------------------|----|
			// |    |    |                 B1                  |    |
			// |----------------------------------------------------|
			// |                  B2 (Full Width)                   |
			// |----------------------------------------------------|
			//

			var params = Object.freeze({
				outerWidth: width,
				outerHeight: height,
				padding: padding,
				availableWidth: availableWidth,
				vBoxMaxWidth: availableWidth / 2 / verticalBoxes.length,
				hBoxMaxHeight: availableHeight / 2
			});
			var chartArea = extend({
				maxPadding: extend({}, padding),
				w: availableWidth,
				h: availableHeight,
				x: padding.left,
				y: padding.top
			}, padding);

			setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);

			// First fit vertical boxes
			fitBoxes(verticalBoxes, chartArea, params);

			// Then fit horizontal boxes
			if (fitBoxes(horizontalBoxes, chartArea, params)) {
				// if the area changed, re-fit vertical boxes
				fitBoxes(verticalBoxes, chartArea, params);
			}

			handleMaxPadding(chartArea);

			// Finally place the boxes to correct coordinates
			placeBoxes(boxes.leftAndTop, chartArea, params);

			// Move to opposite side of chart
			chartArea.x += chartArea.w;
			chartArea.y += chartArea.h;

			placeBoxes(boxes.rightAndBottom, chartArea, params);

			chart.chartArea = {
				left: chartArea.left,
				top: chartArea.top,
				right: chartArea.left + chartArea.w,
				bottom: chartArea.top + chartArea.h
			};

			// Finally update boxes in chartArea (radial scale for example)
			helpers$1.each(boxes.chartArea, function(layout) {
				var box = layout.box;
				extend(box, chart.chartArea);
				box.update(chartArea.w, chartArea.h);
			});
		}
	};

	/**
	 * Platform fallback implementation (minimal).
	 * @see https://github.com/chartjs/Chart.js/pull/4591#issuecomment-319575939
	 */

	var platform_basic = {
		acquireContext: function(item) {
			if (item && item.canvas) {
				// Support for any object associated to a canvas (including a context2d)
				item = item.canvas;
			}

			return item && item.getContext('2d') || null;
		}
	};

	var platform_dom = "/*\n * DOM element rendering detection\n * https://davidwalsh.name/detect-node-insertion\n */\n@keyframes chartjs-render-animation {\n\tfrom { opacity: 0.99; }\n\tto { opacity: 1; }\n}\n\n.chartjs-render-monitor {\n\tanimation: chartjs-render-animation 0.001s;\n}\n\n/*\n * DOM element resizing detection\n * https://github.com/marcj/css-element-queries\n */\n.chartjs-size-monitor,\n.chartjs-size-monitor-expand,\n.chartjs-size-monitor-shrink {\n\tposition: absolute;\n\tdirection: ltr;\n\tleft: 0;\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\toverflow: hidden;\n\tpointer-events: none;\n\tvisibility: hidden;\n\tz-index: -1;\n}\n\n.chartjs-size-monitor-expand > div {\n\tposition: absolute;\n\twidth: 1000000px;\n\theight: 1000000px;\n\tleft: 0;\n\ttop: 0;\n}\n\n.chartjs-size-monitor-shrink > div {\n\tposition: absolute;\n\twidth: 200%;\n\theight: 200%;\n\tleft: 0;\n\ttop: 0;\n}\n";

	var platform_dom$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': platform_dom
	});

	var stylesheet = getCjsExportFromNamespace(platform_dom$1);

	var EXPANDO_KEY = '$chartjs';
	var CSS_PREFIX = 'chartjs-';
	var CSS_SIZE_MONITOR = CSS_PREFIX + 'size-monitor';
	var CSS_RENDER_MONITOR = CSS_PREFIX + 'render-monitor';
	var CSS_RENDER_ANIMATION = CSS_PREFIX + 'render-animation';
	var ANIMATION_START_EVENTS = ['animationstart', 'webkitAnimationStart'];

	/**
	 * DOM event types -> Chart.js event types.
	 * Note: only events with different types are mapped.
	 * @see https://developer.mozilla.org/en-US/docs/Web/Events
	 */
	var EVENT_TYPES = {
		touchstart: 'mousedown',
		touchmove: 'mousemove',
		touchend: 'mouseup',
		pointerenter: 'mouseenter',
		pointerdown: 'mousedown',
		pointermove: 'mousemove',
		pointerup: 'mouseup',
		pointerleave: 'mouseout',
		pointerout: 'mouseout'
	};

	/**
	 * The "used" size is the final value of a dimension property after all calculations have
	 * been performed. This method uses the computed style of `element` but returns undefined
	 * if the computed style is not expressed in pixels. That can happen in some cases where
	 * `element` has a size relative to its parent and this last one is not yet displayed,
	 * for example because of `display: none` on a parent node.
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/used_value
	 * @returns {number} Size in pixels or undefined if unknown.
	 */
	function readUsedSize(element, property) {
		var value = helpers$1.getStyle(element, property);
		var matches = value && value.match(/^(\d+)(\.\d+)?px$/);
		return matches ? Number(matches[1]) : undefined;
	}

	/**
	 * Initializes the canvas style and render size without modifying the canvas display size,
	 * since responsiveness is handled by the controller.resize() method. The config is used
	 * to determine the aspect ratio to apply in case no explicit height has been specified.
	 */
	function initCanvas(canvas, config) {
		var style = canvas.style;

		// NOTE(SB) canvas.getAttribute('width') !== canvas.width: in the first case it
		// returns null or '' if no explicit value has been set to the canvas attribute.
		var renderHeight = canvas.getAttribute('height');
		var renderWidth = canvas.getAttribute('width');

		// Chart.js modifies some canvas values that we want to restore on destroy
		canvas[EXPANDO_KEY] = {
			initial: {
				height: renderHeight,
				width: renderWidth,
				style: {
					display: style.display,
					height: style.height,
					width: style.width
				}
			}
		};

		// Force canvas to display as block to avoid extra space caused by inline
		// elements, which would interfere with the responsive resize process.
		// https://github.com/chartjs/Chart.js/issues/2538
		style.display = style.display || 'block';

		if (renderWidth === null || renderWidth === '') {
			var displayWidth = readUsedSize(canvas, 'width');
			if (displayWidth !== undefined) {
				canvas.width = displayWidth;
			}
		}

		if (renderHeight === null || renderHeight === '') {
			if (canvas.style.height === '') {
				// If no explicit render height and style height, let's apply the aspect ratio,
				// which one can be specified by the user but also by charts as default option
				// (i.e. options.aspectRatio). If not specified, use canvas aspect ratio of 2.
				canvas.height = canvas.width / (config.options.aspectRatio || 2);
			} else {
				var displayHeight = readUsedSize(canvas, 'height');
				if (displayWidth !== undefined) {
					canvas.height = displayHeight;
				}
			}
		}

		return canvas;
	}

	/**
	 * Detects support for options object argument in addEventListener.
	 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
	 * @private
	 */
	var supportsEventListenerOptions = (function() {
		var supports = false;
		try {
			var options = Object.defineProperty({}, 'passive', {
				// eslint-disable-next-line getter-return
				get: function() {
					supports = true;
				}
			});
			window.addEventListener('e', null, options);
		} catch (e) {
			// continue regardless of error
		}
		return supports;
	}());

	// Default passive to true as expected by Chrome for 'touchstart' and 'touchend' events.
	// https://github.com/chartjs/Chart.js/issues/4287
	var eventListenerOptions = supportsEventListenerOptions ? {passive: true} : false;

	function addListener(node, type, listener) {
		node.addEventListener(type, listener, eventListenerOptions);
	}

	function removeListener(node, type, listener) {
		node.removeEventListener(type, listener, eventListenerOptions);
	}

	function createEvent(type, chart, x, y, nativeEvent) {
		return {
			type: type,
			chart: chart,
			native: nativeEvent || null,
			x: x !== undefined ? x : null,
			y: y !== undefined ? y : null,
		};
	}

	function fromNativeEvent(event, chart) {
		var type = EVENT_TYPES[event.type] || event.type;
		var pos = helpers$1.getRelativePosition(event, chart);
		return createEvent(type, chart, pos.x, pos.y, event);
	}

	function throttled(fn, thisArg) {
		var ticking = false;
		var args = [];

		return function() {
			args = Array.prototype.slice.call(arguments);
			thisArg = thisArg || this;

			if (!ticking) {
				ticking = true;
				helpers$1.requestAnimFrame.call(window, function() {
					ticking = false;
					fn.apply(thisArg, args);
				});
			}
		};
	}

	function createDiv(cls) {
		var el = document.createElement('div');
		el.className = cls || '';
		return el;
	}

	// Implementation based on https://github.com/marcj/css-element-queries
	function createResizer(handler) {
		var maxSize = 1000000;

		// NOTE(SB) Don't use innerHTML because it could be considered unsafe.
		// https://github.com/chartjs/Chart.js/issues/5902
		var resizer = createDiv(CSS_SIZE_MONITOR);
		var expand = createDiv(CSS_SIZE_MONITOR + '-expand');
		var shrink = createDiv(CSS_SIZE_MONITOR + '-shrink');

		expand.appendChild(createDiv());
		shrink.appendChild(createDiv());

		resizer.appendChild(expand);
		resizer.appendChild(shrink);
		resizer._reset = function() {
			expand.scrollLeft = maxSize;
			expand.scrollTop = maxSize;
			shrink.scrollLeft = maxSize;
			shrink.scrollTop = maxSize;
		};

		var onScroll = function() {
			resizer._reset();
			handler();
		};

		addListener(expand, 'scroll', onScroll.bind(expand, 'expand'));
		addListener(shrink, 'scroll', onScroll.bind(shrink, 'shrink'));

		return resizer;
	}

	// https://davidwalsh.name/detect-node-insertion
	function watchForRender(node, handler) {
		var expando = node[EXPANDO_KEY] || (node[EXPANDO_KEY] = {});
		var proxy = expando.renderProxy = function(e) {
			if (e.animationName === CSS_RENDER_ANIMATION) {
				handler();
			}
		};

		helpers$1.each(ANIMATION_START_EVENTS, function(type) {
			addListener(node, type, proxy);
		});

		// #4737: Chrome might skip the CSS animation when the CSS_RENDER_MONITOR class
		// is removed then added back immediately (same animation frame?). Accessing the
		// `offsetParent` property will force a reflow and re-evaluate the CSS animation.
		// https://gist.github.com/paulirish/5d52fb081b3570c81e3a#box-metrics
		// https://github.com/chartjs/Chart.js/issues/4737
		expando.reflow = !!node.offsetParent;

		node.classList.add(CSS_RENDER_MONITOR);
	}

	function unwatchForRender(node) {
		var expando = node[EXPANDO_KEY] || {};
		var proxy = expando.renderProxy;

		if (proxy) {
			helpers$1.each(ANIMATION_START_EVENTS, function(type) {
				removeListener(node, type, proxy);
			});

			delete expando.renderProxy;
		}

		node.classList.remove(CSS_RENDER_MONITOR);
	}

	function addResizeListener(node, listener, chart) {
		var expando = node[EXPANDO_KEY] || (node[EXPANDO_KEY] = {});

		// Let's keep track of this added resizer and thus avoid DOM query when removing it.
		var resizer = expando.resizer = createResizer(throttled(function() {
			if (expando.resizer) {
				var container = chart.options.maintainAspectRatio && node.parentNode;
				var w = container ? container.clientWidth : 0;
				listener(createEvent('resize', chart));
				if (container && container.clientWidth < w && chart.canvas) {
					// If the container size shrank during chart resize, let's assume
					// scrollbar appeared. So we resize again with the scrollbar visible -
					// effectively making chart smaller and the scrollbar hidden again.
					// Because we are inside `throttled`, and currently `ticking`, scroll
					// events are ignored during this whole 2 resize process.
					// If we assumed wrong and something else happened, we are resizing
					// twice in a frame (potential performance issue)
					listener(createEvent('resize', chart));
				}
			}
		}));

		// The resizer needs to be attached to the node parent, so we first need to be
		// sure that `node` is attached to the DOM before injecting the resizer element.
		watchForRender(node, function() {
			if (expando.resizer) {
				var container = node.parentNode;
				if (container && container !== resizer.parentNode) {
					container.insertBefore(resizer, container.firstChild);
				}

				// The container size might have changed, let's reset the resizer state.
				resizer._reset();
			}
		});
	}

	function removeResizeListener(node) {
		var expando = node[EXPANDO_KEY] || {};
		var resizer = expando.resizer;

		delete expando.resizer;
		unwatchForRender(node);

		if (resizer && resizer.parentNode) {
			resizer.parentNode.removeChild(resizer);
		}
	}

	/**
	 * Injects CSS styles inline if the styles are not already present.
	 * @param {HTMLDocument|ShadowRoot} rootNode - the node to contain the <style>.
	 * @param {string} css - the CSS to be injected.
	 */
	function injectCSS(rootNode, css) {
		// https://stackoverflow.com/q/3922139
		var expando = rootNode[EXPANDO_KEY] || (rootNode[EXPANDO_KEY] = {});
		if (!expando.containsStyles) {
			expando.containsStyles = true;
			css = '/* Chart.js */\n' + css;
			var style = document.createElement('style');
			style.setAttribute('type', 'text/css');
			style.appendChild(document.createTextNode(css));
			rootNode.appendChild(style);
		}
	}

	var platform_dom$2 = {
		/**
		 * When `true`, prevents the automatic injection of the stylesheet required to
		 * correctly detect when the chart is added to the DOM and then resized. This
		 * switch has been added to allow external stylesheet (`dist/Chart(.min)?.js`)
		 * to be manually imported to make this library compatible with any CSP.
		 * See https://github.com/chartjs/Chart.js/issues/5208
		 */
		disableCSSInjection: false,

		/**
		 * This property holds whether this platform is enabled for the current environment.
		 * Currently used by platform.js to select the proper implementation.
		 * @private
		 */
		_enabled: typeof window !== 'undefined' && typeof document !== 'undefined',

		/**
		 * Initializes resources that depend on platform options.
		 * @param {HTMLCanvasElement} canvas - The Canvas element.
		 * @private
		 */
		_ensureLoaded: function(canvas) {
			if (!this.disableCSSInjection) {
				// If the canvas is in a shadow DOM, then the styles must also be inserted
				// into the same shadow DOM.
				// https://github.com/chartjs/Chart.js/issues/5763
				var root = canvas.getRootNode ? canvas.getRootNode() : document;
				var targetNode = root.host ? root : document.head;
				injectCSS(targetNode, stylesheet);
			}
		},

		acquireContext: function(item, config) {
			if (typeof item === 'string') {
				item = document.getElementById(item);
			} else if (item.length) {
				// Support for array based queries (such as jQuery)
				item = item[0];
			}

			if (item && item.canvas) {
				// Support for any object associated to a canvas (including a context2d)
				item = item.canvas;
			}

			// To prevent canvas fingerprinting, some add-ons undefine the getContext
			// method, for example: https://github.com/kkapsner/CanvasBlocker
			// https://github.com/chartjs/Chart.js/issues/2807
			var context = item && item.getContext && item.getContext('2d');

			// `instanceof HTMLCanvasElement/CanvasRenderingContext2D` fails when the item is
			// inside an iframe or when running in a protected environment. We could guess the
			// types from their toString() value but let's keep things flexible and assume it's
			// a sufficient condition if the item has a context2D which has item as `canvas`.
			// https://github.com/chartjs/Chart.js/issues/3887
			// https://github.com/chartjs/Chart.js/issues/4102
			// https://github.com/chartjs/Chart.js/issues/4152
			if (context && context.canvas === item) {
				// Load platform resources on first chart creation, to make it possible to
				// import the library before setting platform options.
				this._ensureLoaded(item);
				initCanvas(item, config);
				return context;
			}

			return null;
		},

		releaseContext: function(context) {
			var canvas = context.canvas;
			if (!canvas[EXPANDO_KEY]) {
				return;
			}

			var initial = canvas[EXPANDO_KEY].initial;
			['height', 'width'].forEach(function(prop) {
				var value = initial[prop];
				if (helpers$1.isNullOrUndef(value)) {
					canvas.removeAttribute(prop);
				} else {
					canvas.setAttribute(prop, value);
				}
			});

			helpers$1.each(initial.style || {}, function(value, key) {
				canvas.style[key] = value;
			});

			// The canvas render size might have been changed (and thus the state stack discarded),
			// we can't use save() and restore() to restore the initial state. So make sure that at
			// least the canvas context is reset to the default state by setting the canvas width.
			// https://www.w3.org/TR/2011/WD-html5-20110525/the-canvas-element.html
			// eslint-disable-next-line no-self-assign
			canvas.width = canvas.width;

			delete canvas[EXPANDO_KEY];
		},

		addEventListener: function(chart, type, listener) {
			var canvas = chart.canvas;
			if (type === 'resize') {
				// Note: the resize event is not supported on all browsers.
				addResizeListener(canvas, listener, chart);
				return;
			}

			var expando = listener[EXPANDO_KEY] || (listener[EXPANDO_KEY] = {});
			var proxies = expando.proxies || (expando.proxies = {});
			var proxy = proxies[chart.id + '_' + type] = function(event) {
				listener(fromNativeEvent(event, chart));
			};

			addListener(canvas, type, proxy);
		},

		removeEventListener: function(chart, type, listener) {
			var canvas = chart.canvas;
			if (type === 'resize') {
				// Note: the resize event is not supported on all browsers.
				removeResizeListener(canvas);
				return;
			}

			var expando = listener[EXPANDO_KEY] || {};
			var proxies = expando.proxies || {};
			var proxy = proxies[chart.id + '_' + type];
			if (!proxy) {
				return;
			}

			removeListener(canvas, type, proxy);
		}
	};

	// DEPRECATIONS

	/**
	 * Provided for backward compatibility, use EventTarget.addEventListener instead.
	 * EventTarget.addEventListener compatibility: Chrome, Opera 7, Safari, FF1.5+, IE9+
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
	 * @function Chart.helpers.addEvent
	 * @deprecated since version 2.7.0
	 * @todo remove at version 3
	 * @private
	 */
	helpers$1.addEvent = addListener;

	/**
	 * Provided for backward compatibility, use EventTarget.removeEventListener instead.
	 * EventTarget.removeEventListener compatibility: Chrome, Opera 7, Safari, FF1.5+, IE9+
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
	 * @function Chart.helpers.removeEvent
	 * @deprecated since version 2.7.0
	 * @todo remove at version 3
	 * @private
	 */
	helpers$1.removeEvent = removeListener;

	// @TODO Make possible to select another platform at build time.
	var implementation = platform_dom$2._enabled ? platform_dom$2 : platform_basic;

	/**
	 * @namespace Chart.platform
	 * @see https://chartjs.gitbooks.io/proposals/content/Platform.html
	 * @since 2.4.0
	 */
	var platform = helpers$1.extend({
		/**
		 * @since 2.7.0
		 */
		initialize: function() {},

		/**
		 * Called at chart construction time, returns a context2d instance implementing
		 * the [W3C Canvas 2D Context API standard]{@link https://www.w3.org/TR/2dcontext/}.
		 * @param {*} item - The native item from which to acquire context (platform specific)
		 * @param {object} options - The chart options
		 * @returns {CanvasRenderingContext2D} context2d instance
		 */
		acquireContext: function() {},

		/**
		 * Called at chart destruction time, releases any resources associated to the context
		 * previously returned by the acquireContext() method.
		 * @param {CanvasRenderingContext2D} context - The context2d instance
		 * @returns {boolean} true if the method succeeded, else false
		 */
		releaseContext: function() {},

		/**
		 * Registers the specified listener on the given chart.
		 * @param {Chart} chart - Chart from which to listen for event
		 * @param {string} type - The ({@link IEvent}) type to listen for
		 * @param {function} listener - Receives a notification (an object that implements
		 * the {@link IEvent} interface) when an event of the specified type occurs.
		 */
		addEventListener: function() {},

		/**
		 * Removes the specified listener previously registered with addEventListener.
		 * @param {Chart} chart - Chart from which to remove the listener
		 * @param {string} type - The ({@link IEvent}) type to remove
		 * @param {function} listener - The listener function to remove from the event target.
		 */
		removeEventListener: function() {}

	}, implementation);

	core_defaults._set('global', {
		plugins: {}
	});

	/**
	 * The plugin service singleton
	 * @namespace Chart.plugins
	 * @since 2.1.0
	 */
	var core_plugins = {
		/**
		 * Globally registered plugins.
		 * @private
		 */
		_plugins: [],

		/**
		 * This identifier is used to invalidate the descriptors cache attached to each chart
		 * when a global plugin is registered or unregistered. In this case, the cache ID is
		 * incremented and descriptors are regenerated during following API calls.
		 * @private
		 */
		_cacheId: 0,

		/**
		 * Registers the given plugin(s) if not already registered.
		 * @param {IPlugin[]|IPlugin} plugins plugin instance(s).
		 */
		register: function(plugins) {
			var p = this._plugins;
			([]).concat(plugins).forEach(function(plugin) {
				if (p.indexOf(plugin) === -1) {
					p.push(plugin);
				}
			});

			this._cacheId++;
		},

		/**
		 * Unregisters the given plugin(s) only if registered.
		 * @param {IPlugin[]|IPlugin} plugins plugin instance(s).
		 */
		unregister: function(plugins) {
			var p = this._plugins;
			([]).concat(plugins).forEach(function(plugin) {
				var idx = p.indexOf(plugin);
				if (idx !== -1) {
					p.splice(idx, 1);
				}
			});

			this._cacheId++;
		},

		/**
		 * Remove all registered plugins.
		 * @since 2.1.5
		 */
		clear: function() {
			this._plugins = [];
			this._cacheId++;
		},

		/**
		 * Returns the number of registered plugins?
		 * @returns {number}
		 * @since 2.1.5
		 */
		count: function() {
			return this._plugins.length;
		},

		/**
		 * Returns all registered plugin instances.
		 * @returns {IPlugin[]} array of plugin objects.
		 * @since 2.1.5
		 */
		getAll: function() {
			return this._plugins;
		},

		/**
		 * Calls enabled plugins for `chart` on the specified hook and with the given args.
		 * This method immediately returns as soon as a plugin explicitly returns false. The
		 * returned value can be used, for instance, to interrupt the current action.
		 * @param {Chart} chart - The chart instance for which plugins should be called.
		 * @param {string} hook - The name of the plugin method to call (e.g. 'beforeUpdate').
		 * @param {Array} [args] - Extra arguments to apply to the hook call.
		 * @returns {boolean} false if any of the plugins return false, else returns true.
		 */
		notify: function(chart, hook, args) {
			var descriptors = this.descriptors(chart);
			var ilen = descriptors.length;
			var i, descriptor, plugin, params, method;

			for (i = 0; i < ilen; ++i) {
				descriptor = descriptors[i];
				plugin = descriptor.plugin;
				method = plugin[hook];
				if (typeof method === 'function') {
					params = [chart].concat(args || []);
					params.push(descriptor.options);
					if (method.apply(plugin, params) === false) {
						return false;
					}
				}
			}

			return true;
		},

		/**
		 * Returns descriptors of enabled plugins for the given chart.
		 * @returns {object[]} [{ plugin, options }]
		 * @private
		 */
		descriptors: function(chart) {
			var cache = chart.$plugins || (chart.$plugins = {});
			if (cache.id === this._cacheId) {
				return cache.descriptors;
			}

			var plugins = [];
			var descriptors = [];
			var config = (chart && chart.config) || {};
			var options = (config.options && config.options.plugins) || {};

			this._plugins.concat(config.plugins || []).forEach(function(plugin) {
				var idx = plugins.indexOf(plugin);
				if (idx !== -1) {
					return;
				}

				var id = plugin.id;
				var opts = options[id];
				if (opts === false) {
					return;
				}

				if (opts === true) {
					opts = helpers$1.clone(core_defaults.global.plugins[id]);
				}

				plugins.push(plugin);
				descriptors.push({
					plugin: plugin,
					options: opts || {}
				});
			});

			cache.descriptors = descriptors;
			cache.id = this._cacheId;
			return descriptors;
		},

		/**
		 * Invalidates cache for the given chart: descriptors hold a reference on plugin option,
		 * but in some cases, this reference can be changed by the user when updating options.
		 * https://github.com/chartjs/Chart.js/issues/5111#issuecomment-355934167
		 * @private
		 */
		_invalidate: function(chart) {
			delete chart.$plugins;
		}
	};

	var core_scaleService = {
		// Scale registration object. Extensions can register new scale types (such as log or DB scales) and then
		// use the new chart options to grab the correct scale
		constructors: {},
		// Use a registration function so that we can move to an ES6 map when we no longer need to support
		// old browsers

		// Scale config defaults
		defaults: {},
		registerScaleType: function(type, scaleConstructor, scaleDefaults) {
			this.constructors[type] = scaleConstructor;
			this.defaults[type] = helpers$1.clone(scaleDefaults);
		},
		getScaleConstructor: function(type) {
			return this.constructors.hasOwnProperty(type) ? this.constructors[type] : undefined;
		},
		getScaleDefaults: function(type) {
			// Return the scale defaults merged with the global settings so that we always use the latest ones
			return this.defaults.hasOwnProperty(type) ? helpers$1.merge({}, [core_defaults.scale, this.defaults[type]]) : {};
		},
		updateScaleDefaults: function(type, additions) {
			var me = this;
			if (me.defaults.hasOwnProperty(type)) {
				me.defaults[type] = helpers$1.extend(me.defaults[type], additions);
			}
		},
		addScalesToLayout: function(chart) {
			// Adds each scale to the chart.boxes array to be sized accordingly
			helpers$1.each(chart.scales, function(scale) {
				// Set ILayoutItem parameters for backwards compatibility
				scale.fullWidth = scale.options.fullWidth;
				scale.position = scale.options.position;
				scale.weight = scale.options.weight;
				core_layouts.addBox(chart, scale);
			});
		}
	};

	var valueOrDefault$8 = helpers$1.valueOrDefault;
	var getRtlHelper = helpers$1.rtl.getRtlAdapter;

	core_defaults._set('global', {
		tooltips: {
			enabled: true,
			custom: null,
			mode: 'nearest',
			position: 'average',
			intersect: true,
			backgroundColor: 'rgba(0,0,0,0.8)',
			titleFontStyle: 'bold',
			titleSpacing: 2,
			titleMarginBottom: 6,
			titleFontColor: '#fff',
			titleAlign: 'left',
			bodySpacing: 2,
			bodyFontColor: '#fff',
			bodyAlign: 'left',
			footerFontStyle: 'bold',
			footerSpacing: 2,
			footerMarginTop: 6,
			footerFontColor: '#fff',
			footerAlign: 'left',
			yPadding: 6,
			xPadding: 6,
			caretPadding: 2,
			caretSize: 5,
			cornerRadius: 6,
			multiKeyBackground: '#fff',
			displayColors: true,
			borderColor: 'rgba(0,0,0,0)',
			borderWidth: 0,
			callbacks: {
				// Args are: (tooltipItems, data)
				beforeTitle: helpers$1.noop,
				title: function(tooltipItems, data) {
					var title = '';
					var labels = data.labels;
					var labelCount = labels ? labels.length : 0;

					if (tooltipItems.length > 0) {
						var item = tooltipItems[0];
						if (item.label) {
							title = item.label;
						} else if (item.xLabel) {
							title = item.xLabel;
						} else if (labelCount > 0 && item.index < labelCount) {
							title = labels[item.index];
						}
					}

					return title;
				},
				afterTitle: helpers$1.noop,

				// Args are: (tooltipItems, data)
				beforeBody: helpers$1.noop,

				// Args are: (tooltipItem, data)
				beforeLabel: helpers$1.noop,
				label: function(tooltipItem, data) {
					var label = data.datasets[tooltipItem.datasetIndex].label || '';

					if (label) {
						label += ': ';
					}
					if (!helpers$1.isNullOrUndef(tooltipItem.value)) {
						label += tooltipItem.value;
					} else {
						label += tooltipItem.yLabel;
					}
					return label;
				},
				labelColor: function(tooltipItem, chart) {
					var meta = chart.getDatasetMeta(tooltipItem.datasetIndex);
					var activeElement = meta.data[tooltipItem.index];
					var view = activeElement._view;
					return {
						borderColor: view.borderColor,
						backgroundColor: view.backgroundColor
					};
				},
				labelTextColor: function() {
					return this._options.bodyFontColor;
				},
				afterLabel: helpers$1.noop,

				// Args are: (tooltipItems, data)
				afterBody: helpers$1.noop,

				// Args are: (tooltipItems, data)
				beforeFooter: helpers$1.noop,
				footer: helpers$1.noop,
				afterFooter: helpers$1.noop
			}
		}
	});

	var positioners = {
		/**
		 * Average mode places the tooltip at the average position of the elements shown
		 * @function Chart.Tooltip.positioners.average
		 * @param elements {ChartElement[]} the elements being displayed in the tooltip
		 * @returns {object} tooltip position
		 */
		average: function(elements) {
			if (!elements.length) {
				return false;
			}

			var i, len;
			var x = 0;
			var y = 0;
			var count = 0;

			for (i = 0, len = elements.length; i < len; ++i) {
				var el = elements[i];
				if (el && el.hasValue()) {
					var pos = el.tooltipPosition();
					x += pos.x;
					y += pos.y;
					++count;
				}
			}

			return {
				x: x / count,
				y: y / count
			};
		},

		/**
		 * Gets the tooltip position nearest of the item nearest to the event position
		 * @function Chart.Tooltip.positioners.nearest
		 * @param elements {Chart.Element[]} the tooltip elements
		 * @param eventPosition {object} the position of the event in canvas coordinates
		 * @returns {object} the tooltip position
		 */
		nearest: function(elements, eventPosition) {
			var x = eventPosition.x;
			var y = eventPosition.y;
			var minDistance = Number.POSITIVE_INFINITY;
			var i, len, nearestElement;

			for (i = 0, len = elements.length; i < len; ++i) {
				var el = elements[i];
				if (el && el.hasValue()) {
					var center = el.getCenterPoint();
					var d = helpers$1.distanceBetweenPoints(eventPosition, center);

					if (d < minDistance) {
						minDistance = d;
						nearestElement = el;
					}
				}
			}

			if (nearestElement) {
				var tp = nearestElement.tooltipPosition();
				x = tp.x;
				y = tp.y;
			}

			return {
				x: x,
				y: y
			};
		}
	};

	// Helper to push or concat based on if the 2nd parameter is an array or not
	function pushOrConcat(base, toPush) {
		if (toPush) {
			if (helpers$1.isArray(toPush)) {
				// base = base.concat(toPush);
				Array.prototype.push.apply(base, toPush);
			} else {
				base.push(toPush);
			}
		}

		return base;
	}

	/**
	 * Returns array of strings split by newline
	 * @param {string} value - The value to split by newline.
	 * @returns {string[]} value if newline present - Returned from String split() method
	 * @function
	 */
	function splitNewlines(str) {
		if ((typeof str === 'string' || str instanceof String) && str.indexOf('\n') > -1) {
			return str.split('\n');
		}
		return str;
	}


	/**
	 * Private helper to create a tooltip item model
	 * @param element - the chart element (point, arc, bar) to create the tooltip item for
	 * @return new tooltip item
	 */
	function createTooltipItem(element) {
		var xScale = element._xScale;
		var yScale = element._yScale || element._scale; // handle radar || polarArea charts
		var index = element._index;
		var datasetIndex = element._datasetIndex;
		var controller = element._chart.getDatasetMeta(datasetIndex).controller;
		var indexScale = controller._getIndexScale();
		var valueScale = controller._getValueScale();

		return {
			xLabel: xScale ? xScale.getLabelForIndex(index, datasetIndex) : '',
			yLabel: yScale ? yScale.getLabelForIndex(index, datasetIndex) : '',
			label: indexScale ? '' + indexScale.getLabelForIndex(index, datasetIndex) : '',
			value: valueScale ? '' + valueScale.getLabelForIndex(index, datasetIndex) : '',
			index: index,
			datasetIndex: datasetIndex,
			x: element._model.x,
			y: element._model.y
		};
	}

	/**
	 * Helper to get the reset model for the tooltip
	 * @param tooltipOpts {object} the tooltip options
	 */
	function getBaseModel(tooltipOpts) {
		var globalDefaults = core_defaults.global;

		return {
			// Positioning
			xPadding: tooltipOpts.xPadding,
			yPadding: tooltipOpts.yPadding,
			xAlign: tooltipOpts.xAlign,
			yAlign: tooltipOpts.yAlign,

			// Drawing direction and text direction
			rtl: tooltipOpts.rtl,
			textDirection: tooltipOpts.textDirection,

			// Body
			bodyFontColor: tooltipOpts.bodyFontColor,
			_bodyFontFamily: valueOrDefault$8(tooltipOpts.bodyFontFamily, globalDefaults.defaultFontFamily),
			_bodyFontStyle: valueOrDefault$8(tooltipOpts.bodyFontStyle, globalDefaults.defaultFontStyle),
			_bodyAlign: tooltipOpts.bodyAlign,
			bodyFontSize: valueOrDefault$8(tooltipOpts.bodyFontSize, globalDefaults.defaultFontSize),
			bodySpacing: tooltipOpts.bodySpacing,

			// Title
			titleFontColor: tooltipOpts.titleFontColor,
			_titleFontFamily: valueOrDefault$8(tooltipOpts.titleFontFamily, globalDefaults.defaultFontFamily),
			_titleFontStyle: valueOrDefault$8(tooltipOpts.titleFontStyle, globalDefaults.defaultFontStyle),
			titleFontSize: valueOrDefault$8(tooltipOpts.titleFontSize, globalDefaults.defaultFontSize),
			_titleAlign: tooltipOpts.titleAlign,
			titleSpacing: tooltipOpts.titleSpacing,
			titleMarginBottom: tooltipOpts.titleMarginBottom,

			// Footer
			footerFontColor: tooltipOpts.footerFontColor,
			_footerFontFamily: valueOrDefault$8(tooltipOpts.footerFontFamily, globalDefaults.defaultFontFamily),
			_footerFontStyle: valueOrDefault$8(tooltipOpts.footerFontStyle, globalDefaults.defaultFontStyle),
			footerFontSize: valueOrDefault$8(tooltipOpts.footerFontSize, globalDefaults.defaultFontSize),
			_footerAlign: tooltipOpts.footerAlign,
			footerSpacing: tooltipOpts.footerSpacing,
			footerMarginTop: tooltipOpts.footerMarginTop,

			// Appearance
			caretSize: tooltipOpts.caretSize,
			cornerRadius: tooltipOpts.cornerRadius,
			backgroundColor: tooltipOpts.backgroundColor,
			opacity: 0,
			legendColorBackground: tooltipOpts.multiKeyBackground,
			displayColors: tooltipOpts.displayColors,
			borderColor: tooltipOpts.borderColor,
			borderWidth: tooltipOpts.borderWidth
		};
	}

	/**
	 * Get the size of the tooltip
	 */
	function getTooltipSize(tooltip, model) {
		var ctx = tooltip._chart.ctx;

		var height = model.yPadding * 2; // Tooltip Padding
		var width = 0;

		// Count of all lines in the body
		var body = model.body;
		var combinedBodyLength = body.reduce(function(count, bodyItem) {
			return count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length;
		}, 0);
		combinedBodyLength += model.beforeBody.length + model.afterBody.length;

		var titleLineCount = model.title.length;
		var footerLineCount = model.footer.length;
		var titleFontSize = model.titleFontSize;
		var bodyFontSize = model.bodyFontSize;
		var footerFontSize = model.footerFontSize;

		height += titleLineCount * titleFontSize; // Title Lines
		height += titleLineCount ? (titleLineCount - 1) * model.titleSpacing : 0; // Title Line Spacing
		height += titleLineCount ? model.titleMarginBottom : 0; // Title's bottom Margin
		height += combinedBodyLength * bodyFontSize; // Body Lines
		height += combinedBodyLength ? (combinedBodyLength - 1) * model.bodySpacing : 0; // Body Line Spacing
		height += footerLineCount ? model.footerMarginTop : 0; // Footer Margin
		height += footerLineCount * (footerFontSize); // Footer Lines
		height += footerLineCount ? (footerLineCount - 1) * model.footerSpacing : 0; // Footer Line Spacing

		// Title width
		var widthPadding = 0;
		var maxLineWidth = function(line) {
			width = Math.max(width, ctx.measureText(line).width + widthPadding);
		};

		ctx.font = helpers$1.fontString(titleFontSize, model._titleFontStyle, model._titleFontFamily);
		helpers$1.each(model.title, maxLineWidth);

		// Body width
		ctx.font = helpers$1.fontString(bodyFontSize, model._bodyFontStyle, model._bodyFontFamily);
		helpers$1.each(model.beforeBody.concat(model.afterBody), maxLineWidth);

		// Body lines may include some extra width due to the color box
		widthPadding = model.displayColors ? (bodyFontSize + 2) : 0;
		helpers$1.each(body, function(bodyItem) {
			helpers$1.each(bodyItem.before, maxLineWidth);
			helpers$1.each(bodyItem.lines, maxLineWidth);
			helpers$1.each(bodyItem.after, maxLineWidth);
		});

		// Reset back to 0
		widthPadding = 0;

		// Footer width
		ctx.font = helpers$1.fontString(footerFontSize, model._footerFontStyle, model._footerFontFamily);
		helpers$1.each(model.footer, maxLineWidth);

		// Add padding
		width += 2 * model.xPadding;

		return {
			width: width,
			height: height
		};
	}

	/**
	 * Helper to get the alignment of a tooltip given the size
	 */
	function determineAlignment(tooltip, size) {
		var model = tooltip._model;
		var chart = tooltip._chart;
		var chartArea = tooltip._chart.chartArea;
		var xAlign = 'center';
		var yAlign = 'center';

		if (model.y < size.height) {
			yAlign = 'top';
		} else if (model.y > (chart.height - size.height)) {
			yAlign = 'bottom';
		}

		var lf, rf; // functions to determine left, right alignment
		var olf, orf; // functions to determine if left/right alignment causes tooltip to go outside chart
		var yf; // function to get the y alignment if the tooltip goes outside of the left or right edges
		var midX = (chartArea.left + chartArea.right) / 2;
		var midY = (chartArea.top + chartArea.bottom) / 2;

		if (yAlign === 'center') {
			lf = function(x) {
				return x <= midX;
			};
			rf = function(x) {
				return x > midX;
			};
		} else {
			lf = function(x) {
				return x <= (size.width / 2);
			};
			rf = function(x) {
				return x >= (chart.width - (size.width / 2));
			};
		}

		olf = function(x) {
			return x + size.width + model.caretSize + model.caretPadding > chart.width;
		};
		orf = function(x) {
			return x - size.width - model.caretSize - model.caretPadding < 0;
		};
		yf = function(y) {
			return y <= midY ? 'top' : 'bottom';
		};

		if (lf(model.x)) {
			xAlign = 'left';

			// Is tooltip too wide and goes over the right side of the chart.?
			if (olf(model.x)) {
				xAlign = 'center';
				yAlign = yf(model.y);
			}
		} else if (rf(model.x)) {
			xAlign = 'right';

			// Is tooltip too wide and goes outside left edge of canvas?
			if (orf(model.x)) {
				xAlign = 'center';
				yAlign = yf(model.y);
			}
		}

		var opts = tooltip._options;
		return {
			xAlign: opts.xAlign ? opts.xAlign : xAlign,
			yAlign: opts.yAlign ? opts.yAlign : yAlign
		};
	}

	/**
	 * Helper to get the location a tooltip needs to be placed at given the initial position (via the vm) and the size and alignment
	 */
	function getBackgroundPoint(vm, size, alignment, chart) {
		// Background Position
		var x = vm.x;
		var y = vm.y;

		var caretSize = vm.caretSize;
		var caretPadding = vm.caretPadding;
		var cornerRadius = vm.cornerRadius;
		var xAlign = alignment.xAlign;
		var yAlign = alignment.yAlign;
		var paddingAndSize = caretSize + caretPadding;
		var radiusAndPadding = cornerRadius + caretPadding;

		if (xAlign === 'right') {
			x -= size.width;
		} else if (xAlign === 'center') {
			x -= (size.width / 2);
			if (x + size.width > chart.width) {
				x = chart.width - size.width;
			}
			if (x < 0) {
				x = 0;
			}
		}

		if (yAlign === 'top') {
			y += paddingAndSize;
		} else if (yAlign === 'bottom') {
			y -= size.height + paddingAndSize;
		} else {
			y -= (size.height / 2);
		}

		if (yAlign === 'center') {
			if (xAlign === 'left') {
				x += paddingAndSize;
			} else if (xAlign === 'right') {
				x -= paddingAndSize;
			}
		} else if (xAlign === 'left') {
			x -= radiusAndPadding;
		} else if (xAlign === 'right') {
			x += radiusAndPadding;
		}

		return {
			x: x,
			y: y
		};
	}

	function getAlignedX(vm, align) {
		return align === 'center'
			? vm.x + vm.width / 2
			: align === 'right'
				? vm.x + vm.width - vm.xPadding
				: vm.x + vm.xPadding;
	}

	/**
	 * Helper to build before and after body lines
	 */
	function getBeforeAfterBodyLines(callback) {
		return pushOrConcat([], splitNewlines(callback));
	}

	var exports$4 = core_element.extend({
		initialize: function() {
			this._model = getBaseModel(this._options);
			this._lastActive = [];
		},

		// Get the title
		// Args are: (tooltipItem, data)
		getTitle: function() {
			var me = this;
			var opts = me._options;
			var callbacks = opts.callbacks;

			var beforeTitle = callbacks.beforeTitle.apply(me, arguments);
			var title = callbacks.title.apply(me, arguments);
			var afterTitle = callbacks.afterTitle.apply(me, arguments);

			var lines = [];
			lines = pushOrConcat(lines, splitNewlines(beforeTitle));
			lines = pushOrConcat(lines, splitNewlines(title));
			lines = pushOrConcat(lines, splitNewlines(afterTitle));

			return lines;
		},

		// Args are: (tooltipItem, data)
		getBeforeBody: function() {
			return getBeforeAfterBodyLines(this._options.callbacks.beforeBody.apply(this, arguments));
		},

		// Args are: (tooltipItem, data)
		getBody: function(tooltipItems, data) {
			var me = this;
			var callbacks = me._options.callbacks;
			var bodyItems = [];

			helpers$1.each(tooltipItems, function(tooltipItem) {
				var bodyItem = {
					before: [],
					lines: [],
					after: []
				};
				pushOrConcat(bodyItem.before, splitNewlines(callbacks.beforeLabel.call(me, tooltipItem, data)));
				pushOrConcat(bodyItem.lines, callbacks.label.call(me, tooltipItem, data));
				pushOrConcat(bodyItem.after, splitNewlines(callbacks.afterLabel.call(me, tooltipItem, data)));

				bodyItems.push(bodyItem);
			});

			return bodyItems;
		},

		// Args are: (tooltipItem, data)
		getAfterBody: function() {
			return getBeforeAfterBodyLines(this._options.callbacks.afterBody.apply(this, arguments));
		},

		// Get the footer and beforeFooter and afterFooter lines
		// Args are: (tooltipItem, data)
		getFooter: function() {
			var me = this;
			var callbacks = me._options.callbacks;

			var beforeFooter = callbacks.beforeFooter.apply(me, arguments);
			var footer = callbacks.footer.apply(me, arguments);
			var afterFooter = callbacks.afterFooter.apply(me, arguments);

			var lines = [];
			lines = pushOrConcat(lines, splitNewlines(beforeFooter));
			lines = pushOrConcat(lines, splitNewlines(footer));
			lines = pushOrConcat(lines, splitNewlines(afterFooter));

			return lines;
		},

		update: function(changed) {
			var me = this;
			var opts = me._options;

			// Need to regenerate the model because its faster than using extend and it is necessary due to the optimization in Chart.Element.transition
			// that does _view = _model if ease === 1. This causes the 2nd tooltip update to set properties in both the view and model at the same time
			// which breaks any animations.
			var existingModel = me._model;
			var model = me._model = getBaseModel(opts);
			var active = me._active;

			var data = me._data;

			// In the case where active.length === 0 we need to keep these at existing values for good animations
			var alignment = {
				xAlign: existingModel.xAlign,
				yAlign: existingModel.yAlign
			};
			var backgroundPoint = {
				x: existingModel.x,
				y: existingModel.y
			};
			var tooltipSize = {
				width: existingModel.width,
				height: existingModel.height
			};
			var tooltipPosition = {
				x: existingModel.caretX,
				y: existingModel.caretY
			};

			var i, len;

			if (active.length) {
				model.opacity = 1;

				var labelColors = [];
				var labelTextColors = [];
				tooltipPosition = positioners[opts.position].call(me, active, me._eventPosition);

				var tooltipItems = [];
				for (i = 0, len = active.length; i < len; ++i) {
					tooltipItems.push(createTooltipItem(active[i]));
				}

				// If the user provided a filter function, use it to modify the tooltip items
				if (opts.filter) {
					tooltipItems = tooltipItems.filter(function(a) {
						return opts.filter(a, data);
					});
				}

				// If the user provided a sorting function, use it to modify the tooltip items
				if (opts.itemSort) {
					tooltipItems = tooltipItems.sort(function(a, b) {
						return opts.itemSort(a, b, data);
					});
				}

				// Determine colors for boxes
				helpers$1.each(tooltipItems, function(tooltipItem) {
					labelColors.push(opts.callbacks.labelColor.call(me, tooltipItem, me._chart));
					labelTextColors.push(opts.callbacks.labelTextColor.call(me, tooltipItem, me._chart));
				});


				// Build the Text Lines
				model.title = me.getTitle(tooltipItems, data);
				model.beforeBody = me.getBeforeBody(tooltipItems, data);
				model.body = me.getBody(tooltipItems, data);
				model.afterBody = me.getAfterBody(tooltipItems, data);
				model.footer = me.getFooter(tooltipItems, data);

				// Initial positioning and colors
				model.x = tooltipPosition.x;
				model.y = tooltipPosition.y;
				model.caretPadding = opts.caretPadding;
				model.labelColors = labelColors;
				model.labelTextColors = labelTextColors;

				// data points
				model.dataPoints = tooltipItems;

				// We need to determine alignment of the tooltip
				tooltipSize = getTooltipSize(this, model);
				alignment = determineAlignment(this, tooltipSize);
				// Final Size and Position
				backgroundPoint = getBackgroundPoint(model, tooltipSize, alignment, me._chart);
			} else {
				model.opacity = 0;
			}

			model.xAlign = alignment.xAlign;
			model.yAlign = alignment.yAlign;
			model.x = backgroundPoint.x;
			model.y = backgroundPoint.y;
			model.width = tooltipSize.width;
			model.height = tooltipSize.height;

			// Point where the caret on the tooltip points to
			model.caretX = tooltipPosition.x;
			model.caretY = tooltipPosition.y;

			me._model = model;

			if (changed && opts.custom) {
				opts.custom.call(me, model);
			}

			return me;
		},

		drawCaret: function(tooltipPoint, size) {
			var ctx = this._chart.ctx;
			var vm = this._view;
			var caretPosition = this.getCaretPosition(tooltipPoint, size, vm);

			ctx.lineTo(caretPosition.x1, caretPosition.y1);
			ctx.lineTo(caretPosition.x2, caretPosition.y2);
			ctx.lineTo(caretPosition.x3, caretPosition.y3);
		},
		getCaretPosition: function(tooltipPoint, size, vm) {
			var x1, x2, x3, y1, y2, y3;
			var caretSize = vm.caretSize;
			var cornerRadius = vm.cornerRadius;
			var xAlign = vm.xAlign;
			var yAlign = vm.yAlign;
			var ptX = tooltipPoint.x;
			var ptY = tooltipPoint.y;
			var width = size.width;
			var height = size.height;

			if (yAlign === 'center') {
				y2 = ptY + (height / 2);

				if (xAlign === 'left') {
					x1 = ptX;
					x2 = x1 - caretSize;
					x3 = x1;

					y1 = y2 + caretSize;
					y3 = y2 - caretSize;
				} else {
					x1 = ptX + width;
					x2 = x1 + caretSize;
					x3 = x1;

					y1 = y2 - caretSize;
					y3 = y2 + caretSize;
				}
			} else {
				if (xAlign === 'left') {
					x2 = ptX + cornerRadius + (caretSize);
					x1 = x2 - caretSize;
					x3 = x2 + caretSize;
				} else if (xAlign === 'right') {
					x2 = ptX + width - cornerRadius - caretSize;
					x1 = x2 - caretSize;
					x3 = x2 + caretSize;
				} else {
					x2 = vm.caretX;
					x1 = x2 - caretSize;
					x3 = x2 + caretSize;
				}
				if (yAlign === 'top') {
					y1 = ptY;
					y2 = y1 - caretSize;
					y3 = y1;
				} else {
					y1 = ptY + height;
					y2 = y1 + caretSize;
					y3 = y1;
					// invert drawing order
					var tmp = x3;
					x3 = x1;
					x1 = tmp;
				}
			}
			return {x1: x1, x2: x2, x3: x3, y1: y1, y2: y2, y3: y3};
		},

		drawTitle: function(pt, vm, ctx) {
			var title = vm.title;
			var length = title.length;
			var titleFontSize, titleSpacing, i;

			if (length) {
				var rtlHelper = getRtlHelper(vm.rtl, vm.x, vm.width);

				pt.x = getAlignedX(vm, vm._titleAlign);

				ctx.textAlign = rtlHelper.textAlign(vm._titleAlign);
				ctx.textBaseline = 'middle';

				titleFontSize = vm.titleFontSize;
				titleSpacing = vm.titleSpacing;

				ctx.fillStyle = vm.titleFontColor;
				ctx.font = helpers$1.fontString(titleFontSize, vm._titleFontStyle, vm._titleFontFamily);

				for (i = 0; i < length; ++i) {
					ctx.fillText(title[i], rtlHelper.x(pt.x), pt.y + titleFontSize / 2);
					pt.y += titleFontSize + titleSpacing; // Line Height and spacing

					if (i + 1 === length) {
						pt.y += vm.titleMarginBottom - titleSpacing; // If Last, add margin, remove spacing
					}
				}
			}
		},

		drawBody: function(pt, vm, ctx) {
			var bodyFontSize = vm.bodyFontSize;
			var bodySpacing = vm.bodySpacing;
			var bodyAlign = vm._bodyAlign;
			var body = vm.body;
			var drawColorBoxes = vm.displayColors;
			var xLinePadding = 0;
			var colorX = drawColorBoxes ? getAlignedX(vm, 'left') : 0;

			var rtlHelper = getRtlHelper(vm.rtl, vm.x, vm.width);

			var fillLineOfText = function(line) {
				ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyFontSize / 2);
				pt.y += bodyFontSize + bodySpacing;
			};

			var bodyItem, textColor, labelColors, lines, i, j, ilen, jlen;
			var bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);

			ctx.textAlign = bodyAlign;
			ctx.textBaseline = 'middle';
			ctx.font = helpers$1.fontString(bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);

			pt.x = getAlignedX(vm, bodyAlignForCalculation);

			// Before body lines
			ctx.fillStyle = vm.bodyFontColor;
			helpers$1.each(vm.beforeBody, fillLineOfText);

			xLinePadding = drawColorBoxes && bodyAlignForCalculation !== 'right'
				? bodyAlign === 'center' ? (bodyFontSize / 2 + 1) : (bodyFontSize + 2)
				: 0;

			// Draw body lines now
			for (i = 0, ilen = body.length; i < ilen; ++i) {
				bodyItem = body[i];
				textColor = vm.labelTextColors[i];
				labelColors = vm.labelColors[i];

				ctx.fillStyle = textColor;
				helpers$1.each(bodyItem.before, fillLineOfText);

				lines = bodyItem.lines;
				for (j = 0, jlen = lines.length; j < jlen; ++j) {
					// Draw Legend-like boxes if needed
					if (drawColorBoxes) {
						var rtlColorX = rtlHelper.x(colorX);

						// Fill a white rect so that colours merge nicely if the opacity is < 1
						ctx.fillStyle = vm.legendColorBackground;
						ctx.fillRect(rtlHelper.leftForLtr(rtlColorX, bodyFontSize), pt.y, bodyFontSize, bodyFontSize);

						// Border
						ctx.lineWidth = 1;
						ctx.strokeStyle = labelColors.borderColor;
						ctx.strokeRect(rtlHelper.leftForLtr(rtlColorX, bodyFontSize), pt.y, bodyFontSize, bodyFontSize);

						// Inner square
						ctx.fillStyle = labelColors.backgroundColor;
						ctx.fillRect(rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), bodyFontSize - 2), pt.y + 1, bodyFontSize - 2, bodyFontSize - 2);
						ctx.fillStyle = textColor;
					}

					fillLineOfText(lines[j]);
				}

				helpers$1.each(bodyItem.after, fillLineOfText);
			}

			// Reset back to 0 for after body
			xLinePadding = 0;

			// After body lines
			helpers$1.each(vm.afterBody, fillLineOfText);
			pt.y -= bodySpacing; // Remove last body spacing
		},

		drawFooter: function(pt, vm, ctx) {
			var footer = vm.footer;
			var length = footer.length;
			var footerFontSize, i;

			if (length) {
				var rtlHelper = getRtlHelper(vm.rtl, vm.x, vm.width);

				pt.x = getAlignedX(vm, vm._footerAlign);
				pt.y += vm.footerMarginTop;

				ctx.textAlign = rtlHelper.textAlign(vm._footerAlign);
				ctx.textBaseline = 'middle';

				footerFontSize = vm.footerFontSize;

				ctx.fillStyle = vm.footerFontColor;
				ctx.font = helpers$1.fontString(footerFontSize, vm._footerFontStyle, vm._footerFontFamily);

				for (i = 0; i < length; ++i) {
					ctx.fillText(footer[i], rtlHelper.x(pt.x), pt.y + footerFontSize / 2);
					pt.y += footerFontSize + vm.footerSpacing;
				}
			}
		},

		drawBackground: function(pt, vm, ctx, tooltipSize) {
			ctx.fillStyle = vm.backgroundColor;
			ctx.strokeStyle = vm.borderColor;
			ctx.lineWidth = vm.borderWidth;
			var xAlign = vm.xAlign;
			var yAlign = vm.yAlign;
			var x = pt.x;
			var y = pt.y;
			var width = tooltipSize.width;
			var height = tooltipSize.height;
			var radius = vm.cornerRadius;

			ctx.beginPath();
			ctx.moveTo(x + radius, y);
			if (yAlign === 'top') {
				this.drawCaret(pt, tooltipSize);
			}
			ctx.lineTo(x + width - radius, y);
			ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
			if (yAlign === 'center' && xAlign === 'right') {
				this.drawCaret(pt, tooltipSize);
			}
			ctx.lineTo(x + width, y + height - radius);
			ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
			if (yAlign === 'bottom') {
				this.drawCaret(pt, tooltipSize);
			}
			ctx.lineTo(x + radius, y + height);
			ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
			if (yAlign === 'center' && xAlign === 'left') {
				this.drawCaret(pt, tooltipSize);
			}
			ctx.lineTo(x, y + radius);
			ctx.quadraticCurveTo(x, y, x + radius, y);
			ctx.closePath();

			ctx.fill();

			if (vm.borderWidth > 0) {
				ctx.stroke();
			}
		},

		draw: function() {
			var ctx = this._chart.ctx;
			var vm = this._view;

			if (vm.opacity === 0) {
				return;
			}

			var tooltipSize = {
				width: vm.width,
				height: vm.height
			};
			var pt = {
				x: vm.x,
				y: vm.y
			};

			// IE11/Edge does not like very small opacities, so snap to 0
			var opacity = Math.abs(vm.opacity < 1e-3) ? 0 : vm.opacity;

			// Truthy/falsey value for empty tooltip
			var hasTooltipContent = vm.title.length || vm.beforeBody.length || vm.body.length || vm.afterBody.length || vm.footer.length;

			if (this._options.enabled && hasTooltipContent) {
				ctx.save();
				ctx.globalAlpha = opacity;

				// Draw Background
				this.drawBackground(pt, vm, ctx, tooltipSize);

				// Draw Title, Body, and Footer
				pt.y += vm.yPadding;

				helpers$1.rtl.overrideTextDirection(ctx, vm.textDirection);

				// Titles
				this.drawTitle(pt, vm, ctx);

				// Body
				this.drawBody(pt, vm, ctx);

				// Footer
				this.drawFooter(pt, vm, ctx);

				helpers$1.rtl.restoreTextDirection(ctx, vm.textDirection);

				ctx.restore();
			}
		},

		/**
		 * Handle an event
		 * @private
		 * @param {IEvent} event - The event to handle
		 * @returns {boolean} true if the tooltip changed
		 */
		handleEvent: function(e) {
			var me = this;
			var options = me._options;
			var changed = false;

			me._lastActive = me._lastActive || [];

			// Find Active Elements for tooltips
			if (e.type === 'mouseout') {
				me._active = [];
			} else {
				me._active = me._chart.getElementsAtEventForMode(e, options.mode, options);
				if (options.reverse) {
					me._active.reverse();
				}
			}

			// Remember Last Actives
			changed = !helpers$1.arrayEquals(me._active, me._lastActive);

			// Only handle target event on tooltip change
			if (changed) {
				me._lastActive = me._active;

				if (options.enabled || options.custom) {
					me._eventPosition = {
						x: e.x,
						y: e.y
					};

					me.update(true);
					me.pivot();
				}
			}

			return changed;
		}
	});

	/**
	 * @namespace Chart.Tooltip.positioners
	 */
	var positioners_1 = positioners;

	var core_tooltip = exports$4;
	core_tooltip.positioners = positioners_1;

	var valueOrDefault$9 = helpers$1.valueOrDefault;

	core_defaults._set('global', {
		elements: {},
		events: [
			'mousemove',
			'mouseout',
			'click',
			'touchstart',
			'touchmove'
		],
		hover: {
			onHover: null,
			mode: 'nearest',
			intersect: true,
			animationDuration: 400
		},
		onClick: null,
		maintainAspectRatio: true,
		responsive: true,
		responsiveAnimationDuration: 0
	});

	/**
	 * Recursively merge the given config objects representing the `scales` option
	 * by incorporating scale defaults in `xAxes` and `yAxes` array items, then
	 * returns a deep copy of the result, thus doesn't alter inputs.
	 */
	function mergeScaleConfig(/* config objects ... */) {
		return helpers$1.merge({}, [].slice.call(arguments), {
			merger: function(key, target, source, options) {
				if (key === 'xAxes' || key === 'yAxes') {
					var slen = source[key].length;
					var i, type, scale;

					if (!target[key]) {
						target[key] = [];
					}

					for (i = 0; i < slen; ++i) {
						scale = source[key][i];
						type = valueOrDefault$9(scale.type, key === 'xAxes' ? 'category' : 'linear');

						if (i >= target[key].length) {
							target[key].push({});
						}

						if (!target[key][i].type || (scale.type && scale.type !== target[key][i].type)) {
							// new/untyped scale or type changed: let's apply the new defaults
							// then merge source scale to correctly overwrite the defaults.
							helpers$1.merge(target[key][i], [core_scaleService.getScaleDefaults(type), scale]);
						} else {
							// scales type are the same
							helpers$1.merge(target[key][i], scale);
						}
					}
				} else {
					helpers$1._merger(key, target, source, options);
				}
			}
		});
	}

	/**
	 * Recursively merge the given config objects as the root options by handling
	 * default scale options for the `scales` and `scale` properties, then returns
	 * a deep copy of the result, thus doesn't alter inputs.
	 */
	function mergeConfig(/* config objects ... */) {
		return helpers$1.merge({}, [].slice.call(arguments), {
			merger: function(key, target, source, options) {
				var tval = target[key] || {};
				var sval = source[key];

				if (key === 'scales') {
					// scale config merging is complex. Add our own function here for that
					target[key] = mergeScaleConfig(tval, sval);
				} else if (key === 'scale') {
					// used in polar area & radar charts since there is only one scale
					target[key] = helpers$1.merge(tval, [core_scaleService.getScaleDefaults(sval.type), sval]);
				} else {
					helpers$1._merger(key, target, source, options);
				}
			}
		});
	}

	function initConfig(config) {
		config = config || {};

		// Do NOT use mergeConfig for the data object because this method merges arrays
		// and so would change references to labels and datasets, preventing data updates.
		var data = config.data = config.data || {};
		data.datasets = data.datasets || [];
		data.labels = data.labels || [];

		config.options = mergeConfig(
			core_defaults.global,
			core_defaults[config.type],
			config.options || {});

		return config;
	}

	function updateConfig(chart) {
		var newOptions = chart.options;

		helpers$1.each(chart.scales, function(scale) {
			core_layouts.removeBox(chart, scale);
		});

		newOptions = mergeConfig(
			core_defaults.global,
			core_defaults[chart.config.type],
			newOptions);

		chart.options = chart.config.options = newOptions;
		chart.ensureScalesHaveIDs();
		chart.buildOrUpdateScales();

		// Tooltip
		chart.tooltip._options = newOptions.tooltips;
		chart.tooltip.initialize();
	}

	function nextAvailableScaleId(axesOpts, prefix, index) {
		var id;
		var hasId = function(obj) {
			return obj.id === id;
		};

		do {
			id = prefix + index++;
		} while (helpers$1.findIndex(axesOpts, hasId) >= 0);

		return id;
	}

	function positionIsHorizontal(position) {
		return position === 'top' || position === 'bottom';
	}

	function compare2Level(l1, l2) {
		return function(a, b) {
			return a[l1] === b[l1]
				? a[l2] - b[l2]
				: a[l1] - b[l1];
		};
	}

	var Chart = function(item, config) {
		this.construct(item, config);
		return this;
	};

	helpers$1.extend(Chart.prototype, /** @lends Chart */ {
		/**
		 * @private
		 */
		construct: function(item, config) {
			var me = this;

			config = initConfig(config);

			var context = platform.acquireContext(item, config);
			var canvas = context && context.canvas;
			var height = canvas && canvas.height;
			var width = canvas && canvas.width;

			me.id = helpers$1.uid();
			me.ctx = context;
			me.canvas = canvas;
			me.config = config;
			me.width = width;
			me.height = height;
			me.aspectRatio = height ? width / height : null;
			me.options = config.options;
			me._bufferedRender = false;
			me._layers = [];

			/**
			 * Provided for backward compatibility, Chart and Chart.Controller have been merged,
			 * the "instance" still need to be defined since it might be called from plugins.
			 * @prop Chart#chart
			 * @deprecated since version 2.6.0
			 * @todo remove at version 3
			 * @private
			 */
			me.chart = me;
			me.controller = me; // chart.chart.controller #inception

			// Add the chart instance to the global namespace
			Chart.instances[me.id] = me;

			// Define alias to the config data: `chart.data === chart.config.data`
			Object.defineProperty(me, 'data', {
				get: function() {
					return me.config.data;
				},
				set: function(value) {
					me.config.data = value;
				}
			});

			if (!context || !canvas) {
				// The given item is not a compatible context2d element, let's return before finalizing
				// the chart initialization but after setting basic chart / controller properties that
				// can help to figure out that the chart is not valid (e.g chart.canvas !== null);
				// https://github.com/chartjs/Chart.js/issues/2807
				console.error("Failed to create chart: can't acquire context from the given item");
				return;
			}

			me.initialize();
			me.update();
		},

		/**
		 * @private
		 */
		initialize: function() {
			var me = this;

			// Before init plugin notification
			core_plugins.notify(me, 'beforeInit');

			helpers$1.retinaScale(me, me.options.devicePixelRatio);

			me.bindEvents();

			if (me.options.responsive) {
				// Initial resize before chart draws (must be silent to preserve initial animations).
				me.resize(true);
			}

			me.initToolTip();

			// After init plugin notification
			core_plugins.notify(me, 'afterInit');

			return me;
		},

		clear: function() {
			helpers$1.canvas.clear(this);
			return this;
		},

		stop: function() {
			// Stops any current animation loop occurring
			core_animations.cancelAnimation(this);
			return this;
		},

		resize: function(silent) {
			var me = this;
			var options = me.options;
			var canvas = me.canvas;
			var aspectRatio = (options.maintainAspectRatio && me.aspectRatio) || null;

			// the canvas render width and height will be casted to integers so make sure that
			// the canvas display style uses the same integer values to avoid blurring effect.

			// Set to 0 instead of canvas.size because the size defaults to 300x150 if the element is collapsed
			var newWidth = Math.max(0, Math.floor(helpers$1.getMaximumWidth(canvas)));
			var newHeight = Math.max(0, Math.floor(aspectRatio ? newWidth / aspectRatio : helpers$1.getMaximumHeight(canvas)));

			if (me.width === newWidth && me.height === newHeight) {
				return;
			}

			canvas.width = me.width = newWidth;
			canvas.height = me.height = newHeight;
			canvas.style.width = newWidth + 'px';
			canvas.style.height = newHeight + 'px';

			helpers$1.retinaScale(me, options.devicePixelRatio);

			if (!silent) {
				// Notify any plugins about the resize
				var newSize = {width: newWidth, height: newHeight};
				core_plugins.notify(me, 'resize', [newSize]);

				// Notify of resize
				if (options.onResize) {
					options.onResize(me, newSize);
				}

				me.stop();
				me.update({
					duration: options.responsiveAnimationDuration
				});
			}
		},

		ensureScalesHaveIDs: function() {
			var options = this.options;
			var scalesOptions = options.scales || {};
			var scaleOptions = options.scale;

			helpers$1.each(scalesOptions.xAxes, function(xAxisOptions, index) {
				if (!xAxisOptions.id) {
					xAxisOptions.id = nextAvailableScaleId(scalesOptions.xAxes, 'x-axis-', index);
				}
			});

			helpers$1.each(scalesOptions.yAxes, function(yAxisOptions, index) {
				if (!yAxisOptions.id) {
					yAxisOptions.id = nextAvailableScaleId(scalesOptions.yAxes, 'y-axis-', index);
				}
			});

			if (scaleOptions) {
				scaleOptions.id = scaleOptions.id || 'scale';
			}
		},

		/**
		 * Builds a map of scale ID to scale object for future lookup.
		 */
		buildOrUpdateScales: function() {
			var me = this;
			var options = me.options;
			var scales = me.scales || {};
			var items = [];
			var updated = Object.keys(scales).reduce(function(obj, id) {
				obj[id] = false;
				return obj;
			}, {});

			if (options.scales) {
				items = items.concat(
					(options.scales.xAxes || []).map(function(xAxisOptions) {
						return {options: xAxisOptions, dtype: 'category', dposition: 'bottom'};
					}),
					(options.scales.yAxes || []).map(function(yAxisOptions) {
						return {options: yAxisOptions, dtype: 'linear', dposition: 'left'};
					})
				);
			}

			if (options.scale) {
				items.push({
					options: options.scale,
					dtype: 'radialLinear',
					isDefault: true,
					dposition: 'chartArea'
				});
			}

			helpers$1.each(items, function(item) {
				var scaleOptions = item.options;
				var id = scaleOptions.id;
				var scaleType = valueOrDefault$9(scaleOptions.type, item.dtype);

				if (positionIsHorizontal(scaleOptions.position) !== positionIsHorizontal(item.dposition)) {
					scaleOptions.position = item.dposition;
				}

				updated[id] = true;
				var scale = null;
				if (id in scales && scales[id].type === scaleType) {
					scale = scales[id];
					scale.options = scaleOptions;
					scale.ctx = me.ctx;
					scale.chart = me;
				} else {
					var scaleClass = core_scaleService.getScaleConstructor(scaleType);
					if (!scaleClass) {
						return;
					}
					scale = new scaleClass({
						id: id,
						type: scaleType,
						options: scaleOptions,
						ctx: me.ctx,
						chart: me
					});
					scales[scale.id] = scale;
				}

				scale.mergeTicksOptions();

				// TODO(SB): I think we should be able to remove this custom case (options.scale)
				// and consider it as a regular scale part of the "scales"" map only! This would
				// make the logic easier and remove some useless? custom code.
				if (item.isDefault) {
					me.scale = scale;
				}
			});
			// clear up discarded scales
			helpers$1.each(updated, function(hasUpdated, id) {
				if (!hasUpdated) {
					delete scales[id];
				}
			});

			me.scales = scales;

			core_scaleService.addScalesToLayout(this);
		},

		buildOrUpdateControllers: function() {
			var me = this;
			var newControllers = [];
			var datasets = me.data.datasets;
			var i, ilen;

			for (i = 0, ilen = datasets.length; i < ilen; i++) {
				var dataset = datasets[i];
				var meta = me.getDatasetMeta(i);
				var type = dataset.type || me.config.type;

				if (meta.type && meta.type !== type) {
					me.destroyDatasetMeta(i);
					meta = me.getDatasetMeta(i);
				}
				meta.type = type;
				meta.order = dataset.order || 0;
				meta.index = i;

				if (meta.controller) {
					meta.controller.updateIndex(i);
					meta.controller.linkScales();
				} else {
					var ControllerClass = controllers[meta.type];
					if (ControllerClass === undefined) {
						throw new Error('"' + meta.type + '" is not a chart type.');
					}

					meta.controller = new ControllerClass(me, i);
					newControllers.push(meta.controller);
				}
			}

			return newControllers;
		},

		/**
		 * Reset the elements of all datasets
		 * @private
		 */
		resetElements: function() {
			var me = this;
			helpers$1.each(me.data.datasets, function(dataset, datasetIndex) {
				me.getDatasetMeta(datasetIndex).controller.reset();
			}, me);
		},

		/**
		* Resets the chart back to it's state before the initial animation
		*/
		reset: function() {
			this.resetElements();
			this.tooltip.initialize();
		},

		update: function(config) {
			var me = this;
			var i, ilen;

			if (!config || typeof config !== 'object') {
				// backwards compatibility
				config = {
					duration: config,
					lazy: arguments[1]
				};
			}

			updateConfig(me);

			// plugins options references might have change, let's invalidate the cache
			// https://github.com/chartjs/Chart.js/issues/5111#issuecomment-355934167
			core_plugins._invalidate(me);

			if (core_plugins.notify(me, 'beforeUpdate') === false) {
				return;
			}

			// In case the entire data object changed
			me.tooltip._data = me.data;

			// Make sure dataset controllers are updated and new controllers are reset
			var newControllers = me.buildOrUpdateControllers();

			// Make sure all dataset controllers have correct meta data counts
			for (i = 0, ilen = me.data.datasets.length; i < ilen; i++) {
				me.getDatasetMeta(i).controller.buildOrUpdateElements();
			}

			me.updateLayout();

			// Can only reset the new controllers after the scales have been updated
			if (me.options.animation && me.options.animation.duration) {
				helpers$1.each(newControllers, function(controller) {
					controller.reset();
				});
			}

			me.updateDatasets();

			// Need to reset tooltip in case it is displayed with elements that are removed
			// after update.
			me.tooltip.initialize();

			// Last active contains items that were previously in the tooltip.
			// When we reset the tooltip, we need to clear it
			me.lastActive = [];

			// Do this before render so that any plugins that need final scale updates can use it
			core_plugins.notify(me, 'afterUpdate');

			me._layers.sort(compare2Level('z', '_idx'));

			if (me._bufferedRender) {
				me._bufferedRequest = {
					duration: config.duration,
					easing: config.easing,
					lazy: config.lazy
				};
			} else {
				me.render(config);
			}
		},

		/**
		 * Updates the chart layout unless a plugin returns `false` to the `beforeLayout`
		 * hook, in which case, plugins will not be called on `afterLayout`.
		 * @private
		 */
		updateLayout: function() {
			var me = this;

			if (core_plugins.notify(me, 'beforeLayout') === false) {
				return;
			}

			core_layouts.update(this, this.width, this.height);

			me._layers = [];
			helpers$1.each(me.boxes, function(box) {
				// _configure is called twice, once in core.scale.update and once here.
				// Here the boxes are fully updated and at their final positions.
				if (box._configure) {
					box._configure();
				}
				me._layers.push.apply(me._layers, box._layers());
			}, me);

			me._layers.forEach(function(item, index) {
				item._idx = index;
			});

			/**
			 * Provided for backward compatibility, use `afterLayout` instead.
			 * @method IPlugin#afterScaleUpdate
			 * @deprecated since version 2.5.0
			 * @todo remove at version 3
			 * @private
			 */
			core_plugins.notify(me, 'afterScaleUpdate');
			core_plugins.notify(me, 'afterLayout');
		},

		/**
		 * Updates all datasets unless a plugin returns `false` to the `beforeDatasetsUpdate`
		 * hook, in which case, plugins will not be called on `afterDatasetsUpdate`.
		 * @private
		 */
		updateDatasets: function() {
			var me = this;

			if (core_plugins.notify(me, 'beforeDatasetsUpdate') === false) {
				return;
			}

			for (var i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
				me.updateDataset(i);
			}

			core_plugins.notify(me, 'afterDatasetsUpdate');
		},

		/**
		 * Updates dataset at index unless a plugin returns `false` to the `beforeDatasetUpdate`
		 * hook, in which case, plugins will not be called on `afterDatasetUpdate`.
		 * @private
		 */
		updateDataset: function(index) {
			var me = this;
			var meta = me.getDatasetMeta(index);
			var args = {
				meta: meta,
				index: index
			};

			if (core_plugins.notify(me, 'beforeDatasetUpdate', [args]) === false) {
				return;
			}

			meta.controller._update();

			core_plugins.notify(me, 'afterDatasetUpdate', [args]);
		},

		render: function(config) {
			var me = this;

			if (!config || typeof config !== 'object') {
				// backwards compatibility
				config = {
					duration: config,
					lazy: arguments[1]
				};
			}

			var animationOptions = me.options.animation;
			var duration = valueOrDefault$9(config.duration, animationOptions && animationOptions.duration);
			var lazy = config.lazy;

			if (core_plugins.notify(me, 'beforeRender') === false) {
				return;
			}

			var onComplete = function(animation) {
				core_plugins.notify(me, 'afterRender');
				helpers$1.callback(animationOptions && animationOptions.onComplete, [animation], me);
			};

			if (animationOptions && duration) {
				var animation = new core_animation({
					numSteps: duration / 16.66, // 60 fps
					easing: config.easing || animationOptions.easing,

					render: function(chart, animationObject) {
						var easingFunction = helpers$1.easing.effects[animationObject.easing];
						var currentStep = animationObject.currentStep;
						var stepDecimal = currentStep / animationObject.numSteps;

						chart.draw(easingFunction(stepDecimal), stepDecimal, currentStep);
					},

					onAnimationProgress: animationOptions.onProgress,
					onAnimationComplete: onComplete
				});

				core_animations.addAnimation(me, animation, duration, lazy);
			} else {
				me.draw();

				// See https://github.com/chartjs/Chart.js/issues/3781
				onComplete(new core_animation({numSteps: 0, chart: me}));
			}

			return me;
		},

		draw: function(easingValue) {
			var me = this;
			var i, layers;

			me.clear();

			if (helpers$1.isNullOrUndef(easingValue)) {
				easingValue = 1;
			}

			me.transition(easingValue);

			if (me.width <= 0 || me.height <= 0) {
				return;
			}

			if (core_plugins.notify(me, 'beforeDraw', [easingValue]) === false) {
				return;
			}

			// Because of plugin hooks (before/afterDatasetsDraw), datasets can't
			// currently be part of layers. Instead, we draw
			// layers <= 0 before(default, backward compat), and the rest after
			layers = me._layers;
			for (i = 0; i < layers.length && layers[i].z <= 0; ++i) {
				layers[i].draw(me.chartArea);
			}

			me.drawDatasets(easingValue);

			// Rest of layers
			for (; i < layers.length; ++i) {
				layers[i].draw(me.chartArea);
			}

			me._drawTooltip(easingValue);

			core_plugins.notify(me, 'afterDraw', [easingValue]);
		},

		/**
		 * @private
		 */
		transition: function(easingValue) {
			var me = this;

			for (var i = 0, ilen = (me.data.datasets || []).length; i < ilen; ++i) {
				if (me.isDatasetVisible(i)) {
					me.getDatasetMeta(i).controller.transition(easingValue);
				}
			}

			me.tooltip.transition(easingValue);
		},

		/**
		 * @private
		 */
		_getSortedDatasetMetas: function(filterVisible) {
			var me = this;
			var datasets = me.data.datasets || [];
			var result = [];
			var i, ilen;

			for (i = 0, ilen = datasets.length; i < ilen; ++i) {
				if (!filterVisible || me.isDatasetVisible(i)) {
					result.push(me.getDatasetMeta(i));
				}
			}

			result.sort(compare2Level('order', 'index'));

			return result;
		},

		/**
		 * @private
		 */
		_getSortedVisibleDatasetMetas: function() {
			return this._getSortedDatasetMetas(true);
		},

		/**
		 * Draws all datasets unless a plugin returns `false` to the `beforeDatasetsDraw`
		 * hook, in which case, plugins will not be called on `afterDatasetsDraw`.
		 * @private
		 */
		drawDatasets: function(easingValue) {
			var me = this;
			var metasets, i;

			if (core_plugins.notify(me, 'beforeDatasetsDraw', [easingValue]) === false) {
				return;
			}

			metasets = me._getSortedVisibleDatasetMetas();
			for (i = metasets.length - 1; i >= 0; --i) {
				me.drawDataset(metasets[i], easingValue);
			}

			core_plugins.notify(me, 'afterDatasetsDraw', [easingValue]);
		},

		/**
		 * Draws dataset at index unless a plugin returns `false` to the `beforeDatasetDraw`
		 * hook, in which case, plugins will not be called on `afterDatasetDraw`.
		 * @private
		 */
		drawDataset: function(meta, easingValue) {
			var me = this;
			var args = {
				meta: meta,
				index: meta.index,
				easingValue: easingValue
			};

			if (core_plugins.notify(me, 'beforeDatasetDraw', [args]) === false) {
				return;
			}

			meta.controller.draw(easingValue);

			core_plugins.notify(me, 'afterDatasetDraw', [args]);
		},

		/**
		 * Draws tooltip unless a plugin returns `false` to the `beforeTooltipDraw`
		 * hook, in which case, plugins will not be called on `afterTooltipDraw`.
		 * @private
		 */
		_drawTooltip: function(easingValue) {
			var me = this;
			var tooltip = me.tooltip;
			var args = {
				tooltip: tooltip,
				easingValue: easingValue
			};

			if (core_plugins.notify(me, 'beforeTooltipDraw', [args]) === false) {
				return;
			}

			tooltip.draw();

			core_plugins.notify(me, 'afterTooltipDraw', [args]);
		},

		/**
		 * Get the single element that was clicked on
		 * @return An object containing the dataset index and element index of the matching element. Also contains the rectangle that was draw
		 */
		getElementAtEvent: function(e) {
			return core_interaction.modes.single(this, e);
		},

		getElementsAtEvent: function(e) {
			return core_interaction.modes.label(this, e, {intersect: true});
		},

		getElementsAtXAxis: function(e) {
			return core_interaction.modes['x-axis'](this, e, {intersect: true});
		},

		getElementsAtEventForMode: function(e, mode, options) {
			var method = core_interaction.modes[mode];
			if (typeof method === 'function') {
				return method(this, e, options);
			}

			return [];
		},

		getDatasetAtEvent: function(e) {
			return core_interaction.modes.dataset(this, e, {intersect: true});
		},

		getDatasetMeta: function(datasetIndex) {
			var me = this;
			var dataset = me.data.datasets[datasetIndex];
			if (!dataset._meta) {
				dataset._meta = {};
			}

			var meta = dataset._meta[me.id];
			if (!meta) {
				meta = dataset._meta[me.id] = {
					type: null,
					data: [],
					dataset: null,
					controller: null,
					hidden: null,			// See isDatasetVisible() comment
					xAxisID: null,
					yAxisID: null,
					order: dataset.order || 0,
					index: datasetIndex
				};
			}

			return meta;
		},

		getVisibleDatasetCount: function() {
			var count = 0;
			for (var i = 0, ilen = this.data.datasets.length; i < ilen; ++i) {
				if (this.isDatasetVisible(i)) {
					count++;
				}
			}
			return count;
		},

		isDatasetVisible: function(datasetIndex) {
			var meta = this.getDatasetMeta(datasetIndex);

			// meta.hidden is a per chart dataset hidden flag override with 3 states: if true or false,
			// the dataset.hidden value is ignored, else if null, the dataset hidden state is returned.
			return typeof meta.hidden === 'boolean' ? !meta.hidden : !this.data.datasets[datasetIndex].hidden;
		},

		generateLegend: function() {
			return this.options.legendCallback(this);
		},

		/**
		 * @private
		 */
		destroyDatasetMeta: function(datasetIndex) {
			var id = this.id;
			var dataset = this.data.datasets[datasetIndex];
			var meta = dataset._meta && dataset._meta[id];

			if (meta) {
				meta.controller.destroy();
				delete dataset._meta[id];
			}
		},

		destroy: function() {
			var me = this;
			var canvas = me.canvas;
			var i, ilen;

			me.stop();

			// dataset controllers need to cleanup associated data
			for (i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
				me.destroyDatasetMeta(i);
			}

			if (canvas) {
				me.unbindEvents();
				helpers$1.canvas.clear(me);
				platform.releaseContext(me.ctx);
				me.canvas = null;
				me.ctx = null;
			}

			core_plugins.notify(me, 'destroy');

			delete Chart.instances[me.id];
		},

		toBase64Image: function() {
			return this.canvas.toDataURL.apply(this.canvas, arguments);
		},

		initToolTip: function() {
			var me = this;
			me.tooltip = new core_tooltip({
				_chart: me,
				_chartInstance: me, // deprecated, backward compatibility
				_data: me.data,
				_options: me.options.tooltips
			}, me);
		},

		/**
		 * @private
		 */
		bindEvents: function() {
			var me = this;
			var listeners = me._listeners = {};
			var listener = function() {
				me.eventHandler.apply(me, arguments);
			};

			helpers$1.each(me.options.events, function(type) {
				platform.addEventListener(me, type, listener);
				listeners[type] = listener;
			});

			// Elements used to detect size change should not be injected for non responsive charts.
			// See https://github.com/chartjs/Chart.js/issues/2210
			if (me.options.responsive) {
				listener = function() {
					me.resize();
				};

				platform.addEventListener(me, 'resize', listener);
				listeners.resize = listener;
			}
		},

		/**
		 * @private
		 */
		unbindEvents: function() {
			var me = this;
			var listeners = me._listeners;
			if (!listeners) {
				return;
			}

			delete me._listeners;
			helpers$1.each(listeners, function(listener, type) {
				platform.removeEventListener(me, type, listener);
			});
		},

		updateHoverStyle: function(elements, mode, enabled) {
			var prefix = enabled ? 'set' : 'remove';
			var element, i, ilen;

			for (i = 0, ilen = elements.length; i < ilen; ++i) {
				element = elements[i];
				if (element) {
					this.getDatasetMeta(element._datasetIndex).controller[prefix + 'HoverStyle'](element);
				}
			}

			if (mode === 'dataset') {
				this.getDatasetMeta(elements[0]._datasetIndex).controller['_' + prefix + 'DatasetHoverStyle']();
			}
		},

		/**
		 * @private
		 */
		eventHandler: function(e) {
			var me = this;
			var tooltip = me.tooltip;

			if (core_plugins.notify(me, 'beforeEvent', [e]) === false) {
				return;
			}

			// Buffer any update calls so that renders do not occur
			me._bufferedRender = true;
			me._bufferedRequest = null;

			var changed = me.handleEvent(e);
			// for smooth tooltip animations issue #4989
			// the tooltip should be the source of change
			// Animation check workaround:
			// tooltip._start will be null when tooltip isn't animating
			if (tooltip) {
				changed = tooltip._start
					? tooltip.handleEvent(e)
					: changed | tooltip.handleEvent(e);
			}

			core_plugins.notify(me, 'afterEvent', [e]);

			var bufferedRequest = me._bufferedRequest;
			if (bufferedRequest) {
				// If we have an update that was triggered, we need to do a normal render
				me.render(bufferedRequest);
			} else if (changed && !me.animating) {
				// If entering, leaving, or changing elements, animate the change via pivot
				me.stop();

				// We only need to render at this point. Updating will cause scales to be
				// recomputed generating flicker & using more memory than necessary.
				me.render({
					duration: me.options.hover.animationDuration,
					lazy: true
				});
			}

			me._bufferedRender = false;
			me._bufferedRequest = null;

			return me;
		},

		/**
		 * Handle an event
		 * @private
		 * @param {IEvent} event the event to handle
		 * @return {boolean} true if the chart needs to re-render
		 */
		handleEvent: function(e) {
			var me = this;
			var options = me.options || {};
			var hoverOptions = options.hover;
			var changed = false;

			me.lastActive = me.lastActive || [];

			// Find Active Elements for hover and tooltips
			if (e.type === 'mouseout') {
				me.active = [];
			} else {
				me.active = me.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions);
			}

			// Invoke onHover hook
			// Need to call with native event here to not break backwards compatibility
			helpers$1.callback(options.onHover || options.hover.onHover, [e.native, me.active], me);

			if (e.type === 'mouseup' || e.type === 'click') {
				if (options.onClick) {
					// Use e.native here for backwards compatibility
					options.onClick.call(me, e.native, me.active);
				}
			}

			// Remove styling for last active (even if it may still be active)
			if (me.lastActive.length) {
				me.updateHoverStyle(me.lastActive, hoverOptions.mode, false);
			}

			// Built in hover styling
			if (me.active.length && hoverOptions.mode) {
				me.updateHoverStyle(me.active, hoverOptions.mode, true);
			}

			changed = !helpers$1.arrayEquals(me.active, me.lastActive);

			// Remember Last Actives
			me.lastActive = me.active;

			return changed;
		}
	});

	/**
	 * NOTE(SB) We actually don't use this container anymore but we need to keep it
	 * for backward compatibility. Though, it can still be useful for plugins that
	 * would need to work on multiple charts?!
	 */
	Chart.instances = {};

	var core_controller = Chart;

	// DEPRECATIONS

	/**
	 * Provided for backward compatibility, use Chart instead.
	 * @class Chart.Controller
	 * @deprecated since version 2.6
	 * @todo remove at version 3
	 * @private
	 */
	Chart.Controller = Chart;

	/**
	 * Provided for backward compatibility, not available anymore.
	 * @namespace Chart
	 * @deprecated since version 2.8
	 * @todo remove at version 3
	 * @private
	 */
	Chart.types = {};

	/**
	 * Provided for backward compatibility, not available anymore.
	 * @namespace Chart.helpers.configMerge
	 * @deprecated since version 2.8.0
	 * @todo remove at version 3
	 * @private
	 */
	helpers$1.configMerge = mergeConfig;

	/**
	 * Provided for backward compatibility, not available anymore.
	 * @namespace Chart.helpers.scaleMerge
	 * @deprecated since version 2.8.0
	 * @todo remove at version 3
	 * @private
	 */
	helpers$1.scaleMerge = mergeScaleConfig;

	var core_helpers = function() {

		// -- Basic js utility methods

		helpers$1.where = function(collection, filterCallback) {
			if (helpers$1.isArray(collection) && Array.prototype.filter) {
				return collection.filter(filterCallback);
			}
			var filtered = [];

			helpers$1.each(collection, function(item) {
				if (filterCallback(item)) {
					filtered.push(item);
				}
			});

			return filtered;
		};
		helpers$1.findIndex = Array.prototype.findIndex ?
			function(array, callback, scope) {
				return array.findIndex(callback, scope);
			} :
			function(array, callback, scope) {
				scope = scope === undefined ? array : scope;
				for (var i = 0, ilen = array.length; i < ilen; ++i) {
					if (callback.call(scope, array[i], i, array)) {
						return i;
					}
				}
				return -1;
			};
		helpers$1.findNextWhere = function(arrayToSearch, filterCallback, startIndex) {
			// Default to start of the array
			if (helpers$1.isNullOrUndef(startIndex)) {
				startIndex = -1;
			}
			for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
				var currentItem = arrayToSearch[i];
				if (filterCallback(currentItem)) {
					return currentItem;
				}
			}
		};
		helpers$1.findPreviousWhere = function(arrayToSearch, filterCallback, startIndex) {
			// Default to end of the array
			if (helpers$1.isNullOrUndef(startIndex)) {
				startIndex = arrayToSearch.length;
			}
			for (var i = startIndex - 1; i >= 0; i--) {
				var currentItem = arrayToSearch[i];
				if (filterCallback(currentItem)) {
					return currentItem;
				}
			}
		};

		// -- Math methods
		helpers$1.isNumber = function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		};
		helpers$1.almostEquals = function(x, y, epsilon) {
			return Math.abs(x - y) < epsilon;
		};
		helpers$1.almostWhole = function(x, epsilon) {
			var rounded = Math.round(x);
			return ((rounded - epsilon) <= x) && ((rounded + epsilon) >= x);
		};
		helpers$1.max = function(array) {
			return array.reduce(function(max, value) {
				if (!isNaN(value)) {
					return Math.max(max, value);
				}
				return max;
			}, Number.NEGATIVE_INFINITY);
		};
		helpers$1.min = function(array) {
			return array.reduce(function(min, value) {
				if (!isNaN(value)) {
					return Math.min(min, value);
				}
				return min;
			}, Number.POSITIVE_INFINITY);
		};
		helpers$1.sign = Math.sign ?
			function(x) {
				return Math.sign(x);
			} :
			function(x) {
				x = +x; // convert to a number
				if (x === 0 || isNaN(x)) {
					return x;
				}
				return x > 0 ? 1 : -1;
			};
		helpers$1.toRadians = function(degrees) {
			return degrees * (Math.PI / 180);
		};
		helpers$1.toDegrees = function(radians) {
			return radians * (180 / Math.PI);
		};

		/**
		 * Returns the number of decimal places
		 * i.e. the number of digits after the decimal point, of the value of this Number.
		 * @param {number} x - A number.
		 * @returns {number} The number of decimal places.
		 * @private
		 */
		helpers$1._decimalPlaces = function(x) {
			if (!helpers$1.isFinite(x)) {
				return;
			}
			var e = 1;
			var p = 0;
			while (Math.round(x * e) / e !== x) {
				e *= 10;
				p++;
			}
			return p;
		};

		// Gets the angle from vertical upright to the point about a centre.
		helpers$1.getAngleFromPoint = function(centrePoint, anglePoint) {
			var distanceFromXCenter = anglePoint.x - centrePoint.x;
			var distanceFromYCenter = anglePoint.y - centrePoint.y;
			var radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);

			var angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);

			if (angle < (-0.5 * Math.PI)) {
				angle += 2.0 * Math.PI; // make sure the returned angle is in the range of (-PI/2, 3PI/2]
			}

			return {
				angle: angle,
				distance: radialDistanceFromCenter
			};
		};
		helpers$1.distanceBetweenPoints = function(pt1, pt2) {
			return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
		};

		/**
		 * Provided for backward compatibility, not available anymore
		 * @function Chart.helpers.aliasPixel
		 * @deprecated since version 2.8.0
		 * @todo remove at version 3
		 */
		helpers$1.aliasPixel = function(pixelWidth) {
			return (pixelWidth % 2 === 0) ? 0 : 0.5;
		};

		/**
		 * Returns the aligned pixel value to avoid anti-aliasing blur
		 * @param {Chart} chart - The chart instance.
		 * @param {number} pixel - A pixel value.
		 * @param {number} width - The width of the element.
		 * @returns {number} The aligned pixel value.
		 * @private
		 */
		helpers$1._alignPixel = function(chart, pixel, width) {
			var devicePixelRatio = chart.currentDevicePixelRatio;
			var halfWidth = width / 2;
			return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
		};

		helpers$1.splineCurve = function(firstPoint, middlePoint, afterPoint, t) {
			// Props to Rob Spencer at scaled innovation for his post on splining between points
			// http://scaledinnovation.com/analytics/splines/aboutSplines.html

			// This function must also respect "skipped" points

			var previous = firstPoint.skip ? middlePoint : firstPoint;
			var current = middlePoint;
			var next = afterPoint.skip ? middlePoint : afterPoint;

			var d01 = Math.sqrt(Math.pow(current.x - previous.x, 2) + Math.pow(current.y - previous.y, 2));
			var d12 = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2));

			var s01 = d01 / (d01 + d12);
			var s12 = d12 / (d01 + d12);

			// If all points are the same, s01 & s02 will be inf
			s01 = isNaN(s01) ? 0 : s01;
			s12 = isNaN(s12) ? 0 : s12;

			var fa = t * s01; // scaling factor for triangle Ta
			var fb = t * s12;

			return {
				previous: {
					x: current.x - fa * (next.x - previous.x),
					y: current.y - fa * (next.y - previous.y)
				},
				next: {
					x: current.x + fb * (next.x - previous.x),
					y: current.y + fb * (next.y - previous.y)
				}
			};
		};
		helpers$1.EPSILON = Number.EPSILON || 1e-14;
		helpers$1.splineCurveMonotone = function(points) {
			// This function calculates Bézier control points in a similar way than |splineCurve|,
			// but preserves monotonicity of the provided data and ensures no local extremums are added
			// between the dataset discrete points due to the interpolation.
			// See : https://en.wikipedia.org/wiki/Monotone_cubic_interpolation

			var pointsWithTangents = (points || []).map(function(point) {
				return {
					model: point._model,
					deltaK: 0,
					mK: 0
				};
			});

			// Calculate slopes (deltaK) and initialize tangents (mK)
			var pointsLen = pointsWithTangents.length;
			var i, pointBefore, pointCurrent, pointAfter;
			for (i = 0; i < pointsLen; ++i) {
				pointCurrent = pointsWithTangents[i];
				if (pointCurrent.model.skip) {
					continue;
				}

				pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
				pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
				if (pointAfter && !pointAfter.model.skip) {
					var slopeDeltaX = (pointAfter.model.x - pointCurrent.model.x);

					// In the case of two points that appear at the same x pixel, slopeDeltaX is 0
					pointCurrent.deltaK = slopeDeltaX !== 0 ? (pointAfter.model.y - pointCurrent.model.y) / slopeDeltaX : 0;
				}

				if (!pointBefore || pointBefore.model.skip) {
					pointCurrent.mK = pointCurrent.deltaK;
				} else if (!pointAfter || pointAfter.model.skip) {
					pointCurrent.mK = pointBefore.deltaK;
				} else if (this.sign(pointBefore.deltaK) !== this.sign(pointCurrent.deltaK)) {
					pointCurrent.mK = 0;
				} else {
					pointCurrent.mK = (pointBefore.deltaK + pointCurrent.deltaK) / 2;
				}
			}

			// Adjust tangents to ensure monotonic properties
			var alphaK, betaK, tauK, squaredMagnitude;
			for (i = 0; i < pointsLen - 1; ++i) {
				pointCurrent = pointsWithTangents[i];
				pointAfter = pointsWithTangents[i + 1];
				if (pointCurrent.model.skip || pointAfter.model.skip) {
					continue;
				}

				if (helpers$1.almostEquals(pointCurrent.deltaK, 0, this.EPSILON)) {
					pointCurrent.mK = pointAfter.mK = 0;
					continue;
				}

				alphaK = pointCurrent.mK / pointCurrent.deltaK;
				betaK = pointAfter.mK / pointCurrent.deltaK;
				squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
				if (squaredMagnitude <= 9) {
					continue;
				}

				tauK = 3 / Math.sqrt(squaredMagnitude);
				pointCurrent.mK = alphaK * tauK * pointCurrent.deltaK;
				pointAfter.mK = betaK * tauK * pointCurrent.deltaK;
			}

			// Compute control points
			var deltaX;
			for (i = 0; i < pointsLen; ++i) {
				pointCurrent = pointsWithTangents[i];
				if (pointCurrent.model.skip) {
					continue;
				}

				pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
				pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
				if (pointBefore && !pointBefore.model.skip) {
					deltaX = (pointCurrent.model.x - pointBefore.model.x) / 3;
					pointCurrent.model.controlPointPreviousX = pointCurrent.model.x - deltaX;
					pointCurrent.model.controlPointPreviousY = pointCurrent.model.y - deltaX * pointCurrent.mK;
				}
				if (pointAfter && !pointAfter.model.skip) {
					deltaX = (pointAfter.model.x - pointCurrent.model.x) / 3;
					pointCurrent.model.controlPointNextX = pointCurrent.model.x + deltaX;
					pointCurrent.model.controlPointNextY = pointCurrent.model.y + deltaX * pointCurrent.mK;
				}
			}
		};
		helpers$1.nextItem = function(collection, index, loop) {
			if (loop) {
				return index >= collection.length - 1 ? collection[0] : collection[index + 1];
			}
			return index >= collection.length - 1 ? collection[collection.length - 1] : collection[index + 1];
		};
		helpers$1.previousItem = function(collection, index, loop) {
			if (loop) {
				return index <= 0 ? collection[collection.length - 1] : collection[index - 1];
			}
			return index <= 0 ? collection[0] : collection[index - 1];
		};
		// Implementation of the nice number algorithm used in determining where axis labels will go
		helpers$1.niceNum = function(range, round) {
			var exponent = Math.floor(helpers$1.log10(range));
			var fraction = range / Math.pow(10, exponent);
			var niceFraction;

			if (round) {
				if (fraction < 1.5) {
					niceFraction = 1;
				} else if (fraction < 3) {
					niceFraction = 2;
				} else if (fraction < 7) {
					niceFraction = 5;
				} else {
					niceFraction = 10;
				}
			} else if (fraction <= 1.0) {
				niceFraction = 1;
			} else if (fraction <= 2) {
				niceFraction = 2;
			} else if (fraction <= 5) {
				niceFraction = 5;
			} else {
				niceFraction = 10;
			}

			return niceFraction * Math.pow(10, exponent);
		};
		// Request animation polyfill - https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
		helpers$1.requestAnimFrame = (function() {
			if (typeof window === 'undefined') {
				return function(callback) {
					callback();
				};
			}
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function(callback) {
					return window.setTimeout(callback, 1000 / 60);
				};
		}());
		// -- DOM methods
		helpers$1.getRelativePosition = function(evt, chart) {
			var mouseX, mouseY;
			var e = evt.originalEvent || evt;
			var canvas = evt.target || evt.srcElement;
			var boundingRect = canvas.getBoundingClientRect();

			var touches = e.touches;
			if (touches && touches.length > 0) {
				mouseX = touches[0].clientX;
				mouseY = touches[0].clientY;

			} else {
				mouseX = e.clientX;
				mouseY = e.clientY;
			}

			// Scale mouse coordinates into canvas coordinates
			// by following the pattern laid out by 'jerryj' in the comments of
			// https://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
			var paddingLeft = parseFloat(helpers$1.getStyle(canvas, 'padding-left'));
			var paddingTop = parseFloat(helpers$1.getStyle(canvas, 'padding-top'));
			var paddingRight = parseFloat(helpers$1.getStyle(canvas, 'padding-right'));
			var paddingBottom = parseFloat(helpers$1.getStyle(canvas, 'padding-bottom'));
			var width = boundingRect.right - boundingRect.left - paddingLeft - paddingRight;
			var height = boundingRect.bottom - boundingRect.top - paddingTop - paddingBottom;

			// We divide by the current device pixel ratio, because the canvas is scaled up by that amount in each direction. However
			// the backend model is in unscaled coordinates. Since we are going to deal with our model coordinates, we go back here
			mouseX = Math.round((mouseX - boundingRect.left - paddingLeft) / (width) * canvas.width / chart.currentDevicePixelRatio);
			mouseY = Math.round((mouseY - boundingRect.top - paddingTop) / (height) * canvas.height / chart.currentDevicePixelRatio);

			return {
				x: mouseX,
				y: mouseY
			};

		};

		// Private helper function to convert max-width/max-height values that may be percentages into a number
		function parseMaxStyle(styleValue, node, parentProperty) {
			var valueInPixels;
			if (typeof styleValue === 'string') {
				valueInPixels = parseInt(styleValue, 10);

				if (styleValue.indexOf('%') !== -1) {
					// percentage * size in dimension
					valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
				}
			} else {
				valueInPixels = styleValue;
			}

			return valueInPixels;
		}

		/**
		 * Returns if the given value contains an effective constraint.
		 * @private
		 */
		function isConstrainedValue(value) {
			return value !== undefined && value !== null && value !== 'none';
		}

		/**
		 * Returns the max width or height of the given DOM node in a cross-browser compatible fashion
		 * @param {HTMLElement} domNode - the node to check the constraint on
		 * @param {string} maxStyle - the style that defines the maximum for the direction we are using ('max-width' / 'max-height')
		 * @param {string} percentageProperty - property of parent to use when calculating width as a percentage
		 * @see {@link https://www.nathanaeljones.com/blog/2013/reading-max-width-cross-browser}
		 */
		function getConstraintDimension(domNode, maxStyle, percentageProperty) {
			var view = document.defaultView;
			var parentNode = helpers$1._getParentNode(domNode);
			var constrainedNode = view.getComputedStyle(domNode)[maxStyle];
			var constrainedContainer = view.getComputedStyle(parentNode)[maxStyle];
			var hasCNode = isConstrainedValue(constrainedNode);
			var hasCContainer = isConstrainedValue(constrainedContainer);
			var infinity = Number.POSITIVE_INFINITY;

			if (hasCNode || hasCContainer) {
				return Math.min(
					hasCNode ? parseMaxStyle(constrainedNode, domNode, percentageProperty) : infinity,
					hasCContainer ? parseMaxStyle(constrainedContainer, parentNode, percentageProperty) : infinity);
			}

			return 'none';
		}
		// returns Number or undefined if no constraint
		helpers$1.getConstraintWidth = function(domNode) {
			return getConstraintDimension(domNode, 'max-width', 'clientWidth');
		};
		// returns Number or undefined if no constraint
		helpers$1.getConstraintHeight = function(domNode) {
			return getConstraintDimension(domNode, 'max-height', 'clientHeight');
		};
		/**
		 * @private
	 	 */
		helpers$1._calculatePadding = function(container, padding, parentDimension) {
			padding = helpers$1.getStyle(container, padding);

			return padding.indexOf('%') > -1 ? parentDimension * parseInt(padding, 10) / 100 : parseInt(padding, 10);
		};
		/**
		 * @private
		 */
		helpers$1._getParentNode = function(domNode) {
			var parent = domNode.parentNode;
			if (parent && parent.toString() === '[object ShadowRoot]') {
				parent = parent.host;
			}
			return parent;
		};
		helpers$1.getMaximumWidth = function(domNode) {
			var container = helpers$1._getParentNode(domNode);
			if (!container) {
				return domNode.clientWidth;
			}

			var clientWidth = container.clientWidth;
			var paddingLeft = helpers$1._calculatePadding(container, 'padding-left', clientWidth);
			var paddingRight = helpers$1._calculatePadding(container, 'padding-right', clientWidth);

			var w = clientWidth - paddingLeft - paddingRight;
			var cw = helpers$1.getConstraintWidth(domNode);
			return isNaN(cw) ? w : Math.min(w, cw);
		};
		helpers$1.getMaximumHeight = function(domNode) {
			var container = helpers$1._getParentNode(domNode);
			if (!container) {
				return domNode.clientHeight;
			}

			var clientHeight = container.clientHeight;
			var paddingTop = helpers$1._calculatePadding(container, 'padding-top', clientHeight);
			var paddingBottom = helpers$1._calculatePadding(container, 'padding-bottom', clientHeight);

			var h = clientHeight - paddingTop - paddingBottom;
			var ch = helpers$1.getConstraintHeight(domNode);
			return isNaN(ch) ? h : Math.min(h, ch);
		};
		helpers$1.getStyle = function(el, property) {
			return el.currentStyle ?
				el.currentStyle[property] :
				document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
		};
		helpers$1.retinaScale = function(chart, forceRatio) {
			var pixelRatio = chart.currentDevicePixelRatio = forceRatio || (typeof window !== 'undefined' && window.devicePixelRatio) || 1;
			if (pixelRatio === 1) {
				return;
			}

			var canvas = chart.canvas;
			var height = chart.height;
			var width = chart.width;

			canvas.height = height * pixelRatio;
			canvas.width = width * pixelRatio;
			chart.ctx.scale(pixelRatio, pixelRatio);

			// If no style has been set on the canvas, the render size is used as display size,
			// making the chart visually bigger, so let's enforce it to the "correct" values.
			// See https://github.com/chartjs/Chart.js/issues/3575
			if (!canvas.style.height && !canvas.style.width) {
				canvas.style.height = height + 'px';
				canvas.style.width = width + 'px';
			}
		};
		// -- Canvas methods
		helpers$1.fontString = function(pixelSize, fontStyle, fontFamily) {
			return fontStyle + ' ' + pixelSize + 'px ' + fontFamily;
		};
		helpers$1.longestText = function(ctx, font, arrayOfThings, cache) {
			cache = cache || {};
			var data = cache.data = cache.data || {};
			var gc = cache.garbageCollect = cache.garbageCollect || [];

			if (cache.font !== font) {
				data = cache.data = {};
				gc = cache.garbageCollect = [];
				cache.font = font;
			}

			ctx.font = font;
			var longest = 0;
			var ilen = arrayOfThings.length;
			var i, j, jlen, thing, nestedThing;
			for (i = 0; i < ilen; i++) {
				thing = arrayOfThings[i];

				// Undefined strings and arrays should not be measured
				if (thing !== undefined && thing !== null && helpers$1.isArray(thing) !== true) {
					longest = helpers$1.measureText(ctx, data, gc, longest, thing);
				} else if (helpers$1.isArray(thing)) {
					// if it is an array lets measure each element
					// to do maybe simplify this function a bit so we can do this more recursively?
					for (j = 0, jlen = thing.length; j < jlen; j++) {
						nestedThing = thing[j];
						// Undefined strings and arrays should not be measured
						if (nestedThing !== undefined && nestedThing !== null && !helpers$1.isArray(nestedThing)) {
							longest = helpers$1.measureText(ctx, data, gc, longest, nestedThing);
						}
					}
				}
			}

			var gcLen = gc.length / 2;
			if (gcLen > arrayOfThings.length) {
				for (i = 0; i < gcLen; i++) {
					delete data[gc[i]];
				}
				gc.splice(0, gcLen);
			}
			return longest;
		};
		helpers$1.measureText = function(ctx, data, gc, longest, string) {
			var textWidth = data[string];
			if (!textWidth) {
				textWidth = data[string] = ctx.measureText(string).width;
				gc.push(string);
			}
			if (textWidth > longest) {
				longest = textWidth;
			}
			return longest;
		};

		/**
		 * @deprecated
		 */
		helpers$1.numberOfLabelLines = function(arrayOfThings) {
			var numberOfLines = 1;
			helpers$1.each(arrayOfThings, function(thing) {
				if (helpers$1.isArray(thing)) {
					if (thing.length > numberOfLines) {
						numberOfLines = thing.length;
					}
				}
			});
			return numberOfLines;
		};

		helpers$1.color = !chartjsColor ?
			function(value) {
				console.error('Color.js not found!');
				return value;
			} :
			function(value) {
				/* global CanvasGradient */
				if (value instanceof CanvasGradient) {
					value = core_defaults.global.defaultColor;
				}

				return chartjsColor(value);
			};

		helpers$1.getHoverColor = function(colorValue) {
			/* global CanvasPattern */
			return (colorValue instanceof CanvasPattern || colorValue instanceof CanvasGradient) ?
				colorValue :
				helpers$1.color(colorValue).saturate(0.5).darken(0.1).rgbString();
		};
	};

	function abstract() {
		throw new Error(
			'This method is not implemented: either no adapter can ' +
			'be found or an incomplete integration was provided.'
		);
	}

	/**
	 * Date adapter (current used by the time scale)
	 * @namespace Chart._adapters._date
	 * @memberof Chart._adapters
	 * @private
	 */

	/**
	 * Currently supported unit string values.
	 * @typedef {('millisecond'|'second'|'minute'|'hour'|'day'|'week'|'month'|'quarter'|'year')}
	 * @memberof Chart._adapters._date
	 * @name Unit
	 */

	/**
	 * @class
	 */
	function DateAdapter(options) {
		this.options = options || {};
	}

	helpers$1.extend(DateAdapter.prototype, /** @lends DateAdapter */ {
		/**
		 * Returns a map of time formats for the supported formatting units defined
		 * in Unit as well as 'datetime' representing a detailed date/time string.
		 * @returns {{string: string}}
		 */
		formats: abstract,

		/**
		 * Parses the given `value` and return the associated timestamp.
		 * @param {any} value - the value to parse (usually comes from the data)
		 * @param {string} [format] - the expected data format
		 * @returns {(number|null)}
		 * @function
		 */
		parse: abstract,

		/**
		 * Returns the formatted date in the specified `format` for a given `timestamp`.
		 * @param {number} timestamp - the timestamp to format
		 * @param {string} format - the date/time token
		 * @return {string}
		 * @function
		 */
		format: abstract,

		/**
		 * Adds the specified `amount` of `unit` to the given `timestamp`.
		 * @param {number} timestamp - the input timestamp
		 * @param {number} amount - the amount to add
		 * @param {Unit} unit - the unit as string
		 * @return {number}
		 * @function
		 */
		add: abstract,

		/**
		 * Returns the number of `unit` between the given timestamps.
		 * @param {number} max - the input timestamp (reference)
		 * @param {number} min - the timestamp to substract
		 * @param {Unit} unit - the unit as string
		 * @return {number}
		 * @function
		 */
		diff: abstract,

		/**
		 * Returns start of `unit` for the given `timestamp`.
		 * @param {number} timestamp - the input timestamp
		 * @param {Unit} unit - the unit as string
		 * @param {number} [weekday] - the ISO day of the week with 1 being Monday
		 * and 7 being Sunday (only needed if param *unit* is `isoWeek`).
		 * @function
		 */
		startOf: abstract,

		/**
		 * Returns end of `unit` for the given `timestamp`.
		 * @param {number} timestamp - the input timestamp
		 * @param {Unit} unit - the unit as string
		 * @function
		 */
		endOf: abstract,

		// DEPRECATIONS

		/**
		 * Provided for backward compatibility for scale.getValueForPixel(),
		 * this method should be overridden only by the moment adapter.
		 * @deprecated since version 2.8.0
		 * @todo remove at version 3
		 * @private
		 */
		_create: function(value) {
			return value;
		}
	});

	DateAdapter.override = function(members) {
		helpers$1.extend(DateAdapter.prototype, members);
	};

	var _date = DateAdapter;

	var core_adapters = {
		_date: _date
	};

	/**
	 * Namespace to hold static tick generation functions
	 * @namespace Chart.Ticks
	 */
	var core_ticks = {
		/**
		 * Namespace to hold formatters for different types of ticks
		 * @namespace Chart.Ticks.formatters
		 */
		formatters: {
			/**
			 * Formatter for value labels
			 * @method Chart.Ticks.formatters.values
			 * @param value the value to display
			 * @return {string|string[]} the label to display
			 */
			values: function(value) {
				return helpers$1.isArray(value) ? value : '' + value;
			},

			/**
			 * Formatter for linear numeric ticks
			 * @method Chart.Ticks.formatters.linear
			 * @param tickValue {number} the value to be formatted
			 * @param index {number} the position of the tickValue parameter in the ticks array
			 * @param ticks {number[]} the list of ticks being converted
			 * @return {string} string representation of the tickValue parameter
			 */
			linear: function(tickValue, index, ticks) {
				// If we have lots of ticks, don't use the ones
				var delta = ticks.length > 3 ? ticks[2] - ticks[1] : ticks[1] - ticks[0];

				// If we have a number like 2.5 as the delta, figure out how many decimal places we need
				if (Math.abs(delta) > 1) {
					if (tickValue !== Math.floor(tickValue)) {
						// not an integer
						delta = tickValue - Math.floor(tickValue);
					}
				}

				var logDelta = helpers$1.log10(Math.abs(delta));
				var tickString = '';

				if (tickValue !== 0) {
					var maxTick = Math.max(Math.abs(ticks[0]), Math.abs(ticks[ticks.length - 1]));
					if (maxTick < 1e-4) { // all ticks are small numbers; use scientific notation
						var logTick = helpers$1.log10(Math.abs(tickValue));
						var numExponential = Math.floor(logTick) - Math.floor(logDelta);
						numExponential = Math.max(Math.min(numExponential, 20), 0);
						tickString = tickValue.toExponential(numExponential);
					} else {
						var numDecimal = -1 * Math.floor(logDelta);
						numDecimal = Math.max(Math.min(numDecimal, 20), 0); // toFixed has a max of 20 decimal places
						tickString = tickValue.toFixed(numDecimal);
					}
				} else {
					tickString = '0'; // never show decimal places for 0
				}

				return tickString;
			},

			logarithmic: function(tickValue, index, ticks) {
				var remain = tickValue / (Math.pow(10, Math.floor(helpers$1.log10(tickValue))));

				if (tickValue === 0) {
					return '0';
				} else if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === ticks.length - 1) {
					return tickValue.toExponential();
				}
				return '';
			}
		}
	};

	var isArray = helpers$1.isArray;
	var isNullOrUndef = helpers$1.isNullOrUndef;
	var valueOrDefault$a = helpers$1.valueOrDefault;
	var valueAtIndexOrDefault = helpers$1.valueAtIndexOrDefault;

	core_defaults._set('scale', {
		display: true,
		position: 'left',
		offset: false,

		// grid line settings
		gridLines: {
			display: true,
			color: 'rgba(0,0,0,0.1)',
			lineWidth: 1,
			drawBorder: true,
			drawOnChartArea: true,
			drawTicks: true,
			tickMarkLength: 10,
			zeroLineWidth: 1,
			zeroLineColor: 'rgba(0,0,0,0.25)',
			zeroLineBorderDash: [],
			zeroLineBorderDashOffset: 0.0,
			offsetGridLines: false,
			borderDash: [],
			borderDashOffset: 0.0
		},

		// scale label
		scaleLabel: {
			// display property
			display: false,

			// actual label
			labelString: '',

			// top/bottom padding
			padding: {
				top: 4,
				bottom: 4
			}
		},

		// label settings
		ticks: {
			beginAtZero: false,
			minRotation: 0,
			maxRotation: 50,
			mirror: false,
			padding: 0,
			reverse: false,
			display: true,
			autoSkip: true,
			autoSkipPadding: 0,
			labelOffset: 0,
			// We pass through arrays to be rendered as multiline labels, we convert Others to strings here.
			callback: core_ticks.formatters.values,
			minor: {},
			major: {}
		}
	});

	/** Returns a new array containing numItems from arr */
	function sample(arr, numItems) {
		var result = [];
		var increment = arr.length / numItems;
		var i = 0;
		var len = arr.length;

		for (; i < len; i += increment) {
			result.push(arr[Math.floor(i)]);
		}
		return result;
	}

	function getPixelForGridLine(scale, index, offsetGridLines) {
		var length = scale.getTicks().length;
		var validIndex = Math.min(index, length - 1);
		var lineValue = scale.getPixelForTick(validIndex);
		var start = scale._startPixel;
		var end = scale._endPixel;
		var epsilon = 1e-6; // 1e-6 is margin in pixels for accumulated error.
		var offset;

		if (offsetGridLines) {
			if (length === 1) {
				offset = Math.max(lineValue - start, end - lineValue);
			} else if (index === 0) {
				offset = (scale.getPixelForTick(1) - lineValue) / 2;
			} else {
				offset = (lineValue - scale.getPixelForTick(validIndex - 1)) / 2;
			}
			lineValue += validIndex < index ? offset : -offset;

			// Return undefined if the pixel is out of the range
			if (lineValue < start - epsilon || lineValue > end + epsilon) {
				return;
			}
		}
		return lineValue;
	}

	function garbageCollect(caches, length) {
		helpers$1.each(caches, function(cache) {
			var gc = cache.gc;
			var gcLen = gc.length / 2;
			var i;
			if (gcLen > length) {
				for (i = 0; i < gcLen; ++i) {
					delete cache.data[gc[i]];
				}
				gc.splice(0, gcLen);
			}
		});
	}

	/**
	 * Returns {width, height, offset} objects for the first, last, widest, highest tick
	 * labels where offset indicates the anchor point offset from the top in pixels.
	 */
	function computeLabelSizes(ctx, tickFonts, ticks, caches) {
		var length = ticks.length;
		var widths = [];
		var heights = [];
		var offsets = [];
		var i, j, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel, widest, highest;

		for (i = 0; i < length; ++i) {
			label = ticks[i].label;
			tickFont = ticks[i].major ? tickFonts.major : tickFonts.minor;
			ctx.font = fontString = tickFont.string;
			cache = caches[fontString] = caches[fontString] || {data: {}, gc: []};
			lineHeight = tickFont.lineHeight;
			width = height = 0;
			// Undefined labels and arrays should not be measured
			if (!isNullOrUndef(label) && !isArray(label)) {
				width = helpers$1.measureText(ctx, cache.data, cache.gc, width, label);
				height = lineHeight;
			} else if (isArray(label)) {
				// if it is an array let's measure each element
				for (j = 0, jlen = label.length; j < jlen; ++j) {
					nestedLabel = label[j];
					// Undefined labels and arrays should not be measured
					if (!isNullOrUndef(nestedLabel) && !isArray(nestedLabel)) {
						width = helpers$1.measureText(ctx, cache.data, cache.gc, width, nestedLabel);
						height += lineHeight;
					}
				}
			}
			widths.push(width);
			heights.push(height);
			offsets.push(lineHeight / 2);
		}
		garbageCollect(caches, length);

		widest = widths.indexOf(Math.max.apply(null, widths));
		highest = heights.indexOf(Math.max.apply(null, heights));

		function valueAt(idx) {
			return {
				width: widths[idx] || 0,
				height: heights[idx] || 0,
				offset: offsets[idx] || 0
			};
		}

		return {
			first: valueAt(0),
			last: valueAt(length - 1),
			widest: valueAt(widest),
			highest: valueAt(highest)
		};
	}

	function getTickMarkLength(options) {
		return options.drawTicks ? options.tickMarkLength : 0;
	}

	function getScaleLabelHeight(options) {
		var font, padding;

		if (!options.display) {
			return 0;
		}

		font = helpers$1.options._parseFont(options);
		padding = helpers$1.options.toPadding(options.padding);

		return font.lineHeight + padding.height;
	}

	function parseFontOptions(options, nestedOpts) {
		return helpers$1.extend(helpers$1.options._parseFont({
			fontFamily: valueOrDefault$a(nestedOpts.fontFamily, options.fontFamily),
			fontSize: valueOrDefault$a(nestedOpts.fontSize, options.fontSize),
			fontStyle: valueOrDefault$a(nestedOpts.fontStyle, options.fontStyle),
			lineHeight: valueOrDefault$a(nestedOpts.lineHeight, options.lineHeight)
		}), {
			color: helpers$1.options.resolve([nestedOpts.fontColor, options.fontColor, core_defaults.global.defaultFontColor])
		});
	}

	function parseTickFontOptions(options) {
		var minor = parseFontOptions(options, options.minor);
		var major = options.major.enabled ? parseFontOptions(options, options.major) : minor;

		return {minor: minor, major: major};
	}

	function nonSkipped(ticksToFilter) {
		var filtered = [];
		var item, index, len;
		for (index = 0, len = ticksToFilter.length; index < len; ++index) {
			item = ticksToFilter[index];
			if (typeof item._index !== 'undefined') {
				filtered.push(item);
			}
		}
		return filtered;
	}

	function getEvenSpacing(arr) {
		var len = arr.length;
		var i, diff;

		if (len < 2) {
			return false;
		}

		for (diff = arr[0], i = 1; i < len; ++i) {
			if (arr[i] - arr[i - 1] !== diff) {
				return false;
			}
		}
		return diff;
	}

	function calculateSpacing(majorIndices, ticks, axisLength, ticksLimit) {
		var evenMajorSpacing = getEvenSpacing(majorIndices);
		var spacing = (ticks.length - 1) / ticksLimit;
		var factors, factor, i, ilen;

		// If the major ticks are evenly spaced apart, place the minor ticks
		// so that they divide the major ticks into even chunks
		if (!evenMajorSpacing) {
			return Math.max(spacing, 1);
		}

		factors = helpers$1.math._factorize(evenMajorSpacing);
		for (i = 0, ilen = factors.length - 1; i < ilen; i++) {
			factor = factors[i];
			if (factor > spacing) {
				return factor;
			}
		}
		return Math.max(spacing, 1);
	}

	function getMajorIndices(ticks) {
		var result = [];
		var i, ilen;
		for (i = 0, ilen = ticks.length; i < ilen; i++) {
			if (ticks[i].major) {
				result.push(i);
			}
		}
		return result;
	}

	function skipMajors(ticks, majorIndices, spacing) {
		var count = 0;
		var next = majorIndices[0];
		var i, tick;

		spacing = Math.ceil(spacing);
		for (i = 0; i < ticks.length; i++) {
			tick = ticks[i];
			if (i === next) {
				tick._index = i;
				count++;
				next = majorIndices[count * spacing];
			} else {
				delete tick.label;
			}
		}
	}

	function skip(ticks, spacing, majorStart, majorEnd) {
		var start = valueOrDefault$a(majorStart, 0);
		var end = Math.min(valueOrDefault$a(majorEnd, ticks.length), ticks.length);
		var count = 0;
		var length, i, tick, next;

		spacing = Math.ceil(spacing);
		if (majorEnd) {
			length = majorEnd - majorStart;
			spacing = length / Math.floor(length / spacing);
		}

		next = start;

		while (next < 0) {
			count++;
			next = Math.round(start + count * spacing);
		}

		for (i = Math.max(start, 0); i < end; i++) {
			tick = ticks[i];
			if (i === next) {
				tick._index = i;
				count++;
				next = Math.round(start + count * spacing);
			} else {
				delete tick.label;
			}
		}
	}

	var Scale = core_element.extend({

		zeroLineIndex: 0,

		/**
		 * Get the padding needed for the scale
		 * @method getPadding
		 * @private
		 * @returns {Padding} the necessary padding
		 */
		getPadding: function() {
			var me = this;
			return {
				left: me.paddingLeft || 0,
				top: me.paddingTop || 0,
				right: me.paddingRight || 0,
				bottom: me.paddingBottom || 0
			};
		},

		/**
		 * Returns the scale tick objects ({label, major})
		 * @since 2.7
		 */
		getTicks: function() {
			return this._ticks;
		},

		/**
		* @private
		*/
		_getLabels: function() {
			var data = this.chart.data;
			return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels;
		},

		// These methods are ordered by lifecyle. Utilities then follow.
		// Any function defined here is inherited by all scale types.
		// Any function can be extended by the scale type

		/**
		 * Provided for backward compatibility, not available anymore
		 * @function Chart.Scale.mergeTicksOptions
		 * @deprecated since version 2.8.0
		 * @todo remove at version 3
		 */
		mergeTicksOptions: function() {
			// noop
		},

		beforeUpdate: function() {
			helpers$1.callback(this.options.beforeUpdate, [this]);
		},

		/**
		 * @param {number} maxWidth - the max width in pixels
		 * @param {number} maxHeight - the max height in pixels
		 * @param {object} margins - the space between the edge of the other scales and edge of the chart
		 *   This space comes from two sources:
		 *     - padding - space that's required to show the labels at the edges of the scale
		 *     - thickness of scales or legends in another orientation
		 */
		update: function(maxWidth, maxHeight, margins) {
			var me = this;
			var tickOpts = me.options.ticks;
			var sampleSize = tickOpts.sampleSize;
			var i, ilen, labels, ticks, samplingEnabled;

			// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
			me.beforeUpdate();

			// Absorb the master measurements
			me.maxWidth = maxWidth;
			me.maxHeight = maxHeight;
			me.margins = helpers$1.extend({
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			}, margins);

			me._ticks = null;
			me.ticks = null;
			me._labelSizes = null;
			me._maxLabelLines = 0;
			me.longestLabelWidth = 0;
			me.longestTextCache = me.longestTextCache || {};
			me._gridLineItems = null;
			me._labelItems = null;

			// Dimensions
			me.beforeSetDimensions();
			me.setDimensions();
			me.afterSetDimensions();

			// Data min/max
			me.beforeDataLimits();
			me.determineDataLimits();
			me.afterDataLimits();

			// Ticks - `this.ticks` is now DEPRECATED!
			// Internal ticks are now stored as objects in the PRIVATE `this._ticks` member
			// and must not be accessed directly from outside this class. `this.ticks` being
			// around for long time and not marked as private, we can't change its structure
			// without unexpected breaking changes. If you need to access the scale ticks,
			// use scale.getTicks() instead.

			me.beforeBuildTicks();

			// New implementations should return an array of objects but for BACKWARD COMPAT,
			// we still support no return (`this.ticks` internally set by calling this method).
			ticks = me.buildTicks() || [];

			// Allow modification of ticks in callback.
			ticks = me.afterBuildTicks(ticks) || ticks;

			// Ensure ticks contains ticks in new tick format
			if ((!ticks || !ticks.length) && me.ticks) {
				ticks = [];
				for (i = 0, ilen = me.ticks.length; i < ilen; ++i) {
					ticks.push({
						value: me.ticks[i],
						major: false
					});
				}
			}

			me._ticks = ticks;

			// Compute tick rotation and fit using a sampled subset of labels
			// We generally don't need to compute the size of every single label for determining scale size
			samplingEnabled = sampleSize < ticks.length;
			labels = me._convertTicksToLabels(samplingEnabled ? sample(ticks, sampleSize) : ticks);

			// _configure is called twice, once here, once from core.controller.updateLayout.
			// Here we haven't been positioned yet, but dimensions are correct.
			// Variables set in _configure are needed for calculateTickRotation, and
			// it's ok that coordinates are not correct there, only dimensions matter.
			me._configure();

			// Tick Rotation
			me.beforeCalculateTickRotation();
			me.calculateTickRotation();
			me.afterCalculateTickRotation();

			me.beforeFit();
			me.fit();
			me.afterFit();

			// Auto-skip
			me._ticksToDraw = tickOpts.display && (tickOpts.autoSkip || tickOpts.source === 'auto') ? me._autoSkip(ticks) : ticks;

			if (samplingEnabled) {
				// Generate labels using all non-skipped ticks
				labels = me._convertTicksToLabels(me._ticksToDraw);
			}

			me.ticks = labels;   // BACKWARD COMPATIBILITY

			// IMPORTANT: after this point, we consider that `this.ticks` will NEVER change!

			me.afterUpdate();

			// TODO(v3): remove minSize as a public property and return value from all layout boxes. It is unused
			// make maxWidth and maxHeight private
			return me.minSize;
		},

		/**
		 * @private
		 */
		_configure: function() {
			var me = this;
			var reversePixels = me.options.ticks.reverse;
			var startPixel, endPixel;

			if (me.isHorizontal()) {
				startPixel = me.left;
				endPixel = me.right;
			} else {
				startPixel = me.top;
				endPixel = me.bottom;
				// by default vertical scales are from bottom to top, so pixels are reversed
				reversePixels = !reversePixels;
			}
			me._startPixel = startPixel;
			me._endPixel = endPixel;
			me._reversePixels = reversePixels;
			me._length = endPixel - startPixel;
		},

		afterUpdate: function() {
			helpers$1.callback(this.options.afterUpdate, [this]);
		},

		//

		beforeSetDimensions: function() {
			helpers$1.callback(this.options.beforeSetDimensions, [this]);
		},
		setDimensions: function() {
			var me = this;
			// Set the unconstrained dimension before label rotation
			if (me.isHorizontal()) {
				// Reset position before calculating rotation
				me.width = me.maxWidth;
				me.left = 0;
				me.right = me.width;
			} else {
				me.height = me.maxHeight;

				// Reset position before calculating rotation
				me.top = 0;
				me.bottom = me.height;
			}

			// Reset padding
			me.paddingLeft = 0;
			me.paddingTop = 0;
			me.paddingRight = 0;
			me.paddingBottom = 0;
		},
		afterSetDimensions: function() {
			helpers$1.callback(this.options.afterSetDimensions, [this]);
		},

		// Data limits
		beforeDataLimits: function() {
			helpers$1.callback(this.options.beforeDataLimits, [this]);
		},
		determineDataLimits: helpers$1.noop,
		afterDataLimits: function() {
			helpers$1.callback(this.options.afterDataLimits, [this]);
		},

		//
		beforeBuildTicks: function() {
			helpers$1.callback(this.options.beforeBuildTicks, [this]);
		},
		buildTicks: helpers$1.noop,
		afterBuildTicks: function(ticks) {
			var me = this;
			// ticks is empty for old axis implementations here
			if (isArray(ticks) && ticks.length) {
				return helpers$1.callback(me.options.afterBuildTicks, [me, ticks]);
			}
			// Support old implementations (that modified `this.ticks` directly in buildTicks)
			me.ticks = helpers$1.callback(me.options.afterBuildTicks, [me, me.ticks]) || me.ticks;
			return ticks;
		},

		beforeTickToLabelConversion: function() {
			helpers$1.callback(this.options.beforeTickToLabelConversion, [this]);
		},
		convertTicksToLabels: function() {
			var me = this;
			// Convert ticks to strings
			var tickOpts = me.options.ticks;
			me.ticks = me.ticks.map(tickOpts.userCallback || tickOpts.callback, this);
		},
		afterTickToLabelConversion: function() {
			helpers$1.callback(this.options.afterTickToLabelConversion, [this]);
		},

		//

		beforeCalculateTickRotation: function() {
			helpers$1.callback(this.options.beforeCalculateTickRotation, [this]);
		},
		calculateTickRotation: function() {
			var me = this;
			var options = me.options;
			var tickOpts = options.ticks;
			var numTicks = me.getTicks().length;
			var minRotation = tickOpts.minRotation || 0;
			var maxRotation = tickOpts.maxRotation;
			var labelRotation = minRotation;
			var labelSizes, maxLabelWidth, maxLabelHeight, maxWidth, tickWidth, maxHeight, maxLabelDiagonal;

			if (!me._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !me.isHorizontal()) {
				me.labelRotation = minRotation;
				return;
			}

			labelSizes = me._getLabelSizes();
			maxLabelWidth = labelSizes.widest.width;
			maxLabelHeight = labelSizes.highest.height - labelSizes.highest.offset;

			// Estimate the width of each grid based on the canvas width, the maximum
			// label width and the number of tick intervals
			maxWidth = Math.min(me.maxWidth, me.chart.width - maxLabelWidth);
			tickWidth = options.offset ? me.maxWidth / numTicks : maxWidth / (numTicks - 1);

			// Allow 3 pixels x2 padding either side for label readability
			if (maxLabelWidth + 6 > tickWidth) {
				tickWidth = maxWidth / (numTicks - (options.offset ? 0.5 : 1));
				maxHeight = me.maxHeight - getTickMarkLength(options.gridLines)
					- tickOpts.padding - getScaleLabelHeight(options.scaleLabel);
				maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
				labelRotation = helpers$1.toDegrees(Math.min(
					Math.asin(Math.min((labelSizes.highest.height + 6) / tickWidth, 1)),
					Math.asin(Math.min(maxHeight / maxLabelDiagonal, 1)) - Math.asin(maxLabelHeight / maxLabelDiagonal)
				));
				labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
			}

			me.labelRotation = labelRotation;
		},
		afterCalculateTickRotation: function() {
			helpers$1.callback(this.options.afterCalculateTickRotation, [this]);
		},

		//

		beforeFit: function() {
			helpers$1.callback(this.options.beforeFit, [this]);
		},
		fit: function() {
			var me = this;
			// Reset
			var minSize = me.minSize = {
				width: 0,
				height: 0
			};

			var chart = me.chart;
			var opts = me.options;
			var tickOpts = opts.ticks;
			var scaleLabelOpts = opts.scaleLabel;
			var gridLineOpts = opts.gridLines;
			var display = me._isVisible();
			var isBottom = opts.position === 'bottom';
			var isHorizontal = me.isHorizontal();

			// Width
			if (isHorizontal) {
				minSize.width = me.maxWidth;
			} else if (display) {
				minSize.width = getTickMarkLength(gridLineOpts) + getScaleLabelHeight(scaleLabelOpts);
			}

			// height
			if (!isHorizontal) {
				minSize.height = me.maxHeight; // fill all the height
			} else if (display) {
				minSize.height = getTickMarkLength(gridLineOpts) + getScaleLabelHeight(scaleLabelOpts);
			}

			// Don't bother fitting the ticks if we are not showing the labels
			if (tickOpts.display && display) {
				var tickFonts = parseTickFontOptions(tickOpts);
				var labelSizes = me._getLabelSizes();
				var firstLabelSize = labelSizes.first;
				var lastLabelSize = labelSizes.last;
				var widestLabelSize = labelSizes.widest;
				var highestLabelSize = labelSizes.highest;
				var lineSpace = tickFonts.minor.lineHeight * 0.4;
				var tickPadding = tickOpts.padding;

				if (isHorizontal) {
					// A horizontal axis is more constrained by the height.
					var isRotated = me.labelRotation !== 0;
					var angleRadians = helpers$1.toRadians(me.labelRotation);
					var cosRotation = Math.cos(angleRadians);
					var sinRotation = Math.sin(angleRadians);

					var labelHeight = sinRotation * widestLabelSize.width
						+ cosRotation * (highestLabelSize.height - (isRotated ? highestLabelSize.offset : 0))
						+ (isRotated ? 0 : lineSpace); // padding

					minSize.height = Math.min(me.maxHeight, minSize.height + labelHeight + tickPadding);

					var offsetLeft = me.getPixelForTick(0) - me.left;
					var offsetRight = me.right - me.getPixelForTick(me.getTicks().length - 1);
					var paddingLeft, paddingRight;

					// Ensure that our ticks are always inside the canvas. When rotated, ticks are right aligned
					// which means that the right padding is dominated by the font height
					if (isRotated) {
						paddingLeft = isBottom ?
							cosRotation * firstLabelSize.width + sinRotation * firstLabelSize.offset :
							sinRotation * (firstLabelSize.height - firstLabelSize.offset);
						paddingRight = isBottom ?
							sinRotation * (lastLabelSize.height - lastLabelSize.offset) :
							cosRotation * lastLabelSize.width + sinRotation * lastLabelSize.offset;
					} else {
						paddingLeft = firstLabelSize.width / 2;
						paddingRight = lastLabelSize.width / 2;
					}

					// Adjust padding taking into account changes in offsets
					// and add 3 px to move away from canvas edges
					me.paddingLeft = Math.max((paddingLeft - offsetLeft) * me.width / (me.width - offsetLeft), 0) + 3;
					me.paddingRight = Math.max((paddingRight - offsetRight) * me.width / (me.width - offsetRight), 0) + 3;
				} else {
					// A vertical axis is more constrained by the width. Labels are the
					// dominant factor here, so get that length first and account for padding
					var labelWidth = tickOpts.mirror ? 0 :
						// use lineSpace for consistency with horizontal axis
						// tickPadding is not implemented for horizontal
						widestLabelSize.width + tickPadding + lineSpace;

					minSize.width = Math.min(me.maxWidth, minSize.width + labelWidth);

					me.paddingTop = firstLabelSize.height / 2;
					me.paddingBottom = lastLabelSize.height / 2;
				}
			}

			me.handleMargins();

			if (isHorizontal) {
				me.width = me._length = chart.width - me.margins.left - me.margins.right;
				me.height = minSize.height;
			} else {
				me.width = minSize.width;
				me.height = me._length = chart.height - me.margins.top - me.margins.bottom;
			}
		},

		/**
		 * Handle margins and padding interactions
		 * @private
		 */
		handleMargins: function() {
			var me = this;
			if (me.margins) {
				me.margins.left = Math.max(me.paddingLeft, me.margins.left);
				me.margins.top = Math.max(me.paddingTop, me.margins.top);
				me.margins.right = Math.max(me.paddingRight, me.margins.right);
				me.margins.bottom = Math.max(me.paddingBottom, me.margins.bottom);
			}
		},

		afterFit: function() {
			helpers$1.callback(this.options.afterFit, [this]);
		},

		// Shared Methods
		isHorizontal: function() {
			var pos = this.options.position;
			return pos === 'top' || pos === 'bottom';
		},
		isFullWidth: function() {
			return this.options.fullWidth;
		},

		// Get the correct value. NaN bad inputs, If the value type is object get the x or y based on whether we are horizontal or not
		getRightValue: function(rawValue) {
			// Null and undefined values first
			if (isNullOrUndef(rawValue)) {
				return NaN;
			}
			// isNaN(object) returns true, so make sure NaN is checking for a number; Discard Infinite values
			if ((typeof rawValue === 'number' || rawValue instanceof Number) && !isFinite(rawValue)) {
				return NaN;
			}

			// If it is in fact an object, dive in one more level
			if (rawValue) {
				if (this.isHorizontal()) {
					if (rawValue.x !== undefined) {
						return this.getRightValue(rawValue.x);
					}
				} else if (rawValue.y !== undefined) {
					return this.getRightValue(rawValue.y);
				}
			}

			// Value is good, return it
			return rawValue;
		},

		_convertTicksToLabels: function(ticks) {
			var me = this;
			var labels, i, ilen;

			me.ticks = ticks.map(function(tick) {
				return tick.value;
			});

			me.beforeTickToLabelConversion();

			// New implementations should return the formatted tick labels but for BACKWARD
			// COMPAT, we still support no return (`this.ticks` internally changed by calling
			// this method and supposed to contain only string values).
			labels = me.convertTicksToLabels(ticks) || me.ticks;

			me.afterTickToLabelConversion();

			// BACKWARD COMPAT: synchronize `_ticks` with labels (so potentially `this.ticks`)
			for (i = 0, ilen = ticks.length; i < ilen; ++i) {
				ticks[i].label = labels[i];
			}

			return labels;
		},

		/**
		 * @private
		 */
		_getLabelSizes: function() {
			var me = this;
			var labelSizes = me._labelSizes;

			if (!labelSizes) {
				me._labelSizes = labelSizes = computeLabelSizes(me.ctx, parseTickFontOptions(me.options.ticks), me.getTicks(), me.longestTextCache);
				me.longestLabelWidth = labelSizes.widest.width;
			}

			return labelSizes;
		},

		/**
		 * @private
		 */
		_parseValue: function(value) {
			var start, end, min, max;

			if (isArray(value)) {
				start = +this.getRightValue(value[0]);
				end = +this.getRightValue(value[1]);
				min = Math.min(start, end);
				max = Math.max(start, end);
			} else {
				value = +this.getRightValue(value);
				start = undefined;
				end = value;
				min = value;
				max = value;
			}

			return {
				min: min,
				max: max,
				start: start,
				end: end
			};
		},

		/**
		* @private
		*/
		_getScaleLabel: function(rawValue) {
			var v = this._parseValue(rawValue);
			if (v.start !== undefined) {
				return '[' + v.start + ', ' + v.end + ']';
			}

			return +this.getRightValue(rawValue);
		},

		/**
		 * Used to get the value to display in the tooltip for the data at the given index
		 * @param index
		 * @param datasetIndex
		 */
		getLabelForIndex: helpers$1.noop,

		/**
		 * Returns the location of the given data point. Value can either be an index or a numerical value
		 * The coordinate (0, 0) is at the upper-left corner of the canvas
		 * @param value
		 * @param index
		 * @param datasetIndex
		 */
		getPixelForValue: helpers$1.noop,

		/**
		 * Used to get the data value from a given pixel. This is the inverse of getPixelForValue
		 * The coordinate (0, 0) is at the upper-left corner of the canvas
		 * @param pixel
		 */
		getValueForPixel: helpers$1.noop,

		/**
		 * Returns the location of the tick at the given index
		 * The coordinate (0, 0) is at the upper-left corner of the canvas
		 */
		getPixelForTick: function(index) {
			var me = this;
			var offset = me.options.offset;
			var numTicks = me._ticks.length;
			var tickWidth = 1 / Math.max(numTicks - (offset ? 0 : 1), 1);

			return index < 0 || index > numTicks - 1
				? null
				: me.getPixelForDecimal(index * tickWidth + (offset ? tickWidth / 2 : 0));
		},

		/**
		 * Utility for getting the pixel location of a percentage of scale
		 * The coordinate (0, 0) is at the upper-left corner of the canvas
		 */
		getPixelForDecimal: function(decimal) {
			var me = this;

			if (me._reversePixels) {
				decimal = 1 - decimal;
			}

			return me._startPixel + decimal * me._length;
		},

		getDecimalForPixel: function(pixel) {
			var decimal = (pixel - this._startPixel) / this._length;
			return this._reversePixels ? 1 - decimal : decimal;
		},

		/**
		 * Returns the pixel for the minimum chart value
		 * The coordinate (0, 0) is at the upper-left corner of the canvas
		 */
		getBasePixel: function() {
			return this.getPixelForValue(this.getBaseValue());
		},

		getBaseValue: function() {
			var me = this;
			var min = me.min;
			var max = me.max;

			return me.beginAtZero ? 0 :
				min < 0 && max < 0 ? max :
				min > 0 && max > 0 ? min :
				0;
		},

		/**
		 * Returns a subset of ticks to be plotted to avoid overlapping labels.
		 * @private
		 */
		_autoSkip: function(ticks) {
			var me = this;
			var tickOpts = me.options.ticks;
			var axisLength = me._length;
			var ticksLimit = tickOpts.maxTicksLimit || axisLength / me._tickSize() + 1;
			var majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
			var numMajorIndices = majorIndices.length;
			var first = majorIndices[0];
			var last = majorIndices[numMajorIndices - 1];
			var i, ilen, spacing, avgMajorSpacing;

			// If there are too many major ticks to display them all
			if (numMajorIndices > ticksLimit) {
				skipMajors(ticks, majorIndices, numMajorIndices / ticksLimit);
				return nonSkipped(ticks);
			}

			spacing = calculateSpacing(majorIndices, ticks, axisLength, ticksLimit);

			if (numMajorIndices > 0) {
				for (i = 0, ilen = numMajorIndices - 1; i < ilen; i++) {
					skip(ticks, spacing, majorIndices[i], majorIndices[i + 1]);
				}
				avgMajorSpacing = numMajorIndices > 1 ? (last - first) / (numMajorIndices - 1) : null;
				skip(ticks, spacing, helpers$1.isNullOrUndef(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
				skip(ticks, spacing, last, helpers$1.isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
				return nonSkipped(ticks);
			}
			skip(ticks, spacing);
			return nonSkipped(ticks);
		},

		/**
		 * @private
		 */
		_tickSize: function() {
			var me = this;
			var optionTicks = me.options.ticks;

			// Calculate space needed by label in axis direction.
			var rot = helpers$1.toRadians(me.labelRotation);
			var cos = Math.abs(Math.cos(rot));
			var sin = Math.abs(Math.sin(rot));

			var labelSizes = me._getLabelSizes();
			var padding = optionTicks.autoSkipPadding || 0;
			var w = labelSizes ? labelSizes.widest.width + padding : 0;
			var h = labelSizes ? labelSizes.highest.height + padding : 0;

			// Calculate space needed for 1 tick in axis direction.
			return me.isHorizontal()
				? h * cos > w * sin ? w / cos : h / sin
				: h * sin < w * cos ? h / cos : w / sin;
		},

		/**
		 * @private
		 */
		_isVisible: function() {
			var me = this;
			var chart = me.chart;
			var display = me.options.display;
			var i, ilen, meta;

			if (display !== 'auto') {
				return !!display;
			}

			// When 'auto', the scale is visible if at least one associated dataset is visible.
			for (i = 0, ilen = chart.data.datasets.length; i < ilen; ++i) {
				if (chart.isDatasetVisible(i)) {
					meta = chart.getDatasetMeta(i);
					if (meta.xAxisID === me.id || meta.yAxisID === me.id) {
						return true;
					}
				}
			}

			return false;
		},

		/**
		 * @private
		 */
		_computeGridLineItems: function(chartArea) {
			var me = this;
			var chart = me.chart;
			var options = me.options;
			var gridLines = options.gridLines;
			var position = options.position;
			var offsetGridLines = gridLines.offsetGridLines;
			var isHorizontal = me.isHorizontal();
			var ticks = me._ticksToDraw;
			var ticksLength = ticks.length + (offsetGridLines ? 1 : 0);

			var tl = getTickMarkLength(gridLines);
			var items = [];
			var axisWidth = gridLines.drawBorder ? valueAtIndexOrDefault(gridLines.lineWidth, 0, 0) : 0;
			var axisHalfWidth = axisWidth / 2;
			var alignPixel = helpers$1._alignPixel;
			var alignBorderValue = function(pixel) {
				return alignPixel(chart, pixel, axisWidth);
			};
			var borderValue, i, tick, lineValue, alignedLineValue;
			var tx1, ty1, tx2, ty2, x1, y1, x2, y2, lineWidth, lineColor, borderDash, borderDashOffset;

			if (position === 'top') {
				borderValue = alignBorderValue(me.bottom);
				ty1 = me.bottom - tl;
				ty2 = borderValue - axisHalfWidth;
				y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
				y2 = chartArea.bottom;
			} else if (position === 'bottom') {
				borderValue = alignBorderValue(me.top);
				y1 = chartArea.top;
				y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
				ty1 = borderValue + axisHalfWidth;
				ty2 = me.top + tl;
			} else if (position === 'left') {
				borderValue = alignBorderValue(me.right);
				tx1 = me.right - tl;
				tx2 = borderValue - axisHalfWidth;
				x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
				x2 = chartArea.right;
			} else {
				borderValue = alignBorderValue(me.left);
				x1 = chartArea.left;
				x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
				tx1 = borderValue + axisHalfWidth;
				tx2 = me.left + tl;
			}

			for (i = 0; i < ticksLength; ++i) {
				tick = ticks[i] || {};

				// autoskipper skipped this tick (#4635)
				if (isNullOrUndef(tick.label) && i < ticks.length) {
					continue;
				}

				if (i === me.zeroLineIndex && options.offset === offsetGridLines) {
					// Draw the first index specially
					lineWidth = gridLines.zeroLineWidth;
					lineColor = gridLines.zeroLineColor;
					borderDash = gridLines.zeroLineBorderDash || [];
					borderDashOffset = gridLines.zeroLineBorderDashOffset || 0.0;
				} else {
					lineWidth = valueAtIndexOrDefault(gridLines.lineWidth, i, 1);
					lineColor = valueAtIndexOrDefault(gridLines.color, i, 'rgba(0,0,0,0.1)');
					borderDash = gridLines.borderDash || [];
					borderDashOffset = gridLines.borderDashOffset || 0.0;
				}

				lineValue = getPixelForGridLine(me, tick._index || i, offsetGridLines);

				// Skip if the pixel is out of the range
				if (lineValue === undefined) {
					continue;
				}

				alignedLineValue = alignPixel(chart, lineValue, lineWidth);

				if (isHorizontal) {
					tx1 = tx2 = x1 = x2 = alignedLineValue;
				} else {
					ty1 = ty2 = y1 = y2 = alignedLineValue;
				}

				items.push({
					tx1: tx1,
					ty1: ty1,
					tx2: tx2,
					ty2: ty2,
					x1: x1,
					y1: y1,
					x2: x2,
					y2: y2,
					width: lineWidth,
					color: lineColor,
					borderDash: borderDash,
					borderDashOffset: borderDashOffset,
				});
			}

			items.ticksLength = ticksLength;
			items.borderValue = borderValue;

			return items;
		},

		/**
		 * @private
		 */
		_computeLabelItems: function() {
			var me = this;
			var options = me.options;
			var optionTicks = options.ticks;
			var position = options.position;
			var isMirrored = optionTicks.mirror;
			var isHorizontal = me.isHorizontal();
			var ticks = me._ticksToDraw;
			var fonts = parseTickFontOptions(optionTicks);
			var tickPadding = optionTicks.padding;
			var tl = getTickMarkLength(options.gridLines);
			var rotation = -helpers$1.toRadians(me.labelRotation);
			var items = [];
			var i, ilen, tick, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;

			if (position === 'top') {
				y = me.bottom - tl - tickPadding;
				textAlign = !rotation ? 'center' : 'left';
			} else if (position === 'bottom') {
				y = me.top + tl + tickPadding;
				textAlign = !rotation ? 'center' : 'right';
			} else if (position === 'left') {
				x = me.right - (isMirrored ? 0 : tl) - tickPadding;
				textAlign = isMirrored ? 'left' : 'right';
			} else {
				x = me.left + (isMirrored ? 0 : tl) + tickPadding;
				textAlign = isMirrored ? 'right' : 'left';
			}

			for (i = 0, ilen = ticks.length; i < ilen; ++i) {
				tick = ticks[i];
				label = tick.label;

				// autoskipper skipped this tick (#4635)
				if (isNullOrUndef(label)) {
					continue;
				}

				pixel = me.getPixelForTick(tick._index || i) + optionTicks.labelOffset;
				font = tick.major ? fonts.major : fonts.minor;
				lineHeight = font.lineHeight;
				lineCount = isArray(label) ? label.length : 1;

				if (isHorizontal) {
					x = pixel;
					textOffset = position === 'top'
						? ((!rotation ? 0.5 : 1) - lineCount) * lineHeight
						: (!rotation ? 0.5 : 0) * lineHeight;
				} else {
					y = pixel;
					textOffset = (1 - lineCount) * lineHeight / 2;
				}

				items.push({
					x: x,
					y: y,
					rotation: rotation,
					label: label,
					font: font,
					textOffset: textOffset,
					textAlign: textAlign
				});
			}

			return items;
		},

		/**
		 * @private
		 */
		_drawGrid: function(chartArea) {
			var me = this;
			var gridLines = me.options.gridLines;

			if (!gridLines.display) {
				return;
			}

			var ctx = me.ctx;
			var chart = me.chart;
			var alignPixel = helpers$1._alignPixel;
			var axisWidth = gridLines.drawBorder ? valueAtIndexOrDefault(gridLines.lineWidth, 0, 0) : 0;
			var items = me._gridLineItems || (me._gridLineItems = me._computeGridLineItems(chartArea));
			var width, color, i, ilen, item;

			for (i = 0, ilen = items.length; i < ilen; ++i) {
				item = items[i];
				width = item.width;
				color = item.color;

				if (width && color) {
					ctx.save();
					ctx.lineWidth = width;
					ctx.strokeStyle = color;
					if (ctx.setLineDash) {
						ctx.setLineDash(item.borderDash);
						ctx.lineDashOffset = item.borderDashOffset;
					}

					ctx.beginPath();

					if (gridLines.drawTicks) {
						ctx.moveTo(item.tx1, item.ty1);
						ctx.lineTo(item.tx2, item.ty2);
					}

					if (gridLines.drawOnChartArea) {
						ctx.moveTo(item.x1, item.y1);
						ctx.lineTo(item.x2, item.y2);
					}

					ctx.stroke();
					ctx.restore();
				}
			}

			if (axisWidth) {
				// Draw the line at the edge of the axis
				var firstLineWidth = axisWidth;
				var lastLineWidth = valueAtIndexOrDefault(gridLines.lineWidth, items.ticksLength - 1, 1);
				var borderValue = items.borderValue;
				var x1, x2, y1, y2;

				if (me.isHorizontal()) {
					x1 = alignPixel(chart, me.left, firstLineWidth) - firstLineWidth / 2;
					x2 = alignPixel(chart, me.right, lastLineWidth) + lastLineWidth / 2;
					y1 = y2 = borderValue;
				} else {
					y1 = alignPixel(chart, me.top, firstLineWidth) - firstLineWidth / 2;
					y2 = alignPixel(chart, me.bottom, lastLineWidth) + lastLineWidth / 2;
					x1 = x2 = borderValue;
				}

				ctx.lineWidth = axisWidth;
				ctx.strokeStyle = valueAtIndexOrDefault(gridLines.color, 0);
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.stroke();
			}
		},

		/**
		 * @private
		 */
		_drawLabels: function() {
			var me = this;
			var optionTicks = me.options.ticks;

			if (!optionTicks.display) {
				return;
			}

			var ctx = me.ctx;
			var items = me._labelItems || (me._labelItems = me._computeLabelItems());
			var i, j, ilen, jlen, item, tickFont, label, y;

			for (i = 0, ilen = items.length; i < ilen; ++i) {
				item = items[i];
				tickFont = item.font;

				// Make sure we draw text in the correct color and font
				ctx.save();
				ctx.translate(item.x, item.y);
				ctx.rotate(item.rotation);
				ctx.font = tickFont.string;
				ctx.fillStyle = tickFont.color;
				ctx.textBaseline = 'middle';
				ctx.textAlign = item.textAlign;

				label = item.label;
				y = item.textOffset;
				if (isArray(label)) {
					for (j = 0, jlen = label.length; j < jlen; ++j) {
						// We just make sure the multiline element is a string here..
						ctx.fillText('' + label[j], 0, y);
						y += tickFont.lineHeight;
					}
				} else {
					ctx.fillText(label, 0, y);
				}
				ctx.restore();
			}
		},

		/**
		 * @private
		 */
		_drawTitle: function() {
			var me = this;
			var ctx = me.ctx;
			var options = me.options;
			var scaleLabel = options.scaleLabel;

			if (!scaleLabel.display) {
				return;
			}

			var scaleLabelFontColor = valueOrDefault$a(scaleLabel.fontColor, core_defaults.global.defaultFontColor);
			var scaleLabelFont = helpers$1.options._parseFont(scaleLabel);
			var scaleLabelPadding = helpers$1.options.toPadding(scaleLabel.padding);
			var halfLineHeight = scaleLabelFont.lineHeight / 2;
			var position = options.position;
			var rotation = 0;
			var scaleLabelX, scaleLabelY;

			if (me.isHorizontal()) {
				scaleLabelX = me.left + me.width / 2; // midpoint of the width
				scaleLabelY = position === 'bottom'
					? me.bottom - halfLineHeight - scaleLabelPadding.bottom
					: me.top + halfLineHeight + scaleLabelPadding.top;
			} else {
				var isLeft = position === 'left';
				scaleLabelX = isLeft
					? me.left + halfLineHeight + scaleLabelPadding.top
					: me.right - halfLineHeight - scaleLabelPadding.top;
				scaleLabelY = me.top + me.height / 2;
				rotation = isLeft ? -0.5 * Math.PI : 0.5 * Math.PI;
			}

			ctx.save();
			ctx.translate(scaleLabelX, scaleLabelY);
			ctx.rotate(rotation);
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = scaleLabelFontColor; // render in correct colour
			ctx.font = scaleLabelFont.string;
			ctx.fillText(scaleLabel.labelString, 0, 0);
			ctx.restore();
		},

		draw: function(chartArea) {
			var me = this;

			if (!me._isVisible()) {
				return;
			}

			me._drawGrid(chartArea);
			me._drawTitle();
			me._drawLabels();
		},

		/**
		 * @private
		 */
		_layers: function() {
			var me = this;
			var opts = me.options;
			var tz = opts.ticks && opts.ticks.z || 0;
			var gz = opts.gridLines && opts.gridLines.z || 0;

			if (!me._isVisible() || tz === gz || me.draw !== me._draw) {
				// backward compatibility: draw has been overridden by custom scale
				return [{
					z: tz,
					draw: function() {
						me.draw.apply(me, arguments);
					}
				}];
			}

			return [{
				z: gz,
				draw: function() {
					me._drawGrid.apply(me, arguments);
					me._drawTitle.apply(me, arguments);
				}
			}, {
				z: tz,
				draw: function() {
					me._drawLabels.apply(me, arguments);
				}
			}];
		},

		/**
		 * @private
		 */
		_getMatchingVisibleMetas: function(type) {
			var me = this;
			var isHorizontal = me.isHorizontal();
			return me.chart._getSortedVisibleDatasetMetas()
				.filter(function(meta) {
					return (!type || meta.type === type)
						&& (isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id);
				});
		}
	});

	Scale.prototype._draw = Scale.prototype.draw;

	var core_scale = Scale;

	var isNullOrUndef$1 = helpers$1.isNullOrUndef;

	var defaultConfig = {
		position: 'bottom'
	};

	var scale_category = core_scale.extend({
		determineDataLimits: function() {
			var me = this;
			var labels = me._getLabels();
			var ticksOpts = me.options.ticks;
			var min = ticksOpts.min;
			var max = ticksOpts.max;
			var minIndex = 0;
			var maxIndex = labels.length - 1;
			var findIndex;

			if (min !== undefined) {
				// user specified min value
				findIndex = labels.indexOf(min);
				if (findIndex >= 0) {
					minIndex = findIndex;
				}
			}

			if (max !== undefined) {
				// user specified max value
				findIndex = labels.indexOf(max);
				if (findIndex >= 0) {
					maxIndex = findIndex;
				}
			}

			me.minIndex = minIndex;
			me.maxIndex = maxIndex;
			me.min = labels[minIndex];
			me.max = labels[maxIndex];
		},

		buildTicks: function() {
			var me = this;
			var labels = me._getLabels();
			var minIndex = me.minIndex;
			var maxIndex = me.maxIndex;

			// If we are viewing some subset of labels, slice the original array
			me.ticks = (minIndex === 0 && maxIndex === labels.length - 1) ? labels : labels.slice(minIndex, maxIndex + 1);
		},

		getLabelForIndex: function(index, datasetIndex) {
			var me = this;
			var chart = me.chart;

			if (chart.getDatasetMeta(datasetIndex).controller._getValueScaleId() === me.id) {
				return me.getRightValue(chart.data.datasets[datasetIndex].data[index]);
			}

			return me._getLabels()[index];
		},

		_configure: function() {
			var me = this;
			var offset = me.options.offset;
			var ticks = me.ticks;

			core_scale.prototype._configure.call(me);

			if (!me.isHorizontal()) {
				// For backward compatibility, vertical category scale reverse is inverted.
				me._reversePixels = !me._reversePixels;
			}

			if (!ticks) {
				return;
			}

			me._startValue = me.minIndex - (offset ? 0.5 : 0);
			me._valueRange = Math.max(ticks.length - (offset ? 0 : 1), 1);
		},

		// Used to get data value locations.  Value can either be an index or a numerical value
		getPixelForValue: function(value, index, datasetIndex) {
			var me = this;
			var valueCategory, labels, idx;

			if (!isNullOrUndef$1(index) && !isNullOrUndef$1(datasetIndex)) {
				value = me.chart.data.datasets[datasetIndex].data[index];
			}

			// If value is a data object, then index is the index in the data array,
			// not the index of the scale. We need to change that.
			if (!isNullOrUndef$1(value)) {
				valueCategory = me.isHorizontal() ? value.x : value.y;
			}
			if (valueCategory !== undefined || (value !== undefined && isNaN(index))) {
				labels = me._getLabels();
				value = helpers$1.valueOrDefault(valueCategory, value);
				idx = labels.indexOf(value);
				index = idx !== -1 ? idx : index;
				if (isNaN(index)) {
					index = value;
				}
			}
			return me.getPixelForDecimal((index - me._startValue) / me._valueRange);
		},

		getPixelForTick: function(index) {
			var ticks = this.ticks;
			return index < 0 || index > ticks.length - 1
				? null
				: this.getPixelForValue(ticks[index], index + this.minIndex);
		},

		getValueForPixel: function(pixel) {
			var me = this;
			var value = Math.round(me._startValue + me.getDecimalForPixel(pixel) * me._valueRange);
			return Math.min(Math.max(value, 0), me.ticks.length - 1);
		},

		getBasePixel: function() {
			return this.bottom;
		}
	});

	// INTERNAL: static default options, registered in src/index.js
	var _defaults = defaultConfig;
	scale_category._defaults = _defaults;

	var noop = helpers$1.noop;
	var isNullOrUndef$2 = helpers$1.isNullOrUndef;

	/**
	 * Generate a set of linear ticks
	 * @param generationOptions the options used to generate the ticks
	 * @param dataRange the range of the data
	 * @returns {number[]} array of tick values
	 */
	function generateTicks(generationOptions, dataRange) {
		var ticks = [];
		// To get a "nice" value for the tick spacing, we will use the appropriately named
		// "nice number" algorithm. See https://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks
		// for details.

		var MIN_SPACING = 1e-14;
		var stepSize = generationOptions.stepSize;
		var unit = stepSize || 1;
		var maxNumSpaces = generationOptions.maxTicks - 1;
		var min = generationOptions.min;
		var max = generationOptions.max;
		var precision = generationOptions.precision;
		var rmin = dataRange.min;
		var rmax = dataRange.max;
		var spacing = helpers$1.niceNum((rmax - rmin) / maxNumSpaces / unit) * unit;
		var factor, niceMin, niceMax, numSpaces;

		// Beyond MIN_SPACING floating point numbers being to lose precision
		// such that we can't do the math necessary to generate ticks
		if (spacing < MIN_SPACING && isNullOrUndef$2(min) && isNullOrUndef$2(max)) {
			return [rmin, rmax];
		}

		numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
		if (numSpaces > maxNumSpaces) {
			// If the calculated num of spaces exceeds maxNumSpaces, recalculate it
			spacing = helpers$1.niceNum(numSpaces * spacing / maxNumSpaces / unit) * unit;
		}

		if (stepSize || isNullOrUndef$2(precision)) {
			// If a precision is not specified, calculate factor based on spacing
			factor = Math.pow(10, helpers$1._decimalPlaces(spacing));
		} else {
			// If the user specified a precision, round to that number of decimal places
			factor = Math.pow(10, precision);
			spacing = Math.ceil(spacing * factor) / factor;
		}

		niceMin = Math.floor(rmin / spacing) * spacing;
		niceMax = Math.ceil(rmax / spacing) * spacing;

		// If min, max and stepSize is set and they make an evenly spaced scale use it.
		if (stepSize) {
			// If very close to our whole number, use it.
			if (!isNullOrUndef$2(min) && helpers$1.almostWhole(min / spacing, spacing / 1000)) {
				niceMin = min;
			}
			if (!isNullOrUndef$2(max) && helpers$1.almostWhole(max / spacing, spacing / 1000)) {
				niceMax = max;
			}
		}

		numSpaces = (niceMax - niceMin) / spacing;
		// If very close to our rounded value, use it.
		if (helpers$1.almostEquals(numSpaces, Math.round(numSpaces), spacing / 1000)) {
			numSpaces = Math.round(numSpaces);
		} else {
			numSpaces = Math.ceil(numSpaces);
		}

		niceMin = Math.round(niceMin * factor) / factor;
		niceMax = Math.round(niceMax * factor) / factor;
		ticks.push(isNullOrUndef$2(min) ? niceMin : min);
		for (var j = 1; j < numSpaces; ++j) {
			ticks.push(Math.round((niceMin + j * spacing) * factor) / factor);
		}
		ticks.push(isNullOrUndef$2(max) ? niceMax : max);

		return ticks;
	}

	var scale_linearbase = core_scale.extend({
		getRightValue: function(value) {
			if (typeof value === 'string') {
				return +value;
			}
			return core_scale.prototype.getRightValue.call(this, value);
		},

		handleTickRangeOptions: function() {
			var me = this;
			var opts = me.options;
			var tickOpts = opts.ticks;

			// If we are forcing it to begin at 0, but 0 will already be rendered on the chart,
			// do nothing since that would make the chart weird. If the user really wants a weird chart
			// axis, they can manually override it
			if (tickOpts.beginAtZero) {
				var minSign = helpers$1.sign(me.min);
				var maxSign = helpers$1.sign(me.max);

				if (minSign < 0 && maxSign < 0) {
					// move the top up to 0
					me.max = 0;
				} else if (minSign > 0 && maxSign > 0) {
					// move the bottom down to 0
					me.min = 0;
				}
			}

			var setMin = tickOpts.min !== undefined || tickOpts.suggestedMin !== undefined;
			var setMax = tickOpts.max !== undefined || tickOpts.suggestedMax !== undefined;

			if (tickOpts.min !== undefined) {
				me.min = tickOpts.min;
			} else if (tickOpts.suggestedMin !== undefined) {
				if (me.min === null) {
					me.min = tickOpts.suggestedMin;
				} else {
					me.min = Math.min(me.min, tickOpts.suggestedMin);
				}
			}

			if (tickOpts.max !== undefined) {
				me.max = tickOpts.max;
			} else if (tickOpts.suggestedMax !== undefined) {
				if (me.max === null) {
					me.max = tickOpts.suggestedMax;
				} else {
					me.max = Math.max(me.max, tickOpts.suggestedMax);
				}
			}

			if (setMin !== setMax) {
				// We set the min or the max but not both.
				// So ensure that our range is good
				// Inverted or 0 length range can happen when
				// ticks.min is set, and no datasets are visible
				if (me.min >= me.max) {
					if (setMin) {
						me.max = me.min + 1;
					} else {
						me.min = me.max - 1;
					}
				}
			}

			if (me.min === me.max) {
				me.max++;

				if (!tickOpts.beginAtZero) {
					me.min--;
				}
			}
		},

		getTickLimit: function() {
			var me = this;
			var tickOpts = me.options.ticks;
			var stepSize = tickOpts.stepSize;
			var maxTicksLimit = tickOpts.maxTicksLimit;
			var maxTicks;

			if (stepSize) {
				maxTicks = Math.ceil(me.max / stepSize) - Math.floor(me.min / stepSize) + 1;
			} else {
				maxTicks = me._computeTickLimit();
				maxTicksLimit = maxTicksLimit || 11;
			}

			if (maxTicksLimit) {
				maxTicks = Math.min(maxTicksLimit, maxTicks);
			}

			return maxTicks;
		},

		_computeTickLimit: function() {
			return Number.POSITIVE_INFINITY;
		},

		handleDirectionalChanges: noop,

		buildTicks: function() {
			var me = this;
			var opts = me.options;
			var tickOpts = opts.ticks;

			// Figure out what the max number of ticks we can support it is based on the size of
			// the axis area. For now, we say that the minimum tick spacing in pixels must be 40
			// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on
			// the graph. Make sure we always have at least 2 ticks
			var maxTicks = me.getTickLimit();
			maxTicks = Math.max(2, maxTicks);

			var numericGeneratorOptions = {
				maxTicks: maxTicks,
				min: tickOpts.min,
				max: tickOpts.max,
				precision: tickOpts.precision,
				stepSize: helpers$1.valueOrDefault(tickOpts.fixedStepSize, tickOpts.stepSize)
			};
			var ticks = me.ticks = generateTicks(numericGeneratorOptions, me);

			me.handleDirectionalChanges();

			// At this point, we need to update our max and min given the tick values since we have expanded the
			// range of the scale
			me.max = helpers$1.max(ticks);
			me.min = helpers$1.min(ticks);

			if (tickOpts.reverse) {
				ticks.reverse();

				me.start = me.max;
				me.end = me.min;
			} else {
				me.start = me.min;
				me.end = me.max;
			}
		},

		convertTicksToLabels: function() {
			var me = this;
			me.ticksAsNumbers = me.ticks.slice();
			me.zeroLineIndex = me.ticks.indexOf(0);

			core_scale.prototype.convertTicksToLabels.call(me);
		},

		_configure: function() {
			var me = this;
			var ticks = me.getTicks();
			var start = me.min;
			var end = me.max;
			var offset;

			core_scale.prototype._configure.call(me);

			if (me.options.offset && ticks.length) {
				offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
				start -= offset;
				end += offset;
			}
			me._startValue = start;
			me._endValue = end;
			me._valueRange = end - start;
		}
	});

	var defaultConfig$1 = {
		position: 'left',
		ticks: {
			callback: core_ticks.formatters.linear
		}
	};

	var DEFAULT_MIN = 0;
	var DEFAULT_MAX = 1;

	function getOrCreateStack(stacks, stacked, meta) {
		var key = [
			meta.type,
			// we have a separate stack for stack=undefined datasets when the opts.stacked is undefined
			stacked === undefined && meta.stack === undefined ? meta.index : '',
			meta.stack
		].join('.');

		if (stacks[key] === undefined) {
			stacks[key] = {
				pos: [],
				neg: []
			};
		}

		return stacks[key];
	}

	function stackData(scale, stacks, meta, data) {
		var opts = scale.options;
		var stacked = opts.stacked;
		var stack = getOrCreateStack(stacks, stacked, meta);
		var pos = stack.pos;
		var neg = stack.neg;
		var ilen = data.length;
		var i, value;

		for (i = 0; i < ilen; ++i) {
			value = scale._parseValue(data[i]);
			if (isNaN(value.min) || isNaN(value.max) || meta.data[i].hidden) {
				continue;
			}

			pos[i] = pos[i] || 0;
			neg[i] = neg[i] || 0;

			if (opts.relativePoints) {
				pos[i] = 100;
			} else if (value.min < 0 || value.max < 0) {
				neg[i] += value.min;
			} else {
				pos[i] += value.max;
			}
		}
	}

	function updateMinMax(scale, meta, data) {
		var ilen = data.length;
		var i, value;

		for (i = 0; i < ilen; ++i) {
			value = scale._parseValue(data[i]);
			if (isNaN(value.min) || isNaN(value.max) || meta.data[i].hidden) {
				continue;
			}

			scale.min = Math.min(scale.min, value.min);
			scale.max = Math.max(scale.max, value.max);
		}
	}

	var scale_linear = scale_linearbase.extend({
		determineDataLimits: function() {
			var me = this;
			var opts = me.options;
			var chart = me.chart;
			var datasets = chart.data.datasets;
			var metasets = me._getMatchingVisibleMetas();
			var hasStacks = opts.stacked;
			var stacks = {};
			var ilen = metasets.length;
			var i, meta, data, values;

			me.min = Number.POSITIVE_INFINITY;
			me.max = Number.NEGATIVE_INFINITY;

			if (hasStacks === undefined) {
				for (i = 0; !hasStacks && i < ilen; ++i) {
					meta = metasets[i];
					hasStacks = meta.stack !== undefined;
				}
			}

			for (i = 0; i < ilen; ++i) {
				meta = metasets[i];
				data = datasets[meta.index].data;
				if (hasStacks) {
					stackData(me, stacks, meta, data);
				} else {
					updateMinMax(me, meta, data);
				}
			}

			helpers$1.each(stacks, function(stackValues) {
				values = stackValues.pos.concat(stackValues.neg);
				me.min = Math.min(me.min, helpers$1.min(values));
				me.max = Math.max(me.max, helpers$1.max(values));
			});

			me.min = helpers$1.isFinite(me.min) && !isNaN(me.min) ? me.min : DEFAULT_MIN;
			me.max = helpers$1.isFinite(me.max) && !isNaN(me.max) ? me.max : DEFAULT_MAX;

			// Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero
			me.handleTickRangeOptions();
		},

		// Returns the maximum number of ticks based on the scale dimension
		_computeTickLimit: function() {
			var me = this;
			var tickFont;

			if (me.isHorizontal()) {
				return Math.ceil(me.width / 40);
			}
			tickFont = helpers$1.options._parseFont(me.options.ticks);
			return Math.ceil(me.height / tickFont.lineHeight);
		},

		// Called after the ticks are built. We need
		handleDirectionalChanges: function() {
			if (!this.isHorizontal()) {
				// We are in a vertical orientation. The top value is the highest. So reverse the array
				this.ticks.reverse();
			}
		},

		getLabelForIndex: function(index, datasetIndex) {
			return this._getScaleLabel(this.chart.data.datasets[datasetIndex].data[index]);
		},

		// Utils
		getPixelForValue: function(value) {
			var me = this;
			return me.getPixelForDecimal((+me.getRightValue(value) - me._startValue) / me._valueRange);
		},

		getValueForPixel: function(pixel) {
			return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
		},

		getPixelForTick: function(index) {
			var ticks = this.ticksAsNumbers;
			if (index < 0 || index > ticks.length - 1) {
				return null;
			}
			return this.getPixelForValue(ticks[index]);
		}
	});

	// INTERNAL: static default options, registered in src/index.js
	var _defaults$1 = defaultConfig$1;
	scale_linear._defaults = _defaults$1;

	var valueOrDefault$b = helpers$1.valueOrDefault;
	var log10 = helpers$1.math.log10;

	/**
	 * Generate a set of logarithmic ticks
	 * @param generationOptions the options used to generate the ticks
	 * @param dataRange the range of the data
	 * @returns {number[]} array of tick values
	 */
	function generateTicks$1(generationOptions, dataRange) {
		var ticks = [];

		var tickVal = valueOrDefault$b(generationOptions.min, Math.pow(10, Math.floor(log10(dataRange.min))));

		var endExp = Math.floor(log10(dataRange.max));
		var endSignificand = Math.ceil(dataRange.max / Math.pow(10, endExp));
		var exp, significand;

		if (tickVal === 0) {
			exp = Math.floor(log10(dataRange.minNotZero));
			significand = Math.floor(dataRange.minNotZero / Math.pow(10, exp));

			ticks.push(tickVal);
			tickVal = significand * Math.pow(10, exp);
		} else {
			exp = Math.floor(log10(tickVal));
			significand = Math.floor(tickVal / Math.pow(10, exp));
		}
		var precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;

		do {
			ticks.push(tickVal);

			++significand;
			if (significand === 10) {
				significand = 1;
				++exp;
				precision = exp >= 0 ? 1 : precision;
			}

			tickVal = Math.round(significand * Math.pow(10, exp) * precision) / precision;
		} while (exp < endExp || (exp === endExp && significand < endSignificand));

		var lastTick = valueOrDefault$b(generationOptions.max, tickVal);
		ticks.push(lastTick);

		return ticks;
	}

	var defaultConfig$2 = {
		position: 'left',

		// label settings
		ticks: {
			callback: core_ticks.formatters.logarithmic
		}
	};

	// TODO(v3): change this to positiveOrDefault
	function nonNegativeOrDefault(value, defaultValue) {
		return helpers$1.isFinite(value) && value >= 0 ? value : defaultValue;
	}

	var scale_logarithmic = core_scale.extend({
		determineDataLimits: function() {
			var me = this;
			var opts = me.options;
			var chart = me.chart;
			var datasets = chart.data.datasets;
			var isHorizontal = me.isHorizontal();
			function IDMatches(meta) {
				return isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id;
			}
			var datasetIndex, meta, value, data, i, ilen;

			// Calculate Range
			me.min = Number.POSITIVE_INFINITY;
			me.max = Number.NEGATIVE_INFINITY;
			me.minNotZero = Number.POSITIVE_INFINITY;

			var hasStacks = opts.stacked;
			if (hasStacks === undefined) {
				for (datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
					meta = chart.getDatasetMeta(datasetIndex);
					if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta) &&
						meta.stack !== undefined) {
						hasStacks = true;
						break;
					}
				}
			}

			if (opts.stacked || hasStacks) {
				var valuesPerStack = {};

				for (datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
					meta = chart.getDatasetMeta(datasetIndex);
					var key = [
						meta.type,
						// we have a separate stack for stack=undefined datasets when the opts.stacked is undefined
						((opts.stacked === undefined && meta.stack === undefined) ? datasetIndex : ''),
						meta.stack
					].join('.');

					if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
						if (valuesPerStack[key] === undefined) {
							valuesPerStack[key] = [];
						}

						data = datasets[datasetIndex].data;
						for (i = 0, ilen = data.length; i < ilen; i++) {
							var values = valuesPerStack[key];
							value = me._parseValue(data[i]);
							// invalid, hidden and negative values are ignored
							if (isNaN(value.min) || isNaN(value.max) || meta.data[i].hidden || value.min < 0 || value.max < 0) {
								continue;
							}
							values[i] = values[i] || 0;
							values[i] += value.max;
						}
					}
				}

				helpers$1.each(valuesPerStack, function(valuesForType) {
					if (valuesForType.length > 0) {
						var minVal = helpers$1.min(valuesForType);
						var maxVal = helpers$1.max(valuesForType);
						me.min = Math.min(me.min, minVal);
						me.max = Math.max(me.max, maxVal);
					}
				});

			} else {
				for (datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
					meta = chart.getDatasetMeta(datasetIndex);
					if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
						data = datasets[datasetIndex].data;
						for (i = 0, ilen = data.length; i < ilen; i++) {
							value = me._parseValue(data[i]);
							// invalid, hidden and negative values are ignored
							if (isNaN(value.min) || isNaN(value.max) || meta.data[i].hidden || value.min < 0 || value.max < 0) {
								continue;
							}

							me.min = Math.min(value.min, me.min);
							me.max = Math.max(value.max, me.max);

							if (value.min !== 0) {
								me.minNotZero = Math.min(value.min, me.minNotZero);
							}
						}
					}
				}
			}

			me.min = helpers$1.isFinite(me.min) ? me.min : null;
			me.max = helpers$1.isFinite(me.max) ? me.max : null;
			me.minNotZero = helpers$1.isFinite(me.minNotZero) ? me.minNotZero : null;

			// Common base implementation to handle ticks.min, ticks.max
			this.handleTickRangeOptions();
		},

		handleTickRangeOptions: function() {
			var me = this;
			var tickOpts = me.options.ticks;
			var DEFAULT_MIN = 1;
			var DEFAULT_MAX = 10;

			me.min = nonNegativeOrDefault(tickOpts.min, me.min);
			me.max = nonNegativeOrDefault(tickOpts.max, me.max);

			if (me.min === me.max) {
				if (me.min !== 0 && me.min !== null) {
					me.min = Math.pow(10, Math.floor(log10(me.min)) - 1);
					me.max = Math.pow(10, Math.floor(log10(me.max)) + 1);
				} else {
					me.min = DEFAULT_MIN;
					me.max = DEFAULT_MAX;
				}
			}
			if (me.min === null) {
				me.min = Math.pow(10, Math.floor(log10(me.max)) - 1);
			}
			if (me.max === null) {
				me.max = me.min !== 0
					? Math.pow(10, Math.floor(log10(me.min)) + 1)
					: DEFAULT_MAX;
			}
			if (me.minNotZero === null) {
				if (me.min > 0) {
					me.minNotZero = me.min;
				} else if (me.max < 1) {
					me.minNotZero = Math.pow(10, Math.floor(log10(me.max)));
				} else {
					me.minNotZero = DEFAULT_MIN;
				}
			}
		},

		buildTicks: function() {
			var me = this;
			var tickOpts = me.options.ticks;
			var reverse = !me.isHorizontal();

			var generationOptions = {
				min: nonNegativeOrDefault(tickOpts.min),
				max: nonNegativeOrDefault(tickOpts.max)
			};
			var ticks = me.ticks = generateTicks$1(generationOptions, me);

			// At this point, we need to update our max and min given the tick values since we have expanded the
			// range of the scale
			me.max = helpers$1.max(ticks);
			me.min = helpers$1.min(ticks);

			if (tickOpts.reverse) {
				reverse = !reverse;
				me.start = me.max;
				me.end = me.min;
			} else {
				me.start = me.min;
				me.end = me.max;
			}
			if (reverse) {
				ticks.reverse();
			}
		},

		convertTicksToLabels: function() {
			this.tickValues = this.ticks.slice();

			core_scale.prototype.convertTicksToLabels.call(this);
		},

		// Get the correct tooltip label
		getLabelForIndex: function(index, datasetIndex) {
			return this._getScaleLabel(this.chart.data.datasets[datasetIndex].data[index]);
		},

		getPixelForTick: function(index) {
			var ticks = this.tickValues;
			if (index < 0 || index > ticks.length - 1) {
				return null;
			}
			return this.getPixelForValue(ticks[index]);
		},

		/**
		 * Returns the value of the first tick.
		 * @param {number} value - The minimum not zero value.
		 * @return {number} The first tick value.
		 * @private
		 */
		_getFirstTickValue: function(value) {
			var exp = Math.floor(log10(value));
			var significand = Math.floor(value / Math.pow(10, exp));

			return significand * Math.pow(10, exp);
		},

		_configure: function() {
			var me = this;
			var start = me.min;
			var offset = 0;

			core_scale.prototype._configure.call(me);

			if (start === 0) {
				start = me._getFirstTickValue(me.minNotZero);
				offset = valueOrDefault$b(me.options.ticks.fontSize, core_defaults.global.defaultFontSize) / me._length;
			}

			me._startValue = log10(start);
			me._valueOffset = offset;
			me._valueRange = (log10(me.max) - log10(start)) / (1 - offset);
		},

		getPixelForValue: function(value) {
			var me = this;
			var decimal = 0;

			value = +me.getRightValue(value);

			if (value > me.min && value > 0) {
				decimal = (log10(value) - me._startValue) / me._valueRange + me._valueOffset;
			}
			return me.getPixelForDecimal(decimal);
		},

		getValueForPixel: function(pixel) {
			var me = this;
			var decimal = me.getDecimalForPixel(pixel);
			return decimal === 0 && me.min === 0
				? 0
				: Math.pow(10, me._startValue + (decimal - me._valueOffset) * me._valueRange);
		}
	});

	// INTERNAL: static default options, registered in src/index.js
	var _defaults$2 = defaultConfig$2;
	scale_logarithmic._defaults = _defaults$2;

	var valueOrDefault$c = helpers$1.valueOrDefault;
	var valueAtIndexOrDefault$1 = helpers$1.valueAtIndexOrDefault;
	var resolve$4 = helpers$1.options.resolve;

	var defaultConfig$3 = {
		display: true,

		// Boolean - Whether to animate scaling the chart from the centre
		animate: true,
		position: 'chartArea',

		angleLines: {
			display: true,
			color: 'rgba(0,0,0,0.1)',
			lineWidth: 1,
			borderDash: [],
			borderDashOffset: 0.0
		},

		gridLines: {
			circular: false
		},

		// label settings
		ticks: {
			// Boolean - Show a backdrop to the scale label
			showLabelBackdrop: true,

			// String - The colour of the label backdrop
			backdropColor: 'rgba(255,255,255,0.75)',

			// Number - The backdrop padding above & below the label in pixels
			backdropPaddingY: 2,

			// Number - The backdrop padding to the side of the label in pixels
			backdropPaddingX: 2,

			callback: core_ticks.formatters.linear
		},

		pointLabels: {
			// Boolean - if true, show point labels
			display: true,

			// Number - Point label font size in pixels
			fontSize: 10,

			// Function - Used to convert point labels
			callback: function(label) {
				return label;
			}
		}
	};

	function getTickBackdropHeight(opts) {
		var tickOpts = opts.ticks;

		if (tickOpts.display && opts.display) {
			return valueOrDefault$c(tickOpts.fontSize, core_defaults.global.defaultFontSize) + tickOpts.backdropPaddingY * 2;
		}
		return 0;
	}

	function measureLabelSize(ctx, lineHeight, label) {
		if (helpers$1.isArray(label)) {
			return {
				w: helpers$1.longestText(ctx, ctx.font, label),
				h: label.length * lineHeight
			};
		}

		return {
			w: ctx.measureText(label).width,
			h: lineHeight
		};
	}

	function determineLimits(angle, pos, size, min, max) {
		if (angle === min || angle === max) {
			return {
				start: pos - (size / 2),
				end: pos + (size / 2)
			};
		} else if (angle < min || angle > max) {
			return {
				start: pos - size,
				end: pos
			};
		}

		return {
			start: pos,
			end: pos + size
		};
	}

	/**
	 * Helper function to fit a radial linear scale with point labels
	 */
	function fitWithPointLabels(scale) {

		// Right, this is really confusing and there is a lot of maths going on here
		// The gist of the problem is here: https://gist.github.com/nnnick/696cc9c55f4b0beb8fe9
		//
		// Reaction: https://dl.dropboxusercontent.com/u/34601363/toomuchscience.gif
		//
		// Solution:
		//
		// We assume the radius of the polygon is half the size of the canvas at first
		// at each index we check if the text overlaps.
		//
		// Where it does, we store that angle and that index.
		//
		// After finding the largest index and angle we calculate how much we need to remove
		// from the shape radius to move the point inwards by that x.
		//
		// We average the left and right distances to get the maximum shape radius that can fit in the box
		// along with labels.
		//
		// Once we have that, we can find the centre point for the chart, by taking the x text protrusion
		// on each side, removing that from the size, halving it and adding the left x protrusion width.
		//
		// This will mean we have a shape fitted to the canvas, as large as it can be with the labels
		// and position it in the most space efficient manner
		//
		// https://dl.dropboxusercontent.com/u/34601363/yeahscience.gif

		var plFont = helpers$1.options._parseFont(scale.options.pointLabels);

		// Get maximum radius of the polygon. Either half the height (minus the text width) or half the width.
		// Use this to calculate the offset + change. - Make sure L/R protrusion is at least 0 to stop issues with centre points
		var furthestLimits = {
			l: 0,
			r: scale.width,
			t: 0,
			b: scale.height - scale.paddingTop
		};
		var furthestAngles = {};
		var i, textSize, pointPosition;

		scale.ctx.font = plFont.string;
		scale._pointLabelSizes = [];

		var valueCount = scale.chart.data.labels.length;
		for (i = 0; i < valueCount; i++) {
			pointPosition = scale.getPointPosition(i, scale.drawingArea + 5);
			textSize = measureLabelSize(scale.ctx, plFont.lineHeight, scale.pointLabels[i]);
			scale._pointLabelSizes[i] = textSize;

			// Add quarter circle to make degree 0 mean top of circle
			var angleRadians = scale.getIndexAngle(i);
			var angle = helpers$1.toDegrees(angleRadians) % 360;
			var hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
			var vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);

			if (hLimits.start < furthestLimits.l) {
				furthestLimits.l = hLimits.start;
				furthestAngles.l = angleRadians;
			}

			if (hLimits.end > furthestLimits.r) {
				furthestLimits.r = hLimits.end;
				furthestAngles.r = angleRadians;
			}

			if (vLimits.start < furthestLimits.t) {
				furthestLimits.t = vLimits.start;
				furthestAngles.t = angleRadians;
			}

			if (vLimits.end > furthestLimits.b) {
				furthestLimits.b = vLimits.end;
				furthestAngles.b = angleRadians;
			}
		}

		scale.setReductions(scale.drawingArea, furthestLimits, furthestAngles);
	}

	function getTextAlignForAngle(angle) {
		if (angle === 0 || angle === 180) {
			return 'center';
		} else if (angle < 180) {
			return 'left';
		}

		return 'right';
	}

	function fillText(ctx, text, position, lineHeight) {
		var y = position.y + lineHeight / 2;
		var i, ilen;

		if (helpers$1.isArray(text)) {
			for (i = 0, ilen = text.length; i < ilen; ++i) {
				ctx.fillText(text[i], position.x, y);
				y += lineHeight;
			}
		} else {
			ctx.fillText(text, position.x, y);
		}
	}

	function adjustPointPositionForLabelHeight(angle, textSize, position) {
		if (angle === 90 || angle === 270) {
			position.y -= (textSize.h / 2);
		} else if (angle > 270 || angle < 90) {
			position.y -= textSize.h;
		}
	}

	function drawPointLabels(scale) {
		var ctx = scale.ctx;
		var opts = scale.options;
		var pointLabelOpts = opts.pointLabels;
		var tickBackdropHeight = getTickBackdropHeight(opts);
		var outerDistance = scale.getDistanceFromCenterForValue(opts.ticks.reverse ? scale.min : scale.max);
		var plFont = helpers$1.options._parseFont(pointLabelOpts);

		ctx.save();

		ctx.font = plFont.string;
		ctx.textBaseline = 'middle';

		for (var i = scale.chart.data.labels.length - 1; i >= 0; i--) {
			// Extra pixels out for some label spacing
			var extra = (i === 0 ? tickBackdropHeight / 2 : 0);
			var pointLabelPosition = scale.getPointPosition(i, outerDistance + extra + 5);

			// Keep this in loop since we may support array properties here
			var pointLabelFontColor = valueAtIndexOrDefault$1(pointLabelOpts.fontColor, i, core_defaults.global.defaultFontColor);
			ctx.fillStyle = pointLabelFontColor;

			var angleRadians = scale.getIndexAngle(i);
			var angle = helpers$1.toDegrees(angleRadians);
			ctx.textAlign = getTextAlignForAngle(angle);
			adjustPointPositionForLabelHeight(angle, scale._pointLabelSizes[i], pointLabelPosition);
			fillText(ctx, scale.pointLabels[i], pointLabelPosition, plFont.lineHeight);
		}
		ctx.restore();
	}

	function drawRadiusLine(scale, gridLineOpts, radius, index) {
		var ctx = scale.ctx;
		var circular = gridLineOpts.circular;
		var valueCount = scale.chart.data.labels.length;
		var lineColor = valueAtIndexOrDefault$1(gridLineOpts.color, index - 1);
		var lineWidth = valueAtIndexOrDefault$1(gridLineOpts.lineWidth, index - 1);
		var pointPosition;

		if ((!circular && !valueCount) || !lineColor || !lineWidth) {
			return;
		}

		ctx.save();
		ctx.strokeStyle = lineColor;
		ctx.lineWidth = lineWidth;
		if (ctx.setLineDash) {
			ctx.setLineDash(gridLineOpts.borderDash || []);
			ctx.lineDashOffset = gridLineOpts.borderDashOffset || 0.0;
		}

		ctx.beginPath();
		if (circular) {
			// Draw circular arcs between the points
			ctx.arc(scale.xCenter, scale.yCenter, radius, 0, Math.PI * 2);
		} else {
			// Draw straight lines connecting each index
			pointPosition = scale.getPointPosition(0, radius);
			ctx.moveTo(pointPosition.x, pointPosition.y);

			for (var i = 1; i < valueCount; i++) {
				pointPosition = scale.getPointPosition(i, radius);
				ctx.lineTo(pointPosition.x, pointPosition.y);
			}
		}
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}

	function numberOrZero(param) {
		return helpers$1.isNumber(param) ? param : 0;
	}

	var scale_radialLinear = scale_linearbase.extend({
		setDimensions: function() {
			var me = this;

			// Set the unconstrained dimension before label rotation
			me.width = me.maxWidth;
			me.height = me.maxHeight;
			me.paddingTop = getTickBackdropHeight(me.options) / 2;
			me.xCenter = Math.floor(me.width / 2);
			me.yCenter = Math.floor((me.height - me.paddingTop) / 2);
			me.drawingArea = Math.min(me.height - me.paddingTop, me.width) / 2;
		},

		determineDataLimits: function() {
			var me = this;
			var chart = me.chart;
			var min = Number.POSITIVE_INFINITY;
			var max = Number.NEGATIVE_INFINITY;

			helpers$1.each(chart.data.datasets, function(dataset, datasetIndex) {
				if (chart.isDatasetVisible(datasetIndex)) {
					var meta = chart.getDatasetMeta(datasetIndex);

					helpers$1.each(dataset.data, function(rawValue, index) {
						var value = +me.getRightValue(rawValue);
						if (isNaN(value) || meta.data[index].hidden) {
							return;
						}

						min = Math.min(value, min);
						max = Math.max(value, max);
					});
				}
			});

			me.min = (min === Number.POSITIVE_INFINITY ? 0 : min);
			me.max = (max === Number.NEGATIVE_INFINITY ? 0 : max);

			// Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero
			me.handleTickRangeOptions();
		},

		// Returns the maximum number of ticks based on the scale dimension
		_computeTickLimit: function() {
			return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
		},

		convertTicksToLabels: function() {
			var me = this;

			scale_linearbase.prototype.convertTicksToLabels.call(me);

			// Point labels
			me.pointLabels = me.chart.data.labels.map(function() {
				var label = helpers$1.callback(me.options.pointLabels.callback, arguments, me);
				return label || label === 0 ? label : '';
			});
		},

		getLabelForIndex: function(index, datasetIndex) {
			return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
		},

		fit: function() {
			var me = this;
			var opts = me.options;

			if (opts.display && opts.pointLabels.display) {
				fitWithPointLabels(me);
			} else {
				me.setCenterPoint(0, 0, 0, 0);
			}
		},

		/**
		 * Set radius reductions and determine new radius and center point
		 * @private
		 */
		setReductions: function(largestPossibleRadius, furthestLimits, furthestAngles) {
			var me = this;
			var radiusReductionLeft = furthestLimits.l / Math.sin(furthestAngles.l);
			var radiusReductionRight = Math.max(furthestLimits.r - me.width, 0) / Math.sin(furthestAngles.r);
			var radiusReductionTop = -furthestLimits.t / Math.cos(furthestAngles.t);
			var radiusReductionBottom = -Math.max(furthestLimits.b - (me.height - me.paddingTop), 0) / Math.cos(furthestAngles.b);

			radiusReductionLeft = numberOrZero(radiusReductionLeft);
			radiusReductionRight = numberOrZero(radiusReductionRight);
			radiusReductionTop = numberOrZero(radiusReductionTop);
			radiusReductionBottom = numberOrZero(radiusReductionBottom);

			me.drawingArea = Math.min(
				Math.floor(largestPossibleRadius - (radiusReductionLeft + radiusReductionRight) / 2),
				Math.floor(largestPossibleRadius - (radiusReductionTop + radiusReductionBottom) / 2));
			me.setCenterPoint(radiusReductionLeft, radiusReductionRight, radiusReductionTop, radiusReductionBottom);
		},

		setCenterPoint: function(leftMovement, rightMovement, topMovement, bottomMovement) {
			var me = this;
			var maxRight = me.width - rightMovement - me.drawingArea;
			var maxLeft = leftMovement + me.drawingArea;
			var maxTop = topMovement + me.drawingArea;
			var maxBottom = (me.height - me.paddingTop) - bottomMovement - me.drawingArea;

			me.xCenter = Math.floor(((maxLeft + maxRight) / 2) + me.left);
			me.yCenter = Math.floor(((maxTop + maxBottom) / 2) + me.top + me.paddingTop);
		},

		getIndexAngle: function(index) {
			var chart = this.chart;
			var angleMultiplier = 360 / chart.data.labels.length;
			var options = chart.options || {};
			var startAngle = options.startAngle || 0;

			// Start from the top instead of right, so remove a quarter of the circle
			var angle = (index * angleMultiplier + startAngle) % 360;

			return (angle < 0 ? angle + 360 : angle) * Math.PI * 2 / 360;
		},

		getDistanceFromCenterForValue: function(value) {
			var me = this;

			if (helpers$1.isNullOrUndef(value)) {
				return NaN;
			}

			// Take into account half font size + the yPadding of the top value
			var scalingFactor = me.drawingArea / (me.max - me.min);
			if (me.options.ticks.reverse) {
				return (me.max - value) * scalingFactor;
			}
			return (value - me.min) * scalingFactor;
		},

		getPointPosition: function(index, distanceFromCenter) {
			var me = this;
			var thisAngle = me.getIndexAngle(index) - (Math.PI / 2);
			return {
				x: Math.cos(thisAngle) * distanceFromCenter + me.xCenter,
				y: Math.sin(thisAngle) * distanceFromCenter + me.yCenter
			};
		},

		getPointPositionForValue: function(index, value) {
			return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
		},

		getBasePosition: function(index) {
			var me = this;
			var min = me.min;
			var max = me.max;

			return me.getPointPositionForValue(index || 0,
				me.beginAtZero ? 0 :
				min < 0 && max < 0 ? max :
				min > 0 && max > 0 ? min :
				0);
		},

		/**
		 * @private
		 */
		_drawGrid: function() {
			var me = this;
			var ctx = me.ctx;
			var opts = me.options;
			var gridLineOpts = opts.gridLines;
			var angleLineOpts = opts.angleLines;
			var lineWidth = valueOrDefault$c(angleLineOpts.lineWidth, gridLineOpts.lineWidth);
			var lineColor = valueOrDefault$c(angleLineOpts.color, gridLineOpts.color);
			var i, offset, position;

			if (opts.pointLabels.display) {
				drawPointLabels(me);
			}

			if (gridLineOpts.display) {
				helpers$1.each(me.ticks, function(label, index) {
					if (index !== 0) {
						offset = me.getDistanceFromCenterForValue(me.ticksAsNumbers[index]);
						drawRadiusLine(me, gridLineOpts, offset, index);
					}
				});
			}

			if (angleLineOpts.display && lineWidth && lineColor) {
				ctx.save();
				ctx.lineWidth = lineWidth;
				ctx.strokeStyle = lineColor;
				if (ctx.setLineDash) {
					ctx.setLineDash(resolve$4([angleLineOpts.borderDash, gridLineOpts.borderDash, []]));
					ctx.lineDashOffset = resolve$4([angleLineOpts.borderDashOffset, gridLineOpts.borderDashOffset, 0.0]);
				}

				for (i = me.chart.data.labels.length - 1; i >= 0; i--) {
					offset = me.getDistanceFromCenterForValue(opts.ticks.reverse ? me.min : me.max);
					position = me.getPointPosition(i, offset);
					ctx.beginPath();
					ctx.moveTo(me.xCenter, me.yCenter);
					ctx.lineTo(position.x, position.y);
					ctx.stroke();
				}

				ctx.restore();
			}
		},

		/**
		 * @private
		 */
		_drawLabels: function() {
			var me = this;
			var ctx = me.ctx;
			var opts = me.options;
			var tickOpts = opts.ticks;

			if (!tickOpts.display) {
				return;
			}

			var startAngle = me.getIndexAngle(0);
			var tickFont = helpers$1.options._parseFont(tickOpts);
			var tickFontColor = valueOrDefault$c(tickOpts.fontColor, core_defaults.global.defaultFontColor);
			var offset, width;

			ctx.save();
			ctx.font = tickFont.string;
			ctx.translate(me.xCenter, me.yCenter);
			ctx.rotate(startAngle);
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

			helpers$1.each(me.ticks, function(label, index) {
				if (index === 0 && !tickOpts.reverse) {
					return;
				}

				offset = me.getDistanceFromCenterForValue(me.ticksAsNumbers[index]);

				if (tickOpts.showLabelBackdrop) {
					width = ctx.measureText(label).width;
					ctx.fillStyle = tickOpts.backdropColor;

					ctx.fillRect(
						-width / 2 - tickOpts.backdropPaddingX,
						-offset - tickFont.size / 2 - tickOpts.backdropPaddingY,
						width + tickOpts.backdropPaddingX * 2,
						tickFont.size + tickOpts.backdropPaddingY * 2
					);
				}

				ctx.fillStyle = tickFontColor;
				ctx.fillText(label, 0, -offset);
			});

			ctx.restore();
		},

		/**
		 * @private
		 */
		_drawTitle: helpers$1.noop
	});

	// INTERNAL: static default options, registered in src/index.js
	var _defaults$3 = defaultConfig$3;
	scale_radialLinear._defaults = _defaults$3;

	var deprecated$1 = helpers$1._deprecated;
	var resolve$5 = helpers$1.options.resolve;
	var valueOrDefault$d = helpers$1.valueOrDefault;

	// Integer constants are from the ES6 spec.
	var MIN_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;
	var MAX_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

	var INTERVALS = {
		millisecond: {
			common: true,
			size: 1,
			steps: 1000
		},
		second: {
			common: true,
			size: 1000,
			steps: 60
		},
		minute: {
			common: true,
			size: 60000,
			steps: 60
		},
		hour: {
			common: true,
			size: 3600000,
			steps: 24
		},
		day: {
			common: true,
			size: 86400000,
			steps: 30
		},
		week: {
			common: false,
			size: 604800000,
			steps: 4
		},
		month: {
			common: true,
			size: 2.628e9,
			steps: 12
		},
		quarter: {
			common: false,
			size: 7.884e9,
			steps: 4
		},
		year: {
			common: true,
			size: 3.154e10
		}
	};

	var UNITS = Object.keys(INTERVALS);

	function sorter(a, b) {
		return a - b;
	}

	function arrayUnique(items) {
		var hash = {};
		var out = [];
		var i, ilen, item;

		for (i = 0, ilen = items.length; i < ilen; ++i) {
			item = items[i];
			if (!hash[item]) {
				hash[item] = true;
				out.push(item);
			}
		}

		return out;
	}

	function getMin(options) {
		return helpers$1.valueOrDefault(options.time.min, options.ticks.min);
	}

	function getMax(options) {
		return helpers$1.valueOrDefault(options.time.max, options.ticks.max);
	}

	/**
	 * Returns an array of {time, pos} objects used to interpolate a specific `time` or position
	 * (`pos`) on the scale, by searching entries before and after the requested value. `pos` is
	 * a decimal between 0 and 1: 0 being the start of the scale (left or top) and 1 the other
	 * extremity (left + width or top + height). Note that it would be more optimized to directly
	 * store pre-computed pixels, but the scale dimensions are not guaranteed at the time we need
	 * to create the lookup table. The table ALWAYS contains at least two items: min and max.
	 *
	 * @param {number[]} timestamps - timestamps sorted from lowest to highest.
	 * @param {string} distribution - If 'linear', timestamps will be spread linearly along the min
	 * and max range, so basically, the table will contains only two items: {min, 0} and {max, 1}.
	 * If 'series', timestamps will be positioned at the same distance from each other. In this
	 * case, only timestamps that break the time linearity are registered, meaning that in the
	 * best case, all timestamps are linear, the table contains only min and max.
	 */
	function buildLookupTable(timestamps, min, max, distribution) {
		if (distribution === 'linear' || !timestamps.length) {
			return [
				{time: min, pos: 0},
				{time: max, pos: 1}
			];
		}

		var table = [];
		var items = [min];
		var i, ilen, prev, curr, next;

		for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
			curr = timestamps[i];
			if (curr > min && curr < max) {
				items.push(curr);
			}
		}

		items.push(max);

		for (i = 0, ilen = items.length; i < ilen; ++i) {
			next = items[i + 1];
			prev = items[i - 1];
			curr = items[i];

			// only add points that breaks the scale linearity
			if (prev === undefined || next === undefined || Math.round((next + prev) / 2) !== curr) {
				table.push({time: curr, pos: i / (ilen - 1)});
			}
		}

		return table;
	}

	// @see adapted from https://www.anujgakhar.com/2014/03/01/binary-search-in-javascript/
	function lookup(table, key, value) {
		var lo = 0;
		var hi = table.length - 1;
		var mid, i0, i1;

		while (lo >= 0 && lo <= hi) {
			mid = (lo + hi) >> 1;
			i0 = table[mid - 1] || null;
			i1 = table[mid];

			if (!i0) {
				// given value is outside table (before first item)
				return {lo: null, hi: i1};
			} else if (i1[key] < value) {
				lo = mid + 1;
			} else if (i0[key] > value) {
				hi = mid - 1;
			} else {
				return {lo: i0, hi: i1};
			}
		}

		// given value is outside table (after last item)
		return {lo: i1, hi: null};
	}

	/**
	 * Linearly interpolates the given source `value` using the table items `skey` values and
	 * returns the associated `tkey` value. For example, interpolate(table, 'time', 42, 'pos')
	 * returns the position for a timestamp equal to 42. If value is out of bounds, values at
	 * index [0, 1] or [n - 1, n] are used for the interpolation.
	 */
	function interpolate$1(table, skey, sval, tkey) {
		var range = lookup(table, skey, sval);

		// Note: the lookup table ALWAYS contains at least 2 items (min and max)
		var prev = !range.lo ? table[0] : !range.hi ? table[table.length - 2] : range.lo;
		var next = !range.lo ? table[1] : !range.hi ? table[table.length - 1] : range.hi;

		var span = next[skey] - prev[skey];
		var ratio = span ? (sval - prev[skey]) / span : 0;
		var offset = (next[tkey] - prev[tkey]) * ratio;

		return prev[tkey] + offset;
	}

	function toTimestamp(scale, input) {
		var adapter = scale._adapter;
		var options = scale.options.time;
		var parser = options.parser;
		var format = parser || options.format;
		var value = input;

		if (typeof parser === 'function') {
			value = parser(value);
		}

		// Only parse if its not a timestamp already
		if (!helpers$1.isFinite(value)) {
			value = typeof format === 'string'
				? adapter.parse(value, format)
				: adapter.parse(value);
		}

		if (value !== null) {
			return +value;
		}

		// Labels are in an incompatible format and no `parser` has been provided.
		// The user might still use the deprecated `format` option for parsing.
		if (!parser && typeof format === 'function') {
			value = format(input);

			// `format` could return something else than a timestamp, if so, parse it
			if (!helpers$1.isFinite(value)) {
				value = adapter.parse(value);
			}
		}

		return value;
	}

	function parse(scale, input) {
		if (helpers$1.isNullOrUndef(input)) {
			return null;
		}

		var options = scale.options.time;
		var value = toTimestamp(scale, scale.getRightValue(input));
		if (value === null) {
			return value;
		}

		if (options.round) {
			value = +scale._adapter.startOf(value, options.round);
		}

		return value;
	}

	/**
	 * Figures out what unit results in an appropriate number of auto-generated ticks
	 */
	function determineUnitForAutoTicks(minUnit, min, max, capacity) {
		var ilen = UNITS.length;
		var i, interval, factor;

		for (i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
			interval = INTERVALS[UNITS[i]];
			factor = interval.steps ? interval.steps : MAX_INTEGER;

			if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) {
				return UNITS[i];
			}
		}

		return UNITS[ilen - 1];
	}

	/**
	 * Figures out what unit to format a set of ticks with
	 */
	function determineUnitForFormatting(scale, numTicks, minUnit, min, max) {
		var i, unit;

		for (i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--) {
			unit = UNITS[i];
			if (INTERVALS[unit].common && scale._adapter.diff(max, min, unit) >= numTicks - 1) {
				return unit;
			}
		}

		return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
	}

	function determineMajorUnit(unit) {
		for (var i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) {
			if (INTERVALS[UNITS[i]].common) {
				return UNITS[i];
			}
		}
	}

	/**
	 * Generates a maximum of `capacity` timestamps between min and max, rounded to the
	 * `minor` unit using the given scale time `options`.
	 * Important: this method can return ticks outside the min and max range, it's the
	 * responsibility of the calling code to clamp values if needed.
	 */
	function generate(scale, min, max, capacity) {
		var adapter = scale._adapter;
		var options = scale.options;
		var timeOpts = options.time;
		var minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, capacity);
		var stepSize = resolve$5([timeOpts.stepSize, timeOpts.unitStepSize, 1]);
		var weekday = minor === 'week' ? timeOpts.isoWeekday : false;
		var first = min;
		var ticks = [];
		var time;

		// For 'week' unit, handle the first day of week option
		if (weekday) {
			first = +adapter.startOf(first, 'isoWeek', weekday);
		}

		// Align first ticks on unit
		first = +adapter.startOf(first, weekday ? 'day' : minor);

		// Prevent browser from freezing in case user options request millions of milliseconds
		if (adapter.diff(max, min, minor) > 100000 * stepSize) {
			throw min + ' and ' + max + ' are too far apart with stepSize of ' + stepSize + ' ' + minor;
		}

		for (time = first; time < max; time = +adapter.add(time, stepSize, minor)) {
			ticks.push(time);
		}

		if (time === max || options.bounds === 'ticks') {
			ticks.push(time);
		}

		return ticks;
	}

	/**
	 * Returns the start and end offsets from edges in the form of {start, end}
	 * where each value is a relative width to the scale and ranges between 0 and 1.
	 * They add extra margins on the both sides by scaling down the original scale.
	 * Offsets are added when the `offset` option is true.
	 */
	function computeOffsets(table, ticks, min, max, options) {
		var start = 0;
		var end = 0;
		var first, last;

		if (options.offset && ticks.length) {
			first = interpolate$1(table, 'time', ticks[0], 'pos');
			if (ticks.length === 1) {
				start = 1 - first;
			} else {
				start = (interpolate$1(table, 'time', ticks[1], 'pos') - first) / 2;
			}
			last = interpolate$1(table, 'time', ticks[ticks.length - 1], 'pos');
			if (ticks.length === 1) {
				end = last;
			} else {
				end = (last - interpolate$1(table, 'time', ticks[ticks.length - 2], 'pos')) / 2;
			}
		}

		return {start: start, end: end, factor: 1 / (start + 1 + end)};
	}

	function setMajorTicks(scale, ticks, map, majorUnit) {
		var adapter = scale._adapter;
		var first = +adapter.startOf(ticks[0].value, majorUnit);
		var last = ticks[ticks.length - 1].value;
		var major, index;

		for (major = first; major <= last; major = +adapter.add(major, 1, majorUnit)) {
			index = map[major];
			if (index >= 0) {
				ticks[index].major = true;
			}
		}
		return ticks;
	}

	function ticksFromTimestamps(scale, values, majorUnit) {
		var ticks = [];
		var map = {};
		var ilen = values.length;
		var i, value;

		for (i = 0; i < ilen; ++i) {
			value = values[i];
			map[value] = i;

			ticks.push({
				value: value,
				major: false
			});
		}

		// We set the major ticks separately from the above loop because calling startOf for every tick
		// is expensive when there is a large number of ticks
		return (ilen === 0 || !majorUnit) ? ticks : setMajorTicks(scale, ticks, map, majorUnit);
	}

	var defaultConfig$4 = {
		position: 'bottom',

		/**
		 * Data distribution along the scale:
		 * - 'linear': data are spread according to their time (distances can vary),
		 * - 'series': data are spread at the same distance from each other.
		 * @see https://github.com/chartjs/Chart.js/pull/4507
		 * @since 2.7.0
		 */
		distribution: 'linear',

		/**
		 * Scale boundary strategy (bypassed by min/max time options)
		 * - `data`: make sure data are fully visible, ticks outside are removed
		 * - `ticks`: make sure ticks are fully visible, data outside are truncated
		 * @see https://github.com/chartjs/Chart.js/pull/4556
		 * @since 2.7.0
		 */
		bounds: 'data',

		adapters: {},
		time: {
			parser: false, // false == a pattern string from https://momentjs.com/docs/#/parsing/string-format/ or a custom callback that converts its argument to a moment
			unit: false, // false == automatic or override with week, month, year, etc.
			round: false, // none, or override with week, month, year, etc.
			displayFormat: false, // DEPRECATED
			isoWeekday: false, // override week start day - see https://momentjs.com/docs/#/get-set/iso-weekday/
			minUnit: 'millisecond',
			displayFormats: {}
		},
		ticks: {
			autoSkip: false,

			/**
			 * Ticks generation input values:
			 * - 'auto': generates "optimal" ticks based on scale size and time options.
			 * - 'data': generates ticks from data (including labels from data {t|x|y} objects).
			 * - 'labels': generates ticks from user given `data.labels` values ONLY.
			 * @see https://github.com/chartjs/Chart.js/pull/4507
			 * @since 2.7.0
			 */
			source: 'auto',

			major: {
				enabled: false
			}
		}
	};

	var scale_time = core_scale.extend({
		initialize: function() {
			this.mergeTicksOptions();
			core_scale.prototype.initialize.call(this);
		},

		update: function() {
			var me = this;
			var options = me.options;
			var time = options.time || (options.time = {});
			var adapter = me._adapter = new core_adapters._date(options.adapters.date);

			// DEPRECATIONS: output a message only one time per update
			deprecated$1('time scale', time.format, 'time.format', 'time.parser');
			deprecated$1('time scale', time.min, 'time.min', 'ticks.min');
			deprecated$1('time scale', time.max, 'time.max', 'ticks.max');

			// Backward compatibility: before introducing adapter, `displayFormats` was
			// supposed to contain *all* unit/string pairs but this can't be resolved
			// when loading the scale (adapters are loaded afterward), so let's populate
			// missing formats on update
			helpers$1.mergeIf(time.displayFormats, adapter.formats());

			return core_scale.prototype.update.apply(me, arguments);
		},

		/**
		 * Allows data to be referenced via 't' attribute
		 */
		getRightValue: function(rawValue) {
			if (rawValue && rawValue.t !== undefined) {
				rawValue = rawValue.t;
			}
			return core_scale.prototype.getRightValue.call(this, rawValue);
		},

		determineDataLimits: function() {
			var me = this;
			var chart = me.chart;
			var adapter = me._adapter;
			var options = me.options;
			var unit = options.time.unit || 'day';
			var min = MAX_INTEGER;
			var max = MIN_INTEGER;
			var timestamps = [];
			var datasets = [];
			var labels = [];
			var i, j, ilen, jlen, data, timestamp, labelsAdded;
			var dataLabels = me._getLabels();

			for (i = 0, ilen = dataLabels.length; i < ilen; ++i) {
				labels.push(parse(me, dataLabels[i]));
			}

			for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
				if (chart.isDatasetVisible(i)) {
					data = chart.data.datasets[i].data;

					// Let's consider that all data have the same format.
					if (helpers$1.isObject(data[0])) {
						datasets[i] = [];

						for (j = 0, jlen = data.length; j < jlen; ++j) {
							timestamp = parse(me, data[j]);
							timestamps.push(timestamp);
							datasets[i][j] = timestamp;
						}
					} else {
						datasets[i] = labels.slice(0);
						if (!labelsAdded) {
							timestamps = timestamps.concat(labels);
							labelsAdded = true;
						}
					}
				} else {
					datasets[i] = [];
				}
			}

			if (labels.length) {
				min = Math.min(min, labels[0]);
				max = Math.max(max, labels[labels.length - 1]);
			}

			if (timestamps.length) {
				timestamps = ilen > 1 ? arrayUnique(timestamps).sort(sorter) : timestamps.sort(sorter);
				min = Math.min(min, timestamps[0]);
				max = Math.max(max, timestamps[timestamps.length - 1]);
			}

			min = parse(me, getMin(options)) || min;
			max = parse(me, getMax(options)) || max;

			// In case there is no valid min/max, set limits based on unit time option
			min = min === MAX_INTEGER ? +adapter.startOf(Date.now(), unit) : min;
			max = max === MIN_INTEGER ? +adapter.endOf(Date.now(), unit) + 1 : max;

			// Make sure that max is strictly higher than min (required by the lookup table)
			me.min = Math.min(min, max);
			me.max = Math.max(min + 1, max);

			// PRIVATE
			me._table = [];
			me._timestamps = {
				data: timestamps,
				datasets: datasets,
				labels: labels
			};
		},

		buildTicks: function() {
			var me = this;
			var min = me.min;
			var max = me.max;
			var options = me.options;
			var tickOpts = options.ticks;
			var timeOpts = options.time;
			var timestamps = me._timestamps;
			var ticks = [];
			var capacity = me.getLabelCapacity(min);
			var source = tickOpts.source;
			var distribution = options.distribution;
			var i, ilen, timestamp;

			if (source === 'data' || (source === 'auto' && distribution === 'series')) {
				timestamps = timestamps.data;
			} else if (source === 'labels') {
				timestamps = timestamps.labels;
			} else {
				timestamps = generate(me, min, max, capacity);
			}

			if (options.bounds === 'ticks' && timestamps.length) {
				min = timestamps[0];
				max = timestamps[timestamps.length - 1];
			}

			// Enforce limits with user min/max options
			min = parse(me, getMin(options)) || min;
			max = parse(me, getMax(options)) || max;

			// Remove ticks outside the min/max range
			for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
				timestamp = timestamps[i];
				if (timestamp >= min && timestamp <= max) {
					ticks.push(timestamp);
				}
			}

			me.min = min;
			me.max = max;

			// PRIVATE
			// determineUnitForFormatting relies on the number of ticks so we don't use it when
			// autoSkip is enabled because we don't yet know what the final number of ticks will be
			me._unit = timeOpts.unit || (tickOpts.autoSkip
				? determineUnitForAutoTicks(timeOpts.minUnit, me.min, me.max, capacity)
				: determineUnitForFormatting(me, ticks.length, timeOpts.minUnit, me.min, me.max));
			me._majorUnit = !tickOpts.major.enabled || me._unit === 'year' ? undefined
				: determineMajorUnit(me._unit);
			me._table = buildLookupTable(me._timestamps.data, min, max, distribution);
			me._offsets = computeOffsets(me._table, ticks, min, max, options);

			if (tickOpts.reverse) {
				ticks.reverse();
			}

			return ticksFromTimestamps(me, ticks, me._majorUnit);
		},

		getLabelForIndex: function(index, datasetIndex) {
			var me = this;
			var adapter = me._adapter;
			var data = me.chart.data;
			var timeOpts = me.options.time;
			var label = data.labels && index < data.labels.length ? data.labels[index] : '';
			var value = data.datasets[datasetIndex].data[index];

			if (helpers$1.isObject(value)) {
				label = me.getRightValue(value);
			}
			if (timeOpts.tooltipFormat) {
				return adapter.format(toTimestamp(me, label), timeOpts.tooltipFormat);
			}
			if (typeof label === 'string') {
				return label;
			}
			return adapter.format(toTimestamp(me, label), timeOpts.displayFormats.datetime);
		},

		/**
		 * Function to format an individual tick mark
		 * @private
		 */
		tickFormatFunction: function(time, index, ticks, format) {
			var me = this;
			var adapter = me._adapter;
			var options = me.options;
			var formats = options.time.displayFormats;
			var minorFormat = formats[me._unit];
			var majorUnit = me._majorUnit;
			var majorFormat = formats[majorUnit];
			var tick = ticks[index];
			var tickOpts = options.ticks;
			var major = majorUnit && majorFormat && tick && tick.major;
			var label = adapter.format(time, format ? format : major ? majorFormat : minorFormat);
			var nestedTickOpts = major ? tickOpts.major : tickOpts.minor;
			var formatter = resolve$5([
				nestedTickOpts.callback,
				nestedTickOpts.userCallback,
				tickOpts.callback,
				tickOpts.userCallback
			]);

			return formatter ? formatter(label, index, ticks) : label;
		},

		convertTicksToLabels: function(ticks) {
			var labels = [];
			var i, ilen;

			for (i = 0, ilen = ticks.length; i < ilen; ++i) {
				labels.push(this.tickFormatFunction(ticks[i].value, i, ticks));
			}

			return labels;
		},

		/**
		 * @private
		 */
		getPixelForOffset: function(time) {
			var me = this;
			var offsets = me._offsets;
			var pos = interpolate$1(me._table, 'time', time, 'pos');
			return me.getPixelForDecimal((offsets.start + pos) * offsets.factor);
		},

		getPixelForValue: function(value, index, datasetIndex) {
			var me = this;
			var time = null;

			if (index !== undefined && datasetIndex !== undefined) {
				time = me._timestamps.datasets[datasetIndex][index];
			}

			if (time === null) {
				time = parse(me, value);
			}

			if (time !== null) {
				return me.getPixelForOffset(time);
			}
		},

		getPixelForTick: function(index) {
			var ticks = this.getTicks();
			return index >= 0 && index < ticks.length ?
				this.getPixelForOffset(ticks[index].value) :
				null;
		},

		getValueForPixel: function(pixel) {
			var me = this;
			var offsets = me._offsets;
			var pos = me.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
			var time = interpolate$1(me._table, 'pos', pos, 'time');

			// DEPRECATION, we should return time directly
			return me._adapter._create(time);
		},

		/**
		 * @private
		 */
		_getLabelSize: function(label) {
			var me = this;
			var ticksOpts = me.options.ticks;
			var tickLabelWidth = me.ctx.measureText(label).width;
			var angle = helpers$1.toRadians(me.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
			var cosRotation = Math.cos(angle);
			var sinRotation = Math.sin(angle);
			var tickFontSize = valueOrDefault$d(ticksOpts.fontSize, core_defaults.global.defaultFontSize);

			return {
				w: (tickLabelWidth * cosRotation) + (tickFontSize * sinRotation),
				h: (tickLabelWidth * sinRotation) + (tickFontSize * cosRotation)
			};
		},

		/**
		 * Crude approximation of what the label width might be
		 * @private
		 */
		getLabelWidth: function(label) {
			return this._getLabelSize(label).w;
		},

		/**
		 * @private
		 */
		getLabelCapacity: function(exampleTime) {
			var me = this;
			var timeOpts = me.options.time;
			var displayFormats = timeOpts.displayFormats;

			// pick the longest format (milliseconds) for guestimation
			var format = displayFormats[timeOpts.unit] || displayFormats.millisecond;
			var exampleLabel = me.tickFormatFunction(exampleTime, 0, ticksFromTimestamps(me, [exampleTime], me._majorUnit), format);
			var size = me._getLabelSize(exampleLabel);
			var capacity = Math.floor(me.isHorizontal() ? me.width / size.w : me.height / size.h);

			if (me.options.offset) {
				capacity--;
			}

			return capacity > 0 ? capacity : 1;
		}
	});

	// INTERNAL: static default options, registered in src/index.js
	var _defaults$4 = defaultConfig$4;
	scale_time._defaults = _defaults$4;

	var scales = {
		category: scale_category,
		linear: scale_linear,
		logarithmic: scale_logarithmic,
		radialLinear: scale_radialLinear,
		time: scale_time
	};

	var FORMATS = {
		datetime: 'MMM D, YYYY, h:mm:ss a',
		millisecond: 'h:mm:ss.SSS a',
		second: 'h:mm:ss a',
		minute: 'h:mm a',
		hour: 'hA',
		day: 'MMM D',
		week: 'll',
		month: 'MMM YYYY',
		quarter: '[Q]Q - YYYY',
		year: 'YYYY'
	};

	core_adapters._date.override(typeof moment === 'function' ? {
		_id: 'moment', // DEBUG ONLY

		formats: function() {
			return FORMATS;
		},

		parse: function(value, format) {
			if (typeof value === 'string' && typeof format === 'string') {
				value = moment(value, format);
			} else if (!(value instanceof moment)) {
				value = moment(value);
			}
			return value.isValid() ? value.valueOf() : null;
		},

		format: function(time, format) {
			return moment(time).format(format);
		},

		add: function(time, amount, unit) {
			return moment(time).add(amount, unit).valueOf();
		},

		diff: function(max, min, unit) {
			return moment(max).diff(moment(min), unit);
		},

		startOf: function(time, unit, weekday) {
			time = moment(time);
			if (unit === 'isoWeek') {
				return time.isoWeekday(weekday).valueOf();
			}
			return time.startOf(unit).valueOf();
		},

		endOf: function(time, unit) {
			return moment(time).endOf(unit).valueOf();
		},

		// DEPRECATIONS

		/**
		 * Provided for backward compatibility with scale.getValueForPixel().
		 * @deprecated since version 2.8.0
		 * @todo remove at version 3
		 * @private
		 */
		_create: function(time) {
			return moment(time);
		},
	} : {});

	core_defaults._set('global', {
		plugins: {
			filler: {
				propagate: true
			}
		}
	});

	var mappers = {
		dataset: function(source) {
			var index = source.fill;
			var chart = source.chart;
			var meta = chart.getDatasetMeta(index);
			var visible = meta && chart.isDatasetVisible(index);
			var points = (visible && meta.dataset._children) || [];
			var length = points.length || 0;

			return !length ? null : function(point, i) {
				return (i < length && points[i]._view) || null;
			};
		},

		boundary: function(source) {
			var boundary = source.boundary;
			var x = boundary ? boundary.x : null;
			var y = boundary ? boundary.y : null;

			if (helpers$1.isArray(boundary)) {
				return function(point, i) {
					return boundary[i];
				};
			}

			return function(point) {
				return {
					x: x === null ? point.x : x,
					y: y === null ? point.y : y,
				};
			};
		}
	};

	// @todo if (fill[0] === '#')
	function decodeFill(el, index, count) {
		var model = el._model || {};
		var fill = model.fill;
		var target;

		if (fill === undefined) {
			fill = !!model.backgroundColor;
		}

		if (fill === false || fill === null) {
			return false;
		}

		if (fill === true) {
			return 'origin';
		}

		target = parseFloat(fill, 10);
		if (isFinite(target) && Math.floor(target) === target) {
			if (fill[0] === '-' || fill[0] === '+') {
				target = index + target;
			}

			if (target === index || target < 0 || target >= count) {
				return false;
			}

			return target;
		}

		switch (fill) {
		// compatibility
		case 'bottom':
			return 'start';
		case 'top':
			return 'end';
		case 'zero':
			return 'origin';
		// supported boundaries
		case 'origin':
		case 'start':
		case 'end':
			return fill;
		// invalid fill values
		default:
			return false;
		}
	}

	function computeLinearBoundary(source) {
		var model = source.el._model || {};
		var scale = source.el._scale || {};
		var fill = source.fill;
		var target = null;
		var horizontal;

		if (isFinite(fill)) {
			return null;
		}

		// Backward compatibility: until v3, we still need to support boundary values set on
		// the model (scaleTop, scaleBottom and scaleZero) because some external plugins and
		// controllers might still use it (e.g. the Smith chart).

		if (fill === 'start') {
			target = model.scaleBottom === undefined ? scale.bottom : model.scaleBottom;
		} else if (fill === 'end') {
			target = model.scaleTop === undefined ? scale.top : model.scaleTop;
		} else if (model.scaleZero !== undefined) {
			target = model.scaleZero;
		} else if (scale.getBasePixel) {
			target = scale.getBasePixel();
		}

		if (target !== undefined && target !== null) {
			if (target.x !== undefined && target.y !== undefined) {
				return target;
			}

			if (helpers$1.isFinite(target)) {
				horizontal = scale.isHorizontal();
				return {
					x: horizontal ? target : null,
					y: horizontal ? null : target
				};
			}
		}

		return null;
	}

	function computeCircularBoundary(source) {
		var scale = source.el._scale;
		var options = scale.options;
		var length = scale.chart.data.labels.length;
		var fill = source.fill;
		var target = [];
		var start, end, center, i, point;

		if (!length) {
			return null;
		}

		start = options.ticks.reverse ? scale.max : scale.min;
		end = options.ticks.reverse ? scale.min : scale.max;
		center = scale.getPointPositionForValue(0, start);
		for (i = 0; i < length; ++i) {
			point = fill === 'start' || fill === 'end'
				? scale.getPointPositionForValue(i, fill === 'start' ? start : end)
				: scale.getBasePosition(i);
			if (options.gridLines.circular) {
				point.cx = center.x;
				point.cy = center.y;
				point.angle = scale.getIndexAngle(i) - Math.PI / 2;
			}
			target.push(point);
		}
		return target;
	}

	function computeBoundary(source) {
		var scale = source.el._scale || {};

		if (scale.getPointPositionForValue) {
			return computeCircularBoundary(source);
		}
		return computeLinearBoundary(source);
	}

	function resolveTarget(sources, index, propagate) {
		var source = sources[index];
		var fill = source.fill;
		var visited = [index];
		var target;

		if (!propagate) {
			return fill;
		}

		while (fill !== false && visited.indexOf(fill) === -1) {
			if (!isFinite(fill)) {
				return fill;
			}

			target = sources[fill];
			if (!target) {
				return false;
			}

			if (target.visible) {
				return fill;
			}

			visited.push(fill);
			fill = target.fill;
		}

		return false;
	}

	function createMapper(source) {
		var fill = source.fill;
		var type = 'dataset';

		if (fill === false) {
			return null;
		}

		if (!isFinite(fill)) {
			type = 'boundary';
		}

		return mappers[type](source);
	}

	function isDrawable(point) {
		return point && !point.skip;
	}

	function drawArea(ctx, curve0, curve1, len0, len1) {
		var i, cx, cy, r;

		if (!len0 || !len1) {
			return;
		}

		// building first area curve (normal)
		ctx.moveTo(curve0[0].x, curve0[0].y);
		for (i = 1; i < len0; ++i) {
			helpers$1.canvas.lineTo(ctx, curve0[i - 1], curve0[i]);
		}

		if (curve1[0].angle !== undefined) {
			cx = curve1[0].cx;
			cy = curve1[0].cy;
			r = Math.sqrt(Math.pow(curve1[0].x - cx, 2) + Math.pow(curve1[0].y - cy, 2));
			for (i = len1 - 1; i > 0; --i) {
				ctx.arc(cx, cy, r, curve1[i].angle, curve1[i - 1].angle, true);
			}
			return;
		}

		// joining the two area curves
		ctx.lineTo(curve1[len1 - 1].x, curve1[len1 - 1].y);

		// building opposite area curve (reverse)
		for (i = len1 - 1; i > 0; --i) {
			helpers$1.canvas.lineTo(ctx, curve1[i], curve1[i - 1], true);
		}
	}

	function doFill(ctx, points, mapper, view, color, loop) {
		var count = points.length;
		var span = view.spanGaps;
		var curve0 = [];
		var curve1 = [];
		var len0 = 0;
		var len1 = 0;
		var i, ilen, index, p0, p1, d0, d1, loopOffset;

		ctx.beginPath();

		for (i = 0, ilen = count; i < ilen; ++i) {
			index = i % count;
			p0 = points[index]._view;
			p1 = mapper(p0, index, view);
			d0 = isDrawable(p0);
			d1 = isDrawable(p1);

			if (loop && loopOffset === undefined && d0) {
				loopOffset = i + 1;
				ilen = count + loopOffset;
			}

			if (d0 && d1) {
				len0 = curve0.push(p0);
				len1 = curve1.push(p1);
			} else if (len0 && len1) {
				if (!span) {
					drawArea(ctx, curve0, curve1, len0, len1);
					len0 = len1 = 0;
					curve0 = [];
					curve1 = [];
				} else {
					if (d0) {
						curve0.push(p0);
					}
					if (d1) {
						curve1.push(p1);
					}
				}
			}
		}

		drawArea(ctx, curve0, curve1, len0, len1);

		ctx.closePath();
		ctx.fillStyle = color;
		ctx.fill();
	}

	var plugin_filler = {
		id: 'filler',

		afterDatasetsUpdate: function(chart, options) {
			var count = (chart.data.datasets || []).length;
			var propagate = options.propagate;
			var sources = [];
			var meta, i, el, source;

			for (i = 0; i < count; ++i) {
				meta = chart.getDatasetMeta(i);
				el = meta.dataset;
				source = null;

				if (el && el._model && el instanceof elements.Line) {
					source = {
						visible: chart.isDatasetVisible(i),
						fill: decodeFill(el, i, count),
						chart: chart,
						el: el
					};
				}

				meta.$filler = source;
				sources.push(source);
			}

			for (i = 0; i < count; ++i) {
				source = sources[i];
				if (!source) {
					continue;
				}

				source.fill = resolveTarget(sources, i, propagate);
				source.boundary = computeBoundary(source);
				source.mapper = createMapper(source);
			}
		},

		beforeDatasetsDraw: function(chart) {
			var metasets = chart._getSortedVisibleDatasetMetas();
			var ctx = chart.ctx;
			var meta, i, el, view, points, mapper, color;

			for (i = metasets.length - 1; i >= 0; --i) {
				meta = metasets[i].$filler;

				if (!meta || !meta.visible) {
					continue;
				}

				el = meta.el;
				view = el._view;
				points = el._children || [];
				mapper = meta.mapper;
				color = view.backgroundColor || core_defaults.global.defaultColor;

				if (mapper && color && points.length) {
					helpers$1.canvas.clipArea(ctx, chart.chartArea);
					doFill(ctx, points, mapper, view, color, el._loop);
					helpers$1.canvas.unclipArea(ctx);
				}
			}
		}
	};

	var getRtlHelper$1 = helpers$1.rtl.getRtlAdapter;
	var noop$1 = helpers$1.noop;
	var valueOrDefault$e = helpers$1.valueOrDefault;

	core_defaults._set('global', {
		legend: {
			display: true,
			position: 'top',
			align: 'center',
			fullWidth: true,
			reverse: false,
			weight: 1000,

			// a callback that will handle
			onClick: function(e, legendItem) {
				var index = legendItem.datasetIndex;
				var ci = this.chart;
				var meta = ci.getDatasetMeta(index);

				// See controller.isDatasetVisible comment
				meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;

				// We hid a dataset ... rerender the chart
				ci.update();
			},

			onHover: null,
			onLeave: null,

			labels: {
				boxWidth: 40,
				padding: 10,
				// Generates labels shown in the legend
				// Valid properties to return:
				// text : text to display
				// fillStyle : fill of coloured box
				// strokeStyle: stroke of coloured box
				// hidden : if this legend item refers to a hidden item
				// lineCap : cap style for line
				// lineDash
				// lineDashOffset :
				// lineJoin :
				// lineWidth :
				generateLabels: function(chart) {
					var datasets = chart.data.datasets;
					var options = chart.options.legend || {};
					var usePointStyle = options.labels && options.labels.usePointStyle;

					return chart._getSortedDatasetMetas().map(function(meta) {
						var style = meta.controller.getStyle(usePointStyle ? 0 : undefined);

						return {
							text: datasets[meta.index].label,
							fillStyle: style.backgroundColor,
							hidden: !chart.isDatasetVisible(meta.index),
							lineCap: style.borderCapStyle,
							lineDash: style.borderDash,
							lineDashOffset: style.borderDashOffset,
							lineJoin: style.borderJoinStyle,
							lineWidth: style.borderWidth,
							strokeStyle: style.borderColor,
							pointStyle: style.pointStyle,
							rotation: style.rotation,

							// Below is extra data used for toggling the datasets
							datasetIndex: meta.index
						};
					}, this);
				}
			}
		},

		legendCallback: function(chart) {
			var list = document.createElement('ul');
			var datasets = chart.data.datasets;
			var i, ilen, listItem, listItemSpan;

			list.setAttribute('class', chart.id + '-legend');

			for (i = 0, ilen = datasets.length; i < ilen; i++) {
				listItem = list.appendChild(document.createElement('li'));
				listItemSpan = listItem.appendChild(document.createElement('span'));
				listItemSpan.style.backgroundColor = datasets[i].backgroundColor;
				if (datasets[i].label) {
					listItem.appendChild(document.createTextNode(datasets[i].label));
				}
			}

			return list.outerHTML;
		}
	});

	/**
	 * Helper function to get the box width based on the usePointStyle option
	 * @param {object} labelopts - the label options on the legend
	 * @param {number} fontSize - the label font size
	 * @return {number} width of the color box area
	 */
	function getBoxWidth(labelOpts, fontSize) {
		return labelOpts.usePointStyle && labelOpts.boxWidth > fontSize ?
			fontSize :
			labelOpts.boxWidth;
	}

	/**
	 * IMPORTANT: this class is exposed publicly as Chart.Legend, backward compatibility required!
	 */
	var Legend = core_element.extend({

		initialize: function(config) {
			var me = this;
			helpers$1.extend(me, config);

			// Contains hit boxes for each dataset (in dataset order)
			me.legendHitBoxes = [];

			/**
	 		 * @private
	 		 */
			me._hoveredItem = null;

			// Are we in doughnut mode which has a different data type
			me.doughnutMode = false;
		},

		// These methods are ordered by lifecycle. Utilities then follow.
		// Any function defined here is inherited by all legend types.
		// Any function can be extended by the legend type

		beforeUpdate: noop$1,
		update: function(maxWidth, maxHeight, margins) {
			var me = this;

			// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
			me.beforeUpdate();

			// Absorb the master measurements
			me.maxWidth = maxWidth;
			me.maxHeight = maxHeight;
			me.margins = margins;

			// Dimensions
			me.beforeSetDimensions();
			me.setDimensions();
			me.afterSetDimensions();
			// Labels
			me.beforeBuildLabels();
			me.buildLabels();
			me.afterBuildLabels();

			// Fit
			me.beforeFit();
			me.fit();
			me.afterFit();
			//
			me.afterUpdate();

			return me.minSize;
		},
		afterUpdate: noop$1,

		//

		beforeSetDimensions: noop$1,
		setDimensions: function() {
			var me = this;
			// Set the unconstrained dimension before label rotation
			if (me.isHorizontal()) {
				// Reset position before calculating rotation
				me.width = me.maxWidth;
				me.left = 0;
				me.right = me.width;
			} else {
				me.height = me.maxHeight;

				// Reset position before calculating rotation
				me.top = 0;
				me.bottom = me.height;
			}

			// Reset padding
			me.paddingLeft = 0;
			me.paddingTop = 0;
			me.paddingRight = 0;
			me.paddingBottom = 0;

			// Reset minSize
			me.minSize = {
				width: 0,
				height: 0
			};
		},
		afterSetDimensions: noop$1,

		//

		beforeBuildLabels: noop$1,
		buildLabels: function() {
			var me = this;
			var labelOpts = me.options.labels || {};
			var legendItems = helpers$1.callback(labelOpts.generateLabels, [me.chart], me) || [];

			if (labelOpts.filter) {
				legendItems = legendItems.filter(function(item) {
					return labelOpts.filter(item, me.chart.data);
				});
			}

			if (me.options.reverse) {
				legendItems.reverse();
			}

			me.legendItems = legendItems;
		},
		afterBuildLabels: noop$1,

		//

		beforeFit: noop$1,
		fit: function() {
			var me = this;
			var opts = me.options;
			var labelOpts = opts.labels;
			var display = opts.display;

			var ctx = me.ctx;

			var labelFont = helpers$1.options._parseFont(labelOpts);
			var fontSize = labelFont.size;

			// Reset hit boxes
			var hitboxes = me.legendHitBoxes = [];

			var minSize = me.minSize;
			var isHorizontal = me.isHorizontal();

			if (isHorizontal) {
				minSize.width = me.maxWidth; // fill all the width
				minSize.height = display ? 10 : 0;
			} else {
				minSize.width = display ? 10 : 0;
				minSize.height = me.maxHeight; // fill all the height
			}

			// Increase sizes here
			if (!display) {
				me.width = minSize.width = me.height = minSize.height = 0;
				return;
			}
			ctx.font = labelFont.string;

			if (isHorizontal) {
				// Labels

				// Width of each line of legend boxes. Labels wrap onto multiple lines when there are too many to fit on one
				var lineWidths = me.lineWidths = [0];
				var totalHeight = 0;

				ctx.textAlign = 'left';
				ctx.textBaseline = 'middle';

				helpers$1.each(me.legendItems, function(legendItem, i) {
					var boxWidth = getBoxWidth(labelOpts, fontSize);
					var width = boxWidth + (fontSize / 2) + ctx.measureText(legendItem.text).width;

					if (i === 0 || lineWidths[lineWidths.length - 1] + width + 2 * labelOpts.padding > minSize.width) {
						totalHeight += fontSize + labelOpts.padding;
						lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
					}

					// Store the hitbox width and height here. Final position will be updated in `draw`
					hitboxes[i] = {
						left: 0,
						top: 0,
						width: width,
						height: fontSize
					};

					lineWidths[lineWidths.length - 1] += width + labelOpts.padding;
				});

				minSize.height += totalHeight;

			} else {
				var vPadding = labelOpts.padding;
				var columnWidths = me.columnWidths = [];
				var columnHeights = me.columnHeights = [];
				var totalWidth = labelOpts.padding;
				var currentColWidth = 0;
				var currentColHeight = 0;

				helpers$1.each(me.legendItems, function(legendItem, i) {
					var boxWidth = getBoxWidth(labelOpts, fontSize);
					var itemWidth = boxWidth + (fontSize / 2) + ctx.measureText(legendItem.text).width;

					// If too tall, go to new column
					if (i > 0 && currentColHeight + fontSize + 2 * vPadding > minSize.height) {
						totalWidth += currentColWidth + labelOpts.padding;
						columnWidths.push(currentColWidth); // previous column width
						columnHeights.push(currentColHeight);
						currentColWidth = 0;
						currentColHeight = 0;
					}

					// Get max width
					currentColWidth = Math.max(currentColWidth, itemWidth);
					currentColHeight += fontSize + vPadding;

					// Store the hitbox width and height here. Final position will be updated in `draw`
					hitboxes[i] = {
						left: 0,
						top: 0,
						width: itemWidth,
						height: fontSize
					};
				});

				totalWidth += currentColWidth;
				columnWidths.push(currentColWidth);
				columnHeights.push(currentColHeight);
				minSize.width += totalWidth;
			}

			me.width = minSize.width;
			me.height = minSize.height;
		},
		afterFit: noop$1,

		// Shared Methods
		isHorizontal: function() {
			return this.options.position === 'top' || this.options.position === 'bottom';
		},

		// Actually draw the legend on the canvas
		draw: function() {
			var me = this;
			var opts = me.options;
			var labelOpts = opts.labels;
			var globalDefaults = core_defaults.global;
			var defaultColor = globalDefaults.defaultColor;
			var lineDefault = globalDefaults.elements.line;
			var legendHeight = me.height;
			var columnHeights = me.columnHeights;
			var legendWidth = me.width;
			var lineWidths = me.lineWidths;

			if (!opts.display) {
				return;
			}

			var rtlHelper = getRtlHelper$1(opts.rtl, me.left, me.minSize.width);
			var ctx = me.ctx;
			var fontColor = valueOrDefault$e(labelOpts.fontColor, globalDefaults.defaultFontColor);
			var labelFont = helpers$1.options._parseFont(labelOpts);
			var fontSize = labelFont.size;
			var cursor;

			// Canvas setup
			ctx.textAlign = rtlHelper.textAlign('left');
			ctx.textBaseline = 'middle';
			ctx.lineWidth = 0.5;
			ctx.strokeStyle = fontColor; // for strikethrough effect
			ctx.fillStyle = fontColor; // render in correct colour
			ctx.font = labelFont.string;

			var boxWidth = getBoxWidth(labelOpts, fontSize);
			var hitboxes = me.legendHitBoxes;

			// current position
			var drawLegendBox = function(x, y, legendItem) {
				if (isNaN(boxWidth) || boxWidth <= 0) {
					return;
				}

				// Set the ctx for the box
				ctx.save();

				var lineWidth = valueOrDefault$e(legendItem.lineWidth, lineDefault.borderWidth);
				ctx.fillStyle = valueOrDefault$e(legendItem.fillStyle, defaultColor);
				ctx.lineCap = valueOrDefault$e(legendItem.lineCap, lineDefault.borderCapStyle);
				ctx.lineDashOffset = valueOrDefault$e(legendItem.lineDashOffset, lineDefault.borderDashOffset);
				ctx.lineJoin = valueOrDefault$e(legendItem.lineJoin, lineDefault.borderJoinStyle);
				ctx.lineWidth = lineWidth;
				ctx.strokeStyle = valueOrDefault$e(legendItem.strokeStyle, defaultColor);

				if (ctx.setLineDash) {
					// IE 9 and 10 do not support line dash
					ctx.setLineDash(valueOrDefault$e(legendItem.lineDash, lineDefault.borderDash));
				}

				if (labelOpts && labelOpts.usePointStyle) {
					// Recalculate x and y for drawPoint() because its expecting
					// x and y to be center of figure (instead of top left)
					var radius = boxWidth * Math.SQRT2 / 2;
					var centerX = rtlHelper.xPlus(x, boxWidth / 2);
					var centerY = y + fontSize / 2;

					// Draw pointStyle as legend symbol
					helpers$1.canvas.drawPoint(ctx, legendItem.pointStyle, radius, centerX, centerY, legendItem.rotation);
				} else {
					// Draw box as legend symbol
					ctx.fillRect(rtlHelper.leftForLtr(x, boxWidth), y, boxWidth, fontSize);
					if (lineWidth !== 0) {
						ctx.strokeRect(rtlHelper.leftForLtr(x, boxWidth), y, boxWidth, fontSize);
					}
				}

				ctx.restore();
			};

			var fillText = function(x, y, legendItem, textWidth) {
				var halfFontSize = fontSize / 2;
				var xLeft = rtlHelper.xPlus(x, boxWidth + halfFontSize);
				var yMiddle = y + halfFontSize;

				ctx.fillText(legendItem.text, xLeft, yMiddle);

				if (legendItem.hidden) {
					// Strikethrough the text if hidden
					ctx.beginPath();
					ctx.lineWidth = 2;
					ctx.moveTo(xLeft, yMiddle);
					ctx.lineTo(rtlHelper.xPlus(xLeft, textWidth), yMiddle);
					ctx.stroke();
				}
			};

			var alignmentOffset = function(dimension, blockSize) {
				switch (opts.align) {
				case 'start':
					return labelOpts.padding;
				case 'end':
					return dimension - blockSize;
				default: // center
					return (dimension - blockSize + labelOpts.padding) / 2;
				}
			};

			// Horizontal
			var isHorizontal = me.isHorizontal();
			if (isHorizontal) {
				cursor = {
					x: me.left + alignmentOffset(legendWidth, lineWidths[0]),
					y: me.top + labelOpts.padding,
					line: 0
				};
			} else {
				cursor = {
					x: me.left + labelOpts.padding,
					y: me.top + alignmentOffset(legendHeight, columnHeights[0]),
					line: 0
				};
			}

			helpers$1.rtl.overrideTextDirection(me.ctx, opts.textDirection);

			var itemHeight = fontSize + labelOpts.padding;
			helpers$1.each(me.legendItems, function(legendItem, i) {
				var textWidth = ctx.measureText(legendItem.text).width;
				var width = boxWidth + (fontSize / 2) + textWidth;
				var x = cursor.x;
				var y = cursor.y;

				rtlHelper.setWidth(me.minSize.width);

				// Use (me.left + me.minSize.width) and (me.top + me.minSize.height)
				// instead of me.right and me.bottom because me.width and me.height
				// may have been changed since me.minSize was calculated
				if (isHorizontal) {
					if (i > 0 && x + width + labelOpts.padding > me.left + me.minSize.width) {
						y = cursor.y += itemHeight;
						cursor.line++;
						x = cursor.x = me.left + alignmentOffset(legendWidth, lineWidths[cursor.line]);
					}
				} else if (i > 0 && y + itemHeight > me.top + me.minSize.height) {
					x = cursor.x = x + me.columnWidths[cursor.line] + labelOpts.padding;
					cursor.line++;
					y = cursor.y = me.top + alignmentOffset(legendHeight, columnHeights[cursor.line]);
				}

				var realX = rtlHelper.x(x);

				drawLegendBox(realX, y, legendItem);

				hitboxes[i].left = rtlHelper.leftForLtr(realX, hitboxes[i].width);
				hitboxes[i].top = y;

				// Fill the actual label
				fillText(realX, y, legendItem, textWidth);

				if (isHorizontal) {
					cursor.x += width + labelOpts.padding;
				} else {
					cursor.y += itemHeight;
				}
			});

			helpers$1.rtl.restoreTextDirection(me.ctx, opts.textDirection);
		},

		/**
		 * @private
		 */
		_getLegendItemAt: function(x, y) {
			var me = this;
			var i, hitBox, lh;

			if (x >= me.left && x <= me.right && y >= me.top && y <= me.bottom) {
				// See if we are touching one of the dataset boxes
				lh = me.legendHitBoxes;
				for (i = 0; i < lh.length; ++i) {
					hitBox = lh[i];

					if (x >= hitBox.left && x <= hitBox.left + hitBox.width && y >= hitBox.top && y <= hitBox.top + hitBox.height) {
						// Touching an element
						return me.legendItems[i];
					}
				}
			}

			return null;
		},

		/**
		 * Handle an event
		 * @private
		 * @param {IEvent} event - The event to handle
		 */
		handleEvent: function(e) {
			var me = this;
			var opts = me.options;
			var type = e.type === 'mouseup' ? 'click' : e.type;
			var hoveredItem;

			if (type === 'mousemove') {
				if (!opts.onHover && !opts.onLeave) {
					return;
				}
			} else if (type === 'click') {
				if (!opts.onClick) {
					return;
				}
			} else {
				return;
			}

			// Chart event already has relative position in it
			hoveredItem = me._getLegendItemAt(e.x, e.y);

			if (type === 'click') {
				if (hoveredItem && opts.onClick) {
					// use e.native for backwards compatibility
					opts.onClick.call(me, e.native, hoveredItem);
				}
			} else {
				if (opts.onLeave && hoveredItem !== me._hoveredItem) {
					if (me._hoveredItem) {
						opts.onLeave.call(me, e.native, me._hoveredItem);
					}
					me._hoveredItem = hoveredItem;
				}

				if (opts.onHover && hoveredItem) {
					// use e.native for backwards compatibility
					opts.onHover.call(me, e.native, hoveredItem);
				}
			}
		}
	});

	function createNewLegendAndAttach(chart, legendOpts) {
		var legend = new Legend({
			ctx: chart.ctx,
			options: legendOpts,
			chart: chart
		});

		core_layouts.configure(chart, legend, legendOpts);
		core_layouts.addBox(chart, legend);
		chart.legend = legend;
	}

	var plugin_legend = {
		id: 'legend',

		/**
		 * Backward compatibility: since 2.1.5, the legend is registered as a plugin, making
		 * Chart.Legend obsolete. To avoid a breaking change, we export the Legend as part of
		 * the plugin, which one will be re-exposed in the chart.js file.
		 * https://github.com/chartjs/Chart.js/pull/2640
		 * @private
		 */
		_element: Legend,

		beforeInit: function(chart) {
			var legendOpts = chart.options.legend;

			if (legendOpts) {
				createNewLegendAndAttach(chart, legendOpts);
			}
		},

		beforeUpdate: function(chart) {
			var legendOpts = chart.options.legend;
			var legend = chart.legend;

			if (legendOpts) {
				helpers$1.mergeIf(legendOpts, core_defaults.global.legend);

				if (legend) {
					core_layouts.configure(chart, legend, legendOpts);
					legend.options = legendOpts;
				} else {
					createNewLegendAndAttach(chart, legendOpts);
				}
			} else if (legend) {
				core_layouts.removeBox(chart, legend);
				delete chart.legend;
			}
		},

		afterEvent: function(chart, e) {
			var legend = chart.legend;
			if (legend) {
				legend.handleEvent(e);
			}
		}
	};

	var noop$2 = helpers$1.noop;

	core_defaults._set('global', {
		title: {
			display: false,
			fontStyle: 'bold',
			fullWidth: true,
			padding: 10,
			position: 'top',
			text: '',
			weight: 2000         // by default greater than legend (1000) to be above
		}
	});

	/**
	 * IMPORTANT: this class is exposed publicly as Chart.Legend, backward compatibility required!
	 */
	var Title = core_element.extend({
		initialize: function(config) {
			var me = this;
			helpers$1.extend(me, config);

			// Contains hit boxes for each dataset (in dataset order)
			me.legendHitBoxes = [];
		},

		// These methods are ordered by lifecycle. Utilities then follow.

		beforeUpdate: noop$2,
		update: function(maxWidth, maxHeight, margins) {
			var me = this;

			// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
			me.beforeUpdate();

			// Absorb the master measurements
			me.maxWidth = maxWidth;
			me.maxHeight = maxHeight;
			me.margins = margins;

			// Dimensions
			me.beforeSetDimensions();
			me.setDimensions();
			me.afterSetDimensions();
			// Labels
			me.beforeBuildLabels();
			me.buildLabels();
			me.afterBuildLabels();

			// Fit
			me.beforeFit();
			me.fit();
			me.afterFit();
			//
			me.afterUpdate();

			return me.minSize;

		},
		afterUpdate: noop$2,

		//

		beforeSetDimensions: noop$2,
		setDimensions: function() {
			var me = this;
			// Set the unconstrained dimension before label rotation
			if (me.isHorizontal()) {
				// Reset position before calculating rotation
				me.width = me.maxWidth;
				me.left = 0;
				me.right = me.width;
			} else {
				me.height = me.maxHeight;

				// Reset position before calculating rotation
				me.top = 0;
				me.bottom = me.height;
			}

			// Reset padding
			me.paddingLeft = 0;
			me.paddingTop = 0;
			me.paddingRight = 0;
			me.paddingBottom = 0;

			// Reset minSize
			me.minSize = {
				width: 0,
				height: 0
			};
		},
		afterSetDimensions: noop$2,

		//

		beforeBuildLabels: noop$2,
		buildLabels: noop$2,
		afterBuildLabels: noop$2,

		//

		beforeFit: noop$2,
		fit: function() {
			var me = this;
			var opts = me.options;
			var minSize = me.minSize = {};
			var isHorizontal = me.isHorizontal();
			var lineCount, textSize;

			if (!opts.display) {
				me.width = minSize.width = me.height = minSize.height = 0;
				return;
			}

			lineCount = helpers$1.isArray(opts.text) ? opts.text.length : 1;
			textSize = lineCount * helpers$1.options._parseFont(opts).lineHeight + opts.padding * 2;

			me.width = minSize.width = isHorizontal ? me.maxWidth : textSize;
			me.height = minSize.height = isHorizontal ? textSize : me.maxHeight;
		},
		afterFit: noop$2,

		// Shared Methods
		isHorizontal: function() {
			var pos = this.options.position;
			return pos === 'top' || pos === 'bottom';
		},

		// Actually draw the title block on the canvas
		draw: function() {
			var me = this;
			var ctx = me.ctx;
			var opts = me.options;

			if (!opts.display) {
				return;
			}

			var fontOpts = helpers$1.options._parseFont(opts);
			var lineHeight = fontOpts.lineHeight;
			var offset = lineHeight / 2 + opts.padding;
			var rotation = 0;
			var top = me.top;
			var left = me.left;
			var bottom = me.bottom;
			var right = me.right;
			var maxWidth, titleX, titleY;

			ctx.fillStyle = helpers$1.valueOrDefault(opts.fontColor, core_defaults.global.defaultFontColor); // render in correct colour
			ctx.font = fontOpts.string;

			// Horizontal
			if (me.isHorizontal()) {
				titleX = left + ((right - left) / 2); // midpoint of the width
				titleY = top + offset;
				maxWidth = right - left;
			} else {
				titleX = opts.position === 'left' ? left + offset : right - offset;
				titleY = top + ((bottom - top) / 2);
				maxWidth = bottom - top;
				rotation = Math.PI * (opts.position === 'left' ? -0.5 : 0.5);
			}

			ctx.save();
			ctx.translate(titleX, titleY);
			ctx.rotate(rotation);
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

			var text = opts.text;
			if (helpers$1.isArray(text)) {
				var y = 0;
				for (var i = 0; i < text.length; ++i) {
					ctx.fillText(text[i], 0, y, maxWidth);
					y += lineHeight;
				}
			} else {
				ctx.fillText(text, 0, 0, maxWidth);
			}

			ctx.restore();
		}
	});

	function createNewTitleBlockAndAttach(chart, titleOpts) {
		var title = new Title({
			ctx: chart.ctx,
			options: titleOpts,
			chart: chart
		});

		core_layouts.configure(chart, title, titleOpts);
		core_layouts.addBox(chart, title);
		chart.titleBlock = title;
	}

	var plugin_title = {
		id: 'title',

		/**
		 * Backward compatibility: since 2.1.5, the title is registered as a plugin, making
		 * Chart.Title obsolete. To avoid a breaking change, we export the Title as part of
		 * the plugin, which one will be re-exposed in the chart.js file.
		 * https://github.com/chartjs/Chart.js/pull/2640
		 * @private
		 */
		_element: Title,

		beforeInit: function(chart) {
			var titleOpts = chart.options.title;

			if (titleOpts) {
				createNewTitleBlockAndAttach(chart, titleOpts);
			}
		},

		beforeUpdate: function(chart) {
			var titleOpts = chart.options.title;
			var titleBlock = chart.titleBlock;

			if (titleOpts) {
				helpers$1.mergeIf(titleOpts, core_defaults.global.title);

				if (titleBlock) {
					core_layouts.configure(chart, titleBlock, titleOpts);
					titleBlock.options = titleOpts;
				} else {
					createNewTitleBlockAndAttach(chart, titleOpts);
				}
			} else if (titleBlock) {
				core_layouts.removeBox(chart, titleBlock);
				delete chart.titleBlock;
			}
		}
	};

	var plugins = {};
	var filler = plugin_filler;
	var legend = plugin_legend;
	var title = plugin_title;
	plugins.filler = filler;
	plugins.legend = legend;
	plugins.title = title;

	/**
	 * @namespace Chart
	 */


	core_controller.helpers = helpers$1;

	// @todo dispatch these helpers into appropriated helpers/helpers.* file and write unit tests!
	core_helpers();

	core_controller._adapters = core_adapters;
	core_controller.Animation = core_animation;
	core_controller.animationService = core_animations;
	core_controller.controllers = controllers;
	core_controller.DatasetController = core_datasetController;
	core_controller.defaults = core_defaults;
	core_controller.Element = core_element;
	core_controller.elements = elements;
	core_controller.Interaction = core_interaction;
	core_controller.layouts = core_layouts;
	core_controller.platform = platform;
	core_controller.plugins = core_plugins;
	core_controller.Scale = core_scale;
	core_controller.scaleService = core_scaleService;
	core_controller.Ticks = core_ticks;
	core_controller.Tooltip = core_tooltip;

	// Register built-in scales

	core_controller.helpers.each(scales, function(scale, type) {
		core_controller.scaleService.registerScaleType(type, scale, scale._defaults);
	});

	// Load to register built-in adapters (as side effects)


	// Loading built-in plugins

	for (var k in plugins) {
		if (plugins.hasOwnProperty(k)) {
			core_controller.plugins.register(plugins[k]);
		}
	}

	core_controller.platform.initialize();

	var src = core_controller;
	if (typeof window !== 'undefined') {
		window.Chart = core_controller;
	}

	// DEPRECATIONS

	/**
	 * Provided for backward compatibility, not available anymore
	 * @namespace Chart.Chart
	 * @deprecated since version 2.8.0
	 * @todo remove at version 3
	 * @private
	 */
	core_controller.Chart = core_controller;

	/**
	 * Provided for backward compatibility, not available anymore
	 * @namespace Chart.Legend
	 * @deprecated since version 2.1.5
	 * @todo remove at version 3
	 * @private
	 */
	core_controller.Legend = plugins.legend._element;

	/**
	 * Provided for backward compatibility, not available anymore
	 * @namespace Chart.Title
	 * @deprecated since version 2.1.5
	 * @todo remove at version 3
	 * @private
	 */
	core_controller.Title = plugins.title._element;

	/**
	 * Provided for backward compatibility, use Chart.plugins instead
	 * @namespace Chart.pluginService
	 * @deprecated since version 2.1.5
	 * @todo remove at version 3
	 * @private
	 */
	core_controller.pluginService = core_controller.plugins;

	/**
	 * Provided for backward compatibility, inheriting from Chart.PlugingBase has no
	 * effect, instead simply create/register plugins via plain JavaScript objects.
	 * @interface Chart.PluginBase
	 * @deprecated since version 2.5.0
	 * @todo remove at version 3
	 * @private
	 */
	core_controller.PluginBase = core_controller.Element.extend({});

	/**
	 * Provided for backward compatibility, use Chart.helpers.canvas instead.
	 * @namespace Chart.canvasHelpers
	 * @deprecated since version 2.6.0
	 * @todo remove at version 3
	 * @private
	 */
	core_controller.canvasHelpers = core_controller.helpers.canvas;

	/**
	 * Provided for backward compatibility, use Chart.layouts instead.
	 * @namespace Chart.layoutService
	 * @deprecated since version 2.7.3
	 * @todo remove at version 3
	 * @private
	 */
	core_controller.layoutService = core_controller.layouts;

	/**
	 * Provided for backward compatibility, not available anymore.
	 * @namespace Chart.LinearScaleBase
	 * @deprecated since version 2.8
	 * @todo remove at version 3
	 * @private
	 */
	core_controller.LinearScaleBase = scale_linearbase;

	/**
	 * Provided for backward compatibility, instead we should create a new Chart
	 * by setting the type in the config (`new Chart(id, {type: '{chart-type}'}`).
	 * @deprecated since version 2.8.0
	 * @todo remove at version 3
	 */
	core_controller.helpers.each(
		[
			'Bar',
			'Bubble',
			'Doughnut',
			'Line',
			'PolarArea',
			'Radar',
			'Scatter'
		],
		function(klass) {
			core_controller[klass] = function(ctx, cfg) {
				return new core_controller(ctx, core_controller.helpers.merge(cfg || {}, {
					type: klass.charAt(0).toLowerCase() + klass.slice(1)
				}));
			};
		}
	);

	return src;

	})));

	/**
	 * --------------------------------------------------------------------------
	 * Custom Tooltips for Chart.js (vv2.0.0-beta.0): custom-tooltips.js
	 * Licensed under MIT (https://coreui.io/plugins/chart.js)
	 * --------------------------------------------------------------------------
	 */
	function customTooltips(tooltipModel) {
	  var _this = this;

	  // Add unique id if not exist
	  var _setCanvasId = function _setCanvasId() {
	    var _idMaker = function _idMaker() {
	      var _hex = 16;
	      var _multiplier = 0x10000;
	      return ((1 + Math.random()) * _multiplier | 0).toString(_hex);
	    };

	    var _canvasId = "_canvas-" + (_idMaker() + _idMaker());

	    _this._chart.canvas.id = _canvasId;
	    return _canvasId;
	  };

	  var ClassName = {
	    ABOVE: 'c-above',
	    BELOW: 'c-below',
	    CHARTJS_TOOLTIP: 'c-chartjs-tooltip',
	    NO_TRANSFORM: 'c-no-transform',
	    TOOLTIP_BODY: 'c-tooltip-body',
	    TOOLTIP_BODY_ITEM: 'c-tooltip-body-item',
	    TOOLTIP_BODY_ITEM_COLOR: 'c-tooltip-body-item-color',
	    TOOLTIP_BODY_ITEM_LABEL: 'c-tooltip-body-item-label',
	    TOOLTIP_BODY_ITEM_VALUE: 'c-tooltip-body-item-value',
	    TOOLTIP_HEADER: 'c-tooltip-header',
	    TOOLTIP_HEADER_ITEM: 'c-tooltip-header-item'
	  };
	  var Selector = {
	    DIV: 'div',
	    SPAN: 'span',
	    TOOLTIP: (this._chart.canvas.id || _setCanvasId()) + "-tooltip"
	  };
	  var tooltip = document.getElementById(Selector.TOOLTIP);

	  if (!tooltip) {
	    tooltip = document.createElement('div');
	    tooltip.id = Selector.TOOLTIP;
	    tooltip.className = ClassName.CHARTJS_TOOLTIP;

	    this._chart.canvas.parentNode.appendChild(tooltip);
	  } // Hide if no tooltip


	  if (tooltipModel.opacity === 0) {
	    tooltip.style.opacity = 0;
	    return;
	  } // Set caret Position


	  tooltip.classList.remove(ClassName.ABOVE, ClassName.BELOW, ClassName.NO_TRANSFORM);

	  if (tooltipModel.yAlign) {
	    tooltip.classList.add(tooltipModel.yAlign);
	  } else {
	    tooltip.classList.add(ClassName.NO_TRANSFORM);
	  } // Set Text


	  if (tooltipModel.body) {
	    var titleLines = tooltipModel.title || [];
	    var tooltipHeader = document.createElement(Selector.DIV);
	    tooltipHeader.className = ClassName.TOOLTIP_HEADER;
	    titleLines.forEach(function (title) {
	      var tooltipHeaderTitle = document.createElement(Selector.DIV);
	      tooltipHeaderTitle.className = ClassName.TOOLTIP_HEADER_ITEM;
	      tooltipHeaderTitle.innerHTML = title;
	      tooltipHeader.appendChild(tooltipHeaderTitle);
	    });
	    var tooltipBody = document.createElement(Selector.DIV);
	    tooltipBody.className = ClassName.TOOLTIP_BODY;
	    var tooltipBodyItems = tooltipModel.body.map(function (item) {
	      return item.lines;
	    });
	    tooltipBodyItems.forEach(function (item, i) {
	      var tooltipBodyItem = document.createElement(Selector.DIV);
	      tooltipBodyItem.className = ClassName.TOOLTIP_BODY_ITEM;
	      var colors = tooltipModel.labelColors[i];
	      var tooltipBodyItemColor = document.createElement(Selector.SPAN);
	      tooltipBodyItemColor.className = ClassName.TOOLTIP_BODY_ITEM_COLOR;
	      tooltipBodyItemColor.style.backgroundColor = colors.backgroundColor;
	      tooltipBodyItem.appendChild(tooltipBodyItemColor);

	      if (item[0].split(':').length > 1) {
	        var tooltipBodyItemLabel = document.createElement(Selector.SPAN);
	        tooltipBodyItemLabel.className = ClassName.TOOLTIP_BODY_ITEM_LABEL;
	        tooltipBodyItemLabel.innerHTML = item[0].split(': ')[0];
	        tooltipBodyItem.appendChild(tooltipBodyItemLabel);
	        var tooltipBodyItemValue = document.createElement(Selector.SPAN);
	        tooltipBodyItemValue.className = ClassName.TOOLTIP_BODY_ITEM_VALUE;
	        tooltipBodyItemValue.innerHTML = item[0].split(': ').pop();
	        tooltipBodyItem.appendChild(tooltipBodyItemValue);
	      } else {
	        var _tooltipBodyItemValue = document.createElement(Selector.SPAN);

	        _tooltipBodyItemValue.className = ClassName.TOOLTIP_BODY_ITEM_VALUE;
	        _tooltipBodyItemValue.innerHTML = item[0];
	        tooltipBodyItem.appendChild(_tooltipBodyItemValue);
	      }

	      tooltipBody.appendChild(tooltipBodyItem);
	    });
	    tooltip.innerHTML = '';
	    tooltip.appendChild(tooltipHeader);
	    tooltip.appendChild(tooltipBody);
	  }

	  var position = this._chart.canvas.getBoundingClientRect();

	  var positionY = this._chart.canvas.offsetTop;
	  var positionX = this._chart.canvas.offsetLeft;
	  var positionLeft = positionX + tooltipModel.caretX;
	  var positionTop = positionY + tooltipModel.caretY; // eslint-disable-next-line

	  var halfWidth = tooltipModel.width / 2;

	  if (positionLeft + halfWidth > position.width) {
	    positionLeft -= halfWidth;
	  } else if (positionLeft < halfWidth) {
	    positionLeft += halfWidth;
	  } // Display, position, and set styles for font


	  tooltip.style.opacity = 1;
	  tooltip.style.left = positionLeft + "px";
	  tooltip.style.top = positionTop + "px";
	}

	/**
	 * --------------------------------------------------------------------------
	 * Custom Tooltips for Chart.js (vv2.0.0-beta.0): index.umd.js
	 * Licensed under MIT (https://github.com/@coreui/coreui-chartjs/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	var index_umd = {
	  customTooltips: customTooltips
	};

	return index_umd;

})));
//# sourceMappingURL=coreui-chartjs.bundle.js.map

/*!
 * sweetalert2 v7.11.0
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Sweetalert2 = factory());
}(this, (function () { 'use strict';

var styles = "body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-actions {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    height: 2.2em; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-loading {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-input {\n    height: 2em;\n    margin: .3125em auto;\n    font-size: 1em; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-validationerror {\n    font-size: 1em; }\n\nbody.swal2-toast-shown > .swal2-container {\n  position: fixed;\n  background-color: transparent; }\n  body.swal2-toast-shown > .swal2-container.swal2-shown {\n    background-color: transparent; }\n  body.swal2-toast-shown > .swal2-container.swal2-top {\n    top: 0;\n    right: auto;\n    bottom: auto;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-top-end, body.swal2-toast-shown > .swal2-container.swal2-top-right {\n    top: 0;\n    right: 0;\n    bottom: auto;\n    left: auto; }\n  body.swal2-toast-shown > .swal2-container.swal2-top-start, body.swal2-toast-shown > .swal2-container.swal2-top-left {\n    top: 0;\n    right: auto;\n    bottom: auto;\n    left: 0; }\n  body.swal2-toast-shown > .swal2-container.swal2-center-start, body.swal2-toast-shown > .swal2-container.swal2-center-left {\n    top: 50%;\n    right: auto;\n    bottom: auto;\n    left: 0;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-center {\n    top: 50%;\n    right: auto;\n    bottom: auto;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-center-end, body.swal2-toast-shown > .swal2-container.swal2-center-right {\n    top: 50%;\n    right: 0;\n    bottom: auto;\n    left: auto;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-bottom-start, body.swal2-toast-shown > .swal2-container.swal2-bottom-left {\n    top: auto;\n    right: auto;\n    bottom: 0;\n    left: 0; }\n  body.swal2-toast-shown > .swal2-container.swal2-bottom {\n    top: auto;\n    right: auto;\n    bottom: 0;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-bottom-end, body.swal2-toast-shown > .swal2-container.swal2-bottom-right {\n    top: auto;\n    right: 0;\n    bottom: 0;\n    left: auto; }\n\n.swal2-popup.swal2-toast {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: auto;\n  padding: 0.625em;\n  -webkit-box-shadow: 0 0 10px #d9d9d9;\n          box-shadow: 0 0 10px #d9d9d9;\n  overflow-y: hidden; }\n  .swal2-popup.swal2-toast .swal2-header {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n  .swal2-popup.swal2-toast .swal2-title {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    margin: 0 .6em;\n    font-size: 1em; }\n  .swal2-popup.swal2-toast .swal2-close {\n    position: initial; }\n  .swal2-popup.swal2-toast .swal2-content {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    font-size: 1em; }\n  .swal2-popup.swal2-toast .swal2-icon {\n    width: 32px;\n    min-width: 32px;\n    height: 32px;\n    margin: 0; }\n    .swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring {\n      width: 32px;\n      height: 32px; }\n    .swal2-popup.swal2-toast .swal2-icon.swal2-info, .swal2-popup.swal2-toast .swal2-icon.swal2-warning, .swal2-popup.swal2-toast .swal2-icon.swal2-question {\n      font-size: 26px;\n      line-height: 32px; }\n    .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n      top: 14px;\n      width: 22px; }\n      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n        left: 5px; }\n      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n        right: 5px; }\n  .swal2-popup.swal2-toast .swal2-actions {\n    height: auto;\n    margin: 0 .3125em; }\n  .swal2-popup.swal2-toast .swal2-styled {\n    margin: 0 .3125em;\n    padding: .3125em .625em;\n    font-size: 1em; }\n    .swal2-popup.swal2-toast .swal2-styled:focus {\n      -webkit-box-shadow: 0 0 0 1px #fff, 0 0 0 2px rgba(50, 100, 150, 0.4);\n              box-shadow: 0 0 0 1px #fff, 0 0 0 2px rgba(50, 100, 150, 0.4); }\n  .swal2-popup.swal2-toast .swal2-success {\n    border-color: #a5dc86; }\n    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'] {\n      position: absolute;\n      width: 32px;\n      height: 45px;\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg);\n      border-radius: 50%; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n        top: -4px;\n        left: -15px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n        -webkit-transform-origin: 32px 32px;\n                transform-origin: 32px 32px;\n        border-radius: 64px 0 0 64px; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n        top: -4px;\n        left: 15px;\n        -webkit-transform-origin: 0 32px;\n                transform-origin: 0 32px;\n        border-radius: 0 64px 64px 0; }\n    .swal2-popup.swal2-toast .swal2-success .swal2-success-ring {\n      width: 32px;\n      height: 32px; }\n    .swal2-popup.swal2-toast .swal2-success .swal2-success-fix {\n      top: 0;\n      left: 7px;\n      width: 7px;\n      height: 43px; }\n    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'] {\n      height: 5px; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='tip'] {\n        top: 18px;\n        left: 3px;\n        width: 12px; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='long'] {\n        top: 15px;\n        right: 3px;\n        width: 22px; }\n  .swal2-popup.swal2-toast.swal2-show {\n    -webkit-animation: showSweetToast .5s;\n            animation: showSweetToast .5s; }\n  .swal2-popup.swal2-toast.swal2-hide {\n    -webkit-animation: hideSweetToast .2s forwards;\n            animation: hideSweetToast .2s forwards; }\n  .swal2-popup.swal2-toast .swal2-animate-success-line-tip {\n    -webkit-animation: animate-toast-success-tip .75s;\n            animation: animate-toast-success-tip .75s; }\n  .swal2-popup.swal2-toast .swal2-animate-success-line-long {\n    -webkit-animation: animate-toast-success-long .75s;\n            animation: animate-toast-success-long .75s; }\n\n@-webkit-keyframes showSweetToast {\n  0% {\n    -webkit-transform: translateY(-10px) rotateZ(2deg);\n            transform: translateY(-10px) rotateZ(2deg);\n    opacity: 0; }\n  33% {\n    -webkit-transform: translateY(0) rotateZ(-2deg);\n            transform: translateY(0) rotateZ(-2deg);\n    opacity: .5; }\n  66% {\n    -webkit-transform: translateY(5px) rotateZ(2deg);\n            transform: translateY(5px) rotateZ(2deg);\n    opacity: .7; }\n  100% {\n    -webkit-transform: translateY(0) rotateZ(0);\n            transform: translateY(0) rotateZ(0);\n    opacity: 1; } }\n\n@keyframes showSweetToast {\n  0% {\n    -webkit-transform: translateY(-10px) rotateZ(2deg);\n            transform: translateY(-10px) rotateZ(2deg);\n    opacity: 0; }\n  33% {\n    -webkit-transform: translateY(0) rotateZ(-2deg);\n            transform: translateY(0) rotateZ(-2deg);\n    opacity: .5; }\n  66% {\n    -webkit-transform: translateY(5px) rotateZ(2deg);\n            transform: translateY(5px) rotateZ(2deg);\n    opacity: .7; }\n  100% {\n    -webkit-transform: translateY(0) rotateZ(0);\n            transform: translateY(0) rotateZ(0);\n    opacity: 1; } }\n\n@-webkit-keyframes hideSweetToast {\n  0% {\n    opacity: 1; }\n  33% {\n    opacity: .5; }\n  100% {\n    -webkit-transform: rotateZ(1deg);\n            transform: rotateZ(1deg);\n    opacity: 0; } }\n\n@keyframes hideSweetToast {\n  0% {\n    opacity: 1; }\n  33% {\n    opacity: .5; }\n  100% {\n    -webkit-transform: rotateZ(1deg);\n            transform: rotateZ(1deg);\n    opacity: 0; } }\n\n@-webkit-keyframes animate-toast-success-tip {\n  0% {\n    top: 9px;\n    left: 1px;\n    width: 0; }\n  54% {\n    top: 2px;\n    left: 2px;\n    width: 0; }\n  70% {\n    top: 10px;\n    left: -4px;\n    width: 26px; }\n  84% {\n    top: 17px;\n    left: 12px;\n    width: 8px; }\n  100% {\n    top: 18px;\n    left: 3px;\n    width: 12px; } }\n\n@keyframes animate-toast-success-tip {\n  0% {\n    top: 9px;\n    left: 1px;\n    width: 0; }\n  54% {\n    top: 2px;\n    left: 2px;\n    width: 0; }\n  70% {\n    top: 10px;\n    left: -4px;\n    width: 26px; }\n  84% {\n    top: 17px;\n    left: 12px;\n    width: 8px; }\n  100% {\n    top: 18px;\n    left: 3px;\n    width: 12px; } }\n\n@-webkit-keyframes animate-toast-success-long {\n  0% {\n    top: 26px;\n    right: 22px;\n    width: 0; }\n  65% {\n    top: 20px;\n    right: 15px;\n    width: 0; }\n  84% {\n    top: 15px;\n    right: 0;\n    width: 18px; }\n  100% {\n    top: 15px;\n    right: 3px;\n    width: 22px; } }\n\n@keyframes animate-toast-success-long {\n  0% {\n    top: 26px;\n    right: 22px;\n    width: 0; }\n  65% {\n    top: 20px;\n    right: 15px;\n    width: 0; }\n  84% {\n    top: 15px;\n    right: 0;\n    width: 18px; }\n  100% {\n    top: 15px;\n    right: 3px;\n    width: 22px; } }\n\nhtml.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown),\nbody.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) {\n  height: auto;\n  overflow-y: hidden; }\n\nbody.swal2-iosfix {\n  position: fixed;\n  right: 0;\n  left: 0; }\n\nbody.swal2-no-backdrop .swal2-shown {\n  top: auto;\n  right: auto;\n  bottom: auto;\n  left: auto;\n  background-color: transparent; }\n  body.swal2-no-backdrop .swal2-shown > .swal2-modal {\n    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);\n            box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); }\n  body.swal2-no-backdrop .swal2-shown.swal2-top {\n    top: 0;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-top-start, body.swal2-no-backdrop .swal2-shown.swal2-top-left {\n    top: 0;\n    left: 0; }\n  body.swal2-no-backdrop .swal2-shown.swal2-top-end, body.swal2-no-backdrop .swal2-shown.swal2-top-right {\n    top: 0;\n    right: 0; }\n  body.swal2-no-backdrop .swal2-shown.swal2-center {\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-center-start, body.swal2-no-backdrop .swal2-shown.swal2-center-left {\n    top: 50%;\n    left: 0;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-center-end, body.swal2-no-backdrop .swal2-shown.swal2-center-right {\n    top: 50%;\n    right: 0;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-bottom {\n    bottom: 0;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-bottom-start, body.swal2-no-backdrop .swal2-shown.swal2-bottom-left {\n    bottom: 0;\n    left: 0; }\n  body.swal2-no-backdrop .swal2-shown.swal2-bottom-end, body.swal2-no-backdrop .swal2-shown.swal2-bottom-right {\n    right: 0;\n    bottom: 0; }\n\n.swal2-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 10px;\n  background-color: transparent;\n  z-index: 1060;\n  overflow-x: hidden; }\n  .swal2-container.swal2-top {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start; }\n  .swal2-container.swal2-top-start, .swal2-container.swal2-top-left {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .swal2-container.swal2-top-end, .swal2-container.swal2-top-right {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  .swal2-container.swal2-center {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  .swal2-container.swal2-center-start, .swal2-container.swal2-center-left {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .swal2-container.swal2-center-end, .swal2-container.swal2-center-right {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  .swal2-container.swal2-bottom {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end; }\n  .swal2-container.swal2-bottom-start, .swal2-container.swal2-bottom-left {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .swal2-container.swal2-bottom-end, .swal2-container.swal2-bottom-right {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  .swal2-container.swal2-grow-fullscreen > .swal2-modal {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  .swal2-container.swal2-grow-row > .swal2-modal {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -ms-flex-line-pack: center;\n        align-content: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  .swal2-container.swal2-grow-column {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n    .swal2-container.swal2-grow-column.swal2-top, .swal2-container.swal2-grow-column.swal2-center, .swal2-container.swal2-grow-column.swal2-bottom {\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .swal2-container.swal2-grow-column.swal2-top-start, .swal2-container.swal2-grow-column.swal2-center-start, .swal2-container.swal2-grow-column.swal2-bottom-start, .swal2-container.swal2-grow-column.swal2-top-left, .swal2-container.swal2-grow-column.swal2-center-left, .swal2-container.swal2-grow-column.swal2-bottom-left {\n      -webkit-box-align: start;\n          -ms-flex-align: start;\n              align-items: flex-start; }\n    .swal2-container.swal2-grow-column.swal2-top-end, .swal2-container.swal2-grow-column.swal2-center-end, .swal2-container.swal2-grow-column.swal2-bottom-end, .swal2-container.swal2-grow-column.swal2-top-right, .swal2-container.swal2-grow-column.swal2-center-right, .swal2-container.swal2-grow-column.swal2-bottom-right {\n      -webkit-box-align: end;\n          -ms-flex-align: end;\n              align-items: flex-end; }\n    .swal2-container.swal2-grow-column > .swal2-modal {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      -webkit-box-flex: 1;\n          -ms-flex: 1;\n              flex: 1;\n      -ms-flex-line-pack: center;\n          align-content: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center; }\n  .swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right) > .swal2-modal {\n    margin: auto; }\n  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n    .swal2-container .swal2-modal {\n      margin: 0 !important; } }\n  .swal2-container.swal2-fade {\n    -webkit-transition: background-color .1s;\n    transition: background-color .1s; }\n  .swal2-container.swal2-shown {\n    background-color: rgba(0, 0, 0, 0.4); }\n\n.swal2-popup {\n  display: none;\n  position: relative;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 32em;\n  max-width: 100%;\n  padding: 1.25em;\n  border-radius: .3125em;\n  background-color: #fff;\n  font-family: inherit;\n  font-size: 1rem;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  overflow-x: hidden;\n  overflow-y: auto; }\n  .swal2-popup:focus {\n    outline: none; }\n  .swal2-popup.swal2-loading {\n    overflow-y: hidden; }\n  .swal2-popup .swal2-header {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  .swal2-popup .swal2-title {\n    display: block;\n    position: relative;\n    margin: 0 0 .4em;\n    padding: 0;\n    color: #595959;\n    font-size: 1.875em;\n    font-weight: 600;\n    text-align: center;\n    text-transform: none;\n    word-wrap: break-word; }\n  .swal2-popup .swal2-actions {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin-top: 1.25em; }\n    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled[disabled] {\n      opacity: .4; }\n    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:hover {\n      background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.1)), to(rgba(0, 0, 0, 0.1)));\n      background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)); }\n    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:active {\n      background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.2)), to(rgba(0, 0, 0, 0.2)));\n      background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)); }\n    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-confirm {\n      width: 2.5em;\n      height: 2.5em;\n      margin: .46875em;\n      padding: 0;\n      border: .25em solid transparent;\n      border-radius: 100%;\n      border-color: transparent;\n      background-color: transparent !important;\n      color: transparent;\n      cursor: default;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      -webkit-animation: rotate-loading 1.5s linear 0s infinite normal;\n              animation: rotate-loading 1.5s linear 0s infinite normal;\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none; }\n    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-cancel {\n      margin-right: 30px;\n      margin-left: 30px; }\n    .swal2-popup .swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after {\n      display: inline-block;\n      width: 15px;\n      height: 15px;\n      margin-left: 5px;\n      border: 3px solid #999999;\n      border-radius: 50%;\n      border-right-color: transparent;\n      -webkit-box-shadow: 1px 1px 1px #fff;\n              box-shadow: 1px 1px 1px #fff;\n      content: '';\n      -webkit-animation: rotate-loading 1.5s linear 0s infinite normal;\n              animation: rotate-loading 1.5s linear 0s infinite normal; }\n  .swal2-popup .swal2-styled {\n    margin: 0 .3125em;\n    padding: .625em 2em;\n    border: 0;\n    border-radius: .25em;\n    color: #fff;\n    font-size: 1.0625em;\n    font-weight: 500;\n    -webkit-box-shadow: none;\n            box-shadow: none; }\n    .swal2-popup .swal2-styled:not([disabled]) {\n      cursor: pointer; }\n    .swal2-popup .swal2-styled.swal2-confirm {\n      background-color: #3085d6; }\n    .swal2-popup .swal2-styled.swal2-cancel {\n      background-color: #aaa; }\n    .swal2-popup .swal2-styled:focus {\n      outline: none;\n      -webkit-box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(50, 100, 150, 0.4);\n              box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(50, 100, 150, 0.4); }\n    .swal2-popup .swal2-styled::-moz-focus-inner {\n      border: 0; }\n  .swal2-popup .swal2-footer {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin-top: 1.25em;\n    padding-top: 1em;\n    border-top: 1px solid #eee;\n    font-size: 1em; }\n  .swal2-popup .swal2-image {\n    max-width: 100%;\n    margin: 1.25em auto; }\n  .swal2-popup .swal2-close {\n    position: absolute;\n    top: 5px;\n    right: 8px;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    width: 1.2em;\n    min-width: 1.2em;\n    height: 1.2em;\n    margin: 0;\n    padding: 0;\n    -webkit-transition: color .1s ease;\n    transition: color .1s ease;\n    border: 0;\n    background: transparent;\n    color: #cccccc;\n    font-family: serif;\n    font-size: calc(2.5em - 0.25em);\n    line-height: 1.2em;\n    cursor: pointer; }\n    .swal2-popup .swal2-close:hover {\n      color: #d55; }\n  .swal2-popup > .swal2-input,\n  .swal2-popup > .swal2-file,\n  .swal2-popup > .swal2-textarea,\n  .swal2-popup > .swal2-select,\n  .swal2-popup > .swal2-radio,\n  .swal2-popup > .swal2-checkbox {\n    display: none; }\n  .swal2-popup .swal2-content {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin: 0;\n    padding: 0;\n    color: #545454;\n    font-size: 1.125em;\n    font-weight: 300;\n    line-height: normal;\n    word-wrap: break-word; }\n  .swal2-popup #swal2-content {\n    text-align: center; }\n  .swal2-popup .swal2-input,\n  .swal2-popup .swal2-file,\n  .swal2-popup .swal2-textarea,\n  .swal2-popup .swal2-select,\n  .swal2-popup .swal2-radio,\n  .swal2-popup .swal2-checkbox {\n    margin: 1em auto; }\n  .swal2-popup .swal2-input,\n  .swal2-popup .swal2-file,\n  .swal2-popup .swal2-textarea {\n    width: 100%;\n    -webkit-transition: border-color .3s, -webkit-box-shadow .3s;\n    transition: border-color .3s, -webkit-box-shadow .3s;\n    transition: border-color .3s, box-shadow .3s;\n    transition: border-color .3s, box-shadow .3s, -webkit-box-shadow .3s;\n    border: 1px solid #d9d9d9;\n    border-radius: 3px;\n    font-size: 1.125em;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06);\n            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06);\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n    .swal2-popup .swal2-input.swal2-inputerror,\n    .swal2-popup .swal2-file.swal2-inputerror,\n    .swal2-popup .swal2-textarea.swal2-inputerror {\n      border-color: #f27474 !important;\n      -webkit-box-shadow: 0 0 2px #f27474 !important;\n              box-shadow: 0 0 2px #f27474 !important; }\n    .swal2-popup .swal2-input:focus,\n    .swal2-popup .swal2-file:focus,\n    .swal2-popup .swal2-textarea:focus {\n      border: 1px solid #b4dbed;\n      outline: none;\n      -webkit-box-shadow: 0 0 3px #c4e6f5;\n              box-shadow: 0 0 3px #c4e6f5; }\n    .swal2-popup .swal2-input::-webkit-input-placeholder,\n    .swal2-popup .swal2-file::-webkit-input-placeholder,\n    .swal2-popup .swal2-textarea::-webkit-input-placeholder {\n      color: #cccccc; }\n    .swal2-popup .swal2-input:-ms-input-placeholder,\n    .swal2-popup .swal2-file:-ms-input-placeholder,\n    .swal2-popup .swal2-textarea:-ms-input-placeholder {\n      color: #cccccc; }\n    .swal2-popup .swal2-input::-ms-input-placeholder,\n    .swal2-popup .swal2-file::-ms-input-placeholder,\n    .swal2-popup .swal2-textarea::-ms-input-placeholder {\n      color: #cccccc; }\n    .swal2-popup .swal2-input::placeholder,\n    .swal2-popup .swal2-file::placeholder,\n    .swal2-popup .swal2-textarea::placeholder {\n      color: #cccccc; }\n  .swal2-popup .swal2-range input {\n    width: 80%; }\n  .swal2-popup .swal2-range output {\n    width: 20%;\n    font-weight: 600;\n    text-align: center; }\n  .swal2-popup .swal2-range input,\n  .swal2-popup .swal2-range output {\n    height: 2.625em;\n    margin: 1em auto;\n    padding: 0;\n    font-size: 1.125em;\n    line-height: 2.625em; }\n  .swal2-popup .swal2-input {\n    height: 2.625em;\n    padding: 0 .75em; }\n    .swal2-popup .swal2-input[type='number'] {\n      max-width: 10em; }\n  .swal2-popup .swal2-file {\n    font-size: 1.125em; }\n  .swal2-popup .swal2-textarea {\n    height: 6.75em;\n    padding: .75em; }\n  .swal2-popup .swal2-select {\n    min-width: 50%;\n    max-width: 100%;\n    padding: .375em .625em;\n    color: #545454;\n    font-size: 1.125em; }\n  .swal2-popup .swal2-radio,\n  .swal2-popup .swal2-checkbox {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n    .swal2-popup .swal2-radio label,\n    .swal2-popup .swal2-checkbox label {\n      margin: 0 .6em;\n      font-size: 1.125em; }\n    .swal2-popup .swal2-radio input,\n    .swal2-popup .swal2-checkbox input {\n      margin: 0 .4em; }\n  .swal2-popup .swal2-validationerror {\n    display: none;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    padding: .625em;\n    background-color: #f0f0f0;\n    color: gray;\n    font-size: 1em;\n    font-weight: 300;\n    overflow: hidden; }\n    .swal2-popup .swal2-validationerror::before {\n      display: inline-block;\n      width: 1.5em;\n      height: 1.5em;\n      margin: 0 .625em;\n      border-radius: 50%;\n      background-color: #ea7d7d;\n      color: #fff;\n      font-weight: 600;\n      line-height: 1.5em;\n      text-align: center;\n      content: '!'; }\n\n@supports (-ms-accelerator: true) {\n  .swal2-range input {\n    width: 100% !important; }\n  .swal2-range output {\n    display: none; } }\n\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  .swal2-range input {\n    width: 100% !important; }\n  .swal2-range output {\n    display: none; } }\n\n.swal2-icon {\n  position: relative;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 80px;\n  height: 80px;\n  margin: 1.25em auto 1.875em;\n  border: 4px solid transparent;\n  border-radius: 50%;\n  line-height: 80px;\n  cursor: default;\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n  .swal2-icon.swal2-error {\n    border-color: #f27474; }\n    .swal2-icon.swal2-error .swal2-x-mark {\n      position: relative;\n      -webkit-box-flex: 1;\n          -ms-flex-positive: 1;\n              flex-grow: 1; }\n    .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n      display: block;\n      position: absolute;\n      top: 37px;\n      width: 47px;\n      height: 5px;\n      border-radius: 2px;\n      background-color: #f27474; }\n      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n        left: 17px;\n        -webkit-transform: rotate(45deg);\n                transform: rotate(45deg); }\n      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n        right: 16px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg); }\n  .swal2-icon.swal2-warning, .swal2-icon.swal2-info, .swal2-icon.swal2-question {\n    margin: .333333em auto .5em;\n    font-family: inherit;\n    font-size: 3.75em; }\n  .swal2-icon.swal2-warning {\n    border-color: #facea8;\n    color: #f8bb86; }\n  .swal2-icon.swal2-info {\n    border-color: #9de0f6;\n    color: #3fc3ee; }\n  .swal2-icon.swal2-question {\n    border-color: #c9dae1;\n    color: #87adbd; }\n  .swal2-icon.swal2-success {\n    border-color: #a5dc86; }\n    .swal2-icon.swal2-success [class^='swal2-success-circular-line'] {\n      position: absolute;\n      width: 60px;\n      height: 120px;\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg);\n      border-radius: 50%; }\n      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n        top: -7px;\n        left: -33px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n        -webkit-transform-origin: 60px 60px;\n                transform-origin: 60px 60px;\n        border-radius: 120px 0 0 120px; }\n      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n        top: -11px;\n        left: 30px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n        -webkit-transform-origin: 0 60px;\n                transform-origin: 0 60px;\n        border-radius: 0 120px 120px 0; }\n    .swal2-icon.swal2-success .swal2-success-ring {\n      position: absolute;\n      top: -4px;\n      left: -4px;\n      width: 80px;\n      height: 80px;\n      border: 4px solid rgba(165, 220, 134, 0.2);\n      border-radius: 50%;\n      z-index: 2;\n      -webkit-box-sizing: content-box;\n              box-sizing: content-box; }\n    .swal2-icon.swal2-success .swal2-success-fix {\n      position: absolute;\n      top: 8px;\n      left: 26px;\n      width: 7px;\n      height: 90px;\n      -webkit-transform: rotate(-45deg);\n              transform: rotate(-45deg);\n      z-index: 1; }\n    .swal2-icon.swal2-success [class^='swal2-success-line'] {\n      display: block;\n      position: absolute;\n      height: 5px;\n      border-radius: 2px;\n      background-color: #a5dc86;\n      z-index: 2; }\n      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='tip'] {\n        top: 46px;\n        left: 14px;\n        width: 25px;\n        -webkit-transform: rotate(45deg);\n                transform: rotate(45deg); }\n      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='long'] {\n        top: 38px;\n        right: 8px;\n        width: 47px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg); }\n\n.swal2-progresssteps {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin: 0 0 1.25em;\n  padding: 0;\n  font-weight: 600; }\n  .swal2-progresssteps li {\n    display: inline-block;\n    position: relative; }\n  .swal2-progresssteps .swal2-progresscircle {\n    width: 2em;\n    height: 2em;\n    border-radius: 2em;\n    background: #3085d6;\n    color: #fff;\n    line-height: 2em;\n    text-align: center;\n    z-index: 20; }\n    .swal2-progresssteps .swal2-progresscircle:first-child {\n      margin-left: 0; }\n    .swal2-progresssteps .swal2-progresscircle:last-child {\n      margin-right: 0; }\n    .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep {\n      background: #3085d6; }\n      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progresscircle {\n        background: #add8e6; }\n      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progressline {\n        background: #add8e6; }\n  .swal2-progresssteps .swal2-progressline {\n    width: 2.5em;\n    height: .4em;\n    margin: 0 -1px;\n    background: #3085d6;\n    z-index: 10; }\n\n[class^='swal2'] {\n  -webkit-tap-highlight-color: transparent; }\n\n@-webkit-keyframes showSweetAlert {\n  0% {\n    -webkit-transform: scale(0.7);\n            transform: scale(0.7); }\n  45% {\n    -webkit-transform: scale(1.05);\n            transform: scale(1.05); }\n  80% {\n    -webkit-transform: scale(0.95);\n            transform: scale(0.95); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@keyframes showSweetAlert {\n  0% {\n    -webkit-transform: scale(0.7);\n            transform: scale(0.7); }\n  45% {\n    -webkit-transform: scale(1.05);\n            transform: scale(1.05); }\n  80% {\n    -webkit-transform: scale(0.95);\n            transform: scale(0.95); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@-webkit-keyframes hideSweetAlert {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; }\n  100% {\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    opacity: 0; } }\n\n@keyframes hideSweetAlert {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; }\n  100% {\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    opacity: 0; } }\n\n.swal2-show {\n  -webkit-animation: showSweetAlert .3s;\n          animation: showSweetAlert .3s; }\n  .swal2-show.swal2-noanimation {\n    -webkit-animation: none;\n            animation: none; }\n\n.swal2-hide {\n  -webkit-animation: hideSweetAlert .15s forwards;\n          animation: hideSweetAlert .15s forwards; }\n  .swal2-hide.swal2-noanimation {\n    -webkit-animation: none;\n            animation: none; }\n\n[dir='rtl'] .swal2-close {\n  right: auto;\n  left: 8px; }\n\n@-webkit-keyframes animate-success-tip {\n  0% {\n    top: 19px;\n    left: 1px;\n    width: 0; }\n  54% {\n    top: 17px;\n    left: 2px;\n    width: 0; }\n  70% {\n    top: 35px;\n    left: -6px;\n    width: 50px; }\n  84% {\n    top: 48px;\n    left: 21px;\n    width: 17px; }\n  100% {\n    top: 45px;\n    left: 14px;\n    width: 25px; } }\n\n@keyframes animate-success-tip {\n  0% {\n    top: 19px;\n    left: 1px;\n    width: 0; }\n  54% {\n    top: 17px;\n    left: 2px;\n    width: 0; }\n  70% {\n    top: 35px;\n    left: -6px;\n    width: 50px; }\n  84% {\n    top: 48px;\n    left: 21px;\n    width: 17px; }\n  100% {\n    top: 45px;\n    left: 14px;\n    width: 25px; } }\n\n@-webkit-keyframes animate-success-long {\n  0% {\n    top: 54px;\n    right: 46px;\n    width: 0; }\n  65% {\n    top: 54px;\n    right: 46px;\n    width: 0; }\n  84% {\n    top: 35px;\n    right: 0;\n    width: 55px; }\n  100% {\n    top: 38px;\n    right: 8px;\n    width: 47px; } }\n\n@keyframes animate-success-long {\n  0% {\n    top: 54px;\n    right: 46px;\n    width: 0; }\n  65% {\n    top: 54px;\n    right: 46px;\n    width: 0; }\n  84% {\n    top: 35px;\n    right: 0;\n    width: 55px; }\n  100% {\n    top: 38px;\n    right: 8px;\n    width: 47px; } }\n\n@-webkit-keyframes rotatePlaceholder {\n  0% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  5% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  12% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); }\n  100% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); } }\n\n@keyframes rotatePlaceholder {\n  0% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  5% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  12% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); }\n  100% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); } }\n\n.swal2-animate-success-line-tip {\n  -webkit-animation: animate-success-tip .75s;\n          animation: animate-success-tip .75s; }\n\n.swal2-animate-success-line-long {\n  -webkit-animation: animate-success-long .75s;\n          animation: animate-success-long .75s; }\n\n.swal2-success.swal2-animate-success-icon .swal2-success-circular-line-right {\n  -webkit-animation: rotatePlaceholder 4.25s ease-in;\n          animation: rotatePlaceholder 4.25s ease-in; }\n\n@-webkit-keyframes animate-error-icon {\n  0% {\n    -webkit-transform: rotateX(100deg);\n            transform: rotateX(100deg);\n    opacity: 0; }\n  100% {\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg);\n    opacity: 1; } }\n\n@keyframes animate-error-icon {\n  0% {\n    -webkit-transform: rotateX(100deg);\n            transform: rotateX(100deg);\n    opacity: 0; }\n  100% {\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg);\n    opacity: 1; } }\n\n.swal2-animate-error-icon {\n  -webkit-animation: animate-error-icon .5s;\n          animation: animate-error-icon .5s; }\n\n@-webkit-keyframes animate-x-mark {\n  0% {\n    margin-top: 26px;\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    opacity: 0; }\n  50% {\n    margin-top: 26px;\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    opacity: 0; }\n  80% {\n    margin-top: -6px;\n    -webkit-transform: scale(1.15);\n            transform: scale(1.15); }\n  100% {\n    margin-top: 0;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; } }\n\n@keyframes animate-x-mark {\n  0% {\n    margin-top: 26px;\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    opacity: 0; }\n  50% {\n    margin-top: 26px;\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    opacity: 0; }\n  80% {\n    margin-top: -6px;\n    -webkit-transform: scale(1.15);\n            transform: scale(1.15); }\n  100% {\n    margin-top: 0;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; } }\n\n.swal2-animate-x-mark {\n  -webkit-animation: animate-x-mark .5s;\n          animation: animate-x-mark .5s; }\n\n@-webkit-keyframes rotate-loading {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes rotate-loading {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n";

var defaultParams = {
  title: '',
  titleText: '',
  text: '',
  html: '',
  footer: '',
  type: null,
  toast: false,
  customClass: '',
  target: 'body',
  backdrop: true,
  animation: true,
  allowOutsideClick: true,
  allowEscapeKey: true,
  allowEnterKey: true,
  showConfirmButton: true,
  showCancelButton: false,
  preConfirm: null,
  confirmButtonText: 'OK',
  confirmButtonAriaLabel: '',
  confirmButtonColor: null,
  confirmButtonClass: null,
  cancelButtonText: 'Cancel',
  cancelButtonAriaLabel: '',
  cancelButtonColor: null,
  cancelButtonClass: null,
  buttonsStyling: true,
  reverseButtons: false,
  focusConfirm: true,
  focusCancel: false,
  showCloseButton: false,
  closeButtonAriaLabel: 'Close this dialog',
  showLoaderOnConfirm: false,
  imageUrl: null,
  imageWidth: null,
  imageHeight: null,
  imageAlt: '',
  imageClass: null,
  timer: null,
  width: null,
  padding: null,
  background: null,
  input: null,
  inputPlaceholder: '',
  inputValue: '',
  inputOptions: {},
  inputAutoTrim: true,
  inputClass: null,
  inputAttributes: {},
  inputValidator: null,
  grow: false,
  position: 'center',
  progressSteps: [],
  currentProgressStep: null,
  progressStepsDistance: null,
  onBeforeOpen: null,
  onOpen: null,
  onClose: null,
  useRejections: false,
  expectRejections: false
};

var deprecatedParams = ['useRejections', 'expectRejections'];

var swalPrefix = 'swal2-';

var prefix = function prefix(items) {
  var result = {};
  for (var i in items) {
    result[items[i]] = swalPrefix + items[i];
  }
  return result;
};

var swalClasses = prefix(['container', 'shown', 'iosfix', 'popup', 'modal', 'no-backdrop', 'toast', 'toast-shown', 'fade', 'show', 'hide', 'noanimation', 'close', 'title', 'header', 'content', 'actions', 'confirm', 'cancel', 'footer', 'icon', 'image', 'input', 'has-input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea', 'inputerror', 'validationerror', 'progresssteps', 'activeprogressstep', 'progresscircle', 'progressline', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen']);

var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

var consolePrefix = 'SweetAlert2:';

/**
 * Filter the unique values into a new array
 * @param arr
 */
var uniqueArray = function uniqueArray(arr) {
  var result = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var elem = _step.value;

      if (result.indexOf(elem) === -1) {
        result.push(elem);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
};

/**
 * Convert object into iterable Map
 * https://stackoverflow.com/a/36644532/1331425
 * @param obj
 */
var objectToMap = function objectToMap(obj) {
  if (obj instanceof Map) {
    return obj;
  }
  var map = new Map();
  Object.keys(obj).forEach(function (key) {
    map.set(key, obj[key]);
  });
  return map;
};

/**
 * Standardise console warnings
 * @param message
 */
var warn = function warn(message) {
  console.warn(consolePrefix + ' ' + message);
};

/**
 * Standardise console errors
 * @param message
 */
var error = function error(message) {
  console.error(consolePrefix + ' ' + message);
};

/**
 * Private global state for `warnOnce`
 * @type {Array}
 * @private
 */
var previousWarnOnceMessages = [];

/**
 * Show a console warning, but only if it hasn't already been shown
 * @param message
 */
var warnOnce = function warnOnce(message) {
  if (!(previousWarnOnceMessages.indexOf(message) !== -1)) {
    previousWarnOnceMessages.push(message);
    warn(message);
  }
};

/**
 * If `arg` is a function, call it (with no arguments or context) and return the result.
 * Otherwise, just pass the value through
 * @param arg
 */
var callIfFunction = function callIfFunction(arg) {
  return typeof arg === 'function' ? arg() : arg;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





















var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};





















var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var popupParams = _extends({}, defaultParams);
var queue = [];

var previousWindowKeyDown = void 0;
var windowOnkeydownOverridden = void 0;

/**
 * Show relevant warnings for given params
 *
 * @param params
 */
var showWarningsForParams = function showWarningsForParams(params) {
  for (var param in params) {
    if (!sweetAlert.isValidParameter(param)) {
      warn('Unknown parameter "' + param + '"');
    }
    if (sweetAlert.isDeprecatedParameter(param)) {
      warnOnce('The parameter "' + param + '" is deprecated and will be removed in the next major release.');
    }
  }
};

/**
 * Set type, text and actions on popup
 *
 * @param params
 * @returns {boolean}
 */
var setParameters = function setParameters(params) {
  // Determine if the custom target element is valid
  if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
    warn('Target parameter is not valid, defaulting to "body"');
    params.target = 'body';
  }

  var popup = void 0;
  var oldPopup = getPopup();
  var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
  // If the model target has changed, refresh the popup
  if (oldPopup && targetElement && oldPopup.parentNode !== targetElement.parentNode) {
    popup = init(params);
  } else {
    popup = oldPopup || init(params);
  }

  // Set popup width
  if (params.width) {
    popup.style.width = typeof params.width === 'number' ? params.width + 'px' : params.width;
  }

  // Set popup padding
  if (params.padding) {
    popup.style.padding = typeof params.padding === 'number' ? params.padding + 'px' : params.padding;
  }

  // Set popup background
  if (params.background) {
    popup.style.background = params.background;
  }
  var popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
  var successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');
  for (var i = 0; i < successIconParts.length; i++) {
    successIconParts[i].style.backgroundColor = popupBackgroundColor;
  }

  var container = getContainer();
  var title = getTitle();
  var content = getContent().querySelector('#' + swalClasses.content);
  var actions = getActions();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton();
  var closeButton = getCloseButton();
  var footer = getFooter();

  // Title
  if (params.titleText) {
    title.innerText = params.titleText;
  } else if (params.title) {
    title.innerHTML = params.title.split('\n').join('<br />');
  }

  if (typeof params.backdrop === 'string') {
    getContainer().style.background = params.backdrop;
  } else if (!params.backdrop) {
    addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
  }

  // Content as HTML
  if (params.html) {
    parseHtmlToContainer(params.html, content);

    // Content as plain text
  } else if (params.text) {
    content.textContent = params.text;
    show(content);
  } else {
    hide(content);
  }

  // Position
  if (params.position in swalClasses) {
    addClass(container, swalClasses[params.position]);
  } else {
    warn('The "position" parameter is not valid, defaulting to "center"');
    addClass(container, swalClasses.center);
  }

  // Grow
  if (params.grow && typeof params.grow === 'string') {
    var growClass = 'grow-' + params.grow;
    if (growClass in swalClasses) {
      addClass(container, swalClasses[growClass]);
    }
  }

  // Close button
  if (params.showCloseButton) {
    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
    show(closeButton);
  } else {
    hide(closeButton);
  }

  // Default Class
  popup.className = swalClasses.popup;
  if (params.toast) {
    addClass([document.documentElement, document.body], swalClasses['toast-shown']);
    addClass(popup, swalClasses.toast);
  } else {
    addClass(popup, swalClasses.modal);
  }

  // Custom Class
  if (params.customClass) {
    addClass(popup, params.customClass);
  }

  // Progress steps
  var progressStepsContainer = getProgressSteps();
  var currentProgressStep = parseInt(params.currentProgressStep === null ? sweetAlert.getQueueStep() : params.currentProgressStep, 10);
  if (params.progressSteps && params.progressSteps.length) {
    show(progressStepsContainer);
    empty(progressStepsContainer);
    if (currentProgressStep >= params.progressSteps.length) {
      warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    }
    params.progressSteps.forEach(function (step, index) {
      var circle = document.createElement('li');
      addClass(circle, swalClasses.progresscircle);
      circle.innerHTML = step;
      if (index === currentProgressStep) {
        addClass(circle, swalClasses.activeprogressstep);
      }
      progressStepsContainer.appendChild(circle);
      if (index !== params.progressSteps.length - 1) {
        var line = document.createElement('li');
        addClass(line, swalClasses.progressline);
        if (params.progressStepsDistance) {
          line.style.width = params.progressStepsDistance;
        }
        progressStepsContainer.appendChild(line);
      }
    });
  } else {
    hide(progressStepsContainer);
  }

  // Icon
  var icons = getIcons();
  for (var _i = 0; _i < icons.length; _i++) {
    hide(icons[_i]);
  }
  if (params.type) {
    var validType = false;
    for (var iconType in iconTypes) {
      if (params.type === iconType) {
        validType = true;
        break;
      }
    }
    if (!validType) {
      error('Unknown alert type: ' + params.type);
      return false;
    }
    var icon = popup.querySelector('.' + swalClasses.icon + '.' + iconTypes[params.type]);
    show(icon);

    // Animate icon
    if (params.animation) {
      switch (params.type) {
        case 'success':
          addClass(icon, 'swal2-animate-success-icon');
          addClass(icon.querySelector('.swal2-success-line-tip'), 'swal2-animate-success-line-tip');
          addClass(icon.querySelector('.swal2-success-line-long'), 'swal2-animate-success-line-long');
          break;
        case 'error':
          addClass(icon, 'swal2-animate-error-icon');
          addClass(icon.querySelector('.swal2-x-mark'), 'swal2-animate-x-mark');
          break;
        default:
          break;
      }
    }
  }

  // Custom image
  var image = getImage();
  if (params.imageUrl) {
    image.setAttribute('src', params.imageUrl);
    image.setAttribute('alt', params.imageAlt);
    show(image);

    if (params.imageWidth) {
      image.setAttribute('width', params.imageWidth);
    } else {
      image.removeAttribute('width');
    }

    if (params.imageHeight) {
      image.setAttribute('height', params.imageHeight);
    } else {
      image.removeAttribute('height');
    }

    image.className = swalClasses.image;
    if (params.imageClass) {
      addClass(image, params.imageClass);
    }
  } else {
    hide(image);
  }

  // Cancel button
  if (params.showCancelButton) {
    cancelButton.style.display = 'inline-block';
  } else {
    hide(cancelButton);
  }

  // Confirm button
  if (params.showConfirmButton) {
    removeStyleProperty(confirmButton, 'display');
  } else {
    hide(confirmButton);
  }

  // Actions (buttons) wrapper
  if (!params.showConfirmButton && !params.showCancelButton) {
    hide(actions);
  } else {
    show(actions);
  }

  // Edit text on confirm and cancel buttons
  confirmButton.innerHTML = params.confirmButtonText;
  cancelButton.innerHTML = params.cancelButtonText;

  // ARIA labels for confirm and cancel buttons
  confirmButton.setAttribute('aria-label', params.confirmButtonAriaLabel);
  cancelButton.setAttribute('aria-label', params.cancelButtonAriaLabel);

  // Add buttons custom classes
  confirmButton.className = swalClasses.confirm;
  addClass(confirmButton, params.confirmButtonClass);
  cancelButton.className = swalClasses.cancel;
  addClass(cancelButton, params.cancelButtonClass);

  // Buttons styling
  if (params.buttonsStyling) {
    addClass([confirmButton, cancelButton], swalClasses.styled);

    // Buttons background colors
    if (params.confirmButtonColor) {
      confirmButton.style.backgroundColor = params.confirmButtonColor;
    }
    if (params.cancelButtonColor) {
      cancelButton.style.backgroundColor = params.cancelButtonColor;
    }

    // Loading state
    var confirmButtonBackgroundColor = window.getComputedStyle(confirmButton).getPropertyValue('background-color');
    confirmButton.style.borderLeftColor = confirmButtonBackgroundColor;
    confirmButton.style.borderRightColor = confirmButtonBackgroundColor;
  } else {
    removeClass([confirmButton, cancelButton], swalClasses.styled);

    confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = '';
    cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = '';
  }

  // Footer
  parseHtmlToContainer(params.footer, footer);

  // CSS animation
  if (params.animation === true) {
    removeClass(popup, swalClasses.noanimation);
  } else {
    addClass(popup, swalClasses.noanimation);
  }

  // showLoaderOnConfirm && preConfirm
  if (params.showLoaderOnConfirm && !params.preConfirm) {
    warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
  }
};

/**
 * Animations
 *
 * @param animation
 * @param onBeforeOpen
 * @param onComplete
 */
var openPopup = function openPopup(animation, onBeforeOpen, onComplete) {
  var container = getContainer();
  var popup = getPopup();

  if (onBeforeOpen !== null && typeof onBeforeOpen === 'function') {
    onBeforeOpen(popup);
  }

  if (animation) {
    addClass(popup, swalClasses.show);
    addClass(container, swalClasses.fade);
    removeClass(popup, swalClasses.hide);
  } else {
    removeClass(popup, swalClasses.fade);
  }
  show(popup);

  // scrolling is 'hidden' until animation is done, after that 'auto'
  container.style.overflowY = 'hidden';
  if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
    popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
      popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
      container.style.overflowY = 'auto';
    });
  } else {
    container.style.overflowY = 'auto';
  }

  addClass([document.documentElement, document.body, container], swalClasses.shown);
  if (isModal()) {
    fixScrollbar();
    iOSfix();
  }
  states.previousActiveElement = document.activeElement;
  if (onComplete !== null && typeof onComplete === 'function') {
    setTimeout(function () {
      onComplete(popup);
    });
  }
};

var fixScrollbar = function fixScrollbar() {
  // for queues, do not do this more than once
  if (states.previousBodyPadding !== null) {
    return;
  }
  // if the body has overflow
  if (document.body.scrollHeight > window.innerHeight) {
    // add padding so the content doesn't shift after removal of scrollbar
    states.previousBodyPadding = document.body.style.paddingRight;
    document.body.style.paddingRight = measureScrollbar() + 'px';
  }
};

var undoScrollbar = function undoScrollbar() {
  if (states.previousBodyPadding !== null) {
    document.body.style.paddingRight = states.previousBodyPadding;
    states.previousBodyPadding = null;
  }
};

// Fix iOS scrolling http://stackoverflow.com/q/39626302/1331425
var iOSfix = function iOSfix() {
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
    var offset = document.body.scrollTop;
    document.body.style.top = offset * -1 + 'px';
    addClass(document.body, swalClasses.iosfix);
  }
};

var undoIOSfix = function undoIOSfix() {
  if (hasClass(document.body, swalClasses.iosfix)) {
    var offset = parseInt(document.body.style.top, 10);
    removeClass(document.body, swalClasses.iosfix);
    document.body.style.top = '';
    document.body.scrollTop = offset * -1;
  }
};

// SweetAlert entry point
var sweetAlert = function sweetAlert() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  // Prevent run in Node env
  if (typeof window === 'undefined') {
    return;
  }

  // Check for the existence of Promise
  if (typeof Promise === 'undefined') {
    error('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)');
  }

  if (typeof args[0] === 'undefined') {
    error('SweetAlert2 expects at least 1 attribute!');
    return false;
  }

  var params = _extends({}, popupParams);

  switch (_typeof(args[0])) {
    case 'string':
      params.title = args[0];
      params.html = args[1];
      params.type = args[2];

      break;

    case 'object':
      showWarningsForParams(args[0]);
      _extends(params, args[0]);
      params.extraParams = args[0].extraParams;

      if (params.input === 'email' && params.inputValidator === null) {
        var inputValidator = function inputValidator(email) {
          return new Promise(function (resolve, reject) {
            var emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/;
            if (emailRegex.test(email)) {
              resolve();
            } else {
              reject('Invalid email address');
            }
          });
        };
        params.inputValidator = params.expectRejections ? inputValidator : sweetAlert.adaptInputValidator(inputValidator);
      }

      if (params.input === 'url' && params.inputValidator === null) {
        var _inputValidator = function _inputValidator(url) {
          return new Promise(function (resolve, reject) {
            // taken from https://stackoverflow.com/a/3809435/1331425
            var urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
            if (urlRegex.test(url)) {
              resolve();
            } else {
              reject('Invalid URL');
            }
          });
        };
        params.inputValidator = params.expectRejections ? _inputValidator : sweetAlert.adaptInputValidator(_inputValidator);
      }
      break;

    default:
      error('Unexpected type of argument! Expected "string" or "object", got ' + _typeof(args[0]));
      return false;
  }

  setParameters(params);

  var container = getContainer();
  var popup = getPopup();

  return new Promise(function (resolve, reject) {
    // functions to handle all resolving/rejecting/settling
    var succeedWith = function succeedWith(value) {
      sweetAlert.closePopup(params.onClose);
      if (params.useRejections) {
        resolve(value);
      } else {
        resolve({ value: value });
      }
    };
    var dismissWith = function dismissWith(dismiss) {
      sweetAlert.closePopup(params.onClose);
      if (params.useRejections) {
        reject(dismiss);
      } else {
        resolve({ dismiss: dismiss });
      }
    };
    var errorWith = function errorWith(error$$1) {
      sweetAlert.closePopup(params.onClose);
      reject(error$$1);
    };

    // Close on timer
    if (params.timer) {
      popup.timeout = setTimeout(function () {
        return dismissWith('timer');
      }, params.timer);
    }

    // Get input element by specified type or, if type isn't specified, by params.input
    var getInput = function getInput(inputType) {
      inputType = inputType || params.input;
      if (!inputType) {
        return null;
      }
      switch (inputType) {
        case 'select':
        case 'textarea':
        case 'file':
          return getChildByClass(content, swalClasses[inputType]);
        case 'checkbox':
          return popup.querySelector('.' + swalClasses.checkbox + ' input');
        case 'radio':
          return popup.querySelector('.' + swalClasses.radio + ' input:checked') || popup.querySelector('.' + swalClasses.radio + ' input:first-child');
        case 'range':
          return popup.querySelector('.' + swalClasses.range + ' input');
        default:
          return getChildByClass(content, swalClasses.input);
      }
    };

    // Get the value of the popup input
    var getInputValue = function getInputValue() {
      var input = getInput();
      if (!input) {
        return null;
      }
      switch (params.input) {
        case 'checkbox':
          return input.checked ? 1 : 0;
        case 'radio':
          return input.checked ? input.value : null;
        case 'file':
          return input.files.length ? input.files[0] : null;
        default:
          return params.inputAutoTrim ? input.value.trim() : input.value;
      }
    };

    // input autofocus
    if (params.input) {
      setTimeout(function () {
        var input = getInput();
        if (input) {
          focusInput(input);
        }
      }, 0);
    }

    var confirm = function confirm(value) {
      if (params.showLoaderOnConfirm) {
        sweetAlert.showLoading();
      }

      if (params.preConfirm) {
        sweetAlert.resetValidationError();
        var preConfirmPromise = Promise.resolve().then(function () {
          return params.preConfirm(value, params.extraParams);
        });
        if (params.expectRejections) {
          preConfirmPromise.then(function (preConfirmValue) {
            return succeedWith(preConfirmValue || value);
          }, function (validationError) {
            sweetAlert.hideLoading();
            if (validationError) {
              sweetAlert.showValidationError(validationError);
            }
          });
        } else {
          preConfirmPromise.then(function (preConfirmValue) {
            if (isVisible(getValidationError()) || preConfirmValue === false) {
              sweetAlert.hideLoading();
            } else {
              succeedWith(preConfirmValue || value);
            }
          }, function (error$$1) {
            return errorWith(error$$1);
          });
        }
      } else {
        succeedWith(value);
      }
    };

    // Mouse interactions
    var onButtonEvent = function onButtonEvent(event) {
      var e = event || window.event;
      var target = e.target || e.srcElement;
      var confirmButton = getConfirmButton();
      var cancelButton = getCancelButton();
      var targetedConfirm = confirmButton && (confirmButton === target || confirmButton.contains(target));
      var targetedCancel = cancelButton && (cancelButton === target || cancelButton.contains(target));

      switch (e.type) {
        case 'click':
          // Clicked 'confirm'
          if (targetedConfirm && sweetAlert.isVisible()) {
            sweetAlert.disableButtons();
            if (params.input) {
              var inputValue = getInputValue();

              if (params.inputValidator) {
                sweetAlert.disableInput();
                var validationPromise = Promise.resolve().then(function () {
                  return params.inputValidator(inputValue, params.extraParams);
                });
                if (params.expectRejections) {
                  validationPromise.then(function () {
                    sweetAlert.enableButtons();
                    sweetAlert.enableInput();
                    confirm(inputValue);
                  }, function (validationError) {
                    sweetAlert.enableButtons();
                    sweetAlert.enableInput();
                    if (validationError) {
                      sweetAlert.showValidationError(validationError);
                    }
                  });
                } else {
                  validationPromise.then(function (validationError) {
                    sweetAlert.enableButtons();
                    sweetAlert.enableInput();
                    if (validationError) {
                      sweetAlert.showValidationError(validationError);
                    } else {
                      confirm(inputValue);
                    }
                  }, function (error$$1) {
                    return errorWith(error$$1);
                  });
                }
              } else {
                confirm(inputValue);
              }
            } else {
              confirm(true);
            }

            // Clicked 'cancel'
          } else if (targetedCancel && sweetAlert.isVisible()) {
            sweetAlert.disableButtons();
            dismissWith(sweetAlert.DismissReason.cancel);
          }
          break;
        default:
      }
    };

    var buttons = popup.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].onclick = onButtonEvent;
      buttons[i].onmouseover = onButtonEvent;
      buttons[i].onmouseout = onButtonEvent;
      buttons[i].onmousedown = onButtonEvent;
    }

    // Closing popup by close button
    getCloseButton().onclick = function () {
      dismissWith(sweetAlert.DismissReason.close);
    };

    if (params.toast) {
      // Closing popup by backdrop click
      popup.onclick = function (e) {
        if (e.target !== popup || params.showConfirmButton || params.showCancelButton) {
          return;
        }
        if (params.allowOutsideClick) {
          sweetAlert.closePopup(params.onClose);
          dismissWith(sweetAlert.DismissReason.backdrop);
        }
      };
    } else {
      var ignoreOutsideClick = false;

      // Ignore click events that had mousedown on the popup but mouseup on the container
      // This can happen when the user drags a slider
      popup.onmousedown = function () {
        container.onmouseup = function (e) {
          container.onmouseup = undefined;
          // We only check if the mouseup target is the container because usually it doesn't
          // have any other direct children aside of the popup
          if (e.target === container) {
            ignoreOutsideClick = true;
          }
        };
      };

      // Ignore click events that had mousedown on the container but mouseup on the popup
      container.onmousedown = function () {
        popup.onmouseup = function (e) {
          popup.onmouseup = undefined;
          // We also need to check if the mouseup target is a child of the popup
          if (e.target === popup || popup.contains(e.target)) {
            ignoreOutsideClick = true;
          }
        };
      };

      container.onclick = function (e) {
        if (ignoreOutsideClick) {
          ignoreOutsideClick = false;
          return;
        }
        if (e.target !== container) {
          return;
        }
        if (callIfFunction(params.allowOutsideClick)) {
          dismissWith(sweetAlert.DismissReason.backdrop);
        }
      };
    }

    var content = getContent();
    var actions = getActions();
    var confirmButton = getConfirmButton();
    var cancelButton = getCancelButton();

    // Reverse buttons (Confirm on the right side)
    if (params.reverseButtons) {
      confirmButton.parentNode.insertBefore(cancelButton, confirmButton);
    } else {
      confirmButton.parentNode.insertBefore(confirmButton, cancelButton);
    }

    // Focus handling
    var setFocus = function setFocus(index, increment) {
      var focusableElements = getFocusableElements(params.focusCancel);
      // search for visible elements and select the next possible match
      for (var _i2 = 0; _i2 < focusableElements.length; _i2++) {
        index = index + increment;

        // rollover to first item
        if (index === focusableElements.length) {
          index = 0;

          // go to last item
        } else if (index === -1) {
          index = focusableElements.length - 1;
        }

        // determine if element is visible
        var el = focusableElements[index];
        if (isVisible(el)) {
          return el.focus();
        }
      }
    };

    var handleKeyDown = function handleKeyDown(event) {
      var e = event || window.event;

      var arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Left', 'Right', 'Up', 'Down' // IE11
      ];

      if (e.key === 'Enter' && !e.isComposing) {
        if (e.target === getInput()) {
          if (['textarea', 'file'].indexOf(params.input) !== -1) {
            return; // do not submit
          }

          sweetAlert.clickConfirm();
          e.preventDefault();
        }

        // TAB
      } else if (e.key === 'Tab') {
        var targetElement = e.target || e.srcElement;

        var focusableElements = getFocusableElements(params.focusCancel);
        var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
        for (var _i3 = 0; _i3 < focusableElements.length; _i3++) {
          if (targetElement === focusableElements[_i3]) {
            btnIndex = _i3;
            break;
          }
        }

        if (!e.shiftKey) {
          // Cycle to the next button
          setFocus(btnIndex, 1);
        } else {
          // Cycle to the prev button
          setFocus(btnIndex, -1);
        }
        e.stopPropagation();
        e.preventDefault();

        // ARROWS - switch focus between buttons
      } else if (arrowKeys.indexOf(e.key) !== -1) {
        // focus Cancel button if Confirm button is currently focused
        if (document.activeElement === confirmButton && isVisible(cancelButton)) {
          cancelButton.focus();
          // and vice versa
        } else if (document.activeElement === cancelButton && isVisible(confirmButton)) {
          confirmButton.focus();
        }

        // ESC
      } else if ((e.key === 'Escape' || e.key === 'Esc') && callIfFunction(params.allowEscapeKey) === true) {
        dismissWith(sweetAlert.DismissReason.esc);
      }
    };

    if (params.toast && windowOnkeydownOverridden) {
      window.onkeydown = previousWindowKeyDown;
      windowOnkeydownOverridden = false;
    }

    if (!params.toast && !windowOnkeydownOverridden) {
      previousWindowKeyDown = window.onkeydown;
      windowOnkeydownOverridden = true;
      window.onkeydown = handleKeyDown;
    }

    /**
     * Show spinner instead of Confirm button and disable Cancel button
     */
    sweetAlert.hideLoading = sweetAlert.disableLoading = function () {
      if (!params.showConfirmButton) {
        hide(confirmButton);
        if (!params.showCancelButton) {
          hide(getActions());
        }
      }
      removeClass([popup, actions], swalClasses.loading);
      popup.removeAttribute('aria-busy');
      popup.removeAttribute('data-loading');
      confirmButton.disabled = false;
      cancelButton.disabled = false;
    };

    sweetAlert.getTitle = function () {
      return getTitle();
    };
    sweetAlert.getContent = function () {
      return getContent();
    };
    sweetAlert.getInput = function () {
      return getInput();
    };
    sweetAlert.getImage = function () {
      return getImage();
    };
    sweetAlert.getButtonsWrapper = function () {
      return getButtonsWrapper();
    };
    sweetAlert.getActions = function () {
      return getActions();
    };
    sweetAlert.getConfirmButton = function () {
      return getConfirmButton();
    };
    sweetAlert.getCancelButton = function () {
      return getCancelButton();
    };
    sweetAlert.getFooter = function () {
      return getFooter();
    };
    sweetAlert.isLoading = function () {
      return isLoading();
    };

    sweetAlert.enableButtons = function () {
      confirmButton.disabled = false;
      cancelButton.disabled = false;
    };

    sweetAlert.disableButtons = function () {
      confirmButton.disabled = true;
      cancelButton.disabled = true;
    };

    sweetAlert.enableConfirmButton = function () {
      confirmButton.disabled = false;
    };

    sweetAlert.disableConfirmButton = function () {
      confirmButton.disabled = true;
    };

    sweetAlert.enableInput = function () {
      var input = getInput();
      if (!input) {
        return false;
      }
      if (input.type === 'radio') {
        var radiosContainer = input.parentNode.parentNode;
        var radios = radiosContainer.querySelectorAll('input');
        for (var _i4 = 0; _i4 < radios.length; _i4++) {
          radios[_i4].disabled = false;
        }
      } else {
        input.disabled = false;
      }
    };

    sweetAlert.disableInput = function () {
      var input = getInput();
      if (!input) {
        return false;
      }
      if (input && input.type === 'radio') {
        var radiosContainer = input.parentNode.parentNode;
        var radios = radiosContainer.querySelectorAll('input');
        for (var _i5 = 0; _i5 < radios.length; _i5++) {
          radios[_i5].disabled = true;
        }
      } else {
        input.disabled = true;
      }
    };

    // Show block with validation error
    sweetAlert.showValidationError = function (error$$1) {
      var validationError = getValidationError();
      validationError.innerHTML = error$$1;
      var popupComputedStyle = window.getComputedStyle(popup);
      validationError.style.marginLeft = '-' + popupComputedStyle.getPropertyValue('padding-left');
      validationError.style.marginRight = '-' + popupComputedStyle.getPropertyValue('padding-right');
      show(validationError);

      var input = getInput();
      if (input) {
        input.setAttribute('aria-invalid', true);
        input.setAttribute('aria-describedBy', swalClasses.validationerror);
        focusInput(input);
        addClass(input, swalClasses.inputerror);
      }
    };

    // Hide block with validation error
    sweetAlert.resetValidationError = function () {
      var validationError = getValidationError();
      hide(validationError);

      var input = getInput();
      if (input) {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedBy');
        removeClass(input, swalClasses.inputerror);
      }
    };

    sweetAlert.getProgressSteps = function () {
      return params.progressSteps;
    };

    sweetAlert.setProgressSteps = function (progressSteps) {
      params.progressSteps = progressSteps;
      setParameters(params);
    };

    sweetAlert.showProgressSteps = function () {
      show(getProgressSteps());
    };

    sweetAlert.hideProgressSteps = function () {
      hide(getProgressSteps());
    };

    sweetAlert.enableButtons();
    sweetAlert.hideLoading();
    sweetAlert.resetValidationError();

    if (params.input) {
      addClass(document.body, swalClasses['has-input']);
    }

    // inputs
    var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
    var input = void 0;
    for (var _i6 = 0; _i6 < inputTypes.length; _i6++) {
      var inputClass = swalClasses[inputTypes[_i6]];
      var inputContainer = getChildByClass(content, inputClass);
      input = getInput(inputTypes[_i6]);

      // set attributes
      if (input) {
        for (var j in input.attributes) {
          if (input.attributes.hasOwnProperty(j)) {
            var attrName = input.attributes[j].name;
            if (attrName !== 'type' && attrName !== 'value') {
              input.removeAttribute(attrName);
            }
          }
        }
        for (var attr in params.inputAttributes) {
          input.setAttribute(attr, params.inputAttributes[attr]);
        }
      }

      // set class
      inputContainer.className = inputClass;
      if (params.inputClass) {
        addClass(inputContainer, params.inputClass);
      }

      hide(inputContainer);
    }

    var populateInputOptions = void 0;
    switch (params.input) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'url':
        input = getChildByClass(content, swalClasses.input);
        input.value = params.inputValue;
        input.placeholder = params.inputPlaceholder;
        input.type = params.input;
        show(input);
        break;
      case 'file':
        input = getChildByClass(content, swalClasses.file);
        input.placeholder = params.inputPlaceholder;
        input.type = params.input;
        show(input);
        break;
      case 'range':
        var range = getChildByClass(content, swalClasses.range);
        var rangeInput = range.querySelector('input');
        var rangeOutput = range.querySelector('output');
        rangeInput.value = params.inputValue;
        rangeInput.type = params.input;
        rangeOutput.value = params.inputValue;
        show(range);
        break;
      case 'select':
        var select = getChildByClass(content, swalClasses.select);
        select.innerHTML = '';
        if (params.inputPlaceholder) {
          var placeholder = document.createElement('option');
          placeholder.innerHTML = params.inputPlaceholder;
          placeholder.value = '';
          placeholder.disabled = true;
          placeholder.selected = true;
          select.appendChild(placeholder);
        }
        populateInputOptions = function populateInputOptions(inputOptions) {
          inputOptions = objectToMap(inputOptions);
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = inputOptions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _step$value = slicedToArray(_step.value, 2),
                  optionValue = _step$value[0],
                  optionLabel = _step$value[1];

              var option = document.createElement('option');
              option.value = optionValue;
              option.innerHTML = optionLabel;
              if (params.inputValue.toString() === optionValue.toString()) {
                option.selected = true;
              }
              select.appendChild(option);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          show(select);
          select.focus();
        };
        break;
      case 'radio':
        var radio = getChildByClass(content, swalClasses.radio);
        radio.innerHTML = '';
        populateInputOptions = function populateInputOptions(inputOptions) {
          inputOptions = objectToMap(inputOptions);
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = inputOptions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _step2$value = slicedToArray(_step2.value, 2),
                  radioValue = _step2$value[0],
                  radioLabel = _step2$value[1];

              var radioInput = document.createElement('input');
              var radioLabelElement = document.createElement('label');
              radioInput.type = 'radio';
              radioInput.name = swalClasses.radio;
              radioInput.value = radioValue;
              if (params.inputValue.toString() === radioValue.toString()) {
                radioInput.checked = true;
              }
              radioLabelElement.innerHTML = radioLabel;
              radioLabelElement.insertBefore(radioInput, radioLabelElement.firstChild);
              radio.appendChild(radioLabelElement);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          show(radio);
          var radios = radio.querySelectorAll('input');
          if (radios.length) {
            radios[0].focus();
          }
        };
        break;
      case 'checkbox':
        var checkbox = getChildByClass(content, swalClasses.checkbox);
        var checkboxInput = getInput('checkbox');
        checkboxInput.type = 'checkbox';
        checkboxInput.value = 1;
        checkboxInput.id = swalClasses.checkbox;
        checkboxInput.checked = Boolean(params.inputValue);
        var label = checkbox.getElementsByTagName('span');
        if (label.length) {
          checkbox.removeChild(label[0]);
        }
        label = document.createElement('span');
        label.innerHTML = params.inputPlaceholder;
        checkbox.appendChild(label);
        show(checkbox);
        break;
      case 'textarea':
        var textarea = getChildByClass(content, swalClasses.textarea);
        textarea.value = params.inputValue;
        textarea.placeholder = params.inputPlaceholder;
        show(textarea);
        break;
      case null:
        break;
      default:
        error('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' + params.input + '"');
        break;
    }

    if (params.input === 'select' || params.input === 'radio') {
      if (params.inputOptions instanceof Promise) {
        sweetAlert.showLoading();
        params.inputOptions.then(function (inputOptions) {
          sweetAlert.hideLoading();
          populateInputOptions(inputOptions);
        });
      } else if (_typeof(params.inputOptions) === 'object') {
        populateInputOptions(params.inputOptions);
      } else {
        error('Unexpected type of inputOptions! Expected object, Map or Promise, got ' + _typeof(params.inputOptions));
      }
    }

    openPopup(params.animation, params.onBeforeOpen, params.onOpen);

    if (!params.toast) {
      if (!callIfFunction(params.allowEnterKey)) {
        if (document.activeElement) {
          document.activeElement.blur();
        }
      } else if (params.focusCancel && isVisible(cancelButton)) {
        cancelButton.focus();
      } else if (params.focusConfirm && isVisible(confirmButton)) {
        confirmButton.focus();
      } else {
        setFocus(-1, 1);
      }
    }

    // fix scroll
    getContainer().scrollTop = 0;
  });
};

/*
 * Global function to determine if swal2 popup is shown
 */
sweetAlert.isVisible = function () {
  return !!getPopup();
};

/*
 * Global function for chaining sweetAlert popups
 */
sweetAlert.queue = function (steps) {
  queue = steps;
  var resetQueue = function resetQueue() {
    queue = [];
    document.body.removeAttribute('data-swal2-queue-step');
  };
  var queueResult = [];
  return new Promise(function (resolve, reject) {
    (function step(i, callback) {
      if (i < queue.length) {
        document.body.setAttribute('data-swal2-queue-step', i);

        sweetAlert(queue[i]).then(function (result) {
          if (typeof result.value !== 'undefined') {
            queueResult.push(result.value);
            step(i + 1, callback);
          } else {
            resetQueue();
            resolve({ dismiss: result.dismiss });
          }
        });
      } else {
        resetQueue();
        resolve({ value: queueResult });
      }
    })(0);
  });
};

/*
 * Global function for getting the index of current popup in queue
 */
sweetAlert.getQueueStep = function () {
  return document.body.getAttribute('data-swal2-queue-step');
};

/*
 * Global function for inserting a popup to the queue
 */
sweetAlert.insertQueueStep = function (step, index) {
  if (index && index < queue.length) {
    return queue.splice(index, 0, step);
  }
  return queue.push(step);
};

/*
 * Global function for deleting a popup from the queue
 */
sweetAlert.deleteQueueStep = function (index) {
  if (typeof queue[index] !== 'undefined') {
    queue.splice(index, 1);
  }
};

/*
 * Global function to close sweetAlert
 */
sweetAlert.close = sweetAlert.closePopup = sweetAlert.closeModal = sweetAlert.closeToast = function (onComplete) {
  var container = getContainer();
  var popup = getPopup();
  if (!popup) {
    return;
  }
  removeClass(popup, swalClasses.show);
  addClass(popup, swalClasses.hide);
  clearTimeout(popup.timeout);

  if (!isToast()) {
    resetPrevState();
    window.onkeydown = previousWindowKeyDown;
    windowOnkeydownOverridden = false;
  }

  var removePopupAndResetState = function removePopupAndResetState() {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);

    if (isModal()) {
      undoScrollbar();
      undoIOSfix();
    }
  };

  // If animation is supported, animate
  if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
    popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
      popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
      if (hasClass(popup, swalClasses.hide)) {
        removePopupAndResetState();
      }
    });
  } else {
    // Otherwise, remove immediately
    removePopupAndResetState();
  }
  if (onComplete !== null && typeof onComplete === 'function') {
    setTimeout(function () {
      onComplete(popup);
    });
  }
};

/*
 * Global function to click 'Confirm' button
 */
sweetAlert.clickConfirm = function () {
  return getConfirmButton().click();
};

/*
 * Global function to click 'Cancel' button
 */
sweetAlert.clickCancel = function () {
  return getCancelButton().click();
};

/**
 * Show spinner instead of Confirm button and disable Cancel button
 */
sweetAlert.showLoading = sweetAlert.enableLoading = function () {
  var popup = getPopup();
  if (!popup) {
    sweetAlert('');
  }
  popup = getPopup();
  var actions = getActions();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton();

  show(actions);
  show(confirmButton, 'inline-block');
  addClass([popup, actions], swalClasses.loading);
  confirmButton.disabled = true;
  cancelButton.disabled = true;

  popup.setAttribute('data-loading', true);
  popup.setAttribute('aria-busy', true);
  popup.focus();
};

/**
 * Is valid parameter
 * @param {String} paramName
 */
sweetAlert.isValidParameter = function (paramName) {
  return defaultParams.hasOwnProperty(paramName) || paramName === 'extraParams';
};

/**
 * Is deprecated parameter
 * @param {String} paramName
 */
sweetAlert.isDeprecatedParameter = function (paramName) {
  return deprecatedParams.indexOf(paramName) !== -1;
};

/**
 * Set default params for each popup
 * @param {Object} userParams
 */
sweetAlert.setDefaults = function (userParams) {
  if (!userParams || (typeof userParams === 'undefined' ? 'undefined' : _typeof(userParams)) !== 'object') {
    return error('the argument for setDefaults() is required and has to be a object');
  }

  showWarningsForParams(userParams);

  // assign valid params from userParams to popupParams
  for (var param in userParams) {
    if (sweetAlert.isValidParameter(param)) {
      popupParams[param] = userParams[param];
    }
  }
};

/**
 * Reset default params for each popup
 */
sweetAlert.resetDefaults = function () {
  popupParams = _extends({}, defaultParams);
};

/**
 * Adapt a legacy inputValidator for use with expectRejections=false
 */
sweetAlert.adaptInputValidator = function (legacyValidator) {
  return function adaptedInputValidator(inputValue, extraParams) {
    return legacyValidator.call(this, inputValue, extraParams).then(function () {
      return undefined;
    }, function (validationError) {
      return validationError;
    });
  };
};

sweetAlert.DismissReason = Object.freeze({
  cancel: 'cancel',
  backdrop: 'overlay',
  close: 'close',
  esc: 'esc',
  timer: 'timer'
});

sweetAlert.noop = function () {};

sweetAlert.version = '7.11.0';

sweetAlert.default = sweetAlert;

/**
 * Set default params if `window._swalDefaults` is an object
 */
if (typeof window !== 'undefined' && _typeof(window._swalDefaults) === 'object') {
  sweetAlert.setDefaults(window._swalDefaults);
}

// Remember state in cases where opening and handling a modal will fiddle with it.
var states = {
  previousActiveElement: null,
  previousBodyPadding: null

  // Detect Node env
};var isNodeEnv = function isNodeEnv() {
  return typeof window === 'undefined' || typeof document === 'undefined';
};

/*
 * Add modal + backdrop to DOM
 */
var init = function init(params) {
  // Clean up the old popup if it exists
  var c = getContainer();
  if (c) {
    c.parentNode.removeChild(c);
    removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);
  }

  if (isNodeEnv()) {
    error('SweetAlert2 requires document to initialize');
    return;
  }

  var container = document.createElement('div');
  container.className = swalClasses.container;
  container.innerHTML = sweetHTML;

  var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
  targetElement.appendChild(container);

  var popup = getPopup();
  var content = getContent();
  var input = getChildByClass(content, swalClasses.input);
  var file = getChildByClass(content, swalClasses.file);
  var range = content.querySelector('.' + swalClasses.range + ' input');
  var rangeOutput = content.querySelector('.' + swalClasses.range + ' output');
  var select = getChildByClass(content, swalClasses.select);
  var checkbox = content.querySelector('.' + swalClasses.checkbox + ' input');
  var textarea = getChildByClass(content, swalClasses.textarea);

  // a11y
  popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');

  var resetValidationError = function resetValidationError() {
    sweetAlert.isVisible() && sweetAlert.resetValidationError();
  };

  input.oninput = resetValidationError;
  file.onchange = resetValidationError;
  select.onchange = resetValidationError;
  checkbox.onchange = resetValidationError;
  textarea.oninput = resetValidationError;

  range.oninput = function () {
    resetValidationError();
    rangeOutput.value = range.value;
  };

  range.onchange = function () {
    resetValidationError();
    range.previousSibling.value = range.value;
  };

  return popup;
};

/*
 * Manipulate DOM
 */

var sweetHTML = ('\n <div role="dialog" aria-modal="true" aria-labelledby="' + swalClasses.title + '" aria-describedby="' + swalClasses.content + '" class="' + swalClasses.popup + '" tabindex="-1">\n   <div class="' + swalClasses.header + '">\n     <ul class="' + swalClasses.progresssteps + '"></ul>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.error + '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.question + '">?</div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.warning + '">!</div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.info + '">i</div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.success + '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="' + swalClasses.image + '" />\n     <h2 class="' + swalClasses.title + '" id="' + swalClasses.title + '"></h2>\n     <button type="button" class="' + swalClasses.close + '">\xD7</button>\n   </div>\n   <div class="' + swalClasses.content + '">\n     <div id="' + swalClasses.content + '"></div>\n     <input class="' + swalClasses.input + '" />\n     <input type="file" class="' + swalClasses.file + '" />\n     <div class="' + swalClasses.range + '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="' + swalClasses.select + '"></select>\n     <div class="' + swalClasses.radio + '"></div>\n     <label for="' + swalClasses.checkbox + '" class="' + swalClasses.checkbox + '">\n       <input type="checkbox" />\n     </label>\n     <textarea class="' + swalClasses.textarea + '"></textarea>\n     <div class="' + swalClasses.validationerror + '" id="' + swalClasses.validationerror + '"></div>\n   </div>\n   <div class="' + swalClasses.actions + '">\n     <button type="button" class="' + swalClasses.confirm + '">OK</button>\n     <button type="button" class="' + swalClasses.cancel + '">Cancel</button>\n   </div>\n   <div class="' + swalClasses.footer + '">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, '');

var getContainer = function getContainer() {
  return document.body.querySelector('.' + swalClasses.container);
};

var getPopup = function getPopup() {
  return getContainer() ? getContainer().querySelector('.' + swalClasses.popup) : null;
};

var getIcons = function getIcons() {
  var popup = getPopup();
  return popup.querySelectorAll('.' + swalClasses.icon);
};

var elementByClass = function elementByClass(className) {
  return getContainer() ? getContainer().querySelector('.' + className) : null;
};

var getTitle = function getTitle() {
  return elementByClass(swalClasses.title);
};

var getContent = function getContent() {
  return elementByClass(swalClasses.content);
};

var getImage = function getImage() {
  return elementByClass(swalClasses.image);
};

var getProgressSteps = function getProgressSteps() {
  return elementByClass(swalClasses.progresssteps);
};

var getValidationError = function getValidationError() {
  return elementByClass(swalClasses.validationerror);
};

var getConfirmButton = function getConfirmButton() {
  return elementByClass(swalClasses.confirm);
};

var getCancelButton = function getCancelButton() {
  return elementByClass(swalClasses.cancel);
};

var getButtonsWrapper = function getButtonsWrapper() {
  warnOnce('swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead');
  return elementByClass(swalClasses.actions);
};

var getActions = function getActions() {
  return elementByClass(swalClasses.actions);
};

var getFooter = function getFooter() {
  return elementByClass(swalClasses.footer);
};

var getCloseButton = function getCloseButton() {
  return elementByClass(swalClasses.close);
};

var getFocusableElements = function getFocusableElements() {
  var focusableElementsWithTabindex = Array.prototype.slice.call(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'))
  // sort according to tabindex
  .sort(function (a, b) {
    a = parseInt(a.getAttribute('tabindex'));
    b = parseInt(b.getAttribute('tabindex'));
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
    return 0;
  });

  var otherFocusableElements = Array.prototype.slice.call(getPopup().querySelectorAll('button, input:not([type=hidden]), textarea, select, a, [tabindex="0"]'));

  return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements));
};

var parseHtmlToContainer = function parseHtmlToContainer(param, target) {
  if (!param) {
    return hide(target);
  }

  if ((typeof param === 'undefined' ? 'undefined' : _typeof(param)) === 'object') {
    target.innerHTML = '';
    if (0 in param) {
      for (var i = 0; i in param; i++) {
        target.appendChild(param[i].cloneNode(true));
      }
    } else {
      target.appendChild(param.cloneNode(true));
    }
  } else if (param) {
    target.innerHTML = param;
  } else {}
  show(target);
};

var isModal = function isModal() {
  return !document.body.classList.contains(swalClasses['toast-shown']);
};

var isToast = function isToast() {
  return document.body.classList.contains(swalClasses['toast-shown']);
};

var isLoading = function isLoading() {
  return getPopup().hasAttribute('data-loading');
};

var hasClass = function hasClass(elem, className) {
  if (elem.classList) {
    return elem.classList.contains(className);
  }
  return false;
};

var focusInput = function focusInput(input) {
  input.focus();

  // place cursor at end of text in text input
  if (input.type !== 'file') {
    // http://stackoverflow.com/a/2345915/1331425
    var val = input.value;
    input.value = '';
    input.value = val;
  }
};

var addOrRemoveClass = function addOrRemoveClass(target, classList, add) {
  if (!target || !classList) {
    return;
  }
  if (typeof classList === 'string') {
    classList = classList.split(/\s+/).filter(Boolean);
  }
  classList.forEach(function (className) {
    if (target.forEach) {
      target.forEach(function (elem) {
        add ? elem.classList.add(className) : elem.classList.remove(className);
      });
    } else {
      add ? target.classList.add(className) : target.classList.remove(className);
    }
  });
};

var addClass = function addClass(target, classList) {
  addOrRemoveClass(target, classList, true);
};

var removeClass = function removeClass(target, classList) {
  addOrRemoveClass(target, classList, false);
};

var getChildByClass = function getChildByClass(elem, className) {
  for (var i = 0; i < elem.childNodes.length; i++) {
    if (hasClass(elem.childNodes[i], className)) {
      return elem.childNodes[i];
    }
  }
};

var show = function show(elem, display) {
  if (!display) {
    display = elem.id === swalClasses.content ? 'block' : 'flex';
  }
  elem.style.opacity = '';
  elem.style.display = display;
};

var hide = function hide(elem) {
  elem.style.opacity = '';
  elem.style.display = 'none';
};

var empty = function empty(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
};

// borrowed from jquery $(elem).is(':visible') implementation
var isVisible = function isVisible(elem) {
  return elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
};

var removeStyleProperty = function removeStyleProperty(elem, property) {
  if (elem.style.removeProperty) {
    elem.style.removeProperty(property);
  } else {
    elem.style.removeAttribute(property);
  }
};

var animationEndEvent = function () {
  // Prevent run in Node env
  if (isNodeEnv()) {
    return false;
  }

  var testEl = document.createElement('div');
  var transEndEventNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd oanimationend',
    'animation': 'animationend'
  };
  for (var i in transEndEventNames) {
    if (transEndEventNames.hasOwnProperty(i) && typeof testEl.style[i] !== 'undefined') {
      return transEndEventNames[i];
    }
  }

  return false;
}();

// Reset previous window keydown handler and focued element
var resetPrevState = function resetPrevState() {
  if (states.previousActiveElement && states.previousActiveElement.focus) {
    var x = window.scrollX;
    var y = window.scrollY;
    states.previousActiveElement.focus();
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
      // IE doesn't have scrollX/scrollY support
      window.scrollTo(x, y);
    }
  }
};

// Measure width of scrollbar
// https://github.com/twbs/bootstrap/blob/master/js/modal.js#L279-L286
var measureScrollbar = function measureScrollbar() {
  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  if (supportsTouch) {
    return 0;
  }
  var scrollDiv = document.createElement('div');
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

/**
 * Inject a string of CSS into the page header
 *
 * @param {String} css
 */
var injectCSS = function injectCSS() {
  var css = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  // Prevent run in Node env
  if (isNodeEnv()) {
    return false;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
};

injectCSS(styles);

return sweetAlert;

})));
if (typeof window !== 'undefined' && window.Sweetalert2) window.sweetAlert = window.swal = window.Sweetalert2;
