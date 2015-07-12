class Store {
  constructor() {
    this.events = [];
  }

  add(events) {
    this.events.push(events);
  }

  get(uri) {
    return _.where(this.events, (event) {
      return event.uri === uri;
    });
  }
}

export default Store;
