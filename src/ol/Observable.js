/**
 * @module ol/Observable
 */
import {inherits} from './index.js';
import _ol_events_ from './events.js';
import EventTarget from './events/EventTarget.js';
import EventType from './events/EventType.js';

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * An event target providing convenient methods for listener registration
 * and unregistration. A generic `change` event is always available through
 * {@link ol.Observable#changed}.
 *
 * @constructor
 * @extends {ol.events.EventTarget}
 * @fires ol.events.Event
 * @struct
 * @api
 */
var _ol_Observable_ = function() {

  EventTarget.call(this);

  /**
   * @private
   * @type {number}
   */
  this.revision_ = 0;

};

inherits(_ol_Observable_, EventTarget);


/**
 * Removes an event listener using the key returned by `on()` or `once()`.
 * @param {ol.EventsKey|Array.<ol.EventsKey>} key The key returned by `on()`
 *     or `once()` (or an array of keys).
 * @api
 */
_ol_Observable_.unByKey = function(key) {
  if (Array.isArray(key)) {
    for (var i = 0, ii = key.length; i < ii; ++i) {
      _ol_events_.unlistenByKey(key[i]);
    }
  } else {
    _ol_events_.unlistenByKey(/** @type {ol.EventsKey} */ (key));
  }
};


/**
 * Increases the revision counter and dispatches a 'change' event.
 * @api
 */
_ol_Observable_.prototype.changed = function() {
  ++this.revision_;
  this.dispatchEvent(EventType.CHANGE);
};


/**
 * Dispatches an event and calls all listeners listening for events
 * of this type. The event parameter can either be a string or an
 * Object with a `type` property.
 *
 * @param {{type: string,
 *     target: (EventTarget|ol.events.EventTarget|undefined)}|ol.events.Event|
 *     string} event Event object.
 * @function
 * @api
 */
_ol_Observable_.prototype.dispatchEvent;


/**
 * Get the version number for this object.  Each time the object is modified,
 * its version number will be incremented.
 * @return {number} Revision.
 * @api
 */
_ol_Observable_.prototype.getRevision = function() {
  return this.revision_;
};


/**
 * Listen for a certain type of event.
 * @param {string|Array.<string>} type The event type or array of event types.
 * @param {function(?): ?} listener The listener function.
 * @return {ol.EventsKey|Array.<ol.EventsKey>} Unique key for the listener. If
 *     called with an array of event types as the first argument, the return
 *     will be an array of keys.
 * @api
 */
_ol_Observable_.prototype.on = function(type, listener) {
  if (Array.isArray(type)) {
    var len = type.length;
    var keys = new Array(len);
    for (var i = 0; i < len; ++i) {
      keys[i] = _ol_events_.listen(this, type[i], listener);
    }
    return keys;
  } else {
    return _ol_events_.listen(
        this, /** @type {string} */ (type), listener);
  }
};


/**
 * Listen once for a certain type of event.
 * @param {string|Array.<string>} type The event type or array of event types.
 * @param {function(?): ?} listener The listener function.
 * @return {ol.EventsKey|Array.<ol.EventsKey>} Unique key for the listener. If
 *     called with an array of event types as the first argument, the return
 *     will be an array of keys.
 * @api
 */
_ol_Observable_.prototype.once = function(type, listener) {
  if (Array.isArray(type)) {
    var len = type.length;
    var keys = new Array(len);
    for (var i = 0; i < len; ++i) {
      keys[i] = _ol_events_.listenOnce(this, type[i], listener);
    }
    return keys;
  } else {
    return _ol_events_.listenOnce(
        this, /** @type {string} */ (type), listener);
  }
};


/**
 * Unlisten for a certain type of event.
 * @param {string|Array.<string>} type The event type or array of event types.
 * @param {function(?): ?} listener The listener function.
 * @api
 */
_ol_Observable_.prototype.un = function(type, listener) {
  if (Array.isArray(type)) {
    for (var i = 0, ii = type.length; i < ii; ++i) {
      _ol_events_.unlisten(this, type[i], listener);
    }
    return;
  } else {
    _ol_events_.unlisten(this, /** @type {string} */ (type), listener);
  }
};
export default _ol_Observable_;
