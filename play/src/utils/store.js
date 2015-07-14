'use strict';
import _ from 'lodash';
import Bacon from 'baconjs';

var _data = [];
var _events = new Bacon.Bus();

var _storeContexts = {};

class StoreContext {
  constructor(endpoint) {
    _events.subscribe(x => {
      if(x.valueInternal.uri === this.uri) {
        if(this.onChange) {
          this.onChange(this, x.valueInternal);
        }
      }
    }.bind(this));

    this.uri = endpoint.uri;
    this.name = endpoint.name;
  }

  add(data) {
    Store.add(this.uri, data);
  }

  get() {
    return Store.get(this.uri);
  }

  getEvents() {
    return Store.getEvents(this.uri);
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
    _data.push({
      uri: uri,
      data: data
    });
    _events.push({
      uri: uri,
      data: data
    });
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
    return _.filter(_data, e => {
      return e.uri === uri;
    });
  }
}

export default Store;
