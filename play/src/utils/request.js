import Promises from 'bluebird';
import superagent from 'superagent';

let request = Promise.promisifyAll(superagent);

request.Request.prototype.cancellable = () => this.endAsync().cancellable();
request.Request.prototype.then = done => this.endAsync().then(done);

module.exports = request;
