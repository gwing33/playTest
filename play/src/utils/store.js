/* * *
 * Store & StoreContext
 * - - - - - - - - - - -
 * This is to provide a general store implimentation
 *   to be utilized primarly in a Flux type sytem.
 * Few key differences between a flux system and this,
 *   is there are no actions, they get muddled into the store.
 *
 * TODO:
 *  - Data Validation?
 *  - Get, Save, Update & Delete Data?
 *  - Trigger from other events?
 * * */

'use strict';
import _ from 'lodash';
import Bacon from 'baconjs';

var _eventData = [];
var _events = new Bacon.Bus();
var _storeContexts = {};

class StoreContext {
  constructor(endpoint) {
    this.uri = endpoint.uri;
    this.name = endpoint.name;
    this.onChange = false;

    // Subscribe store before getting the data.
    _events.subscribe(x => {
      if(x.valueInternal.uri === this.uri) {
        this.update(x.valueInternal.data);
        if(this.onChange) {
          this.onChange(this, x.valueInternal);
        }
      }
    }.bind(this));

    this.data = Store.get(this.uri);
  }

  add(data) {
    // Add to global store
    Store.add(this.uri, data);

    // Update local object so we don't have to rebuild entire object.
    this.update(data);
  }

  update(data) {
    _.merge(this.data, data);
  }

  get() {
    return this.data;
  }

  rebuild() {
    this.data = Store.get(this.uri);
    return this.get();
  }

  addChangeListener(func) {
    this.onChange = func;
  }
}

class Store {
  static createContext(endpoint) {
    if(!_storeContexts[endpoint.uri]) {
      _storeContexts[endpoint.uri] = new StoreContext(endpoint);
    }

    if(endpoint.data) {
      console.log('add data');
      Store.add(endpoint.uri, endpoint.data);
    }

    return _storeContexts[endpoint.uri];
  }

  static createContexts(endpoints) {
    return endpoints.map(endpoint => {
      return Store.createContext(endpoint);
    });
  }

  static subscribe(uri, fun) {
    // Subscribe function to any Event matching the URI.
  }

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

  static get(uri) {
    let obj = {};

    _.map(Store.getEvents(uri), e => {
      _.merge(obj, e.data);
    });

    console.log('get', obj);

    return obj;
  }

  static getEvents(uri) {
    // Find any event that matches the URI
    return _.filter(_eventData, e => {
      return e.uri === uri;
    });
  }
}

export default Store;
