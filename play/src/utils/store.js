/* * *
 * Store & StoreContext
 * - - - - - - - - - - -
 * This is to provide a general store implimentation
 *   to be utilized primarly in a Flux type sytem.
 * Few key differences between a flux system and this,
 *   is there are no actions, they get muddled into the store.
 *
 * TODO:
 *  - Get, Save, Update & Delete Data?
 *  - Data Validation?
 *  - Trigger from other events?
 *  - Local changes vs server value
 * * */

'use strict';
import _ from 'lodash';
import Bacon from 'baconjs';

var _eventData = [];
var _events = new Bacon.Bus();
var _storeContexts = {};

/* * *
 * StoreContext
 * - - - - - - -
 * Creates an instance to more easily call the Store
 * * */
class StoreContext {
  constructor(endpoint) {
    this.uri = endpoint.uri;
    this.name = endpoint.name;
    this.onChange = false;

    // Subscribe store before getting the data.
    Store.subscribe(x => {
      if(x.valueInternal.uri === this.uri) {
        this.update(x.valueInternal.data);
        if(this.onChange) {
          this.onChange(this, x.valueInternal);
        }
      }
    }.bind(this));

    this.data = Store.get(this.uri);
  }

  /* Add
   * - - -
   * Will update a local version and push out the data to a global store.
   *
   * @param {object} data
   */
  add(data) {
    // Add to global store
    Store.add(this.uri, data);

    // Update local object so we don't have to rebuild entire object.
    this.update(data);
  }

  /* update
   * - - - -
   * @param {object} data
   */
  update(data) {
    _.merge(this.data, data);
  }

  /* Get Interanl Data
   * - - - - - - - - -
   * @return {object}
   */
  get() {
    return this.data;
  }

  /* Rebuild from Store
   * - - - - - - - - - -
   * @return {object}
   */
  rebuild() {
    this.data = Store.get(this.uri);
    return this.get();
  }

  /* Add Change Listener
   * - - - - - - - - - -
   * @param {function} func
   */
  addChangeListener(func) {
    this.onChange = func;
  }
}


/* * *
 * Store
 * - - - - - - - -
 * Store functions as a Singleton.
 * But you can create StoreContexts for ease of use.
 * The purpose of this is to centeralize all the data and be able to replay or rebuild data sets.
 * * */
class Store {
  /* Create a StoreContext
   * - - - - - - - - - - -
   * Will manage different contexts
   *
   * @param {object} endpoint
   *
   * @return {StoreContext}
   */
  static createContext(endpoint) {
    if(!_storeContexts[endpoint.uri]) {
      _storeContexts[endpoint.uri] = new StoreContext(endpoint);
    }

    if(endpoint.data) {
      Store.add(endpoint.uri, endpoint.data);
    }

    return _storeContexts[endpoint.uri];
  }

  /* Create an Array of StoreContext
   * - - - - - - - - - - - - - - - -
   * @param {[object]} endpoints
   *
   * @return {[StoreContext]}
   */
  static createContexts(endpoints) {
    return endpoints.map(endpoint => {
      return Store.createContext(endpoint);
    });
  }

  /* Wrapper for the Event Bus
   * - - - - - - - - - - - - -
   * @param {function} func
   */
  static subscribe(func) {
    // Subscribe function to any Event matching the URI.
    _events.subscribe(func);
  }

  /* Add Event Data Point
   * - - - - - - - - - - -
   * Will add the event data point to the global store.
   * Will push an event to all subscribers
   *
   * @param {string} uri
   * @param {object} data
   */
  static add(uri, data) {
    let eventData = {
      uri: uri,
      data: data
    };

    // Push to the data store
    _eventData.push(eventData);

    // Push event out
    _events.push(eventData);
  }

  /* Get a complied data object from the event store
   * - - -
   * @param {string} uri
   * @param {bool} isExplicit - optional
   *
   * @return {object}
   */
  static get(uri, isExplicit = false) {
    let obj = {};

    _.map(Store.getEvents(uri), e => {
      _.merge(obj, e.data);
    });

    if(isExplicit) {
      _.map(Store.getSubEvents(uri), x => {
        let sub_uri = x.uri.replace(uri, '');
        let uris = sub_uri.split('/');

        let baseObj = {};

        Store.nestObj(baseObj, x.data, uris);
        _.merge(obj, baseObj);
      });
    }

    return obj;
  }

  /* Get Events
   * - - - - - -
   * Find any direct uri match
   *
   * @param {string} uri
   *
   * @return {array}
   */
  static getEvents(uri) {
    return _.filter(_eventData, e => {
      return e.uri == uri;
    });
  }

  /* Get Sub events
   * - - - - - - - -
   * Return anything that is not a direct URI match.
   *
   * @param {string} uri
   *
   * @return {array}
   */
  static getSubEvents(uri) {
    return _.filter(_eventData, e => {
      return e.uri !== uri && e.uri.indexOf(uri) > -1;
    });
  }

  /* Nest Object
   * - - - - - -
   * Creates an object base on number of URIs you pass in.
   *
   * @param {object} baseObj
   * @param {object} data
   * @param {array} uris
   * @param {number} i - optional
   *
   * @return {bool}
   */
  static nestObj(baseObj, data, uris, i = 0) {
    let isMax = uris.length == 8;
    baseObj[uris[i]] = isMax ? data : {};

    return isMax ? true : Store.nestObj(baseObj[uris[i]], data, uris, i+1);
  }
}

export default Store;
