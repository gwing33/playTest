import request from './request.js';


class APIRouter {
  route(key, value) {
    return new Stream({
      key: key, value: value
    });
  }
}

class APIScope {
  constructor(uri){
    this.uriPre = uri
  }

  create(uriPart) {
    return new APIScope(this.uriPre + uriPart);
  }

  getApi() {
    return new HigherLevelAPI(this.uriPre);
  }
}


class API {
  // Always return promise
  send(uri, data) {
    return request.post(uri).send(data).set('Accept', 'application/json').endAsync();
  }

  fetch(uri, data) {
    return request.get(uri).send(data).set('Accept', 'application/json').endAsync();
  }
}

class HigherLevelAPI extends API {

  constructor(uri) {
    this.uriPre = uri;
  }

  getUri() {
    return this.uriPre + uri;
  }

  // GET call
  get(uri, data) {
    return this.fetch( this.getUri() ).then( this.done );
  }

  // POST call
  post(uri, data) {
    return this.send( this.getUri() ).then( this.done );
  }

  done(resp) {
    console.log(resp);
    // Is status good?

    // Is data a location to...
      // Is it data, or stream

    // Is it data -> convert to stream
    // APIRouter.router(uri, resp);
  }

  subscribe(uri) {
    return APIRouter.route(uri, this.send(uriPre + uri));
  }

  unsubscribe(uri) {
    return true;
  }

}

module.exports = HigherLevelAPI;
